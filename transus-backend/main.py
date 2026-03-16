import json
import os
from typing import List, Literal, Optional

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from google import genai


class ConflictInput(BaseModel):
    partner_a: str = Field(..., min_length=1)
    partner_b: str = Field(..., min_length=1)


class ConflictAnalysis(BaseModel):
    partner_a_feelings: List[str]
    partner_b_feelings: List[str]
    partner_a_intent: str
    partner_b_intent: str
    misunderstanding: str
    reframes: List[str]
    next_prompt: str
    safety_flag: Literal["none", "abuse", "coercion", "threat", "self_harm", "other_risk"]


class ChatMessage(BaseModel):
    role: Literal["user", "assistant"]
    content: str


class ChatRequest(BaseModel):
    messages: List[ChatMessage]


SYSTEM_INSTRUCTION = """
You are TransUs, a neutral communication reflection assistant for couples.

Your goals:
- Help users understand likely emotions, intentions, unmet needs, and misunderstanding points.
- Stay neutral and do NOT take sides.
- Do NOT decide who is right.
- Do NOT diagnose mental health conditions.
- Do NOT act like a therapist or claim to provide therapy.
- Use calm, neutral, tentative language (e.g., "may", "might", "likely", "it seems").
- Be concise and concrete.

Safety and risk:
- If you detect language that suggests abuse, coercion, threats, or self-harm risk, set the safety flag accordingly.
- Focus on non-judgmental, safety-oriented language. Encourage seeking professional or emergency help when appropriate.

Output format:
You must return ONLY valid compact JSON in this exact shape:
{
  "partner_a_feelings": ["string"],
  "partner_b_feelings": ["string"],
  "partner_a_intent": "string",
  "partner_b_intent": "string",
  "misunderstanding": "string",
  "reframes": ["string", "string"],
  "next_prompt": "string",
  "safety_flag": "none"
}

Rules:
- Always populate both feeling lists with 2-5 short phrases each.
- Provide exactly TWO calmer rephrasings in "reframes".
- Use one of: "none", "abuse", "coercion", "threat", "self_harm", "other_risk" for "safety_flag".
- Do not include any commentary outside the JSON.
"""


CHAT_SYSTEM_INSTRUCTION = """
You are TransUs, a neutral relationship reflection assistant chatting with one person at a time.

Your goals:
- Help the user understand likely emotions, intentions, unmet needs, and misunderstanding points in their conflicts.
- Stay neutral and do NOT take sides or decide who is right.
- Use calm, gentle, and tentative language (e.g., "may", "might", "it seems", "could be").
- Be concise and concrete, and avoid sounding like a therapist or giving professional diagnoses.

Style:
- Respond in friendly, natural language paragraphs, not JSON.
- You can sometimes use short bullet points for clarity.
- You may ask simple follow-up questions to better understand the situation.

Safety:
- If you notice language suggesting abuse, coercion, threats, or self-harm, respond carefully and encourage the user to consider reaching out to trusted people, local services, or emergency help if needed.
- Do NOT claim to be an emergency or crisis service.
"""


def build_client() -> genai.Client:
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        raise RuntimeError("GEMINI_API_KEY environment variable is not set.")
    return genai.Client(api_key=api_key)


client: Optional[genai.Client] = None


def get_client() -> genai.Client:
    global client
    if client is None:
        client = build_client()
    return client


app = FastAPI(title="TransUs Backend", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def health_check():
    return {"status": "ok", "service": "transus-backend"}


@app.post("/analyze-conflict", response_model=ConflictAnalysis)
async def analyze_conflict(payload: ConflictInput):
    try:
        gemini_client = get_client()
    except RuntimeError as e:
        raise HTTPException(status_code=500, detail=str(e))

    user_prompt = (
        "Partner A perspective:\n"
        f"{payload.partner_a}\n\n"
        "Partner B perspective:\n"
        f"{payload.partner_b}\n\n"
        "Analyze this interaction following the system instructions and "
        "return ONLY the JSON object."
    )

    try:
        response = gemini_client.models.generate_content(
            model="gemini-2.5-flash",
            contents=[{"role": "user", "parts": [{"text": user_prompt}]}],
            config={
                "system_instruction": SYSTEM_INSTRUCTION,
                "response_mime_type": "application/json",
            },
        )
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"Error calling Gemini: {e}")

    try:
        raw_text = response.text if hasattr(response, "text") else str(response)
        data = json.loads(raw_text)
        analysis = ConflictAnalysis.model_validate(data)
        return analysis
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to parse Gemini response: {e}")


@app.post("/chat")
async def chat(request: ChatRequest):
    try:
        gemini_client = get_client()
    except RuntimeError as e:
        raise HTTPException(status_code=500, detail=str(e))

    # Gemini expects roles: "user" and "model" (not "assistant")
    contents = []
    for m in request.messages:
        role = "user" if m.role == "user" else "model"
        contents.append({"role": role, "parts": [{"text": m.content}]})

    try:
        response = gemini_client.models.generate_content(
            model="gemini-2.5-flash",
            contents=contents,
            config={
                "system_instruction": CHAT_SYSTEM_INSTRUCTION,
            },
        )
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"Error calling Gemini: {e}")

    reply_text = response.text if hasattr(response, "text") else str(response)
    return {"reply": reply_text}


if __name__ == "__main__":
    import uvicorn

    port = int(os.environ.get("PORT", "8080"))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)

