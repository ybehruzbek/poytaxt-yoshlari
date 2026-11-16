import type { Metadata } from 'next'

import { MurojaatPage } from '@/components/boglanish/BoglanishPages'
import { PageCrumbs } from '@/components/site/PageCrumbs'
import type { Locale } from '@/i18n/config'

import '../../../boglanish.css'

export const metadata: Metadata = {
  title: 'Elektron murojaat — Özbekiston yoşlar ittifoqi Toşkent şahar hududiy Kengaşi',
  description: 'Ariza, taklif yoki şikoyatni onlayn yuboriş.',
}

/** “Elektron murojaat” sahifasi */
export default async function MurojaatRoute(props: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await props.params
  return <MurojaatPage crumbs={<PageCrumbs locale={locale} path="/boglanish/murojaat" />} locale={locale} />
}
