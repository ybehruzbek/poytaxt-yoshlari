'use client'

import Link from 'next/link'
import { useState, type ReactNode } from 'react'

import { More } from './MoreBtn'

/**
 * “Ittifoq yoşlarga nima beradi” — faoliyat turiga qarab imkoniyatlar. Faktlar tekşirilgan manbalardan:
 * tavsiyanoma, 35 foiz, kafillik, nişon — components/ittifoq/data.ts (PRIVILEGES); yetakçi maqomi — boşlanğiç
 * taşkilot hisobot-saylov materiallari; volontyor huquqlari — “Volontyorlik faoliyati töğrisida”gi Qonun, 12-modda.
 */
const P = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const

const ICONS: Record<string, ReactNode> = {
  faol: <path d="M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.4 6.8 19.1l1-5.8-4.3-4.1 5.9-.9z" />,
  yetakchi: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4.5 21a7.5 7.5 0 0 1 15 0" />
      <path d="M16.5 2.5l.8 1.6 1.7.3-1.3 1.2.3 1.7-1.5-.8" />
    </>
  ),
  volontyor: (
    <>
      <path d="M12 11.5S7 8.6 7 5.6A2.6 2.6 0 0 1 12 4.3a2.6 2.6 0 0 1 5 1.3c0 3-5 5.9-5 5.9z" />
      <path d="M3 15.5h3.5l3.5 2h4.5a1.5 1.5 0 0 0 0-3H11M14 14.5l4.5-1.8a1.6 1.6 0 0 1 1.8 2.5L16 19.5H9L5.5 21H3" />
    </>
  ),
  himoya: (
    <>
      <path d="M12 3 5 6v6c0 4 3 7.5 7 9 4-1.5 7-5 7-9V6z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
}

type Role = { id: string; icon: string; t: string; h: string; items: string[]; href: string; more: string }

const Check = () => (
  <i aria-hidden="true">
    <svg viewBox="0 0 40 40">
      <path
        fill="#43A574"
        d="M20 2l4.5 3.3 5.5-.4 1.7 5.3 4.6 3-1.7 5.3 1.7 5.3-4.6 3-1.7 5.3-5.5-.4L20 38l-4.5-3.3-5.5.4-1.7-5.3-4.6-3 1.7-5.3-1.7-5.3 4.6-3 1.7-5.3 5.5.4z"
      />
      <path
        d="M13.5 20.5l4.5 4.5 8.5-9"
        fill="none"
        stroke="#fff"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </i>
)

/** Faoliyat turi tanlanadi — ostida şu yönalişdagi imkoniyatlar; panellar bir katakda turadi, balandlik özgarmaydi */
export function BenefitsTabs({ base, roles: ROLES }: { base: string; roles: Role[] }) {
  const [cur, setCur] = useState(ROLES[0]?.id)
  return (
    <div className="bnf">
      <div className="bnf-tabs" role="tablist" aria-label="Faoliyat turi">
        {ROLES.map((r) => (
          <button
            key={r.id}
            type="button"
            role="tab"
            id={`bnf-tab-${r.id}`}
            aria-controls={`bnf-panel-${r.id}`}
            aria-selected={cur === r.id}
            onClick={() => setCur(r.id)}
          >
            <span className="bnf-ic" aria-hidden="true">
              <svg viewBox="0 0 24 24" {...P}>
                {ICONS[r.icon]}
              </svg>
            </span>
            {r.t}
          </button>
        ))}
      </div>
      <div className="bnf-panels">
        {ROLES.map((r) => (
          <div
            key={r.id}
            className="bnf-panel"
            role="tabpanel"
            id={`bnf-panel-${r.id}`}
            aria-labelledby={`bnf-tab-${r.id}`}
            hidden={cur !== r.id}
          >
            <p className="bnf-h">{r.h}</p>
            <ul className="values">
              {r.items.map((x) => (
                <li key={x}>
                  <Check />
                  {x}
                </li>
              ))}
            </ul>
            <Link className="more-btn" href={`${base}${r.href}`}>
              <More />
              <span className="sr-only">: {r.more}</span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
