import type { Metadata } from 'next'

import { AloqaPage } from '@/components/boglanish/BoglanishPages'
import { PageCrumbs } from '@/components/site/PageCrumbs'
import type { Locale } from '@/i18n/config'

import '../../../boglanish.css'

export const metadata: Metadata = {
  title: 'Aloqa maʼlumotlari — Özbekiston yoşlar ittifoqi Toşkent şahar hududiy Kengaşi',
  description:
    'Telefon, elektron poçta, manzil, iş vaqti va Kengaş rahbariyatining fuqarolar qabuli jadvali.',
}

/** “Aloqa maʼlumotlari” sahifasi (mazmun: components/boglanish/data.ts) */
export default async function AloqaRoute(props: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await props.params
  return (
    <AloqaPage
      crumbs={<PageCrumbs locale={locale} path="/boglanish/aloqa" />}
      L={(h) => `/${locale}${h}`}
    />
  )
}
