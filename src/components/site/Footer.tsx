/* eslint-disable @next/next/no-img-element -- logotip PNG; SVG varianti kelganda almashtiriladi */
import Link from 'next/link'
import type { CSSProperties } from 'react'

import { NAV } from '@/config/nav'
import type { Locale } from '@/i18n/config'
import { NET_LABEL, NETS } from '@/lib/socials'
import { getSocials } from '@/lib/socials-server'

import { Arrow } from './SocialPhones'

const LOGO_ALT = 'Özbekiston Yoşlar Ittifoqi — Toşkent şahar hududiy kengaşi'
const COPY = '© 2026 Özbekiston Yoşlar Ittifoqi Toşkent şahar hududiy kengaşi'
const NOTE = 'Materiallardan foydalanilganda manba körsatilişi şart.'
const WORD = 'YOŞKENT'

/* Aloqa NAMUNA: rasmiy telefon va pochta bilan almashtiring */
const PHONE = { v: '+998 (__) ___-__-__', href: 'tel:+998000000000' }
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
      <span>{COPY}</span>
      <span>{NOTE}</span>
      <a href="#" className="fb-up">
        Yuqoriga ↑
      </a>
    </div>
  )
}

/** Har bir harf alohida — harflab chiqish/to'lish animatsiyasi uchun */
function Letters() {
  return WORD.split('').map((ch, i) => (
    <span key={i} style={{ '--i': i } as CSSProperties}>
      {ch}
    </span>
  ))
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
                {NET_LABEL[n]} <span aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
          <div className="fw-mail">
            <a href={EMAIL.href}>{EMAIL.v}</a>
            <a href={PHONE.href}>{PHONE.v}</a>
          </div>
        </div>
      </div>
      <div className="fw-word" aria-hidden="true">
        <Letters />
      </div>
      <div className="wrap">
        <Bottom />
      </div>
    </footer>
  )
}
