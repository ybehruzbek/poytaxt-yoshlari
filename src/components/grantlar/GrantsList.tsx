'use client'

/* eslint-disable @next/next/no-img-element -- manba saytlaridan olingan suratlar */
import { useMemo, useState } from 'react'

import { More } from '@/components/site/MoreBtn'
import { MoreToggle } from '@/components/site/MoreToggle'
import { nbsp } from '@/lib/nbsp'
import { daysTo, deadlineLabel } from '@/lib/opps'

import {
  GRANT_CATS,
  GRANT_ORIGINS,
  type Grant,
  type GrantCat,
  type GrantOrigin,
} from './data'
import { smoothScroll } from '@/lib/scroll'

const catTitle = (c: GrantCat) => GRANT_CATS.find((x) => x.key === c)!.t

/** Holat yorliği: qabul muddati, takrorlaniş tartibi yoki maxsus holat */
function Status({ g }: { g: Grant }) {
  if (g.note) return <span className="gr-st gr-st-note">{g.note}</span>
  const d = daysTo(g.deadline ?? null)
  if (g.deadline && d !== null && d > 0)
    return (
      <span className="gr-st gr-st-open">
        Qabul davom etmoqda · {deadlineLabel(g.deadline)}gaça{d <= 30 ? ` · ${d} kun qoldi` : ''}
      </span>
    )
  if (/^Doimiy/.test(g.cycle)) return <span className="gr-st gr-st-open">Doimiy qabul</span>
  if (/eʼlon qilingan$/.test(g.cycle))
    return <span className="gr-st gr-st-open">Tanlov eʼlon qilingan</span>
  return <span className="gr-st">Navbatdagi tanlov kutilmoqda</span>
}

function Card({ g }: { g: Grant }) {
  return (
    <li className={`gr-card gr-${g.cat}`}>
      <div className="gr-ph">
        {g.img ? (
          <img src={g.img} alt="" loading="lazy" />
        ) : (
          <div className="gr-ph-t">
            <small>Grant miqdori</small>
            <b>{nbsp(g.amount)}</b>
          </div>
        )}
        <span className="gr-cat">{catTitle(g.cat)}</span>
      </div>
      <div className="gr-bd">
        <Status g={g} />
        <h3>{nbsp(g.t)}</h3>
        <p className="gr-org">{g.org}</p>
        <dl>
          <div>
            <dt>Grant miqdori</dt>
            <dd>{nbsp(g.amount)}</dd>
          </div>
          <div>
            <dt>Kimlar uçun</dt>
            <dd>{nbsp(g.who)}</dd>
          </div>
          <div>
            <dt>Ötkaziliş tartibi</dt>
            <dd>{nbsp(g.cycle)}</dd>
          </div>
        </dl>
        <p className="gr-text">{nbsp(g.text)}</p>
        <div className="gr-ft">
          <a className="more-btn" href={g.url} target="_blank" rel="noopener noreferrer">
            <More />
          </a>
          <small>Manba: {g.source}</small>
        </div>
      </div>
    </li>
  )
}

const STEP = 6
const isOpen = (g: Grant) => !!g.deadline && (daysTo(g.deadline) ?? 0) > 0
const catIdx = (c: GrantCat) => GRANT_CATS.findIndex((x) => x.key === c)

/**
 * Grantlar röyxati: avval qabuli davom etayotganlar (muddati yaqinroği oldinda), keyin qolganlari soha tartibida.
 * Dastlab 6 ta karta, qolganlari “Köproq körsatiş / Yiğiş” bilan oçiladi; soha tanlansa röyxat yana 6 tadan boşlanadi.
 */
export function GrantsList({ grants: GRANTS }: { grants: Grant[] }) {
  const [cat, setCat] = useState<GrantCat | 'all'>('all')
  const [origin, setOrigin] = useState<GrantOrigin | 'all'>('all')
  const byOrigin = GRANTS.filter((g) => origin === 'all' || (g.origin ?? 'mahalliy') === origin)
  const [limit, setLimit] = useState(STEP)
  const list = useMemo(
    () =>
      byOrigin
        .filter((g) => cat === 'all' || g.cat === cat)
        .sort((a, b) => {
          const o = Number(isOpen(b)) - Number(isOpen(a))
          if (o) return o
          if (isOpen(a) && isOpen(b)) return a.deadline!.localeCompare(b.deadline!)
          return catIdx(a.cat) - catIdx(b.cat)
        }),
    [cat, byOrigin],
  )
  const pick = (c: GrantCat | 'all') => {
    setCat(c)
    setLimit(STEP)
  }
  return (
    <>
      <div className="gr-origin" role="group" aria-label="Grant beruvçi">
        {[{ key: 'all' as const, t: 'Barça grantlar' }, ...GRANT_ORIGINS].map((o) => (
          <button
            key={o.key}
            type="button"
            aria-pressed={origin === o.key}
            onClick={() => {
              setOrigin(o.key)
              setCat('all')
              setLimit(STEP)
            }}
          >
            {o.t}{' '}
            <span>
              {o.key === 'all'
                ? GRANTS.length
                : GRANTS.filter((g) => (g.origin ?? 'mahalliy') === o.key).length}
            </span>
          </button>
        ))}
      </div>
      <div className="chips gr-chips" role="group" aria-label="Grant sohasi">
        <button type="button" aria-pressed={cat === 'all'} onClick={() => pick('all')}>
          Barçasi <span>{byOrigin.length}</span>
        </button>
        {GRANT_CATS.filter((c) => byOrigin.some((g) => g.cat === c.key)).map((c) => (
          <button
            key={c.key}
            type="button"
            aria-pressed={cat === c.key}
            onClick={() => pick(c.key)}
          >
            {c.t} <span>{byOrigin.filter((g) => g.cat === c.key).length}</span>
          </button>
        ))}
      </div>
      <ul className="gr-list" id="grantlar-royxat">
        {list.slice(0, limit).map((g) => (
          <Card key={g.id} g={g} />
        ))}
      </ul>
      {list.length > STEP && (
        <MoreToggle
          rest={Math.max(list.length - limit, 0)}
          noun="grant"
          onMore={() => setLimit((l) => l + STEP)}
          onLess={() => {
            setLimit(STEP)
            smoothScroll(document.getElementById('grantlar-royxat'), { block: 'start' })
          }}
        />
      )}
    </>
  )
}
