
import { DirectionsPage } from '@/components/faoliyat/FaPages'
import { PageCrumbs } from '@/components/site/PageCrumbs'
import type { Locale } from '@/i18n/config'

import '../../../faoliyat.css'
import { sahifaMeta } from '@/lib/seo'

export const metadata = sahifaMeta('/faoliyat/yonalishlar')

export default async function Route(props: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await props.params
  const L = (h: string) => `/${locale}${h}`
  return (
    <DirectionsPage
      locale={locale}
      crumbs={<PageCrumbs locale={locale} path="/faoliyat/yonalishlar" />}
      base={L('/faoliyat/yonalishlar')}
      projBase={L('/faoliyat/loyihalar')}
    />
  )
}
