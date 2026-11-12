import type { Metadata } from 'next'

import { BoshlangichPage as Content } from '@/components/boshlangich/BoshlangichPage'
import { PageCrumbs } from '@/components/site/PageCrumbs'
import type { Locale } from '@/i18n/config'

import '../../../../boshlangich.css'

export const metadata: Metadata = {
  title: 'Oliy taʼlim taşkilotlaridagi boşlanğiç taşkilotlar — Özbekiston yoşlar ittifoqi Toşkent şahar hududiy Kengaşi',
  description:
    'Toşkent şahridagi oliy taʼlim taşkilotlaridagi Özbekiston yoşlar ittifoqi boşlanğiç taşkilotlari va ularning yoşlar yetakçilari.',
}

/** “Oliy taʼlim taşkilotlaridagi boşlanğiç taşkilotlar” sahifasi (mazmun: components/boshlangich/data.ts) */
export default async function BoshlangichRoute(props: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await props.params
  return (
    <Content
      base={`/${locale}/biz-haqimizda/boshlangich-tashkilotlar/oliy-talim`}
      crumbs={
        <PageCrumbs locale={locale} path="/biz-haqimizda/boshlangich-tashkilotlar/oliy-talim" />
      }
    />
  )
}
