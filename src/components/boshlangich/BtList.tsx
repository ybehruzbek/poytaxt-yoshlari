'use client'

/* eslint-disable @next/next/no-img-element -- yetakçilar suratlari; CMS ulanganda next/image ga o'tadi */
import Link from 'next/link'
import { useMemo, useState } from 'react'

/** Dastlab körinadigan yetakçilar soni (3 ustunda 4 qator); qolgani “Yana körsatiş” bilan */
const STEP = 12

import { type Otm, type OtmType, TYPE_LABEL } from './data'

/** F.I.Ş. uç qatorda: familiya / ism / ota ismi (öğli, qizi bilan birga) */
function nameLines(n: string): [string, string, string] {
  const w = n.split(' ')
  const tail = /^(öğli|qizi)$/.test(w[w.length - 1] ?? '') ? 2 : 1
  const last = w.slice(-tail).join(' ')
  return [w[0], w.slice(1, -tail).join(' '), last]
}

const FILTERS: Array<{ k: 'all' | OtmType; t: string }> = [
  { k: 'all', t: 'Barçasi' },
  { k: 'davlat', t: 'Davlat oliy taʼlim taşkilotlari' },
  { k: 'xorijiy', t: 'Xorijiy oliy taʼlim taşkilotlarining filiallari' },
  { k: 'nodavlat', t: 'Nodavlat oliy taʼlim taşkilotlari' },
]

const low = (s: string) => s.toLocaleLowerCase('uz')

const Ghost = ({ className }: { className: string }) => (
  <svg className={className} viewBox="0 0 120 150" aria-hidden="true">
    <circle cx="60" cy="48" r="28" />
    <path d="M8 150c0-34 23-58 52-58s52 24 52 58z" />
  </svg>
)

function Name3({ n, className }: { n: string; className: string }) {
  const [a, b, c] = nameLines(n)
  return (
    <h3 className={className}>
      <span>{a}</span> <span>{b}</span> <span>{c}</span>
    </h3>
  )
}

const More = () => (
  <span className="bt-more">
    Batafsil <span aria-hidden="true">→</span>
  </span>
)

/** Yetakçili OTT kartasi — butun karta yetakçi sahifasiga olib boradi */
function Lead({ o, base }: { o: Otm; base: string }) {
  const L = o.leader!
  return (
    <Link href={`${base}/${L.slug}`} className="bt-card">
      <div className="bt-txt">
        <span className="bt-otm" title={o.otm}>
          {o.otm}
        </span>
        <Name3 n={L.name} className="bt-name" />
        {L.role && (
          <p className="bt-lrole" title={L.role}>
            {L.role}
          </p>
        )}
        <More />
      </div>
      <img className="bt-ph" src={L.img} alt={L.name} loading="lazy" />
    </Link>
  )
}

/** Vakant OTT kartasi */
function Vac({ o }: { o: Otm }) {
  return (
    <article className="bt-card bt-vac">
      <div className="bt-txt">
        <span className="bt-type">{TYPE_LABEL[o.type]}</span>
        <h3 className="bt-vac-otm">{o.otm}</h3>
        <span className="bt-badge">Vakant</span>
        <p className="bt-role">Yoşlar yetakçisi lavozimi böş</p>
      </div>
      <Ghost className="bt-ghost" />
    </article>
  )
}

/** Saralaş (OTT turi) va qidiruv bilan kartalar: avval yetakçili OTTlar, oxirida vakantlar */
export function BtList({ otms, base }: { otms: Otm[]; base: string }) {
  const [type, setType] = useState<'all' | OtmType>('all')
  const [q, setQ] = useState('')
  const [shown, setShown] = useState(STEP)

  const list = useMemo(() => {
    const s = low(q.trim())
    return otms.filter(
      (o) =>
        (type === 'all' || o.type === type) &&
        (!s || low(o.otm).includes(s) || (o.leader && low(o.leader.name).includes(s))),
    )
  }, [otms, type, q])
  const led = list.filter((o) => o.leader)
  const vac = list.filter((o) => !o.leader)

  return (
    <>
      <div className="bt-tools">
        <div className="bt-chips" role="group" aria-label="Oliy taʼlim taşkiloti turi">
          {FILTERS.map((f) => (
            <button
              key={f.k}
              type="button"
              className={type === f.k ? 'on' : undefined}
              aria-pressed={type === f.k}
              onClick={() => {
                setType(f.k)
                setShown(STEP)
              }}
            >
              {f.t}
              <span>{f.k === 'all' ? otms.length : otms.filter((o) => o.type === f.k).length}</span>
            </button>
          ))}
        </div>
        <label className="bt-search">
          <span className="sr-only">Qidiruv</span>
          <svg className="bt-search-ic" viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-4-4" />
          </svg>
          <input
            type="search"
            value={q}
            onChange={(e) => {
              setQ(e.target.value)
              setShown(STEP)
            }}
            placeholder="Qidiruv: oliy taʼlim taşkiloti nomi yoki yetakçi F.I.Ş."
          />
        </label>
      </div>

      {led.length > 0 && (
        <div className="bt-grid">
          {led.slice(0, shown).map((o) => (
            <Lead key={o.otm} o={o} base={base} />
          ))}
        </div>
      )}
      {led.length > shown && (
        <div className="bt-more-row">
          <button type="button" className="btn btn-outline" onClick={() => setShown(led.length)}>
            Yana {led.length - shown} ta yetakçini körsatiş
            <span className="ic" aria-hidden="true">
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </span>
          </button>
        </div>
      )}

      {vac.length > 0 && (
        <>
          <h2 className="bt-vac-h">
            Vakant boşlanğiç taşkilotlar <span>{vac.length}</span>
          </h2>
          <div className="bt-grid">
            {vac.map((o) => (
              <Vac key={o.otm} o={o} />
            ))}
          </div>
        </>
      )}

      {list.length === 0 && <p className="bt-empty">Heç narsa topilmadi.</p>}
    </>
  )
}
