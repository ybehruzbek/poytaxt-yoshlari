import 'server-only'

import type { Where } from 'payload'

import { NEWS_CATEGORIES } from '@/collections/News'
import type { Media } from '@/payload-types'

import { getPayloadClient } from './auth'

export const CATEGORIES = NEWS_CATEGORIES.map((c) => ({ value: c.value, t: c.label }))
export const KINDS = [
  { value: 'yangilik', t: 'Yangilik' },
  { value: 'elon', t: 'E’lon' },
  { value: 'tadbir', t: 'Kelgusi tadbir' },
  { value: 'tabrik', t: 'Tabrik' },
] as const

export const PER_PAGE = 20

export type ListParams = { q?: string; holat?: string; turkum?: string; tur?: string; tartib?: string; sahifa?: string }

export const thumbOf = (img: unknown) => {
  const m = img as Media | null | undefined
  return m && typeof m === 'object' ? (m.sizes?.thumb?.url ?? m.url ?? null) : null
}

/** Ro'yxat: qidiruv, holat, turkum va tur böyiça filtr; xodim uçun eng oxirgi (qoralama bilan) holati körsatiladi */
export async function listNews(p: ListParams) {
  const payload = await getPayloadClient()
  const and: Where[] = []
  if (p.q?.trim()) and.push({ title: { like: p.q.trim() } })
  if (p.holat === 'published' || p.holat === 'draft') and.push({ _status: { equals: p.holat } })
  if (p.turkum && CATEGORIES.some((c) => c.value === p.turkum)) and.push({ category: { equals: p.turkum } })
  if (p.tur && KINDS.some((k) => k.value === p.tur)) and.push({ kind: { equals: p.tur } })
  const page = Math.max(1, Number.parseInt(p.sahifa ?? '1', 10) || 1)
  const sort = p.tartib === 'eski' ? 'publishedAt' : p.tartib === 'tahrir' ? '-updatedAt' : '-publishedAt'

  const statusWhere = (s?: 'published' | 'draft'): Where => {
    const rest = and.filter((w) => !('_status' in w))
    return { and: s ? [...rest, { _status: { equals: s } }] : rest }
  }
  const [res, all, pub, draft] = await Promise.all([
    payload.find({
      collection: 'news',
      where: { and },
      sort,
      page,
      limit: PER_PAGE,
      depth: 1,
      draft: true,
      overrideAccess: true,
      select: { title: true, category: true, kind: true, publishedAt: true, updatedAt: true, image: true, _status: true, slug: true },
    }),
    payload.count({ collection: 'news', where: statusWhere(), overrideAccess: true }),
    payload.count({ collection: 'news', where: statusWhere('published'), overrideAccess: true }),
    payload.count({ collection: 'news', where: statusWhere('draft'), overrideAccess: true }),
  ])
  return { ...res, counts: { all: all.totalDocs, published: pub.totalDocs, draft: draft.totalDocs } }
}

/** Tahrir uçun bitta yangilik — eng oxirgi saqlangan (qoralama) holatida */
export async function getNews(id: number) {
  const payload = await getPayloadClient()
  try {
    return await payload.findByID({ collection: 'news', id, depth: 1, draft: true, locale: 'uz', overrideAccess: true })
  } catch {
    return null
  }
}

export async function listAuthors() {
  const payload = await getPayloadClient()
  const r = await payload.find({ collection: 'authors', limit: 200, sort: 'name', depth: 0, overrideAccess: true, select: { name: true, position: true } })
  return r.docs.map((a) => ({ id: a.id, name: a.name, position: a.position ?? '' }))
}

export async function versionCount(id: number) {
  const payload = await getPayloadClient()
  const r = await payload.countVersions({ collection: 'news', where: { parent: { equals: id } }, overrideAccess: true }).catch(() => ({ totalDocs: 0 }))
  return r.totalDocs
}

const mediaItem = (m: unknown) => {
  const x = m as Media | null | undefined
  return x && typeof x === 'object'
    ? { id: x.id, url: x.sizes?.card?.url ?? x.url ?? '', thumb: x.sizes?.thumb?.url ?? x.url ?? '', alt: x.alt ?? '', w: x.width, h: x.height }
    : null
}

/** Shakl uçun boşlanğiç qiymatlar (yangi yangilik yoki bazadagi yozuv) */
export function formInit(doc: Awaited<ReturnType<typeof getNews>>) {
  const idOf = (v: unknown) => (typeof v === 'number' ? v : v && typeof v === 'object' ? (v as { id: number }).id : null)
  return {
    id: doc?.id ?? null,
    status: (doc?._status ?? 'draft') as 'draft' | 'published',
    updatedAt: doc?.updatedAt ?? null,
    image: doc ? mediaItem(doc.image) : null,
    gallery: (doc?.gallery ?? []).map(mediaItem).filter((x): x is NonNullable<typeof x> => !!x),
    data: {
      title: doc?.title ?? '',
      slug: doc?.slug ?? '',
      generateSlug: doc ? doc.generateSlug !== false : true,
      category: doc?.category ?? 'kengash',
      kind: doc?.kind ?? 'yangilik',
      publishedAt: doc?.publishedAt ?? new Date().toISOString(),
      eventDate: doc?.eventDate ?? null,
      eventPlace: doc?.eventPlace ?? '',
      image: doc ? idOf(doc.image) : null,
      imageCaption: doc?.imageCaption ?? '',
      excerpt: doc?.excerpt ?? '',
      content: doc?.content ?? null,
      gallery: (doc?.gallery ?? []).map(idOf).filter((x): x is number => x !== null),
      author: doc ? idOf(doc.author) : null,
      tags: doc?.tags ?? [],
      source: doc?.source ?? '',
    },
  }
}
