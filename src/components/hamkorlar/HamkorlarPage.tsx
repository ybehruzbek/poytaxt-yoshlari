import type { ReactNode } from 'react'

import { PartnerCard } from './PartnerCard'
import { GROUPS, PARTNERS } from './data'

/** Toifalar böyiça: har toifa alohida sarlavha ostida, kartalar uç ustunda */
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
      <ByGroup />
    </div>
  )
}
