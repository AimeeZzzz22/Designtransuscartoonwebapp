from datetime import datetime
from xml.etree import ElementTree as ET


def parse_wechat_xml(payload: str) -> dict[str, str]:
    root = ET.fromstring(payload)
    result: dict[str, str] = {}
    for child in root:
        result[child.tag] = child.text or ""
    return result


def build_text_reply(to_user: str, from_user: str, content: str) -> str:
    now = int(datetime.utcnow().timestamp())
    response = (
        "<xml>"
        f"<ToUserName><![CDATA[{to_user}]]></ToUserName>"
        f"<FromUserName><![CDATA[{from_user}]]></FromUserName>"
        f"<CreateTime>{now}</CreateTime>"
        "<MsgType><![CDATA[text]]></MsgType>"
        f"<Content><![CDATA[{content}]]></Content>"
        "</xml>"
    )
    return response

