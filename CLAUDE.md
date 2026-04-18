# Zoo Cloud

White-label of Hanzo platform, branded as Zoo (Zoo Labs Foundation, 501c3).

Domains: `zoo.cloud`, `zoo.ngo`, `zoo.network`.

## Scope

DeAI + DeSci. Four buckets:
1. Decentralized AI research and model serving
2. Decentralized Science (DeSci) research chains
3. ZIPs governance (Zoo Improvement Proposals)
4. Node hosting for research chains (validators, RPC)

## Key rules

- Use `luxfi/*` packages, never `go-ethereum` or `ava-labs` (Zoo uses Lux blockchain infra).
- Build on Hanzo infra (`@hanzo/iam`, `@hanzo/kms`, `@hanzo/commerce`, `@hanzo/gateway`, `@hanzo/ingress`, `@hanzo/insights`).
- Images push to GHCR only: `ghcr.io/zooai/cloud:v{semver}`. Never GAR.
- Secrets via `@hanzo/kms`. Never K8s secrets for app secrets.
- Hash passwords. Argon2id preferred.
- White-label via hostname: `zoo.cloud`/`zoo.ngo`/`zoo.network` => Zoo brand.
- Non-profit mission: free tier for research/academic use.

## Layout

- `apps/web` — Next.js dashboard (zoo.cloud)
- `apps/api` — backend API
- `apps/billing` — Hanzo Commerce integration
- `apps/docs` — docs site (docs.zoo.cloud)
- `packages/brand` — Zoo tokens
- `packages/config` — shared configs
- `packages/ui` — Zoo UI over `@hanzo/ui`
- `k8s/` — manifests

## Zoo-unique pages

- `/research` — DeSci research chain dashboards
- `/zips` — Zoo Improvement Proposals
- `/community` — governance + community coordination

## Dev

```
pnpm install
pnpm dev
```
