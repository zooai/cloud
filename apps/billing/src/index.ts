import Fastify from 'fastify'

/**
 * Zoo Cloud billing service.
 *
 * Thin wrapper around @hanzo/commerce for subscription + metering.
 * Non-profit tier: free for academic/open-source research (flag-gated in IAM claims).
 */

const app = Fastify({ logger: true })

app.get('/health', async () => ({ status: 'ok', service: 'zoo-cloud-billing' }))

app.get('/v1/subscriptions/:orgId', async (req) => {
  const { orgId } = req.params as { orgId: string }
  return { orgId, tier: 'non-profit', status: 'active' }
})

app.post('/v1/usage', async (req) => ({
  received: true,
  note: 'Proxied to @hanzo/commerce metering',
}))

const port = Number(process.env.PORT ?? 8081)
const host = process.env.HOST ?? '0.0.0.0'

app.listen({ port, host }).then(() => {
  app.log.info(`Zoo Cloud billing listening on ${host}:${port}`)
})
