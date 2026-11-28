'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'

import { useMiqdor } from '@/components/site/MiqdorProvider'
import { fmtK, type Miqdorlar, rateSum, som, stipK, type Rate } from '@/lib/miqdorlar'

/* ---------- ikonkalar (24×24, çiziqli) ---------- */
const P = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' } as const
const ICONS: Record<string, ReactNode> = {
  prezident: (
    <svg viewBox="0 0 24 24" {...P}>
      <path d="M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.4 6.8 19.1l1-5.8-4.3-4.1 5.9-.9z" />
    </svg>
  ),
  nomli: (
    <svg viewBox="0 0 24 24" {...P}>
      <circle cx="12" cy="9" r="5.5" />
      <path d="M8.6 13.3 7 21l5-2.6 5 2.6-1.6-7.7" />
      <path d="M12 6.5v5M9.5 9h5" />
    </svg>
  ),
  alo: (
    <svg viewBox="0 0 24 24" {...P}>
      <path d="M2.5 9 12 4.5 21.5 9 12 13.5z" />
      <path d="M6.5 11v4.5c1.5 1.6 3.4 2.4 5.5 2.4s4-.8 5.5-2.4V11" />
      <path d="M21.5 9v5" />
    </svg>
  ),
  baza: (
    <svg viewBox="0 0 24 24" {...P}>
      <rect x="3" y="6" width="18" height="13" rx="3" />
      <path d="M3 10h18M16 14.5h2" />
      <path d="M7 6V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1" />
    </svg>
  ),
  'vazir-b': (
    <svg viewBox="0 0 24 24" {...P}>
      <path d="M6 3v6a4 4 0 0 0 8 0V3" />
      <path d="M10 13v2a5 5 0 0 0 10 0v-2" />
      <circle cx="20" cy="11" r="2" />
    </svg>
  ),
  'vazir-m': (
    <svg viewBox="0 0 24 24" {...P}>
      <rect x="3" y="7" width="18" height="13" rx="2.5" />
      <path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7M12 10.5v6M9 13.5h6" />
    </svg>
  ),
  nogiron: (
    <svg viewBox="0 0 24 24" {...P}>
      <circle cx="11" cy="4.5" r="1.8" />
      <path d="M11 7.5v6h5l2 5" />
      <path d="M8 10.5a5.5 5.5 0 1 0 7.2 7.4" />
    </svg>
  ),
  yetim: (
    <svg viewBox="0 0 24 24" {...P}>
      <path d="M3.5 11 12 4l8.5 7" />
      <path d="M5.5 9.5V20h13V9.5" />
      <path d="M12 17.5s-3-1.8-3-3.8a1.7 1.7 0 0 1 3-1.1 1.7 1.7 0 0 1 3 1.1c0 2-3 3.8-3 3.8z" />
    </svg>
  ),
  qoshimcha: (
    <svg viewBox="0 0 24 24" {...P}>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4" />
      <path d="m6 6 2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6" />
    </svg>
  ),
  info: (
    <svg viewBox="0 0 24 24" {...P}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5M12 8h.01" />
    </svg>
  ),
}
const Icon = ({ n }: { n: string }) => <span className="sc-ic" aria-hidden="true">{ICONS[n]}</span>

/* ---------- maʼlumot va hisob ---------- */
type Opt = { id: string; t: string; short: string; r: Rate; extras: boolean }

/** Kalkulyatordagi stipendiya turlari: miqdorlar lib/miqdorlar.ts dagi BHM va bazaviy stipendiyaga bog'langan */
/** Kalkulyatordagi stipendiya turlari (koeffitsientlar admin paneldagi “Miqdorlar”dan) */
const opts = (STIP_K: ReturnType<typeof stipK>): Opt[] => [
  { id: 'prezident', t: 'Prezident davlat stipendiyasi', short: 'Prezident stipendiyasi', r: { base: 'stip', k: STIP_K.prezident }, extras: true },
  { id: 'nomli', t: 'Nomli davlat stipendiyalari', short: 'Nomli stipendiyalar', r: { base: 'stip', k: STIP_K.nomli }, extras: true },
  { id: 'alo', t: '“A’lo” baholarga o‘qiydigan talabalar', short: '“A’lo” baholar', r: { base: 'stip', k: STIP_K.alo }, extras: true },
  { id: 'baza', t: 'Bazaviy va qizlar uchun maxsus stipendiya', short: 'Bazaviy stipendiya', r: { base: 'stip', k: STIP_K.baza }, extras: true },
  { id: 'vazir-b', t: 'Sog‘liqni saqlash vaziri stipendiyasi — bakalavriat', short: 'Vazir stipendiyasi (bakalavriat)', r: { base: 'bhm', k: 3 }, extras: false },
  { id: 'vazir-m', t: 'Sog‘liqni saqlash vaziri stipendiyasi — magistratura', short: 'Vazir stipendiyasi (magistratura)', r: { base: 'bhm', k: 4 }, extras: false },
]

const baseLabel = (r: Rate, M: Miqdorlar) => (r.base === 'bhm' ? `BHM ${som(M.BHM.v)}` : `bazaviy stipendiya ${som(M.STIP_BAZA.v)}`)

function useCalc() {
  const M = useMiqdor()
  const OPTS = opts(stipK(M))
  const [id, setId] = useState('prezident')
  const [disabled, setDisabled] = useState(false)
  const [orphan, setOrphan] = useState(false)
  const [extra, setExtra] = useState(0)
  const o = OPTS.find((x) => x.id === id)!
  const main = rateSum(o.r, M)
  const orphanAdd = o.id === 'baza' && orphan ? Math.round(M.STIP_BAZA.v * 0.5) : 0
  const disAdd = o.extras && disabled ? Math.round(main * 0.5) : 0
  const extraAdd = o.extras ? Math.round((main * extra) / 100) : 0
  const parts = [
    { k: 'main', t: 'Asosiy miqdor', v: main, note: `${baseLabel(o.r, M)} × ${fmtK(o.r.k)}` },
    { k: 'yetim', t: 'Yetim talaba uchun ustama', v: orphanAdd },
    { k: 'nogiron', t: 'Nogironlik uchun ustama', v: disAdd },
    { k: 'qoshimcha', t: `Qo‘shimcha to‘lov (${extra} foiz)`, v: extraAdd },
  ].filter((p) => p.v > 0)
  const total = parts.reduce((a, p) => a + p.v, 0)
  return { o, id, setId, disabled, setDisabled, orphan, setOrphan, extra, setExtra, parts, total }
}
type Calc = ReturnType<typeof useCalc>

/** Summa özgarganda raqam silliq oşadi yoki kamayadi */
function useCount(target: number) {
  const [v, setV] = useState(target)
  const from = useRef(target)
  useEffect(() => {
    const start = from.current
    if (start === target || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      from.current = target
      setV(target)
      return
    }
    const t0 = performance.now()
    let raf = 0
    const step = (t: number) => {
      const p = Math.min(1, (t - t0) / 450)
      const e = 1 - Math.pow(1 - p, 3)
      const cur = Math.round(start + (target - start) * e)
      from.current = cur
      setV(cur)
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [target])
  return v
}

/* ---------- umumiy boşqaruv elementlari ---------- */
function Extras({ c }: { c: Calc }) {
  if (!c.o.extras)
    return (
      <p className="sc-noext">
        <Icon n="info" /> Vazir stipendiyasi qat’iy miqdorda to‘lanadi, ustamalar qo‘llanmaydi.
      </p>
    )
  return (
    <div className="sc-tg">
      <label className="sc-tog">
        <input type="checkbox" checked={c.disabled} onChange={(e) => c.setDisabled(e.target.checked)} />
        <Icon n="nogiron" />
        <span>
          1–2-guruh nogironligi <b>+50 foiz</b>
        </span>
      </label>
      {c.o.id === 'baza' && (
        <label className="sc-tog">
          <input type="checkbox" checked={c.orphan} onChange={(e) => c.setOrphan(e.target.checked)} />
          <Icon n="yetim" />
          <span>
            To‘liq davlat ta’minotidagi yetim talaba <b>+50 foiz</b>
          </span>
        </label>
      )}
      <label className="sc-sl">
        <span className="sc-sl-h">
          <Icon n="qoshimcha" />
          <span>Qo‘shimcha to‘lov: iqtidor, jamoat ishlaridagi faollik yoki ijtimoiy himoyaga muhtojlik</span>
          <b>{c.extra} foiz</b>
        </span>
        <input
          type="range"
          min={0}
          max={50}
          step={5}
          value={c.extra}
          onChange={(e) => c.setExtra(Number(e.target.value))}
          style={{ ['--p' as string]: `${c.extra * 2}%` }}
        />
        <span className="sc-sl-s">
          <span>0</span>
          <span>25</span>
          <span>50 foiz</span>
        </span>
      </label>
    </div>
  )
}

function Note() {
  const { BHM, STIP_BAZA } = useMiqdor()
  return (
    <p className="sc-note">
      Hisob asosi: bazaviy stipendiya {som(STIP_BAZA.v)}, BHM {som(BHM.v)} ({STIP_BAZA.from}dan). Stipendiya normativ hujjatlar
      asosida oliy ta’lim tashkiloti tomonidan hisoblanadi.{' '}
      <a href={STIP_BAZA.url} target="_blank" rel="noopener noreferrer">
        Manba: {STIP_BAZA.source}
      </a>
    </p>
  )
}

/* ---------- ikonkali plitkalar va tarkib çizğisi ---------- */
function Calculator({ c }: { c: Calc }) {
  const M = useMiqdor()
  const OPTS = opts(stipK(M))
  const total = useCount(c.total)
  const cmpMax = Math.max(c.total, ...OPTS.map((x) => rateSum(x.r, M)))
  return (
    <div className="sc-a">
      <div className="sc-a-form">
        <h2 className="sc-h">Stipendiya kalkulyatori</h2>
        <div className="sc-a-tiles" role="radiogroup" aria-label="Stipendiya turi">
          {OPTS.map((x) => (
            <button key={x.id} type="button" role="radio" aria-checked={c.id === x.id} className="sc-a-tile" onClick={() => c.setId(x.id)}>
              <Icon n={x.id} />
              <span className="sc-a-t">{x.t}</span>
              <span className="sc-a-k">
                {x.r.base === 'bhm' ? 'BHM' : 'bazaviy'} × {fmtK(x.r.k)}
              </span>
            </button>
          ))}
        </div>
        <Extras c={c} />
      </div>
      <div className="sc-a-res" aria-live="polite">
        <small>Oylik miqdor</small>
        <b className="sc-sum">{som(total)}</b>
        <div className="sc-a-bar" aria-hidden="true">
          {c.parts.map((p) => (
            <span key={p.k} className={`sc-a-seg sc-seg-${p.k}`} style={{ flexGrow: p.v }} />
          ))}
        </div>
        <ul className="sc-a-rows">
          {c.parts.map((p) => (
            <li key={p.k}>
              <i className={`sc-dot sc-seg-${p.k}`} />
              <span>
                {p.t}
                {p.note && <small>{p.note}</small>}
              </span>
              <b>{som(p.v)}</b>
            </li>
          ))}
        </ul>
        <div className="sc-a-x">
          <b>{fmtK(c.o.r.k)}×</b>
          <span>
            {c.o.r.base === 'bhm' ? 'bazaviy hisoblash miqdori (BHM)' : 'bazaviy stipendiya'}ga nisbatan necha barobar ekani; asosiy miqdor —{' '}
            {som(c.o.r.base === 'bhm' ? M.BHM.v : M.STIP_BAZA.v)}
          </span>
        </div>
        <div className="sc-a-cmp">
          <small>Stipendiyalar miqdorini taqqoslash</small>
          <ul>
            {OPTS.map((x) => {
              const v = x.id === c.id ? c.total : rateSum(x.r, M)
              return (
                <li key={x.id} className={x.id === c.id ? 'on' : undefined}>
                  <span>{x.short}</span>
                  <i style={{ width: `${(v / cmpMax) * 100}%` }} />
                  <b>{som(v)}</b>
                </li>
              )
            })}
          </ul>
        </div>
        <Note />
      </div>
    </div>
  )
}

/**
 * Stipendiya kalkulyatori. Ustamalar Taʼlim va ilm-fan vazirligining stipendiya miqdorlari jadvali asosida:
 * 1–2-guruh nogironligi uçun 50 foiz, iqtidor, jamoat işlaridagi faollik yoki ijtimoiy himoyaga muhtojlik uçun 50 foizgaça,
 * yetim talabalar uçun bazaviy miqdorga 50 foiz.
 */
export function StipendCalc() {
  const c = useCalc()
  return (
    <section className="sc" aria-label="Stipendiya kalkulyatori">
      <Calculator c={c} />
    </section>
  )
}
