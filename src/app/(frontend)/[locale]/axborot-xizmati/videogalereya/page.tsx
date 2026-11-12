import type { Metadata } from 'next'

import { VideoPage } from '@/components/axborot/AxPages'
import { PageCrumbs } from '@/components/site/PageCrumbs'
import type { Locale } from '@/i18n/config'

import '../../../axborot.css'

/** YouTube kanali har 15 daqiqada qayta tekşiriladi (lib/youtube.ts → REVALIDATE) */
export const revalidate = 900

export const metadata: Metadata = {
  title: 'Videogalereya — Özbekiston yoşlar ittifoqi Toşkent şahar hududiy Kengaşi',
  description: 'Kengaş tadbirlaridan video lavhalar, reportajlar va maxsus körsatuvlar.',
}

/** “Videogalereya” sahifasi (mazmun: components/axborot) */
export default async function Route(props: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await props.params
  return <VideoPage crumbs={<PageCrumbs locale={locale} path="/axborot-xizmati/videogalereya" />} />
}
