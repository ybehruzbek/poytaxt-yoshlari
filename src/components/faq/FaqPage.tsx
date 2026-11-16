'use client'

import Link from 'next/link'
import { type ReactNode, useState } from 'react'

import { More } from '@/components/site/MoreBtn'

import { type Faq, FAQ_CATS, type FaqCat } from './data'
import { FaqItem } from './FaqItem'

const low = (s: string) => s.toLocaleLowerCase('uz')

/**
 * “Köp beriladigan savollar” sahifasi: mavzu böyiça saralaş (son bilan), qidiruv,
 * mavzular böyiça guruhlangan savollar va pastda “Boşqa savollar böyiça murojaat” bloki.
 */
export function FaqPage({ crumbs, base, faqs: FAQ }: { crumbs: ReactNode; base: string; faqs: Faq[] }) {
  const [cat, setCat] = useState<'all' | FaqCat>('all')
  const [q, setQ] = useState('')
  const s = low(q.trim())
  const list = FAQ.filter(
    (f) =>
      (cat === 'all' || f.cat === cat) &&
      (!s || low([f.q, ...f.a, ...(f.li ?? [])].join(' ')).includes(s)),
  )

  return (
    <div className="faq">
      <header className="pg-head">
        <div className="wrap">
          {crumbs}
          <h1 className="h2 pg-title">Köp beriladigan savollar</h1>
        </div>
      </header>

      <section className="sec faq-sec">
        <div className="wrap">
          <div className="faq-tools">
            <div className="chips faq-rub" role="group" aria-label="Mavzular">
              <button type="button" aria-pressed={cat === 'all'} onClick={() => setCat('all')}>
                Barçasi <span>{FAQ.length}</span>
              </button>
              {FAQ_CATS.map((c) => (
                <button
                  key={c.k}
                  type="button"
                  aria-pressed={cat === c.k}
                  onClick={() => setCat(c.k)}
                >
                  {c.t} <span>{FAQ.filter((f) => f.cat === c.k).length}</span>
                </button>
              ))}
            </div>
            <label className="faq-search">
              <span className="sr-only">Savollardan qidiriş</span>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-4-4" />
              </svg>
              <input
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Savol yoki kalit söz"
              />
            </label>
          </div>

          {list.length === 0 && (
            <p className="faq-none" role="status">
              Kiritilgan söz böyiça savol topilmadi. Savolingizni quyidagi murojaat şakli orqali
              yuborişingiz mumkin.
            </p>
          )}

          {FAQ_CATS.map((c) => {
            const items = list.filter((f) => f.cat === c.k)
            if (!items.length) return null
            return (
              <section key={c.k} className="faq-grp" aria-labelledby={`faq-${c.k}`}>
                <h2 id={`faq-${c.k}`}>{c.t}</h2>
                <div className="faq-list">
                  {items.map((f) => (
                    <FaqItem key={f.id} f={f} base={base} />
                  ))}
                </div>
              </section>
            )
          })}

          <aside className="faq-ask">
            <div>
              <h2>Boşqa savollar böyiça murojaat</h2>
              <p>
                Savolingizni murojaat şakli orqali yuborişingiz mumkin. Masʼul xodim uni körib
                çiqqaç, siz bilan boğlanadi.
              </p>
            </div>
            <Link href={`${base}/boglanish/murojaat`} className="more-btn">
              <More>
                Batafsil<span className="sr-only">: Murojaat yuboriş</span>
              </More>
            </Link>
          </aside>
        </div>
      </section>
    </div>
  )
}
