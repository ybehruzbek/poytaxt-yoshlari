import type { Metadata } from 'next'

import { AzolikPage } from '@/components/azolik/AzolikPage'
import { PageCrumbs } from '@/components/site/PageCrumbs'
import type { Locale } from '@/i18n/config'

import '../../../azolik.css'

export const metadata: Metadata = {
  title: 'Aʼzo böliş — Özbekiston yoşlar ittifoqi Toşkent şahar hududiy Kengaşi',
  description: 'Özbekiston yoşlar ittifoqiga aʼzolik şartlari, qabul qiliş tartibi va ariza.',
}

/** “Aʼzo böliş” sahifasi */
export default async function AzolikRoute(props: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await props.params
  const L = (h: string) => `/${locale}${h}`
  return <AzolikPage L={L} crumbs={<PageCrumbs locale={locale} path="/boglanish/azo-bolish" />} />
}
