/* eslint-disable @next/next/no-img-element -- kiçik SVG bayroqlar */
import type { CSSProperties } from 'react'

/** Hamkor mamlakatlar (bayroqlar: public/img/flags/{kod}.svg, flag-icons, MIT) */
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

function Row({ items, reverse, speed }: { items: ReadonlyArray<readonly [string, string]>; reverse?: boolean; speed: number }) {
  // ro'yxat ikki marta: lenta yarim eniga surilganda boşiga uzluksiz ulanadi
  return (
    <div className={`fm-row${reverse ? ' rev' : ''}`} style={{ '--dur': `${speed}s` } as CSSProperties}>
      <ul className="fm-track">
        {[0, 1].map((copy) =>
          items.map(([code, name]) => (
            <li key={`${copy}-${code}`} className="fm-chip" aria-hidden={copy === 1 ? true : undefined}>
              <span className="fm-flag">
                <img src={`/img/flags/${code}.svg`} alt="" width={40} height={40} />
              </span>
              {name}
            </li>
          )),
        )}
      </ul>
    </div>
  )
}

/**
 * Hamkor mamlakatlar: dumaloq bayroqli kapsulalar ikki qatorda qarama-qarşi tomonga uzluksiz aylanadi;
 * siçqonça ustiga kelganda töxtaydi.
 */
export function FlagsMarquee() {
  const half = Math.ceil(COUNTRIES.length / 2)
  return (
    <div className="fm" aria-label={`Hamkor mamlakatlar: ${COUNTRIES.map((c) => c[1]).join(', ')}`} role="img">
      <Row items={COUNTRIES.slice(0, half)} speed={38} />
      <Row items={COUNTRIES.slice(half)} speed={44} reverse />
    </div>
  )
}
