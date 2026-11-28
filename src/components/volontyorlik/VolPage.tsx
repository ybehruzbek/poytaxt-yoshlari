/* eslint-disable @next/next/no-img-element -- Kengaş kanalidagi tadbir suratlari */
import type { ReactNode } from 'react'

import { fmtDate, TG } from '@/components/faoliyat/types'
import { ShowMore } from '@/components/ittifoq/ShowMore'
import { More } from '@/components/site/MoreBtn'
import { getFaoliyat } from '@/lib/cms/faoliyat'
import { getVolDirs } from '@/lib/cms/imkoniyatlar'

import { getVolSahifa } from '@/lib/cms/sahifalar'
import { VolInteractive } from './VolClient'


/** “Volontyorlik” sahifasi: yöl, sarlavha, raqamlar, yönalişlar, test, tartib, ariza, huquqlar, tadbirlar */
export async function VolPage({ crumbs, projectHref, locale = 'uz' }: { crumbs: ReactNode; projectHref: string; locale?: string }) {
  // Kengaş volontyorlari iştirok etgan tadbirlar (faoliyat yönalişi — “volontyorlik”)
  const VOL_EVENTS = (await getFaoliyat(locale)).events
    .filter((e) => e.dir === 'volontyorlik' && e.img)
    .sort((a, b) => b.date.localeCompare(a.date))
  const V = await getVolSahifa(locale)
  const { DUTIES, LAW, RIGHTS, STEPS } = V
  const steps = (
    <section className="sec">
      <div className="wrap">
        <div className="sec-head">
          <h2 className="h2">Volontyor bo‘lish tartibi</h2>
        </div>
        <ol className="vl-steps">
          {STEPS.map((s, i) => (
            <li key={s.t}>
              <span>{i + 1}</span>
              <h3>{s.t}</h3>
              <p>{s.d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
  return (
    <div className="vl">
      <header className="pg-head">
        <div className="wrap">
          {crumbs}
          <h1 className="h2 pg-title">Volontyorlik</h1>
          <ul className="vl-stats">
            {V.STATS.map((s) => (
              <li key={s.t}>
                <b>{s.v.replace('{TADBIRLAR}', String(VOL_EVENTS.length))}</b>
                <span>{s.t}</span>
              </li>
            ))}
          </ul>
        </div>
      </header>
      <VolInteractive steps={steps} dirs={await getVolDirs(locale)} page={{ LAW, QUIZ: V.QUIZ, TIMES: V.TIMES }} />
      <section className="sec">
        <div className="wrap">
          <div className="sec-head">
            <h2 className="h2">Volontyorning huquq va majburiyatlari</h2>
          </div>
          <div className="vl-law">
            <div>
              <h3>Volontyor huquqlari</h3>
              <ul>
                {RIGHTS.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3>Volontyor majburiyatlari</h3>
              <ul>
                {DUTIES.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </div>
            <p className="vl-law-src">
              {LAW.t} ({LAW.no}), 12-modda.{' '}
              <a href={LAW.url} target="_blank" rel="noopener noreferrer">
                Qonun matni — lex.uz
              </a>
            </p>
          </div>
        </div>
      </section>
      <section className="sec">
        <div className="wrap">
          <div className="sec-head vl-ev-head">
            <h2 className="h2">Kengash volontyorlari faoliyatidan</h2>
            <a className="more-btn" href={projectHref}>
              <More />
            </a>
          </div>
          <ul className="vl-ev" id="volontyorlik-tadbirlar">
            {VOL_EVENTS.map((e) => (
              <li key={e.id}>
                <a href={TG(e.id)} target="_blank" rel="noopener noreferrer">
                  <img src={e.img} alt="" loading="lazy" />
                  <time dateTime={e.date}>{fmtDate(e.date)}</time>
                  <h3>{e.title}</h3>
                  <p>{e.summary}</p>
                </a>
              </li>
            ))}
          </ul>
          <ShowMore target="volontyorlik-tadbirlar" noun="tadbir" />
        </div>
      </section>
    </div>
  )
}
