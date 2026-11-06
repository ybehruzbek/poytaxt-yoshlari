import type { ReactNode } from 'react'

import { AccTools } from './AccTools'

export type AccMeta = { id: string; title: string; sub: string; g: string }

/** Guruh sarlavhasi (faqat «guruhlar» körinişida çiqadi) */
export function AccGroup({ label }: { label: string }) {
  return (
    <div className="acc-grp">
      <div className="wrap">
        <h2>{label}</h2>
      </div>
    </div>
  )
}

/** Akkordeon bölimi: nomi va qisqa izohi; bosilganda bölim mazmuni oçiladi */
export function Acc({ meta, n, open, children }: { meta: AccMeta; n: number; open?: boolean; children: ReactNode }) {
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
