import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { DIRECTIONS } from '@/components/faoliyat/data'
import { DirectionPage } from '@/components/faoliyat/FaPages'
import { PageCrumbs } from '@/components/site/PageCrumbs'
import type { Locale } from '@/i18n/config'

import '../../../../faoliyat.css'

type Props = { params: Promise<{ locale: Locale; slug: string }> }

export function generateStaticParams() {
  return DIRECTIONS.map((d) => ({ slug: d.slug }))
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { slug } = await props.params
  const d = DIRECTIONS.find((x) => x.slug === slug)
  return d ? { title: `${d.title} — Faoliyat yönalişlari`, description: d.lead } : {}
}

export default async function Route(props: Props) {
  const { locale, slug } = await props.params
  const d = DIRECTIONS.find((x) => x.slug === slug)
  if (!d) notFound()
  const L = (h: string) => `/${locale}${h}`
  return (
    <DirectionPage
      slug={slug}
      projBase={L('/faoliyat/loyihalar')}
      listHref={L('/faoliyat/yonalishlar')}
      crumbs={
        <PageCrumbs locale={locale} path="/faoliyat/yonalishlar" extra={[{ label: d.title }]} />
      }
    />
  )
}
