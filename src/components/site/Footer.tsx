/* eslint-disable @next/next/no-img-element -- logotip PNG; SVG varianti kelganda almashtiriladi */
import Link from 'next/link'
import type { CSSProperties } from 'react'

import { NAV } from '@/config/nav'
import type { Locale } from '@/i18n/config'
import { NET_LABEL, NETS, type Net } from '@/lib/socials'
import { getSocials } from '@/lib/socials-server'

import { Arrow, Svg } from './SocialPhones'

const LOGO_ALT = 'Özbekiston Yoşlar Ittifoqi — Toşkent şahar hududiy kengaşi'
const COPY = '© 2026 Özbekiston Yoşlar Ittifoqi Toşkent şahar hududiy kengaşi'
const NOTE = 'Materiallardan foydalanilganda manba körsatilişi şart.'
const WORD = 'YOŞKENT'

/* Aloqa ma'lumotlari NAMUNA: rasmiy manzil, telefon va pochta bilan almashtiring */
const CONTACTS = [
  { k: 'Manzil', v: 'Toşkent şahri (manzil kiritiladi)', href: undefined as string | undefined },
  { k: 'Telefon', v: '+998 (__) ___-__-__', href: 'tel:+998000000000' },
  { k: 'Elektron poçta', v: 'info@yoshkent.uz', href: 'mailto:info@yoshkent.uz' },
  { k: 'Iş vaqti', v: 'Duşanba–Juma, 09:00–18:00', href: undefined },
]

/** Davlat resurslari (rasmiy saytlar) */
const GOV = [
  { t: 'Hukumat portali', h: 'https://gov.uz' },
  { t: 'Davlat xizmatlari portali', h: 'https://my.gov.uz' },
  { t: 'Prezident rasmiy veb-sayti', h: 'https://president.uz' },
  { t: 'Yoşlar işlari agentligi', h: 'https://yoshlar.gov.uz' },
  { t: 'Qonunçilik maʼlumotlari bazasi', h: 'https://lex.uz' },
]

type Socials = Record<Net, string>

function SocialLinks({ socials }: { socials: Socials }) {
  return (
    <div className="socials">
      {NETS.filter((n) => socials[n]).map((n) => (
        <a key={n} href={socials[n]} target="_blank" rel="noopener noreferrer">
          <Svg net={n} />
          {NET_LABEL[n]}
        </a>
      ))}
    </div>
  )
}

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

function Contacts({ className }: { className: string }) {
  return (
    <div className={className}>
      {CONTACTS.map((c) => (
        <div key={c.k}>
          <small>{c.k}</small>
          {c.href ? <a href={c.href}>{c.v}</a> : <b>{c.v}</b>}
        </div>
      ))}
    </div>
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

/** A · Shior bilan (avvalgi B2): shior + murojaat, logo va aloqa, sayt xaritasi, xira "YOSHKENT" */
function FooterA({ locale, socials }: { locale: Locale; socials: Socials }) {
  const L = (h: string) => `/${locale}${h}`
  return (
    <footer className="ftv ftv-a fb fb2">
      <div className="wrap">
        <div className="fb2-hero">
          <p className="fb2-slogan">
            Yoşlar uçun, yoşlar bilan — <span>poytaxt miqyosida.</span>
          </p>
          <div className="fb2-cta">
            <Link href={L('/boglanish/murojaat')} className="btn btn-primary">
              Murojaat yuboriş{' '}
              <span className="ic">
                <Arrow />
              </span>
            </Link>
            <SocialLinks socials={socials} />
          </div>
        </div>
        <div className="fb2-mid">
          <div className="fb2-brand">
            <Link href={L('')} className="fb-logo">
              <img src="/img/logo-toshkent.png" alt={LOGO_ALT} />
            </Link>
            <Contacts className="fb2-contacts" />
          </div>
          <SiteMap locale={locale} />
        </div>
        <Bottom />
      </div>
      <div className="fb2-word" aria-hidden="true">
        {WORD}
      </div>
    </footer>
  )
}

/**
 * B · Katta so'z ("giant wordmark" footerlar uslubi): ixcham ustunlar, oddiy yozuvli tarmoq havolalari,
 * pastda ekran enini to'liq egallagan sariq YOSHKENT — footer ko'rinishga kirganda harflar navbat bilan ko'tariladi.
 */
function FooterB({ locale, socials }: { locale: Locale; socials: Socials }) {
  const L = (h: string) => `/${locale}${h}`
  return (
    <footer className="ftv ftv-b fb fw">
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
            <a href={CONTACTS[2].href}>{CONTACTS[2].v}</a>
            <a href={CONTACTS[1].href}>{CONTACTS[1].v}</a>
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

/**
 * C · Rasmiy (davlat saytlari va "neo-brutal" footerlardan): yuqorida yuguruvchi shior lentasi,
 * sayt xaritasi + davlat resurslari, pastda konturli YOSHKENT — ustiga kelinganda harflab sariq to'ladi.
 */
function FooterC({ locale, socials }: { locale: Locale; socials: Socials }) {
  const L = (h: string) => `/${locale}${h}`
  const phrase = ['Orzu qil', 'Harakat qil', 'Biz yoningdamiz']
  const run = [...phrase, ...phrase, ...phrase]
  return (
    <footer className="ftv ftv-c fr">
      <div className="fr-marquee" aria-hidden="true">
        <div className="fr-track">
          {[0, 1].map((k) => (
            <span key={k}>
              {run.map((t, i) => (
                <span key={i}>
                  {t} <i>✦</i>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
      <div className="wrap">
        <div className="fr-grid">
          <div className="fr-brand">
            <Link href={L('')} className="fr-logo">
              <img src="/img/logo-toshkent.png" alt={LOGO_ALT} />
            </Link>
            <p>Özbekiston Yoşlar Ittifoqi Toşkent şahar hududiy kengaşining rasmiy veb-sayti.</p>
            <Contacts className="fr-contacts" />
            <SocialLinks socials={socials} />
          </div>
          <div className="fr-right">
            <SiteMap locale={locale} className="fb-cols fr-cols" />
            <div className="fr-gov">
              <b>Davlat resurslari</b>
              <ul>
                {GOV.map((g) => (
                  <li key={g.h}>
                    <a href={g.h} target="_blank" rel="noopener noreferrer">
                      <span>{g.t}</span>
                      <small>{g.h.replace('https://', '')} ↗</small>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="fr-word" aria-hidden="true">
          <Letters />
        </div>
        <Bottom />
      </div>
    </footer>
  )
}

/**
 * Sayt pastki qismi.
 * VAQTINCHA: A/B/C ko'rinishlari (<html data-ft="a|b|c">) faqat ishlab chiqish rejimida chiqadi;
 * production'da faqat A ko'rsatiladi. Variant tanlangandan keyin qolganlari o'chiriladi.
 */
export async function Footer({ locale }: { locale: Locale }) {
  const socials = await getSocials()
  const preview = process.env.NODE_ENV !== 'production'
  return (
    <>
      <FooterA locale={locale} socials={socials} />
      {preview && <FooterB locale={locale} socials={socials} />}
      {preview && <FooterC locale={locale} socials={socials} />}
    </>
  )
}
