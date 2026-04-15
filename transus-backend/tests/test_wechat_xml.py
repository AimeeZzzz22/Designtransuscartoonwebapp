from app.services.wechat_xml import build_text_reply, parse_wechat_xml


def test_xml_parse_and_reply_roundtrip():
    inbound = """
    <xml>
      <ToUserName><![CDATA[toUser]]></ToUserName>
      <FromUserName><![CDATA[fromUser]]></FromUserName>
      <CreateTime>1348831860</CreateTime>
      <MsgType><![CDATA[text]]></MsgType>
      <Content><![CDATA[this is a test]]></Content>
      <MsgId>1234567890123456</MsgId>
    </xml>
    """
    parsed = parse_wechat_xml(inbound)
    assert parsed["FromUserName"] == "fromUser"
    assert parsed["Content"] == "this is a test"

    reply = build_text_reply("fromUser", "toUser", "hello back")
    assert "<MsgType><![CDATA[text]]></MsgType>" in reply
    assert "<Content><![CDATA[hello back]]></Content>" in reply

