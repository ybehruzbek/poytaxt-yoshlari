import Link from 'next/link'

import { More } from '@/components/site/MoreBtn'

import type { YnItem } from './data'
import { Chip, Img } from './YnShared'

/**
 * C — UzA (uza.uz) uslubi (rasmiy axborot agentligi). uza.uz bosh sahifasidan olingan:
 *  - tepada bitta asosiy yangilik (katta rasm, sarlavha, qisqa tavsif);
 *  - yonida “Sönggi yangiliklar”: turkum, sarlavha va “10:05 / 12.11.2026” körinişidagi vaqt;
 *  - pastda rubrikalar (UzA'dagi “Siyosat”, “Jamiyat” kabi): har rubrikada bitta katta karta + röyxat.
 * president.uz röyxatidagi kabi sana raqamli “KK.OO.YYYY” şaklida.
 */
export function VariantC({ items, L }: { items: YnItem[]; L: string }) {
  const href = (it: YnItem) => `${L}/${it.slug}`
  const [lead, ...rest] = items
  const latest = rest.slice(0, 5)
  const order: string[] = []
  for (const it of items) if (!order.includes(it.category)) order.push(it.category)
  const rubrics = order.map((c) => items.filter((i) => i.category === c))
  const stamp = (it: YnItem) => (
    <time className="yn-stamp" dateTime={it.dateISO}>
      {it.time} / {it.num}
    </time>
  )

  return (
    <section className="sec yn-c" aria-label="Yangiliklar">
      <div className="wrap">
        <div className="yn-c-top">
          <article className="yn-c-lead">
            <Link href={href(lead)}>
              <Img it={lead} />
              <div className="yn-c-lead-bd">
                <div className="yn-meta">
                  <Chip it={lead} />
                  {stamp(lead)}
                </div>
                <h2>{lead.title}</h2>
                <p>{lead.excerpt}</p>
                <span className="more-btn">
                  <More />
                </span>
              </div>
            </Link>
          </article>

          {latest.length > 0 && (
            <aside className="yn-c-latest" aria-labelledby="yn-c-latest-h">
              <h2 className="yn-kicker" id="yn-c-latest-h">
                Sönggi yangiliklar
              </h2>
              <ul>
                {latest.map((it) => (
                  <li key={it.id}>
                    <Link href={href(it)}>
                      <span className="yn-cat">{it.categoryLabel}</span>
                      <span className="yn-c-t">{it.title}</span>
                      {stamp(it)}
                    </Link>
                  </li>
                ))}
              </ul>
            </aside>
          )}
        </div>

        <div className="yn-c-rubrics">
          {rubrics.map((list) => {
            const [first, ...others] = list
            return (
              <section key={first.category} className="yn-c-rub" aria-labelledby={`yn-c-${first.category}`}>
                <h2 id={`yn-c-${first.category}`}>
                  <span className={`yn-dot ${first.tone}`} aria-hidden="true" />
                  {first.categoryLabel}
                  <small>{list.length}</small>
                </h2>
                <article className="yn-c-rub-lead">
                  <Link href={href(first)}>
                    <Img it={first} />
                    <h3>{first.title}</h3>
                    {stamp(first)}
                  </Link>
                </article>
                {others.length > 0 && (
                  <ul>
                    {others.slice(0, 3).map((it) => (
                      <li key={it.id}>
                        <Link href={href(it)}>
                          <Img it={it} />
                          <span>
                            <span className="yn-c-t">{it.title}</span>
                            {stamp(it)}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            )
          })}
        </div>
      </div>
    </section>
  )
}
