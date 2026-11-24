
import { BenefitsPage } from '@/components/imtiyozlar/BenefitsPage'
import { PageCrumbs } from '@/components/site/PageCrumbs'
import type { Locale } from '@/i18n/config'

import '../../../faoliyat.css'
import '../../../grantlar.css'
import { sahifaMeta } from '@/lib/seo'

export const metadata = sahifaMeta('/faoliyat/imtiyozlar')

export default async function Route(props: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await props.params
  return <BenefitsPage locale={locale} crumbs={<PageCrumbs locale={locale} path="/faoliyat/imtiyozlar" />} />
}
