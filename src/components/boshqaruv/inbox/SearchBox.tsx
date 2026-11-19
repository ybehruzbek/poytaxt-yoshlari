'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState, useTransition } from 'react'

import { Icon } from '../Icon'

/** Röyxat qidiruvi: yozib turganda 300 ms kutib, URL'dagi `q` ni yangilaydi (sahifa va tanlangan xabar tozalanadi) */
export function SearchBox({ q: initial, placeholder }: { q: string; placeholder: string }) {
  const router = useRouter()
  const path = usePathname()
  const sp = useSearchParams()
  const [q, setQ] = useState(initial)
  const [pending, start] = useTransition()

  useEffect(() => {
    if (q === initial) return
    const t = setTimeout(() => {
      const n = new URLSearchParams(sp.toString())
      if (q.trim()) n.set('q', q.trim())
      else n.delete('q')
      n.delete('sahifa')
      n.delete('id')
      const s = n.toString()
      start(() => router.replace(`${path}${s ? `?${s}` : ''}`, { scroll: false }))
    }, 300)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q])

  return (
    <label className={pending ? 'field-search is-busy' : 'field-search'}>
      <Icon name="search" size={18} />
      <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={placeholder} aria-label="Qidiriş" />
    </label>
  )
}
