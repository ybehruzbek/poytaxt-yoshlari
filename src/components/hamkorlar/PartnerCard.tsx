/* eslint-disable @next/next/no-img-element -- logotiplar kiçik, öz ölçamida */
import { DIRS, type Partner } from './data'

const dirName = (k: string) => DIRS.find((d) => d.k === k)?.t ?? k

/** Hamkor kartasi: logotip, nomi, hamkorlik yönalişlari, izoh va sayt */
export function PartnerCard({ p }: { p: Partner }) {
  return (
    <article className="pt-card">
      <div className="pt-card-logo">
        <img src={p.logo} alt="" loading="lazy" style={p.logoH ? { height: p.logoH } : undefined} />
      </div>
      <h4>{p.name}</h4>
      <ul className="pt-dirs">
        {p.dirs.map((d) => (
          <li key={d}>{dirName(d)}</li>
        ))}
      </ul>
      <p>{p.what}</p>
      {p.site && (
        <a href={p.site} target="_blank" rel="noopener noreferrer" className="pt-site">
          {p.domain} <span aria-hidden="true">↗</span>
        </a>
      )}
    </article>
  )
}
