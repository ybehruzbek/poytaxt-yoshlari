/* eslint-disable @next/next/no-img-element -- xodimlar suratlari; CMS ulanganda next/image ga o'tadi */
import { BASIS, CONTACT } from './data'
import { IC, Ic, type Member, TEAM } from './team'

const tel = (p: string) => `tel:${p.replace(/[^+\d]/g, '')}`

function Head() {
  return (
    <>
      <div className="sec-head hk-jm-head">
        <span>Özbekiston yoşlar ittifoqi</span>
        <h2 className="h2">Toşkent şahar hududiy Kengaşi jamoasi</h2>
      </div>
      <p className="hk-basis">{BASIS}</p>
    </>
  )
}

/** Telefon va qabul — matn; poçta (kartalarda) va ijtimoiy tarmoqlar — dumaloq ikonkalar */
function Reach({ m, full }: { m: Member; full?: boolean }) {
  const phone = m.phone ?? CONTACT.phone
  const email = m.email ?? CONTACT.email
  return (
    <div className="z5-reach">
      <a href={tel(phone)}>{phone}</a>
      {full && <a href={`mailto:${email}`}>{email}</a>}
      {m.reception && <span>Qabul: {m.reception}</span>}
      <div className="z5-soc">
        {!full && (
          <a href={`mailto:${email}`} aria-label={email} title={email}>
            <Ic d={IC.mail} />
          </a>
        )}
        {m.socials?.map((x) => (
          <a
            key={x.net}
            href={x.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${x.net}: ${x.handle}`}
            title={`${x.net}: ${x.handle}`}
          >
            <Ic d={IC[x.net]} />
          </a>
        ))}
      </div>
    </div>
  )
}

function Duties({ list }: { list?: string[] }) {
  if (!list) return null
  return (
    <details className="z5-duty">
      <summary>
        Vazifalari <span aria-hidden="true">+</span>
      </summary>
      <ul>
        {list.map((x) => (
          <li key={x}>{x}</li>
        ))}
      </ul>
    </details>
  )
}

/**
 * Namuna asosida: rais — keng karta (surat çapda, ism va lavozim öngda, fonda Ittifoq belgisi);
 * qolganlar guruhlarga ajratilmasdan bitta 3 ustunli tarmoqda: ism va lavozim çap yuqorida, surat öng pastda.
 */
export function TeamNamuna() {
  return (
    <section className="sec" id="jamoa">
      <div className="wrap">
        <Head />
        {TEAM.filter((g) => g.lead).flatMap((g) =>
          g.people.map((m) => (
            <article key={m.name} className="z5-hero">
              <img
                className="z5-hero-mark"
                src="/img/ittifoq/belgi.png"
                alt=""
                aria-hidden="true"
              />
              <img className="z5-hero-ph" src={m.img} alt={m.name} />
              <div className="z5-hero-txt">
                <h3>{m.name}</h3>
                <p>{m.role}</p>
                <Reach m={m} full />
                <Duties list={m.duties} />
              </div>
            </article>
          )),
        )}
        <div className="z5-grid">
          {TEAM.filter((g) => !g.lead)
            .flatMap((g) => g.people)
            .map((m) => (
              <article key={m.name} className="z5-card">
                <div className="z5-card-txt">
                  <h3>{m.name}</h3>
                  <p>{m.role}</p>
                  {m.dept && <small>{m.dept}</small>}
                  <Reach m={m} />
                </div>
                <img className="z5-card-ph" src={m.img} alt={m.name} loading="lazy" />
                <Duties list={m.duties} />
              </article>
            ))}
        </div>
      </div>
    </section>
  )
}

/** B — oldingi dizayn: gorizontal kartoçkalar (dumaloq surat · ism · aloqa paneli · vazifalar) */
export function TeamCards() {
  return (
    <section className="sec">
      <div className="wrap">
        <Head />
        {TEAM.map((g) => (
          <div key={g.title} className="hk-jm-grp">
            <h3 className="hk-jm-gt">
              {g.title} <span>{g.people.length}</span>
            </h3>
            {g.people.map((m) => (
              <article key={m.name} className={`hk-lead${g.lead ? '' : ' hk-lead--sm'}`}>
                <div className="hk-lead-ph">
                  <img src={m.img} alt={m.name} loading="lazy" />
                </div>
                <div className="hk-lead-main">
                  <h3>{m.name}</h3>
                  <p>{m.role}</p>
                  {m.dept && <small>{m.dept}</small>}
                </div>
                <ul className="hk-lead-con">
                  <li>
                    <Ic d={IC.phone} />
                    <a href={tel(m.phone ?? CONTACT.phone)}>{m.phone ?? CONTACT.phone}</a>
                  </li>
                  <li>
                    <Ic d={IC.mail} />
                    <a href={`mailto:${m.email ?? CONTACT.email}`}>{m.email ?? CONTACT.email}</a>
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
                {m.duties && (
                  <details className="hk-duty">
                    <summary>
                      <span className="hk-duty-l">Vazifalari</span>
                      <span className="hk-duty-ic" aria-hidden="true">
                        +
                      </span>
                    </summary>
                    <ol>
                      {m.duties.map((x) => (
                        <li key={x}>{x}</li>
                      ))}
                    </ol>
                  </details>
                )}
              </article>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}
