'use client'

/* eslint-disable @next/next/no-img-element -- yetakçilar suratlari; CMS ulanganda next/image ga o'tadi */
import { useMemo, useState } from 'react'

import { IC } from '@/components/hududiy/team'

import { type Contacts, type Otm, type OtmType, TYPE_LABEL } from './data'

/** Aloqa şabloni: qiymat bölsa — faol havola, böş bölsa — xira joy (keyin töldiriladi) */
const SLOTS: Array<{ k: keyof Contacts; t: string; d: string; href: (v: string) => string }> = [
  { k: 'phone', t: 'Telefon', d: IC.phone, href: (v) => `tel:${v.replace(/[^+\d]/g, '')}` },
  { k: 'email', t: 'Elektron poçta', d: IC.mail, href: (v) => `mailto:${v}` },
  { k: 'telegram', t: 'Telegram', d: IC.Telegram, href: (v) => v },
  { k: 'instagram', t: 'Instagram', d: IC.Instagram, href: (v) => v },
  { k: 'facebook', t: 'Facebook', d: IC.Facebook, href: (v) => v },
]

function Reach({ c }: { c: Contacts }) {
  return (
    <ul className="bt-reach">
      {SLOTS.map(({ k, t, d, href }) => {
        const v = c[k].trim()
        const ic = (
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d={d} />
          </svg>
        )
        return (
          <li key={k}>
            {v ? (
              <a
                href={href(v)}
                title={`${t}: ${v}`}
                aria-label={`${t}: ${v}`}
                {...(k === 'phone' || k === 'email'
                  ? {}
                  : { target: '_blank', rel: 'noopener noreferrer' })}
              >
                {ic}
              </a>
            ) : (
              <span className="off" title={`${t} — tez orada`} aria-label={`${t} — tez orada`}>
                {ic}
              </span>
            )}
          </li>
        )
      })}
    </ul>
  )
}

/** F.I.Ş. uç qatorda: familiya / ism / ota ismi (öğli, qizi bilan birga) */
function nameLines(n: string): [string, string, string] {
  const w = n.split(' ')
  const tail = /^(öğli|qizi)$/.test(w[w.length - 1] ?? '') ? 2 : 1
  const last = w.slice(-tail).join(' ')
  return [w[0], w.slice(1, -tail).join(' '), last]
}

const FILTERS: Array<{ k: 'all' | OtmType; t: string }> = [
  { k: 'all', t: 'Barçasi' },
  { k: 'davlat', t: 'Davlat' },
  { k: 'xorijiy', t: 'Xorijiy filiallar' },
  { k: 'nodavlat', t: 'Nodavlat' },
]

const low = (s: string) => s.toLocaleLowerCase('uz')

/** VAQTINCHA: dizayn variantlari — a: katta kartalar, b: ixçam röyxat, c: portret galereyasi, d: OTT markazda */
export type View = 'a' | 'b' | 'c' | 'd'

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

/** Yetakçili OTT kartasi — tanlangan körinişda */
function Lead({ o, view }: { o: Otm; view: View }) {
  const L = o.leader!
  if (view === 'b')
    return (
      <article className="bt-row">
        <img className="bt-row-ph" src={L.img} alt={L.name} loading="lazy" />
        <div className="bt-row-txt">
          <h3>{L.name}</h3>
          <span title={o.otm}>{o.otm}</span>
        </div>
        <Reach c={L} />
      </article>
    )
  if (view === 'c')
    return (
      <article className="bt-tile">
        <div className="bt-tile-ph">
          <img src={L.img} alt={L.name} loading="lazy" />
        </div>
        <Name3 n={L.name} className="bt-tile-name" />
        <span className="bt-tile-otm" title={o.otm}>
          {o.otm}
        </span>
        <Reach c={L} />
      </article>
    )
  if (view === 'd')
    return (
      <article className="bt-org">
        <span className="bt-org-type">{TYPE_LABEL[o.type]}</span>
        <h3 className="bt-org-t">{o.otm}</h3>
        <div className="bt-org-lead">
          <img src={L.img} alt={L.name} loading="lazy" />
          <div>
            <small>Yoşlar yetakçisi</small>
            <b>{L.name}</b>
          </div>
        </div>
        <Reach c={L} />
      </article>
    )
  return (
    <article className="bt-card">
      <div className="bt-txt">
        <span className="bt-otm" title={o.otm}>
          {o.otm}
        </span>
        <Name3 n={L.name} className="bt-name" />
        <Reach c={L} />
      </div>
      <img className="bt-ph" src={L.img} alt={L.name} loading="lazy" />
    </article>
  )
}

/** Vakant OTT kartasi — tanlangan körinişda */
function Vac({ o, view }: { o: Otm; view: View }) {
  if (view === 'b')
    return (
      <article className="bt-row bt-row--vac">
        <Ghost className="bt-row-ph" />
        <div className="bt-row-txt">
          <h3>{o.otm}</h3>
          <span>{TYPE_LABEL[o.type]}</span>
        </div>
        <span className="bt-badge">Vakant</span>
      </article>
    )
  if (view === 'c')
    return (
      <article className="bt-tile bt-tile--vac">
        <div className="bt-tile-ph">
          <Ghost className="bt-tile-ghost" />
          <span className="bt-badge">Vakant</span>
        </div>
        <h3 className="bt-tile-name">{o.otm}</h3>
        <span className="bt-tile-otm">{TYPE_LABEL[o.type]}</span>
      </article>
    )
  if (view === 'd')
    return (
      <article className="bt-org bt-org--vac">
        <span className="bt-org-type">{TYPE_LABEL[o.type]}</span>
        <h3 className="bt-org-t">{o.otm}</h3>
        <div className="bt-org-lead">
          <Ghost className="bt-org-ghost" />
          <div>
            <small>Yoşlar yetakçisi</small>
            <span className="bt-badge">Vakant</span>
          </div>
        </div>
      </article>
    )
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
export function BtList({ otms, view = 'a' }: { otms: Otm[]; view?: View }) {
  const [type, setType] = useState<'all' | OtmType>('all')
  const [q, setQ] = useState('')

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
        <div className="bt-chips" role="group" aria-label="OTT turi">
          {FILTERS.map((f) => (
            <button
              key={f.k}
              type="button"
              className={type === f.k ? 'on' : undefined}
              aria-pressed={type === f.k}
              onClick={() => setType(f.k)}
            >
              {f.t}
              <span>{f.k === 'all' ? otms.length : otms.filter((o) => o.type === f.k).length}</span>
            </button>
          ))}
        </div>
        <label className="bt-search">
          <span className="sr-only">Qidiruv</span>
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="OTT yoki yetakçi nomi"
          />
        </label>
      </div>

      {led.length > 0 && (
        <div className={`bt-grid bt-grid--${view}`}>
          {led.map((o) => (
            <Lead key={o.otm} o={o} view={view} />
          ))}
        </div>
      )}

      {vac.length > 0 && (
        <>
          <h2 className="bt-vac-h">
            Vakant boşlanğiç taşkilotlar <span>{vac.length}</span>
          </h2>
          <div className={`bt-grid bt-grid--${view}`}>
            {vac.map((o) => (
              <Vac key={o.otm} o={o} view={view} />
            ))}
          </div>
        </>
      )}

      {list.length === 0 && <p className="bt-empty">Heç narsa topilmadi.</p>}
    </>
  )
}
