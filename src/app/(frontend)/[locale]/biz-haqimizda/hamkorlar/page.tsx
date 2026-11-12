import type { Metadata } from 'next'

import { HamkorlarPage } from '@/components/hamkorlar/HamkorlarPage'
import { PageCrumbs } from '@/components/site/PageCrumbs'
import type { Locale } from '@/i18n/config'


export const metadata: Metadata = {
  title: 'Hamkorlar — Özbekiston yoşlar ittifoqi Toşkent şahar hududiy Kengaşi',
  description: 'Özbekiston yoşlar ittifoqining Özbekistondagi va xalqaro hamkorlari: vazirlik va idoralar, davlat korxonalari, nodavlat notijorat taşkilotlar, OAV va xorijiy yoşlar taşkilotlari.',
}

/** “Hamkorlar” sahifasi (Biz haqimizda menyusi) */
export default async function HamkorlarRoute(props: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await props.params
  return <HamkorlarPage crumbs={<PageCrumbs locale={locale} path="/biz-haqimizda/hamkorlar" />} />
}
