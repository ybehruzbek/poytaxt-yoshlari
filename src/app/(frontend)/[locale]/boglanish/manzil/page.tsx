import type { Metadata } from 'next'

import { ManzilPage } from '@/components/boglanish/BoglanishPages'
import { PageCrumbs } from '@/components/site/PageCrumbs'
import type { Locale } from '@/i18n/config'

import '../../../boglanish.css'

export const metadata: Metadata = {
  title: 'Manzil va xarita — Özbekiston yoşlar ittifoqi Toşkent şahar hududiy Kengaşi',
  description: 'Toşkent şahri, Olmazor tumani, Universitet köçasi, 4-uy (Toşkent şahar Yoşlar markazi): xarita va jamoat transporti.',
}

/** “Manzil va xarita” sahifasi */
export default async function ManzilRoute(props: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await props.params
  return <ManzilPage crumbs={<PageCrumbs locale={locale} path="/boglanish/manzil" />} />
}
