
import { NormativPage as Content } from '@/components/hujjatlar/NormativPage'
import { PageCrumbs } from '@/components/site/PageCrumbs'
import type { Locale } from '@/i18n/config'

import '../../../hujjatlar.css'
import { sahifaMeta } from '@/lib/seo'

export const metadata = sahifaMeta('/hujjatlar/normativ')

/** “Normativ-huquqiy hujjatlar” sahifasi (mazmun: components/hujjatlar/data.ts) */
export default async function NormativRoute(props: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await props.params
  const crumbs = <PageCrumbs locale={locale} path="/hujjatlar/normativ" />

  return <Content crumbs={crumbs} locale={locale} />
}
