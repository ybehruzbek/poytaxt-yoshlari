/* eslint-disable @next/next/no-img-element -- logotiplar kiçik, öz ölçamida */
import type { ReactNode } from 'react'

import { DevSectionsPanel } from '@/components/site/DevSectionsPanel'

import { DirFilter } from './DirFilter'
import { PartnerCard } from './PartnerCard'
import { DIRS, GROUPS, PARTNERS } from './data'

const dirName = (k: string) => DIRS.find((d) => d.k === k)?.t ?? k

/** A — toifalar böyiça: davlat organlari / huquqni muhofaza qiluvçi va sud organlari / NNT */
function ByGroup() {
  return (
    <section className="sec pt-sec">
      <div className="wrap pt-groups">
        {GROUPS.map((g) => {
          const list = PARTNERS.filter((p) => p.group === g.k)
          if (!list.length) return null
          return (
            <section key={g.k} className="pt-group">
              <div className="pt-group-head">
                <h2>{g.t}</h2>
                <span>{list.length}</span>
              </div>
              <div className="pt-grid">
                {list.map((p) => (
                  <PartnerCard key={p.name} p={p} />
                ))}
              </div>
            </section>
          )
        })}
      </div>
    </section>
  )
}

/** B — hamkorlik yönalişi böyiça saralaş (kafillik, huquqiy himoya, sport…) */
function ByDir() {
  return (
    <section className="sec pt-sec">
      <div className="wrap">
        <DirFilter />
      </div>
    </section>
  )
}

/** C — logotiplar devori va ostida röyxat: taşkilot — hamkorlik yönalişi — sayt */
function Wall() {
  return (
    <section className="sec pt-sec">
      <div className="wrap">
        <div className="pt-wall">
          {PARTNERS.map((p) => (
            <a key={p.name} href={`#${p.k}`} className="pt-wall-i" title={p.name}>
              <img src={p.logo} alt={p.name} loading="lazy" />
            </a>
          ))}
        </div>
        <ol className="pt-list">
          {PARTNERS.map((p) => (
            <li key={p.name} id={p.k}>
              <img src={p.logo} alt="" loading="lazy" />
              <div>
                <h3>{p.name}</h3>
                <p>{p.what}</p>
              </div>
              <ul className="pt-dirs">
                {p.dirs.map((d) => (
                  <li key={d}>{dirName(d)}</li>
                ))}
              </ul>
              {p.site ? (
                <a href={p.site} target="_blank" rel="noopener noreferrer" className="pt-site">
                  {p.domain} <span aria-hidden="true">↗</span>
                </a>
              ) : (
                <span />
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

/** “Hamkorlar” sahifasi */
export function HamkorlarPage({ crumbs }: { crumbs: ReactNode }) {
  return (
    <div className="pt">
      <header className="pg-head">
        <div className="wrap">
          {crumbs}
          <h1 className="h2 pg-title">Hamkorlar</h1>
          <p className="pg-lead">
            Özbekiston yoşlar ittifoqi yoşlarga oid davlat siyosati sohasida faoliyat yurituvçi
            vazirlik va idoralar, huquqni muhofaza qiluvçi va sud organlari hamda nodavlat notijorat
            taşkilotlar bilan hamkorlik qiladi.
          </p>
          <ul className="pt-stats">
            {GROUPS.map((g) => (
              <li key={g.k}>
                <b>{PARTNERS.filter((p) => p.group === g.k).length}</b>
                {g.t}
              </li>
            ))}
          </ul>
        </div>
      </header>
      <div className="vx" data-v="hamkor-a">
        <ByGroup />
      </div>
      <div className="vx" data-v="hamkor-b">
        <ByDir />
      </div>
      <div className="vx" data-v="hamkor-c">
        <Wall />
      </div>
      <DevSectionsPanel
        sections={[
          {
            name: 'hamkor',
            label: 'Hamkorlar sahifasi',
            count: 3,
            hints: [
              'Toifalar böyiça',
              'Hamkorlik yönalişi böyiça saralaş',
              'Logotiplar devori + röyxat',
            ],
          },
        ]}
      />
    </div>
  )
}
