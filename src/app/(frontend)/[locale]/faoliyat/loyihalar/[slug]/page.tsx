import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { ProjectPage } from '@/components/faoliyat/FaPages'
import { PageCrumbs } from '@/components/site/PageCrumbs'
import type { Locale } from '@/i18n/config'
import { getFaoliyat } from '@/lib/cms/faoliyat'

import '../../../../faoliyat.css'

type Props = { params: Promise<{ locale: Locale; slug: string }> }

export async function generateStaticParams() {
  try {
    return (await getFaoliyat()).projects.map((p) => ({ slug: p.slug }))
  } catch {
    return []
  }
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { locale, slug } = await props.params
  const p = (await getFaoliyat(locale)).projects.find((x) => x.slug === slug)
  return p ? { title: `${p.title} — Loyihalar`, description: p.lead } : {}
}

export default async function Route(props: Props) {
  const { locale, slug } = await props.params
  const p = (await getFaoliyat(locale)).projects.find((x) => x.slug === slug)
  if (!p) notFound()
  return (
    <ProjectPage
      slug={slug}
      locale={locale}
      listHref={`/${locale}/faoliyat/loyihalar`}
      crumbs={<PageCrumbs locale={locale} path="/faoliyat/loyihalar" extra={[{ label: p.title }]} />}
    />
  )
}
