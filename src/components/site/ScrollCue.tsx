'use client'

import { useEffect, useRef } from 'react'
import { smoothScroll } from '@/lib/scroll'

/**
 * Hero pastidagi “pastga suring” belgisi (siçqonça): bosilganda keyingi bölimga silliq tuşadi,
 * sahifa aylantirila boşlaşi bilan yöqoladi.
 */
export function ScrollCue() {
  const root = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const el = root.current
    if (!el) return
    const on = () => el.classList.toggle('cue-gone', window.scrollY > 40)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  const go = () => {
    const next = root.current?.closest('section')?.nextElementSibling
    smoothScroll(next, { block: 'start' })
  }

  return (
    <button type="button" className="cue" ref={root} onClick={go} aria-label="Sahifa davomiga o‘tish">
      <span className="cue-mouse" aria-hidden="true">
        <i />
      </span>
      <span className="cue-t">Davomi</span>
    </button>
  )
}
