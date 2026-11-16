import type { Metadata } from 'next'

import { PageCrumbs } from '@/components/site/PageCrumbs'
import { ContestsPage } from '@/components/tanlovlar/ContestsPage'
import type { Locale } from '@/i18n/config'

import '../../../faoliyat.css'
import '../../../grantlar.css'

export const metadata: Metadata = {
  title: 'Tanlovlar — Özbekiston yoşlar ittifoqi Toşkent şahar hududiy Kengaşi',
  description:
    'Yoşlar uçun davlat mukofotlari hamda ilm-fan, madaniyat, sanʼat, adabiyot, tibbiyot, sport va raqamli ijod sohalaridagi tanlovlar: şartlari, mukofotlari, muddatlari va rasmiy manbalari.',
}

export default async function Route(props: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await props.params
  return <ContestsPage locale={locale} crumbs={<PageCrumbs locale={locale} path="/faoliyat/tanlovlar" />} />
}
