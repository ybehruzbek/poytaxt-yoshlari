/**
 * Kanal postlarini saytga yangilik sifatida yozadi (bir post — bir yangilik, `tgId` böyiça takrorlanmaydi).
 * Suratlar (albomdan 6 tagaça, video bölsa — muqovasi) Media'ga yuklanadi. Jurnalist tahriridan ötgan
 * maqolalar (curated.json) kanal matni örniga işlatiladi. Bir martalik import (scripts/sync-tg.ts) va
 * avtomatik ulaniş (instrumentation.ts) şu funksiyalardan foydalanadi.
 */
import type { Payload } from 'payload'
import sharp from 'sharp'

import { slugifyUz } from '@/lib/slugify'

import { fetchPage, fetchSince, postUrl, type TgPost } from './channel'
import curatedJson from './curated.json'
import { blocksToLexical, type Draft, postToDraft } from './transform'

/** Tahrir qilingan maqolalarda tur körsatilmagan — kanal matnidan aniqlanadi */
const classifyPost = (post: TgPost, d: Draft) => {
  const auto = postToDraft(post)
  if (auto?.kind === 'tadbir') return { kind: auto.kind, eventDate: auto.eventDate, eventPlace: auto.eventPlace }
  return { kind: auto?.kind === 'elon' || d.category === 'imkoniyat' ? ('elon' as const) : ('yangilik' as const) }
}

const curated = curatedJson as unknown as Record<string, Draft>
const MAX_PHOTOS = 6

/** Faqat Telegram suratlar serverlari (kanal sahifasidagi manzillar boşqa joyga olib bormasin) */
const ALLOWED_HOST = /^(?:cdn\d*\.)?(?:telesco\.pe|cdn-telegram\.org)$/
const MAX_BYTES = 15 * 1024 * 1024

export function isTelegramCdn(u: string): boolean {
  try {
    const url = new URL(u)
    return url.protocol === 'https:' && ALLOWED_HOST.test(url.hostname)
  } catch {
    return false
  }
}

async function upload(payload: Payload, url: string, alt: string, name: string): Promise<number | null> {
  if (!isTelegramCdn(url)) return null
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
      cache: 'no-store',
      redirect: 'error',
      signal: AbortSignal.timeout(20_000),
    })
    if (!res.ok || !res.body) return null
    if (Number(res.headers.get('content-length') || 0) > MAX_BYTES) return null
    // hajm çegarasi bilan öqiş
    const chunks: Uint8Array[] = []
    let size = 0
    const reader = res.body.getReader()
    for (;;) {
      const { done, value } = await reader.read()
      if (done) break
      size += value.byteLength
      if (size > MAX_BYTES) {
        await reader.cancel()
        return null
      }
      chunks.push(value)
    }
    const expected = Number(res.headers.get('content-length') || 0)
    if (expected && size !== expected) return null // oxirigaça yuklanmagan
    const buf = Buffer.concat(chunks)
    const data = await sharp(buf, { limitInputPixels: 60_000_000, failOn: 'warning' })
      .rotate()
      .resize({ width: 1600, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toBuffer()
    const doc = await payload.create({
      collection: 'media',
      data: { alt: alt.slice(0, 200) },
      file: { data, mimetype: 'image/webp', name: `${name}.webp`, size: data.length },
      overrideAccess: true,
    })
    return doc.id as number
  } catch {
    return null
  }
}

/** Surati yöq postlar uçun umumiy rasm (bir marta yaratiladi) */
async function fallbackImage(payload: Payload): Promise<number> {
  const ex = await payload.find({ collection: 'media', where: { filename: { like: 'poytaxt-yoshlari-muqova' } }, limit: 1, overrideAccess: true })
  if (ex.docs[0]) return ex.docs[0].id as number
  const svg = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1000"><rect width="1600" height="1000" fill="#532822"/><circle cx="1380" cy="180" r="260" fill="#FFD25A"/><circle cx="200" cy="900" r="220" fill="#89C0FF"/><text x="120" y="520" font-family="Arial, sans-serif" font-size="96" font-weight="700" fill="#FFF4E9">Poytaxt yoşlari</text><text x="120" y="610" font-family="Arial, sans-serif" font-size="44" fill="#FFF4E9" opacity="0.8">Özbekiston yoşlar ittifoqi Toşkent şahar hududiy Kengaşi</text></svg>`,
  )
  const data = await sharp(svg).webp({ quality: 85 }).toBuffer()
  const doc = await payload.create({
    collection: 'media',
    data: { alt: '“Poytaxt yoşlari” — Özbekiston yoşlar ittifoqi Toşkent şahar hududiy Kengaşi' },
    file: { data, mimetype: 'image/webp', name: 'poytaxt-yoshlari-muqova.webp', size: data.length },
    overrideAccess: true,
  })
  return doc.id as number
}

export type SyncResult = { created: number; skipped: number; failed: number }

/** Berilgan postlarni yangilik sifatida yozadi (bor bölsa — ötkazib yuboradi) */
export async function importPosts(payload: Payload, posts: TgPost[], log: (s: string) => void = () => {}): Promise<SyncResult> {
  const r: SyncResult = { created: 0, skipped: 0, failed: 0 }
  let fallback: number | null = null
  for (const post of posts) {
    const exists = await payload.count({ collection: 'news', where: { tgId: { equals: post.id } }, overrideAccess: true })
    if (exists.totalDocs) {
      r.skipped++
      continue
    }
    const draft = curated[String(post.id)] ?? postToDraft(post)
    if (!draft) {
      r.skipped++
      continue
    }
    // kanalda bir xil post qayta joylanğan bölsa — ikkinçisi qöşilmaydi
    const same = await payload.count({ collection: 'news', where: { title: { equals: draft.title } }, overrideAccess: true })
    if (same.totalDocs) {
      r.skipped++
      continue
    }
    const kind = draft.kind ? draft : { ...draft, ...classifyPost(post, draft) }
    try {
      const urls = (post.photos.length ? post.photos : post.videoThumbs).slice(0, MAX_PHOTOS)
      const ids: number[] = []
      for (let k = 0; k < urls.length; k++) {
        const id = await upload(payload, urls[k], draft.title, `tg-${post.id}-${k}`)
        if (id) ids.push(id)
      }
      if (!ids.length) ids.push((fallback ??= await fallbackImage(payload)))
      await payload.create({
        collection: 'news',
        data: {
          title: draft.title,
          slug: `${slugifyUz(draft.title).slice(0, 70).replace(/-+$/, '')}-${post.id}`,
          category: draft.category,
          publishedAt: post.date || new Date().toISOString(),
          image: ids[0],
          imageCaption: draft.caption ?? '',
          gallery: ids.slice(1),
          excerpt: draft.excerpt.slice(0, 320),
          content: blocksToLexical(draft.blocks) as never,
          tags: draft.tags,
          kind: kind.kind ?? 'yangilik',
          eventDate: kind.eventDate ?? null,
          eventPlace: kind.eventPlace ?? null,
          source: postUrl(post.id),
          tgId: post.id,
          _status: 'published',
        },
        overrideAccess: true,
      })
      r.created++
      log(`+ ${post.id} ${draft.title.slice(0, 70)}`)
    } catch (err) {
      r.failed++
      log(`! ${post.id} ${(err as Error).message}`)
    }
  }
  return r
}

/** Tahrir qilingan maqolalarni (curated.json) mavjud yangiliklarga qayta yozadi */
export async function applyCurated(payload: Payload): Promise<number> {
  let n = 0
  for (const [id, d] of Object.entries(curated)) {
    const doc = (await payload.find({ collection: 'news', where: { tgId: { equals: Number(id) } }, limit: 1, overrideAccess: true })).docs[0]
    if (!doc) continue
    await payload.update({
      collection: 'news',
      id: doc.id,
      data: {
        title: d.title,
        category: d.category,
        excerpt: d.excerpt.slice(0, 320),
        content: blocksToLexical(d.blocks) as never,
        tags: d.tags,
        imageCaption: d.caption ?? '',
      },
      overrideAccess: true,
    })
    n++
  }
  return n
}

/** Mavjud yangiliklarning turini (yangilik / eʼlon / tadbir) kanal matni böyiça qayta aniqlaydi; takrorlarni öçiradi */
export async function reclassify(payload: Payload, since: string, log: (s: string) => void = () => {}): Promise<number> {
  const posts = await fetchSince(since)
  let n = 0
  const seen = new Set<string>()
  for (const post of posts) {
    const doc = (await payload.find({ collection: 'news', where: { tgId: { equals: post.id } }, limit: 1, depth: 0, overrideAccess: true })).docs[0]
    if (!doc) continue
    if (seen.has(doc.title)) {
      await payload.delete({ collection: 'news', id: doc.id, overrideAccess: true })
      log(`- takror öçirildi: ${post.id}`)
      continue
    }
    seen.add(doc.title)
    const cur = curated[String(post.id)]
    const k = classifyPost(post, cur ?? { title: doc.title, excerpt: '', blocks: [], tags: [], category: doc.category })
    await payload.update({
      collection: 'news',
      id: doc.id,
      data: { kind: k.kind ?? 'yangilik', eventDate: k.eventDate ?? null, eventPlace: k.eventPlace ?? null },
      overrideAccess: true,
    })
    if (k.kind !== 'yangilik') log(`~ ${post.id} → ${k.kind} ${k.eventDate ?? ''}`)
    n++
  }
  return n
}

/** Bir martalik import: `since` sanasidan boşlab barça postlar */
export async function syncSince(payload: Payload, since: string, log?: (s: string) => void) {
  const posts = await fetchSince(since)
  log?.(`Kanaldan ${posts.length} ta post öqildi`)
  return importPosts(payload, posts, log)
}

/** Avtomatik ulaniş: sönggi sahifadagi (≈20) yangi postlar */
export async function syncLatest(payload: Payload, log?: (s: string) => void) {
  const posts = (await fetchPage()).sort((a, b) => a.id - b.id)
  return importPosts(payload, posts, log)
}
