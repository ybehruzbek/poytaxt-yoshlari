'use client'

import { useState } from 'react'

import { More } from '@/components/site/MoreBtn'
import { MoreToggle } from '@/components/site/MoreToggle'
import { nbsp } from '@/lib/nbsp'

import { BENEFIT_ICONS } from './BenefitCalc'
import { BENEFIT_CATS, type Benefit, type BenefitCat } from './data'
import { smoothScroll } from '@/lib/scroll'

const catTitle = (c: BenefitCat) => BENEFIT_CATS.find((x) => x.key === c)!.t

function Card({ b }: { b: Benefit }) {
  return (
    <li className={`gr-card im-${b.cat}`}>
      <div className="gr-ph">
        <div className="gr-ph-t">
          <span className="im-ic" aria-hidden="true">
            {BENEFIT_ICONS[b.icon]}
          </span>
          <small>{b.badge.l}</small>
          <b>{nbsp(b.badge.v)}</b>
        </div>
        <span className="gr-cat">{catTitle(b.cat)}</span>
      </div>
      <div className="gr-bd">
        {b.from ? (
          <span className="gr-st gr-st-note">{b.from} kuçga kiradi</span>
        ) : (
          <span className="gr-st gr-st-open">Amalda</span>
        )}
        <h3>{nbsp(b.t)}</h3>
        <p className="gr-org">
          <span>Huquqiy asos:</span> {nbsp(b.basis)}
        </p>
        <dl>
          <div>
            <dt>Kimlar uçun</dt>
            <dd>{nbsp(b.who)}</dd>
          </div>
          <div>
            <dt>Miqdori</dt>
            <dd>{nbsp(b.amount)}</dd>
          </div>
          <div>
            <dt>Rasmiylaştiriş tartibi</dt>
            <dd>{nbsp(b.how)}</dd>
          </div>
        </dl>
        <span className="im-gap" />
        <div className="gr-ft">
          <a className="more-btn" href={b.url} target="_blank" rel="noopener noreferrer">
            <More />
          </a>
          <small>Manba: {b.source}</small>
        </div>
      </div>
    </li>
  )
}

const STEP = 6

/** Imtiyozlar röyxati: guruhlar böyiça saralanadi; dastlab 6 ta karta, qolganlari “Köproq körsatiş / Yiğiş” bilan oçiladi */
export function BenefitsList({ benefits: BENEFITS }: { benefits: Benefit[] }) {
  const [cat, setCat] = useState<BenefitCat | 'all'>('all')
  const [limit, setLimit] = useState(STEP)
  const list = BENEFITS.filter((b) => cat === 'all' || b.cat === cat)
  const pick = (c: BenefitCat | 'all') => {
    setCat(c)
    setLimit(STEP)
  }
  return (
    <>
      <h2 className="sc-h im-h">Imtiyozlar röyxati</h2>
      <div className="chips gr-chips" role="group" aria-label="Imtiyoz oluvçilar">
        <button type="button" aria-pressed={cat === 'all'} onClick={() => pick('all')}>
          Barçasi <span>{BENEFITS.length}</span>
        </button>
        {BENEFIT_CATS.map((c) => (
          <button
            key={c.key}
            type="button"
            aria-pressed={cat === c.key}
            onClick={() => pick(c.key)}
          >
            {c.t} <span>{BENEFITS.filter((b) => b.cat === c.key).length}</span>
          </button>
        ))}
      </div>
      <ul className="gr-list" id="imtiyozlar-royxat">
        {list.slice(0, limit).map((b) => (
          <Card key={b.id} b={b} />
        ))}
      </ul>
      {list.length > STEP && (
        <MoreToggle
          rest={Math.max(list.length - limit, 0)}
          noun="imtiyoz"
          onMore={() => setLimit((l) => l + STEP)}
          onLess={() => {
            setLimit(STEP)
            smoothScroll(document.getElementById('imtiyozlar-royxat'), { block: 'start' })
          }}
        />
      )}
    </>
  )
}
