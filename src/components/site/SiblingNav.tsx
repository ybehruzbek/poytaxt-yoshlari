import Link from 'next/link'

import { findNav } from '@/config/nav'

/**
 * “{Menyu guruhi} bölimida”: şu guruhdagi boşqa sahifalarga havolalar (yagona .chips körinişida).
 * Joriy sahifa (yoki uning ota bölimi) aria-current bilan belgilanadi.
 */
export function SiblingNav({ locale, path }: { locale: string; path: string }) {
  const { group, trail } = findNav(path)
  const items = group?.items ?? []
  if (!group || items.length < 2) return null
  const cur = trail[0]?.href
  return (
    <nav className="sib-nav" aria-label={`${group.label} bölimi`}>
      <p className="sib-nav-h">{group.label} bölimida</p>
      <div className="chips">
        {items.map((s) => (
          <Link key={s.href} href={`/${locale}${s.href}`} aria-current={s.href === path ? 'page' : s.href === cur ? 'true' : undefined}>
            {s.label}
          </Link>
        ))}
      </div>
    </nav>
  )
}
