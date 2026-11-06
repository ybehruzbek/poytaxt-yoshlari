/* eslint-disable @next/next/no-img-element -- namuna rasmlar; CMS ulanganda next/image ga ötadi */
import type { CSSProperties, ReactNode } from 'react'

import { FitCanvas } from './FitCanvas'

/*
 * VAQTINCHA (faqat dev): boş ekran öng tomoni — "Orbita" (C) va uning takomillaştirilgan körinişlari.
 * A — hozirgi kollaj (Hero.tsx içida). Tanlangandan keyin qolganlari öçiriladi.
 */

export const Ico = ({ children }: { children: ReactNode }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {children}
  </svg>
)

/** Hero matnidagi yönalişlar. img/izoh — C2 uçun (rasmlar NAMUNA, yönalişga mos suratlar bilan almaştiriladi) */
export const DIRS: { t: string; c: string; dark?: boolean; i: ReactNode; img: string; d: string }[] = [
  { t: 'Taʼlim', c: 'var(--sky)', dark: true, img: 'news-1', d: 'Grantlar, stipendiyalar va öquv kurslari', i: <path d="M2 9l10-5 10 5-10 5zM6 11v5c0 1.5 3 3 6 3s6-1.5 6-3v-5" /> },
  { t: 'Sport', c: 'var(--green)', img: 'about-3', d: 'Musobaqalar va soğlom turmuş tarzi', i: <><circle cx="12" cy="12" r="9" /><path d="M12 3v18M3 12h18M5.6 5.6c3.5 3.5 3.5 9.3 0 12.8M18.4 5.6c-3.5 3.5-3.5 9.3 0 12.8" /></> },
  { t: 'Ijod', c: 'var(--lime)', dark: true, img: 'about-2', d: 'Tanlovlar, festivallar va ijodiy loyihalar', i: <path d="M12 3a9 9 0 1 0 0 18c1 0 1.5-.8 1.5-1.6 0-1.2-1-1.4-1-2.4 0-.9.7-1.5 1.6-1.5H16a5 5 0 0 0 5-5c0-4.2-4-7.5-9-7.5zM7.5 11h.01M10.5 7.5h.01M15 8h.01" /> },
  { t: 'Tadbirkorlik', c: 'var(--blue)', img: 'opp-grant', d: 'Startaplar va biznes taşabbuslari', i: <><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 13h18" /></> },
  { t: 'Volontyorlik', c: 'var(--yellow)', dark: true, img: 'opp-vol', d: 'Şahar tadbirlari va ijtimoiy aksiyalar', i: <path d="M12 21s-7-4.4-9.3-9C1 8.5 3 5 6.5 5c2 0 3.5 1.2 5.5 3 2-1.8 3.5-3 5.5-3C21 5 23 8.5 21.3 12 19 16.6 12 21 12 21z" /> },
]

/** Yönaliş yorliği: rangli belgi + nom */
export function DirChip({ d, className = 'hac-chip' }: { d: (typeof DIRS)[number]; className?: string }) {
  return (
    <span className={className}>
      <span className={`hac-ic${d.dark ? ' dark' : ''}`} style={{ background: d.c }}>
        <Ico>{d.i}</Ico>
      </span>
      {d.t}
    </span>
  )
}

const angle = (i: number, n: number, shift = -90) => ({ '--a': `${(360 / n) * i + shift}deg` }) as CSSProperties

const Star = ({ className, fill = '#FF854B' }: { className: string; fill?: string }) => (
  <svg className={className} viewBox="0 0 40 40">
    <path fill={fill} d="M20 0c2 12 8 18 20 20-12 2-18 8-20 20-2-12-8-18-20-20 12-2 18-8 20-20z" />
  </svg>
)

/** C · Orbita (asl): markazda surat, atrofida 5 yönaliş sekin aylanadi */
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
          <span key={d.t} className="hac-item" style={angle(i, DIRS.length)}>
            <DirChip d={d} />
          </span>
        ))}
      </div>
      <Star className="hac-star" />
      <span className="hac-half" />
    </div>
  )
}

/**
 * C1 · Ikki orbita: içki orbitada 5 yönaliş, taşqi orbitada yoşlar suratlari — ikkalasi qarama-qarşi
 * yönalişda aylanadi; markazda surat va "Yoşlar Ittifoqi" yorliği, orqada iliq nur.
 */
export function HeroArtC1() {
  const faces = ['about-1', 'news-2', 'opp-vol', 'about-2', 'news-3', 'opp-stip']
  return (
    <div className="ha hac hac1" aria-hidden="true">
      <span className="hac1-glow" />
      <span className="hac-ring r1" />
      <span className="hac-ring r2" />
      <div className="hac-orbit hac1-outer">
        {faces.map((f, i) => (
          <span key={f} className="hac-item hac1-far" style={angle(i, faces.length, -60)}>
            <span className="hac1-face">
              <img src={`/img/${f}.jpg`} alt="" />
            </span>
          </span>
        ))}
      </div>
      <div className="hac-photo hac1-photo">
        <img src="/img/hero-tk.jpg" alt="" />
      </div>
      <span className="hac1-tag">Yoşlar Ittifoqi</span>
      <div className="hac-orbit hac1-inner">
        {DIRS.map((d, i) => (
          <span key={d.t} className="hac-item hac1-near" style={angle(i, DIRS.length)}>
            <DirChip d={d} />
          </span>
        ))}
      </div>
      <span className="hac-bubble">Salom!</span>
      <Star className="hac-star" />
    </div>
  )
}

/** C3 orbitalari: 600×700 kanvasdagi qiya ellipslar (markaz 300,350). front — oldingi yarmi */
const C3_ORBITS = [
  { rx: 300, ry: 100, rot: -18, a: [585.3, 257.3], b: [14.7, 442.7], dur: 26, dirs: DIRS.slice(0, 3) },
  { rx: 270, ry: 85, rot: 22, a: [550.3, 451.1], b: [49.7, 248.9], dur: 20, dirs: DIRS.slice(3) },
]
const arc = (o: (typeof C3_ORBITS)[number], to: number[]) => `A ${o.rx} ${o.ry} ${o.rot} 1 1 ${to[0]} ${to[1]}`
const fullPath = (o: (typeof C3_ORBITS)[number]) => `M ${o.a[0]} ${o.a[1]} ${arc(o, o.b)} ${arc(o, o.a)}`
const frontPath = (o: (typeof C3_ORBITS)[number]) => `M ${o.a[0]} ${o.a[1]} ${arc(o, o.b)}`

/**
 * C3 · Qiya orbitalar: surat atrofida ikkita qiya ellips-orbita (3D taassurot);
 * yönalişlar ellips böylab harakatlanadi — orqada surat ortiga ötib kiçrayadi, oldinda kattalaşadi.
 */
export function HeroArtC3() {
  return (
    <FitCanvas className="ha hac3">
      <div className="hac3-canvas">
        <span className="hac3-glow" />
        <svg className="hac3-lines back" viewBox="0 0 600 700">
          {C3_ORBITS.map((o, i) => (
            <path key={i} d={fullPath(o)} />
          ))}
        </svg>
        <div className="hac3-photo">
          <img src="/img/hero-tk.jpg" alt="" />
        </div>
        <svg className="hac3-lines front" viewBox="0 0 600 700">
          {C3_ORBITS.map((o, i) => (
            <path key={i} d={frontPath(o)} />
          ))}
        </svg>
        {C3_ORBITS.flatMap((o, oi) =>
          o.dirs.map((d, i) => (
            <span
              key={d.t}
              className="hac3-mover"
              style={
                {
                  offsetPath: `path("${fullPath(o)}")`,
                  animationDuration: `${o.dur}s`,
                  animationDelay: `${(-o.dur / o.dirs.length) * i - oi * 3}s`,
                } as CSSProperties
              }
            >
              <DirChip d={d} className="hac3-chip" />
            </span>
          )),
        )}
        <span className="hac-bubble hac3-bubble">Salom!</span>
        <Star className="hac3-star" />
        <Star className="hac3-star2" fill="#43A574" />
      </div>
    </FitCanvas>
  )
}
