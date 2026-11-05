import Link from 'next/link'
import { getPayload } from 'payload'

import config from '@payload-config'
import type { Locale } from '@/i18n/config'
import { NEWS_PAGE_SIZE, toNewsCard } from '@/lib/news'
import { NewsRotator } from './NewsRotator'

/**
 * So'nggi yangiliklar — hero ostida.
 * Birinchi 5 ta yangilik serverda bazadan olinadi; keyingilarini NewsRotator brauzerda o'zi yuklaydi.
 */
export async function News({ locale }: { locale: Locale }) {
  const payload = await getPayload({ config })
  const res = await payload.find({
    collection: 'news',
    locale,
    limit: NEWS_PAGE_SIZE,
    sort: '-publishedAt',
    depth: 1,
    where: { _status: { equals: 'published' } },
  })
  if (!res.totalDocs) return null

  return (
    <section className="sec news-sec" id="yangiliklar" aria-labelledby="news-title">
      <div className="wrap">
        <div className="sec-head">
          <h2 className="h2" id="news-title">So‘nggi yangiliklar</h2>
          <Link href={`/${locale}/yangiliklar`} className="btn btn-ghost">Barcha yangiliklar</Link>
        </div>
        <NewsRotator locale={locale} initial={res.docs.map(toNewsCard)} total={res.totalDocs} />
      </div>
    </section>
  )
}
