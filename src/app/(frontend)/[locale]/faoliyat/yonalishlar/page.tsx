import type { Metadata } from 'next'

import { DirectionsPage } from '@/components/faoliyat/FaPages'
import { PageCrumbs } from '@/components/site/PageCrumbs'
import type { Locale } from '@/i18n/config'

import '../../../faoliyat.css'

export const metadata: Metadata = {
  title: 'Faoliyat yönalişlari — Özbekiston yoşlar ittifoqi Toşkent şahar Kengaşi',
  description: 'Kengaş faoliyatining 11 ta asosiy yönalişi.',
}

export default async function Route(props: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await props.params
  const L = (h: string) => `/${locale}${h}`
  void L
  return (
    <DirectionsPage
      crumbs={<PageCrumbs locale={locale} path="/faoliyat/yonalishlar" />}
      base={L('/faoliyat/yonalishlar')}
    />
  )
}
