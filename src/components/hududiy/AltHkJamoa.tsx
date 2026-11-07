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

/** F.I.Ş. har doim 3 qatorda: familiya / ism / ota ismi */
function Name({ n }: { n: string }) {
  const [a, b, ...c] = n.split(' ')
  return (
    <h3 className="z5-name">
      <span>{a}</span> <span>{b}</span> <span>{c.join(' ')}</span>
    </h3>
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

function Hero({ m }: { m: Member }) {
  return (
    <article className="z5-hero">
      <img className="z5-hero-mark" src="/img/ittifoq/belgi.png" alt="" aria-hidden="true" />
      <img className="z5-hero-ph" src={m.img} alt={m.name} />
      <div className="z5-hero-txt">
        <Name n={m.name} />
        <p>{m.role}</p>
        <Reach m={m} full />
        <Duties list={m.duties} />
      </div>
    </article>
  )
}

function Card({ m }: { m: Member }) {
  return (
    <article className="z5-card">
      <div className="z5-card-txt">
        <Name n={m.name} />
        <p>{m.role}</p>
        {m.dept && <small title={m.dept}>{m.dept}</small>}
        <Reach m={m} />
      </div>
      <img className="z5-card-ph" src={m.img} alt={m.name} loading="lazy" />
      <Duties list={m.duties} />
    </article>
  )
}

const LEADS = TEAM.filter((g) => g.lead).flatMap((g) => g.people)
const REST = TEAM.filter((g) => !g.lead).flatMap((g) => g.people)

/** Variantlar umumiy tuzilişi; farqi faqat bölim klassida (CSS) */
function Team({ mod, id }: { mod?: string; id?: string }) {
  return (
    <section className={`sec${mod ? ` ${mod}` : ''}`} id={id}>
      <div className="wrap">
        <Head />
        {LEADS.map((m) => (
          <Hero key={m.name} m={m} />
        ))}
        <div className="z5-grid">
          {REST.map((m) => (
            <Card key={m.name} m={m} />
          ))}
        </div>
      </div>
    </section>
  )
}

/**
 * Namuna asosida: rais — keng karta (surat çapda, ism va lavozim öngda, fonda Ittifoq belgisi);
 * qolganlar guruhlarga ajratilmasdan bitta 3 ustunli tarmoqda: ism va lavozim çap yuqorida, surat öng pastda.
 */
export function TeamNamuna() {
  return <Team id="jamoa" />
}

/** B — rangli: har karta palitradan öz tusida, surat orqasida yirik doira; raisda sariq doira */
export function TeamRangli() {
  return <Team mod="z6" />
}

/** C — ixcham: rais kartasi töq fonda, xodimlar 4 ustunli vertikal kartalarda (surat tepada) */
export function TeamIxcham() {
  return <Team mod="z7" />
}
