/* eslint-disable @next/next/no-img-element -- rasmlar Payload'dan tayyor ölçamda keladi */
import type { YnItem } from './data'

/** Turkum belgisi (rangli kapsula) */
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

/** Hech narsa topilmasa */
export function Empty({ onReset }: { onReset?: () => void }) {
  return (
    <div className="yn-empty" role="status">
      <b>Hozirça bu böyiça yangilik yöq</b>
      <p>Boşqa turkum yoki sanani tanlab köring.</p>
      {onReset && (
        <button type="button" className="btn btn-outline yn-reset" onClick={onReset}>
          Barça yangiliklar
        </button>
      )}
    </div>
  )
}
