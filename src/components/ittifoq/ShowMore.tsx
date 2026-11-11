'use client'

import { useState } from 'react'

/** Yaşirin qolgan elementlarni oçadigan tugma: nişon elementga data-open qöyadi (CSS yaşirişni olib taşlaydi) */
export function ShowMore({ target, count, noun }: { target: string; count: number; noun: string }) {
  const [open, setOpen] = useState(false)
  const toggle = () => {
    const el = document.getElementById(target)
    if (!el) return
    const next = !open
    el.toggleAttribute('data-open', next)
    setOpen(next)
    // skroll animatsiyasi yangi körinişga kelgan kartalarni darhol oçsin
    requestAnimationFrame(() => window.dispatchEvent(new Event('scroll')))
    if (!next) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  return (
    <div className="it-more-btn">
      <button type="button" className="btn btn-outline" aria-controls={target} aria-expanded={open} onClick={toggle}>
        {open ? 'Yiğiş' : `Yana ${count} ta ${noun}ni körsatiş`}
        <span className="ic" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d={open ? 'm6 15 6-6 6 6' : 'm6 9 6 6 6-6'} />
          </svg>
        </span>
      </button>
    </div>
  )
}
