import type { ReactNode } from 'react'

import { DevSectionsPanel } from '@/components/site/DevSectionsPanel'

import { type Chapter, type Clause, CHAPTERS, META } from './data'
import { UstavToc } from './UstavToc'

/** Band matni: xatboşilar va röyxat bandlari ketma-ket */
function ClauseBody({ c }: { c: Clause }) {
  const out: ReactNode[] = []
  let list: string[] = []
  const flush = (k: number) => {
    if (list.length) out.push(<ul key={`l${k}`}>{list.map((x) => <li key={x}>{x}</li>)}</ul>)
    list = []
  }
  c.blocks.forEach((b, i) => {
    if (b.li) list.push(b.x)
    else {
      flush(i)
      out.push(
        <p key={i}>
          {i === 0 && c.no && <b className="us-no">{c.no}</b>}
          {b.x}
        </p>,
      )
    }
  })
  flush(c.blocks.length)
  return <>{out}</>
}

function ChapterBody({ ch }: { ch: Chapter }) {
  return (
    <>
      {ch.items.map((c, i) => (
        <div key={c.no ?? i} className="us-cl" id={c.no ? `band-${c.no.replace(/\.$/, '')}` : undefined}>
          <ClauseBody c={c} />
        </div>
      ))}
    </>
  )
}

const chId = (i: number) => `bob-${i + 1}`

/** Hujjat boşi: nomi, röyxatga olingan va tasdiqlangan sana */
function Head({ crumbs }: { crumbs: ReactNode }) {
  return (
    <header className="pg-head us-head">
      <div className="wrap">
        {crumbs}
        <span className="us-kicker">Taʼsis hujjati</span>
        <h1 className="h2 pg-title">Özbekiston yoşlar ittifoqining Ustavi</h1>
        <ul className="us-meta">
          {META.map((m) => (
            <li key={m}>{m}</li>
          ))}
        </ul>
      </div>
    </header>
  )
}

/** A — çapda yopişqoq mundarija (10 bob), öngda matn; ötilgan bob mundarijada belgilanadi */
function UstavA() {
  return (
    <section className="sec us-sec">
      <div className="wrap us-a">
        <UstavToc items={CHAPTERS.map((c, i) => ({ id: chId(i), n: c.n, t: c.t }))} />
        <article className="us-doc">
          {CHAPTERS.map((ch, i) => (
            <section key={ch.n} id={chId(i)} className="us-ch">
              <h2>
                <span>{ch.n} bob</span>
                {ch.t}
              </h2>
              <ChapterBody ch={ch} />
            </section>
          ))}
        </article>
      </div>
    </section>
  )
}

/** B — boblar oçiladigan bölimlarda: tepada boblar röyxati, har bob bosilganda oçiladi */
function UstavB() {
  return (
    <section className="sec us-sec">
      <div className="wrap us-b">
        {CHAPTERS.map((ch, i) => (
          <details key={ch.n} className="us-acc" id={`${chId(i)}-b`} open={i === 0}>
            <summary>
              <b>{String(i + 1).padStart(2, '0')}</b>
              <span>
                <small>{ch.n} bob</small>
                {ch.t}
              </span>
              <em>{ch.items.length} band</em>
              <i aria-hidden="true" />
            </summary>
            <div className="us-doc">
              <ChapterBody ch={ch} />
            </div>
          </details>
        ))}
      </div>
    </section>
  )
}

/** C — kitob: tepada 10 bob kartalari (mundarija), pastda bitta keng ustunda töliq matn */
function UstavC() {
  return (
    <section className="sec us-sec">
      <div className="wrap">
        <nav className="us-tiles" aria-label="Mundarija">
          {CHAPTERS.map((ch, i) => (
            <a key={ch.n} href={`#${chId(i)}-c`}>
              <b>{ch.n}</b>
              <span>{ch.t}</span>
            </a>
          ))}
        </nav>
        <article className="us-doc us-c">
          {CHAPTERS.map((ch, i) => (
            <section key={ch.n} id={`${chId(i)}-c`} className="us-ch">
              <h2>
                <span>{ch.n} bob</span>
                {ch.t}
              </h2>
              <ChapterBody ch={ch} />
            </section>
          ))}
        </article>
      </div>
    </section>
  )
}

/** Özbekiston yoşlar ittifoqining Ustavi — töliq matn (Normativ-huquqiy hujjatlar ičidan oçiladi) */
export function UstavPage({ crumbs }: { crumbs: ReactNode }) {
  return (
    <div className="us">
      <Head crumbs={crumbs} />
      <div className="vx" data-v="ustav-a">
        <UstavA />
      </div>
      <div className="vx" data-v="ustav-b">
        <UstavB />
      </div>
      <div className="vx" data-v="ustav-c">
        <UstavC />
      </div>
      <DevSectionsPanel
        sections={[
          {
            name: 'ustav',
            label: 'Ustav sahifasi',
            count: 3,
            hints: ['Yopişqoq mundarija + matn', 'Oçiladigan boblar', 'Kitob: bob kartalari + matn'],
          },
        ]}
      />
    </div>
  )
}
