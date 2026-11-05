/* eslint-disable @next/next/no-img-element -- prototip rasmlari; CMS ulanganda next/image ga o'tadi */
import Link from 'next/link'

import type { Locale } from '@/i18n/config'

/** Sayt pastki qismi. ittifoq/index.html prototipidan avtomatik ko'chirilgan — dizaynni o'zgartirmang. */
export function Footer({ locale }: { locale: Locale }) {
  return (
    <>
<footer>
  <div className="wrap">
    <p className="foot-big">Yoshlar uchun, yoshlar bilan — <span>poytaxt miqyosida.</span></p>
    <div className="foot-row">
      <div className="foot-links"><Link href={`/${locale}/biz-haqimizda/hududiy-kengash`}>Biz haqimizda</Link><Link href={`/${locale}/faoliyat/loyihalar`}>Imkoniyatlar</Link></div>
      <Link href={`/${locale}`} className="logo"><img src="/img/logo-toshkent.png" alt="O‘zbekiston Yoshlar Ittifoqi — Toshkent shahar hududiy kengashi" /></Link>
      <div className="foot-links"><Link href={`/${locale}/faoliyat/tadbirlar`}>Tadbirlar</Link><Link href={`/${locale}/yangiliklar`}>Yangiliklar</Link><Link href={`/${locale}/boglanish/aloqa`}>Aloqa</Link></div>
    </div>
    <div className="foot-bot">
      {/* Manzil va telefon NAMUNA: rasmiy ma'lumot bilan almashtiring */}
      <address>Toshkent shahri<br />Telefon: <a href="tel:+998000000000">+998 (__) ___-__-__</a></address>
      <div className="socials">
        <a href="#"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M21.9 4.3 18.7 19.4c-.2 1-.9 1.3-1.8.8l-4.9-3.6-2.4 2.3c-.3.3-.5.5-1 .5l.3-5 9.1-8.2c.4-.4-.1-.6-.6-.2L6.2 13 1.4 11.5c-1-.3-1-1 .2-1.5L20.6 2.7c.9-.3 1.6.2 1.3 1.6z" /></svg>Telegram</a>
        <a href="#"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" /></svg>Instagram</a>
        <a href="#"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 8V6c0-.9.6-1 1-1h3V1h-4c-3.3 0-4 2.4-4 4v3H7v4h3v11h4V12h3.5l.5-4H14z" /></svg>Facebook</a>
        <a href="#"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M23 7.2s-.2-1.6-.9-2.3c-.9-.9-1.9-.9-2.3-1C16.6 3.6 12 3.6 12 3.6s-4.6 0-7.8.3c-.4.1-1.4.1-2.3 1C1.2 5.6 1 7.2 1 7.2S.8 9.1.8 11v1.8c0 1.9.2 3.8.2 3.8s.2 1.6.9 2.3c.9.9 2 .9 2.5 1 1.8.2 7.6.2 7.6.2s4.6 0 7.8-.3c.4-.1 1.4-.1 2.3-1 .7-.7.9-2.3.9-2.3s.2-1.9.2-3.8V11c0-1.9-.2-3.8-.2-3.8zM9.7 14.9V8.4l6.1 3.3-6.1 3.2z" /></svg>YouTube</a>
      </div>
    </div>
    <p className="copy">© 2026 O‘zbekiston Yoshlar Ittifoqi Toshkent shahar hududiy kengashi</p>
  </div>
</footer>
    </>
  )
}
