import type { Metadata } from 'next'

import { NormativPage as Content } from '@/components/hujjatlar/NormativPage'
import { PageCrumbs } from '@/components/site/PageCrumbs'
import type { Locale } from '@/i18n/config'

import '../../../hujjatlar.css'

export const metadata: Metadata = {
  title: 'Normativ-huquqiy hujjatlar — Özbekiston yoşlar ittifoqi',
  description:
    'Yoşlarga oid davlat siyosati, Özbekiston yoşlar ittifoqi faoliyati hamda yoşlarga yaratilgan imkoniyat va imtiyozlarga doir normativ-huquqiy hujjatlar.',
}

/** “Normativ-huquqiy hujjatlar” sahifasi (mazmun: components/hujjatlar/data.ts) */
export default async function NormativRoute(props: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await props.params
  const crumbs = <PageCrumbs locale={locale} path="/hujjatlar/normativ" />

  return <Content crumbs={crumbs} locale={locale} />
}
