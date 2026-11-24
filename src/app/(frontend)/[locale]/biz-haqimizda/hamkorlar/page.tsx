
import { HamkorlarPage } from '@/components/hamkorlar/HamkorlarPage'
import { PageCrumbs } from '@/components/site/PageCrumbs'
import type { Locale } from '@/i18n/config'
import { sahifaMeta } from '@/lib/seo'


export const metadata = sahifaMeta('/biz-haqimizda/hamkorlar')

/** “Hamkorlar” sahifasi (Biz haqimizda menyusi) */
export default async function HamkorlarRoute(props: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await props.params
  return <HamkorlarPage locale={locale} crumbs={<PageCrumbs locale={locale} path="/biz-haqimizda/hamkorlar" />} />
}
