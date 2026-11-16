import type { Metadata } from 'next'

import { FilesPage } from '@/components/hujjatlar/FilesPage'
import { PageCrumbs } from '@/components/site/PageCrumbs'
import type { Locale } from '@/i18n/config'
import { getKengashDocs } from '@/lib/cms/hujjatlar'

import '../../../hujjatlar.css'

export const metadata: Metadata = {
  title: 'Kengaş hujjatlari — Özbekiston yoşlar ittifoqi Toşkent şahar hududiy Kengaşi',
  description: 'Toşkent şahar hududiy Kengaşining qarorlari, iş rejalari va hisobotlari.',
}

const KINDS = { qaror: 'Qaror', farmoyish: 'Farmoyiş', reja: 'Iş rejasi', hisobot: 'Hisobot', nizom: 'Nizom', boshqa: 'Hujjat' }

/** “Kengaş hujjatlari” sahifasi (admin panel → Hujjatlar → Kengaş hujjatlari) */
export default async function KengashDocsRoute(props: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await props.params
  const path = '/hujjatlar/kengash'
  return (
    <FilesPage
      crumbs={<PageCrumbs locale={locale} path={path} />}
      title="Kengaş hujjatlari"
      docs={await getKengashDocs(locale)}
      kinds={KINDS}
      locale={locale}
      path={path}
    />
  )
}
