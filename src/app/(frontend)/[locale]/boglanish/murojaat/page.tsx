
import { MurojaatPage } from '@/components/boglanish/BoglanishPages'
import { PageCrumbs } from '@/components/site/PageCrumbs'
import type { Locale } from '@/i18n/config'

import '../../../boglanish.css'
import { sahifaMeta } from '@/lib/seo'

export const metadata = sahifaMeta('/boglanish/murojaat')

/** “Elektron murojaat” sahifasi */
export default async function MurojaatRoute(props: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await props.params
  return <MurojaatPage crumbs={<PageCrumbs locale={locale} path="/boglanish/murojaat" />} locale={locale} />
}
