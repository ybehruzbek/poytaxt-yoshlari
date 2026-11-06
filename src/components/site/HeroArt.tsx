/* eslint-disable @next/next/no-img-element -- namuna rasmlar; CMS ulanganda next/image ga ötadi */
import Link from 'next/link'
import type { CSSProperties, ReactNode } from 'react'

import type { Locale } from '@/i18n/config'

/*
 * VAQTINCHA (faqat dev): bosh ekran öng tomoni uçun B va C variantlari.
 * A — hozirgi kollaj (Hero.tsx içida). Tanlangandan keyin qolganlari öçiriladi.
 */

/** B · Mozaika: real suratlar bento-tör körinişida, yaqin tadbir kartasi va palitra şakllari */
export function HeroArtB({ locale }: { locale: Locale }) {
  return (
    <div className="ha hab">
      <div className="hab-grid">
        <div className="hab-tile hab-main">
          <img src="/img/hero-tk.jpg" alt="" />
          <span className="hab-tag">Yoşlar Ittifoqi</span>
        </div>
        <div className="hab-tile hab-voice" aria-hidden="true">
          <span className="hab-wave">
            <b />
            <b />
            <b />
            <b />
            <b />
          </span>
          <span>Poytaxt yoşlari ovozi</span>
        </div>
        <div className="hab-tile hab-pill">
          <img src="/img/about-1.jpg" alt="" />
        </div>
        <Link href={`/${locale}/faoliyat/tadbirlar`} className="hab-tile hab-event">
          <small>Yaqin tadbir</small>
          <b>
            14 <span>noyabr</span>
          </b>
          <span className="hab-ev-title">Volontyorlar forumi</span>
          <span className="hab-ev-go" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17 17 7M8 7h9v9" />
            </svg>
          </span>
        </Link>
      </div>
      <svg className="hab-blob" viewBox="0 0 100 100" aria-hidden="true">
        <path
          fill="#89C0FF"
          d="M50 2l8 9 12-4 3 12 12 2-3 12 10 8-9 8 6 11-12 4 1 12-12-1-4 12-11-6-8 9-8-9-11 6-4-12-12 1 1-12-12-4 6-11-9-8 10-8-3-12 12-2 3-12 12 4z"
        />
      </svg>
      <svg className="hab-star" viewBox="0 0 40 40" aria-hidden="true">
        <path fill="#FF854B" d="M20 0c2 12 8 18 20 20-12 2-18 8-20 20-2-12-8-18-20-20 12-2 18-8 20-20z" />
      </svg>
      <span className="hab-dot" aria-hidden="true" />
    </div>
  )
}

const Ico = ({ children }: { children: ReactNode }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {children}
  </svg>
)

/** Hero matnidagi yönalişlar */
const DIRS: { t: string; c: string; dark?: boolean; i: ReactNode }[] = [
  { t: 'Taʼlim', c: 'var(--sky)', dark: true, i: <path d="M2 9l10-5 10 5-10 5zM6 11v5c0 1.5 3 3 6 3s6-1.5 6-3v-5" /> },
  { t: 'Sport', c: 'var(--green)', i: <><circle cx="12" cy="12" r="9" /><path d="M12 3v18M3 12h18M5.6 5.6c3.5 3.5 3.5 9.3 0 12.8M18.4 5.6c-3.5 3.5-3.5 9.3 0 12.8" /></> },
  { t: 'Ijod', c: 'var(--lime)', dark: true, i: <path d="M12 3a9 9 0 1 0 0 18c1 0 1.5-.8 1.5-1.6 0-1.2-1-1.4-1-2.4 0-.9.7-1.5 1.6-1.5H16a5 5 0 0 0 5-5c0-4.2-4-7.5-9-7.5zM7.5 11h.01M10.5 7.5h.01M15 8h.01" /> },
  { t: 'Tadbirkorlik', c: 'var(--blue)', i: <><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 13h18" /></> },
  { t: 'Volontyorlik', c: 'var(--yellow)', dark: true, i: <path d="M12 21s-7-4.4-9.3-9C1 8.5 3 5 6.5 5c2 0 3.5 1.2 5.5 3 2-1.8 3.5-3 5.5-3C21 5 23 8.5 21.3 12 19 16.6 12 21 12 21z" /> },
]

/** C · Orbita: markazda surat, atrofida hero matnidagi 5 yönaliş sekin aylanadi */
export function HeroArtC() {
  return (
    <div className="ha hac" aria-hidden="true">
      <span className="hac-ring r1" />
      <span className="hac-ring r2" />
      <div className="hac-photo">
        <img src="/img/hero-tk.jpg" alt="" />
      </div>
      <span className="hac-bubble">Salom!</span>
      <div className="hac-orbit">
        {DIRS.map((d, i) => (
          <span key={d.t} className="hac-item" style={{ '--a': `${(360 / DIRS.length) * i - 90}deg` } as CSSProperties}>
            <span className="hac-chip">
              <span className={`hac-ic${d.dark ? ' dark' : ''}`} style={{ background: d.c }}>
                <Ico>{d.i}</Ico>
              </span>
              {d.t}
            </span>
          </span>
        ))}
      </div>
      <svg className="hac-star" viewBox="0 0 40 40">
        <path fill="#FF854B" d="M20 0c2 12 8 18 20 20-12 2-18 8-20 20-2-12-8-18-20-20 12-2 18-8 20-20z" />
      </svg>
      <span className="hac-half" />
    </div>
  )
}

/** D · Lahzalar: yelpiğiç kabi joylaşgan 3 ta foto-karta (izohli), stikerlar; ustiga kelinganda kartalar yoyiladi */
export function HeroArtD() {
  const cards = [
    { img: 'opp-vol', t: 'Volontyorlik aksiyasi', c: 'var(--green)' },
    { img: 'news-2', t: 'Talabalar bilan muloqot', c: 'var(--sky)' },
    { img: 'hero-tk', t: 'Poytaxt yoşlari forumi', c: 'var(--yellow)' },
  ]
  return (
    <div className="ha had" aria-hidden="true">
      {cards.map((k, i) => (
        <figure key={k.img} className={`had-card k${i + 1}`}>
          <span className="had-img">
            <img src={`/img/${k.img}.jpg`} alt="" />
          </span>
          <figcaption>
            <i style={{ background: k.c }} />
            {k.t}
          </figcaption>
        </figure>
      ))}
      <span className="had-sticker s1">Salom!</span>
      <span className="had-sticker s2">#YoşlarBilan</span>
      <svg className="had-star" viewBox="0 0 40 40">
        <path fill="#FF854B" d="M20 0c2 12 8 18 20 20-12 2-18 8-20 20-2-12-8-18-20-20 12-2 18-8 20-20z" />
      </svg>
      <span className="had-dot" />
    </div>
  )
}

/** E · Muhr: tirik şakldagi katta surat va aylanib turuvçi doira-yozuv (hero şiori) */
export function HeroArtE() {
  const text = 'ORZU QIL • HARAKAT QIL • BIZ YONINGDAMIZ • '
  return (
    <div className="ha hae" aria-hidden="true">
      <span className="hae-bg" />
      <div className="hae-photo">
        <img src="/img/hero-tk.jpg" alt="" />
      </div>
      <div className="hae-seal">
        <svg viewBox="0 0 200 200">
          <defs>
            <path id="hae-circle" d="M100 100m-78 0a78 78 0 1 1 156 0a78 78 0 1 1-156 0" />
          </defs>
          <text>
            <textPath href="#hae-circle" textLength="486" lengthAdjust="spacing">{text}</textPath>
          </text>
        </svg>
        <svg className="hae-seal-star" viewBox="0 0 40 40">
          <path fill="currentColor" d="M20 0c2 12 8 18 20 20-12 2-18 8-20 20-2-12-8-18-20-20 12-2 18-8 20-20z" />
        </svg>
      </div>
      <span className="hae-pill p1">Taʼlim</span>
      <span className="hae-pill p2">Sport</span>
      <span className="hae-pill p3">Ijod</span>
      <div className="hae-mini">
        <img src="/img/about-1.jpg" alt="" />
      </div>
    </div>
  )
}

function HafCol({ imgs, dir }: { imgs: string[]; dir: 'up' | 'down' }) {
  return (
    <div className={`haf-col ${dir}`}>
      <div className="haf-track">
        {[...imgs, ...imgs].map((m, i) => (
          <span key={i} className="haf-img">
            <img src={`/img/${m}.jpg`} alt="" />
          </span>
        ))}
      </div>
    </div>
  )
}

/** F · Ustunlar: suratlar ikki ustunda sekin tepaga va pastga oqib turadi */
export function HeroArtF() {
  const col1 = ['hero-tk', 'opp-vol', 'news-1', 'about-2']
  const col2 = ['about-1', 'news-3', 'opp-grant', 'news-2']
  return (
    <div className="ha haf" aria-hidden="true">
      <div className="haf-frame">
        <HafCol imgs={col1} dir="up" />
        <HafCol imgs={col2} dir="down" />
      </div>
      <span className="haf-badge">
        <b>Poytaxt</b> yoşlari hayoti
      </span>
      <svg className="haf-blob" viewBox="0 0 100 100">
        <path
          fill="#89C0FF"
          d="M50 2l8 9 12-4 3 12 12 2-3 12 10 8-9 8 6 11-12 4 1 12-12-1-4 12-11-6-8 9-8-9-11 6-4-12-12 1 1-12-12-4 6-11-9-8 10-8-3-12 12-2 3-12 12 4z"
        />
      </svg>
    </div>
  )
}
