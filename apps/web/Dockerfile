FROM node:18-alpine AS builder
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
RUN apk update

# Set working directory
WORKDIR /app
COPY . .
RUN corepack enable
RUN pnpm dlx turbo prune --scope=web --docker

FROM node:18-alpine as installer
RUN apk add --no-cache libc6-compat
RUN apk update

# Set working directory
WORKDIR /app

COPY .gitignore ./.gitignore

COPY --from=builder /app/out/pnpm-lock.yaml .

RUN corepack enable
RUN pnpm fetch

COPY --from=builder /app/out/full .

COPY turbo.json turbo.json
RUN pnpm install --offline
RUN pnpm run build --filter web

FROM node:18-alpine as runner
ENV PORT 3000
WORKDIR /app

COPY --from=builder /app/out/pnpm-lock.yaml .
COPY --from=builder /app/out/json/package.json .

RUN corepack enable
RUN rm -rf package.json
RUN pnpm fetch --prod

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=installer /app/apps/web/next.config.js .
COPY --from=installer /app/apps/web/package.json .

COPY --from=installer /app/apps/web/.next/standalone .

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=installer  --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=installer  --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static

EXPOSE $PORT

CMD node apps/web/server.js
