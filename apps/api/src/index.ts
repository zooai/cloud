import { Readable } from 'node:stream'
import Fastify from 'fastify'
import { allow } from './origins.ts'
import { spend } from './budget.ts'

/**
 * api.zoo.cloud — the Zoo-branded way to reach the Hanzo API from a browser.
 *
 * Why it exists: zoolabs.io and zoo.ngo are static sites, so every call they
 * make is a browser call, and a browser call to api.hanzo.ai fails twice over.
 * The gateway sends no Access-Control-Allow-Origin, so the request never
 * leaves; and it answers anonymous callers with 402, because usage is billed
 * to a tenant. Neither can be fixed from a static bundle: a key shipped to the
 * browser is a published key.
 *
 * So the tenant credential lives here, on the server, and the browser talks to
 * this instead. That makes this process the foundation's wallet, which is why
 * it does not simply forward everything to anyone — see budget.ts.
 */

const UPSTREAM = process.env.HANZO_API ?? 'https://api.hanzo.ai'
const TENANT = process.env.HANZO_API_KEY ?? ''

const app = Fastify({ logger: true, bodyLimit: 8 * 1024 * 1024 })

// The browser sends JSON; we forward the bytes untouched, so take them raw.
app.addContentTypeParser('*', { parseAs: 'buffer' }, (_req, body, done) => done(null, body))

app.get('/health', async () => ({
  service: 'zoo-cloud-api',
  upstream: UPSTREAM,
  tenant: TENANT ? 'configured' : 'MISSING',
}))

app.all('/v1/*', async (req, reply) => {
  const origin = allow(req.headers.origin)
  if (!origin) {
    return reply.code(403).send({ error: { message: 'origin not allowed', type: 'cors' } })
  }

  // Preflight: answer it here rather than on its own route, so one place
  // decides what this endpoint permits.
  if (req.method === 'OPTIONS') {
    return reply
      .header('access-control-allow-origin', origin)
      .header('access-control-allow-methods', 'GET, POST, OPTIONS')
      .header('access-control-allow-headers', 'content-type')
      .header('access-control-max-age', '86400')
      .header('vary', 'origin')
      .code(204)
      .send()
  }

  const room = spend(req.ip)
  if (!room.ok) {
    return reply
      .header('access-control-allow-origin', origin)
      .header('retry-after', String(room.retryAfter))
      .code(429)
      .send({
        error: {
          message: `too many requests — the foundation funds this endpoint, so it is rate limited. Try again in ${room.retryAfter}s.`,
          type: 'rate_limit',
        },
      })
  }

  if (!TENANT) {
    return reply.header('access-control-allow-origin', origin).code(503).send({
      error: {
        message: 'this proxy has no upstream credential configured',
        type: 'configuration',
      },
    })
  }

  const upstream = await fetch(`${UPSTREAM}${req.url}`, {
    method: req.method,
    headers: {
      authorization: `Bearer ${TENANT}`,
      'content-type': String(req.headers['content-type'] ?? 'application/json'),
      accept: String(req.headers.accept ?? '*/*'),
    },
    body: req.method === 'GET' || req.method === 'HEAD' ? undefined : (req.body as Buffer<ArrayBuffer>),
  })

  reply
    .header('access-control-allow-origin', origin)
    .header('vary', 'origin')
    .header('content-type', upstream.headers.get('content-type') ?? 'application/json')
    .header('cache-control', 'no-store')
    .code(upstream.status)

  // Streamed as it arrives, so a chat reply appears token by token rather than
  // in one lump when the model finishes.
  return upstream.body ? reply.send(Readable.fromWeb(upstream.body as never)) : reply.send()
})

const port = Number(process.env.PORT ?? 8080)
app.listen({ port, host: process.env.HOST ?? '0.0.0.0' }).then(() => {
  if (!TENANT) app.log.warn('HANZO_API_KEY is not set — every /v1 call will answer 503')
})
