import type { Metadata } from 'next'

import { PageCrumbs } from '@/components/site/PageCrumbs'
import { StipendsPage } from '@/components/stipendiyalar/StipendsPage'
import type { Locale } from '@/i18n/config'

import '../../../faoliyat.css'
import '../../../grantlar.css'

export const metadata: Metadata = {
  title: 'Stipendiyalar — Özbekiston yoşlar ittifoqi Toşkent şahar hududiy Kengaşi',
  description:
    'Prezident va nomli davlat stipendiyalari hamda xorijda taʼlim oliş uçun stipendiyalar: kimlar uçun, qanday imtiyozlar beriladi, ariza muddatlari va rasmiy manbalari.',
}

export default async function Route(props: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await props.params
  return <StipendsPage locale={locale} crumbs={<PageCrumbs locale={locale} path="/faoliyat/stipendiyalar" />} />
}
