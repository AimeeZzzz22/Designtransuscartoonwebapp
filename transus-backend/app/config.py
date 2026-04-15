import os


class Settings:
    APP_NAME = "TransUs Backend"
    APP_VERSION = "0.2.0"

    GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")
    PORT = int(os.getenv("PORT", "8080"))

    WECHAT_TOKEN = os.getenv("WECHAT_TOKEN", "")
    WECHAT_APP_ID = os.getenv("WECHAT_APP_ID", "")
    WECHAT_APP_SECRET = os.getenv("WECHAT_APP_SECRET", "")
    WECHAT_RATE_LIMIT_PER_MIN = int(os.getenv("WECHAT_RATE_LIMIT_PER_MIN", "30"))
    WECHAT_CONTEXT_WINDOW_SIZE = int(os.getenv("WECHAT_CONTEXT_WINDOW_SIZE", "12"))
    WECHAT_AI_TIMEOUT_MS = int(os.getenv("WECHAT_AI_TIMEOUT_MS", "1800"))

    DATABASE_URL = os.getenv(
        "DATABASE_URL",
        "postgresql+psycopg://postgres:postgres@localhost:5432/transus",
    )


settings = Settings()

