# zoo-cloud-api

> **Use `apps/edge` instead, for now.** This one is a Fastify process and needs
> a cluster to run in; the DigitalOcean account is down, which is why
> api.zoo.cloud answers 525. `apps/edge` is the same proxy as a Cloudflare
> Worker, running where the sites already run, with no origin to keep alive.

`api.zoo.cloud` — the Zoo-branded way to reach the Hanzo API from a browser.

## Why it exists

zoolabs.io and zoo.ngo are static sites, so every call they make is a browser
call, and a browser call to `api.hanzo.ai` fails twice over:

- the gateway sends no `Access-Control-Allow-Origin`, so the request never leaves
- it answers anonymous callers `402 — a billable tenant is required`

Neither is fixable from a static bundle: a key shipped to the browser is a
published key. So the tenant credential lives here and the browser talks to
this.

## Running it

    HANZO_API_KEY=<tenant key from KMS> node --experimental-strip-types src/index.ts

| Variable | Default | Meaning |
|---|---|---|
| `HANZO_API_KEY` | — | tenant credential. Without it every `/v1` call answers 503. |
| `HANZO_API` | `https://api.hanzo.ai` | upstream |
| `RATE_PER_MINUTE` | `20` | per-address ceiling |
| `PORT` | `8080` | |

`GET /health` reports whether the credential is present.

## What it does and does not protect

Requests are allowed only from the foundation's own origins (`src/origins.ts`)
and are rate limited per address (`src/budget.ts`). That is a floor, not a fix:
the count is per process, so with N replicas the real ceiling is N times the
limit, and a caller rotating addresses gets past it.

The durable answer is a signed-in identity — Hanzo IAM issues the token and
usage bills to the person rather than to the foundation. Until that is wired,
this endpoint spends Zoo Labs' money and should be watched.
