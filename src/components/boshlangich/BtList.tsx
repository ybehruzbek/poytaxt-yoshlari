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

/** Saralaş (OTM turi) va qidiruv bilan kartalar: avval yetakçili OTMlar, oxirida vakantlar */
export function BtList({ otms }: { otms: Otm[] }) {
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
        <div className="bt-chips" role="group" aria-label="OTM turi">
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
            placeholder="OTM yoki yetakçi nomi"
          />
        </label>
      </div>

      {led.length > 0 && (
        <div className="bt-grid">
          {led.map((o) => {
            const L = o.leader!
            const [a, b, c] = nameLines(L.name)
            return (
              <article key={o.otm} className="bt-card">
                <div className="bt-txt">
                  <span className="bt-otm" title={o.otm}>
                    {o.otm}
                  </span>
                  <h3 className="bt-name">
                    <span>{a}</span> <span>{b}</span> <span>{c}</span>
                  </h3>
                  <Reach c={L} />
                </div>
                <img className="bt-ph" src={L.img} alt={L.name} loading="lazy" />
              </article>
            )
          })}
        </div>
      )}

      {vac.length > 0 && (
        <>
          <h2 className="bt-vac-h">
            Vakant boşlanğiç taşkilotlar <span>{vac.length}</span>
          </h2>
          <div className="bt-grid">
            {vac.map((o) => (
              <article key={o.otm} className="bt-card bt-vac">
                <div className="bt-txt">
                  <span className="bt-type">{TYPE_LABEL[o.type]}</span>
                  <h3 className="bt-vac-otm">{o.otm}</h3>
                  <span className="bt-badge">Vakant</span>
                  <p className="bt-role">Yoşlar yetakçisi lavozimi böş</p>
                </div>
                <svg className="bt-ghost" viewBox="0 0 120 150" aria-hidden="true">
                  <circle cx="60" cy="48" r="28" />
                  <path d="M8 150c0-34 23-58 52-58s52 24 52 58z" />
                </svg>
              </article>
            ))}
          </div>
        </>
      )}

      {list.length === 0 && <p className="bt-empty">Heç narsa topilmadi.</p>}
    </>
  )
}
