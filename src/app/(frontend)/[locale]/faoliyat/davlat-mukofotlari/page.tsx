import type { Metadata } from 'next'

import { AwardsPage } from '@/components/mukofotlar/AwardsPage'
import { PageCrumbs } from '@/components/site/PageCrumbs'
import type { Locale } from '@/i18n/config'

import '../../../faoliyat.css'
import '../../../grantlar.css'

export const metadata: Metadata = {
  title: 'Yoşlar uçun davlat mukofotlari — Özbekiston yoşlar ittifoqi Toşkent şahar hududiy Kengaşi',
  description:
    '“Mard öğlon”, “Zulfiya”, “Kelajak bunyodkori” va “Ilğor ijodkor” davlat mukofotlari: kimlar oladi, nima beriladi, saralaş tartibi va nizomlari.',
}

export default async function Route(props: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await props.params
  return <AwardsPage locale={locale} crumbs={<PageCrumbs locale={locale} path="/faoliyat/davlat-mukofotlari" />} />
}
