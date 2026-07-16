type Bucket = { count: number; resetAt: number }

// In-memory fixed-window limiter. Note: this is per serverless instance and
// resets on cold start, so it is a lightweight safeguard (cost/abuse dampener),
// not a distributed guarantee. For strict global limits use Upstash/Redis.
const buckets = new Map<string, Bucket>()

export function checkRateLimit(
  key: string,
  limit: number,
  windowMs: number
): { allowed: boolean; retryAfterSec: number } {
  const now = Date.now()
  const existing = buckets.get(key)

  if (!existing || now >= existing.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs })
    return { allowed: true, retryAfterSec: 0 }
  }

  if (existing.count >= limit) {
    return { allowed: false, retryAfterSec: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)) }
  }

  existing.count += 1
  return { allowed: true, retryAfterSec: 0 }
}
