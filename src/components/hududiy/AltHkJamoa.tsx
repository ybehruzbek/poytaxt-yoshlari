/* eslint-disable @next/next/no-img-element -- xodimlar suratlari; CMS ulanganda next/image ga o'tadi */
import type { ReactNode } from 'react'

import { CONTACT } from './data'
import { IC, Ic, type Member, TEAM } from './team'

const tel = (p: string) => `tel:${p.replace(/[^+\d]/g, '')}`

/** Sarlavha va qisqa izoh */
function Head() {
  return (
    <div className="hk-jm-head">
      <div className="sec-head">
        <h1 className="h2 pg-title">Toşkent şahar hududiy Kengaşi jamoasi</h1>
      </div>
      <p className="z5-lead">
        Kengaş raisi, bölim boşliqlari va mutaxassislar. Har bir xodimning vazifalari, qabul kuni va
        xonasi bilan şu yerda tanişişingiz mumkin.
      </p>
    </div>
  )
}

/**
 * Aloqa: şaxsiy telefon/poçta (bölsa), qabul kuni va xonasi, ijtimoiy tarmoqlar.
 * Kengaşning umumiy telefoni va poçtasi kartalarda takrorlanmaydi (sahifa boşida bir marta) —
 * faqat vazifalar panelida (`full`) körsatiladi.
 */
function Reach({ m, full, children }: { m: Member; full?: boolean; children?: ReactNode }) {
  const phone = m.phone ?? (full ? CONTACT.phone : undefined)
  const email = m.email ?? (full ? CONTACT.email : undefined)
  return (
    <div className="z5-reach">
      {phone && <a href={tel(phone)}>{phone}</a>}
      {email && <a href={`mailto:${email}`}>{email}</a>}
      {m.reception ? (
        <span className="z5-rec">
          <b>Qabul:</b> {m.reception}
        </span>
      ) : (
        m.room && <span className="z5-rec">{m.room}</span>
      )}
      <div className="z5-soc">
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
            {m.dept && <small>{m.dept}</small>}
          </div>
        </div>
        <h4>{m.deptDuties ? 'Bölim vazifalari' : 'Funksional vazifalari'}</h4>
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
        {m.reception && (
          <p className="z5-hero-rec">
            <Ic d={IC.clock} />
            <span>
              <small>Fuqarolar qabuli</small>
              {m.reception}
            </span>
          </p>
        )}
        <div className="z5-hero-act">
          <Duties m={m} id={id} />
          {m.socials?.map((x) => (
            <a
              key={x.net}
              className="z5-pill"
              href={x.href}
              target="_blank"
              rel="noopener noreferrer"
              title={`${x.net}: ${x.handle}`}
            >
              <Ic d={IC[x.net]} />
              <span className="sr-only">{x.net}</span>
            </a>
          ))}
        </div>
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
        {m.dept && <small>{m.dept}</small>}
        <Reach m={m}>
          <Duties m={m} id={id} />
        </Reach>
      </div>
      <img className="z5-card-ph" src={m.img} alt={m.name} loading="lazy" />
    </article>
  )
}

/* ---------- Karta variantlari (vaqtinça, solişiriş uçun) ---------- */

/** Qabul qatori: kun va vaqt, xona (bölsa) */
function Rec({ m }: { m: Member }) {
  if (m.reception) {
    return (
      <span className="kv-rec">
        <Ic d={IC.clock} />
        <span>{m.reception}</span>
      </span>
    )
  }
  return m.room ? (
    <span className="kv-rec">
      <Ic d={IC.pin} />
      <span>{m.room}</span>
    </span>
  ) : null
}

/** C — Portret: katta surat tepada (yumşoq doira fonida), ostida F.I.Ş., lavozim yorliği, qabul va tugma */
function CardPortrait({ m, id }: { m: Member; id: string }) {
  return (
    <article className="kc">
      <div className="kc-ph">
        <img src={m.img} alt={m.name} loading="lazy" />
      </div>
      <div className="kc-txt">
        {m.dept && <span className="kc-tag">{m.dept}</span>}
        <Name n={m.name} />
        <p>{m.role}</p>
        <Rec m={m} />
      </div>
      <Duties m={m} id={id} />
    </article>
  )
}

/** D — Maʼlumotnoma: dumaloq surat çapda, öngda F.I.Ş. va maʼlumotlar; ikki ustunli ixçam röyxat */
function CardRow({ m, id }: { m: Member; id: string }) {
  return (
    <article className="kd">
      <img className="kd-ph" src={m.img} alt={m.name} loading="lazy" />
      <div className="kd-txt">
        <Name n={m.name} />
        <p>
          {m.role}
          {m.dept && <span>{m.dept}</span>}
        </p>
        <div className="kd-meta">
          <Rec m={m} />
          <Duties m={m} id={id} />
        </div>
      </div>
    </article>
  )
}

/** E — Töq karta: töq fon, surat öng pastda yumşoq soya bilan, sariq lavozim yorliği */
function CardDark({ m, id }: { m: Member; id: string }) {
  return (
    <article className="ke">
      <div className="ke-txt">
        <span className="ke-role">{m.role}</span>
        <Name n={m.name} />
        {m.dept && <small>{m.dept}</small>}
        <Rec m={m} />
        <Duties m={m} id={id} />
      </div>
      <img className="ke-ph" src={m.img} alt={m.name} loading="lazy" />
    </article>
  )
}

const LEADS = TEAM.filter((g) => g.lead).flatMap((g) => g.people)
const REST = TEAM.filter((g) => !g.lead).flatMap((g) => g.people)

/** F — Bölimlar böyiça: har bölim alohida guruh (nomi va xonasi), ičida ixçam portret kartalar */
function ByDept({ ids }: { ids: string }) {
  const groups = Array.from(new Set(REST.map((m) => m.dept ?? ''))).map((d) => ({
    d,
    room: REST.find((m) => m.dept === d)?.room,
    people: REST.filter((m) => (m.dept ?? '') === d),
  }))
  return (
    <div className="kf">
      {groups.map((g, gi) => (
        <section key={g.d} className="kf-group">
          <header>
            <h2>{g.d}</h2>
            {g.room && <span>{g.room}</span>}
          </header>
          <div className="kf-list">
            {g.people.map((m, i) => (
              <article key={m.name} className="kf-card">
                <img src={m.img} alt={m.name} loading="lazy" />
                <div>
                  <Name n={m.name} />
                  <p>{m.role}</p>
                  {m.reception && <Rec m={m} />}
                  <Duties m={m} id={`${ids}-${gi}-${i}`} />
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}

const CARDS = { a: Card, c: CardPortrait, d: CardRow, e: CardDark } as const
const GRID = { a: 'z5-grid', c: 'kc-grid', d: 'kd-grid', e: 'ke-grid' } as const

/**
 * Kengaş jamoasi (namuna asosida): rais — keng karta (surat çapda, F.I.Ş. va lavozim, öngda aloqa, fonda ingiçka naqş);
 * qolganlar — `card` variantidagi kartalar (a — asosiy; c, d, e, f — vaqtinça solişiriş uçun).
 * `ids` — vazifalar paneli id'lari uçun prefiks (bir sahifada bir neçta nusxa bölsa takrorlanmasin).
 */
export function TeamNamuna({
  card = 'a',
  ids = 'vz',
}: {
  card?: keyof typeof CARDS | 'f'
  ids?: string
}) {
  const C = card === 'f' ? null : CARDS[card]
  return (
    <section className="sec">
      <div className="wrap">
        <Head />
        {LEADS.map((m, i) => (
          <Hero key={m.name} m={m} id={`${ids}-r${i}`} />
        ))}
        {C ? (
          <div className={GRID[card as keyof typeof GRID]}>
            {REST.map((m, i) => (
              <C key={m.name} m={m} id={`${ids}-${i}`} />
            ))}
          </div>
        ) : (
          <ByDept ids={ids} />
        )}
      </div>
    </section>
  )
}
