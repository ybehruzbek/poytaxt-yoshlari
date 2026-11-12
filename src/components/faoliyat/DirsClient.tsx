'use client'

import { type ReactNode, useEffect, useState } from 'react'

import { DevVariantSwitch, useDevVariant } from '@/components/site/DevVariantSwitch'

/** VAQTINCHA: yönalişlar sahifasi variantlari — faqat faol variant çiziladi; production'da doim A */
const TITLES = ['Navbatma-navbat qatorlar', 'Mundarija va bölimlar', 'Jurnal kartalari']

export function DirsSwitch({ a, b, c }: { a: ReactNode; b?: ReactNode; c?: ReactNode }) {
  const v = useDevVariant('vy', TITLES.length)
  return (
    <>
      {v === 'b' && b ? b : v === 'c' && c ? c : a}
      <DevVariantSwitch name="vy" label="Yönalişlar" titles={TITLES} />
    </>
  )
}

/** B: yopişqoq mundarija — ekrandagi bölim belgilanadi (scrollspy) */
export function DirsToc({ items }: { items: Array<{ slug: string; n: string; title: string }> }) {
  const [on, setOn] = useState(items[0]?.slug ?? '')
  useEffect(() => {
    const els = items
      .map((x) => document.getElementById(x.slug))
      .filter((e): e is HTMLElement => !!e)
    const io = new IntersectionObserver(
      (es) => {
        const hit = es.filter((e) => e.isIntersecting).sort((x, y) => x.boundingClientRect.top - y.boundingClientRect.top)[0]
        if (hit) setOn(hit.target.id)
      },
      { rootMargin: '-35% 0px -60% 0px' },
    )
    els.forEach((e) => io.observe(e))
    return () => io.disconnect()
  }, [items])
  return (
    <nav className="vyb-toc" aria-label="Yönalişlar mundarijasi">
      <ol>
        {items.map((x) => (
          <li key={x.slug}>
            <a href={`#${x.slug}`} aria-current={on === x.slug ? 'true' : undefined}>
              <span>{x.n}</span>
              {x.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
