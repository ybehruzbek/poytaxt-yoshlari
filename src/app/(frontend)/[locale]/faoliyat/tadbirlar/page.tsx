
import { EventsPage } from '@/components/faoliyat/FaPages'
import { PageCrumbs } from '@/components/site/PageCrumbs'
import type { Locale } from '@/i18n/config'

import '../../../faoliyat.css'
import { sahifaMeta } from '@/lib/seo'

export const metadata = sahifaMeta('/faoliyat/tadbirlar')

// “Yaqin tadbirlar” sana böyiça ajratiladi — sahifa har soatda yangilanadi
export const revalidate = 3600

export default async function Route(props: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await props.params
  return (
    <EventsPage
      locale={locale}
      crumbs={<PageCrumbs locale={locale} path="/faoliyat/tadbirlar" />}
      annHref={`/${locale}/faoliyat/elonlar`}
    />
  )
}
