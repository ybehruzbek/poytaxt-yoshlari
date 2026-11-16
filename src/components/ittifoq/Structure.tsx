import Link from 'next/link'

import { More } from '@/components/site/MoreBtn'

import { type Body } from './data'
import type { IttifoqData } from '@/lib/cms/sahifalar'


function Meta({ items }: { items: string[] }) {
  return (
    <ul className="st-meta">
      {items.map((m) => (
        <li key={m}>{m}</li>
      ))}
    </ul>
  )
}

function Card({ b, cls, tag }: { b: Body; cls: string; tag?: string }) {
  return (
    <article className={`st-card ${cls}`}>
      {tag && <span className="st-tag">{tag}</span>}
      <h4>{b.t}</h4>
      <p>{b.d}</p>
      <Meta items={b.meta} />
    </article>
  )
}

/**
 * “Taşkiliy tuzilma” — Ittifoq Ustavi asosida:
 * 1) rahbar organlar va kim kimni saylaşi (5-bob), 2) taşkiliy tuzilma darajalari va
 * delegatlar saylov zanjiri (6-bob), 3) faoliyat tamoyillari (1-bob).
 */
export function Structure({ L, D }: { L: (h: string) => string; D: IttifoqData }) {
  const { STRUCTURE: S } = D
  return (
    <section className="sec st">
      <div className="wrap">
        <div className="sec-head st-head">
          <h2 className="h2">Taşkiliy tuzilma</h2>
          <Link href={L('/hujjatlar/normativ/ustav')} className="more-btn">
            <More>
              Batafsil<span className="sr-only">: Ustav matni</span>
            </More>
          </Link>
        </div>

        {/* ---------- 1. Rahbar organlar ---------- */}
        <h3 className="st-h">
          <span>1</span> Rahbar organlar
        </h3>
        <div className="st-org">
          <Card b={S.qurultoy} cls="is-top" tag="Oliy organ" />
          <div className="st-elect" aria-hidden="true">
            <span>saylaydi</span>
            <i className="st-br" />
          </div>
          <div className="st-row">
            <div className="st-col">
              <Card b={S.council} cls="is-council" />
              <div className="st-sub">
                <Card b={S.chair} cls="is-mini" />
                <Card b={S.exec} cls="is-mini" />
              </div>
            </div>
            <Card b={S.audit} cls="is-audit" tag="Nazorat" />
          </div>
        </div>

        {/* ---------- 2. Taşkiliy tuzilma ---------- */}
        <h3 className="st-h">
          <span>2</span> Taşkiliy tuzilma
        </h3>
        <div className="st-ladder">
          <ol className="st-levels">
            {S.levels.map((l, i) => (
              <li key={l.t} className={`st-level l${i + 1}`}>
                <span className="st-step">{i + 1}-daraja</span>
                <div className="st-level-b">
                  <h4>{l.t}</h4>
                  <p>{l.d}</p>
                  <Meta items={l.meta} />
                  {i === 0 && (
                    <p className="st-us">
                      <b>Toşkent şahar hududiy Kengaşi</b> — poytaxt yoşlari, oliy taʼlim
                      taşkilotlari hamda harbiy qismlar va muassasalardagi boşlanğiç taşkilotlar
                      bilan işlaydi.
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ol>
          <aside className="st-chain" aria-label="Delegatlar saylov zanjiri">
            <b>Saylov zanjiri</b>
            <ol>
              <li>Boşlanğiç taşkilot yiğilişi</li>
              <li>Mahalliy kengaş konferensiyasi</li>
              <li>Hududiy kengaş konferensiyasi</li>
              <li>Qurultoy</li>
            </ol>
            <p>
              Har bir daraja yuqori darajadagi konferensiyaga yoki Qurultoyga delegatlarni özi
              saylaydi.
            </p>
          </aside>
        </div>

        {/* ---------- 3. Tamoyillar ---------- */}
        <div className="st-princ">
          <b>Faoliyat tamoyillari</b>
          <ul>
            {S.principles.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
