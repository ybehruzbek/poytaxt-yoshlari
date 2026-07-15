# ═══ Stage 1: Dependencies ═══
FROM node:22-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
# --ignore-scripts: postinstall (prisma generate) build bosqichida alohida chaqiriladi
RUN npm ci --ignore-scripts

# ═══ Stage 2: Build ═══
FROM node:22-alpine AS builder
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
# lib/env.ts build vaqtida NEXTAUTH_SECRET talab qiladi — bu faqat placeholder.
# ARG (ENV emas) — final image'ga o'tmaydi; runtime'da real qiymat Dokploy env'dan keladi.
ARG NEXTAUTH_SECRET=build-time-placeholder
# --experimental-build-mode compile: sahifalarni build vaqtida prerender QILMAYDI,
# shuning uchun build DB'ga ulanishni talab qilmaydi (barcha sahifalar ISR/dynamic).
RUN npx prisma generate && npx next build --experimental-build-mode compile

# ═══ Stage 3: Production ═══
FROM node:22-alpine AS runner
RUN apk add --no-cache libc6-compat
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

RUN addgroup -S -g 1001 nodejs && adduser -S -u 1001 -G nodejs nextjs

# Standalone server + static fayllar
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# Migratsiya + seed uchun to'liq node_modules (prisma CLI, tsx) va manbalar
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma
COPY --from=builder --chown=nextjs:nodejs /app/prisma.config.ts ./prisma.config.ts
COPY --from=builder --chown=nextjs:nodejs /app/lib ./lib
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./package.json
COPY --from=builder --chown=nextjs:nodejs /app/docker-entrypoint.sh ./
RUN chmod +x ./docker-entrypoint.sh

USER nextjs
EXPOSE 3000

ENTRYPOINT ["./docker-entrypoint.sh"]
