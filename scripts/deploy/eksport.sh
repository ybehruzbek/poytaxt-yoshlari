#!/bin/sh
# Lokal bazadagi barça kontentni va yuklangan fayllarni serverga köçiriş uçun tayyorlaydi.
#   sh scripts/deploy/eksport.sh            → deploy-eksport/malumot.sql va deploy-eksport/media.tar.gz
# Serverda: ilova bir marta işga tuşadi (migratsiya jadvallarni yaratadi), söng:
#   psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -f malumot.sql
#   tar -xzf media.tar.gz -C <ilova papkasi>   (media/ va private-uploads/ papkalari)
# Eslatma: faqat maʼlumot (jadvallar migratsiyadan), sessiya va qulf jadvallarisiz.
set -e
cd "$(dirname "$0")/../.."
OUT=deploy-eksport
mkdir -p "$OUT"
docker exec web-postgres-1 pg_dump -U ittifoq -d ittifoq --data-only --disable-triggers \
  --exclude-table=payload_migrations \
  --exclude-table=payload_locked_documents --exclude-table=payload_locked_documents_rels \
  --exclude-table=payload_preferences --exclude-table=payload_preferences_rels > "$OUT/malumot.sql"
tar -czf "$OUT/media.tar.gz" media private-uploads 2>/dev/null || tar -czf "$OUT/media.tar.gz" media
ls -lh "$OUT"
