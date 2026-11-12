/**
 * “Poytaxt yoşlari” kanalidan yangiliklarni import qiliş (`payload run` parametr uzatmaydi — muhit özgaruvçilari):
 *   pnpm sync:tg                              — 2026-yil boşidan barça postlar (borlari ötkazib yuboriladi)
 *   TG_SINCE=2026-06-01 pnpm sync:tg          — şu sanadan
 *   TG_PURGE=1 pnpm sync:tg                   — avval kanalga boğlanmagan (namuna) yangiliklarni öçiradi
 *   TG_ONLY=purge|curated|reclassify pnpm sync:tg
 *     purge      — faqat öçiriş
 *     curated    — tahrir qilingan maqolalarni (src/lib/tg/curated.json) qayta yozadi
 *     retext     — tahrir qilinmagan yangiliklarning matnini joriy qoidalar böyiça qayta yozadi
 *     reclassify — mavjud yangiliklarning turini (yangilik / eʼlon / tadbir) kanal matni böyiça qayta aniqlaydi
 */
import { getPayload } from 'payload'

import config from '../src/payload.config'
import { applyCurated, reclassify, refreshText, syncSince } from '../src/lib/tg/sync'

const env = process.env
const payload = await getPayload({ config })
const log = (s: string) => console.log(s)

if (env.TG_PURGE === '1' || env.TG_ONLY === 'purge') {
  const all = await payload.find({ collection: 'news', limit: 5000, depth: 0, pagination: false, select: { tgId: true }, overrideAccess: true })
  const ids = all.docs.filter((d) => !d.tgId).map((d) => d.id)
  for (const id of ids) await payload.delete({ collection: 'news', id, overrideAccess: true })
  log(`Namuna yangiliklar öçirildi: ${ids.length} ta`)
}
if (env.TG_ONLY === 'curated') log(`Tahrir qilingan maqolalar yangilandi: ${await applyCurated(payload, log)} ta`)
else if (env.TG_ONLY === 'retext') await refreshText(payload, env.TG_SINCE ?? '2026-01-01', log)
else if (env.TG_ONLY === 'reclassify') log(`Turi qayta aniqlandi: ${await reclassify(payload, env.TG_SINCE ?? '2026-01-01', log)} ta`)
else if (env.TG_ONLY !== 'purge') {
  const r = await syncSince(payload, env.TG_SINCE ?? '2026-01-01', log)
  log(`Import: ${r.created} ta yaratildi, ${r.skipped} ta ötkazildi, ${r.failed} ta xato`)
}
process.exit(0)
