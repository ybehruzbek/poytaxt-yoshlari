/* eslint-disable @next/next/no-img-element -- taqdimot suratlari; CMS ulanganda next/image ga o'tadi */
import Link from 'next/link'
import type { ReactNode } from 'react'

import { Arrow } from '@/components/site/SocialPhones'

import type { IttifoqData } from '@/lib/cms/sahifalar'

type H = { L: (h: string) => string; crumbs: ReactNode }

/**
 * Lenta suratlari — turli sohalardagi yoşlar (UzA): ikki qator bir-birini takrorlamaydi.
 * Manbalar: docs/matnlar/hero-suratlar.md
 */
const ROWS = [1, 2].map((r) =>
  Array.from(
    { length: 18 },
    (_, i) => `/img/ittifoq/lenta/${r}-${String(i + 1).padStart(2, '0')}.webp`,
  ),
)

/** Logotipdagi rasmiy nom — rasm uçun alt matn */
const LOGO_NAME: Record<string, string> = {
  uz: 'Özbekiston yoşlar ittifoqi',
  ru: 'Союз молодежи Узбекистана',
  en: 'Uzbekistan Youth Union',
}
const LOGO_H: Record<string, number> = { uz: 429, ru: 345, en: 445 }

/**
 * Sahifa boşi (oq fon): yöl; markazda Ittifoqning tilga mos logotipi (sarlavha) va şior yonma-yon;
 * ikki qator suratlar qarama-qarşi tomonga toxtovsiz suzib turadi; tugmalar suratlar tagida.
 */
export function Hero({ L, crumbs, D }: H & { D: IttifoqData }) {
  const { WHO } = D
  const locale = L('').replace(/\//g, '')
  const lc = locale in LOGO_NAME ? locale : 'uz'
  return (
    <section className="it-hero ith">
      <div className="wrap ith-top">
        <div className="it-crumbs">{crumbs}</div>
        {/* logotip (sarlavha) va şior bir öqda, orasida ingiçka ajratkiç */}
        <div className="ith-brand">
          <h1 className="ith-logo">
            <img
              src={`/img/ittifoq-logo-${lc}.png`}
              alt={LOGO_NAME[lc]}
              width={1040}
              height={LOGO_H[lc]}
            />
          </h1>
          <span className="ith-sep" aria-hidden="true" />
          <p className="ith-motto">
            {/* şior har doim ikki qatorda: “Yoşlar — kelajak / bunyodkori!” */}
            <span>{WHO.motto.slice(0, WHO.motto.lastIndexOf(' '))}</span>{' '}
            <span>{WHO.motto.slice(WHO.motto.lastIndexOf(' ') + 1)}</span>
          </p>
        </div>
      </div>
      <div className="ith-strip" aria-hidden="true">
        {ROWS.map((photos, row) => (
          <div key={row} className={`ith-row${row ? ' rev' : ''}`}>
            {[...photos, ...photos].map((s, i) => (
              <img key={i} src={s} alt="" loading={i < 8 ? 'eager' : 'lazy'} />
            ))}
          </div>
        ))}
      </div>
      <div className="wrap it-btns ith-btns">
        <Link href={L('/boglanish/azo-bolish')} className="btn btn-primary">
          Aʼzo böliş{' '}
          <span className="ic">
            <Arrow />
          </span>
        </Link>
        <Link href={L('/faoliyat/loyihalar')} className="btn btn-ghost">
          Loyihalarni köriş
          <span className="ic">
            <Arrow />
          </span>
        </Link>
      </div>
    </section>
  )
}
