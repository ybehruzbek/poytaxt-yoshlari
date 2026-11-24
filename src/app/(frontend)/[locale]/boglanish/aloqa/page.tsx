
import { AloqaPage } from '@/components/boglanish/BoglanishPages'
import { PageCrumbs } from '@/components/site/PageCrumbs'
import type { Locale } from '@/i18n/config'

import '../../../boglanish.css'
import { sahifaMeta } from '@/lib/seo'

export const metadata = sahifaMeta('/boglanish/aloqa')

/** “Aloqa maʼlumotlari” sahifasi (mazmun: components/boglanish/data.ts) */
export default async function AloqaRoute(props: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await props.params
  return (
    <AloqaPage
      crumbs={<PageCrumbs locale={locale} path="/boglanish/aloqa" />}
      L={(h) => `/${locale}${h}`}
    />
  )
}
