'use client'

import { useEffect } from 'react'

/**
 * Akkordeon yordamçisi: bölim içidagi takroriy birinçi sarlavhani yaşiradi (nomi akkordeon boşida bor)
 * va «Hammasini oçiş / yopiş» tugmalarini beradi. URL dagi #bölim bölsa — şu bölimni oçadi.
 */
export function AccTools() {
  useEffect(() => {
    document.querySelectorAll('.acc-body').forEach((b) => {
      b.querySelector('h2.h2')?.classList.add('acc-dup')
    })
    const open = () => {
      const el = location.hash && document.getElementById(location.hash.slice(1))
      if (el instanceof HTMLDetailsElement) {
        el.open = true
        el.scrollIntoView({ block: 'start' })
      }
    }
    open()
    window.addEventListener('hashchange', open)
    return () => window.removeEventListener('hashchange', open)
  }, [])

  const all = (v: boolean) => document.querySelectorAll<HTMLDetailsElement>('details.acc').forEach((d) => (d.open = v))

  return (
    <span className="acc-tools">
      <button type="button" onClick={() => all(true)}>
        Hammasini oçiş
      </button>
      <button type="button" onClick={() => all(false)}>
        Hammasini yopiş
      </button>
    </span>
  )
}
