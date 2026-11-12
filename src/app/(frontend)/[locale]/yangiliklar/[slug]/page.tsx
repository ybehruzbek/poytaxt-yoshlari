/* eslint-disable @next/next/no-img-element -- rasm Payload'dan tayyor ölçamda keladi */
import { RichText } from '@payloadcms/richtext-lexical/react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import { cache } from 'react'

import config from '@payload-config'
import type { Locale } from '@/i18n/config'
import { CATEGORY_TONE, toNewsCard } from '@/lib/news'
import type { Media } from '@/payload-types'
import { More } from '@/components/site/MoreBtn'
import { PageCrumbs } from '@/components/site/PageCrumbs'
import { toYnItem } from '@/components/yangiliklar/data'

type Props = { params: Promise<{ locale: Locale; slug: string }> }

export const revalidate = 60

const getNews = cache(async (slug: string, locale: Locale) => {
  const payload = await getPayload({ config })
  const res = await payload.find({
    collection: 'news',
    locale,
    depth: 1,
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

/** Bitta yangilik sahifasi (“Batafsil”) */
export default async function NewsPage(props: Props) {
  const { slug, locale } = await props.params
  const doc = await getNews(slug, locale)
  if (!doc) notFound()

  const card = toNewsCard(doc)
  const img = (typeof doc.image === 'object' ? doc.image : null) as Media | null
  const hero = img?.sizes?.hero?.url || img?.url || card.image

  return (
    <article className="nw">
      <header className="pg-head">
        <div className="wrap">
          <PageCrumbs locale={locale} path="/yangiliklar" extra={[{ label: doc.title }]} />
          <div className="nw-meta">
            <span className={`chip ${CATEGORY_TONE[card.category]}`}>{card.categoryLabel}</span>
            <time dateTime={card.dateISO}>{toYnItem(card, 0).long /* “2026-yil 5-noyabr” — hozirgi vaqtga boğliq emas */}</time>
          </div>
          <h1 className="h2 pg-title nw-title">{doc.title}</h1>
        </div>
      </header>
      <section className="sec">
        <div className="wrap nw-body">
          <div className="nw-img">
            <img className="cover" src={hero} alt={card.imageAlt} />
          </div>
          {doc.excerpt && <p className="nw-lede">{doc.excerpt}</p>}
          {doc.content && (
            <div className="news-body">
              <RichText data={doc.content} />
            </div>
          )}
          <Link href={`/${locale}/yangiliklar`} className="more-btn nw-back">
            <More>Barça yangiliklar</More>
          </Link>
        </div>
      </section>
    </article>
  )
}
