import json
import time

from app.schemas import ChatMessage, ConflictAnalysis
from app.services.ai_client import (
    CHAT_SYSTEM_INSTRUCTION,
    SYSTEM_INSTRUCTION,
    WECHAT_FRIEND_PROMPT,
    WECHAT_MODE_PROMPTS,
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

    # Retry logic for handling temporary API issues
    max_retries = 3
    for attempt in range(max_retries):
        try:
            response = gemini_client.models.generate_content(
                model="gemini-2.5-flash",
                contents=contents,
                config={
                    "system_instruction": full_system_prompt,
                    "max_output_tokens": 200,  # Limit response length for faster generation
                    "temperature": 0.8,  # Balance between creativity and speed
                },
            )
            return response.text if hasattr(response, "text") else str(response)
        except Exception as e:
            error_msg = str(e)
            # Check if it's a temporary server error
            if "503" in error_msg or "UNAVAILABLE" in error_msg:
                if attempt < max_retries - 1:
                    # Wait before retrying (exponential backoff)
                    wait_time = (attempt + 1) * 2
                    print(f"[GEMINI API] Temporary error, retrying in {wait_time}s... (attempt {attempt + 1}/{max_retries})")
                    time.sleep(wait_time)
                    continue
                else:
                    # Last attempt failed, return friendly error message
                    print(f"[GEMINI API] All retries failed: {error_msg}")
                    return "I'm experiencing some technical difficulties right now. Could you try again in a moment? 😊"
            else:
                # Not a temporary error, raise it
                print(f"[GEMINI API] Unexpected error: {error_msg}")
                raise

    # Fallback (should not reach here)
    return "I'm having trouble responding right now. Please try again later."


def generate_wechat_response(messages: list[ChatMessage], mode: str = "understanding") -> str:
    """Generate a WeChat response using the specified mode.

    Args:
        messages: Chat history
        mode: Chat mode - "understanding", "sarcastic", or "therapist"
    """
    # Get the mode-specific prompt, default to understanding if mode not found
    mode_prompt = WECHAT_MODE_PROMPTS.get(mode, WECHAT_MODE_PROMPTS["understanding"])

    # Combine base WeChat prompt with mode-specific instructions
    combined_prompt = f"{WECHAT_FRIEND_PROMPT}\n\n{mode_prompt}"

    return generate_chat_response(messages, extra_system_prompt=combined_prompt)

