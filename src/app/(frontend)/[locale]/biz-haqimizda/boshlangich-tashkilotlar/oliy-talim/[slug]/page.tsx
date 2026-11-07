import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { OTMS } from '@/components/boshlangich/data'
import { LeaderPage } from '@/components/boshlangich/LeaderPage'
import { PageCrumbs } from '@/components/site/PageCrumbs'
import type { Locale } from '@/i18n/config'

import '../../../../../boshlangich.css'

const LED = OTMS.filter((o) => o.leader)
const LIST = '/biz-haqimizda/boshlangich-tashkilotlar/oliy-talim'

type Props = { params: Promise<{ locale: Locale; slug: string }> }

/** 84 ta yetakçi sahifasi oldindan tayyorlanadi */
export function generateStaticParams() {
  return LED.map((o) => ({ slug: o.leader!.slug }))
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { slug } = await props.params
  const o = LED.find((x) => x.leader!.slug === slug)
  if (!o) return {}
  return {
    title: `${o.leader!.name} — ${o.otm} boşlanğiç taşkiloti yoşlar yetakçisi`,
    description: `${o.otm} boşlanğiç taşkiloti yoşlar yetakçisi ${o.leader!.name}: aloqa va faoliyat.`,
  }
}

/** Yetakçining alohida sahifasi (mazmun: components/boshlangich/data.ts) */
export default async function LeaderRoute(props: Props) {
  const { locale, slug } = await props.params
  const i = LED.findIndex((x) => x.leader!.slug === slug)
  if (i < 0) notFound()
  const o = LED[i]
  return (
    <LeaderPage
      o={o}
      list={`/${locale}${LIST}`}
      prev={LED[i - 1]}
      next={LED[i + 1]}
      crumbs={<PageCrumbs locale={locale} path={LIST} extra={[{ label: o.leader!.name }]} />}
    />
  )
}
