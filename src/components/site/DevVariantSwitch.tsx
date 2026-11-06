'use client'

import { useEffect, useSyncExternalStore } from 'react'

/**
 * VAQTINCHA, FAQAT ISHLAB CHIQISH REJIMIDA: bitta bo'limning dizayn variantlarini (A, B, C, …) almashtirish paneli.
 * <html data-{name}="a|b|c|…"> o'rnatadi. Tanlov sessionStorage'da (faqat shu tab uchun) saqlanadi;
 * URL'dagi ?{name}=b o'qib olingach manzildan olib tashlanadi. Production build'da hech narsa chizmaydi.
 * Variantlar soni titles uzunligiga teng (a dan boshlab harflar).
 */
const listeners = new Set<() => void>()
const subscribe = (cb: () => void) => {
  listeners.add(cb)
  return () => listeners.delete(cb)
}
const read = (key: string, keys: string[]): string => {
  try {
    const s = sessionStorage.getItem(key)
    return s && keys.includes(s) ? s : 'a'
  } catch {
    return 'a'
  }
}
const write = (key: string, v: string) => {
  try {
    sessionStorage.setItem(key, v)
  } catch {
    /* saqlab bo'lmasa — faqat shu render uchun */
  }
  listeners.forEach((l) => l())
}

export function DevVariantSwitch({
  name,
  label,
  titles,
  labels,
  className,
}: {
  name: string
  label: string
  titles: string[]
  /** tugmalardagi qisqa yozuv (sukut: A, B, C, …) */
  labels?: string[]
  /** qöşimça klass (masalan, ikkinçi panel uçun joylaşuv) */
  className?: string
}) {
  const key = `v-${name}`
  const keys = titles.map((_, i) => String.fromCharCode(97 + i))
  const keysId = keys.join('')
  const v = useSyncExternalStore(subscribe, () => read(key, keysId.split('')), () => 'a')

  useEffect(() => {
    const url = new URL(window.location.href)
    const q = url.searchParams.get(name)
    if (q && keysId.includes(q) && q.length === 1) {
      write(key, q)
      url.searchParams.delete(name)
      window.history.replaceState(null, '', url)
    }
  }, [key, name, keysId])

  useEffect(() => {
    document.documentElement.setAttribute(`data-${name}`, v)
  }, [name, v])

  if (process.env.NODE_ENV === 'production') return null
  return (
    <div className={`dev-switch${className ? ` ${className}` : ''}`} role="group" aria-label={`${label} varianti`}>
      {label}
      {keys.map((x, i) => (
        <button key={x} type="button" title={titles[i]} className={v === x ? 'on' : undefined} onClick={() => write(key, x)}>
          {labels?.[i] ?? x.toUpperCase()}
        </button>
      ))}
    </div>
  )
}
