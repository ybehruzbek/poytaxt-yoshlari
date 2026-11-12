'use client'

/* eslint-disable @next/next/no-img-element -- yetakçilar suratlari; CMS ulanganda next/image ga o'tadi */
import Link from 'next/link'
import { useEffect, useMemo, useRef, useState } from 'react'

/** Bir martada körinadigan yetakçilar soni (3 ustunda 4 qator); qolgani pastga aylantirganda yuklanadi */
const STEP = 12

import { type Otm, type OtmType, TYPE_LABEL } from './data'
import { More } from '@/components/site/MoreBtn'

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

/** Yetakçili OTT kartasi — butun karta yetakçi sahifasiga olib boradi */
function Lead({ o, base, i }: { o: Otm; base: string; i: number }) {
  const L = o.leader!
  // keyin yuklangan kartalar ekranga kirganda köterilib çiqadi (BtList dagi kuzatuvçi)
  return (
    <Link href={`${base}/${L.slug}`} className={i >= STEP ? 'bt-card bt-late' : 'bt-card'}>
      <div className="bt-txt">
        <span className="bt-otm" title={o.otm}>
          {o.otm}
        </span>
        <Name3 n={L.name} className="bt-name" />
        <span className="more-btn">
          <More />
        </span>
      </div>
      <img className="bt-ph" src={L.img} alt={L.name} loading="lazy" />
    </Link>
  )
}

/** Vakant OTT kartasi */
function Vac({ o }: { o: Otm }) {
  return (
    <article className="bt-card bt-vac bt-late">
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
  const more = led.length > shown

  // röyxat oxiridagi belgi ekranga yaqinlaşganda keyingi 12 ta yetakçi qöşiladi
  const sentinel = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = sentinel.current
    if (!el || !more) return
    const io = new IntersectionObserver((e) => e[0].isIntersecting && setShown((n) => n + STEP), {
      rootMargin: '0px 0px 600px 0px',
    })
    io.observe(el)
    return () => io.disconnect()
  }, [more, shown])

  // keyin qöşilgan kartalar (yetakçilar va vakantlar) ekranga kirgan sari navbat bilan çiqadi
  const root = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const cards = root.current?.querySelectorAll<HTMLElement>('.bt-late:not(.bt-seen)')
    if (!cards?.length) return
    const io = new IntersectionObserver(
      (ents) => {
        ents
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) =>
              a.boundingClientRect.top - b.boundingClientRect.top ||
              a.boundingClientRect.left - b.boundingClientRect.left,
          )
          .forEach((e, k) => {
            const el = e.target as HTMLElement
            el.style.setProperty('--k', String(Math.min(k, 6)))
            el.classList.add('bt-seen')
            io.unobserve(el)
          })
      },
      { rootMargin: '0px 0px -6% 0px' },
    )
    cards.forEach((c) => io.observe(c))
    return () => io.disconnect()
  }, [shown, type, q, more])

  return (
    <div ref={root}>
      <div className="bt-tools">
        <div className="chips bt-chips" role="group" aria-label="Oliy taʼlim taşkiloti turi">
          {FILTERS.map((f) => (
            <button
              key={f.k}
              type="button"
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
          {led.slice(0, shown).map((o, i) => (
            <Lead key={o.otm} o={o} base={base} i={i} />
          ))}
        </div>
      )}
      {more && (
        <div ref={sentinel} className="bt-loading" role="status">
          <span className="bt-spin" aria-hidden="true" />
          Yuklanmoqda…
        </div>
      )}

      {!more && vac.length > 0 && (
        <>
          <h2 className="bt-vac-h">
            Yetakçi lavozimi vakant bölgan oliy taʼlim taşkilotlari <span>{vac.length}</span>
          </h2>
          <div className="bt-grid">
            {vac.map((o) => (
              <Vac key={o.otm} o={o} />
            ))}
          </div>
        </>
      )}

      {list.length === 0 && <p className="bt-empty">Heç narsa topilmadi.</p>}
    </div>
  )
}
