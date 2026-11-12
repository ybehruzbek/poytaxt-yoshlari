import type { Metadata } from 'next'

import { OavPage } from '@/components/axborot/AxPages'
import { PageCrumbs } from '@/components/site/PageCrumbs'
import type { Locale } from '@/i18n/config'

import '../../../axborot.css'

export const metadata: Metadata = {
  title: 'OAV biz haqimizda — Özbekiston yoşlar ittifoqi Toşkent şahar hududiy Kengaşi',
  description: 'Kengaş faoliyati haqida OAV va davlat organlari saytlaridagi materiallar.',
}

/** “OAV biz haqimizda” sahifasi (mazmun: components/axborot) */
export default async function Route(props: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await props.params
  return <OavPage crumbs={<PageCrumbs locale={locale} path="/axborot-xizmati/oav" />} />
}
