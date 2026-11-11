import type { ReactNode } from 'react'

import { PartnerCard } from './PartnerCard'
import { DOMESTIC, FOREIGN, GROUPS, PARTNERS, REGIONS } from './data'

function Block({ id, title, list }: { id?: string; title: string; list: typeof PARTNERS }) {
  if (!list.length) return null
  return (
    <section className="pt-group" id={id}>
      <div className="pt-group-head">
        <h3>{title}</h3>
        <span>{list.length}</span>
      </div>
      <div className="pt-grid">
        {list.map((p) => (
          <PartnerCard key={p.k} p={p} />
        ))}
      </div>
    </section>
  )
}

/**
 * “Hamkorlar” sahifasi: avval Özbekistondagi hamkorlar (toifalar böyiça), keyin alohida bölimda
 * xalqaro hamkorlar (mintaqa va hamkorlik doirasi böyiça: BMT, MDH, TDT, ŞHT, Markaziy Osiyo, Xitoy…).
 */
export function HamkorlarPage({ crumbs }: { crumbs: ReactNode }) {
  const home = GROUPS.filter((g) => g.k !== 'xalqaro')
  return (
    <div className="pt">
      <header className="pg-head">
        <div className="wrap">
          {crumbs}
          <h1 className="h2 pg-title">Hamkorlar</h1>
          <p className="pg-lead">
            Özbekiston yoşlar ittifoqi Ustavda belgilangan maqsad va vazifalardan kelib çiqib,
            yoşlarga oid davlat siyosati sohasida faoliyat yurituvçi vazirlik va idoralar, davlat
            korxonalari, ilmiy muassasalar, nodavlat notijorat taşkilotlar hamda xorijiy yoşlar
            taşkilotlari bilan hamkorlik qiladi.
          </p>
          <ul className="pt-stats">
            <li>
              <b>{DOMESTIC.length}</b>
              <a href="#ozbekistonda">Özbekistondagi hamkorlar</a>
            </li>
            <li>
              <b>{FOREIGN.length}</b>
              <a href="#xalqaro">Xalqaro hamkorlar</a>
            </li>
          </ul>
        </div>
      </header>

      <section className="sec pt-sec" id="ozbekistonda">
        <div className="wrap pt-groups">
          <h2 className="pt-part">Özbekistondagi hamkorlar</h2>
          {home.map((g) => (
            <Block key={g.k} title={g.t} list={PARTNERS.filter((p) => p.group === g.k)} />
          ))}
        </div>
      </section>

      <section className="sec pt-sec pt-intl" id="xalqaro">
        <div className="wrap pt-groups">
          <h2 className="pt-part">Xalqaro hamkorlar</h2>
          {REGIONS.map((r) => (
            <Block
              key={r.k}
              id={`xalqaro-${r.k}`}
              title={r.t}
              list={FOREIGN.filter((p) => p.region === r.k)}
            />
          ))}
        </div>
      </section>
    </div>
  )
}
