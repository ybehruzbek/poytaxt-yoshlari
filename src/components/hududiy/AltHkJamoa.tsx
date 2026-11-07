/* eslint-disable @next/next/no-img-element -- Kengaş axborot xizmati suratlari; CMS ulanganda next/image ga o'tadi */
import { BASIS, CHAIR, CONTACT, DEPTS, RECEPTION } from './data'

type P = { L: (h: string) => string }

type Member = {
  name: string
  role: string
  img: string
  dept?: string
  room: string
  reception?: string
  duties?: string[]
}

const recOf = (name: string) => {
  const r = RECEPTION.find((x) => x.name === name)
  return r ? `${r.day} ${r.time}` : undefined
}

const isHead = (role: string) => role.startsWith('Bölim boşliği')

const LEAD: Member = {
  name: CHAIR.name,
  role: CHAIR.role,
  img: CHAIR.img,
  room: CHAIR.room,
  reception: CHAIR.reception.replace(' · ', ' '),
  duties: CHAIR.duties,
}

/** Bölim boşliqlari va mutaxassislar (A variantidagi tartib va mazmun) */
const GROUPS: { title: string; people: Member[] }[] = [
  {
    title: 'Bölim boşliqlari',
    people: DEPTS.flatMap((d) =>
      d.staff
        .filter((x) => isHead(x.role))
        .map((x) => ({
          ...x,
          dept: d.t,
          room: d.room,
          reception: recOf(x.name),
          duties: x.duties ?? d.tasks,
        })),
    ),
  },
  {
    title: 'Mutaxassislar',
    people: DEPTS.flatMap((d) =>
      d.staff
        .filter((x) => !isHead(x.role))
        .map((x) => ({ ...x, dept: d.t, room: d.room, duties: x.duties })),
    ),
  },
]

const IC = {
  phone:
    'M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z',
  mail: 'M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm18 2-10 7L2 6',
  send: 'M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z',
  door: 'M3 21h18M6 21V3h12v18M14 12h.01',
  clock: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zm0-14v4l3 2',
}

function Ic({ d }: { d: string }) {
  return (
    <span className="z3-ic" aria-hidden="true">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d={d} />
      </svg>
    </span>
  )
}

function Head() {
  return (
    <>
      <div className="sec-head z3-head">
        <span>Özbekiston yoşlar ittifoqi</span>
        <h2 className="h2">Toşkent şahar hududiy Kengaşi jamoasi</h2>
      </div>
      <p className="z3-basis">{BASIS}</p>
    </>
  )
}

/** Rais aloqalari: telefon, e-poçta, Telegram */
function ChairContacts({ cls }: { cls: string }) {
  return (
    <>
      <li className={cls}>
        <Ic d={IC.phone} />
        <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
      </li>
      <li className={cls}>
        <Ic d={IC.mail} />
        <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
      </li>
      <li className={cls}>
        <Ic d={IC.send} />
        <a href={CHAIR.socials[0]?.href} target="_blank" rel="noopener noreferrer">
          {CHAIR.socials[0]?.handle}
        </a>
      </li>
    </>
  )
}

function Duties({ list, cls }: { list: string[]; cls: string }) {
  return (
    <details className={cls}>
      <summary>
        Vazifalari <span aria-hidden="true">+</span>
      </summary>
      <ol>
        {list.map((x) => (
          <li key={x}>{x}</li>
        ))}
      </ol>
    </details>
  )
}

/* ================= B — rais katta kartada, qolganlar ixçam kartalar setkasi ================= */

export function TeamB(_: P) {
  return (
    <section className="sec">
      <div className="wrap">
        <Head />

        <h3 className="z3-gt">Rais</h3>
        <article className="z3-bl">
          <div className="z3-bl-ph">
            <img src={LEAD.img} alt={LEAD.name} loading="lazy" />
          </div>
          <div className="z3-bl-main">
            <h3>{LEAD.name}</h3>
            <p>{LEAD.role}</p>
            <ul className="z3-bl-con">
              <ChairContacts cls="" />
              <li>
                <Ic d={IC.door} />
                <span>{LEAD.room}</span>
              </li>
              <li>
                <Ic d={IC.clock} />
                <span>{LEAD.reception}</span>
              </li>
            </ul>
          </div>
          {LEAD.duties && <Duties list={LEAD.duties} cls="z3-duty z3-bl-duty" />}
        </article>

        {GROUPS.map((g) => (
          <div key={g.title} className="z3-grp">
            <h3 className="z3-gt">{g.title}</h3>
            <div className="z3-bg">
              {g.people.map((m) => (
                <article key={m.name} className="z3-bc">
                  <div className="z3-bc-ph">
                    <img src={m.img} alt={m.name} loading="lazy" />
                  </div>
                  <h4>{m.name}</h4>
                  <p className="z3-bc-role">{m.role}</p>
                  {m.dept && <small>{m.dept}</small>}
                  <ul className="z3-bc-meta">
                    <li>
                      <Ic d={IC.door} />
                      <span>{m.room}</span>
                    </li>
                    {m.reception && (
                      <li>
                        <Ic d={IC.clock} />
                        <span>{m.reception}</span>
                      </li>
                    )}
                  </ul>
                  {m.duties && <Duties list={m.duties} cls="z3-duty z3-bc-duty" />}
                </article>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ================= C — maʼlumotnoma: qatorlar, bosilganda vazifalar oçiladi ================= */

function RowBody({ m }: { m: Member }) {
  return (
    <>
      <span className="z3-r-ph">
        <img src={m.img} alt={m.name} loading="lazy" />
      </span>
      <span className="z3-r-who">
        <b>{m.name}</b>
        <em>{m.role}</em>
        {m.dept && <small>{m.dept}</small>}
      </span>
      <span className="z3-r-meta">
        <span className="z3-r-cell">
          <Ic d={IC.door} />
          {m.room}
        </span>
        <span className="z3-r-cell">
          {m.reception && (
            <>
              <Ic d={IC.clock} />
              {m.reception}
            </>
          )}
        </span>
      </span>
    </>
  )
}

function Row({ m }: { m: Member }) {
  if (!m.duties)
    return (
      <li className="z3-r">
        <div className="z3-r-line">
          <RowBody m={m} />
          <span className="z3-r-tg z3-r-tg--none" aria-hidden="true" />
        </div>
      </li>
    )
  return (
    <li className="z3-r">
      <details className="z3-r-det">
        <summary className="z3-r-line">
          <RowBody m={m} />
          <span className="z3-r-tg">
            Vazifalari <i aria-hidden="true">+</i>
          </span>
        </summary>
        <ol className="z3-r-duty">
          {m.duties.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ol>
      </details>
    </li>
  )
}

export function TeamC(_: P) {
  return (
    <section className="sec">
      <div className="wrap">
        <Head />

        <div className="z3-c-div">
          <h3>Rais</h3>
        </div>
        <div className="z3-cl">
          <div className="z3-cl-top">
            <span className="z3-cl-ph">
              <img src={LEAD.img} alt={LEAD.name} loading="lazy" />
            </span>
            <div className="z3-cl-who">
              <b>{LEAD.name}</b>
              <em>{LEAD.role}</em>
            </div>
            <ul className="z3-cl-con">
              <ChairContacts cls="" />
              <li>
                <Ic d={IC.door} />
                <span>{LEAD.room}</span>
              </li>
              <li>
                <Ic d={IC.clock} />
                <span>{LEAD.reception}</span>
              </li>
            </ul>
          </div>
          {LEAD.duties && <Duties list={LEAD.duties} cls="z3-duty z3-cl-duty" />}
        </div>

        {GROUPS.map((g) => (
          <div key={g.title}>
            <div className="z3-c-div">
              <h3>{g.title}</h3>
              <span>{g.people.length}</span>
            </div>
            <ul className="z3-rows">
              {g.people.map((m) => (
                <Row key={m.name} m={m} />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
