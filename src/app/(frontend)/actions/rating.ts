'use server'

import { createHash } from 'crypto'
import { headers } from 'next/headers'
import { getPayload } from 'payload'

import { clientIp, rateLimited } from '@/lib/rate-limit'
import { REACTIONS, type ReactionKind } from '@/collections/NewsReactions'
import config from '@/payload.config'

export type RatingStats = { count: number; avg: number }
export type RateResult = { ok: boolean; message?: string; stats?: RatingStats; mine?: number }

/** Maqola baholari: soni va örtaça (1 xona aniqlik) */
export async function ratingStats(newsId: number): Promise<RatingStats> {
  const payload = await getPayload({ config })
  const res = await payload.find({
    collection: 'news-ratings',
    where: { news: { equals: newsId } },
    pagination: false,
    select: { value: true },
    overrideAccess: true,
  })
  const vals = res.docs.map((d) => d.value)
  const count = vals.length
  const avg = count ? Math.round((vals.reduce((a, b) => a + b, 0) / count) * 10) / 10 : 0
  return { count, avg }
}

/** Bitta tomonidan bitta maqolaga bitta baho; qayta baholansa — yangilanadi. IP saqlanmaydi, faqat xeş */
export async function rateNews(newsId: number, value: number): Promise<RateResult> {
  if (!Number.isInteger(newsId) || newsId < 1 || !Number.isInteger(value) || value < 1 || value > 5)
    return { ok: false, message: 'Baho 1 dan 5 gaça bölişi kerak.' }

  const ip = clientIp(await headers())
  if (rateLimited(ip, 'rating')) return { ok: false, message: 'Juda köp urinişlar. Birozdan keyin qayta urinib köring.' }

  try {
    const payload = await getPayload({ config })
    // maqola mavjud va eʼlon qilinganmi
    const doc = await payload.find({
      collection: 'news',
      where: { and: [{ id: { equals: newsId } }, { _status: { equals: 'published' } }] },
      limit: 1,
      depth: 0,
      select: { title: true },
    })
    if (!doc.docs[0]) return { ok: false, message: 'Maqola topilmadi.' }

    const voter = createHash('sha256')
      .update(`${process.env.PAYLOAD_SECRET ?? ''}:${ip}:${newsId}`)
      .digest('hex')
    const prev = await payload.find({
      collection: 'news-ratings',
      where: { and: [{ news: { equals: newsId } }, { voter: { equals: voter } }] },
      limit: 1,
      overrideAccess: true,
    })
    if (prev.docs[0]) {
      await payload.update({ collection: 'news-ratings', id: prev.docs[0].id, data: { value }, overrideAccess: true })
    } else {
      await payload.create({ collection: 'news-ratings', data: { news: newsId, value, voter }, overrideAccess: true })
    }
    return { ok: true, stats: await ratingStats(newsId), mine: value }
  } catch (err) {
    console.error('[baho] saqlaşda xato:', err)
    return { ok: false, message: 'Bahoni saqlab bölmadi. Keyinroq qayta urinib köring.' }
  }
}

export type ReactionCounts = Record<ReactionKind, number>
export type ReactResult = { ok: boolean; message?: string; counts?: ReactionCounts; mine?: ReactionKind | null }

/** Reaksiyalar soni */
export async function reactionCounts(newsId: number): Promise<ReactionCounts> {
  const payload = await getPayload({ config })
  const res = await payload.find({
    collection: 'news-reactions',
    where: { news: { equals: newsId } },
    pagination: false,
    select: { kind: true },
    overrideAccess: true,
  })
  const c = Object.fromEntries(REACTIONS.map((k) => [k, 0])) as ReactionCounts
  for (const d of res.docs) c[d.kind as ReactionKind]++
  return c
}

/** Bitta tomonidan bitta reaksiya: boşqasini bossa — almaşadi, şuni qayta bossa — olib taşlanadi */
export async function reactNews(newsId: number, kind: string): Promise<ReactResult> {
  if (!Number.isInteger(newsId) || newsId < 1 || !REACTIONS.includes(kind as ReactionKind))
    return { ok: false, message: 'Notöğri reaksiya.' }
  const ip = clientIp(await headers())
  if (rateLimited(ip, 'rating')) return { ok: false, message: 'Juda köp urinişlar. Birozdan keyin qayta urinib köring.' }
  try {
    const payload = await getPayload({ config })
    const pub = await payload.find({
      collection: 'news',
      where: { and: [{ id: { equals: newsId } }, { _status: { equals: 'published' } }] },
      limit: 1,
      depth: 0,
      select: { title: true },
    })
    if (!pub.docs[0]) return { ok: false, message: 'Maqola topilmadi.' }
    const voter = createHash('sha256').update(`${process.env.PAYLOAD_SECRET ?? ''}:r:${ip}:${newsId}`).digest('hex')
    const prev = await payload.find({
      collection: 'news-reactions',
      where: { and: [{ news: { equals: newsId } }, { voter: { equals: voter } }] },
      limit: 1,
      overrideAccess: true,
    })
    let mine: ReactionKind | null = kind as ReactionKind
    if (prev.docs[0] && prev.docs[0].kind === kind) {
      await payload.delete({ collection: 'news-reactions', id: prev.docs[0].id, overrideAccess: true })
      mine = null
    } else if (prev.docs[0]) {
      await payload.update({ collection: 'news-reactions', id: prev.docs[0].id, data: { kind: kind as ReactionKind }, overrideAccess: true })
    } else {
      await payload.create({ collection: 'news-reactions', data: { news: newsId, kind: kind as ReactionKind, voter }, overrideAccess: true })
    }
    return { ok: true, counts: await reactionCounts(newsId), mine }
  } catch (err) {
    console.error('[reaksiya] saqlaşda xato:', err)
    return { ok: false, message: 'Reaksiyani saqlab bölmadi.' }
  }
}
