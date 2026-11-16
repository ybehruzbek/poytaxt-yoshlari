import type { ReactNode } from 'react'

import type { MEMBERS as M } from './data'

/* ---------- ikonkalar (24×24, çiziqli) ---------- */
const P = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const
const s = (k: string, body: ReactNode) => (
  <svg key={k} viewBox="0 0 24 24" {...P}>
    {body}
  </svg>
)

/** Lavozimi böyiça aʼzolar (MEMBERS.byPost tartibida) */
const POST_ICONS = [
  s(
    'rais',
    <>
      <circle cx="12" cy="9" r="4" />
      <path d="M4.5 21a7.5 7.5 0 0 1 15 0" />
      <path d="m12 1.8.7 1.4 1.5.2-1.1 1 .3 1.5-1.4-.7-1.4.7.3-1.5-1.1-1 1.5-.2z" />
    </>,
  ),
  s(
    'apparat',
    <>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18M11 12v2h2v-2" />
    </>,
  ),
  s(
    'institut',
    <>
      <path d="M2.5 9 12 4.5 21.5 9 12 13.5z" />
      <path d="M6.5 11v4.5c1.5 1.6 3.4 2.4 5.5 2.4s4-.8 5.5-2.4V11M21.5 9v5" />
    </>,
  ),
  s(
    'media',
    <>
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <path d="m8 3 4 3 4-3M7 10h6M7 14h4M16 10v4" />
    </>,
  ),
  s(
    'hudud',
    <>
      <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </>,
  ),
]

/** Soha vakillari (MEMBERS.fields tartibida) */
const FIELD_ICONS = [
  s(
    'talim',
    <>
      <path d="M12 6c-2-1.6-5-1.6-8-.6v13c3-1 6-1 8 .6 2-1.6 5-1.6 8-.6v-13c-3-1-6-1-8 .6z" />
      <path d="M12 6v13" />
    </>,
  ),
  s(
    'fan',
    <>
      <path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.8 3h10.4a2 2 0 0 0 1.8-3l-5-9V3" />
      <path d="M7.5 15h9" />
    </>,
  ),
  s(
    'madaniyat',
    <>
      <path d="M9 18V5l11-2v13" />
      <circle cx="6.5" cy="18" r="2.5" />
      <circle cx="17.5" cy="16" r="2.5" />
    </>,
  ),
  s(
    'oav',
    <>
      <rect x="9" y="3" width="6" height="11" rx="3" />
      <path d="M5 11a7 7 0 0 0 14 0M12 18v3M9 21h6" />
    </>,
  ),
  s(
    'ishlab',
    <>
      <path d="M3 21V10l5 3V10l5 3V6h4l1 7v8z" />
      <path d="M7 17h2M12 17h2" />
    </>,
  ),
  s(
    'tadbirkor',
    <>
      <path d="M12 20V11" />
      <path d="M12 11C12 7 9 5 5 5c0 4 3 6 7 6zM12 13c0-3 2.5-5 6-5 0 3.5-2.5 5-6 5z" />
      <path d="M7 20h10" />
    </>,
  ),
  s(
    'sport',
    <>
      <circle cx="12" cy="9" r="5" />
      <path d="M8.6 13.3 7 21l5-2.6 5 2.6-1.6-7.7" />
    </>,
  ),
  s(
    'soglik',
    <>
      <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" />
      <path d="M12 10v5M9.5 12.5h5" />
    </>,
  ),
  s(
    'ekologiya',
    <>
      <path d="M5 19c0-8 5-13 15-14-1 10-6 15-14 15" />
      <path d="M5 19c3-4 6-7 10-9" />
    </>,
  ),
  s(
    'harbiy',
    <>
      <path d="M12 3 5 6v6c0 4 3 7.5 7 9 4-1.5 7-5 7-9V6z" />
      <path d="m12 8 1.2 2.4 2.6.4-1.9 1.8.5 2.6-2.4-1.3-2.4 1.3.5-2.6-1.9-1.8 2.6-.4z" />
    </>,
  ),
  s(
    'huquq',
    <>
      <path d="M12 4v16M7 20h10M5 7h14" />
      <path d="M5 7 2.5 13a2.5 2.5 0 0 0 5 0zM19 7l-2.5 6a2.5 2.5 0 0 0 5 0z" />
    </>,
  ),
]
const PIN = POST_ICONS[4]

const Ic = ({ children, cls = 'km-ic' }: { children: ReactNode; cls?: string }) => (
  <span className={cls} aria-hidden="true">
    {children}
  </span>
)

/** Toşkent şahar hududiy Kengaşi raisining Markaziy Kengaşdagi örni */
function Link({ text }: { text: string }) {
  return (
    <p className="km-link">
      <Ic cls="km-link-ic">{PIN}</Ic>
      <span>{text}</span>
    </p>
  )
}

/**
 * Kengaş tarkibi (Ustav, 5.5 va 5.5.1-bandlar) — tuzilma sxemasi: yuqorida Kengaş va asosiy talablar,
 * undan ikki tarmoq — lavozimi böyiça kiradiganlar va soha vakillari.
 */
export function Members({ MEMBERS }: { MEMBERS: typeof M }) {
  return (
    <div className="km km-c">
      <div className="km-c-root">
        <Ic cls="km-c-root-ic">{POST_ICONS[0]}</Ic>
        <div>
          <b>Markaziy Kengaş</b>
          <span>{MEMBERS.lead}</span>
          <ul className="km-c-facts">
            {MEMBERS.facts.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="km-c-branches">
        <section>
          <h3 className="km-c-tag">Lavozimi böyiça</h3>
          <ol>
            {MEMBERS.byPost.map((x, i) => (
              <li key={x}>
                <Ic>{POST_ICONS[i]}</Ic>
                <span>{x}</span>
              </li>
            ))}
          </ol>
          <Link text={MEMBERS.link} />
        </section>
        <section>
          <h3 className="km-c-tag">Soha vakillari</h3>
          <ul>
            {MEMBERS.fields.map((x, i) => (
              <li key={x}>
                <Ic>{FIELD_ICONS[i]}</Ic>
                <span>{x}</span>
              </li>
            ))}
          </ul>
          <p className="km-extra">{MEMBERS.extra}</p>
        </section>
      </div>
    </div>
  )
}
