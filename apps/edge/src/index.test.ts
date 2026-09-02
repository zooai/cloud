import assert from 'node:assert/strict'
import { test } from 'node:test'
import worker, { type Env } from './index.ts'

const env: Env = { HANZO_API_KEY: 'tenant-key', UPSTREAM: 'http://localhost:4996' }
const ask = (init: RequestInit & { origin?: string; path?: string } = {}) =>
  worker.fetch(
    new Request('https://api.zoo.cloud' + (init.path ?? '/v1/chat/completions'), {
      method: init.method ?? 'POST',
      headers: init.origin ? { origin: init.origin, 'content-type': 'application/json' } : {},
      body: init.method === 'OPTIONS' || init.method === 'GET' ? undefined : '{}',
    }),
    env
  )

test('preflight from a foundation site is allowed', async () => {
  const res = await ask({ method: 'OPTIONS', origin: 'https://zoolabs.io' })
  assert.equal(res.status, 204)
  assert.equal(res.headers.get('access-control-allow-origin'), 'https://zoolabs.io')
})

// The credential here is billed, so "starts with our name" must not pass.
test('a stranger is refused, including near misses', async () => {
  for (const origin of ['https://zoolabs.io.evil.test', 'http://zoolabs.io', 'https://notzoo.ngo']) {
    const res = await ask({ method: 'OPTIONS', origin })
    assert.equal(res.status, 403, origin)
    assert.equal(res.headers.get('access-control-allow-origin'), null)
  }
})

test('no origin at all is refused', async () => {
  assert.equal((await ask({})).status, 403)
})

test('the tenant key is added upstream and never asked of the browser', async () => {
  const res = await ask({ path: '/v1/models', origin: 'https://zoo.ngo' })
  assert.equal(res.status, 200)
  assert.equal((await res.json() as any).sawAuth, 'Bearer tenant-key')
})

test('a reply streams through rather than arriving in one lump', async () => {
  const res = await ask({ origin: 'https://zoo.ngo' })
  assert.ok(res.body, 'no body to stream')
  const text = await res.text()
  assert.match(text, /Belugas/)
  assert.match(text, /\[DONE\]/)
  assert.equal(res.headers.get('access-control-allow-origin'), 'https://zoo.ngo')
})

test('with no credential it says so rather than pretending', async () => {
  const res = await worker.fetch(
    new Request('https://api.zoo.cloud/v1/models', {
      headers: { origin: 'https://zoo.ngo' },
    }),
    { UPSTREAM: 'http://localhost:4996' }
  )
  assert.equal(res.status, 503)
  assert.match((await res.json() as any).error.message, /no upstream credential/)
})

test('health reports whether the credential is there', async () => {
  const res = await worker.fetch(new Request('https://api.zoo.cloud/health'), env)
  assert.equal((await res.json() as any).tenant, 'configured')
})
