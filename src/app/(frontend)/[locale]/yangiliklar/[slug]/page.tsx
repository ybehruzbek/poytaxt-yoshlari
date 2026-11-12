import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import { cache } from 'react'

import config from '@payload-config'
import type { Locale } from '@/i18n/config'
import { CATEGORY_TONE, toNewsCard } from '@/lib/news'
import type { Author, Media, News } from '@/payload-types'
import { PageCrumbs } from '@/components/site/PageCrumbs'
import { Article, type ArticleData, type MiniNews } from '@/components/yangiliklar/Article'
import { toYnItem } from '@/components/yangiliklar/data'
import { reactionCounts, ratingStats } from '@/lib/news-votes'

type Props = { params: Promise<{ locale: Locale; slug: string }> }

export const revalidate = 60

const getNews = cache(async (slug: string, locale: Locale) => {
  const payload = await getPayload({ config })
  const res = await payload.find({
    collection: 'news',
    locale,
    depth: 2,
    limit: 1,
    where: { and: [{ slug: { equals: slug } }, { _status: { equals: 'published' } }] },
  })
  return res.docs[0] ?? null
})

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { slug, locale } = await props.params
  const doc = await getNews(slug, locale)
  if (!doc) return {}
  return { title: `${doc.title} — Özbekiston yoşlar ittifoqi Toşkent şahar hududiy Kengaşi`, description: doc.excerpt }
}

/** Matndagi sözlar soni (lexical JSON) — öqiş vaqti uçun */
function words(node: unknown): number {
  if (!node || typeof node !== 'object') return 0
  const n = node as { text?: string; children?: unknown[]; root?: unknown }
  let c = typeof n.text === 'string' ? n.text.split(/\s+/).filter(Boolean).length : 0
  if (n.root) c += words(n.root)
  if (Array.isArray(n.children)) for (const ch of n.children) c += words(ch)
  return c
}

const media = (m: News['image'] | number | null | undefined) => (m && typeof m === 'object' ? (m as Media) : null)

/** Bitta yangilik sahifasi (“Batafsil”) */
export default async function NewsPage(props: Props) {
  const { slug, locale } = await props.params
  const doc = await getNews(slug, locale)
  if (!doc) notFound()

  const card = toNewsCard(doc)
  const img = media(doc.image)
  const total = words(doc.content) + (doc.excerpt ? doc.excerpt.split(/\s+/).length : 0)

  const a: ArticleData = {
    title: doc.title,
    catLabel: card.categoryLabel,
    tone: CATEGORY_TONE[card.category],
    date: toYnItem(card, 0).long,
    dateISO: card.dateISO,
    readMin: Math.max(1, Math.round(total / 180)),
    hero: img?.sizes?.hero?.url || img?.url || card.image,
    heroAlt: img?.alt || card.imageAlt,
    caption: doc.imageCaption,
    excerpt: doc.excerpt,
    content: doc.content,
    gallery: (doc.gallery ?? [])
      .map((g) => media(g as News['image']))
      .filter((m): m is Media => !!m)
      .map((m) => ({ url: m.sizes?.hero?.url || m.url || '', alt: m.alt || '' }))
      .filter((g) => g.url),
    source: doc.source,
    url: `/${locale}/yangiliklar/${slug}`,
    id: doc.id,
    author: (() => {
      const au = doc.author && typeof doc.author === 'object' ? (doc.author as Author) : null
      if (!au) return null
      const ph = media(au.photo as News['image'])
      return { name: au.name, position: au.position, photo: ph?.sizes?.thumb?.url || ph?.url || null }
    })(),
    tags: (doc.tags ?? []).filter(Boolean),
    rating: await ratingStats(doc.id),
    reactions: await reactionCounts(doc.id),
    tagHref: (t: string) => `/${locale}/yangiliklar/teg/${encodeURIComponent(t)}`,
  }

  // öxşaş (şu turkumdan) va sönggi yangiliklar
  const payload = await getPayload({ config })
  const base = { collection: 'news' as const, locale, depth: 1, sort: '-publishedAt' }
  const [same, last] = await Promise.all([
    payload.find({ ...base, limit: 3, where: { and: [{ _status: { equals: 'published' } }, { category: { equals: doc.category } }, { id: { not_equals: doc.id } }] } }),
    payload.find({ ...base, limit: 7, where: { and: [{ _status: { equals: 'published' } }, { id: { not_equals: doc.id } }] } }),
  ])
  const mini = (n: News): MiniNews => {
    const c = toNewsCard(n)
    return { href: `/${locale}/yangiliklar/${c.slug}`, title: c.title, date: toYnItem(c, 0).long, image: c.image, catLabel: c.categoryLabel, tone: CATEGORY_TONE[c.category] }
  }
  // turkumda 3 ta bölmasa — sönggilari bilan töldiriladi
  const related = [...same.docs, ...last.docs.filter((n) => !same.docs.some((x) => x.id === n.id))].slice(0, 3).map(mini)

  return (
    <Article
      a={a}
      crumbs={<PageCrumbs locale={locale} path="/yangiliklar" extra={[{ label: doc.title }]} />}
      related={related}
      latest={last.docs.slice(0, 6).map(mini)}
      listHref={`/${locale}/yangiliklar`}
    />
  )
}
