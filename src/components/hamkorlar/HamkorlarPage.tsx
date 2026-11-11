/* eslint-disable @next/next/no-img-element -- logotiplar kiçik, öz ölçamida */
import type { ReactNode } from 'react'

import { PARTNERS } from './data'

/** “Hamkorlar” sahifasi: har bir hamkor — logotip, töliq nomi, birgalikdagi faoliyat va sayti */
export function HamkorlarPage({ crumbs }: { crumbs: ReactNode }) {
  return (
    <div className="pt">
      <header className="pg-head">
        <div className="wrap">
          {crumbs}
          <h1 className="h2 pg-title">Hamkorlar</h1>
          <p className="pg-lead">
            Özbekiston yoşlar ittifoqi Toşkent şahar hududiy Kengaşi yoşlar bilan işlaşda birgalikda faoliyat
            yurituvçi vazirlik, idora va taşkilotlar.
          </p>
        </div>
      </header>
      <section className="sec pt-sec">
        <div className="wrap pt-grid">
          {PARTNERS.map((p) => (
            <article key={p.name} className="pt-card">
              <div className="pt-card-logo">
                <img src={p.logo} alt="" loading="lazy" />
              </div>
              <h2>{p.name}</h2>
              <p>{p.what}</p>
              <a href={p.site} target="_blank" rel="noopener noreferrer" className="pt-site">
                {p.domain} <span aria-hidden="true">↗</span>
              </a>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
