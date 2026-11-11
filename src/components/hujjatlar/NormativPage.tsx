import type { ReactNode } from 'react'

import { type Act, GROUPS, INTRO, NOTE } from './data'
import { More } from '@/components/site/MoreBtn'

const pad = (i: number) => String(i + 1).padStart(2, '0')

const KIND: Record<Act['kind'], string> = {
  Qonun: 'QONUN',
  Farmon: 'FARMON',
  Qaror: 'QAROR',
  Ustav: 'USTAV',
}
const title = (x: Act) => x.name ?? x.t
const isPdf = (x: Act) => x.href?.endsWith('.pdf')

function Open({ x, cls }: { x: Act; cls: string }) {
  if (!x.href) return null
  return (
    <span className={`more-btn ${cls}`}>
      <More>{isPdf(x) ? 'PDF faylni oçiş' : 'Matnini oçiş'}</More>
    </span>
  )
}

/** Hujjat kartasi — href bölsa, butun karta lex.uz dagi matnga havola */
function Wrap({ x, className, children }: { x: Act; className: string; children: ReactNode }) {
  return x.href ? (
    <a
      className={className}
      href={x.href}
      target="_blank"
      rel="noopener noreferrer"
      data-kind={x.kind}
    >
      {children}
    </a>
  ) : (
    <div className={className} data-kind={x.kind}>
      {children}
    </div>
  )
}

/** Hujjat — fayl qatori: çapda kiçik hujjat eskizi (tur, raqam, matn çiziqlari), öngda nomi, mazmuni va havola */
function DocsB({ acts }: { acts: Act[] }) {
  return (
    <div className="nd-b">
      {acts.map((x) => (
        <Wrap key={x.t} x={x} className="nd-b-row">
          <span className="nd-b-thumb" aria-hidden="true">
            <b>{KIND[x.kind]}</b>
            <span className="nd-b-no">{x.no ?? 'PDF'}</span>
            <i />
            <i />
            <i />
            <i />
          </span>
          <span className="nd-b-txt">
            <span className="nd-b-meta">
              {x.org} · {x.y ? <time>{x.y}</time> : 'amaldagi tahrir'}
            </span>
            <strong>{title(x)}</strong>
            <p>{x.d}</p>
            <Open x={x} cls="nd-b-open" />
          </span>
        </Wrap>
      ))}
    </div>
  )
}

/**
 * “Normativ-huquqiy hujjatlar” sahifasi: yöl va sarlavha, toifalar böyiça tezkor havolalar,
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
            <DocsB acts={g.acts} />
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
