
import { ProjectsPage } from '@/components/faoliyat/FaPages'
import { PageCrumbs } from '@/components/site/PageCrumbs'
import type { Locale } from '@/i18n/config'

import '../../../faoliyat.css'
import { sahifaMeta } from '@/lib/seo'

export const metadata = sahifaMeta('/faoliyat/loyihalar')

export default async function Route(props: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await props.params
  const L = (h: string) => `/${locale}${h}`
  void L
  return (
    <ProjectsPage
      locale={locale}
      crumbs={<PageCrumbs locale={locale} path="/faoliyat/loyihalar" />}
      base={L('/faoliyat/loyihalar')}
    />
  )
}
