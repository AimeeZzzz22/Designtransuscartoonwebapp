def sanitize_user_text(content: str, max_length: int = 1500) -> str:
    cleaned = content.replace("\x00", "").strip()
    if len(cleaned) > max_length:
        cleaned = cleaned[:max_length]
    return cleaned

