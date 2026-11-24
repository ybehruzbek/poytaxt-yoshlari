
import { HarbiyPage as Content } from '@/components/boshlangich/HarbiyPage'
import { PageCrumbs } from '@/components/site/PageCrumbs'
import type { Locale } from '@/i18n/config'

import '../../../../boshlangich.css'
import { sahifaMeta } from '@/lib/seo'

export const metadata = sahifaMeta('/biz-haqimizda/boshlangich-tashkilotlar/harbiy')

/** “Harbiy qismlar va muassasalardagi boşlanğiç taşkilotlar” sahifasi */
export default async function HarbiyRoute(props: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await props.params
  return (
    <Content
      crumbs={<PageCrumbs locale={locale} path="/biz-haqimizda/boshlangich-tashkilotlar/harbiy" />}
    />
  )
}
