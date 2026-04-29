# Zoo Cloud — LLM Context

## Purpose

Zoo Cloud is the DeAI + DeSci platform for the Zoo Labs Foundation (501c3 non-profit). It is a white-label deployment of the Hanzo platform, branded for the Zoo community.

Domains:
- `zoo.cloud` — main platform
- `zoo.ngo` — foundation site
- `zoo.network` — chain RPC + network info

## Scope

Unlike Hanzo (general AI infra) or Lux Cloud (AI + Web3 commercial), Zoo Cloud focuses on:

1. **DeAI** — decentralized AI research, open experiments, community-driven model development
2. **DeSci** — decentralized science research chains, funding, peer review on-chain
3. **ZIPs governance** — Zoo Improvement Proposals (zips.zoo.ngo) for community direction
4. **Research nodes** — hosting for research chains, validator + RPC endpoints
5. **Community coordination** — Discord, Twitter/X, open research network

## Architecture

Zoo Cloud is a thin orchestration layer over existing OSS services (shared with Hanzo and Lux):

```
                zoo.cloud (apps/web)
                       |
                   apps/api
                       |
   +-----------+-------+---------+-----------+-----------+
   |           |                 |           |           |
@hanzo/iam  @hanzo/kms  @hanzo/commerce  @hanzo/gateway  @hanzo/insights
(zoo.ngo)   (secrets)   (non-profit)     (api.zoo.cloud) (analytics)
   |           |                 |           |
   +-----------+-----------------+-----------+
                       |
              Lux OSS services (Zoo uses Lux blockchain)
   +-----------+-------+---------+-----------+-----------+
   |           |           |           |           |
broker        cex         dex         mpc         bank
(routing)   (exchange)  (orderbook) (custody)   (fiat rails)
```

## Apps

### apps/web
Next.js 14 dashboard. Renders at `zoo.cloud`. Pages:
- `/` — marketing / landing
- `/dashboard` — logged-in user home
- `/research` — research chain dashboards (DeSci experiments)
- `/web3` — Web3 infrastructure powered by Bootnode (~/work/bootnode)
- `/zips` — Zoo Improvement Proposals (governance)
- `/community` — governance + community coordination
- `/billing` — subscription + usage (via `@hanzo/commerce`)
- `/account` — profile, teams, API keys (via `@hanzo/iam`)

### Bootnode integration
Web3 node hosting (validators, RPC, snapshots) is powered by Bootnode at
`~/work/bootnode`. Bootnode runs as a white-label deployment at `web3.zoo.ngo`
with `brand=zoo`. Zoo Cloud's `/web3` page calls the Bootnode HTTP API via
`apps/web/src/lib/bootnode.ts`:
- Env: `BOOTNODE_URL` (server) / `NEXT_PUBLIC_BOOTNODE_URL` (client)
- Default: `https://web3.zoo.ngo`
- All requests carry `X-Brand: zoo`
- SSO via Zoo IAM (`id.zoo.ngo` / `zoo.id`); shared OIDC client
- Bootnode endpoints used: `/v1/chains`, `/v1/chains/{id}/nodes`

### apps/api
Backend. Thin proxy to Hanzo services + Lux OSS services via gateway.

### apps/billing
Server-side billing workflows. Imports `@hanzo/commerce` for subscription lifecycle, metering, credits. Non-profit tier available for research/academic use.

### apps/docs
Docs site at `docs.zoo.cloud`. Fumadocs or similar.

## Packages

- `packages/brand` — Zoo design tokens (greens, science-oriented palette, logo SVGs)
- `packages/config` — shared `tsconfig.json`, eslint rules
- `packages/ui` — Zoo-branded React components re-exporting `@hanzo/ui`

## Auth Flow

OIDC authorization_code + PKCE against `id.zoo.ngo` (a Hanzo IAM deployment).

- Client IDs: `zoo-cloud-web`, `zoo-cloud-api`
- Claims: `sub` (user id), `owner` (org id), `roles`
- Gateway injects: `X-User-Id`, `X-Org-Id`, `X-Roles`

## Zoo-Specific Features

### ZIPs (Zoo Improvement Proposals)
- Hosted at `zips.zoo.ngo` (separate repo integrated via iframe or API)
- On-chain voting via Zoo governance contracts
- Community-driven roadmap

### Research Chains
- Experimental L1/L2 chains for DeSci research
- One-click provisioning via `lux/node` binary
- Research data stored in @hanzo/kms + IPFS
- Funding via @hanzo/commerce non-profit tier

### Non-Profit Tier
- Zoo Labs Foundation is a 501c3 non-profit
- Free research tier for academic + open-source use
- Billing via @hanzo/commerce with discount flags

## Clusters

| Env | Cluster context | Purpose |
|-----|-----------------|---------|
| mainnet | `do-sfo3-zoo-k8s` | Production Zoo Cloud |
| testnet | `do-sfo3-zoo-test-k8s` | Public testnet |
| devnet  | `do-sfo3-zoo-dev-k8s` | Internal dev |

## Image

`ghcr.io/zooai/cloud:v{semver}` — multi-arch (amd64 + arm64), no QEMU, native runners.

## CI/CD

Push to `main` → GHA runs lint + typecheck + build → auto-bump semver → push image to GHCR → dispatch to operator for progressive rollout (dev → test → main).

## Rules

- Never push to GAR (that's Liquidity's registry).
- Use `luxfi/*` packages, never `go-ethereum` or `ava-labs`.
- Hanzo services are dependencies; do not fork them here.
- Secrets always via `@hanzo/kms`. Never env files in prod.
- White-label: hostname-based brand detection (`zoo.cloud`/`zoo.ngo`/`zoo.network` → Zoo brand).
- Non-profit mission: open research, community governance, science first.
