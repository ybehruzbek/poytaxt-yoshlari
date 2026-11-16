import Link from 'next/link'
import { getPayload } from 'payload'

import config from '@payload-config'
import type { Locale } from '@/i18n/config'
import { NEWS_ONLY, NEWS_PAGE_SIZE, toNewsCard } from '@/lib/news'
import { getBosh } from '@/lib/cms/sahifalar'
import { NewsRotator } from './NewsRotator'

/**
 * So'nggi yangiliklar — hero ostida.
 * Faqat sönggi 5 ta yangilik olinadi va aylanib turadi; qolgani “Barça yangiliklar” sahifasida.
 */
export async function News({ locale }: { locale: Locale }) {
  const payload = await getPayload({ config })
  const res = await payload.find({
    collection: 'news',
    locale,
    limit: NEWS_PAGE_SIZE,
    sort: '-publishedAt',
    depth: 1,
    where: { and: [{ _status: { equals: 'published' } }, NEWS_ONLY] },
  })
  if (!res.totalDocs) return null
  const { heads } = await getBosh(locale)

  return (
    <section className="sec news-sec" id="yangiliklar" aria-labelledby="news-title">
      <div className="wrap">
        <div className="sec-head">
          <h2 className="h2" id="news-title">{heads.news || 'Sönggi yangiliklar'}</h2>
          <Link href={`/${locale}/yangiliklar`} className="btn btn-ghost">Barça yangiliklar
            <span className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg></span>
          </Link>
        </div>
        <NewsRotator locale={locale} initial={res.docs.map(toNewsCard)} />
      </div>
    </section>
  )
}
