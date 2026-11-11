/* eslint-disable @next/next/no-img-element -- logotiplar kiçik, öz ölçamida */
import Link from 'next/link'
import type { CSSProperties } from 'react'

import { More } from '@/components/site/MoreBtn'

import { PARTNERS } from './data'

/**
 * Boş sahifa: “Hamkorlarimiz” — logotiplar tasmasi. Hamkorlar 6 tadan köp bölsa tasma sekin aylanadi,
 * kam bölsa bir qatorda turadi. Logotip bosilsa hamkorning saytiga, tugma — “Hamkorlar” sahifasiga.
 */
export function PartnersStrip({ locale }: { locale: string }) {
  const moving = PARTNERS.length > 5
  const row = PARTNERS.map((p) => (
    <a
      key={p.name}
      href={p.site ?? `/${locale}/biz-haqimizda/hamkorlar`}
      {...(p.site ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="pt-logo"
      title={p.name}
    >
      <img src={p.logo} alt={p.name} loading="lazy" />
    </a>
  ))
  return (
    <section className="sec pt-strip" aria-labelledby="pt-strip-h">
      <div className="wrap pt-strip-in">
        <div className="pt-strip-head">
          <h2 id="pt-strip-h" className="h2">
            Hamkorlarimiz
          </h2>
          <Link href={`/${locale}/biz-haqimizda/hamkorlar`} className="more-btn">
            <More>Barça hamkorlar</More>
          </Link>
        </div>
        {moving ? (
          <div className="pt-marquee">
            <div
              className="pt-track"
              style={{ '--dur': `${PARTNERS.length * 3}s` } as CSSProperties}
            >
              {row}
              <span aria-hidden="true" style={{ display: 'contents' }}>
                {row}
              </span>
            </div>
          </div>
        ) : (
          <div className="pt-row">{row}</div>
        )}
      </div>
    </section>
  )
}
