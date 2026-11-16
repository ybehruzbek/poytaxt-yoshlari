import type { Metadata } from 'next'

import { PageCrumbs } from '@/components/site/PageCrumbs'
import { VolPage } from '@/components/volontyorlik/VolPage'
import type { Locale } from '@/i18n/config'

import '../../../azolik.css'
import '../../../faoliyat.css'
import '../../../volontyorlik.css'

export const metadata: Metadata = {
  title: 'Volontyorlik — Özbekiston yoşlar ittifoqi Toşkent şahar hududiy Kengaşi',
  description:
    'Volontyorlik yönalişlari, mos yönalişni aniqlaş testi, volontyor böliş tartibi, onlayn ariza hamda volontyorning qonun bilan belgilangan huquq va majburiyatlari.',
}

export default async function Route(props: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await props.params
  return (
    <VolPage
      locale={locale}
      crumbs={<PageCrumbs locale={locale} path="/faoliyat/volontyorlik" />}
      projectHref={`/${locale}/faoliyat/loyihalar/universe-volontyorlar`}
    />
  )
}
