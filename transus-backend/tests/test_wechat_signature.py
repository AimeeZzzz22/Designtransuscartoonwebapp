from app.services.wechat_signature import verify_wechat_signature


def test_signature_verification_success():
    token = "abc123"
    timestamp = "1713081600"
    nonce = "xyz789"
    signature = "e7d00f349a233358fcf788af42eaa4409b332836"
    assert verify_wechat_signature(token, timestamp, nonce, signature)


def test_signature_verification_failure():
    assert not verify_wechat_signature("token", "1", "2", "bad")

