/** “Aʼzo böliş” sahifasining umumiy qismlari (serverda çiziladi) */
import Link from 'next/link'

import { ARIZA, CONDITIONS, STEPS } from './data'

const USTAV = (L: (h: string) => string, band: string) => L(`/hujjatlar/normativ/ustav#band-${band}`)

/** Kim aʼzo bölişi mumkin — uç şart */
export function Conditions({ L }: { L: (h: string) => string }) {
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
export function Steps({ L }: { L: (h: string) => string }) {
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

/** Ariza hujjati (namuna yoki töldirilgan) — çop etişga tayyor */
export function ArizaDoc({ org = '', name = '', date = '' }: { org?: string; name?: string; date?: string }) {
  return (
    <article className="az-doc" aria-label="Ariza">
      <div className="az-doc-to">
        <p>{ARIZA.to(org)}</p>
        <p>{ARIZA.from(name)}</p>
      </div>
      <h3>ARIZA</h3>
      <p className="az-doc-body">{ARIZA.body}</p>
      <div className="az-doc-sign">
        <span>Sana: {date || '“____” ______________ 20___-yil'}</span>
        <span>Imzo: ______________</span>
      </div>
    </article>
  )
}
