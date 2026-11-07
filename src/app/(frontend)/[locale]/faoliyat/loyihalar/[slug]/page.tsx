import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { PROJECTS } from '@/components/faoliyat/data'
import { ProjectPage } from '@/components/faoliyat/FaPages'
import { PageCrumbs } from '@/components/site/PageCrumbs'
import type { Locale } from '@/i18n/config'

import '../../../../faoliyat.css'

type Props = { params: Promise<{ locale: Locale; slug: string }> }

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { slug } = await props.params
  const p = PROJECTS.find((x) => x.slug === slug)
  return p ? { title: `${p.title} — Loyihalar`, description: p.lead } : {}
}

export default async function Route(props: Props) {
  const { locale, slug } = await props.params
  const p = PROJECTS.find((x) => x.slug === slug)
  if (!p) notFound()
  return (
    <ProjectPage
      slug={slug}
      listHref={`/${locale}/faoliyat/loyihalar`}
      crumbs={
        <PageCrumbs locale={locale} path="/faoliyat/loyihalar" extra={[{ label: p.title }]} />
      }
    />
  )
}
