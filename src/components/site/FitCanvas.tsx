'use client'

import { type ReactNode, useEffect, useRef } from 'react'

/** Içidagi 600×700 px kanvasni konteyner eniga moslab masştablaydi (CollageScaler'ning umumiy körinişi). */
export function FitCanvas({ className, children }: { className: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    const inner = el?.firstElementChild as HTMLElement | null
    if (!el || !inner) return
    const ro = new ResizeObserver(() => {
      inner.style.transform = `scale(${el.clientWidth / 600})`
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])
  return (
    <div ref={ref} className={className} aria-hidden="true">
      {children}
    </div>
  )
}
