import type { CSSProperties, ReactNode } from 'react'

/**
 * Yuklaniş skeleti (shimmer): mazmun kelguncha uning örnini va ölçamini egallab turadi —
 * mazmun kelganda sahifa sakramaydi. Uslub: skeleton.css.
 * Faqat maʼlumot haqiqatan kutiladigan joylarda işlatiladi; oldindan tayyor (statik) sahifalarga qöyilmaydi.
 */
type Shape = 'text' | 'thumb' | 'card' | 'pill'

export function Skeleton({
  w,
  h,
  ratio,
  shape = 'text',
  className = '',
  style,
}: {
  w?: string
  h?: string
  ratio?: string
  shape?: Shape
  className?: string
  style?: CSSProperties
}) {
  return (
    <span
      aria-hidden="true"
      className={`sk sk-${shape} ${className}`}
      style={{ inlineSize: w, blockSize: h, aspectRatio: ratio, ...style }}
    />
  )
}

/** Bir neçta matn qatori: oxirgisi qisqaroq */
export function SkText({ lines = 3, size = '1em' }: { lines?: number; size?: string }) {
  return (
    <span className="sk-lines" aria-hidden="true">
      {Array.from({ length: lines }, (_, i) => (
        <Skeleton key={i} h={size} w={i === lines - 1 && lines > 1 ? '60%' : '100%'} />
      ))}
    </span>
  )
}

/** Skelet örami: ekran öqiş dasturiga “Yuklanmoqda…” deb bildiradi; tez javobda körinmaydi (250 ms kutadi) */
export function SkRegion({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`sk-region ${className}`} role="status" aria-busy="true">
      <span className="sr-only">Yuklanmoqda…</span>
      {children}
    </div>
  )
}
