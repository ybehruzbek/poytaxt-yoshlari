'use client'

import { useSyncExternalStore } from 'react'

/** Toşkent vaqti böyiça iş vaqti holati: duşanba–juma 09:00–18:00 */
function status(now = new Date()) {
  const t = new Date(now.getTime() + (now.getTimezoneOffset() + 5 * 60) * 60000)
  const d = t.getDay() // 0 — yakşanba
  const m = t.getHours() * 60 + t.getMinutes()
  const work = d >= 1 && d <= 5
  if (work && m >= 9 * 60 && m < 18 * 60) return { open: true, text: 'Hozir oçiq · 18:00 gaça' }
  const nextMon = d === 5 && m >= 18 * 60 ? true : d === 6 || d === 0
  return {
    open: false,
    text: nextMon
      ? 'Hozir yopiq · duşanba 09:00 da oçiladi'
      : m < 9 * 60
        ? 'Hozir yopiq · bugun 09:00 da oçiladi'
        : 'Hozir yopiq · ertaga 09:00 da oçiladi',
  }
}

const sub = (cb: () => void) => {
  const id = setInterval(cb, 60_000)
  return () => clearInterval(id)
}
let last = ''
const snap = () => {
  const s = status()
  const key = `${s.open}|${s.text}`
  if (key !== last) last = key
  return last
}

/** “Hozir oçiq / yopiq” belgisi (serverda körinmaydi — vaqt brauzerda hisoblanadi) */
export function OpenNow() {
  const v = useSyncExternalStore(sub, snap, () => '')
  if (!v) return null
  const [open, text] = v.split('|')
  return (
    <span className={`bg-open ${open === 'true' ? 'is-open' : 'is-closed'}`}>
      <i aria-hidden="true" />
      {text}
    </span>
  )
}
