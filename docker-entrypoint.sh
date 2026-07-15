#!/bin/sh
set -e

echo "══════════════════════════════════════"
echo "  Poytaxt Yoshlari — Production"
echo "══════════════════════════════════════"

# 1. Migratsiyalar — muvaffaqiyatsiz bo'lsa konteyner ishga tushmaydi (set -e).
#    `db push` EMAS: migrate deploy faqat prisma/migrations tarixini qo'llaydi,
#    hech qachon ma'lumot o'chirmaydi.
echo "[1/3] prisma migrate deploy..."
npx prisma migrate deploy

# 2. Seed — idempotent: bo'sh bo'lmagan jadvalga tegmaydi (prisma/seed.ts).
echo "[2/3] seed (faqat bo'sh jadvallar)..."
npx tsx prisma/seed.ts || echo "seed o'tkazib yuborildi"

# 3. Admin seed — ADMIN_USERNAME/ADMIN_PASSWORD env'dan, mavjud bo'lsa tegmaydi.
echo "[3/3] admin seed..."
npx tsx prisma/seed-admin.ts || echo "admin seed o'tkazib yuborildi (env yo'q yoki mavjud)"

echo "Next.js server ishga tushmoqda (port ${PORT:-3000})..."
exec node server.js
