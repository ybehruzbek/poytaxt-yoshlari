/* eslint-disable @next/next/no-img-element -- rasm Payload'dan tayyor o'lchamda keladi */
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
  return { title: `${doc.title} — Yoşlar Ittifoqi Toşkent şahar hududiy kengaşi`, description: doc.excerpt }
}

/** Bitta yangilik sahifasi ("Batafsil o'qish") */
export default async function NewsPage(props: Props) {
  const { slug, locale } = await props.params
  const doc = await getNews(slug, locale)
  if (!doc) notFound()

  const card = toNewsCard(doc)
  const img = (typeof doc.image === 'object' ? doc.image : null) as Media | null
  const hero = img?.sizes?.hero?.url || img?.url || card.image

  return (
    <article>
      <section className="page-hero">
        <div className="wrap">
          <nav className="crumbs" aria-label="Yöl">
            <Link href={`/${locale}`}>Boş sahifa</Link>
            <span>/</span>
            <Link href={`/${locale}/yangiliklar`}>Yangiliklar</Link>
          </nav>
          <div className="news-sec" style={{ marginBottom: 18 }}>
            <div className="meta">
              <span className={`chip ${CATEGORY_TONE[card.category]}`}>{card.categoryLabel}</span>
              <time dateTime={card.dateISO}>{card.date}</time>
            </div>
          </div>
          <h1 className="h1" style={{ maxWidth: 980 }}>{doc.title}</h1>
          <p className="lead">{doc.excerpt}</p>
        </div>
      </section>
      <section className="sec">
        <div className="wrap" style={{ display: 'grid', gap: 40, maxWidth: 1040 }}>
          <div style={{ borderRadius: 40, overflow: 'hidden', aspectRatio: '16 / 9', background: 'var(--soft)' }}>
            <img className="cover" src={hero} alt={card.imageAlt} />
          </div>
          {doc.content && (
            <div className="news-body">
              <RichText data={doc.content} />
            </div>
          )}
          <Link href={`/${locale}/yangiliklar`} className="btn btn-ghost" style={{ justifySelf: 'start', color: 'var(--navy)' }}>
            ← Barça yangiliklar
          </Link>
        </div>
      </section>
    </article>
  )
}
