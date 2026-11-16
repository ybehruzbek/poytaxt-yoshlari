import type { Metadata } from 'next'

import { FotoPage } from '@/components/axborot/AxPages'
import { PageCrumbs } from '@/components/site/PageCrumbs'
import type { Locale } from '@/i18n/config'

import '../../../axborot.css'

export const metadata: Metadata = {
  title: 'Fotogalereya — Özbekiston yoşlar ittifoqi Toşkent şahar hududiy Kengaşi',
  description: 'Kengaş tadbirlaridan fotoalbomlar: uçraşuvlar, forumlar, yiğilişlar va sayohatlar.',
}

/** “Fotogalereya” sahifasi (mazmun: components/axborot) */
export default async function Route(props: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await props.params
  return <FotoPage locale={locale} crumbs={<PageCrumbs locale={locale} path="/axborot-xizmati/fotogalereya" />} />
}
