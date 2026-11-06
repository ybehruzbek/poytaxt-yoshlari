import type { ReactNode } from 'react'

import { AccTools } from './AccTools'

export type AccMeta = { id: string; title: string; sub: string; g: string }

/**
 * Guruh paneli: sarlavhasi «guruhlar» körinişida çiqadi; «yonga oçiladigan çiziqlar» körinişida
 * yopiq guruh tik rangli çiziq (tugma) bölib turadi, bosilganda panel oçiladi.
 */
export function GroupPanel({
  g,
  label,
  n,
  children,
}: {
  g: string
  label: string
  n: number
  children: ReactNode
}) {
  return (
    <section className="gp" data-g={g} aria-label={label}>
      <button type="button" className="gp-strip" data-g={g}>
        <span className="gp-num">{String(n).padStart(2, '0')}</span>
        <span className="gp-label">{label}</span>
      </button>
      <div className="gp-body">
        <div className="acc-grp">
          <div className="wrap">
            <h2>{label}</h2>
          </div>
        </div>
        {children}
      </div>
    </section>
  )
}

/** Akkordeon bölimi: nomi va qisqa izohi; bosilganda bölim mazmuni oçiladi */
export function Acc({
  meta,
  n,
  open,
  children,
}: {
  meta: AccMeta
  n: number
  open?: boolean
  children: ReactNode
}) {
  return (
    <details className="acc" id={meta.id} data-g={meta.g} open={open}>
      <summary>
        <span className="wrap acc-row">
          <span className="acc-n">{String(n).padStart(2, '0')}</span>
          <span className="acc-t">
            <b>{meta.title}</b>
            <small>{meta.sub}</small>
          </span>
          <span className="acc-ic" aria-hidden="true" />
        </span>
      </summary>
      <div className="acc-body">{children}</div>
    </details>
  )
}

/** Akkordeonlar röyxati ustidagi panel: «Hammasini oçiş / yopiş» */
export function AccHead() {
  return (
    <div className="acc-head">
      <div className="wrap">
        <p>Bölim nomini bosing — mazmuni oçiladi</p>
        <AccTools />
      </div>
    </div>
  )
}
