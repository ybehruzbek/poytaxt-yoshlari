
import { FaqPage } from '@/components/faq/FaqPage'
import { getFaqs } from '@/lib/cms/aloqa'
import { PageCrumbs } from '@/components/site/PageCrumbs'
import type { Locale } from '@/i18n/config'
import { JsonLd } from '@/components/site/JsonLd'
import { faqLd, sahifaMeta } from '@/lib/seo'

export const metadata = sahifaMeta('/boglanish/savollar')

/** “Köp beriladigan savollar” sahifasi (mazmun: components/faq/data.ts) */
export default async function SavollarRoute(props: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await props.params
  const faqs = (await getFaqs(locale)).all
  return (
    <>
      <JsonLd data={faqLd(faqs)} />
      <FaqPage crumbs={<PageCrumbs locale={locale} path="/boglanish/savollar" />} base={`/${locale}`} faqs={faqs} />
    </>
  )
}
