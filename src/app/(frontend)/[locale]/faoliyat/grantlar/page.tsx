import type { Metadata } from 'next'

import { GrantsPage } from '@/components/grantlar/GrantsPage'
import { PageCrumbs } from '@/components/site/PageCrumbs'
import type { Locale } from '@/i18n/config'

import '../../../faoliyat.css'
import '../../../grantlar.css'

export const metadata: Metadata = {
  title: 'Grantlar — Özbekiston yoşlar ittifoqi Toşkent şahar hududiy Kengaşi',
  description:
    'Özbekistonlik yoşlar uçun startap, ilm-fan, taʼlim, ijtimoiy loyihalar, madaniyat va xalqaro dasturlar böyiça grantlar: miqdori, şartlari, muddatlari va rasmiy manbalari.',
}

export default async function Route(props: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await props.params
  return <GrantsPage locale={locale} crumbs={<PageCrumbs locale={locale} path="/faoliyat/grantlar" />} />
}
