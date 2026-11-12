import Link from 'next/link'

import { CHANNEL } from '@/components/faoliyat/types'

import { monthLabel, type YnCat, type YnItem, type YnMonth } from './data'
import { Chip, Img } from './YnShared'

/**
 * B — xronologik lenta (UN News / gov.uk yangiliklar röyxati uslubida):
 * oylar böyiça guruhlar, yopişqoq sana sarlavhalari, ixçam qatorlar (kiçik rasm + sarlavha),
 * yon panelda Telegram kanaliga obuna, turkumlar va oylar arxivi.
 */
export function VariantB({
  items,
  cats,
  months,
  L,
}: {
  items: YnItem[]
  cats: YnCat[]
  months: YnMonth[]
  L: string
}) {
  const groups = months.map((m) => ({ ...m, items: items.filter((i) => i.month === m.value) }))
  const id = (m: string) => `yn-oy-${m}`

  return (
    <section className="sec yn-b" aria-label="Yangiliklar lentasi">
      <div className="wrap yn-b-grid">
        <div className="yn-b-feed">
          {groups.map((g) => (
            <section key={g.value} id={id(g.value)} className="yn-b-group" aria-labelledby={`${id(g.value)}-h`}>
              <h2 className="yn-b-date" id={`${id(g.value)}-h`}>
                {monthLabel(g.value)}
                <span>{g.count} ta yangilik</span>
              </h2>
              <ol className="yn-b-list">
                {g.items.map((it) => (
                  <li key={it.id}>
                    <article className="yn-b-row">
                      <Link href={`${L}/${it.slug}`}>
                        <time className="yn-b-day" dateTime={it.dateISO}>
                          <b>{it.day.split('-')[0]}</b>
                          <small>{it.day.split('-')[1]}</small>
                        </time>
                        <div className="yn-b-txt">
                          <div className="yn-meta">
                            <Chip it={it} />
                          </div>
                          <h3>{it.title}</h3>
                          <p>{it.excerpt}</p>
                        </div>
                        <Img it={it} className="yn-b-th" />
                      </Link>
                    </article>
                  </li>
                ))}
              </ol>
            </section>
          ))}
        </div>

        <aside className="yn-b-side" aria-label="Qöşimça">
          <div className="yn-b-tg on-dark">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="currentColor"
                d="M21.4 4.3 2.9 11.4c-1.3.5-1.2 1.3-.2 1.6l4.7 1.5 1.8 5.6c.2.6.4.8.9.8.4 0 .6-.2.9-.5l2.3-2.2 4.8 3.5c.9.5 1.5.2 1.7-.8l3.1-14.7c.3-1.3-.5-1.9-1.5-1.9zM8.3 14.2l9.6-6.1c.5-.3.9-.1.5.2l-8 7.3-.3 3.3-1.8-4.7z"
              />
            </svg>
            <b>Yangiliklarni birinçi bölib biling</b>
            <p>Kengaş yangiliklari, tanlov va imkoniyatlar — Telegram kanalimizda.</p>
            <a href={CHANNEL} target="_blank" rel="noopener noreferrer" className="btn btn-primary yn-b-tg-btn">
              Obuna böliş
              <span className="ic" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17 17 7M9 7h8v8" />
                </svg>
              </span>
            </a>
          </div>

          <div className="yn-b-box">
            <h2>Turkumlar</h2>
            <ul>
              {cats.map((c) => (
                <li key={c.value}>
                  <span className={`yn-dot ${items.find((i) => i.category === c.value)?.tone}`} aria-hidden="true" />
                  {c.label}
                  <b>{c.count}</b>
                </li>
              ))}
            </ul>
          </div>

          <nav className="yn-b-box" aria-label="Oylar böyiça arxiv">
            <h2>Arxiv</h2>
            <ul>
              {months.map((m) => (
                <li key={m.value}>
                  <a href={`#${id(m.value)}`}>
                    {m.label}
                    <b>{m.count}</b>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
      </div>
    </section>
  )
}
