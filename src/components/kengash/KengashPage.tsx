/* eslint-disable @next/next/no-img-element -- taqdimotdan olingan surat; CMS ulanganda next/image ga o'tadi */
import Link from 'next/link'
import type { ReactNode } from 'react'

import { Arrow } from '@/components/site/SocialPhones'

import { getKengash } from '@/lib/cms/sahifalar'
import { Members } from './Members'
import { Powers } from './Powers'

type P = { L: (h: string) => string; crumbs: ReactNode; siblings: ReactNode }

/** Bölimlar tartibi */
const ORDER = ['kab', 'kor', 'kva', 'kta', 'kra', 'kij', 'kal'] as const

const pad = (i: number) => String(i + 1).padStart(2, '0')
const initials = (s: string) =>
  s
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')

/**
 * “Markaziy Kengaş” sahifasi (mazmun: components/kengash/data.ts, Ustav V bob):
 * yöl va sarlavha, kengaş haqida, boşqaruv tizimi, vakolatlari, tarkibi, rahbariyat, ijroiya qömitasi va komissiya,
 * qarorlar va yiğilişlar, aloqa.
 */
export async function KengashPage({ L, crumbs, siblings }: P) {
  const { ABOUT, BODIES, CONTACT, IMG, LEADERS, ORGANS, STATS, MEMBERS, POWERS } = await getKengash(L('').split('/')[1] || 'uz')
  const sections: Record<string, ReactNode> = {
    kab: (
      <section className="sec">
        <div className="wrap">
          <div className="it-who">
            <div>
              <h2 className="h2">Kengaş haqida</h2>
              <p className="it-motto">{ABOUT.lead}</p>
            </div>
            <div className="it-who-txt">
              {ABOUT.paras.map((t) => (
                <p key={t}>{t}</p>
              ))}
            </div>
          </div>
          <div className="it-stats">
            {STATS.map((s) => (
              <div key={s.l}>
                <b>{s.v}</b>
                <span>{s.l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    ),
    kor: (
      <section className="sec">
        <div className="wrap">
          <div className="sec-head">
            <h2 className="h2">Ittifoqning boşqaruv tizimi</h2>
          </div>
          {/* Markaziy Kengaş (2-örin) sariq tasmada ajratiladi */}
          <ol className="y1-oc">
            {ORGANS.map((o, i) => (
              <li key={o.t} className={i === 1 ? 'on' : undefined}>
                <span className="y1-oc-num">{pad(i)}</span>
                <h3>{o.t}</h3>
                <p>{o.d}</p>
                {o.meta && <b>{o.meta}</b>}
              </li>
            ))}
          </ol>
        </div>
      </section>
    ),
    kva: (
      <section className="sec">
        <div className="wrap">
          <div className="sec-head">
            <h2 className="h2">Vakolatlari</h2>
          </div>
          <Powers POWERS={POWERS} />
        </div>
      </section>
    ),
    kta: (
      <section className="sec">
        <div className="wrap">
          <div className="sec-head">
            <h2 className="h2">Kengaş tarkibi</h2>
          </div>
          <Members MEMBERS={MEMBERS} />
        </div>
      </section>
    ),
    kra: (
      <section className="sec kg-lead-sec">
        <div className="wrap">
          <div className="sec-head">
            <h2 className="h2">Rahbariyat</h2>
          </div>
          <div className="kg-lead">
            {LEADERS.map((p) => (
              <article key={p.name} className={p.career ? 'kg-bio' : undefined}>
                <div className="kg-ava">
                  {p.img ? (
                    <img src={p.img} alt={p.full ?? p.name} loading="lazy" decoding="async" />
                  ) : (
                    <span>{initials(p.name)}</span>
                  )}
                </div>
                <div className="kg-bio-txt">
                  <h3>{p.full ?? p.name}</h3>
                  <p className="kg-bio-role">{p.role}</p>
                  {p.born && <p className="kg-bio-born">{p.born}</p>}
                  {p.edu && (
                    <>
                      <h4>Maʼlumoti</h4>
                      <ul className="kg-bio-edu">
                        {p.edu.map((x) => (
                          <li key={x}>{x}</li>
                        ))}
                      </ul>
                    </>
                  )}
                  {p.career && (
                    <>
                      <h4>Mehnat faoliyati</h4>
                      <ol className="kg-bio-car">
                        {p.career.map((c) => (
                          <li key={c.y + c.t}>
                            <b>{c.y}</b>
                            <span>{c.t}</span>
                          </li>
                        ))}
                      </ol>
                    </>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    ),
    kij: (
      <section className="sec">
        <div className="wrap">
          <div className="kg-bod">
            {BODIES.map((b) => (
              <article key={b.t}>
                <span className="kg-bod-meta">{b.meta}</span>
                <h3>{b.t}</h3>
                <p>{b.d}</p>
                <ul>
                  {b.items.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>
    ),
    kal: (
      <section className="sec">
        <div className="wrap kg-con">
          <div>
            <h2 className="h2">Aloqa</h2>
            <p className="kg-con-addr">{CONTACT.address}</p>
            <div className="it-btns">
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
              <Link href={L('/boglanish/murojaat')} className="btn btn-ghost it-ghost">
                Murojaat yuboriş
                <span className="ic">
                  <Arrow />
                </span>
              </Link>
            </div>
          </div>
          <img src={IMG.building} alt="Özbekiston yoşlar ittifoqi Markaziy Kengaşi binosi" loading="lazy" decoding="async" />
        </div>
      </section>
    ),
  }

  return (
    <div className="it kg">
      <header className="pg-head">
        <div className="wrap">
          {crumbs}
          <h1 className="h2 pg-title">Markaziy Kengaş</h1>
        </div>
      </header>

      {ORDER.map((name) => (
        <div key={name} style={{ display: 'contents' }}>
          {sections[name]}
        </div>
      ))}

      <section className="sec">
        <div className="wrap">{siblings}</div>
      </section>
    </div>
  )
}
