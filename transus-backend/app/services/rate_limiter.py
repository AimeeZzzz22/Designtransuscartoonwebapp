from collections import defaultdict, deque
from datetime import datetime, timedelta


class OpenIDRateLimiter:
    def __init__(self, limit_per_minute: int) -> None:
        self.limit = max(limit_per_minute, 1)
        self.events = defaultdict(deque)

    def allow(self, openid: str) -> bool:
        now = datetime.utcnow()
        cutoff = now - timedelta(minutes=1)
        bucket = self.events[openid]
        while bucket and bucket[0] < cutoff:
            bucket.popleft()
        if len(bucket) >= self.limit:
            return False
        bucket.append(now)
        return True

