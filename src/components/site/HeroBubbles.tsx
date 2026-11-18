'use client'

import { useEffect, useRef, useState } from 'react'

import { motionOff } from './RevealMotion'

/**
 * Boş ekran kollajidagi suhbat: qiz — “Xuş kelibsiz!”, yigit — “Salom, yoşlar!”,
 * keyin ikkalasi birga — “Biz bilan bir jamoada bölişga tayyormisiz?” (ikki dumli umumiy stiker).
 * Har stiker gapirayotgan odam tomonidan “sakrab” çiqadi va yöqoladi, keyin navbatdagisi.
 * Faqat ekranda körinib turganda aylanadi; “harakatni kamaytiriş”, öqiş va yengil rejimda — umumiy gap harakatsiz turadi.
 */
type Who = 'girl' | 'boy' | 'both'
const LINES: Array<{ who: Who; text: string; hold: number }> = [
  { who: 'girl', text: 'Xuş kelibsiz!', hold: 2000 },
  { who: 'boy', text: 'Salom, yoşlar!', hold: 2000 },
  { who: 'both', text: 'Biz bilan bir jamoada bölişga tayyormisiz?', hold: 3600 },
]
/** stiker yöqolgandan keyin keyingisi çiqquncha pauza */
const GAP = 450

export function HeroBubbles() {
  const ref = useRef<HTMLDivElement>(null)
  const [still, setStill] = useState(false)
  const [live, setLive] = useState(false)
  const [st, setSt] = useState<{ i: number; on: boolean }>({ i: 0, on: true })

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (motionOff() || typeof IntersectionObserver === 'undefined') {
      // keyingi kadrda — effekt içida sinxron setState zanjirli render keltirib çiqaradi
      const r = requestAnimationFrame(() => setStill(true))
      return () => cancelAnimationFrame(r)
    }
    const io = new IntersectionObserver(([e]) => setLive(e.isIntersecting && document.visibilityState === 'visible'))
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!live) return
    const t = window.setTimeout(
      () => setSt((s) => (s.on ? { ...s, on: false } : { i: (s.i + 1) % LINES.length, on: true })),
      st.on ? LINES[st.i].hold : GAP,
    )
    return () => clearTimeout(t)
  }, [live, st])

  return (
    <div ref={ref} className="hp-stage">
      {LINES.map((l, k) => {
        const on = still ? l.who === 'both' : st.i === k && st.on
        return (
          <div key={l.who} className={`c-bubble hp hp--${l.who}${on ? ' on' : ''}`}>
            {l.text}
          </div>
        )
      })}
    </div>
  )
}
