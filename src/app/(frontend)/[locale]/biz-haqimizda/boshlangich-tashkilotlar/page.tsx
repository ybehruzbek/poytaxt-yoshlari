import type { Metadata } from 'next'

import { BtHub as Content } from '@/components/boshlangich/BtHub'
import { PageCrumbs } from '@/components/site/PageCrumbs'
import type { Locale } from '@/i18n/config'

import '../../../boshlangich.css'

export const metadata: Metadata = {
  title: 'Boşlanğiç taşkilotlar — Özbekiston yoşlar ittifoqi',
  description:
    'Özbekiston yoşlar ittifoqining Toşkent şahridagi boşlanğiç taşkilotlari: oliy taʼlim taşkilotlarida hamda harbiy qismlar va muassasalarda.',
}

/** “Boşlanğiç taşkilotlar” — ikki yönaliş: oliy taʼlim taşkilotlari va harbiy qismlar */
export default async function BtHubRoute(props: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await props.params
  const L = (h: string) => `/${locale}${h}`
  return (
    <Content
      L={L}
      crumbs={<PageCrumbs locale={locale} path="/biz-haqimizda/boshlangich-tashkilotlar" />}
    />
  )
}
