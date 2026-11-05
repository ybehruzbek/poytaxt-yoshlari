/* eslint-disable @next/next/no-img-element -- logotip PNG; SVG varianti kelganda almashtiriladi */
import Link from 'next/link'

import { NAV } from '@/config/nav'
import type { Locale } from '@/i18n/config'

const LOGO_ALT = 'O‘zbekiston Yoshlar Ittifoqi — Toshkent shahar hududiy kengashi'

/** Ijtimoiy tarmoqlar (havolalar NAMUNA — rasmiy sahifalar bilan almashtiring) */
function Socials() {
  return (
    <div className="socials">
      <a href="#">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M21.9 4.3 18.7 19.4c-.2 1-.9 1.3-1.8.8l-4.9-3.6-2.4 2.3c-.3.3-.5.5-1 .5l.3-5 9.1-8.2c.4-.4-.1-.6-.6-.2L6.2 13 1.4 11.5c-1-.3-1-1 .2-1.5L20.6 2.7c.9-.3 1.6.2 1.3 1.6z" />
        </svg>
        Telegram
      </a>
      <a href="#">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
        </svg>
        Instagram
      </a>
      <a href="#">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M14 8V6c0-.9.6-1 1-1h3V1h-4c-3.3 0-4 2.4-4 4v3H7v4h3v11h4V12h3.5l.5-4H14z" />
        </svg>
        Facebook
      </a>
      <a href="#">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M23 7.2s-.2-1.6-.9-2.3c-.9-.9-1.9-.9-2.3-1C16.6 3.6 12 3.6 12 3.6s-4.6 0-7.8.3c-.4.1-1.4.1-2.3 1C1.2 5.6 1 7.2 1 7.2S.8 9.1.8 11v1.8c0 1.9.2 3.8.2 3.8s.2 1.6.9 2.3c.9.9 2 .9 2.5 1 1.8.2 7.6.2 7.6.2s4.6 0 7.8-.3c.4-.1 1.4-.1 2.3-1 .7-.7.9-2.3.9-2.3s.2-1.9.2-3.8V11c0-1.9-.2-3.8-.2-3.8zM9.7 14.9V8.4l6.1 3.3-6.1 3.2z" />
        </svg>
        YouTube
      </a>
    </div>
  )
}

/* Aloqa ma'lumotlari NAMUNA: rasmiy manzil, telefon va pochta bilan almashtiring */
const CONTACTS = [
  { k: 'Manzil', v: 'Toshkent shahri (manzil kiritiladi)', href: undefined as string | undefined },
  { k: 'Telefon', v: '+998 (__) ___-__-__', href: 'tel:+998000000000' },
  { k: 'Elektron pochta', v: 'info@yoshkent.uz', href: 'mailto:info@yoshkent.uz' },
  { k: 'Ish vaqti', v: 'Dushanba–Juma, 09:00–18:00', href: undefined },
]

const Arrow = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)

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

const COPY = '© 2026 O‘zbekiston Yoshlar Ittifoqi Toshkent shahar hududiy kengashi'
const NOTE = 'Materiallardan foydalanilganda manba ko‘rsatilishi shart.'

/** B1 · Sayt xaritasi+: tepada aloqa qatori, o'rtada bo'limlar, pastda huquqiy qator */
function FooterB1({ locale }: { locale: Locale }) {
  const L = (h: string) => `/${locale}${h}`
  return (
    <footer className="ftv ftv-a fb fb1">
      <div className="wrap">
        <div className="fb1-strip">
          <Link href={L('')} className="fb-logo">
            <img src="/img/logo-toshkent.png" alt={LOGO_ALT} />
          </Link>
          <Contacts className="fb1-contacts" />
        </div>
        <div className="fb1-mid">
          <SiteMap locale={locale} />
          <div className="fb1-side">
            <p>O‘zbekiston Yoshlar Ittifoqi Toshkent shahar hududiy kengashining rasmiy veb-sayti.</p>
            <Socials />
          </div>
        </div>
        <div className="fb-bot">
          <span>{COPY}</span>
          <span>{NOTE}</span>
          <a href="#" className="fb-up">
            Yuqoriga ↑
          </a>
        </div>
      </div>
    </footer>
  )
}

/** B2 · Shior bilan: katta shior va murojaat tugmasi, bo'limlar, pastda katta "YOSHKENT" yozuvi */
function FooterB2({ locale }: { locale: Locale }) {
  const L = (h: string) => `/${locale}${h}`
  return (
    <footer className="ftv ftv-b fb fb2">
      <div className="wrap">
        <div className="fb2-hero">
          <p className="fb2-slogan">
            Yoshlar uchun, yoshlar bilan — <span>poytaxt miqyosida.</span>
          </p>
          <div className="fb2-cta">
            <Link href={L('/boglanish/murojaat')} className="btn btn-primary">
              Murojaat yuborish{' '}
              <span className="ic">
                <Arrow />
              </span>
            </Link>
            <Socials />
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
        <div className="fb-bot">
          <span>{COPY}</span>
          <span>{NOTE}</span>
          <a href="#" className="fb-up">
            Yuqoriga ↑
          </a>
        </div>
      </div>
      <div className="fb2-word" aria-hidden="true">
        YOSHKENT
      </div>
    </footer>
  )
}

/** B3 · Kartali: chapda oq kartada logo va aloqa, o'ngda bo'limlar, pastda tezkor havolalar; dekor shakllar */
function FooterB3({ locale }: { locale: Locale }) {
  const L = (h: string) => `/${locale}${h}`
  const quick = [
    { t: 'Elektron murojaat', h: '/boglanish/murojaat' },
    { t: 'Qabul kunlari', h: '/biz-haqimizda/qabul-kunlari' },
    { t: 'Tadbirlar va kalendar', h: '/faoliyat/tadbirlar' },
    { t: 'Yangiliklar', h: '/yangiliklar' },
  ]
  return (
    <footer className="ftv ftv-c fb fb3">
      <span className="fb3-shape s1" aria-hidden="true" />
      <span className="fb3-shape s2" aria-hidden="true" />
      <span className="fb3-shape s3" aria-hidden="true" />
      <div className="wrap">
        <div className="fb3-grid">
          <div className="fb3-card">
            <Link href={L('')} className="fb3-logo">
              <img src="/img/logo-toshkent.png" alt={LOGO_ALT} />
            </Link>
            <p>O‘zbekiston Yoshlar Ittifoqi Toshkent shahar hududiy kengashining rasmiy veb-sayti.</p>
            <Contacts className="fb3-contacts" />
            <Socials />
          </div>
          <SiteMap locale={locale} className="fb-cols fb3-cols" />
        </div>
        <div className="fb3-quick">
          {quick.map((q) => (
            <Link key={q.h} href={L(q.h)}>
              {q.t} <Arrow />
            </Link>
          ))}
        </div>
        <div className="fb-bot">
          <span>{COPY}</span>
          <span>{NOTE}</span>
          <a href="#" className="fb-up">
            Yuqoriga ↑
          </a>
        </div>
      </div>
    </footer>
  )
}

/**
 * Sayt pastki qismi — "sayt xaritasi" uslubi.
 * VAQTINCHA: B1/B2/B3 ko'rinishlari (<html data-ft="a|b|c">) faqat ishlab chiqish rejimida chiqadi;
 * production'da faqat B1 ko'rsatiladi. Variant tanlangandan keyin qolganlari o'chiriladi.
 */
export function Footer({ locale }: { locale: Locale }) {
  const preview = process.env.NODE_ENV !== 'production'
  return (
    <>
      <FooterB1 locale={locale} />
      {preview && <FooterB2 locale={locale} />}
      {preview && <FooterB3 locale={locale} />}
    </>
  )
}
