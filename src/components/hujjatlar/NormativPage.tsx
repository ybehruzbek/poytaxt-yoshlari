import type { ReactNode } from 'react'

import { GROUPS, INTRO, NOTE } from './data'

const pad = (i: number) => String(i + 1).padStart(2, '0')

/**
 * «Normativ-huquqiy hujjatlar» sahifasi: yöl va sarlavha, toifalar böyiça tezkor havolalar,
 * uç toifa — davlat siyosati, Ittifoq faoliyati, yoşlarga yaratilgan imkoniyatlar.
 */
export function NormativPage({ crumbs }: { crumbs: ReactNode }) {
  return (
    <div className="nh">
      <header className="pg-head">
        <div className="wrap">
          {crumbs}
          <h1 className="h2 pg-title">Normativ-huquqiy hujjatlar</h1>
          <p className="pg-lead">{INTRO}</p>
          <nav className="nh-jump" aria-label="Toifalar">
            {GROUPS.map((g, i) => (
              <a key={g.id} href={`#${g.id}`}>
                <b>{pad(i)}</b>
                {g.t}
                <span>{g.acts.length}</span>
              </a>
            ))}
          </nav>
        </div>
      </header>

      {GROUPS.map((g, i) => (
        <section key={g.id} id={g.id} className="sec nh-grp">
          <div className="wrap">
            <div className="nh-head">
              <b>{pad(i)}</b>
              <div>
                <h2>{g.t}</h2>
                <p>{g.lead}</p>
              </div>
            </div>
            <ol className="nh-acts">
              {g.acts.map((x) => (
                <li key={x.t}>
                  <time>{x.y}</time>
                  <div>
                    <h3>
                      {x.href ? (
                        <a href={x.href} target="_blank" rel="noopener noreferrer">
                          {x.t} <span aria-hidden="true">↗</span>
                        </a>
                      ) : (
                        x.t
                      )}
                    </h3>
                    <p>{x.d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      ))}

      <section className="sec nh-note-sec">
        <div className="wrap">
          <p className="nh-note">{NOTE}</p>
        </div>
      </section>
    </div>
  )
}
