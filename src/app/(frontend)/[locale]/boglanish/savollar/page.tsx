import type { Metadata } from 'next'

import { FaqPage } from '@/components/faq/FaqPage'
import { getFaqs } from '@/lib/cms/aloqa'
import { PageCrumbs } from '@/components/site/PageCrumbs'
import type { Locale } from '@/i18n/config'

export const metadata: Metadata = {
  title: 'Köp beriladigan savollar — Özbekiston yoşlar ittifoqi Toşkent şahar hududiy Kengaşi',
  description: 'Aʼzolik, imtiyozlar, boşlanğiç taşkilotlar, tadbirlar va murojaatlar böyiça köp beriladigan savollarga javoblar.',
}

/** “Köp beriladigan savollar” sahifasi (mazmun: components/faq/data.ts) */
export default async function SavollarRoute(props: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await props.params
  return <FaqPage crumbs={<PageCrumbs locale={locale} path="/boglanish/savollar" />} base={`/${locale}`} faqs={(await getFaqs(locale)).all} />
}
