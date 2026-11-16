/* eslint-disable @next/next/no-img-element -- logotiplar kiçik, öz ölçamida */
import Link from 'next/link'
import type { CSSProperties } from 'react'

import { More } from '@/components/site/MoreBtn'

import type { Partner } from './data'
import { getPartners } from '@/lib/cms/biz'

/** Bitta aylanuvçi tasma: logotiplar berilgan tartibda, cheksiz takrorlanadi */
function Track({ list, locale, reverse }: { list: Partner[]; locale: string; reverse?: boolean }) {
  const row = list.map((p) => (
    <a
      key={p.k}
      href={p.site ?? `/${locale}/biz-haqimizda/hamkorlar`}
      {...(p.site ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="pt-logo"
      title={p.name}
    >
      <img
        src={p.logo}
        alt={p.name}
        loading="lazy"
        style={p.logoH ? { height: Math.min(p.logoH, 72) } : undefined}
      />
    </a>
  ))
  return (
    <div className="pt-marquee">
      <div
        className={`pt-track${reverse ? ' pt-track--rev' : ''}`}
        style={{ '--dur': `${list.length * 3}s` } as CSSProperties}
      >
        {row}
        <span aria-hidden="true" style={{ display: 'contents' }}>
          {row}
        </span>
      </div>
    </div>
  )
}

/**
 * Boş sahifa: “Hamkor taşkilotlar” — ikki aylanuvçi tasma: Özbekistondagi hamkorlar (toifalar tartibida)
 * va xalqaro hamkorlar (mintaqalar tartibida). Logotip bosilsa hamkorning saytiga ötiladi.
 */
export async function PartnersStrip({ locale }: { locale: string }) {
  const { domestic: DOMESTIC, foreign: FOREIGN } = await getPartners(locale)
  return (
    <section className="sec pt-strip" aria-labelledby="pt-strip-h">
      <div className="wrap pt-strip-in">
        <div className="pt-strip-head">
          <h2 id="pt-strip-h" className="h2">
            Hamkor taşkilotlar
          </h2>
          <Link href={`/${locale}/biz-haqimizda/hamkorlar`} className="more-btn">
            <More>
              Batafsil<span className="sr-only">: Barça hamkorlar</span>
            </More>
          </Link>
        </div>
        <p className="pt-strip-l">Özbekistondagi hamkorlar</p>
        <Track list={DOMESTIC} locale={locale} />
        <p className="pt-strip-l">Xalqaro hamkorlar</p>
        <Track list={FOREIGN} locale={locale} reverse />
      </div>
    </section>
  )
}
