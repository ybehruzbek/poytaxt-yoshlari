import type { Metadata } from 'next'
import { getPayload } from 'payload'

import config from '@payload-config'
import { AnnouncePage } from '@/components/faoliyat/FaPages'
import type { Announce } from '@/components/faoliyat/announcements'
import { PageCrumbs } from '@/components/site/PageCrumbs'
import type { Locale } from '@/i18n/config'
import { toNewsCard } from '@/lib/news'

import '../../../faoliyat.css'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Eʼlonlar — Özbekiston yoşlar ittifoqi Toşkent şahar hududiy Kengaşi',
  description: 'Tanlovlar, röyxatdan ötiş, çellenjlar va tadbir eʼlonlari.',
}

export default async function Route(props: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await props.params
  const payload = await getPayload({ config })
  // “Poytaxt yoşlari” kanalidan kelgan eʼlonlar (admin panelda turi “Eʼlon”)
  const res = await payload.find({
    collection: 'news',
    locale,
    depth: 1,
    limit: 300,
    sort: '-publishedAt',
    where: { and: [{ _status: { equals: 'published' } }, { kind: { equals: 'elon' } }] },
  })
  const extra: Announce[] = res.docs.map((d) => {
    const c = toNewsCard(d)
    return { id: d.tgId ?? d.id, date: c.dateISO.slice(0, 10), title: c.title, text: c.excerpt, img: c.image, href: `/${locale}/yangiliklar/${c.slug}` }
  })
  return <AnnouncePage crumbs={<PageCrumbs locale={locale} path="/faoliyat/elonlar" />} extra={extra} />
}
