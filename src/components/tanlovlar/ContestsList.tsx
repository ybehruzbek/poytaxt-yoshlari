'use client'

/* eslint-disable @next/next/no-img-element -- ötgan tanlovlar suratlari */
import { useMemo, useState } from 'react'

import { More } from '@/components/site/MoreBtn'
import { MoreToggle } from '@/components/site/MoreToggle'
import { nbsp } from '@/lib/nbsp'
import { daysTo, deadlineLabel } from '@/lib/opps'

import { CONTEST_CATS, type Contest, type ContestCat } from './data'

const catTitle = (c: ContestCat) => CONTEST_CATS.find((x) => x.key === c)!.t
const isOpen = (s: Contest) => !!s.deadline && (daysTo(s.deadline) ?? 0) > 0
/** tanlov bosqiçlari hozir davom etmoqdami */
const isRunning = (s: Contest) =>
  !!s.window && (daysTo(s.window[0]) ?? 1) <= 0 && (daysTo(s.window[1]) ?? 0) >= 0
const rank = (s: Contest) => (isOpen(s) ? 2 : isRunning(s) ? 1 : 0)

/** Holat yorliği: ariza qabuli, davom etayotgan bosqiçlar yoki navbatdagi tanlov */
function Status({ s }: { s: Contest }) {
  const d = daysTo(s.deadline ?? null)
  if (s.deadline && d !== null && d > 0)
    return (
      <span className="gr-st gr-st-open">
        Ariza qabul qilinmoqda · {deadlineLabel(s.deadline)}gaça{d <= 30 ? ` · ${d} kun qoldi` : ''}
      </span>
    )
  if (isRunning(s)) return <span className="gr-st gr-st-open">Tanlov bosqiçlari davom etmoqda</span>
  return <span className="gr-st">Navbatdagi tanlov kutilmoqda</span>
}

/** Karta tuzilişi Grantlar sahifasi bilan bir xil (grantlar.css): bir qatordagi kartalarning qismlari bir çiziqda turadi */
function Card({ s }: { s: Contest }) {
  return (
    <li className={`gr-card tn-${s.cat}`}>
      <div className="gr-ph">
        {s.img ? (
          <img src={s.img} alt="" loading="lazy" />
        ) : (
          <div className="gr-ph-t">
            <small>{s.badge.l}</small>
            <b>{nbsp(s.badge.v)}</b>
          </div>
        )}
        <span className="gr-cat">{catTitle(s.cat)}</span>
      </div>
      <div className="gr-bd">
        <Status s={s} />
        <h3>{nbsp(s.t)}</h3>
        <p className="gr-org">{s.org}</p>
        <dl>
          <div>
            <dt>Kimlar uçun</dt>
            <dd>{nbsp(s.who)}</dd>
          </div>
          <div>
            <dt>Mukofot va imtiyozlar</dt>
            <dd>{nbsp(s.prize)}</dd>
          </div>
          <div>
            <dt>Ötkaziliş tartibi</dt>
            <dd>{nbsp(s.cycle)}</dd>
          </div>
        </dl>
        <p className="gr-text">{nbsp(s.text)}</p>
        <div className="gr-ft">
          <a className="more-btn" href={s.url} target="_blank" rel="noopener noreferrer">
            <More />
          </a>
          <small>Manba: {s.source}</small>
        </div>
      </div>
    </li>
  )
}

const STEP = 6
const catIdx = (c: ContestCat) => CONTEST_CATS.findIndex((x) => x.key === c)

/**
 * Tanlovlar röyxati: avval arizasi qabul qilinayotganlar, keyin bosqiçlari davom etayotganlar, söngra qolganlari soha tartibida.
 * Dastlab 6 ta karta, qolganlari “Köproq körsatiş / Yiğiş” bilan oçiladi; guruh tanlansa röyxat yana 6 tadan boşlanadi.
 */
export function ContestsList({ contests: CONTESTS }: { contests: Contest[] }) {
  const [cat, setCat] = useState<ContestCat | 'all'>('all')
  const [limit, setLimit] = useState(STEP)
  const list = useMemo(
    () =>
      CONTESTS.map((s, i) => ({ s, i }))
        .filter(({ s }) => cat === 'all' || s.cat === cat)
        .sort((a, b) => rank(b.s) - rank(a.s) || catIdx(a.s.cat) - catIdx(b.s.cat) || a.i - b.i)
        .map(({ s }) => s),
    [cat, CONTESTS],
  )
  const pick = (c: ContestCat | 'all') => {
    setCat(c)
    setLimit(STEP)
  }
  return (
    <>
      <div className="chips gr-chips" role="group" aria-label="Tanlov sohasi">
        <button type="button" aria-pressed={cat === 'all'} onClick={() => pick('all')}>
          Barçasi <span>{CONTESTS.length}</span>
        </button>
        {CONTEST_CATS.map((c) => (
          <button
            key={c.key}
            type="button"
            aria-pressed={cat === c.key}
            onClick={() => pick(c.key)}
          >
            {c.t} <span>{CONTESTS.filter((s) => s.cat === c.key).length}</span>
          </button>
        ))}
      </div>
      <ul className="gr-list" id="tanlovlar-royxat">
        {list.slice(0, limit).map((s) => (
          <Card key={s.id} s={s} />
        ))}
      </ul>
      {list.length > STEP && (
        <MoreToggle
          rest={Math.max(list.length - limit, 0)}
          noun="tanlov"
          onMore={() => setLimit((l) => l + STEP)}
          onLess={() => {
            setLimit(STEP)
            document
              .getElementById('tanlovlar-royxat')
              ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }}
        />
      )}
    </>
  )
}
