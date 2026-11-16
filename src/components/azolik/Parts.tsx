/** “Aʼzo böliş” sahifasining qismlari: şartlar va tartib (serverda çiziladi) */
import Link from 'next/link'

import type { getAzolik } from '@/lib/cms/sahifalar'

type AZ = Awaited<ReturnType<typeof getAzolik>>

const USTAV = (L: (h: string) => string, band: string) => L(`/hujjatlar/normativ/ustav#band-${band}`)

/** Kim aʼzo bölişi mumkin — uç şart */
export function Conditions({ L, CONDITIONS }: { L: (h: string) => string; CONDITIONS: AZ['CONDITIONS'] }) {
  return (
    <ul className="az-cond">
      {CONDITIONS.map((c) => (
        <li key={c.k}>
          <b>{c.k}</b>
          <p>{c.d}</p>
          <Link href={USTAV(L, c.band)} className="az-band">
            {c.band}-band
          </Link>
        </li>
      ))}
    </ul>
  )
}

/** Qabul qiliş tartibi — uç bosqiç */
export function Steps({ L, STEPS }: { L: (h: string) => string; STEPS: AZ['STEPS'] }) {
  return (
    <ol className="az-steps">
      {STEPS.map((s, i) => (
        <li key={s.band}>
          <span className="az-step-n">{i + 1}</span>
          <div>
            <h3>{s.t}</h3>
            <p>{s.d}</p>
            <Link href={USTAV(L, s.band)} className="az-band">
              {s.band}-band
            </Link>
          </div>
        </li>
      ))}
    </ol>
  )
}
