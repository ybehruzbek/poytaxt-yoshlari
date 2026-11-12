import type { Metadata } from 'next'

import { PressPage } from '@/components/axborot/AxPages'
import { PageCrumbs } from '@/components/site/PageCrumbs'
import type { Locale } from '@/i18n/config'

import '../../../axborot.css'

export const metadata: Metadata = {
  title: 'Press-relizlar — Özbekiston yoşlar ittifoqi Toşkent şahar hududiy Kengaşi',
  description: 'Kengaş Axborot xizmatining press-relizlari va OAV uçun anonslari.',
}

/** “Press-relizlar” sahifasi (mazmun: components/axborot/press.ts) */
export default async function Route(props: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await props.params
  return (
<PressPage crumbs={<PageCrumbs locale={locale} path="/axborot-xizmati/press-relizlar" />} />
  )
}
