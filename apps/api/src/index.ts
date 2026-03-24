import Fastify from 'fastify'

const app = Fastify({ logger: true })

app.get('/health', async () => ({ status: 'ok', service: 'zoo-cloud-api' }))

app.get('/v1/zips', async () => ({
  zips: [],
  note: 'Zoo Improvement Proposals — proxy to zips.zoo.ngo',
}))

app.get('/v1/research/chains', async () => ({
  chains: [],
  note: 'Research chain registry — DeSci experiments',
}))

const port = Number(process.env.PORT ?? 8080)
const host = process.env.HOST ?? '0.0.0.0'

app.listen({ port, host }).then(() => {
  app.log.info(`Zoo Cloud API listening on ${host}:${port}`)
})
