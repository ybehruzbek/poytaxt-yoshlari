import type { Metadata } from 'next'
import { getPayload } from 'payload'

import config from '@payload-config'
import { PageCrumbs } from '@/components/site/PageCrumbs'
import { toYnItems } from '@/components/yangiliklar/data'
import { YangiliklarPage } from '@/components/yangiliklar/YangiliklarPage'
import type { Locale } from '@/i18n/config'
import { toNewsCard } from '@/lib/news'

import '../../../../yangiliklar.css'

export const revalidate = 60

type Props = { params: Promise<{ locale: Locale; teg: string }> }

const tagOf = (raw: string) => decodeURIComponent(raw).trim().slice(0, 80)

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { teg } = await props.params
  return { title: `#${tagOf(teg)} — Yangiliklar — Özbekiston yoşlar ittifoqi Toşkent şahar hududiy Kengaşi` }
}

/** Teg böyiça yangiliklar: /yangiliklar/teg/Kitobxonlik */
export default async function TagRoute(props: Props) {
  const { locale, teg } = await props.params
  const tag = tagOf(teg)
  const payload = await getPayload({ config })
  const res = await payload.find({
    collection: 'news',
    locale,
    limit: 200,
    sort: '-publishedAt',
    depth: 1,
    where: { and: [{ _status: { equals: 'published' } }, { tags: { contains: tag } }] },
  })
  return (
    <YangiliklarPage
      items={toYnItems(res.docs.map(toNewsCard))}
      locale={locale}
      title={`#${tag}`}
      crumbs={<PageCrumbs locale={locale} path="/yangiliklar" extra={[{ label: `#${tag}` }]} />}
    />
  )
}
