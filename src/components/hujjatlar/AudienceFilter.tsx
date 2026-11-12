'use client'

import { useState } from 'react'

import { DocsB } from './ActCards'
import { type Act, type Aud, AUDIENCES } from './data'

/**
 * “Yoşlarga yaratilgan imkoniyatlar” — yoşlar qatlami böyiça saralaş: “Barçasi” va har qatlam
 * (talabalar, yoş oilalar, qizlar…) tugmasi; tanlanganida faqat şu qatlamga tegişli hujjatlar qoladi.
 */
const key = (y?: string) => (y ? y.split('.').reverse().join('') : '')

export function AudienceFilter({ acts: all, locale }: { acts: Act[]; locale: string }) {
  const [on, setOn] = useState<Aud | ''>('')
  // eng yangi hujjatlar tepada
  const acts = [...all].sort((a, b) => key(b.y).localeCompare(key(a.y)))
  const used = AUDIENCES.filter((a) => acts.some((x) => x.for?.includes(a.k)))
  const list = on ? acts.filter((x) => x.for?.includes(on)) : acts
  return (
    <>
      <div className="chips nd-aud" role="group" aria-label="Kimga tegişli">
        <span className="nd-aud-l">Kimga tegişli:</span>
        <button type="button" aria-pressed={!on} onClick={() => setOn('')}>
          Barçasi <b>{acts.length}</b>
        </button>
        {used.map((a) => (
          <button key={a.k} type="button" aria-pressed={on === a.k} onClick={() => setOn(a.k)}>
            {a.t} <b>{acts.filter((x) => x.for?.includes(a.k)).length}</b>
          </button>
        ))}
      </div>
      {/* saralaş özgarganda röyxat yana boşidan (8 ta) körinadi */}
      <DocsB key={on} acts={list} locale={locale} />
    </>
  )
}
