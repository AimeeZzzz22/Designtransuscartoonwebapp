from fastapi import APIRouter, Depends, HTTPException, Query, Request, Response
from fastapi.responses import JSONResponse, PlainTextResponse
from sqlalchemy.orm import Session

from app.config import settings
from app.db.session import get_db
from app.services.rate_limiter import OpenIDRateLimiter
from app.services.wechat_chat_service import WechatChatService
from app.services.wechat_signature import verify_wechat_signature
from app.services.wechat_xml import build_text_reply, parse_wechat_xml

router = APIRouter(prefix="/wechat", tags=["wechat"])
rate_limiter = OpenIDRateLimiter(limit_per_minute=settings.WECHAT_RATE_LIMIT_PER_MIN)


def _verify_or_403(signature: str, timestamp: str, nonce: str) -> None:
    if not verify_wechat_signature(settings.WECHAT_TOKEN, timestamp, nonce, signature):
        raise HTTPException(status_code=403, detail="Invalid WeChat signature")


@router.get("/webhook")
def verify_webhook(
    signature: str = Query(""),
    timestamp: str = Query(""),
    nonce: str = Query(""),
    echostr: str = Query(""),
):
    print(f"[WECHAT VERIFY] signature={signature}, timestamp={timestamp}, nonce={nonce}, echostr={echostr}")
    print(f"[WECHAT VERIFY] token={settings.WECHAT_TOKEN}")
    _verify_or_403(signature, timestamp, nonce)
    print(f"[WECHAT VERIFY] Verification SUCCESS, returning echostr")
    return PlainTextResponse(content=echostr)


@router.post("/webhook")
async def wechat_webhook(
    request: Request,
    signature: str = Query(""),
    timestamp: str = Query(""),
    nonce: str = Query(""),
    db: Session = Depends(get_db),
):
    _verify_or_403(signature, timestamp, nonce)
    xml_payload = (await request.body()).decode("utf-8")
    try:
        payload = parse_wechat_xml(xml_payload)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid XML payload")

    openid = payload.get("FromUserName", "")
    app_account_id = payload.get("ToUserName", "")
    msg_type = payload.get("MsgType", "")
    event = payload.get("Event", "").lower()
    msg_id = payload.get("MsgId")
    content = payload.get("Content", "")

    if not openid:
        raise HTTPException(status_code=400, detail="Missing openid")

    if not rate_limiter.allow(openid):
        reply = build_text_reply(
            to_user=openid,
            from_user=app_account_id,
            content="You are sending messages too quickly. Please wait a moment and try again.",
        )
        return Response(content=reply, media_type="application/xml")

    svc = WechatChatService(db)
    svc.get_or_create_user(openid)

    if msg_id and svc.is_duplicate_message(msg_id):
        return Response(content="success", media_type="text/plain")

    if msg_type == "event":
        if event == "subscribe":
            svc.set_subscription_status(openid, True)
            reply_text = """你好！我是 TransUs，你的 AI 对话伙伴。💙

我有三种对话模式，你可以选择最适合自己的：

🤗 理解模式 - 温柔倾听，给你温暖和支持
发送：/理解模式

😈 毒舌模式 - 直接说真话，毫不留情指出问题
发送：/毒舌模式 或 /毒舌

🧠 治疗师模式 - 深入分析，提供具体建议
发送：/治疗模式

请选择一个模式开始，或者直接跟我聊天（默认使用理解模式）。

你随时可以发送命令切换模式！"""
        elif event == "unsubscribe":
            svc.set_subscription_status(openid, False)
            return Response(content="success", media_type="text/plain")
        else:
            reply_text = "Thanks for the update."
        reply = build_text_reply(to_user=openid, from_user=app_account_id, content=reply_text)
        return Response(content=reply, media_type="application/xml")

    if msg_type != "text":
        reply = build_text_reply(
            to_user=openid,
            from_user=app_account_id,
            content="I can read text messages right now. Voice and image are coming soon.",
        )
        return Response(content=reply, media_type="application/xml")

    reply_text, _latency = await svc.respond_to_text(openid=openid, content=content, msg_id=msg_id)
    response_xml = build_text_reply(to_user=openid, from_user=app_account_id, content=reply_text)
    return Response(content=response_xml, media_type="application/xml")


@router.get("/admin/status")
def wechat_status(db: Session = Depends(get_db)):
    return WechatChatService(db).admin_status()


@router.get("/admin/metrics")
def wechat_metrics(db: Session = Depends(get_db)):
    return WechatChatService(db).admin_metrics()


@router.get("/admin/logs")
def wechat_logs(limit: int = 50, db: Session = Depends(get_db)):
    return JSONResponse(content={"logs": WechatChatService(db).admin_logs(limit=limit)})


@router.get("/qrcode")
def wechat_qrcode():
    if settings.WECHAT_APP_ID:
        follow_url = f"https://weixin.qq.com/r/{settings.WECHAT_APP_ID}"
        return {"enabled": True, "follow_url": follow_url}
    return {"enabled": False, "message": "Configure WECHAT_APP_ID to enable QR follow link."}

