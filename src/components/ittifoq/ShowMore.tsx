'use client'

import { useEffect, useState } from 'react'

/**
 * Yaşirin qolgan elementlarni oçadigan tugma: nişon elementga data-open qöyadi (CSS yaşirişni olib taşlaydi).
 * `count` berilmasa, nişon ičidagi yaşirin farzandlar soni ekran eniga qarab özi sanaladi.
 */
export function ShowMore({ target, count, noun }: { target: string; count?: number; noun: string }) {
  const [open, setOpen] = useState(false)
  const [hidden, setHidden] = useState(count ?? 0)

  useEffect(() => {
    if (count !== undefined) return
    const el = document.getElementById(target)
    if (!el) return
    const calc = () => {
      if (el.hasAttribute('data-open')) return
      setHidden([...el.children].filter((c) => getComputedStyle(c).display === 'none').length)
    }
    calc()
    addEventListener('resize', calc)
    return () => removeEventListener('resize', calc)
  }, [target, count])

  const toggle = () => {
    const el = document.getElementById(target)
    if (!el) return
    const next = !open
    el.toggleAttribute('data-open', next)
    setOpen(next)
    // skroll animatsiyasi yangi körinişga kelgan elementlarni darhol oçsin
    requestAnimationFrame(() => window.dispatchEvent(new Event('scroll')))
    if (!next) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  if (!open && hidden === 0) return null
  return (
    <div className="it-more-btn">
      <button type="button" className="btn btn-outline" aria-controls={target} aria-expanded={open} onClick={toggle}>
        {open ? 'Yiğiş' : `Yana ${hidden} ta ${noun}ni körsatiş`}
        <span className="ic" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d={open ? 'm6 15 6-6 6 6' : 'm6 9 6 6 6-6'} />
          </svg>
        </span>
      </button>
    </div>
  )
}
