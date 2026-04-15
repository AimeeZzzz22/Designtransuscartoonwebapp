import asyncio
import time
from datetime import datetime
from typing import Optional, Tuple

from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.config import settings
from app.db.models import WechatMessage, WechatUser
from app.schemas import ChatMessage
from app.services.chat_engine import generate_wechat_response
from app.services.sanitizer import sanitize_user_text


class WechatChatService:
    def __init__(self, db: Session) -> None:
        self.db = db

    def get_or_create_user(self, openid: str) -> WechatUser:
        stmt = select(WechatUser).where(WechatUser.openid == openid)
        user = self.db.execute(stmt).scalar_one_or_none()
        if user:
            user.last_active = datetime.utcnow()
            self.db.commit()
            return user
        user = WechatUser(openid=openid, last_active=datetime.utcnow(), is_subscribed=True)
        self.db.add(user)
        self.db.commit()
        self.db.refresh(user)
        return user

    def set_subscription_status(self, openid: str, subscribed: bool) -> None:
        user = self.get_or_create_user(openid)
        user.is_subscribed = subscribed
        user.last_active = datetime.utcnow()
        self.db.commit()

    def is_duplicate_message(self, msg_id: str) -> bool:
        if not msg_id:
            return False
        stmt = select(WechatMessage.id).where(WechatMessage.wechat_msg_id == msg_id)
        return self.db.execute(stmt).scalar_one_or_none() is not None

    def store_message(
        self,
        openid: str,
        role: str,
        content: str,
        message_type: str,
        wechat_msg_id: Optional[str] = None,
        latency_ms: Optional[int] = None,
        error_code: Optional[str] = None,
    ) -> None:
        msg = WechatMessage(
            openid=openid,
            role=role,
            content=content,
            message_type=message_type,
            wechat_msg_id=wechat_msg_id,
            latency_ms=latency_ms,
            error_code=error_code,
        )
        self.db.add(msg)
        self.db.commit()

    def build_context(self, openid: str) -> list[ChatMessage]:
        stmt = (
            select(WechatMessage)
            .where(WechatMessage.openid == openid)
            .order_by(WechatMessage.created_at.desc())
            .limit(settings.WECHAT_CONTEXT_WINDOW_SIZE)
        )
        recent = list(reversed(self.db.execute(stmt).scalars().all()))
        return [
            ChatMessage(role="assistant" if m.role == "assistant" else "user", content=m.content)
            for m in recent
            if m.role in {"assistant", "user"}
        ]

    async def respond_to_text(self, openid: str, content: str, msg_id: Optional[str]) -> Tuple[str, int]:
        cleaned = sanitize_user_text(content)
        self.store_message(openid, "user", cleaned, "text", msg_id)
        context = self.build_context(openid)
        context.append(ChatMessage(role="user", content=cleaned))

        start = time.perf_counter()
        timeout_seconds = settings.WECHAT_AI_TIMEOUT_MS / 1000
        try:
            reply = await asyncio.wait_for(
                asyncio.to_thread(generate_wechat_response, context),
                timeout=timeout_seconds,
            )
        except asyncio.TimeoutError:
            reply = "I saw your message. Give me a moment and send another note if needed."
        latency_ms = int((time.perf_counter() - start) * 1000)

        self.store_message(openid, "assistant", reply, "text", latency_ms=latency_ms)
        return reply, latency_ms

    def admin_status(self) -> dict:
        return {
            "online": True,
            "token_configured": bool(settings.WECHAT_TOKEN),
            "app_id_configured": bool(settings.WECHAT_APP_ID),
        }

    def admin_metrics(self) -> dict:
        now = datetime.utcnow()
        day_ago = now.timestamp() - 86400
        week_ago = now.timestamp() - 7 * 86400

        active_24h = self.db.execute(
            select(func.count(WechatUser.id)).where(func.extract("epoch", WechatUser.last_active) >= day_ago)
        ).scalar_one()
        active_7d = self.db.execute(
            select(func.count(WechatUser.id)).where(func.extract("epoch", WechatUser.last_active) >= week_ago)
        ).scalar_one()

        latency_values = self.db.execute(
            select(WechatMessage.latency_ms).where(WechatMessage.latency_ms.is_not(None))
        ).scalars().all()
        sorted_lat = sorted([x for x in latency_values if x is not None])
        p50 = sorted_lat[len(sorted_lat) // 2] if sorted_lat else None
        p95 = sorted_lat[int((len(sorted_lat) - 1) * 0.95)] if sorted_lat else None

        total_messages = self.db.execute(select(func.count(WechatMessage.id))).scalar_one()
        return {
            "active_users_24h": active_24h,
            "active_users_7d": active_7d,
            "total_messages": total_messages,
            "latency_p50_ms": p50,
            "latency_p95_ms": p95,
        }

    def admin_logs(self, limit: int = 100) -> list[dict]:
        rows = self.db.execute(
            select(WechatMessage).order_by(WechatMessage.created_at.desc()).limit(limit)
        ).scalars().all()
        return [
            {
                "id": row.id,
                "openid": row.openid,
                "role": row.role,
                "content": row.content[:200],
                "message_type": row.message_type,
                "latency_ms": row.latency_ms,
                "error_code": row.error_code,
                "created_at": row.created_at.isoformat(),
            }
            for row in rows
        ]

