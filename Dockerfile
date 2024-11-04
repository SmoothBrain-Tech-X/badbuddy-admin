##### DEPENDENCIES
FROM --platform=linux/amd64 node:20-alpine AS deps
RUN apk add --no-cache libc6-compat openssl build-base python3
RUN apk add --no-cache \
    udev \
    ttf-freefont \
    chromium
WORKDIR /app
# Install dependencies based on the preferred package manager
COPY package.json pnpm-lock.yaml ./
RUN yarn global add pnpm && pnpm install

##### BUILDER
FROM --platform=linux/amd64 node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/package.json ./package.json
COPY . .
# ENV NEXT_TELEMETRY_DISABLED 1
RUN yarn global add pnpm && SKIP_ENV_VALIDATION=1 pnpm run build

##### RUNNER
FROM --platform=linux/amd64 node:20-alpine AS runner
RUN apk add --no-cache \
    udev \
    ttf-freefont \
    chromium
WORKDIR /app
ENV NODE_ENV production
# ENV NEXT_TELEMETRY_DISABLED 1
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
CMD ["node_modules/.bin/next", "start"]