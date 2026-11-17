/* eslint-disable @next/next/no-img-element -- logotip PNG; SVG varianti kelganda almashtiriladi */
import Link from 'next/link'

import { getAloqa } from '@/lib/cms/aloqa'
import { NAV } from '@/config/nav'
import type { Locale } from '@/i18n/config'
import { logo } from '@/lib/logo'
import { NET_LABEL, NETS } from '@/lib/socials'
import { getSocials } from '@/lib/socials-server'

import { Arrow, Svg } from './SocialPhones'
import { WwwUzCounter } from './WwwUzCounter'

const LOGO_ALT = 'Özbekiston yoşlar ittifoqi Toşkent şahar hududiy Kengaşi'
const COPY = `© ${new Date().getFullYear()} Özbekiston yoşlar ittifoqi Toşkent şahar hududiy Kengaşi. Barça huquqlar himoyalangan.`
const NOTE = 'Uşbu veb-saytdagi maʼlumotlardan foydalanilganda havola körsatilişi şart.'

/* Aloqa: Kengaşning rasmiy telefonlari va poçtasi — “Aloqa maʼlumotlari” sahifasi bilan bir manbadan */

/** Menyuning barcha bo'limlari ustunlarda (majburiy tuzilma: src/config/nav.ts) */
function SiteMap({ locale, className = 'fb-cols' }: { locale: Locale; className?: string }) {
  const L = (h: string) => `/${locale}${h}`
  return (
    <nav className={className} aria-label="Sayt xaritasi">
      {NAV.filter((g) => g.items).map((g) => (
        <div key={g.key}>
          <b>{g.label}</b>
          <ul>
            {g.items!.map((it) => (
              <li key={it.href}>
                <Link href={L(it.href)}>{it.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  )
}

function Bottom() {
  return (
    <div className="fb-bot">
      <div className="fb-legal">
        <span>{COPY}</span>
        <span>{NOTE}</span>
        <span className="fb-typo">
          Matnda xato topsangiz, uni belgilang va <kbd>Ctrl</kbd>/<kbd>Command</kbd> + <kbd>Enter</kbd>{' '}
          tugmalarini bosing.
        </span>
      </div>
      <div className="fb-end">
        <WwwUzCounter />
      </div>
    </div>
  )
}

/**
 * Sayt pastki qismi — "katta söz" uslubi: logo, sayt nomi va murojaat tugmasi, sayt xaritasi,
 * ijtimoiy tarmoqlar oddiy yozuv bilan, pastda ekran enini egallagan sariq YOŞKENT
 * (footer körinişga kirganda harflar navbat bilan körtariladi).
 */
export async function Footer({ locale }: { locale: Locale }) {
  const [socials, { EMAILS, PHONES }] = await Promise.all([getSocials(), getAloqa(locale)])
  const L = (h: string) => `/${locale}${h}`
  return (
    <footer className="fb fw">
      <div className="wrap">
        <div className="fw-top">
          <div className="fw-intro">
            <Link href={L('')} className="fw-logo">
              <img {...logo(locale)} alt={LOGO_ALT} loading="lazy" decoding="async" />
            </Link>
            <p>
              Kengaşning <span>rasmiy veb-sayti</span>
            </p>
            <Link href={L('/boglanish/murojaat')} className="btn btn-primary">
              Murojaat yuboriş{' '}
              <span className="ic">
                <Arrow />
              </span>
            </Link>
          </div>
          <SiteMap locale={locale} className="fb-cols fw-cols" />
        </div>
        <div className="fw-line">
          <div className="fw-nets">
            {NETS.filter((n) => socials[n]).map((n) => (
              <a key={n} href={socials[n]} target="_blank" rel="noopener noreferrer">
                <span className="fw-net-ic">
                  <Svg net={n} />
                </span>
                {NET_LABEL[n]}
              </a>
            ))}
          </div>
          <div className="fw-mail">
            {EMAILS.map((m) => (
              <a key={m} href={`mailto:${m}`}>
                {m}
              </a>
            ))}
            {PHONES.map((p) => (
              <a key={p.href} href={p.href}>
                {p.v}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="wrap">
        <Bottom />
      </div>
    </footer>
  )
}
