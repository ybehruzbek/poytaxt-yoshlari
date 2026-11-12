import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { PressItemPage } from '@/components/axborot/AxPages'
import { PRESS } from '@/components/axborot/press'
import { PageCrumbs } from '@/components/site/PageCrumbs'
import type { Locale } from '@/i18n/config'

import '../../../../axborot.css'

type Props = { params: Promise<{ locale: Locale; slug: string }> }

export function generateStaticParams() {
  return PRESS.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { slug } = await props.params
  const p = PRESS.find((x) => x.slug === slug)
  return p
    ? { title: `${p.title} — Özbekiston yoşlar ittifoqi Toşkent şahar hududiy Kengaşi`, description: p.lead }
    : {}
}

/** Bitta press-reliz yoki OAV uçun anons (rasmiy blanka) */
export default async function Route(props: Props) {
  const { locale, slug } = await props.params
  const p = PRESS.find((x) => x.slug === slug)
  if (!p) notFound()
  return (
    <PressItemPage
      p={p}
      L={(h) => `/${locale}${h}`}
      crumbs={<PageCrumbs locale={locale} path="/axborot-xizmati/press-relizlar" extra={[{ label: p.title }]} />}
    />
  )
}
