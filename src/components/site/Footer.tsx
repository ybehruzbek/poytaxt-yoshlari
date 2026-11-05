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

/** A · Hozirgi: katta jumla, havolalar qatori, aloqa va tarmoqlar */
function FooterA({ locale }: { locale: Locale }) {
  return (
    <footer className="ftv ftv-a">
      <div className="wrap">
        <p className="foot-big">
          Yoshlar uchun, yoshlar bilan — <span>poytaxt miqyosida.</span>
        </p>
        <div className="foot-row">
          <div className="foot-links">
            <Link href={`/${locale}/biz-haqimizda/hududiy-kengash`}>Biz haqimizda</Link>
            <Link href={`/${locale}/faoliyat/loyihalar`}>Imkoniyatlar</Link>
          </div>
          <Link href={`/${locale}`} className="logo">
            <img src="/img/logo-toshkent.png" alt="O‘zbekiston Yoshlar Ittifoqi — Toshkent shahar hududiy kengashi" />
          </Link>
          <div className="foot-links">
            <Link href={`/${locale}/faoliyat/tadbirlar`}>Tadbirlar</Link>
            <Link href={`/${locale}/yangiliklar`}>Yangiliklar</Link>
            <Link href={`/${locale}/boglanish/aloqa`}>Aloqa</Link>
          </div>
        </div>
        <div className="foot-bot">
          {/* Manzil va telefon NAMUNA: rasmiy ma'lumot bilan almashtiring */}
          <address>
            Toshkent shahri
            <br />
            Telefon: <a href="tel:+998000000000">+998 (__) ___-__-__</a>
          </address>
          <Socials />
        </div>
        <p className="copy">© 2026 O‘zbekiston Yoshlar Ittifoqi Toshkent shahar hududiy kengashi</p>
      </div>
    </footer>
  )
}

/** B · Sayt xaritasi: to'q fon, menyuning barcha bo'limlari ustunlarda */
function FooterB({ locale }: { locale: Locale }) {
  const L = (h: string) => `/${locale}${h}`
  return (
    <footer className="ftv ftv-b fb">
      <div className="wrap">
        <div className="fb-top">
          <div className="fb-brand">
            <Link href={L('')} className="fb-logo">
              <img src="/img/logo-toshkent.png" alt={LOGO_ALT} />
            </Link>
            <p>O‘zbekiston Yoshlar Ittifoqi Toshkent shahar hududiy kengashining rasmiy veb-sayti.</p>
            <Socials />
          </div>
          <nav className="fb-cols" aria-label="Sayt xaritasi">
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
        </div>
        <div className="fb-bot">
          <span>© 2026 O‘zbekiston Yoshlar Ittifoqi Toshkent shahar hududiy kengashi</span>
          <span>Materiallardan foydalanilganda manba ko‘rsatilishi shart.</span>
          <a href="#" className="fb-up">
            Yuqoriga ↑
          </a>
        </div>
      </div>
    </footer>
  )
}

/** C · Aloqa markazda: aloqa kartalari, qisqa menyu, tarmoqlar */
function FooterC({ locale }: { locale: Locale }) {
  const L = (h: string) => `/${locale}${h}`
  return (
    <footer className="ftv ftv-c fc">
      <div className="wrap">
        <div className="fc-head">
          <Link href={L('')} className="fc-logo">
            <img src="/img/logo-toshkent.png" alt={LOGO_ALT} />
          </Link>
          <p className="fc-slogan">
            Yoshlar uchun, yoshlar bilan — <span>poytaxt miqyosida.</span>
          </p>
        </div>
        <div className="fc-contacts">
          {CONTACTS.map((c) => (
            <div key={c.k} className="fc-card">
              <small>{c.k}</small>
              {c.href ? <a href={c.href}>{c.v}</a> : <b>{c.v}</b>}
            </div>
          ))}
        </div>
        <nav className="fc-nav" aria-label="Pastki menyu">
          {NAV.map((g) => {
            const href = g.href ?? g.items![0].href
            return (
              <Link key={g.key} href={L(href)}>
                {g.label}
              </Link>
            )
          })}
        </nav>
        <div className="fc-bot">
          <span>© 2026 O‘zbekiston Yoshlar Ittifoqi Toshkent shahar hududiy kengashi</span>
          <Socials />
        </div>
      </div>
    </footer>
  )
}

/**
 * Sayt pastki qismi.
 * VAQTINCHA: 3 ta ko'rinish (<html data-ft="a|b|c">) faqat ishlab chiqish rejimida chiqadi;
 * production'da faqat A ko'rsatiladi. Variant tanlangandan keyin qolganlari o'chiriladi.
 */
export function Footer({ locale }: { locale: Locale }) {
  const preview = process.env.NODE_ENV !== 'production'
  return (
    <>
      <FooterA locale={locale} />
      {preview && <FooterB locale={locale} />}
      {preview && <FooterC locale={locale} />}
    </>
  )
}
