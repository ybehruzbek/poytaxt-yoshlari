
import { IttifoqPage as Content } from '@/components/ittifoq/IttifoqPage'
import { PageCrumbs } from '@/components/site/PageCrumbs'
import { SiblingNav } from '@/components/site/SiblingNav'
import type { Locale } from '@/i18n/config'

import '../../../ittifoq.css'
import '../../../ittifoq-alt3.css'
import '../../../ittifoq-structure.css'
import '../../../ittifoq-flags.css'
import '../../../ittifoq-centres.css'
import '../../../ittifoq-hero.css'
import '../../../ittifoq-history.css'
import '../../../ittifoq-priorities.css'
import '../../../ittifoq-orgs.css'
import { sahifaMeta } from '@/lib/seo'

export const metadata = sahifaMeta('/biz-haqimizda/ittifoq')

const PATH = '/biz-haqimizda/ittifoq'

/** "Özbekiston yoşlar ittifoqi" sahifasi (mazmun: components/ittifoq/data.ts) */
export default async function IttifoqPage(props: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await props.params
  const L = (h: string) => `/${locale}${h}`

  const crumbs = <PageCrumbs locale={locale} path={PATH} />

  const siblings = <SiblingNav locale={locale} path={PATH} />

  return <Content L={L} crumbs={crumbs} siblings={siblings} />
}
