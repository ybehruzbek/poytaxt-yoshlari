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

const curated = curatedJson as unknown as Record<string, Draft>
const MAX_PHOTOS = 6

async function upload(payload: Payload, url: string, alt: string, name: string): Promise<number | null> {
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' }, cache: 'no-store' })
    if (!res.ok) return null
    const buf = Buffer.from(await res.arrayBuffer())
    const data = await sharp(buf).rotate().resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 80 }).toBuffer()
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
