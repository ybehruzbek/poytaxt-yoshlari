import type { Metadata } from 'next'

import { ResultsPage } from '@/components/faoliyat/FaPages'
import { PageCrumbs } from '@/components/site/PageCrumbs'
import type { Locale } from '@/i18n/config'

import '../../../faoliyat.css'

export const metadata: Metadata = {
  title: 'Natijalar va hisobotlar — Özbekiston yoşlar ittifoqi Toşkent şahar hududiy Kengaşi',
  description: 'Kengaş faoliyatining yillar kesimidagi asosiy natijalari va hisobotlari.',
}

export default async function Route(props: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await props.params
  return <ResultsPage locale={locale} crumbs={<PageCrumbs locale={locale} path="/faoliyat/natijalar" />} />
}
