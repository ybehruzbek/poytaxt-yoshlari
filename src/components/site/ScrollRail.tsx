'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Öng çetdagi aylantiriş paneli: ↑ (sahifa boşiga), örtada sahifadagi örinni körsatuvçi çiziq,
 * ↓ (bir ekran pastga). Sahifaning yuqorisida va pastida keraksiz tugma öçadi;
 * sahifa qisqa bölsa panel umuman körinmaydi.
 */
export function ScrollRail() {
  const [st, setSt] = useState({ show: false, top: true, end: false })
  const fill = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    let raf = 0
    const read = () => {
      raf = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      const y = window.scrollY
      const p = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0
      fill.current?.style.setProperty('--p', String(p))
      const next = { show: max > window.innerHeight * 0.6, top: y < 120, end: y > max - 120 }
      setSt((s) => (s.show === next.show && s.top === next.top && s.end === next.end ? s : next))
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

  const smooth = () =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
  const up = () => window.scrollTo({ top: 0, behavior: smooth() })
  const down = () => window.scrollBy({ top: Math.round(window.innerHeight * 0.8), behavior: smooth() })

  return (
    <nav className={`srail${st.show ? ' on' : ''}`} aria-label="Sahifa böylab harakatlaniş">
      <button type="button" className="srail-b" onClick={up} disabled={st.top} aria-label="Sahifa boşiga">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
        <span className="srail-tip">Yuqoriga</span>
      </button>
      <span className="srail-track" aria-hidden="true">
        <span ref={fill} className="srail-fill" />
      </span>
      <button type="button" className="srail-b" onClick={down} disabled={st.end} aria-label="Pastga">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
        <span className="srail-tip">Pastga</span>
      </button>
    </nav>
  )
}
