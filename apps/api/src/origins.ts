/**
 * Who may spend the foundation's quota.
 *
 * An allowlist rather than `*`, because this proxy carries a billable
 * credential: `*` would let any page on the web bill Zoo Labs for inference.
 */
const ALLOWED = new Set([
  'https://zoolabs.io',
  'https://www.zoolabs.io',
  'https://zoo.ngo',
  'https://www.zoo.ngo',
  'https://zoo.cloud',
])

const LOCAL = /^http:\/\/(localhost|127\.0\.0\.1):\d+$/

/** Returns the origin to echo back, or null if it is not ours. */
export function allow(origin: unknown): string | null {
  if (typeof origin !== 'string' || !origin) return null
  if (ALLOWED.has(origin)) return origin
  if (process.env.NODE_ENV !== 'production' && LOCAL.test(origin)) return origin
  return null
}
