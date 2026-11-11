/* eslint-disable @next/next/no-img-element -- kiçik SVG bayroqlar */
import type { CSSProperties } from 'react'

import { DevSectionsPanel } from '@/components/site/DevSectionsPanel'

/** Hamkor mamlakatlar (bayroqlar: public/img/flags/{kod}.svg — kvadrat, 4x3/{kod}.svg — asl nisbat; flag-icons, MIT) */
const COUNTRIES = [
  ['tr', 'Turkiya'],
  ['az', 'Ozarbayjon'],
  ['kz', 'Qozoğiston'],
  ['tj', 'Tojikiston'],
  ['tm', 'Turkmaniston'],
  ['kg', 'Qirğiziston'],
  ['pk', 'Pokiston'],
  ['in', 'Hindiston'],
  ['cn', 'Xitoy'],
  ['ru', 'Rossiya'],
  ['us', 'AQŞ'],
  ['kr', 'Janubiy Koreya'],
  ['jp', 'Yaponiya'],
  ['de', 'Germaniya'],
  ['sg', 'Singapur'],
  ['my', 'Malayziya'],
  ['by', 'Belarus'],
  ['qa', 'Qatar'],
] as const
type C = readonly [string, string]

const sq = (code: string) => `/img/flags/${code}.svg`
const wide = (code: string) => `/img/flags/4x3/${code}.svg`
const LABEL = `Hamkor mamlakatlar: ${COUNTRIES.map((c) => c[1]).join(', ')}`
const v = (k: number) => ({ '--k': k }) as CSSProperties

/** Ro'yxat ikki marta: lenta yarim eniga surilganda boşiga uzluksiz ulanadi */
const twice = (items: readonly C[]) => [0, 1].flatMap((copy) => items.map((c) => ({ c, copy })))

/* A — Kapsulalar: dumaloq bayroq + nom, ikki qator qarama-qarşi tomonga */
function Chips() {
  const half = Math.ceil(COUNTRIES.length / 2)
  const row = (items: readonly C[], speed: number, rev?: boolean) => (
    <div className={`fm-row${rev ? ' rev' : ''}`} style={{ '--dur': `${speed}s` } as CSSProperties}>
      <ul className="fm-track">
        {twice(items).map(({ c: [code, name], copy }) => (
          <li key={`${copy}-${code}`} className="fm-chip" aria-hidden={copy === 1 || undefined}>
            <span className="fm-flag">
              <img src={sq(code)} alt="" width={40} height={40} />
            </span>
            {name}
          </li>
        ))}
      </ul>
    </div>
  )
  return (
    <div className="fm" role="img" aria-label={LABEL}>
      {row(COUNTRIES.slice(0, half), 38)}
      {row(COUNTRIES.slice(half), 44, true)}
    </div>
  )
}

/* B — Hilpiraydigan bayroqlar: dastadagi asl nisbatli bayroqlar şamolda tebranadi, ustidan nur yuradi */
function Waving() {
  return (
    <div className="fw2" role="img" aria-label={LABEL}>
      <ul className="fw2-track">
        {twice(COUNTRIES).map(({ c: [code, name], copy }, i) => (
          <li key={`${copy}-${code}`} aria-hidden={copy === 1 || undefined} style={v(i % COUNTRIES.length)}>
            <span className="fw2-pole" />
            <span className="fw2-cloth">
              <img src={wide(code)} alt="" width={120} height={90} />
            </span>
            <small>{name}</small>
          </li>
        ))}
      </ul>
    </div>
  )
}

/* C — Karusel: bayroqlar 3D halqada aylanadi, har biri doim tomoşabinga qarab turadi */
function Ring() {
  const n = COUNTRIES.length
  return (
    <div className="fr" role="img" aria-label={LABEL}>
      <p className="fr-cap">
        <b>{n}</b> mamlakat bilan hamkorlik
      </p>
      <div className="fr-stage">
        <ul className="fr-ring">
          {COUNTRIES.map(([code, name], i) => (
            <li key={code} style={{ '--a': `${(360 / n) * i}deg` } as CSSProperties}>
              <span className="fr-face">
                <img src={sq(code)} alt="" width={84} height={84} />
                <small>{name}</small>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

/* D — Tölqin: katta dumaloq bayroqlar bir qatorda oqadi va tölqin böylab köterilib-tuşadi */
function Wave() {
  return (
    <div className="fv" role="img" aria-label={LABEL}>
      <ul className="fv-track">
        {twice(COUNTRIES).map(({ c: [code, name], copy }, i) => (
          <li key={`${copy}-${code}`} aria-hidden={copy === 1 || undefined} style={v(i)} data-name={name}>
            <img src={sq(code)} alt="" width={96} height={96} />
          </li>
        ))}
      </ul>
    </div>
  )
}

/* E — Aylanuvçi kartalar: 18 ta bayroq panjarada, kartalar navbat bilan aylanib nomini körsatadi */
function Flip() {
  return (
    <ul className="ff" role="img" aria-label={LABEL}>
      {COUNTRIES.map(([code, name], i) => (
        <li key={code} style={v(i)}>
          <span className="ff-card">
            <span className="ff-front">
              <img src={wide(code)} alt="" width={160} height={120} />
            </span>
            <span className="ff-back">
              <img src={sq(code)} alt="" width={36} height={36} />
              {name}
            </span>
          </span>
        </li>
      ))}
    </ul>
  )
}

const VARIANTS = [Chips, Waving, Ring, Wave, Flip]

/** Hamkor mamlakatlar bayroqlari — vaqtinça 5 köriniş varianti (panel faqat işlab çiqiş rejimida) */
export function FlagsMarquee() {
  return (
    <>
      {VARIANTS.map((V, i) => (
        <div key={i} className="vx" data-v={`flags-${String.fromCharCode(97 + i)}`}>
          <V />
        </div>
      ))}
      <DevSectionsPanel
        sections={[
          {
            name: 'flags',
            label: 'Hamkor mamlakatlar',
            count: VARIANTS.length,
            hints: ['Kapsulalar', 'Hilpiraydigan bayroqlar', '3D karusel', 'Tölqin', 'Aylanuvçi kartalar'],
          },
        ]}
      />
    </>
  )
}
