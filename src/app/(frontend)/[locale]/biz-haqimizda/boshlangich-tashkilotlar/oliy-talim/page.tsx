
import { BoshlangichPage as Content } from '@/components/boshlangich/BoshlangichPage'
import { PageCrumbs } from '@/components/site/PageCrumbs'
import type { Locale } from '@/i18n/config'

import '../../../../boshlangich.css'
import { sahifaMeta } from '@/lib/seo'

export const metadata = sahifaMeta('/biz-haqimizda/boshlangich-tashkilotlar/oliy-talim')

/** “Oliy taʼlim taşkilotlaridagi boşlanğiç taşkilotlar” sahifasi (mazmun: components/boshlangich/data.ts) */
export default async function BoshlangichRoute(props: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await props.params
  return (
    <Content
      locale={locale}
      base={`/${locale}/biz-haqimizda/boshlangich-tashkilotlar/oliy-talim`}
      crumbs={
        <PageCrumbs locale={locale} path="/biz-haqimizda/boshlangich-tashkilotlar/oliy-talim" />
      }
    />
  )
}
