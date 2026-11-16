/* eslint-disable @next/next/no-img-element -- blanka logotipi statik PNG */
import { fullDate } from './data'
import { ABOUT, ORG, PRESS_KINDS, type PressItem } from './press'
import type { PressContactT } from '@/lib/cms/aloqa'

/**
 * Press-relizning rasmiy blankasi: Kengaş logotipi, tur, sana va şahar, sarlavha,
 * birinçi xatboşi (eng muhim fakt), matn, raqamlar, “Kengaş haqida” va OAV uçun aloqa.
 * Çop etilganda (Ctrl+P / “Çop etiş”) faqat şu blanka qoğozga çiqadi.
 * `level` — sarlavha darajasi: alohida sahifada 1 (sahifaning H1), röyxat ičida 2.
 */
export function PressDoc({ p, id, level = 2, contact: PRESS_CONTACT }: { p: PressItem; id?: string; level?: 1 | 2; contact: PressContactT }) {
  const Title = level === 1 ? 'h1' : 'h2'
  return (
    <article className={`pr-doc k-${p.kind}`} id={id} data-print-doc="">
      <header className="pr-doc-head">
        <img src="/img/logo-uz.png" alt={ORG} />
        <div>
          <b>{PRESS_KINDS[p.kind].toUpperCase()}</b>
          <span>Axborot xizmati</span>
        </div>
      </header>

      <p className="pr-dateline">
        Toşkent, {fullDate(p.date)}
      </p>
      <Title className="pr-doc-title">{p.title}</Title>

      {p.event && (
        <dl className="pr-event">
          <div>
            <dt>Sana</dt>
            <dd>{p.event.when}</dd>
          </div>
          {p.event.time && (
            <div>
              <dt>Vaqt</dt>
              <dd>{p.event.time}</dd>
            </div>
          )}
          <div>
            <dt>Manzil</dt>
            <dd>{p.event.place}</dd>
          </div>
        </dl>
      )}

      <p className="pr-lead">{p.lead}</p>
      {p.body.map((t, i) => (
        <p key={i} className="pr-p">
          {t}
        </p>
      ))}

      {p.facts && (
        <ul className="pr-facts" aria-label="Asosiy raqamlar">
          {p.facts.map((f) => (
            <li key={f.k}>
              <b>{f.v}</b>
              <span>{f.k}</span>
            </li>
          ))}
        </ul>
      )}

      <p className="pr-end" aria-hidden="true">
        ###
      </p>

      <footer className="pr-doc-foot">
        <section>
          <h3>Kengaş haqida</h3>
          <p>{ABOUT}</p>
        </section>
        <section>
          <h3>OAV uçun aloqa</h3>
          <p>
            {PRESS_CONTACT.unit}
            <br />
            <a href={PRESS_CONTACT.phone.href}>{PRESS_CONTACT.phone.v}</a>
            <br />
            <a href={PRESS_CONTACT.email.href}>{PRESS_CONTACT.email.v}</a>
          </p>
        </section>
      </footer>
    </article>
  )
}
