import Link from 'next/link'

import { Arrow } from '@/components/site/SocialPhones'

import { APPEAL_LAW, APPEAL_NOTE, APPEAL_STEPS, CONTACT } from './data'

type P = { L: (h: string) => string }

const pad = (i: number) => String(i + 1).padStart(2, '0')

function ArrowBtn({ href, children }: { href: string; children: string }) {
  return (
    <Link href={href} className="btn btn-primary">
      {children}{' '}
      <span className="ic">
        <Arrow />
      </span>
    </Link>
  )
}

/* ---------- Murojaat tartibi ---------- */

/** B: oq fon, gorizontal progress çiziği bölib 4 bosqiç, pastda katta telefon raqami */
export function AppealB({ L }: P) {
  return (
    <section className="sec">
      <div className="wrap">
        <div className="z2-ab-head">
          <h2 className="h2">Murojaatni körib çiqiş tartibi</h2>
          <p>{APPEAL_NOTE}</p>
        </div>
        <ol className="z2-ab-track">
          {APPEAL_STEPS.map((s, i) => (
            <li key={s.t}>
              <span className="z2-ab-dot">{i + 1}</span>
              <h3>{s.t}</h3>
              <p>{s.d}</p>
            </li>
          ))}
        </ol>
        <div className="z2-ab-foot">
          <a href={CONTACT.phoneHref} className="z2-ab-phone">
            <small>Işonç telefoni</small>
            {CONTACT.phone}
          </a>
          <div className="z2-ab-side">
            <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            <ArrowBtn href={L('/boglanish/murojaat')}>Onlayn murojaat</ArrowBtn>
          </div>
        </div>
        <p className="z2-law">{APPEAL_LAW}</p>
      </div>
    </section>
  )
}

/** C: ikki ustun — çapda vertikal vaqt çiziği, öngda yopişqoq aloqa kartasi */
export function AppealC({ L }: P) {
  return (
    <section className="sec z2-ac-sec">
      <div className="wrap">
        <div className="z2-ac">
          <div>
            <h2 className="h2">Murojaatni körib çiqiş tartibi</h2>
            <p className="z2-ac-note">{APPEAL_NOTE}</p>
            <ol className="z2-ac-line">
              {APPEAL_STEPS.map((s, i) => (
                <li key={s.t}>
                  <span className="z2-ac-n">{pad(i)}</span>
                  <div>
                    <h3>{s.t}</h3>
                    <p>{s.d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <aside className="z2-ac-card">
            <a href={CONTACT.phoneHref} className="z2-ac-big">
              <small>Işonç telefoni</small>
              {CONTACT.phone}
            </a>
            <a href={`mailto:${CONTACT.email}`} className="z2-ac-mail">
              <small>Elektron poçta</small>
              {CONTACT.email}
            </a>
            <ArrowBtn href={L('/boglanish/murojaat')}>Onlayn murojaat</ArrowBtn>
            <p>{APPEAL_LAW}</p>
          </aside>
        </div>
      </div>
    </section>
  )
}

/* ---------- Aloqa ---------- */

function Socials({ className }: { className: string }) {
  return (
    <div className={className}>
      {CONTACT.socials.map((s) => (
        <a key={s.net} href={s.href} target="_blank" rel="noopener noreferrer">
          <small>{s.net}</small>
          {s.handle}
        </a>
      ))}
    </div>
  )
}

/** B: katta töq karta, telefon va poçta yirik şriftda */
export function ContactB(_: P) {
  return (
    <section className="sec">
      <div className="wrap">
        <div className="z2-cb">
          <div className="z2-cb-top">
            <h2 className="h2">Aloqa</h2>
            <p>
              {CONTACT.address}
              <small>{CONTACT.hours}</small>
            </p>
          </div>
          <a href={CONTACT.phoneHref} className="z2-cb-phone">
            {CONTACT.phone}
          </a>
          <a href={`mailto:${CONTACT.email}`} className="z2-cb-mail">
            {CONTACT.email}
          </a>
          <div className="z2-cb-foot">
            <Socials className="z2-cb-soc" />
            <a
              href={CONTACT.map}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Xaritada köriş{' '}
              <span className="ic">
                <Arrow />
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

/** C: markazlaşgan aloqa bloki — manzil, ikki katta kanal, ijtimoiy tarmoq pillalari */
export function ContactC(_: P) {
  return (
    <section className="sec z2-cc-sec">
      <div className="wrap">
        <div className="z2-cc">
          <h2 className="h2">Aloqa</h2>
          <p className="z2-cc-addr">{CONTACT.address}</p>
          <p className="z2-cc-hours">{CONTACT.hours}</p>
          <div className="z2-cc-ch">
            <a href={CONTACT.phoneHref}>
              <small>Telefon</small>
              {CONTACT.phone}
            </a>
            <a href={`mailto:${CONTACT.email}`}>
              <small>Elektron poçta</small>
              {CONTACT.email}
            </a>
          </div>
          <Socials className="z2-cc-soc" />
          <a
            href={CONTACT.map}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            Xaritada köriş{' '}
            <span className="ic">
              <Arrow />
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}
