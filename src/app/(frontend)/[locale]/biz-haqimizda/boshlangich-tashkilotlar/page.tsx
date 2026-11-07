import type { Metadata } from 'next'

import { BoshlangichPage as Content } from '@/components/boshlangich/BoshlangichPage'
import { PageCrumbs } from '@/components/site/PageCrumbs'
import type { Locale } from '@/i18n/config'

import '../../../boshlangich.css'

export const metadata: Metadata = {
  title: 'Boşlanğiç taşkilotlar — Özbekiston yoşlar ittifoqi',
  description:
    'Toşkent şahridagi oliy taʼlim taşkilotlaridagi Özbekiston yoşlar ittifoqi boşlanğiç taşkilotlari va ularning yoşlar yetakçilari.',
}

/** «Boşlanğiç taşkilotlar» sahifasi (mazmun: components/boshlangich/data.ts) */
export default async function BoshlangichRoute(props: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await props.params
  return (
    <Content
      crumbs={<PageCrumbs locale={locale} path="/biz-haqimizda/boshlangich-tashkilotlar" />}
    />
  )
}
