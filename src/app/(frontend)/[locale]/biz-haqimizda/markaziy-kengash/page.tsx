
import { KengashPage as Content } from '@/components/kengash/KengashPage'
import { PageCrumbs } from '@/components/site/PageCrumbs'
import { SiblingNav } from '@/components/site/SiblingNav'
import type { Locale } from '@/i18n/config'

import '../../../ittifoq.css'
import '../../../kengash.css'
import { sahifaMeta } from '@/lib/seo'

export const metadata = sahifaMeta('/biz-haqimizda/markaziy-kengash')

const PATH = '/biz-haqimizda/markaziy-kengash'

/** “Markaziy Kengaş” sahifasi (mazmun: components/kengash/data.ts) */
export default async function KengashRoute(props: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await props.params
  const L = (h: string) => `/${locale}${h}`

  const crumbs = <PageCrumbs locale={locale} path={PATH} />

  const siblings = <SiblingNav locale={locale} path={PATH} />

  return <Content L={L} crumbs={crumbs} siblings={siblings} />
}
