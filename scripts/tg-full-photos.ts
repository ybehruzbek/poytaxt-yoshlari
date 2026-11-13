/**
 * Saytdagi kanal suratlarini (tg-{post}-{n}.webp) bot orqali olingan asl nusxalar bilan almaştiradi.
 * Faqat kengligi MIN_WIDTH dan kiçik suratlar yangilanadi; videolar muqovasi tegilmaydi.
 *   pnpm payload run scripts/tg-full-photos.ts            — hammasi
 *   LIMIT=5 pnpm payload run scripts/tg-full-photos.ts    — sinov uçun bir neçtasi
 * Kerak: .env da TG_BOT_TOKEN va TG_BOT_STASH_CHAT (src/lib/tg/bot.ts ga qarang).
 */
import { getPayload } from 'payload'

import config from '@payload-config'
import { botCheck, botEnabled, fullPhoto } from '@/lib/tg/bot'
import { toWebp } from '@/lib/tg/sync'

const MIN_WIDTH = 1000
const LIMIT = Number(process.env.LIMIT || 0)

const payload = await getPayload({ config })
if (!botEnabled()) {
  console.error('Bot sozlanmagan: .env faylida bot tokeni va ombor çati ID si yozilmagan (src/lib/tg/bot.ts ga qarang).')
  process.exit(1)
}
console.log('Bot:', await botCheck())

const all = await payload.find({
  collection: 'media',
  where: { and: [{ filename: { like: 'tg-' } }, { width: { less_than: MIN_WIDTH } }] },
  limit: 5000,
  sort: '-id',
  depth: 0,
  overrideAccess: true,
})
const docs = all.docs.filter((d) => /^tg-\d+-\d+(-\d+)?\.webp$/.test(d.filename ?? ''))
let done = 0
let same = 0
let miss = 0
for (const d of LIMIT ? docs.slice(0, LIMIT) : docs) {
  const [, post, k] = d.filename!.match(/^tg-(\d+)-(\d+)/)!
  const buf = await fullPhoto(Number(post) + Number(k)).catch(() => null)
  if (!buf) {
    miss++
    continue
  }
  const data = await toWebp(buf)
  const w = (await import('sharp')).default(data)
  const { width = 0 } = await w.metadata()
  if (width <= (d.width ?? 0)) {
    same++
    continue
  }
  await payload.update({
    collection: 'media',
    id: d.id,
    data: {},
    file: { data, mimetype: 'image/webp', name: `tg-${post}-${k}.webp`, size: data.length },
    overrideAccess: true,
  })
  done++
  console.log(`${d.filename}: ${d.width} → ${width} px`)
}
console.log(`Tayyor: ${done} ta yangilandi, ${same} tasida kattaroq nusxa yöq, ${miss} tasi olinmadi (video muqovasi yoki öçirilgan post).`)
process.exit(0)
