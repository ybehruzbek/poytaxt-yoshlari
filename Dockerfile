# syntax=docker/dockerfile:1
# Production image: Next.js 16 (standalone) + Payload CMS 3 + PostgreSQL.
#
# Sukut böyiça build bazaga ULANMAYDI (--experimental-build-mode compile): Dokploy build konteyneri bazani
# körmasa ham yiğiladi. Baza tuzilmasi ilova işga tuşganda migratsiyalar bilan yaratiladi (payload.config.ts → prodMigrations).
#
# Dokploy sozlamalari (docs/admin-qollanma.md, 8-bölim):
#   Build args:  NEXT_PUBLIC_SERVER_URL=https://domen.uz  (NEXT_PUBLIC_WWWUZ_ID — ixtiyoriy)
#   Build secret (ixtiyoriy): database_url — berilsa sahifalar oldindan yiğiladi, pastga qarang
#   Env:         DATABASE_URL, PAYLOAD_SECRET, NEXT_PUBLIC_SERVER_URL, TRUSTED_PROXY_HOPS=1, SMTP_*, TG_*
#   Volumes:     /app/media  va  /app/private-uploads  — doimiy disk (aks holda yuklangan fayllar yöqoladi)

FROM node:24-alpine AS base
RUN apk add --no-cache libc6-compat
ENV NEXT_TELEMETRY_DISABLED=1
RUN corepack enable && corepack prepare pnpm@10.15.1 --activate

# ═══ 1. Bog'liqliklar ═══
FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

# ═══ 2. Yiğiş ═══
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# NEXT_PUBLIC_* qiymatlari yiğişda kodga yoziladi — Dokploy'da build arg sifatida beriladi
ARG NEXT_PUBLIC_SERVER_URL=http://localhost:3000
ARG NEXT_PUBLIC_WWWUZ_ID=
ENV NEXT_PUBLIC_SERVER_URL=$NEXT_PUBLIC_SERVER_URL NEXT_PUBLIC_WWWUZ_ID=$NEXT_PUBLIC_WWWUZ_ID
# Ikki rejim:
#  – `database_url` BUILD SECRET berilsa (build konteyneri bazaga ulana olsa): sahifalar oldindan yiğiladi —
#    eng tez variant, sahifalar keşdan beriladi. Secret image qatlamlariga, tarixiga va jurnalga yozilmaydi
#    (build arg'dan farqli). Faqat öqiş huquqli alohida baza foydalanuvçisi tavsiya etiladi.
#      docker build --secret id=database_url,env=DATABASE_URL .
#  – BERILMASA: bazasiz yiğiş (compile), sahifalar har sörovda serverda tayyorlanadi; katta sahifalar
#    maʼlumoti server keşida saqlanadi (lib/cms/sahifalar.ts), şuning uçun bu rejim ham tez işlaydi.
# PAYLOAD_SECRET faqat yiğiş uçun vaqtinçalik; haqiqiysi runtime env'dan keladi.
# Xotira: keşsiz bazasiz yiğiş ~500 MB işlatdi (ölçangan); 2 GB çegara 4 GB serverni himoya qiladi.
RUN --mount=type=secret,id=database_url,required=false \
    if [ -s /run/secrets/database_url ]; then MODE=""; DB="$(cat /run/secrets/database_url)"; \
    else MODE="--experimental-build-mode compile"; DB="postgres://build:build@127.0.0.1:1/build"; fi; \
    echo "next build ${MODE:-(oldindan yiğiş bilan)}"; \
    PAYLOAD_SECRET=build-time-only DATABASE_URL="$DB" \
    NODE_OPTIONS="--no-deprecation --max-old-space-size=2048" \
    pnpm exec next build $MODE

# ═══ 3. Işga tuşiriş ═══
FROM node:24-alpine AS runner
RUN apk add --no-cache libc6-compat
WORKDIR /app
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 PORT=3000 HOSTNAME=0.0.0.0
# Node xotirasi çeklanadi: çeklovsiz Node RAM'ni keç tozalaydi va 800 MB gaça ösadi. Sinovda 512 MB konteyner
# çeklovi bilan barça sahifalar va 400 ta parallel sörov 170–280 MB da işladi. Dokploy'da xotira limiti: 512 MB.
ENV NODE_OPTIONS=--max-old-space-size=320

RUN addgroup -S -g 1001 nodejs && adduser -S -u 1001 -G nodejs nextjs

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# yuklangan rasmlar va murojaat fayllari — Dokploy'da shu papkalarga volume ulanadi
RUN mkdir -p media/files private-uploads/appeal-files && chown -R nextjs:nodejs media private-uploads .next

USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
