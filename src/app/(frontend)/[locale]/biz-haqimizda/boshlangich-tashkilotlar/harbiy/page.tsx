import type { Metadata } from 'next'

import { HarbiyPage as Content } from '@/components/boshlangich/HarbiyPage'
import { PageCrumbs } from '@/components/site/PageCrumbs'
import type { Locale } from '@/i18n/config'

import '../../../../boshlangich.css'

export const metadata: Metadata = {
  title: 'Harbiy qismlar va muassasalardagi boşlanğiç taşkilotlar — Özbekiston yoşlar ittifoqi',
  description:
    'Toşkent şahridagi harbiy qismlar va muassasalarda faoliyat yuritayotgan Özbekiston yoşlar ittifoqi boşlanğiç taşkilotlari.',
}

/** “Harbiy qismlar va muassasalardagi boşlanğiç taşkilotlar” sahifasi */
export default async function HarbiyRoute(props: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await props.params
  return (
    <Content
      crumbs={<PageCrumbs locale={locale} path="/biz-haqimizda/boshlangich-tashkilotlar/harbiy" />}
    />
  )
}
