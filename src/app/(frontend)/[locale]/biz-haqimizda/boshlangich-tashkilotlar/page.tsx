
import { BtHub as Content } from '@/components/boshlangich/BtHub'
import { PageCrumbs } from '@/components/site/PageCrumbs'
import type { Locale } from '@/i18n/config'

import '../../../boshlangich.css'
import { sahifaMeta } from '@/lib/seo'

export const metadata = sahifaMeta('/biz-haqimizda/boshlangich-tashkilotlar')

/** “Boşlanğiç taşkilotlar” — ikki yönaliş: oliy taʼlim taşkilotlari va harbiy qismlar */
export default async function BtHubRoute(props: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await props.params
  const L = (h: string) => `/${locale}${h}`
  return (
    <Content
      locale={locale}
      L={L}
      crumbs={<PageCrumbs locale={locale} path="/biz-haqimizda/boshlangich-tashkilotlar" />}
    />
  )
}
