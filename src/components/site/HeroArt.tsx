/* eslint-disable @next/next/no-img-element -- namuna rasmlar; CMS ulanganda next/image ga ötadi */
import type { CSSProperties, ReactNode } from 'react'

/*
 * VAQTINCHA (faqat dev): boş ekran öng tomoni uçun butunlay boşqa yönalişdagi variantlar.
 * A — hozirgi kollaj (Hero.tsx içida). Tanlangandan keyin qolganlari öçiriladi.
 */

const Ico = ({ children }: { children: ReactNode }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {children}
  </svg>
)

const Star = ({ className, fill = '#FF854B' }: { className: string; fill?: string }) => (
  <svg className={className} viewBox="0 0 40 40" aria-hidden="true">
    <path fill={fill} d="M20 0c2 12 8 18 20 20-12 2-18 8-20 20-2-12-8-18-20-20 12-2 18-8 20-20z" />
  </svg>
)

const PILLS = [
  { t: 'Taʼlim', c: 'var(--sky)', dark: true },
  { t: 'Sport', c: 'var(--green)' },
  { t: 'Ijod', c: 'var(--lime)', dark: true },
  { t: 'Tadbirkorlik', c: 'var(--blue)' },
  { t: 'Volontyorlik', c: 'var(--yellow)', dark: true },
]

/** B · Plakat: suratsiz, yirik tipografik plakat — "POYTAXT YOŞLARI BIRGA!" va yönaliş stikerlari */
export function HeroArtPoster() {
  return (
    <div className="ha hp" aria-hidden="true">
      <div className="hp-card">
        <span className="hp-kicker">Toşkent · 2026</span>
        <span className="hp-w w1">Poytaxt</span>
        <span className="hp-w w2">yoşlari</span>
        <span className="hp-w w3">birga!</span>
        <div className="hp-pills">
          {PILLS.map((p, i) => (
            <span
              key={p.t}
              className={`hp-pill${p.dark ? ' dark' : ''}`}
              style={{ background: p.c, '--i': i } as CSSProperties}
            >
              {p.t}
            </span>
          ))}
        </div>
        <span className="hp-photo">
          <img src="/img/about-1.jpg" alt="" />
        </span>
        <svg className="hp-arrow" viewBox="0 0 120 80">
          <path d="M6 70C30 20 70 8 108 18" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
          <path d="M92 6l18 12-16 14" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <Star className="hp-star" />
      <Star className="hp-star2" fill="#43A574" />
    </div>
  )
}

/** C · Ilova: saytning foydasi interfeys kartalari körinişida — imkoniyatlar röyxati, yaqin tadbir, bildiriş */
export function HeroArtApp() {
  const opps = [
    { t: 'Yoşlar taşabbuslari granti', s: 'Poytaxt miqyosida', c: 'var(--yellow)', i: <path d="M12 2v20M17 6H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /> },
    { t: 'Iqtidorli yoşlar stipendiyasi', s: 'Davlat dasturi', c: 'var(--sky)', i: <path d="M2 9l10-5 10 5-10 5zM6 11v5c0 1.5 3 3 6 3s6-1.5 6-3v-5" /> },
    { t: 'Şahar volontyorlari dasturi', s: 'Poytaxt miqyosida', c: 'var(--green)', i: <path d="M12 21s-7-4.4-9.3-9C1 8.5 3 5 6.5 5c2 0 3.5 1.2 5.5 3 2-1.8 3.5-3 5.5-3C21 5 23 8.5 21.3 12 19 16.6 12 21 12 21z" /> },
  ]
  return (
    <div className="ha hu" aria-hidden="true">
      <div className="hu-main">
        <div className="hu-head">
          <b>Siz uçun imkoniyatlar</b>
          <span className="hu-tabs">
            <i className="on">Barçasi</i>
            <i>Grantlar</i>
            <i>Tanlovlar</i>
          </span>
        </div>
        <ul>
          {opps.map((o) => (
            <li key={o.t}>
              <span className="hu-ic" style={{ background: o.c }}>
                <Ico>{o.i}</Ico>
              </span>
              <span className="hu-txt">
                <b>{o.t}</b>
                <small>{o.s}</small>
              </span>
              <span className="hu-status">Oçiq</span>
            </li>
          ))}
        </ul>
        <span className="hu-more">Barça imkoniyatlar →</span>
      </div>

      <div className="hu-event">
        <span className="hu-date">
          <b>14</b>
          <small>noyabr</small>
        </span>
        <span className="hu-ev-txt">
          <small>Yaqin tadbir</small>
          <b>Volontyorlar forumi</b>
        </span>
        <span className="hu-go">
          <Ico>
            <path d="M7 17 17 7M8 7h9v9" />
          </Ico>
        </span>
      </div>

      <div className="hu-toast">
        <span className="hu-bell">
          <Ico>
            <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.9 1.9 0 0 0 3.4 0" />
          </Ico>
        </span>
        <span>
          <small>Yangi eʼlon</small>
          <b>Startap ğoyalar granti</b>
        </span>
      </div>

      <span className="hu-blob" />
      <Star className="hu-star" />
    </div>
  )
}

/** D · Poytaxt: Toşkent silueti (teleminora, gumbazli bino, zamonaviy minoralar) va havodagi yönaliş şarlari */
export function HeroArtCity() {
  return (
    <div className="ha hk" aria-hidden="true">
      <svg className="hk-city" viewBox="0 0 600 700">
        {/* quyoş va bulutlar */}
        <circle cx="400" cy="250" r="150" fill="#FFD25A" />
        <circle cx="400" cy="250" r="190" fill="none" stroke="#FFD25A" strokeOpacity=".35" strokeWidth="2" strokeDasharray="4 10" />
        <g fill="#fff">
          <rect x="70" y="150" width="140" height="34" rx="17" />
          <rect x="110" y="128" width="70" height="44" rx="22" />
          <rect x="430" y="96" width="120" height="28" rx="14" />
        </g>

        {/* orqa qator: zamonaviy minoralar (och) */}
        <g fill="#89C0FF">
          <rect x="300" y="330" width="56" height="300" rx="6" />
          <path d="M370 300h54v330h-54z" />
          <path d="M436 360l46-20v290h-46z" />
          <rect x="492" y="410" width="48" height="220" rx="6" />
        </g>
        <g fill="#fff" opacity=".55">
          {Array.from({ length: 8 }, (_, r) =>
            [312, 330].map((x) => <rect key={`a${r}${x}`} x={x} y={350 + r * 32} width="10" height="16" rx="2" />),
          )}
          {Array.from({ length: 9 }, (_, r) =>
            [382, 404].map((x) => <rect key={`b${r}${x}`} x={x} y={322 + r * 32} width="10" height="16" rx="2" />),
          )}
        </g>

        {/* teleminora */}
        <g fill="#532822">
          <path d="M150 640l18-200h10l18 200h-12l-11-150-11 150z" />
          <rect x="166" y="150" width="14" height="300" rx="4" />
          <ellipse cx="173" cy="300" rx="34" ry="14" />
          <ellipse cx="173" cy="286" rx="24" ry="9" />
          <ellipse cx="173" cy="200" rx="20" ry="8" />
          <rect x="171" y="80" width="4" height="74" rx="2" />
        </g>
        <circle cx="173" cy="80" r="6" fill="#FF854B" />

        {/* gumbazli bino */}
        <g fill="#FF854B">
          <rect x="196" y="500" width="150" height="130" rx="6" />
          <path d="M216 500a55 55 0 0 1 110 0z" />
          <rect x="208" y="440" width="14" height="190" rx="4" />
          <rect x="320" y="440" width="14" height="190" rx="4" />
        </g>
        <g fill="#FF854B">
          <path d="M206 440l9-22 9 22z" />
          <path d="M318 440l9-22 9 22z" />
        </g>
        <g fill="#FFF4E9">
          <path d="M252 630v-60a19 19 0 0 1 38 0v60z" />
          <path d="M222 600v-26a9 9 0 0 1 18 0v26zM302 600v-26a9 9 0 0 1 18 0v26z" />
        </g>
        <circle cx="271" cy="452" r="6" fill="#532822" />

        {/* daraxtlar va yer */}
        <g fill="#43A574">
          <circle cx="70" cy="600" r="34" />
          <circle cx="110" cy="612" r="26" />
          <circle cx="372" cy="606" r="30" />
          <circle cx="560" cy="604" r="32" />
        </g>
        <rect x="0" y="624" width="600" height="76" rx="38" fill="#532822" />
        <path d="M60 662h480" stroke="#FFD25A" strokeWidth="4" strokeDasharray="22 18" strokeLinecap="round" />
      </svg>

      {PILLS.map((p, i) => (
        <span key={p.t} className={`hk-balloon b${i + 1}${p.dark ? ' dark' : ''}`} style={{ background: p.c }}>
          {p.t}
        </span>
      ))}
      <span className="hk-bubble">Salom, poytaxt!</span>
    </div>
  )
}
