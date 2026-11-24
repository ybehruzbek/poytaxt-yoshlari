
import { FilesPage } from '@/components/hujjatlar/FilesPage'
import { PageCrumbs } from '@/components/site/PageCrumbs'
import type { Locale } from '@/i18n/config'
import { getKengashDocs } from '@/lib/cms/hujjatlar'

import '../../../hujjatlar.css'
import { sahifaMeta } from '@/lib/seo'

export const metadata = sahifaMeta('/hujjatlar/kengash')

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
