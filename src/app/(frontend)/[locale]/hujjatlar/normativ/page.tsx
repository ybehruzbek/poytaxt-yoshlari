import type { Metadata } from 'next'
import Link from 'next/link'

import { NormativPage as Content } from '@/components/hujjatlar/NormativPage'
import { NAV } from '@/config/nav'
import type { Locale } from '@/i18n/config'

import '../../../hujjatlar.css'

export const metadata: Metadata = {
  title: 'Normativ-huquqiy hujjatlar — Özbekiston yoşlar ittifoqi',
  description:
    'Yoşlarga oid davlat siyosati, Özbekiston yoşlar ittifoqi faoliyati hamda yoşlarga yaratilgan imkoniyat va imtiyozlarga doir normativ-huquqiy hujjatlar.',
}

/** «Normativ-huquqiy hujjatlar» sahifasi (mazmun: components/hujjatlar/data.ts) */
export default async function NormativRoute(props: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await props.params
  const L = (h: string) => `/${locale}${h}`
  const group = NAV.find((g) => g.key === 'hujjatlar')!

  const crumbs = (
    <nav className="crumbs" aria-label="Yöl">
      <Link href={L('')}>Boş sahifa</Link>
      <span>/</span>
      <span>{group.label}</span>
      <span>/</span>
      <span aria-current="page">Normativ-huquqiy hujjatlar</span>
    </nav>
  )

  return <Content crumbs={crumbs} />
}
