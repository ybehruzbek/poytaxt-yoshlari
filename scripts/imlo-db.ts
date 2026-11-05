/**
 * Bazadagi mavjud o'zbekcha kontentni yangi alifboga o'tkazadi (bir martalik, qayta ishga tushirish xavfsiz).
 * Yangiliklar (sarlavha, qisqa matn, to'liq matn) va rasmlar tavsifi qayta saqlanadi —
 * o'girishni kolleksiyalardagi imlo hook'lari bajaradi (src/lib/imlo-hook.ts).
 *   pnpm imlo:db
 * Fuqarolar murojaatlariga tegilmaydi.
 */
import config from '@payload-config'
import { getPayload } from 'payload'

import { eskiImlo } from '../src/lib/alifbo'

/** Lexical JSON'dagi faqat "text" tugunlari matni (kalit nomlari — children, format… — hisobga olinmaydi) */
const matnlar = (node: unknown): string[] =>
  Array.isArray(node)
    ? node.flatMap(matnlar)
    : node && typeof node === 'object'
      ? [
          ...((node as { type?: string; text?: unknown }).type === 'text' && typeof (node as { text?: unknown }).text === 'string'
            ? [(node as { text: string }).text]
            : []),
          ...Object.values(node).flatMap((v) => (v && typeof v === 'object' ? matnlar(v) : [])),
        ]
      : []

const payload = await getPayload({ config })
let n = 0

const news = await payload.find({ collection: 'news', locale: 'uz', limit: 1000, depth: 0, draft: true, pagination: false })
for (const d of news.docs) {
  if (![d.title, d.excerpt, ...matnlar(d.content)].some((t) => typeof t === 'string' && eskiImlo(t))) continue
  await payload.update({
    collection: 'news',
    id: d.id,
    locale: 'uz',
    data: { title: d.title, excerpt: d.excerpt, content: d.content },
    overrideAccess: true,
    context: { imloDb: true },
  })
  n++
}

const media = await payload.find({ collection: 'media', locale: 'uz', limit: 1000, depth: 0, pagination: false })
for (const m of media.docs) {
  if (typeof m.alt !== 'string' || !eskiImlo(m.alt)) continue
  await payload.update({ collection: 'media', id: m.id, locale: 'uz', data: { alt: m.alt }, overrideAccess: true })
  n++
}

console.log(`Bazada ${n} ta yozuv yangi alifboga ötkazildi.`)
process.exit(0)
