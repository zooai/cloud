/**
 * api.zoo.cloud, as a Cloudflare Worker.
 *
 * Same job as apps/api and the same rules — hold the tenant credential so a
 * static site can reach the model, allow only our own origins, meter what one
 * caller can spend. The difference is where it runs.
 *
 * apps/api is a Fastify process and wants a cluster to run in. The cluster
 * went down with the DigitalOcean account, and api.zoo.cloud has answered 525
 * ever since — Cloudflare reaching for an origin that is not there. The sites
 * themselves never noticed, because Pages serves them from Cloudflare's own
 * edge. So does this: no origin, nothing to keep alive, and it sits beside the
 * sites it serves rather than in a cluster they do not depend on.
 *
 * Deploy:  wrangler deploy
 * Secret:  wrangler secret put HANZO_API_KEY
 */

const DEFAULT_UPSTREAM = 'https://api.hanzo.ai'

const ALLOWED = new Set([
  'https://zoolabs.io',
  'https://www.zoolabs.io',
  'https://zoo.ngo',
  'https://www.zoo.ngo',
  'https://zoo.cloud',
])

const LOCAL = /^http:\/\/(localhost|127\.0\.0\.1):\d+$/

/** The origin to echo back, or null if it is not ours. */
function allow(origin: string | null, dev: boolean): string | null {
  if (!origin) return null
  if (ALLOWED.has(origin)) return origin
  return dev && LOCAL.test(origin) ? origin : null
}

const cors = (origin: string) => ({
  'access-control-allow-origin': origin,
  'access-control-allow-methods': 'GET, POST, OPTIONS',
  'access-control-allow-headers': 'content-type',
  vary: 'origin',
})

const refuse = (status: number, message: string, type: string, origin?: string) =>
  new Response(JSON.stringify({ error: { message, type } }), {
    status,
    headers: { 'content-type': 'application/json', ...(origin ? cors(origin) : {}) },
  })

export interface Env {
  HANZO_API_KEY?: string
  /** Overridden only in tests; production reaches the real gateway. */
  UPSTREAM?: string
  /** Cloudflare's own per-colo rate limiter, bound in wrangler.toml. */
  BUDGET?: { limit(opts: { key: string }): Promise<{ success: boolean }> }
  DEV?: string
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)
    const origin = allow(request.headers.get('origin'), env.DEV === '1')

    const upstreamBase = env.UPSTREAM ?? DEFAULT_UPSTREAM

    if (url.pathname === '/health') {
      return Response.json({
        service: 'zoo-cloud-edge',
        upstream: upstreamBase,
        tenant: env.HANZO_API_KEY ? 'configured' : 'MISSING',
      })
    }

    if (!url.pathname.startsWith('/v1/')) return refuse(404, 'no such route', 'not_found')
    if (!origin) return refuse(403, 'origin not allowed', 'cors')

    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: { ...cors(origin), 'access-control-max-age': '86400' },
      })
    }

    // Metered per address, because this endpoint spends the foundation's money.
    // Cloudflare counts across the whole edge rather than per process, which is
    // the one thing the Fastify version could not do honestly.
    if (env.BUDGET) {
      const who = request.headers.get('cf-connecting-ip') ?? 'unknown'
      const { success } = await env.BUDGET.limit({ key: who })
      if (!success) {
        return refuse(
          429,
          'too many requests — the foundation funds this endpoint, so it is rate limited',
          'rate_limit',
          origin
        )
      }
    }

    if (!env.HANZO_API_KEY) {
      return refuse(503, 'this proxy has no upstream credential configured', 'configuration', origin)
    }

    const upstream = await fetch(upstreamBase + url.pathname + url.search, {
      method: request.method,
      headers: {
        authorization: `Bearer ${env.HANZO_API_KEY}`,
        'content-type': request.headers.get('content-type') ?? 'application/json',
        accept: request.headers.get('accept') ?? '*/*',
      },
      body: request.method === 'GET' || request.method === 'HEAD' ? undefined : request.body,
      // Required by Node's fetch whenever the body is a stream, and harmless
      // on Workers. Without it the request never leaves off-platform, which is
      // where this gets tested.
      duplex: 'half',
    } as RequestInit & { duplex: 'half' })

    // The body is passed through as it arrives, so a reply still streams.
    return new Response(upstream.body, {
      status: upstream.status,
      headers: {
        ...cors(origin),
        'content-type': upstream.headers.get('content-type') ?? 'application/json',
        'cache-control': 'no-store',
      },
    })
  },
}
