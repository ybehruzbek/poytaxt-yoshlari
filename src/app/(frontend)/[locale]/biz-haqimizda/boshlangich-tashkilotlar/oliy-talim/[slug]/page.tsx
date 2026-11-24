import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { LeaderPage } from '@/components/boshlangich/LeaderPage'
import { PageCrumbs } from '@/components/site/PageCrumbs'
import type { Locale } from '@/i18n/config'
import { getOtts } from '@/lib/cms/biz'
import { ichkiMeta } from '@/lib/seo'

import '../../../../../boshlangich.css'

/** Yetakçisi bor OTTlar (admin panel → Biz haqimizda → OTT boşlanğiç taşkilotlari) */
const leaders = async (locale = 'uz') => (await getOtts(locale)).filter((o) => o.leader)
const LIST = '/biz-haqimizda/boshlangich-tashkilotlar/oliy-talim'

type Props = { params: Promise<{ locale: Locale; slug: string }> }

/** Yetakçi sahifalari oldindan tayyorlanadi */
export async function generateStaticParams() {
  try {
    return (await leaders()).map((o) => ({ slug: o.leader!.slug }))
  } catch {
    return []
  }
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { locale, slug } = await props.params
  const o = (await leaders(locale)).find((x) => x.leader!.slug === slug)
  if (!o) return {}
  return ichkiMeta({
    title: `${o.otm} — Yoşlar ittifoqi boşlanğiç taşkiloti, yoşlar yetakçisi ${o.leader!.name}`,
    description: `${o.otm} Yoşlar ittifoqi boşlanğiç taşkiloti yoşlar yetakçisi ${o.leader!.name}: qabul kunlari, aloqa maʼlumotlari va faoliyati.`,
    path: `/uz${LIST}/${slug}`,
  })
}

/** Yetakçining alohida sahifasi (mazmun: components/boshlangich/data.ts) */
export default async function LeaderRoute(props: Props) {
  const { locale, slug } = await props.params
  const LED = await leaders(locale)
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
