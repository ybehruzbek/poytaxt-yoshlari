
import { PageCrumbs } from '@/components/site/PageCrumbs'
import { UstavPage } from '@/components/ustav/UstavPage'
import type { Locale } from '@/i18n/config'

import '../../../../ustav.css'
import { sahifaMeta } from '@/lib/seo'

export const metadata = sahifaMeta('/hujjatlar/normativ/ustav')

/** Ustavning töliq matni — “Normativ-huquqiy hujjatlar” sahifasidagi Ustav kartasidan oçiladi */
export default async function UstavRoute(props: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await props.params
  const crumbs = <PageCrumbs locale={locale} path="/hujjatlar/normativ" extra={[{ label: 'Ittifoq Ustavi' }]} />
  return <UstavPage crumbs={crumbs} />
}
