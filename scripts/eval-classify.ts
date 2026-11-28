/**
 * Kanal postlari tasnifini sinaş: qölda belgilangan turlar (curated.json) bilan avtomatik tasnif soliştiriladi.
 * Avval postlarni yuklab oling:  OUT=posts.json npx tsx scripts/dump-tg.ts
 * Söng:                          POSTS=posts.json npx tsx scripts/eval-classify.ts
 * Asosiy körsatkiç — “yangilik bölib tuşgan” (yangilik emas) postlar soni.
 */
import { readFileSync } from 'fs'
import { postToDraft } from '../src/lib/tg/transform'
import curated from '../src/lib/tg/curated.json'

type P = { tgId: number; date: string; text: string; photos: number; video: boolean; forwardedFrom: string }
const POSTS = process.env.POSTS ?? 'posts.json'
const posts: P[] = JSON.parse(readFileSync(POSTS, 'utf8'))
const cur = curated as Record<string, { kind?: string }>
const conf: Record<string, Record<string, number>> = {}
const wrongNews: string[] = []
const lostNews: string[] = []
let n = 0
for (const p of posts) {
  const truth = cur[String(p.tgId)]?.kind
  if (!truth) continue
  if (!p.photos && p.video) continue // videoli postlar avvaldan ötkaziladi
  const d = postToDraft({ id: p.tgId, date: p.date + 'T10:00:00Z', text: p.text, photos: p.photos ? ['x'] : [], videoThumbs: [], forwardedFrom: p.forwardedFrom })
  const got = d?.kind ?? 'skip'
  // ötgan tadbir eʼloni ham tadbir/eʼlon sifatida toğri hisoblanadi
  const ok = (a: string, b: string) => a === b || (a === 'elon' && b === 'tadbir') || (a === 'tadbir' && b === 'elon')
  conf[truth] ??= {}
  conf[truth][got] = (conf[truth][got] ?? 0) + 1
  n++
  if (got === 'yangilik' && truth !== 'yangilik') wrongNews.push(`${p.tgId} [${truth}] ${(d?.title ?? '').slice(0, 70)}`)
  if (truth === 'yangilik' && got !== 'yangilik' && !ok(truth, got)) lostNews.push(`${p.tgId} [->${got}] ${(d?.title ?? '').slice(0, 70)}`)
}
console.log('jami:', n)
console.log('haqiqat -> natija:', JSON.stringify(conf))
console.log('\nYANGILIK BO‘LIB TUSHGAN (yangilik emas):', wrongNews.length)
for (const s of wrongNews.slice(0, Number(process.env.SHOW ?? 12))) console.log('  ', s)
console.log('\nYANGILIK YO‘QOLGAN:', lostNews.length)
for (const s of lostNews.slice(0, Number(process.env.SHOW ?? 12))) console.log('  ', s)
