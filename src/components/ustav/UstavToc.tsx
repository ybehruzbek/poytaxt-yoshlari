'use client'

import { useEffect, useState } from 'react'

type Item = { id: string; n: string; t: string }

/** Yopişqoq mundarija: ekrandagi bob belgilanadi, bosilganda shu bobga ötadi */
export function UstavToc({ items }: { items: Item[] }) {
  const [cur, setCur] = useState(items[0]?.id)

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter(Boolean) as HTMLElement[]
    const on = () => {
      let id = items[0]?.id
      for (const el of els) if (el.getBoundingClientRect().top < innerHeight * 0.35) id = el.id
      setCur(id)
    }
    on()
    addEventListener('scroll', on, { passive: true })
    return () => removeEventListener('scroll', on)
  }, [items])

  return (
    <nav className="us-toc" aria-label="Mundarija">
      <small>Mundarija</small>
      <ol>
        {items.map((i) => (
          <li key={i.id}>
            <a href={`#${i.id}`} aria-current={cur === i.id ? 'true' : undefined}>
              <b>{i.n}</b>
              <span>{i.t}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
