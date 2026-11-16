import type { Metadata } from 'next'

import { BenefitsPage } from '@/components/imtiyozlar/BenefitsPage'
import { PageCrumbs } from '@/components/site/PageCrumbs'
import type { Locale } from '@/i18n/config'

import '../../../faoliyat.css'
import '../../../grantlar.css'

export const metadata: Metadata = {
  title: 'Yoşlar va talabalar uçun imtiyozlar — Özbekiston yoşlar ittifoqi Toşkent şahar hududiy Kengaşi',
  description:
    'Talabalar ijarasi, kontrakt tölovini qoplaş, taʼlim krediti, xalqaro imtihon xarajatlari, Yoşlar daftari va boşqa imtiyozlar: miqdorlari, şartlari va kalkulyator.',
}

export default async function Route(props: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await props.params
  return <BenefitsPage locale={locale} crumbs={<PageCrumbs locale={locale} path="/faoliyat/imtiyozlar" />} />
}
