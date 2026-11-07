import type { Metadata } from 'next'
import Link from 'next/link'

import { HududiyPage as Content } from '@/components/hududiy/HududiyPage'
import { NAV } from '@/config/nav'
import type { Locale } from '@/i18n/config'

import '../../../ittifoq.css'
import '../../../kengash.css'
import '../../../hududiy.css'
import '../../../hududiy-alt1.css'
import '../../../hududiy-alt2.css'
import '../../../hududiy-alt3.css'

export const metadata: Metadata = {
  title: 'Toşkent şahar hududiy Kengaşi — Özbekiston yoşlar ittifoqi',
  description:
    'Toşkent şahar hududiy Kengaşi: rais, apparat tuzilmasi va jamoasi, qabul kunlari, murojaat tartibi va aloqa.',
}

const PATH = '/biz-haqimizda/hududiy-kengash'

/** «Toşkent şahar hududiy Kengaşi» sahifasi (mazmun: components/hududiy/data.ts) */
export default async function HududiyRoute(props: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await props.params
  const L = (h: string) => `/${locale}${h}`
  const group = NAV.find((g) => g.key === 'biz')!

  const crumbs = (
    <nav className="crumbs" aria-label="Yöl">
      <Link href={L('')}>Boş sahifa</Link>
      <span>/</span>
      <span>{group.label}</span>
      <span>/</span>
      <span aria-current="page">Toşkent şahar hududiy Kengaşi</span>
    </nav>
  )

  const siblings = (
    <div className="it-sib">
      <p>{group.label} bölimida</p>
      <div className="tabs">
        {(group.items ?? []).map((s) => (
          <Link
            key={s.href}
            href={L(s.href)}
            className={`tab${s.href === PATH ? ' on' : ''}`}
            style={{ display: 'inline-flex', alignItems: 'center' }}
          >
            {s.label}
          </Link>
        ))}
      </div>
    </div>
  )

  return <Content L={L} crumbs={crumbs} siblings={siblings} />
}
