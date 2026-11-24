
import { AwardsPage } from '@/components/mukofotlar/AwardsPage'
import { PageCrumbs } from '@/components/site/PageCrumbs'
import type { Locale } from '@/i18n/config'

import '../../../faoliyat.css'
import '../../../grantlar.css'
import { sahifaMeta } from '@/lib/seo'

export const metadata = sahifaMeta('/faoliyat/davlat-mukofotlari')

export default async function Route(props: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await props.params
  return <AwardsPage locale={locale} crumbs={<PageCrumbs locale={locale} path="/faoliyat/davlat-mukofotlari" />} />
}
