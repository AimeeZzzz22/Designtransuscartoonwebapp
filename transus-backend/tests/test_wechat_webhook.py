import hashlib
from typing import Optional

from fastapi.testclient import TestClient

from app.config import settings
from app.db.session import get_db
from app.main import app
from app.services.wechat_chat_service import WechatChatService


def _signature(token: str, timestamp: str, nonce: str) -> str:
    raw = "".join(sorted([token, timestamp, nonce]))
    return hashlib.sha1(raw.encode("utf-8")).hexdigest()


def test_wechat_handshake_and_text_message(monkeypatch):
    settings.WECHAT_TOKEN = "test-token"
    timestamp = "1713081600"
    nonce = "abc"
    signature = _signature(settings.WECHAT_TOKEN, timestamp, nonce)

    app.dependency_overrides[get_db] = lambda: None

    monkeypatch.setattr(WechatChatService, "get_or_create_user", lambda self, openid: None)
    monkeypatch.setattr(WechatChatService, "is_duplicate_message", lambda self, msg_id: False)

    async def _fake_respond(self, openid: str, content: str, msg_id: Optional[str]):
        return "I hear you. Thanks for sharing.", 120

    monkeypatch.setattr(WechatChatService, "respond_to_text", _fake_respond)

    client = TestClient(app)

    verify_res = client.get(
        "/wechat/webhook",
        params={
            "signature": signature,
            "timestamp": timestamp,
            "nonce": nonce,
            "echostr": "hello-wechat",
        },
    )
    assert verify_res.status_code == 200
    assert verify_res.text == "hello-wechat"

    message_xml = """
    <xml>
      <ToUserName><![CDATA[gh_123]]></ToUserName>
      <FromUserName><![CDATA[user_openid]]></FromUserName>
      <CreateTime>1348831860</CreateTime>
      <MsgType><![CDATA[text]]></MsgType>
      <Content><![CDATA[hello transus]]></Content>
      <MsgId>987654321</MsgId>
    </xml>
    """
    post_res = client.post(
        "/wechat/webhook",
        params={"signature": signature, "timestamp": timestamp, "nonce": nonce},
        data=message_xml,
    )
    assert post_res.status_code == 200
    assert "<Content><![CDATA[I hear you. Thanks for sharing.]]></Content>" in post_res.text

    app.dependency_overrides.clear()

