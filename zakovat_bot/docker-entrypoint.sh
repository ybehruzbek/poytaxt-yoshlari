#!/bin/sh
# Bot konteyneri kirish nuqtasi: DB tayyorligini kutadi, bot sxemasini
# yaratadi, migratsiyalarni yuritadi va polling botni ishga tushiradi.
set -e

python - <<'PY'
import sys
import time

import psycopg2
from decouple import config

schema = config("DB_SCHEMA", default="public")
params = dict(
    dbname=config("DB_NAME", default="postgres"),
    user=config("DB_USER", default="postgres"),
    password=config("DB_PASSWORD", default=""),
    host=config("DB_HOST", default="localhost"),
    port=config("DB_PORT", default="5432"),
)

for attempt in range(30):
    try:
        conn = psycopg2.connect(**params)
        break
    except psycopg2.OperationalError as exc:
        print(f"DB kutilmoqda ({attempt + 1}/30): {exc}", flush=True)
        time.sleep(2)
else:
    sys.exit("PostgreSQL bilan bog'lanib bo'lmadi")

conn.autocommit = True
with conn.cursor() as cur:
    cur.execute(f'CREATE SCHEMA IF NOT EXISTS "{schema}"')
conn.close()
print(f"Sxema tayyor: {schema}", flush=True)
PY

python manage.py migrate --noinput
exec python manage.py bot
