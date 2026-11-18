import type { CSSProperties, ReactNode } from 'react'

import type { OppType } from '@/lib/opps'

/**
 * “Yoşlar uçun imkoniyatlar” kartalari orqasidagi mavzuli bezaklar: karta oçilganda (hover/fokus)
 * yönalişning öz belgilari çiqadi — grantlar: tanga, pul, ösiş; stipendiyalar: qalpoq, kitob, diplom;
 * volontyorlik: yurak, qöl, barg; tanlovlar: kubok, medal, yulduz.
 */

type Icon = { d: ReactNode; label?: string }
const I: Record<string, Icon> = {
  coin: { d: <><circle cx="12" cy="12" r="9" /><path d="M14.5 9.2c-.4-.8-1.3-1.2-2.5-1.2-1.5 0-2.5.7-2.5 1.8 0 2.4 5 1.4 5 3.9 0 1.1-1 1.8-2.5 1.8-1.2 0-2.1-.4-2.5-1.2M12 6.5V8m0 8v1.5" /></> },
  coins: { d: <><ellipse cx="12" cy="6" rx="7" ry="3" /><path d="M5 6v4c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 10v4c0 1.7 3.1 3 7 3s7-1.3 7-3v-4M5 14v4c0 1.7 3.1 3 7 3s7-1.3 7-3v-4" /></> },
  note: { d: <><rect x="2" y="6" width="20" height="12" rx="2" /><circle cx="12" cy="12" r="2.6" /><path d="M6 9.5h.01M18 14.5h.01" /></> },
  chart: { d: <path d="M3 20h18M6 17v-3M11 17v-6M16 17V9M4 11l6-5 4 3 6-5M16.5 4H20v3.5" /> },
  bulb: { d: <path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z" /> },
  cap: { d: <><path d="M2 9l10-5 10 5-10 5z" /><path d="M6 11v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5M22 9v6" /></> },
  book: { d: <path d="M2 5c3-1.5 6-1.5 10 1 4-2.5 7-2.5 10-1v14c-3-1.5-6-1.5-10 1-4-2.5-7-2.5-10-1zM12 6v14" /> },
  diploma: { d: <><rect x="3" y="4" width="18" height="13" rx="2" /><path d="M7 9h10M7 12h6" /><circle cx="17" cy="17" r="3" /><path d="M16 19.5V23l1-1 1 1v-3.5" /></> },
  pencil: { d: <path d="M4 20l4-1L19 8l-3-3L5 16zM14 7l3 3" /> },
  aplus: { d: <path d="M4 19l4.5-12h1L14 19M5.6 15h6.8M17 9v6m-3-3h6" /> },
  heart: { d: <path d="M12 20s-7-4.4-9-9a5 5 0 0 1 9-3 5 5 0 0 1 9 3c-2 4.6-9 9-9 9z" /> },
  hand: { d: <><path d="M12 10s-3-2-3-4a1.8 1.8 0 0 1 3-1.2A1.8 1.8 0 0 1 15 6c0 2-3 4-3 4z" /><path d="M2 15h4l3 2h4a2 2 0 0 0 0-4h-3M6 21h7l8-5a2 2 0 0 0-2.6-3l-4.4 3" /></> },
  leaf: { d: <path d="M5 19C5 10 11 4 20 4c0 9-6 15-15 15zM5 19l8-8" /> },
  globe: { d: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" /></> },
  smile: { d: <><circle cx="12" cy="12" r="9" /><path d="M8 14s1.5 2 4 2 4-2 4-2M9 9.5h.01M15 9.5h.01" /></> },
  trophy: { d: <path d="M8 4h8v5a4 4 0 0 1-8 0zM8 6H4v1a4 4 0 0 0 4 4M16 6h4v1a4 4 0 0 1-4 4M12 13v4M8 21h8M10 17h4v4h-4z" /> },
  medal: { d: <><path d="M8 2l2.5 6.5M16 2l-2.5 6.5" /><circle cx="12" cy="15" r="6" /><path d="M12 12l1 2 2.2.3-1.6 1.5.4 2.2-2-1-2 1 .4-2.2-1.6-1.5L11 14z" /></> },
  star: { d: <path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z" /> },
  podium: { d: <path d="M3 21v-7h6v7M9 21V9h6v12M15 21v-5h6v5M3 21h18M12 4.5v2" /> },
  target: { d: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.5" /></> },
}

/** Har yönaliş uçun çiziqli belgilar */
const SET: Record<OppType, { line: string[] }> = {
  grant: { line: ['coin', 'chart', 'note', 'bulb', 'coins', 'coin', 'chart'] },
  stip: { line: ['cap', 'book', 'aplus', 'diploma', 'pencil', 'cap', 'book'] },
  vol: { line: ['heart', 'hand', 'leaf', 'globe', 'smile', 'heart', 'leaf'] },
  tanlov: { line: ['trophy', 'star', 'medal', 'target', 'podium', 'star', 'trophy'] },
}

/** Belgilar joyi (karta ölçamiga nisbatan, %) — odam öngda, sarlavha çap tepada, maʼlumot paneli pastda */
const POS: Array<[number, number, number, number]> = [
  // left, top, ölçam(px), burilish
  [7, 36, 58, -12],
  [30, 45, 74, 8],
  [11, 55, 46, 16],
  [46, 30, 42, -6],
  [72, 10, 50, 14],
  [26, 68, 64, -10],
  [50, 62, 38, 20],
]
const Svg = ({ name, style, className }: { name: string; style?: CSSProperties; className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} style={style} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    {I[name].d}
  </svg>
)

export function OppTheme({ t }: { t: OppType }) {
  const s = SET[t]
  return (
    <>
      <span className="th th-a" aria-hidden="true">
        {s.line.map((n, k) => {
          const [l, top, size, r] = POS[k]
          return <Svg key={k} name={n} className="th-i" style={{ left: `${l}%`, top: `${top}%`, width: size, height: size, rotate: `${r}deg`, '--k': k } as CSSProperties} />
        })}
      </span>
    </>
  )
}
