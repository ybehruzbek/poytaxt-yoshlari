import type { Metadata } from 'next'
import Link from 'next/link'

import { IttifoqPage as Content } from '@/components/ittifoq/IttifoqPage'
import { NAV } from '@/config/nav'
import type { Locale } from '@/i18n/config'

import '../../../ittifoq.css'
import '../../../ittifoq-alt1.css'
import '../../../ittifoq-alt2.css'
import '../../../ittifoq-alt3.css'

export const metadata: Metadata = {
  title: 'Özbekiston yoşlar ittifoqi — Yoşlar Ittifoqi Toşkent şahar hududiy kengaşi',
  description: 'Özbekiston yoşlar ittifoqi: taşkil topişi, maqsad va vazifalari, loyihalari, imtiyozlari va xalqaro hamkorligi.',
}

const PATH = '/biz-haqimizda/ittifoq'

/** "Özbekiston yoşlar ittifoqi" sahifasi (mazmun: components/ittifoq/data.ts) */
export default async function IttifoqPage(props: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await props.params
  const L = (h: string) => `/${locale}${h}`
  const group = NAV.find((g) => g.key === 'biz')!

  const crumbs = (
    <nav className="crumbs" aria-label="Yöl">
      <Link href={L('')}>Boş sahifa</Link>
      <span>/</span>
      <span>{group.label}</span>
      <span>/</span>
      <span aria-current="page">Özbekiston yoşlar ittifoqi</span>
    </nav>
  )

  const siblings = (
    <div className="it-sib">
      <p>{group.label} bölimida</p>
      <div className="tabs">
        {(group.items ?? []).map((s) => (
          <Link key={s.href} href={L(s.href)} className={`tab${s.href === PATH ? ' on' : ''}`} style={{ display: 'inline-flex', alignItems: 'center' }}>
            {s.label}
          </Link>
        ))}
      </div>
    </div>
  )

  return <Content L={L} crumbs={crumbs} siblings={siblings} />
}
