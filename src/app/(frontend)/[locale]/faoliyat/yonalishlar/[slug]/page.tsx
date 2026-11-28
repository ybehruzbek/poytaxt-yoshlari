import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { DirectionPage } from '@/components/faoliyat/FaPages'
import { PageCrumbs } from '@/components/site/PageCrumbs'
import type { Locale } from '@/i18n/config'
import { getFaoliyat } from '@/lib/cms/faoliyat'
import { ichkiMeta } from '@/lib/seo'

import '../../../../faoliyat.css'

type Props = { params: Promise<{ locale: Locale; slug: string }> }

export async function generateStaticParams() {
  try {
    return (await getFaoliyat()).directions.map((d) => ({ slug: d.slug }))
  } catch {
    return []
  }
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { locale, slug } = await props.params
  const d = (await getFaoliyat(locale)).directions.find((x) => x.slug === slug)
  return d ? ichkiMeta({ title: `${d.title} — Faoliyat yo‘nalishlari`, description: d.about, path: `/uz/faoliyat/yonalishlar/${slug}` }) : {}
}

export default async function Route(props: Props) {
  const { locale, slug } = await props.params
  const d = (await getFaoliyat(locale)).directions.find((x) => x.slug === slug)
  if (!d) notFound()
  const L = (h: string) => `/${locale}${h}`
  return (
    <DirectionPage
      slug={slug}
      locale={locale}
      projBase={L('/faoliyat/loyihalar')}
      listHref={L('/faoliyat/yonalishlar')}
      crumbs={<PageCrumbs locale={locale} path="/faoliyat/yonalishlar" extra={[{ label: d.title }]} />}
    />
  )
}
