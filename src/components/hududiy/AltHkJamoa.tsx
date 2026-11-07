/* eslint-disable @next/next/no-img-element -- xodimlar suratlari; CMS ulanganda next/image ga o'tadi */
import { BASIS, CONTACT } from './data'
import { IC, Ic, type Member, TEAM } from './team'

type P = { L: (h: string) => string }

const tel = (p: string) => `tel:${p.replace(/[^+\d]/g, '')}`

function Contacts({ m, sm }: { m: Member; sm?: boolean }) {
  const phone = m.phone ?? CONTACT.phone
  const email = m.email ?? CONTACT.email
  return (
    <ul className={`z4-con${sm ? ' z4-con--sm' : ''}`}>
      <li>
        <Ic d={IC.phone} />
        <a href={tel(phone)}>{phone}</a>
      </li>
      <li>
        <Ic d={IC.mail} />
        <a href={`mailto:${email}`}>{email}</a>
      </li>
      {m.socials?.map((x) => (
        <li key={x.net}>
          <Ic d={IC[x.net]} />
          <a href={x.href} target="_blank" rel="noopener noreferrer">
            {x.handle}
          </a>
        </li>
      ))}
      {m.reception && (
        <li>
          <Ic d={IC.clock} />
          <span>{m.reception}</span>
        </li>
      )}
    </ul>
  )
}

function Duties({ list }: { list?: string[] }) {
  if (!list) return null
  return (
    <details className="z4-duty">
      <summary>
        <span>Vazifalari</span>
        <span className="z4-duty-ic" aria-hidden="true">
          +
        </span>
      </summary>
      <ol>
        {list.map((x) => (
          <li key={x}>{x}</li>
        ))}
      </ol>
    </details>
  )
}

/** B — namuna asosida: rais katta karta (surat çapda, gerb fonda), qolganlar 3 ustunli kartalar, surat öng pastda */
export function TeamB(_: P) {
  return (
    <section className="sec">
      <div className="wrap">
        <div className="sec-head hk-jm-head">
          <span>Özbekiston yoşlar ittifoqi</span>
          <h2 className="h2">Toşkent şahar hududiy Kengaşi jamoasi</h2>
        </div>
        <p className="hk-basis">{BASIS}</p>

        {TEAM.map((g) =>
          g.lead ? (
            g.people.map((m) => (
              <article key={m.name} className="z4-hero">
                <img
                  className="z4-hero-mark"
                  src="/img/ittifoq/belgi.png"
                  alt=""
                  aria-hidden="true"
                />
                <img className="z4-hero-ph" src={m.img} alt={m.name} />
                <div className="z4-hero-txt">
                  <h3>{m.name}</h3>
                  <p>{m.role}</p>
                  <Contacts m={m} />
                  <Duties list={m.duties} />
                </div>
              </article>
            ))
          ) : (
            <div key={g.title} className="hk-jm-grp z4-grp">
              <h3 className="hk-jm-gt">
                {g.title} <span>{g.people.length}</span>
              </h3>
              <div className="z4-grid">
                {g.people.map((m) => (
                  <article key={m.name} className="z4-card">
                    <div className="z4-card-top">
                      <div className="z4-card-txt">
                        <h3>{m.name}</h3>
                        <p className="z4-role">{m.role}</p>
                        {m.dept && <small>{m.dept}</small>}
                        <Contacts m={m} sm />
                      </div>
                      <img className="z4-card-ph" src={m.img} alt={m.name} loading="lazy" />
                    </div>
                    <Duties list={m.duties} />
                  </article>
                ))}
              </div>
            </div>
          ),
        )}
      </div>
    </section>
  )
}
