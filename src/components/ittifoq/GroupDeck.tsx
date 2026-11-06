'use client'

import { useState, type MouseEvent, type ReactNode } from 'react'

/**
 * Guruh panellari to'plami: tik çiziqni (gp-strip) bosganda şu guruh faol bo'ladi.
 * Faqat «yonga oçiladigan çiziqlar» körinişida (CSS) panel sifatida çiziladi, boşqa körinişlarda oddiy röyxat.
 */
export function GroupDeck({ children }: { children: ReactNode }) {
  const [active, setActive] = useState('biz')
  const onClick = (e: MouseEvent<HTMLDivElement>) => {
    const strip = (e.target as HTMLElement).closest<HTMLElement>('.gp-strip')
    if (!strip?.dataset.g) return
    setActive(strip.dataset.g)
    const deck = e.currentTarget
    requestAnimationFrame(() => {
      deck
        .querySelector<HTMLElement>(`.gp[data-g="${strip.dataset.g}"] .gp-body`)
        ?.scrollTo({ top: 0 })
      deck.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }
  return (
    <div className="gdeck" data-active={active} onClick={onClick}>
      {children}
    </div>
  )
}
