import type { Metadata } from 'next'

import { PageCrumbs } from '@/components/site/PageCrumbs'
import { UstavPage } from '@/components/ustav/UstavPage'
import type { Locale } from '@/i18n/config'

import '../../../../ustav.css'

export const metadata: Metadata = {
  title: 'Özbekiston yoşlar ittifoqining Ustavi — Özbekiston yoşlar ittifoqi Toşkent şahar hududiy Kengaşi',
  description:
    'Özbekiston yoşlar ittifoqining Adliya vazirligida davlat röyxatidan ötkazilgan Ustavi: maqsad va vazifalar, aʼzolik, rahbar organlari, tuzilmasi va mulki.',
}

/** Ustavning töliq matni — “Normativ-huquqiy hujjatlar” sahifasidagi Ustav kartasidan oçiladi */
export default async function UstavRoute(props: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await props.params
  const crumbs = <PageCrumbs locale={locale} path="/hujjatlar/normativ" extra={[{ label: 'Ittifoq Ustavi' }]} />
  return <UstavPage crumbs={crumbs} />
}
