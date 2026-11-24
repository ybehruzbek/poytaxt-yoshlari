import { getPayload } from 'payload'

import config from '@payload-config'
import { AnnouncePage } from '@/components/faoliyat/FaPages'
import type { Announce } from '@/components/faoliyat/types'
import { PageCrumbs } from '@/components/site/PageCrumbs'
import type { Locale } from '@/i18n/config'
import { toNewsCard } from '@/lib/news'

import '../../../faoliyat.css'
import { sahifaMeta } from '@/lib/seo'

export const revalidate = 60

export const metadata = sahifaMeta('/faoliyat/elonlar')

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
    // poster kesilmasligi uçun asl nisbatdagi rasm olinadi (card ölçami 800×500 qilib kesadi)
    const m = typeof d.image === 'object' && d.image ? d.image : null
    const hero = m?.sizes?.hero?.url ? m.sizes.hero : null
    const poster = hero?.url || m?.url || c.image
    const w = (hero ? hero.width : m?.width) ?? undefined
    const h = (hero ? hero.height : m?.height) ?? undefined
    return {
      id: d.tgId ?? d.id,
      date: c.dateISO.slice(0, 10),
      title: c.title,
      text: c.excerpt,
      img: poster,
      w,
      h,
      href: `/${locale}/yangiliklar/${c.slug}`,
    }
  })
  return <AnnouncePage crumbs={<PageCrumbs locale={locale} path="/faoliyat/elonlar" />} extra={extra} />
}
