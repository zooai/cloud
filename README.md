# Zoo Cloud

DeAI + DeSci platform. White-label of Hanzo's platform, branded for Zoo Labs Foundation.

## What it does

- **DeAI** — decentralized AI research, experiments, and model serving
- **DeSci** — decentralized science research chains and funding
- **ZIPs** — Zoo Improvement Proposals governance
- **Node hosting** — validator nodes, RPC endpoints, research nodes
- **Community** — open research network coordination

## Stack

Built on the Hanzo infrastructure stack:
- `@hanzo/iam` — OAuth2/OIDC auth (zoo.ngo)
- `@hanzo/kms` — secrets, keys, certificates
- `@hanzo/commerce` — billing, subscriptions (non-profit tier)
- `@hanzo/gateway` — API routing
- `@hanzo/ingress` — L7 reverse proxy
- `@hanzo/insights` — product analytics

Plus Lux-specific OSS services from `~/work/lux/` (Zoo uses Lux blockchain infra):
- Broker, CEX, DEX, MPC, Bank

## Layout

```
apps/
  web/       — main dashboard (zoo.cloud)
  api/       — backend API
  billing/   — @hanzo/commerce integration
  docs/      — docs.zoo.cloud
packages/
  brand/     — Zoo tokens (colors, fonts, logo)
  config/    — shared tsconfig, eslint
  ui/        — Zoo components over @hanzo/ui
k8s/
  deploy.yaml
  ingress.yaml
```

## Dev

```bash
pnpm install
pnpm dev
```

## Domains

- `zoo.cloud` — main platform
- `zoo.ngo` — foundation site (non-profit 501c3)
- `zoo.network` — chain RPC + network info

## Clusters

| Env | Cluster |
|-----|---------|
| mainnet | `do-sfo3-zoo-k8s` |
| testnet | `do-sfo3-zoo-test-k8s` |
| devnet  | `do-sfo3-zoo-dev-k8s` |
