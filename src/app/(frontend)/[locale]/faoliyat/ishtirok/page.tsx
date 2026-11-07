import type { Metadata } from 'next'

import { JoinPage } from '@/components/faoliyat/FaPages'
import { PageCrumbs } from '@/components/site/PageCrumbs'
import type { Locale } from '@/i18n/config'

import '../../../faoliyat.css'

export const metadata: Metadata = {
  title: 'Köngillilik va iştirok — Özbekiston yoşlar ittifoqi Toşkent şahar Kengaşi',
  description: 'Kengaş faoliyatiga qöşiliş yöllari: aʼzolik, köngillilik, boşlanğiç taşkilotlar.',
}

export default async function Route(props: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await props.params
  const L = (h: string) => `/${locale}${h}`
  void L
  return <JoinPage crumbs={<PageCrumbs locale={locale} path="/faoliyat/ishtirok" />} L={L} />
}
