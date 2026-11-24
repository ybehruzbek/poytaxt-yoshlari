
import { PressPage } from '@/components/axborot/AxPages'
import { PageCrumbs } from '@/components/site/PageCrumbs'
import type { Locale } from '@/i18n/config'

import '../../../axborot.css'
import { sahifaMeta } from '@/lib/seo'

export const metadata = sahifaMeta('/axborot-xizmati/press-relizlar')

/** “Press-relizlar” sahifasi (mazmun: components/axborot/press.ts) */
export default async function Route(props: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await props.params
  return (
<PressPage locale={locale} crumbs={<PageCrumbs locale={locale} path="/axborot-xizmati/press-relizlar" />} />
  )
}
