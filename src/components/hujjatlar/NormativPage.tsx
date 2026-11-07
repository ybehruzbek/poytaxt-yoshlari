import type { ReactNode } from 'react'

import { DevSectionsPanel, type PanelSection } from '@/components/site/DevSectionsPanel'

import { type Act, GROUPS, INTRO, NOTE } from './data'

const pad = (i: number) => String(i + 1).padStart(2, '0')

/** VAQTINCHA: hujjat körinişi variantlari faqat işlab çiqiş rejimida */
const DEV = process.env.NODE_ENV !== 'production'
const PANEL: PanelSection[] = [{ name: 'nhd', label: 'Hujjat körinişi', count: 3 }]

const KIND: Record<Act['kind'], string> = {
  Qonun: 'QONUN',
  Farmon: 'FARMON',
  Qaror: 'QAROR',
  Ustav: 'USTAV',
}
const title = (x: Act) => x.name ?? x.t
/** “Özbekiston Respublikasi” sarlavhada turgani uçun organ nomida takrorlanmaydi */
const orgShort = (x: Act) =>
  x.kind === 'Ustav'
    ? ''
    : x.kind === 'Qonun'
      ? 'Qonun'
      : x.org.replace(/^Özbekiston Respublikasi\s+/, '')
/** Ustav — davlat hujjati emas: sarlavhada Ittifoq nomi turadi */
const head = (x: Act) =>
  x.kind === 'Ustav' ? 'Özbekiston yoşlar ittifoqi' : 'Özbekiston Respublikasi'
const noTxt = (x: Act) => (x.no ? `№ ${x.no}` : 'Amaldagi tahrir')
const isPdf = (x: Act) => x.href?.endsWith('.pdf')

function Open({ x, cls }: { x: Act; cls: string }) {
  if (!x.href) return null
  return (
    <span className={cls}>
      {isPdf(x) ? 'PDF faylni oçiş' : 'Matnini oçiş'} <span aria-hidden="true">↗</span>
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

/** A — hujjat muqovasi: qoğoz varaq (bukilgan burçak, orqada varaqlar), tur, organ, raqam va sana */
function DocsA({ acts }: { acts: Act[] }) {
  return (
    <div className="nd-a">
      {acts.map((x) => (
        <Wrap key={x.t} x={x} className="nd-a-doc">
          <span className="nd-a-state">{head(x)}</span>
          <b className="nd-a-kind">{KIND[x.kind]}</b>
          {x.kind !== 'Qonun' && orgShort(x) && <span className="nd-a-org">{orgShort(x)}</span>}
          <span className="nd-a-meta">
            <span>{noTxt(x)}</span>
            {x.y && <time>{x.y}</time>}
          </span>
          <strong className="nd-a-name">{title(x)}</strong>
          <p>{x.d}</p>
          <Open x={x} cls="nd-a-open" />
        </Wrap>
      ))}
    </div>
  )
}

/** B — fayl qatori: çapda kiçik hujjat eskizi (tur, raqam, matn çiziqlari), öngda nomi, mazmuni va havola */
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

/** C — rasmiy blank: ikki qavat ramka, markazda davlat nomi, hujjat turi, raqam va sana */
function DocsC({ acts }: { acts: Act[] }) {
  return (
    <div className="nd-c">
      {acts.map((x) => (
        <Wrap key={x.t} x={x} className="nd-c-doc">
          <span className="nd-c-frame">
            <span className="nd-c-state">{head(x)}</span>
            <span className="nd-c-rule" aria-hidden="true" />
            <span className="nd-c-org">{orgShort(x) || KIND[x.kind]}</span>
            <strong className="nd-c-name">{title(x)}</strong>
            <span className="nd-c-meta">
              {x.y ? (
                <>
                  Toşkent ş. · <time>{x.y}</time> · {noTxt(x)}
                </>
              ) : (
                noTxt(x)
              )}
            </span>
            <p>{x.d}</p>
            <Open x={x} cls="nd-c-open" />
          </span>
        </Wrap>
      ))}
    </div>
  )
}

const DOCS = { a: DocsA, b: DocsB, c: DocsC }

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
            {DEV ? (
              Object.entries(DOCS).map(([k, Docs]) => (
                <div key={k} className="vx" data-v={`nhd-${k}`}>
                  <Docs acts={g.acts} />
                </div>
              ))
            ) : (
              <DocsA acts={g.acts} />
            )}
          </div>
        </section>
      ))}

      <section className="sec nh-note-sec">
        <div className="wrap">
          <p className="nh-note">{NOTE}</p>
        </div>
      </section>
      {DEV && <DevSectionsPanel sections={PANEL} />}
    </div>
  )
}
