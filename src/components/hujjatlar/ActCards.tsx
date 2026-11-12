import Link from 'next/link'
import type { ReactNode } from 'react'

import { More } from '@/components/site/MoreBtn'

import { type Act, AUDIENCES } from './data'
import { MoreList } from './MoreList'

const KIND: Record<Act['kind'], string> = {
  Qonun: 'QONUN',
  Farmon: 'FARMON',
  Qaror: 'QAROR',
  Ustav: 'USTAV',
}
const MONTHS = ['yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun', 'iyul', 'avgust', 'sentabr', 'oktabr', 'noyabr', 'dekabr']
const TYPE: Record<Act['kind'], string> = { Qonun: 'Qonun', Farmon: 'Farmon', Qaror: 'Qaror', Ustav: 'Ustav' }

/** “30.06.2020” → “2020-yil 30-iyun” */
const dateWords = (y: string) => {
  const [d, m, yr] = y.split('.').map(Number)
  return `${yr}-yil ${d}-${MONTHS[m - 1]}`
}
/** Sarlavha: nom qöştirnoqda; nom özi qöştirnoq bilan boşlansa — ikki qavat qöştirnoq qöyilmaydi */
const heading = (x: Act) => {
  if (!x.name || x.kind === 'Ustav') return x.name ?? x.t
  return x.name.startsWith('“') ? x.name : `“${x.name}”`
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
function Wrap({
  x,
  className,
  children,
  locale,
}: {
  x: Act
  className: string
  children: ReactNode
  locale: string
}) {
  // saytning öz sahifasi (masalan, Ustav matni) — xuddi şu oynada oçiladi
  if (x.href?.startsWith('/') && !isPdf(x))
    return (
      <Link className={className} href={`/${locale}${x.href}`} data-kind={x.kind}>
        {children}
      </Link>
    )
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
        {x.no ?? (x.y ? x.y.slice(-4) : '')}
      </span>
      <i />
      <i />
      <i />
      <i />
    </span>
  )
}

/** Hujjatlar röyxati (uzun bölsa — “Köproq körsatiş” bilan). Karta: tepada tur, raqam va sana belgilari; sarlavha — hujjat nomi qöştirnoqda; ostida qisqaça mazmuni */
export function DocsB({ acts, locale }: { acts: Act[]; locale: string }) {
  return (
    <MoreList className="nd-b">
      {acts.map((x) => (
        <Wrap key={x.t} x={x} className="nd-b-row" locale={locale}>
          <Thumb x={x} />
          <span className="nd-b-txt">
            <span className="nd-tags">
              <span>{TYPE[x.kind]}</span>
              {x.no && <span data-typo="off">№ {x.no}</span>}
              {x.y && <span>{dateWords(x.y)}</span>}
            </span>
            <strong>{heading(x)}</strong>
            <p>{x.d}</p>
            {x.for && (
              <span className="nd-for">
                {x.for.map((k) => AUDIENCES.find((a) => a.k === k)?.t).join(' · ')}
              </span>
            )}
            <Open x={x} cls="nd-b-open" />
          </span>
        </Wrap>
      ))}
    </MoreList>
  )
}
