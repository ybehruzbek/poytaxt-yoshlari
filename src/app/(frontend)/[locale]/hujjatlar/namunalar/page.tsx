
import { FilesPage } from '@/components/hujjatlar/FilesPage'
import { PageCrumbs } from '@/components/site/PageCrumbs'
import type { Locale } from '@/i18n/config'
import { getTemplates } from '@/lib/cms/hujjatlar'

import '../../../hujjatlar.css'
import { sahifaMeta } from '@/lib/seo'

export const metadata = sahifaMeta('/hujjatlar/namunalar')

const KINDS = { azolik: 'A’zolik', murojaat: 'Murojaat', boshlangich: 'Boshlang‘ich tashkilot', boshqa: 'Namuna' }

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
