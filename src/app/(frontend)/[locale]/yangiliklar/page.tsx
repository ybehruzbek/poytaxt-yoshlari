import type { Metadata } from 'next'
import { getPayload } from 'payload'

import config from '@payload-config'
import { PageCrumbs } from '@/components/site/PageCrumbs'
import { toYnItem } from '@/components/yangiliklar/data'
import { YangiliklarPage } from '@/components/yangiliklar/YangiliklarPage'
import type { Locale } from '@/i18n/config'
import { toNewsCard } from '@/lib/news'

import '../../yangiliklar.css'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Yangiliklar — Özbekiston yoşlar ittifoqi Toşkent şahar hududiy Kengaşi',
  description:
    'Kengaş faoliyati, OTT boşlanğiç taşkilotlari, tadbirlar va yoşlar uçun imkoniyatlar haqidagi sönggi yangiliklar.',
}

/** “Yangiliklar” sahifasi: barça eʼlon qilingan yangiliklar (Payload → news) */
export default async function YangiliklarRoute(props: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await props.params
  const payload = await getPayload({ config })
  const res = await payload.find({
    collection: 'news',
    locale,
    limit: 200,
    sort: '-publishedAt',
    depth: 1,
    where: { _status: { equals: 'published' } },
  })
  const items = res.docs.map((d) => toYnItem(toNewsCard(d)))

  return (
    <YangiliklarPage
      items={items}
      locale={locale}
      crumbs={<PageCrumbs locale={locale} path="/yangiliklar" />}
    />
  )
}
