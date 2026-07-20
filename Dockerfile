# zoo.cloud — Vite SPA (apps/web) served by ghcr.io/hanzoai/spa.
#
# Single build stage: a full workspace install (so apps/web resolves its
# workspace deps), then build ONLY apps/web. We intentionally do not run the
# monorepo-wide `pnpm build` — apps/docs (Next.js) is not part of the deployed
# surface and pulled the image build red (`next: not found`). Mirrors
# lux/cloud so both clouds build and serve the same way.

FROM node:22-alpine AS build
RUN corepack enable && corepack prepare pnpm@10.11.0 --activate
WORKDIR /app
COPY . .
RUN pnpm install --frozen-lockfile || pnpm install
RUN pnpm -C apps/web build

FROM ghcr.io/hanzoai/spa
COPY --from=build /app/apps/web/dist /public
