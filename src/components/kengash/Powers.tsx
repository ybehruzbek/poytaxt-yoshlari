import type { ReactNode } from 'react'


/* ---------- ikonkalar (24×24, çiziqli) ---------- */
const P = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const
const ICONS: ReactNode[] = [
  // 1. Qurultoy qarorlari ijrosini taʼminlaydi
  <svg key="1" viewBox="0 0 24 24" {...P}>
    <path d="M12 3 5 6v6c0 4 3 7.5 7 9 4-1.5 7-5 7-9V6z" />
    <path d="m9 12 2 2 4-4" />
  </svg>,
  // 2. Yuridik şaxsning huquq va majburiyatlari
  <svg key="2" viewBox="0 0 24 24" {...P}>
    <path d="M12 4v16M7 20h10M5 7h14" />
    <path d="M5 7 2.5 13a2.5 2.5 0 0 0 5 0zM19 7l-2.5 6a2.5 2.5 0 0 0 5 0z" />
  </svg>,
  // 3. Ijroiya qömitasini saylaydi
  <svg key="3" viewBox="0 0 24 24" {...P}>
    <rect x="4" y="11" width="16" height="9" rx="2" />
    <path d="M8 11V5h8v6M10 8h4M8 15h8" />
  </svg>,
  // 4. Hisobotlarni tinglaydi
  <svg key="4" viewBox="0 0 24 24" {...P}>
    <rect x="5" y="4" width="14" height="17" rx="2" />
    <path d="M9 4V3h6v1M9 10h6M9 14h6M9 18h3" />
  </svg>,
  // 5. Komissiya va işçi guruhlar
  <svg key="5" viewBox="0 0 24 24" {...P}>
    <circle cx="12" cy="8" r="3" />
    <circle cx="5" cy="10" r="2.2" />
    <circle cx="19" cy="10" r="2.2" />
    <path d="M6.5 20a5.5 5.5 0 0 1 11 0M1.5 18a3.5 3.5 0 0 1 4.5-3.4M22.5 18a3.5 3.5 0 0 0-4.5-3.4" />
  </svg>,
  // 6. Yillik iş rejasi
  <svg key="6" viewBox="0 0 24 24" {...P}>
    <rect x="3.5" y="5" width="17" height="15" rx="2.5" />
    <path d="M3.5 10h17M8 3v4M16 3v4M9 15l2 2 4-4" />
  </svg>,
  // 7. Byudjet
  <svg key="7" viewBox="0 0 24 24" {...P}>
    <ellipse cx="9" cy="7" rx="6" ry="2.5" />
    <path d="M3 7v4c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5V7M3 11v4c0 1.4 2.7 2.5 6 2.5" />
    <circle cx="17" cy="16" r="4.5" />
    <path d="M17 14v4M15.5 16h3" />
  </svg>,
  // 8. Taşkiliy tuzilma
  <svg key="8" viewBox="0 0 24 24" {...P}>
    <rect x="9" y="3" width="6" height="5" rx="1.2" />
    <rect x="3" y="16" width="6" height="5" rx="1.2" />
    <rect x="15" y="16" width="6" height="5" rx="1.2" />
    <path d="M12 8v4M6 16v-4h12v4" />
  </svg>,
  // 9. Içki meʼyoriy hujjatlar
  <svg key="9" viewBox="0 0 24 24" {...P}>
    <path d="M8 3h7l4 4v12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
    <path d="M15 3v4h4M9.5 12h6M9.5 16h4" />
    <path d="M3 7v12a2 2 0 0 0 2 2" />
  </svg>,
  // 10. Rais va örinbosarlarni saylaydi
  <svg key="10" viewBox="0 0 24 24" {...P}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4.5 21a7.5 7.5 0 0 1 15 0" />
    <path d="m12 2.2.7 1.4 1.5.2-1.1 1 .3 1.5-1.4-.7-1.4.7.3-1.5-1.1-1 1.5-.2z" />
  </svg>,
]

/** Vakolatlarning mavzu guruhlari (indekslar POWERS tartibida) */
const GROUPS = [
  { t: 'Ittifoqqa rahbarlik qilish va rahbar organlarni saylash', items: [0, 1, 2, 9] },
  { t: 'Faoliyatni rejalashtirish, moliyalashtirish va nazorat qilish', items: [3, 5, 6] },
  { t: 'Tashkiliy tuzilma va ichki me’yoriy hujjatlarni tasdiqlash', items: [4, 7, 8] },
]
const Ic = ({ i }: { i: number }) => (
  <span className="kv-ic" aria-hidden="true">
    {ICONS[i]}
  </span>
)

/** Markaziy Kengaş vakolatlari (Ustav, 5.5.2): uç mavzu guruhi, har birida ikonkali vakolatlar */
export function Powers({ POWERS }: { POWERS: string[] }) {
  return (
    <div className="kv kv-b">
      {GROUPS.map((g, gi) => (
        <section key={g.t} className={`kv-b-col kv-g${gi}`}>
          <header>
            <h3>{g.t}</h3>
          </header>
          <ol>
            {g.items.map((i) => (
              <li key={i}>
                <Ic i={i} />
                <p>{POWERS[i]}</p>
              </li>
            ))}
          </ol>
        </section>
      ))}
    </div>
  )
}
