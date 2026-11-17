'use client'

import Link from 'next/link'
import { useState } from 'react'

import { Icon } from './Icon'

export type InboxItem = {
  id: number | string
  name: string
  text?: string | null
  when: string
  href: string
  tag?: { t: string; c: string }
  noAva?: boolean
}
export type InboxTab = { key: string; t: string; total: number; href: string; items: InboxItem[] }

const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toLocaleUpperCase('uz')

/** Javob kutayotgan murojaat va arizalar: tur böyiça yorliqlar, har birida oxirgi 5 tasi */
export function InboxCard({ tabs }: { tabs: InboxTab[] }) {
  const [k, setK] = useState(() => tabs.find((t) => t.total > 0)?.key ?? tabs[0].key)
  const tab = tabs.find((t) => t.key === k) ?? tabs[0]
  return (
    <section className="card">
      <div className="card__head">
        <h2>Javob kutayotganlar</h2>
        <Link className="more" href={tab.href} prefetch={false}>
          Barçasi
          <Icon name="chev" size={16} />
        </Link>
      </div>
      <div className="tabs" role="tablist">
        {tabs.map((t) => (
          <button key={t.key} type="button" role="tab" aria-selected={t.key === k} className={t.key === k ? 'is-act' : undefined} onClick={() => setK(t.key)}>
            {t.t}
            {t.total > 0 && <em>{t.total}</em>}
          </button>
        ))}
      </div>
      {tab.items.length === 0 ? (
        <p className="empty">Javob kutayotgan xabar yöq</p>
      ) : (
        <ul className="list">
          {tab.items.map((it) => (
            <li key={it.id}>
              <Link className="row" href={it.href} prefetch={false} style={it.noAva ? { gridTemplateColumns: 'minmax(0,1fr) auto' } : undefined}>
                {!it.noAva && <span className="ava">{initials(it.name)}</span>}
                <div style={{ minWidth: 0 }}>
                  <b>{it.name}</b>
                  {it.text && <p>{it.text}</p>}
                </div>
                <div className="row__meta">
                  {it.tag && <span className={`pill ${it.tag.c}`}>{it.tag.t}</span>}
                  <span>{it.when}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
