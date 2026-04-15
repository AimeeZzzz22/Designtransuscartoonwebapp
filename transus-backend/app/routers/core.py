from fastapi import APIRouter, HTTPException

from app.schemas import ChatRequest, ConflictAnalysis, ConflictInput
from app.services.chat_engine import analyze_conflict, generate_chat_response

router = APIRouter()


@router.get("/")
def health_check():
    return {"status": "ok", "service": "transus-backend"}


@router.post("/analyze-conflict", response_model=ConflictAnalysis)
async def analyze_conflict_endpoint(payload: ConflictInput):
    try:
        return analyze_conflict(payload.partner_a, payload.partner_b)
    except RuntimeError as e:
        raise HTTPException(status_code=500, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"Error generating analysis: {e}")


@router.post("/chat")
async def chat(request: ChatRequest):
    try:
        return {"reply": generate_chat_response(request.messages)}
    except RuntimeError as e:
        raise HTTPException(status_code=500, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"Error calling Gemini: {e}")

