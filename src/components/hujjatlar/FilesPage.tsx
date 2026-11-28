import type { ReactNode } from 'react'

import { More } from '@/components/site/MoreBtn'
import { SiblingNav } from '@/components/site/SiblingNav'
import type { FileDoc } from '@/lib/cms/hujjatlar'
import { nbsp } from '@/lib/nbsp'

const MON = ['yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun', 'iyul', 'avgust', 'sentabr', 'oktabr', 'noyabr', 'dekabr']
const fmt = (iso: string) => {
  const [y, m, d] = iso.split('-').map(Number)
  return y && m && d ? `${y}-yil ${d}-${MON[m - 1]}` : ''
}
const size = (b: number) => (b > 1024 * 1024 ? `${(b / 1024 / 1024).toFixed(1).replace('.', ',')} MB` : `${Math.max(1, Math.round(b / 1024))} KB`)

/**
 * Yuklab olinadigan hujjatlar röyxati (Kengaş hujjatlari, hujjat namunalari) — admin paneldan töldiriladi.
 * Röyxat böş bölsa, “joylaştirilmagan” xabari va qöşni sahifalarga havolalar körinadi.
 */
export function FilesPage({
  crumbs,
  title,
  docs,
  kinds,
  locale,
  path,
}: {
  crumbs: ReactNode
  title: string
  docs: FileDoc[]
  kinds: Record<string, string>
  locale: string
  path: string
}) {
  return (
    <>
      <header className="pg-head">
        <div className="wrap">
          {crumbs}
          <h1 className="h2 pg-title">{title}</h1>
        </div>
      </header>
      <section className="sec">
        <div className="wrap ph-body">
          {docs.length ? (
            <ul className="hj-files">
              {docs.map((d) => (
                <li key={d.id}>
                  <span className="hj-ext" aria-hidden="true">
                    {d.ext || 'PDF'}
                  </span>
                  <div className="hj-bd">
                    <span className="hj-meta">
                      {kinds[d.kind] ?? d.kind}
                      {d.date && ` · ${fmt(d.date)}`}
                      {d.no && ` · № ${d.no}`}
                    </span>
                    <h2>{nbsp(d.t)}</h2>
                    {d.d && <p>{nbsp(d.d)}</p>}
                  </div>
                  <a className="more-btn" href={d.url} target="_blank" rel="noopener noreferrer" download>
                    <More>
                      Yuklab olish<span className="sr-only">: {d.t}</span>
                    </More>
                  </a>
                  <small className="hj-size">{d.size ? size(d.size) : ''}</small>
                </li>
              ))}
            </ul>
          ) : (
            <div className="ph-empty" role="status">
              <p className="ph-empty-h">Hujjatlar joylashtirilmoqda</p>
              <p>Bo‘lim hujjatlari tez orada shu yerda yuklab olish uchun joylashtiriladi.</p>
            </div>
          )}
          <SiblingNav locale={locale} path={path} />
        </div>
      </section>
    </>
  )
}
