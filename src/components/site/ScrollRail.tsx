'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Sahifa böylab harakatlaniş tugmasi (“Halqa”): past öngda dumaloq tugma, atrofidagi halqa sahifaning
 * qança qismi öqilganini körsatadi. Sahifa boşida ↓ (davomi bor), pastga tuşilgaç ↑ (boşiga qaytiş).
 * Sahifa qisqa bölsa körinmaydi.
 */

const smooth = (): ScrollBehavior =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
const up = () => window.scrollTo({ top: 0, behavior: smooth() })
const down = () => window.scrollBy({ top: Math.round(window.innerHeight * 0.8), behavior: smooth() })

function Up() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 19V5M5 12l7-7 7 7" />
    </svg>
  )
}

/** aylantiriş holati: p — 0…1, show — sahifa yetarliça uzun, top/end — boşi va oxiri */
function useScrollState() {
  const [st, setSt] = useState({ show: false, top: true, end: false, pct: 0 })
  const root = useRef<HTMLDivElement>(null)
  useEffect(() => {
    let raf = 0
    const read = () => {
      raf = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      const y = window.scrollY
      const p = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0
      root.current?.style.setProperty('--p', p.toFixed(4))
      const next = {
        show: max > window.innerHeight * 0.6,
        top: y < 120,
        end: y > max - 120,
        pct: Math.round(p * 100),
      }
      setSt((s) =>
        s.show === next.show && s.top === next.top && s.end === next.end && s.pct === next.pct ? s : next,
      )
    }
    const on = () => {
      if (!raf) raf = requestAnimationFrame(read)
    }
    read()
    window.addEventListener('scroll', on, { passive: true })
    window.addEventListener('resize', on)
    const ro = new ResizeObserver(on)
    ro.observe(document.body)
    return () => {
      window.removeEventListener('scroll', on)
      window.removeEventListener('resize', on)
      ro.disconnect()
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])
  return { st, root }
}

export function ScrollRail() {
  const { st, root } = useScrollState()
  const on = st.show ? ' on' : ''

  return (
    <div ref={root} className={`sr-a${on}`}>
      <button
        type="button"
        className="sr-a-b"
        onClick={st.top ? down : up}
        aria-label={st.top ? 'Pastga' : 'Sahifa boshiga'}
      >
        <svg className="sr-a-ring" viewBox="0 0 60 60" aria-hidden="true">
          <circle cx="30" cy="30" r="27" />
          <circle cx="30" cy="30" r="27" pathLength="100" />
        </svg>
        <span className={`sr-a-ic${st.top ? ' dn' : ''}`}>
          <Up />
        </span>
        <span className="sr-a-tip">{st.top ? 'Pastga' : 'Yuqoriga'}</span>
      </button>
    </div>
  )
}
