import type { Metadata } from 'next'

import { FilesPage } from '@/components/hujjatlar/FilesPage'
import { PageCrumbs } from '@/components/site/PageCrumbs'
import type { Locale } from '@/i18n/config'
import { getTemplates } from '@/lib/cms/hujjatlar'

import '../../../hujjatlar.css'

export const metadata: Metadata = {
  title: 'Hujjat namunalari — Özbekiston yoşlar ittifoqi Toşkent şahar hududiy Kengaşi',
  description: 'Ariza va blanka namunalari: Ittifoqqa aʼzo böliş, murojaat va boşlanğiç taşkilot hujjatlari.',
}

const KINDS = { azolik: 'Aʼzolik', murojaat: 'Murojaat', boshlangich: 'Boşlanğiç taşkilot', boshqa: 'Namuna' }

/** “Hujjat namunalari” sahifasi (admin panel → Hujjatlar → Hujjat namunalari) */
export default async function TemplatesRoute(props: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await props.params
  const path = '/hujjatlar/namunalar'
  return (
    <FilesPage
      crumbs={<PageCrumbs locale={locale} path={path} />}
      title="Hujjat namunalari"
      docs={await getTemplates(locale)}
      kinds={KINDS}
      locale={locale}
      path={path}
    />
  )
}
