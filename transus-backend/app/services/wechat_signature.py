import hashlib


def verify_wechat_signature(token: str, timestamp: str, nonce: str, signature: str) -> bool:
    if not token or not timestamp or not nonce or not signature:
        return False
    joined = "".join(sorted([token, timestamp, nonce]))
    digest = hashlib.sha1(joined.encode("utf-8")).hexdigest()
    return digest == signature

