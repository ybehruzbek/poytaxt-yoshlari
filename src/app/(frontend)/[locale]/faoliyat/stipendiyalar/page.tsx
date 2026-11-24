
import { PageCrumbs } from '@/components/site/PageCrumbs'
import { StipendsPage } from '@/components/stipendiyalar/StipendsPage'
import type { Locale } from '@/i18n/config'

import '../../../faoliyat.css'
import '../../../grantlar.css'
import { sahifaMeta } from '@/lib/seo'

export const metadata = sahifaMeta('/faoliyat/stipendiyalar')

export default async function Route(props: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await props.params
  return <StipendsPage locale={locale} crumbs={<PageCrumbs locale={locale} path="/faoliyat/stipendiyalar" />} />
}
