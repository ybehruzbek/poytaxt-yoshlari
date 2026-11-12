import type { ReactNode } from 'react'

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
        <h1 className="h2 pg-title">Özbekiston yoşlar ittifoqining Ustavi</h1>
        <ul className="us-meta">
          <li className="us-kind">Taʼsis hujjati</li>
          {META.map((m) => (
            <li key={m}>{m}</li>
          ))}
        </ul>
      </div>
    </header>
  )
}

/** Çapda yopişqoq mundarija (10 bob), öngda matn; ötilgan bob mundarijada belgilanadi */
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

/** Özbekiston yoşlar ittifoqining Ustavi — töliq matn (Normativ-huquqiy hujjatlar ičidan oçiladi) */
export function UstavPage({ crumbs }: { crumbs: ReactNode }) {
  return (
    <div className="us">
      <Head crumbs={crumbs} />
      <UstavA />
    </div>
  )
}
