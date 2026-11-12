/* eslint-disable @next/next/no-img-element -- rasmlar Payload'dan tayyor ölçamda keladi */
import { useState } from 'react'

import { More } from '@/components/site/MoreBtn'

import type { YnItem } from './data'

/** Turkum yorliği (rangli kapsula) */
export function Chip({ it }: { it: YnItem }) {
  return <span className={`yn-chip ${it.tone}`}>{it.categoryLabel}</span>
}

/** Rasm: bölmasa — jigarrang fon */
export function Img({ it, className = '' }: { it: YnItem; className?: string }) {
  return (
    <div className={`yn-img ${className}`}>
      {it.image ? <img src={it.image} alt={it.imageAlt} loading="lazy" decoding="async" /> : null}
    </div>
  )
}

/** Vaqt yozuvi: “Bugun, 10:00” yoki “5-noyabr, 10:00” */
export function When({ it, className = 'yn-when' }: { it: YnItem; className?: string }) {
  return (
    <time className={className} dateTime={it.dateISO}>
      {it.rel}, {it.time}
    </time>
  )
}

/** Kun yozuvi (vaqtsiz): “Bugun”, “Keça”, “5-noyabr” */
export function Day({ it, className = 'yn-when' }: { it: YnItem; className?: string }) {
  return (
    <time className={className} dateTime={it.dateISO}>
      {it.rel}
    </time>
  )
}

export type YnCat = 'all' | YnItem['category']

/** Turkum böyiça saralaş: tanlangan turkum va saralangan röyxat */
export function useRubric(items: YnItem[]) {
  const [cat, setCat] = useState<YnCat>('all')
  const list = cat === 'all' ? items : items.filter((it) => it.category === cat)
  return { cat, setCat, list }
}

/** Rubrikalar: “Barçasi” + har turkum (yonida son) */
export function Rubrics({ items, cat, onPick }: { items: YnItem[]; cat: YnCat; onPick: (k: YnCat) => void }) {
  const cats = [...new Map(items.map((it) => [it.category, it.categoryLabel])).entries()]
  return (
    <div className="chips yn-rub" role="group" aria-label="Rubrikalar">
      <button type="button" aria-pressed={cat === 'all'} onClick={() => onPick('all')}>
        Barçasi <span>{items.length}</span>
      </button>
      {cats.map(([k, label]) => (
        <button key={k} type="button" aria-pressed={cat === k} onClick={() => onPick(k)}>
          {label} <span>{items.filter((it) => it.category === k).length}</span>
        </button>
      ))}
    </div>
  )
}

/** Yagona “Batafsil” belgisi — butun karta havolasi ičida */
export function Read() {
  return (
    <span className="more-btn">
      <More />
    </span>
  )
}

/** Kunlar böyiça guruhlaş (tartib saqlanadi) */
export function byDay(items: YnItem[]) {
  const days = [...new Set(items.map((it) => it.dayKey))]
  return days.map((d) => items.filter((it) => it.dayKey === d))
}
