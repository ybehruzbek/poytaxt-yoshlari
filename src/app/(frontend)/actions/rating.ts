'use server'

import { createHash } from 'crypto'
import { headers } from 'next/headers'
import { getPayload } from 'payload'

import { clientIp, rateLimited } from '@/lib/rate-limit'
import { REACTIONS, type ReactionKind } from '@/collections/NewsReactions'
import config from '@/payload.config'

import { ratingStats, reactionCounts, type ReactionCounts, type RatingStats } from '@/lib/news-votes'
import { logError } from '@/lib/log-error'

export type { ReactionCounts, RatingStats }
export type RateResult = { ok: boolean; message?: string; stats?: RatingStats; mine?: number }

/** Bitta tomonidan bitta maqolaga bitta baho; qayta baholansa — yangilanadi. IP saqlanmaydi, faqat xeş */
export async function rateNews(newsId: number, value: number): Promise<RateResult> {
  if (!Number.isInteger(newsId) || newsId < 1 || !Number.isInteger(value) || value < 1 || value > 5)
    return { ok: false, message: 'Baho 1 dan 5 gaça bölişi kerak.' }

  const ip = clientIp(await headers())
  if (rateLimited(ip, 'rating')) return { ok: false, message: 'Urinişlar soni belgilangan çegaradan oşdi. Iltimos, birozdan söng qayta urinib köring.' }

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
    logError('baho', err)
    return { ok: false, message: 'Bahoni saqlab bölmadi. Keyinroq qayta urinib köring.' }
  }
}

export type ReactResult = { ok: boolean; message?: string; counts?: ReactionCounts; mine?: ReactionKind | null }

/** Bitta tomonidan bitta reaksiya: boşqasini bossa — almaşadi, şuni qayta bossa — olib taşlanadi */
export async function reactNews(newsId: number, kind: string): Promise<ReactResult> {
  if (!Number.isInteger(newsId) || newsId < 1 || !REACTIONS.includes(kind as ReactionKind))
    return { ok: false, message: 'Notöğri reaksiya.' }
  const ip = clientIp(await headers())
  if (rateLimited(ip, 'rating')) return { ok: false, message: 'Urinişlar soni belgilangan çegaradan oşdi. Iltimos, birozdan söng qayta urinib köring.' }
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
    logError('reaksiya', err)
    return { ok: false, message: 'Reaksiyani saqlab bölmadi.' }
  }
}
