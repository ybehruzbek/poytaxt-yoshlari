import type { ReactNode } from 'react'

import { type Act, GROUPS, INTRO, NOTE } from './data'
import { DevSectionsPanel } from '@/components/site/DevSectionsPanel'
import { More } from '@/components/site/MoreBtn'

const pad = (i: number) => String(i + 1).padStart(2, '0')

const KIND: Record<Act['kind'], string> = {
  Qonun: 'QONUN',
  Farmon: 'FARMON',
  Qaror: 'QAROR',
  Ustav: 'USTAV',
}
const MONTHS = ['yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun', 'iyul', 'avgust', 'sentabr', 'oktabr', 'noyabr', 'dekabr']
const KW: Record<Act['kind'], string> = { Qonun: 'Qonuni', Farmon: 'Farmoni', Qaror: 'qarori', Ustav: 'Ustavi' }
const TYPE: Record<Act['kind'], string> = { Qonun: 'Qonun', Farmon: 'Farmon', Qaror: 'Qaror', Ustav: 'Ustav' }

/** “30.06.2020” → “2020-yil 30-iyun” */
const dateWords = (y: string) => {
  const [d, m, yr] = y.split('.').map(Number)
  return `${yr}-yil ${d}-${MONTHS[m - 1]}`
}
/** Organ nomi qaratqiç kelişigida: “Özbekiston Respublikasi Prezidentining” */
const issuer = (x: Act) => {
  if (x.by) return x.by
  const b = x.org.replace(/ (Qonuni|Farmoni|qarori)$/, '')
  return b.startsWith('Vazirlar') ? `Özbekiston Respublikasi ${b}` : b
}
/**
 * Rasmiy töliq nom: “Özbekiston Respublikasi Prezidentining 2020-yil 30-iyundagi “…töğrisida”gi
 * PF-6017-son Farmoni”. Ustav uçun — öz nomi.
 */
const official = (x: Act) => {
  if (x.kind === 'Ustav' || !x.y || !x.name) return x.name ?? x.t
  const no = x.noT ?? x.no
  return `${issuer(x)} ${dateWords(x.y)}dagi “${x.name}”gi ${no ? `${no}-son ` : ''}${x.kw ?? KW[x.kind]}`
}
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

/** Hujjat eskizi: tur, raqam va matn çiziqlari */
function Thumb({ x }: { x: Act }) {
  return (
    <span className="nd-b-thumb" aria-hidden="true">
      <b>{KIND[x.kind]}</b>
      <span className="nd-b-no" data-typo="off">
        {x.no ?? 'PDF'}
      </span>
      <i />
      <i />
      <i />
      <i />
    </span>
  )
}

/** A — rasmiy töliq nom sarlavhada, ostida qisqaça mazmuni */
function DocsA({ acts }: { acts: Act[] }) {
  return (
    <div className="nd-b">
      {acts.map((x) => (
        <Wrap key={x.t} x={x} className="nd-b-row">
          <Thumb x={x} />
          <span className="nd-b-txt">
            <strong>{official(x)}</strong>
            {x.reg && <span className="nd-reg">{x.reg}</span>}
            <p>{x.d}</p>
            <Open x={x} cls="nd-b-open" />
          </span>
        </Wrap>
      ))}
    </div>
  )
}

/** B — tepada tur, raqam va sana belgilari; sarlavha — hujjat nomi qöştirnoqda; ostida rasmiy töliq nom va mazmuni */
function DocsB({ acts }: { acts: Act[] }) {
  return (
    <div className="nd-b">
      {acts.map((x) => (
        <Wrap key={x.t} x={x} className="nd-b-row">
          <Thumb x={x} />
          <span className="nd-b-txt">
            <span className="nd-tags">
              <span>{TYPE[x.kind]}</span>
              {x.no && <span data-typo="off">№ {x.no}</span>}
              {x.y && <span>{dateWords(x.y)}</span>}
            </span>
            <strong>{x.name && x.kind !== 'Ustav' ? `“${x.name}”` : (x.name ?? x.t)}</strong>
            <span className="nd-full">{official(x)}</span>
            <p>
              <b>Qisqaça: </b>
              {x.d}
            </p>
            <Open x={x} cls="nd-b-open" />
          </span>
        </Wrap>
      ))}
    </div>
  )
}

/** C — reyestr: bir ustunli röyxat; çapda sana va raqam, öngda rasmiy nom, mazmuni va havola */
function DocsC({ acts }: { acts: Act[] }) {
  return (
    <ol className="nd-c">
      {acts.map((x) => (
        <li key={x.t}>
          <div className="nd-c-side">
            <b data-typo="off">{x.no ?? TYPE[x.kind]}</b>
            <span>{x.y ? dateWords(x.y) : 'amaldagi tahrir'}</span>
            <em data-kind={x.kind}>{TYPE[x.kind]}</em>
          </div>
          <div className="nd-c-main">
            <h3>{official(x)}</h3>
            {x.reg && <span className="nd-reg">{x.reg}</span>}
            <p>{x.d}</p>
            {x.href && (
              <a href={x.href} target="_blank" rel="noopener noreferrer" className="more-btn">
                <More>{isPdf(x) ? 'PDF faylni oçiş' : 'Matnini oçiş'}</More>
              </a>
            )}
          </div>
        </li>
      ))}
    </ol>
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
            <div className="vx" data-v="normativ-a">
              <DocsA acts={g.acts} />
            </div>
            <div className="vx" data-v="normativ-b">
              <DocsB acts={g.acts} />
            </div>
            <div className="vx" data-v="normativ-c">
              <DocsC acts={g.acts} />
            </div>
          </div>
        </section>
      ))}

      <section className="sec nh-note-sec">
        <div className="wrap">
          <p className="nh-note">{NOTE}</p>
        </div>
      </section>
      <DevSectionsPanel
        sections={[
          {
            name: 'normativ',
            label: 'Hujjat kartasi',
            count: 3,
            hints: ['Rasmiy nom sarlavhada', 'Nom + belgilar', 'Reyestr röyxati'],
          },
        ]}
      />
    </div>
  )
}
