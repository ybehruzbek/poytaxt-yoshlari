
import { HududiyPage as Content } from '@/components/hududiy/HududiyPage'
import { PageCrumbs } from '@/components/site/PageCrumbs'
import type { Locale } from '@/i18n/config'

import '../../../ittifoq.css'
import '../../../kengash.css'
import '../../../hududiy.css'
import '../../../hududiy-alt3.css'
import { sahifaMeta } from '@/lib/seo'

export const metadata = sahifaMeta('/biz-haqimizda/hududiy-kengash')

/** “Toşkent şahar hududiy Kengaşi” sahifasi (mazmun: components/hududiy/data.ts) */
export default async function HududiyRoute(props: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await props.params
  const crumbs = <PageCrumbs locale={locale} path="/biz-haqimizda/hududiy-kengash" />

  return <Content crumbs={crumbs} />
}
