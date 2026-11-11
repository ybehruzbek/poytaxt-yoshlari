/* eslint-disable @next/next/no-img-element -- logotip PNG; SVG varianti kelganda almashtiriladi */
import Link from 'next/link'

import { NAV } from '@/config/nav'
import type { Locale } from '@/i18n/config'
import { NET_LABEL, NETS } from '@/lib/socials'
import { getSocials } from '@/lib/socials-server'

import { Arrow, Svg } from './SocialPhones'

const LOGO_ALT = 'Özbekiston yoşlar ittifoqi Toşkent şahar hududiy Kengaşi'
const COPY = `© 2001–${new Date().getFullYear()} Özbekiston yoşlar ittifoqi Toşkent şahar hududiy Kengaşi. Barça huquqlar himoyalangan.`
const NOTE = 'Uşbu veb-saytdagi maʼlumotlardan foydalanilganda havola körsatilişi şart.'

/* Aloqa: Kengaşning rasmiy telefonlari (pochta — NAMUNA) */
const PHONES = [
  { v: '+998 71 246-10-80', href: 'tel:+998712461080' },
  { v: '+998 71 246-10-90', href: 'tel:+998712461090' },
]
const EMAIL = { v: 'info@yoshkent.uz', href: 'mailto:info@yoshkent.uz' }

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
          <b>Diqqat!</b> Agar siz matnda xatolikni aniqlasangiz, uni belgilab, maʼmuriyatni xabardor qiliş uçun{' '}
          <kbd>Ctrl</kbd>/<kbd>Command</kbd> + <kbd>Enter</kbd> tugmalarini bosing.
        </span>
      </div>
      <a href="#" className="fb-up">
        Yuqoriga ↑
      </a>
    </div>
  )
}

/**
 * Sayt pastki qismi — "katta söz" uslubi: logo, şior va murojaat tugmasi, sayt xaritasi,
 * ijtimoiy tarmoqlar oddiy yozuv bilan, pastda ekran enini egallagan sariq YOŞKENT
 * (footer körinişga kirganda harflar navbat bilan körtariladi).
 */
export async function Footer({ locale }: { locale: Locale }) {
  const socials = await getSocials()
  const L = (h: string) => `/${locale}${h}`
  return (
    <footer className="fb fw">
      <div className="wrap">
        <div className="fw-top">
          <div className="fw-intro">
            <Link href={L('')} className="fw-logo">
              <img src="/img/logo-toshkent.png" alt={LOGO_ALT} />
            </Link>
            <p>
              Yoşlar uçun, yoşlar bilan — <span>poytaxt miqyosida.</span>
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
            <a href={EMAIL.href}>{EMAIL.v}</a>
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
