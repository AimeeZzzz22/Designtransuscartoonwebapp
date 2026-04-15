from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.db.session import Base, engine
from app.routers.core import router as core_router
from app.routers.wechat import router as wechat_router


def create_app() -> FastAPI:
    app = FastAPI(title=settings.APP_NAME, version=settings.APP_VERSION)

    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    app.include_router(core_router)
    app.include_router(wechat_router)

    @app.on_event("startup")
    def startup_create_tables() -> None:
        Base.metadata.create_all(bind=engine)

    return app


app = create_app()

