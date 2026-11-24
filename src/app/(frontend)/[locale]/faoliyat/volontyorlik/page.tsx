
import { PageCrumbs } from '@/components/site/PageCrumbs'
import { VolPage } from '@/components/volontyorlik/VolPage'
import type { Locale } from '@/i18n/config'

import '../../../azolik.css'
import '../../../faoliyat.css'
import '../../../volontyorlik.css'
import { sahifaMeta } from '@/lib/seo'

export const metadata = sahifaMeta('/faoliyat/volontyorlik')

export default async function Route(props: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await props.params
  return (
    <VolPage
      locale={locale}
      crumbs={<PageCrumbs locale={locale} path="/faoliyat/volontyorlik" />}
      projectHref={`/${locale}/faoliyat/loyihalar/universe-volontyorlar`}
    />
  )
}
