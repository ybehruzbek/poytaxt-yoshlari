import type { Metadata } from 'next'

import { AnnouncePage } from '@/components/faoliyat/FaPages'
import { PageCrumbs } from '@/components/site/PageCrumbs'
import type { Locale } from '@/i18n/config'

import '../../../faoliyat.css'

export const metadata: Metadata = {
  title: 'Eʼlonlar — Özbekiston yoşlar ittifoqi Toşkent şahar Kengaşi',
  description: 'Tanlovlar, röyxatdan ötiş, çellenjlar va tadbir eʼlonlari.',
}

export default async function Route(props: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await props.params
  return <AnnouncePage crumbs={<PageCrumbs locale={locale} path="/faoliyat/elonlar" />} />
}
