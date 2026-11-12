import 'server-only'

import { getPayload } from 'payload'

import { REACTIONS, type ReactionKind } from '@/collections/NewsReactions'
import config from '@/payload.config'

/** Faqat serverda (sahifa çizilişida) işlatiladi — mijozdan çaqirib bölmaydi */
export type RatingStats = { count: number; avg: number }
export type ReactionCounts = Record<ReactionKind, number>

const MAX = 5000

/** Maqola baholari: soni va örtaça (1 xona aniqlik) */
export async function ratingStats(newsId: number): Promise<RatingStats> {
  if (!Number.isInteger(newsId) || newsId < 1) return { count: 0, avg: 0 }
  const payload = await getPayload({ config })
  const res = await payload.find({
    collection: 'news-ratings',
    where: { news: { equals: newsId } },
    limit: MAX,
    depth: 0,
    select: { value: true },
    overrideAccess: true,
  })
  const vals = res.docs.map((d) => d.value)
  const count = res.totalDocs
  const avg = vals.length ? Math.round((vals.reduce((a, b) => a + b, 0) / vals.length) * 10) / 10 : 0
  return { count, avg }
}

/** Reaksiyalar soni (har bir tur uçun alohida sanaş) */
export async function reactionCounts(newsId: number): Promise<ReactionCounts> {
  const c = Object.fromEntries(REACTIONS.map((k) => [k, 0])) as ReactionCounts
  if (!Number.isInteger(newsId) || newsId < 1) return c
  const payload = await getPayload({ config })
  await Promise.all(
    REACTIONS.map(async (k) => {
      const r = await payload.count({
        collection: 'news-reactions',
        where: { and: [{ news: { equals: newsId } }, { kind: { equals: k } }] },
        overrideAccess: true,
      })
      c[k] = r.totalDocs
    }),
  )
  return c
}
