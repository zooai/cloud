/**
 * A ceiling on what one caller can spend.
 *
 * The credential this proxy holds is billed to Zoo Labs, so an unmetered
 * endpoint is an open wallet. This is a token bucket per address: a burst is
 * fine, a loop is not.
 *
 * It counts in this process only. With more than one replica the real ceiling
 * is this times the replica count, and a determined caller rotating addresses
 * gets past it entirely. The durable answer is a signed-in identity — Hanzo IAM
 * issues the token, and usage bills to the person rather than to the
 * foundation. Until that is wired, this is the floor, not the fix.
 */

const PER_MINUTE = Number(process.env.RATE_PER_MINUTE ?? 20)
const WINDOW = 60_000

type Bucket = { tokens: number; filled: number }
const buckets = new Map<string, Bucket>()

export function spend(who: string): { ok: true } | { ok: false; retryAfter: number } {
  const now = Date.now()
  const bucket = buckets.get(who) ?? { tokens: PER_MINUTE, filled: now }

  // Refill continuously rather than on a fixed edge, so a caller is not handed
  // a full bucket the instant the minute rolls over.
  const earned = ((now - bucket.filled) / WINDOW) * PER_MINUTE
  bucket.tokens = Math.min(PER_MINUTE, bucket.tokens + earned)
  bucket.filled = now

  if (bucket.tokens < 1) {
    buckets.set(who, bucket)
    return { ok: false, retryAfter: Math.ceil(((1 - bucket.tokens) / PER_MINUTE) * (WINDOW / 1000)) }
  }

  bucket.tokens -= 1
  buckets.set(who, bucket)
  return { ok: true }
}

/** Drops idle callers so the map cannot grow without bound. */
export function forget(olderThan = 10 * WINDOW) {
  const cutoff = Date.now() - olderThan
  for (const [who, bucket] of buckets) if (bucket.filled < cutoff) buckets.delete(who)
}

setInterval(() => forget(), WINDOW).unref?.()
