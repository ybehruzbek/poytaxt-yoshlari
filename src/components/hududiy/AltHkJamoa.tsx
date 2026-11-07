/* eslint-disable @next/next/no-img-element -- xodimlar suratlari; CMS ulanganda next/image ga o'tadi */
import type { ReactNode } from 'react'

import { CONTACT } from './data'
import { IC, Ic, type Member, TEAM } from './team'

const tel = (p: string) => `tel:${p.replace(/[^+\d]/g, '')}`

function Head() {
  return (
    <div className="sec-head hk-jm-head">
      <h1 className="h2 pg-title">Toşkent şahar hududiy Kengaşi jamoasi</h1>
    </div>
  )
}

/** Telefon va qabul — matn; poçta (kartalarda) va ijtimoiy tarmoqlar — dumaloq ikonkalar */
function Reach({ m, full, children }: { m: Member; full?: boolean; children?: ReactNode }) {
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
        {children}
      </div>
    </div>
  )
}

/** F.I.Ş. har doim 3 qatorda: familiya / ism / ota ismi */
function Name({ n }: { n: string }) {
  const [a, b, ...c] = n.split(' ')
  return (
    <h3 className="z5-name">
      <span>{a}</span> <span>{b}</span> <span>{c.join(' ')}</span>
    </h3>
  )
}

/**
 * Vazifalar — “Vazifalari →” tugmasi öngdan çiqadigan yon panelni (popover) oçadi:
 * surat, F.I.Ş., lavozim, vazifalar röyxati va aloqa.
 */
function Duties({ m, id }: { m: Member; id: string }) {
  if (!m.duties) return null
  return (
    <div className="z5-dz">
      <button type="button" className="z5-duty-btn" popoverTarget={id}>
        Vazifalari <span aria-hidden="true">→</span>
      </button>
      <div id={id} popover="auto" className="z5-drawer" aria-label={`${m.name} — vazifalari`}>
        <button
          type="button"
          className="z5-drawer-x"
          popoverTarget={id}
          popoverTargetAction="hide"
          aria-label="Yopiş"
        >
          ×
        </button>
        <div className="z5-drawer-head">
          <img src={m.img} alt="" loading="lazy" />
          <div>
            <Name n={m.name} />
            <p>{m.role}</p>
          </div>
        </div>
        <h4>Funksional vazifalari</h4>
        <ul>
          {m.duties.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
        <Reach m={m} full />
      </div>
    </div>
  )
}

/** Rais kartasi fonidagi naqş: öng past burçakdan tarqalgan ingiçka konsentrik yoylar va nuqtalar töri (bir rangli) */
const ARCS = Array.from({ length: 12 }, (_, i) => 120 + i * 30)

function Art() {
  return (
    <div className="z5-art" aria-hidden="true">
      <span className="z5-art-dots" />
      <svg viewBox="0 0 520 480" preserveAspectRatio="xMaxYMax meet">
        {ARCS.map((r) => (
          <path key={r} d={`M${520 - r} 480 A${r} ${r} 0 0 1 520 ${480 - r}`} />
        ))}
      </svg>
    </div>
  )
}

function Hero({ m, id }: { m: Member; id: string }) {
  return (
    <article className="z5-hero">
      <Art />
      <img className="z5-hero-ph" src={m.img} alt={m.name} />
      <div className="z5-hero-txt">
        <Name n={m.name} />
        <p>{m.role}</p>
        <Reach m={m} full />
        <Duties m={m} id={id} />
      </div>
    </article>
  )
}

function Card({ m, id }: { m: Member; id: string }) {
  return (
    <article className="z5-card">
      <div className="z5-card-txt">
        <Name n={m.name} />
        <p>{m.role}</p>
        {m.dept && <small title={m.dept}>{m.dept}</small>}
        <Reach m={m}>
          <Duties m={m} id={id} />
        </Reach>
      </div>
      <img className="z5-card-ph" src={m.img} alt={m.name} loading="lazy" />
    </article>
  )
}

const LEADS = TEAM.filter((g) => g.lead).flatMap((g) => g.people)
const REST = TEAM.filter((g) => !g.lead).flatMap((g) => g.people)

/**
 * Kengaş jamoasi (namuna asosida): rais — keng karta (surat çapda, F.I.Ş. va lavozim, öngda aloqa, fonda ingiçka naqş);
 * qolganlar bitta 3 ustunli tarmoqda: F.I.Ş. va lavozim çap yuqorida, surat öng pastda.
 * Rais va birinçi qator xodimlar bitta ekranga siğadi.
 */
export function TeamNamuna() {
  return (
    <section className="sec">
      <div className="wrap">
        <Head />
        {LEADS.map((m, i) => (
          <Hero key={m.name} m={m} id={`vz-r${i}`} />
        ))}
        <div className="z5-grid">
          {REST.map((m, i) => (
            <Card key={m.name} m={m} id={`vz-${i}`} />
          ))}
        </div>
      </div>
    </section>
  )
}
