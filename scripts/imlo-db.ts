/**
 * Bazadagi o'zbekcha kontentni JORIY lotin alifbosiga o'tkazadi (lokal baza uchun; serverda xuddi shu ishni
 * 20261128_joriy_alifbo migratsiyasi bajaradi). Qoidalar: src/lib/joriy-baza.ts
 *   pnpm imlo:db          — nima o'zgarishini sanab ko'rsatadi, bazaga yozmaydi
 *   pnpm imlo:db --yoz    — o'zgartiradi (bitta tranzaksiyada)
 * Payload ishga tushirilmaydi (dev rejimidagi sxema sinxronlash eski qiymatlarda to'xtab qolmasin) — to'g'ridan-to'g'ri pg.
 */
import 'dotenv/config'
import { createRequire } from 'node:module'

import { bazaniJoriyga } from '../src/lib/joriy-baza'

const YOZ = process.argv.includes('--yoz')
const req = createRequire(createRequire(import.meta.url).resolve('@payloadcms/db-postgres'))
type PgClient = {
  connect: () => Promise<void>
  query: (q: string, p?: unknown[]) => Promise<{ rows: Record<string, unknown>[] }>
  end: () => Promise<void>
}
const { Client } = req('pg') as { Client: new (o: { connectionString?: string }) => PgClient }

const client = new Client({ connectionString: process.env.DATABASE_URL })
await client.connect()
await client.query('begin')
try {
  const r = await bazaniJoriyga(async (q, p) => (await client.query(q, p)).rows, YOZ)
  await client.query(YOZ ? 'commit' : 'rollback')
  for (const [t, k] of Object.entries(r.jadval).sort((a, b) => b[1] - a[1])) console.log(`${String(k).padStart(6)}  ${t}`)
  console.log(YOZ ? `\nBazada ${r.jami} ta qiymat va ${r.enum} ta enum qiymati joriy alifboga o‘tkazildi.` : `\n${r.jami} ta qiymat o‘zgaradi. Yozish uchun: pnpm imlo:db --yoz`)
} catch (e) {
  await client.query('rollback')
  throw e
} finally {
  await client.end()
}
