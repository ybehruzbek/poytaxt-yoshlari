/* eslint-disable @next/next/no-img-element -- namuna rasmlar; CMS ulanganda next/image ga o'tadi */
import Link from 'next/link'

import type { Locale } from '@/i18n/config'

type Ev = {
  title: string
  org: string
  start: string // ISO, Toshkent vaqti
  img: string
  color: string
  dark?: boolean // rang ustida matn to'q bo'lsinmi
}

/** NAMUNA tadbirlar — keyin admin paneldagi "Tadbirlar" bo'limidan keladi. */
const EVENTS: Ev[] = [
  { title: 'Volontyorlar forumi', org: 'Shahar kengashi', start: '2026-11-14T10:00:00+05:00', img: '/img/opp-vol.jpg', color: 'var(--green)' },
  { title: 'Yosh tadbirkorlar uchrashuvi', org: 'Hamkor tashkilotlar bilan', start: '2026-11-20T15:00:00+05:00', img: '/img/about-2.jpg', color: 'var(--blue)' },
  { title: 'Kitobxonlik tanlovi finali', org: 'OTM boshlang‘ich tashkilotlari', start: '2026-11-27T11:00:00+05:00', img: '/img/opp-stip.jpg', color: 'var(--sky)', dark: true },
  { title: 'IT va startaplar haftaligi', org: 'Poytaxt miqyosida', start: '2026-12-04T09:30:00+05:00', img: '/img/news-2.jpg', color: 'var(--navy)' },
]

const MON = ['YAN', 'FEV', 'MAR', 'APR', 'MAY', 'IYN', 'IYL', 'AVG', 'SEN', 'OKT', 'NOY', 'DEK']
const MON_FULL = ['yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun', 'iyul', 'avgust', 'sentabr', 'oktabr', 'noyabr', 'dekabr']
const WD = ['yakshanba', 'dushanba', 'seshanba', 'chorshanba', 'payshanba', 'juma', 'shanba']

/** ISO → Toshkent vaqtidagi qismlar */
function parts(iso: string) {
  const d = new Date(new Date(iso).getTime() + 5 * 3600 * 1000)
  const hh = String(d.getUTCHours()).padStart(2, '0')
  const mm = String(d.getUTCMinutes()).padStart(2, '0')
  return {
    day: String(d.getUTCDate()).padStart(2, '0'),
    mon: MON[d.getUTCMonth()],
    full: `${d.getUTCDate()}-${MON_FULL[d.getUTCMonth()]}, ${WD[d.getUTCDay()]}`,
    time: `${hh}:${mm}`,
  }
}
function daysLeft(iso: string) {
  return Math.max(0, Math.ceil((new Date(iso).getTime() - Date.now()) / 86400000))
}

const Arrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)
const Clock = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
)
const Org = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 21h18M5 21V8l7-5 7 5v13M9 21v-6h6v6" />
  </svg>
)

/**
 * Yaqin tadbirlar.
 * VAQTINCHA 3 ta ko'rinish (<html data-ev="a|b|c">): A — lenta, B — eng yaqin + ro'yxat, C — afisha.
 */
export function Events({ locale }: { locale: Locale }) {
  const href = `/${locale}/faoliyat/tadbirlar`
  const [first, ...rest] = EVENTS
  const f = parts(first.start)
  const left = daysLeft(first.start)

  return (
    <section className="sec ev-sec" id="tadbirlar" aria-labelledby="ev-title">
      <div className="wrap">
        <div className="sec-head">
          <h2 className="h2" id="ev-title">Yaqin tadbirlar</h2>
          <Link href={href} className="btn btn-ghost">Barcha tadbirlar</Link>
        </div>

        {/* ===== A · Lenta (gorizontal kartalar) ===== */}
        <div className="evv evv-a track">
          {EVENTS.map((e) => {
            const p = parts(e.start)
            return (
              <Link key={e.title} href={href} className="ev">
                <div className="ev-thumb" style={{ background: e.color }}>
                  <span>{p.day}<small>{p.mon}</small></span>
                  <img className="cover" src={e.img} alt="" />
                </div>
                <div className="ev-body">
                  <h3>{e.title}</h3>
                  <p><Org /> {e.org}</p>
                  <p><Clock /> {p.time}</p>
                </div>
                <span className="go"><Arrow /></span>
              </Link>
            )
          })}
        </div>

        {/* ===== B · Eng yaqin tadbir + ro'yxat ===== */}
        <div className="evv evv-b">
          <article className="eb-main">
            <img className="cover" src={first.img} alt="" />
            <div className="eb-shade" />
            <div className="eb-count" aria-label={`${left} kun qoldi`}>
              <b>{left}</b>
              <span>kun qoldi</span>
            </div>
            <div className="eb-bd">
              <span className="eb-tag">Eng yaqin tadbir</span>
              <h3>{first.title}</h3>
              <div className="eb-meta">
                <span>{f.full}</span>
                <span><Clock /> {f.time}</span>
                <span><Org /> {first.org}</span>
              </div>
              <Link href={href} className="btn btn-primary">Ro‘yxatdan o‘tish <span className="ic"><Arrow /></span></Link>
            </div>
          </article>
          <ul className="eb-list">
            {rest.map((e) => {
              const p = parts(e.start)
              return (
                <li key={e.title}>
                  <Link href={href} className="eb-row">
                    <span className="eb-date" style={{ background: e.color, color: e.dark ? 'var(--navy)' : '#fff' }}>
                      <b>{p.day}</b>
                      <small>{p.mon}</small>
                    </span>
                    <span className="eb-txt">
                      <b>{e.title}</b>
                      <small><Clock /> {p.time} · {e.org}</small>
                    </span>
                    <span className="go-sm"><Arrow /></span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>

        {/* ===== C · Afisha (plakat kartalar) ===== */}
        <div className="evv evv-c">
          {EVENTS.map((e) => {
            const p = parts(e.start)
            return (
              <Link key={e.title} href={href} className="ec-card">
                <img className="cover" src={e.img} alt="" />
                <div className="ec-shade" />
                <span className="ec-date" style={{ background: e.color, color: e.dark ? 'var(--navy)' : '#fff' }}>
                  <b>{p.day}</b>
                  <small>{p.mon}</small>
                </span>
                <div className="ec-bd">
                  <h3>{e.title}</h3>
                  <p><Clock /> {p.time} · {e.org}</p>
                  <span className="ec-more">Batafsil <Arrow /></span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
