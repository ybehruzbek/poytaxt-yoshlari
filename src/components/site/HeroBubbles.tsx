'use client'

import { type RefObject, useEffect, useRef, useState } from 'react'

import { motionOff } from './RevealMotion'

/**
 * Boş ekran kollajidagi gap stikeri: “Xuş kelibsiz!” → “Salom, yoşlar!” → “Biz bilan bir jamoada bölişga tayyormisiz?”.
 * VAQTINÇA 3 uslub (DevSectionsPanel → bubble): a — yozilib boradi, b — almaşadi, c — suhbat (qiz va yigit navbat bilan).
 * Faqat ekranda körinib turganda işlaydi; “harakatni kamaytiriş”, öqiş va yengil rejimda — birinçi gap, harakatsiz.
 */
const PHRASES = ['Xuş kelibsiz!', 'Salom, yoşlar!', 'Biz bilan bir jamoada bölişga tayyormisiz?']
/** har gapning ekranda turiş vaqti (ms): uzun savol köproq turadi */
const HOLD = [1900, 1900, 3200]

type At = 'pol' | 'circ'

/** Element ekranda körinib turibdimi (yaşirin variant yoki ekrandan taşqarida — yöq) */
function useLive(ref: RefObject<HTMLElement | null>) {
  const [live, setLive] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined' || motionOff()) return
    const io = new IntersectionObserver(([e]) => setLive(e.isIntersecting && document.visibilityState === 'visible'))
    io.observe(el)
    return () => io.disconnect()
  }, [ref])
  return live
}

/** Gaplar navbati: faqat live bölganda aylanadi */
function useCycle(live: boolean) {
  const [i, setI] = useState(0)
  useEffect(() => {
    if (!live) return
    const t = window.setTimeout(() => setI((k) => (k + 1) % PHRASES.length), HOLD[i] + 400)
    return () => clearTimeout(t)
  }, [live, i])
  return i
}

/** a — yozilib boradi: harfma-harf yoziladi, biroz turadi, öçiriladi, keyingisi */
function TypeBubble({ at }: { at: At }) {
  const ref = useRef<HTMLDivElement>(null)
  const live = useLive(ref)
  const [st, setSt] = useState({ i: 0, n: PHRASES[0].length, del: false })
  useEffect(() => {
    if (!live) return
    const text = PHRASES[st.i]
    let wait: number
    let next: typeof st
    if (!st.del && st.n < text.length) [wait, next] = [55, { ...st, n: st.n + 1 }]
    else if (!st.del) [wait, next] = [HOLD[st.i], { ...st, del: true }]
    else if (st.n > 0) [wait, next] = [22, { ...st, n: st.n - 1 }]
    else [wait, next] = [260, { i: (st.i + 1) % PHRASES.length, n: 0, del: false }]
    const t = window.setTimeout(() => setSt(next), wait)
    return () => clearTimeout(t)
  }, [live, st])
  return (
    <div ref={ref} className={`c-bubble hb hb--type hb-${at}`}>
      {PHRASES[st.i].slice(0, st.n)}
      <i className="hb-caret" />
    </div>
  )
}

/** b — almaşadi: har gap stiker bilan birga “sakrab” çiqadi */
function SwapBubble({ at }: { at: At }) {
  const ref = useRef<HTMLDivElement>(null)
  const i = useCycle(useLive(ref))
  return (
    <div ref={ref} className={`c-bubble hb hb--swap hb-${at}`}>
      <span key={i} className="hb-t">
        {PHRASES[i]}
      </span>
    </div>
  )
}

/** c — suhbat: qiz salomlaşadi, yigit javob beradi, keyin qiz taklif qiladi */
function TalkBubbles({ at }: { at: At }) {
  const ref = useRef<HTMLDivElement>(null)
  const i = useCycle(useLive(ref))
  const girl = i === 1 ? 0 : i
  return (
    <>
      <div ref={ref} className={`c-bubble hb hb--talk hb-${at}-g${i !== 1 ? ' on' : ''}`}>
        {PHRASES[girl]}
      </div>
      <div className={`c-bubble hb hb--talk hb-r hb-${at}-b${i === 1 ? ' on' : ''}`}>{PHRASES[1]}</div>
    </>
  )
}

export function HeroBubbles({ at }: { at: At }) {
  return (
    <>
      <div className="vx" data-v="bubble-a">
        <TypeBubble at={at} />
      </div>
      <div className="vx" data-v="bubble-b">
        <SwapBubble at={at} />
      </div>
      <div className="vx" data-v="bubble-c">
        <TalkBubbles at={at} />
      </div>
    </>
  )
}
