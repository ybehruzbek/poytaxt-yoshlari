import type { Metadata } from 'next'

import { ProjectsPage } from '@/components/faoliyat/FaPages'
import { PageCrumbs } from '@/components/site/PageCrumbs'
import type { Locale } from '@/i18n/config'

import '../../../faoliyat.css'

export const metadata: Metadata = {
  title: 'Loyihalar — Özbekiston yoşlar ittifoqi Toşkent şahar hududiy Kengaşi',
  description: 'Kengaş amalga oşirgan va amalga oşirayotgan loyihalar.',
}

export default async function Route(props: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await props.params
  const L = (h: string) => `/${locale}${h}`
  void L
  return (
    <ProjectsPage
      crumbs={<PageCrumbs locale={locale} path="/faoliyat/loyihalar" />}
      base={L('/faoliyat/loyihalar')}
    />
  )
}
