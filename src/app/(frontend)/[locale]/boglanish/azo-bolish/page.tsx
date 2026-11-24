
import { AzolikPage } from '@/components/azolik/AzolikPage'
import { PageCrumbs } from '@/components/site/PageCrumbs'
import type { Locale } from '@/i18n/config'

import '../../../azolik.css'
import { sahifaMeta } from '@/lib/seo'

export const metadata = sahifaMeta('/boglanish/azo-bolish')

/** “Aʼzo böliş” sahifasi */
export default async function AzolikRoute(props: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await props.params
  const L = (h: string) => `/${locale}${h}`
  return <AzolikPage L={L} crumbs={<PageCrumbs locale={locale} path="/boglanish/azo-bolish" />} />
}
