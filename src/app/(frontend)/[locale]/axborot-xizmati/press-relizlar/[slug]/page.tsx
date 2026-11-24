import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { PressItemPage } from '@/components/axborot/AxPages'
import { PageCrumbs } from '@/components/site/PageCrumbs'
import type { Locale } from '@/i18n/config'
import { getPress } from '@/lib/cms/axborot'
import { ichkiMeta } from '@/lib/seo'

import '../../../../axborot.css'

type Props = { params: Promise<{ locale: Locale; slug: string }> }

export async function generateStaticParams() {
  try {
    return (await getPress()).map((p) => ({ slug: p.slug }))
  } catch {
    return []
  }
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { locale, slug } = await props.params
  const p = (await getPress(locale)).find((x) => x.slug === slug)
  return p ? ichkiMeta({ title: p.title, description: p.lead, path: `/uz/axborot-xizmati/press-relizlar/${slug}` }) : {}
}

/** Bitta press-reliz yoki OAV uçun anons (rasmiy blanka) */
export default async function Route(props: Props) {
  const { locale, slug } = await props.params
  const p = (await getPress(locale)).find((x) => x.slug === slug)
  if (!p) notFound()
  return (
    <PressItemPage
      p={p}
      L={(h) => `/${locale}${h}`}
      crumbs={<PageCrumbs locale={locale} path="/axborot-xizmati/press-relizlar" extra={[{ label: p.title }]} />}
    />
  )
}
