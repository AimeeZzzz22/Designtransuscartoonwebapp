import json

from app.schemas import ChatMessage, ConflictAnalysis
from app.services.ai_client import (
    CHAT_SYSTEM_INSTRUCTION,
    SYSTEM_INSTRUCTION,
    WECHAT_FRIEND_PROMPT,
    get_client,
)


def analyze_conflict(partner_a: str, partner_b: str) -> ConflictAnalysis:
    gemini_client = get_client()
    user_prompt = (
        "Partner A perspective:\n"
        f"{partner_a}\n\n"
        "Partner B perspective:\n"
        f"{partner_b}\n\n"
        "Analyze this interaction following the system instructions and "
        "return ONLY the JSON object."
    )
    response = gemini_client.models.generate_content(
        model="gemini-2.5-flash",
        contents=[{"role": "user", "parts": [{"text": user_prompt}]}],
        config={
            "system_instruction": SYSTEM_INSTRUCTION,
            "response_mime_type": "application/json",
        },
    )
    raw_text = response.text if hasattr(response, "text") else str(response)
    return ConflictAnalysis.model_validate(json.loads(raw_text))


def generate_chat_response(messages: list[ChatMessage], extra_system_prompt: str = "") -> str:
    gemini_client = get_client()
    contents = []
    for msg in messages:
        role = "user" if msg.role == "user" else "model"
        contents.append({"role": role, "parts": [{"text": msg.content}]})

    full_system_prompt = CHAT_SYSTEM_INSTRUCTION
    if extra_system_prompt:
        full_system_prompt = f"{full_system_prompt}\n\n{extra_system_prompt}"

    response = gemini_client.models.generate_content(
        model="gemini-2.5-flash",
        contents=contents,
        config={"system_instruction": full_system_prompt},
    )
    return response.text if hasattr(response, "text") else str(response)


def generate_wechat_response(messages: list[ChatMessage]) -> str:
    return generate_chat_response(messages, extra_system_prompt=WECHAT_FRIEND_PROMPT)

