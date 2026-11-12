/**
 * “Poytaxt yoşlari” kanalidan yangiliklarni import qiliş.
 *   pnpm sync:tg                        — 2026-yil boşidan barça postlar (borlari ötkazib yuboriladi)
 *   pnpm sync:tg --since 2026-06-01     — şu sanadan
 *   pnpm sync:tg --purge-samples        — kanalga boğlanmagan (namuna) yangiliklarni öçiradi
 *   pnpm sync:tg --curated              — tahrir qilingan maqolalarni (src/lib/tg/curated.json) qayta yozadi
 */
import { getPayload } from 'payload'

import config from '../src/payload.config'
import { applyCurated, syncSince } from '../src/lib/tg/sync'

const args = process.argv.slice(2)
const arg = (k: string) => {
  const i = args.indexOf(k)
  return i >= 0 ? args[i + 1] : undefined
}
const payload = await getPayload({ config })

if (args.includes('--purge-samples')) {
  const res = await payload.delete({ collection: 'news', where: { tgId: { exists: false } }, overrideAccess: true })
  payload.logger.info(`Namuna yangiliklar öçirildi: ${res.docs.length} ta`)
}
if (args.includes('--curated')) {
  payload.logger.info(`Tahrir qilingan maqolalar yangilandi: ${await applyCurated(payload)} ta`)
} else {
  const r = await syncSince(payload, arg('--since') ?? '2026-01-01', (s) => console.log(s))
  payload.logger.info(`Import: ${r.created} ta yaratildi, ${r.skipped} ta ötkazildi, ${r.failed} ta xato`)
}
process.exit(0)
