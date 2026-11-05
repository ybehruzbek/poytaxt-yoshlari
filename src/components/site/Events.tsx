/* eslint-disable @next/next/no-img-element -- namuna rasmlar; CMS ulanganda next/image ga o'tadi */
import Link from 'next/link'

import type { Locale } from '@/i18n/config'

type Ev = {
  title: string
  type: string // tadbir turi
  org: string
  start: string // ISO, Toshkent vaqti
  img: string
  color: string
  dark?: boolean // rang ustida matn to'q bo'lsinmi
}

/** NAMUNA tadbirlar — keyin admin paneldagi "Tadbirlar" bo'limidan keladi. */
const EVENTS: Ev[] = [
  { title: 'Volontyorlar forumi', type: 'Forum', org: 'Shahar kengashi', start: '2026-11-14T10:00:00+05:00', img: '/img/opp-vol.jpg', color: 'var(--green)' },
  { title: 'Yosh tadbirkorlar uchrashuvi', type: 'Uchrashuv', org: 'Hamkor tashkilotlar bilan', start: '2026-11-20T15:00:00+05:00', img: '/img/about-2.jpg', color: 'var(--blue)' },
  { title: 'Kitobxonlik tanlovi finali', type: 'Tanlov', org: 'OTM boshlang‘ich tashkilotlari', start: '2026-11-27T11:00:00+05:00', img: '/img/opp-stip.jpg', color: 'var(--sky)', dark: true },
  { title: 'IT va startaplar haftaligi', type: 'Haftalik', org: 'Poytaxt miqyosida', start: '2026-12-04T09:30:00+05:00', img: '/img/news-2.jpg', color: 'var(--navy)' },
]

const MON_FULL = ['yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun', 'iyul', 'avgust', 'sentabr', 'oktabr', 'noyabr', 'dekabr']
const WD = ['Yakshanba', 'Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma', 'Shanba']

/** ISO → Toshkent vaqtidagi qismlar */
function parts(iso: string) {
  const d = new Date(new Date(iso).getTime() + 5 * 3600 * 1000)
  const hh = String(d.getUTCHours()).padStart(2, '0')
  const mm = String(d.getUTCMinutes()).padStart(2, '0')
  return {
    day: String(d.getUTCDate()).padStart(2, '0'),
    mon: MON_FULL[d.getUTCMonth()].toUpperCase(), // oy nomi to'liq: NOYABR
    wd: WD[d.getUTCDay()],
    full: `${d.getUTCDate()}-${MON_FULL[d.getUTCMonth()]}`,
    time: `${hh}:${mm}`,
  }
}
function daysLeft(iso: string) {
  return Math.max(0, Math.ceil((new Date(iso).getTime() - Date.now()) / 86400000))
}
const leftLabel = (n: number) => (n === 0 ? 'Bugun' : n === 1 ? 'Ertaga' : `${n} kun qoldi`)

const Arrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)
const Org = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 21h18M5 21V8l7-5 7 5v13M9 21v-6h6v6" />
  </svg>
)

/**
 * Yaqin tadbirlar — "chipta" ko'rinishi: tepada rasm va qolgan kunlar, o'yilgan chiziq,
 * pastda sana, vaqt, tashkilotchi va "Ro'yxatdan o'tish".
 */
export function Events({ locale }: { locale: Locale }) {
  const href = `/${locale}/faoliyat/tadbirlar`
  const items = EVENTS.map((e) => ({ ...e, p: parts(e.start), left: daysLeft(e.start) }))

  return (
    <section className="sec ev-sec" id="tadbirlar" aria-labelledby="ev-title">
      <div className="wrap">
        <div className="sec-head">
          <h2 className="h2" id="ev-title">Yaqin tadbirlar</h2>
          <Link href={href} className="btn btn-ghost">Barcha tadbirlar</Link>
        </div>

        {/* Chipta ko'rinishi */}
        <div className="evv-c">
          {items.map((e) => (
            <Link key={e.title} href={href} className="pt-ticket">
              <div className="pt-img">
                <img className="cover" src={e.img} alt="" />
                <span className="pa-type">{e.type}</span>
                <span className="pt-left">{leftLabel(e.left)}</span>
              </div>
              <div className="pt-cut" aria-hidden="true" />
              <div className="pt-stub">
                <span className="pt-date" style={{ background: e.color, color: e.dark ? 'var(--navy)' : '#fff' }}>
                  <b>{e.p.day}</b>
                  <small>{e.p.mon}</small>
                </span>
                <div className="pt-txt">
                  <h3>{e.title}</h3>
                  <p>{e.p.wd}, {e.p.full} · {e.p.time}</p>
                  <p><Org /> {e.org}</p>
                </div>
              </div>
              <span className="pt-cta">Ro‘yxatdan o‘tish <Arrow /></span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
