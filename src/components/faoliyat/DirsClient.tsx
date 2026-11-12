'use client'

import { type KeyboardEvent, type ReactNode, useRef, useState } from 'react'

import { DevVariantSwitch, useDevVariant } from '@/components/site/DevVariantSwitch'

/** VAQTINCHA: yönalişlar sahifasi variantlari — faqat faol variant çiziladi; production'da doim A */
const TITLES = ['Qatorlar', 'Vitrina', 'Tasmalar']

export function DirsSwitch({ a, b, c }: { a: ReactNode; b?: ReactNode; c?: ReactNode }) {
  const v = useDevVariant('vy', TITLES.length)
  return (
    <>
      {v === 'b' && b ? b : v === 'c' && c ? c : a}
      <DevVariantSwitch name="vy" label="Yönalişlar" titles={TITLES} />
    </>
  )
}

type Item = { slug: string; n: string; title: string; short: string }

/**
 * B — Vitrina: çapda nomlar (tablist), öngda tanlangan panel. Panellar serverda çizilgan,
 * körinmaydiganlari `hidden`. Klaviatura: ↑ ↓ (← →), Home, End.
 */
export function DirsShowcase({ items, panels }: { items: Item[]; panels: ReactNode[] }) {
  const [on, setOn] = useState(0)
  const tabs = useRef<Array<HTMLButtonElement | null>>([])
  const go = (i: number) => {
    const k = (i + items.length) % items.length
    setOn(k)
    tabs.current[k]?.focus()
  }
  const onKey = (e: KeyboardEvent) => {
    const map: Record<string, number> = { ArrowDown: on + 1, ArrowRight: on + 1, ArrowUp: on - 1, ArrowLeft: on - 1, Home: 0, End: items.length - 1 }
    if (e.key in map) {
      e.preventDefault()
      go(map[e.key])
    }
  }
  return (
    <div className="vys">
      <div className="vys-list" role="tablist" aria-label="Faoliyat yönalişlari" aria-orientation="vertical" onKeyDown={onKey}>
        {items.map((x, i) => (
          <button
            key={x.slug}
            ref={(el) => {
              tabs.current[i] = el
            }}
            type="button"
            role="tab"
            id={`vys-t-${x.slug}`}
            aria-selected={on === i}
            aria-controls={`vys-p-${x.slug}`}
            tabIndex={on === i ? 0 : -1}
            onClick={() => setOn(i)}
          >
            <span className="vys-tn">{x.n}</span>
            <span className="vys-tl">{x.title}</span>
            <span className="vys-ts">{x.short}</span>
          </button>
        ))}
      </div>
      <div className="vys-stage">
        {items.map((x, i) => (
          <div
            key={x.slug}
            role="tabpanel"
            id={`vys-p-${x.slug}`}
            aria-labelledby={`vys-t-${x.slug}`}
            hidden={on !== i}
          >
            {panels[i]}
          </div>
        ))}
      </div>
    </div>
  )
}
