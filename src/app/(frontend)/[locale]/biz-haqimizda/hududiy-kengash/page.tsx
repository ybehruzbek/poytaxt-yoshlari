import type { Metadata } from 'next'

import { HududiyPage as Content } from '@/components/hududiy/HududiyPage'
import { PageCrumbs } from '@/components/site/PageCrumbs'
import type { Locale } from '@/i18n/config'

import '../../../ittifoq.css'
import '../../../kengash.css'
import '../../../hududiy.css'
import '../../../hududiy-alt3.css'

export const metadata: Metadata = {
  title: 'Kengaş jamoasi — Özbekiston yoşlar ittifoqi Toşkent şahar hududiy Kengaşi',
  description:
    'Toşkent şahar hududiy Kengaşi jamoasi: rais, bölim boşliqlari va mutaxassislar, ularning vazifalari va aloqa maʼlumotlari.',
}

/** “Toşkent şahar hududiy Kengaşi” sahifasi (mazmun: components/hududiy/data.ts) */
export default async function HududiyRoute(props: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await props.params
  const crumbs = <PageCrumbs locale={locale} path="/biz-haqimizda/hududiy-kengash" />

  return <Content crumbs={crumbs} />
}
