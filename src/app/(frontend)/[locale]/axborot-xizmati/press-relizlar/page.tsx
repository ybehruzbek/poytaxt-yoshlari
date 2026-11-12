import type { Metadata } from 'next'

import { PressPage } from '@/components/axborot/AxPages'
import { PageCrumbs } from '@/components/site/PageCrumbs'
import type { Locale } from '@/i18n/config'

import '../../../axborot.css'

export const metadata: Metadata = {
  title: 'Press-relizlar — Özbekiston yoşlar ittifoqi Toşkent şahar hududiy Kengaşi',
  description: 'Kengaşning rasmiy xabarlari, eʼlonlari va tanlovlari; jurnalistlar uçun aloqa.',
}

/** “Press-relizlar” sahifasi (mazmun: components/axborot) */
export default async function Route(props: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await props.params
  return <PressPage crumbs={<PageCrumbs locale={locale} path="/axborot-xizmati/press-relizlar" />} />
}
