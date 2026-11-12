'use client'

import { Children, type ReactNode, useRef, useState } from 'react'

import { More } from '@/components/site/MoreBtn'

/**
 * Uzun hujjatlar röyxati: dastlab `first` ta, “Köproq körsatiş” har bosilganda yana `step` ta oçiladi;
 * hammasi oçilgaç — “Yiğiş” (röyxat boşiga qaytaradi). Tugma — yagona “Batafsil” uslubi (.more-btn).
 */
export function MoreList({
  children,
  className,
  first = 8,
  step = 8,
}: {
  children: ReactNode
  className: string
  first?: number
  step?: number
}) {
  const all = Children.toArray(children)
  const [shown, setShown] = useState(first)
  const box = useRef<HTMLDivElement>(null)
  const rest = all.length - shown

  const less = () => {
    setShown(first)
    box.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <div ref={box} className={className}>
        {all.slice(0, shown)}
      </div>
      {all.length > first && (
        <div className="nd-more">
          {rest > 0 ? (
            <button type="button" className="more-btn" onClick={() => setShown((s) => s + step)}>
              <More>Köproq körsatiş · yana {rest} ta hujjat</More>
            </button>
          ) : (
            <button type="button" className="more-btn" onClick={less}>
              <More>Yiğiş</More>
            </button>
          )}
        </div>
      )}
    </>
  )
}
