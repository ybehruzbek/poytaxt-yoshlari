/* eslint-disable @next/next/no-img-element -- rasmlar Payload'dan tayyor ölçamda keladi */
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
