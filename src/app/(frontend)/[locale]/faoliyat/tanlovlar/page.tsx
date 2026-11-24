
import { PageCrumbs } from '@/components/site/PageCrumbs'
import { ContestsPage } from '@/components/tanlovlar/ContestsPage'
import type { Locale } from '@/i18n/config'

import '../../../faoliyat.css'
import '../../../grantlar.css'
import { sahifaMeta } from '@/lib/seo'

export const metadata = sahifaMeta('/faoliyat/tanlovlar')

export default async function Route(props: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await props.params
  return <ContestsPage locale={locale} crumbs={<PageCrumbs locale={locale} path="/faoliyat/tanlovlar" />} />
}
