'use client'

/* eslint-disable @next/next/no-img-element -- bayroq tasvirlari */

import type { ReactNode } from 'react'

import { More } from '@/components/site/MoreBtn'
import { MoreList } from '@/components/site/MoreToggle'
import { nbsp } from '@/lib/nbsp'
import { daysTo, deadlineLabel } from '@/lib/opps'

import { useMiqdor } from '@/components/site/MiqdorProvider'
import { som } from '@/lib/miqdorlar'

import { stipBadge, type Stipend } from './data'

/** Holat yorliği: ariza muddati davom etayotgan bölsa — qolgan kunlar, aks holda navbatdagi tanlov */
function Status({ s }: { s: Stipend }) {
  const d = daysTo(s.deadline ?? null)
  if (s.deadline && d !== null && d > 0)
    return (
      <span className="gr-st gr-st-open">
        Ariza qabul qilinmoqda · {deadlineLabel(s.deadline)}gacha{d <= 30 ? ` · ${d} kun qoldi` : ''}
      </span>
    )
  if (s.cat === 'davlat') return <span className="gr-st">Har yili tayinlanadi</span>
  if (/^Dasturga qarab/.test(s.cycle))
    return <span className="gr-st">Muddat dasturga qarab belgilanadi</span>
  return <span className="gr-st">Navbatdagi tanlov kutilmoqda</span>
}

/* ===================== yangi variantlar ===================== */


/** Xorijiy dasturlar bayroqlari (flagcdn.com, jamoat mulki) */
const FLAG: Record<string, string> = {
  'el-yurt-umidi': 'uz',
  chevening: 'gb',
  fulbright: 'us',
  daad: 'de',
  'stipendium-hungaricum': 'hu',
  'turkiye-burslari': 'tr',
  gks: 'kr',
  mext: 'jp',
  'erasmus-mundus': 'eu',
  csc: 'cn',
}
const Flag = ({ id, flag }: { id: string; flag?: string }) => (
  <img className="sx-flag" src={`/img/bayroqlar/${flag ?? FLAG[id] ?? 'uz'}.png`} alt="" loading="lazy" decoding="async" />
)

/* ikonkalar (24×24, çiziqli) */
const P = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const
const I: Record<string, ReactNode> = {
  yulduz: <path d="M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.4 6.8 19.1l1-5.8-4.3-4.1 5.9-.9z" />,
  kitob: (
    <>
      <path d="M12 6c-2-1.6-5-1.6-8-.6v13c3-1 6-1 8 .6 2-1.6 5-1.6 8-.6v-13c-3-1-6-1-8 .6z" />
      <path d="M12 6v13" />
    </>
  ),
  globus: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.5 2.5 3.5 5.5 3.5 8.5s-1 6-3.5 8.5c-2.5-2.5-3.5-5.5-3.5-8.5s1-6 3.5-8.5z" />
    </>
  ),
  oy: (
    <>
      <path d="M15.5 4.5a8 8 0 1 0 4 12 6.5 6.5 0 1 1-4-12z" />
      <path d="m17 7 .6 1.3 1.4.2-1 1 .2 1.4-1.2-.7-1.2.7.2-1.4-1-1 1.4-.2z" />
    </>
  ),
  tishli: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M5.3 18.7l2.1-2.1M16.6 7.4l2.1-2.1" />
    </>
  ),
  tibbiyot: (
    <>
      <path d="M6 3H5v5a4.5 4.5 0 0 0 9 0V3h-1" />
      <path d="M9.5 12.5v2a5 5 0 0 0 10 0v-2.5" />
      <circle cx="19.5" cy="10" r="2" />
    </>
  ),
  yurak: (
    <>
      <path d="M12 20s-7.5-4.6-7.5-10.2A4.2 4.2 0 0 1 12 7.2a4.2 4.2 0 0 1 7.5 2.6C19.5 15.4 12 20 12 20z" />
      <path d="M4.8 12.5h3.4l1.6-2.8 2.4 5 1.6-2.2h5.4" />
    </>
  ),
  qalpoq: (
    <>
      <path d="M2.5 9 12 4.5 21.5 9 12 13.5z" />
      <path d="M6.5 11v4.5c1.5 1.6 3.4 2.4 5.5 2.4s4-.8 5.5-2.4V11M21.5 9v5" />
    </>
  ),
  atom: (
    <>
      <circle cx="12" cy="12" r="1.6" />
      <ellipse cx="12" cy="12" rx="9" ry="3.6" />
      <ellipse cx="12" cy="12" rx="9" ry="3.6" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="9" ry="3.6" transform="rotate(-60 12 12)" />
    </>
  ),
  medal: (
    <>
      <circle cx="12" cy="9" r="5" />
      <path d="M8.6 13.3 7 21l5-2.6 5 2.6-1.6-7.7" />
    </>
  ),
  qalqon: (
    <>
      <path d="M12 3 5 6v6c0 4 3 7.5 7 9 4-1.5 7-5 7-9V6z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  kalendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15.5" rx="3" />
      <path d="M3.5 10h17M8 3v4M16 3v4M8 14h2M14 14h2M8 17h2" />
    </>
  ),
  qalam: (
    <>
      <path d="M4 20l1.2-4.8L15.5 4.9a2 2 0 0 1 2.8 0l.8.8a2 2 0 0 1 0 2.8L8.8 18.8z" />
      <path d="m13.5 7 3.5 3.5M4 20h7" />
    </>
  ),
  pero: (
    <>
      <path d="M20 4c-7 .5-12 5-13 13" />
      <path d="M20 4c.5 6.5-4.5 11-11 11.5" />
      <path d="M10 10.5h4.5M4 20l3-3" />
    </>
  ),
}
const Ic = ({ n, cls = 'sx-ic' }: { n: string; cls?: string }) => (
  <span className={cls} aria-hidden="true">
    <svg viewBox="0 0 24 24" {...P}>
      {I[n]}
    </svg>
  </span>
)

/** Nomli stipendiyalar: yönaliş va ikonka */
const NAMED_META: Record<string, [string, string]> = {
  'islom-karimov': ['yulduz', 'Barcha yo‘nalishlar'],
  navoiy: ['kitob', 'Gumanitar fanlar'],
  bobur: ['globus', 'Tarix va geografiya'],
  'imom-buxoriy': ['oy', 'Islomshunoslik'],
  beruniy: ['tishli', 'Texnika'],
  'ibn-sino': ['yurak', 'Tibbiyot'],
  avloniy: ['qalpoq', 'Pedagogika'],
  ulugbek: ['atom', 'Tabiiy fanlar'],
  qaipbergenov: ['qalam', 'Qoraqalpog‘iston OTTlari'],
  yusupov: ['pero', 'Qoraqalpog‘iston OTTlari'],
  'pahlavon-mahmud': ['medal', 'Jismoniy madaniyat va sport'],
}
const Btn = ({ s }: { s: Stipend }) => (
  <a className="more-btn" href={s.url} target="_blank" rel="noopener noreferrer">
    <More />
  </a>
)

/** Xorijiy dastur kartasi (bayroq bilan) */
function ForeignCard({ s, big }: { s: Stipend; big?: boolean }) {
  const M = useMiqdor()
  return (
    <article className={`sx-fc${big ? ' big' : ''}`}>
      <div className="sx-fc-top">
        <Flag id={s.id} flag={s.flag} />
        <span>{stipBadge(s, M).v}</span>
      </div>
      <Status s={s} />
      <h4>{nbsp(s.t)}</h4>
      <p>{nbsp(s.perk)}</p>
      <dl>
        <div>
          <dt>Kimlar uchun</dt>
          <dd>{nbsp(s.who)}</dd>
        </div>
        <div>
          <dt>Ariza qabuli</dt>
          <dd>{nbsp(s.cycle)}</dd>
        </div>
      </dl>
      <Btn s={s} />
    </article>
  )
}

/** Prezident stipendiyasi kartasidagi taqqoslaş: bazaviy, nomli va Prezident stipendiyalari */
const cmp = (M: ReturnType<typeof useMiqdor>) => [
  { t: 'Bazaviy stipendiya', v: M.STIP_BAZA.v },
  { t: 'Nomli davlat stipendiyasi', v: M.STIP_SUM.nomli },
  { t: 'Prezident stipendiyasi', v: M.STIP_SUM.prezident, top: true },
]
/** “Oylik stipendiya — …; ” qismisiz imtiyoz matni (miqdor kartaning çap qismida körsatilgan) */
const perkOnly = (t: string) => {
  const r = t.replace(/^Oylik stipendiya — [^;]+;\s*/, '')
  return r.charAt(0).toUpperCase() + r.slice(1)
}

/** Kvota va ilmiy iş talabi — matnning dastlabki ikki gapi */
const presRule = (t: string) =>
  t
    .split(/(?<=\.)\s+/)
    .slice(0, 2)
    .join(' ')

/**
 * Stipendiyalar röyxati: Prezident stipendiyasi, nomli davlat stipendiyalari, idoraviy stipendiyalar
 * va xorijda taʼlim dasturlari.
 */
export function StipendsList({ stipends }: { stipends: Stipend[] }) {
  const M = useMiqdor()
  const CMP = cmp(M)
  // bloklar admin paneldagi “Sahifadagi örni” böyiça: Prezident, nomli, idoraviy, xorijiy
  const pres = stipends.find((x) => x.turi === 'prezident')
  const named = stipends.filter((x) => x.turi === 'nomli')
  const dept = stipends.filter((x) => x.turi === 'idoraviy')
  const FOREIGN = stipends.filter((x) => x.turi === 'xorij')
  const n0 = named[0]
  if (!pres || !n0) return null
  return (
    <div className="sx-d">
      <h3 className="sx-h">Davlat stipendiyalari</h3>
      <article className="sx-hero">
        <div className="sx-hero-l">
          <Ic n="yulduz" cls="sx-ic sx-ic-big" />
          <ul className="sx-cmp" aria-label="Oylik stipendiyalar miqdorini taqqoslash">
            {CMP.map((c) => (
              <li key={c.t} className={c.top ? 'top' : undefined}>
                <span>{c.t}</span>
                <b>{som(c.v)}</b>
                <i style={{ width: `${(c.v / CMP[CMP.length - 1].v) * 100}%` }} />
              </li>
            ))}
          </ul>
          <small>{stipBadge(pres, M).l}</small>
          <b>{nbsp(stipBadge(pres, M).v)}</b>
        </div>
        <div className="sx-hero-r">
          <Status s={pres} />
          <h4>{nbsp(pres.t)}</h4>
          <dl>
            <div>
              <dt>Kimlar uchun</dt>
              <dd>{nbsp(pres.who)}</dd>
            </div>
            <div>
              <dt>Imtiyoz</dt>
              <dd>{nbsp(perkOnly(pres.perk))}</dd>
            </div>
            <div>
              <dt>Ariza qabuli</dt>
              <dd>{nbsp(pres.cycle)}</dd>
            </div>
          </dl>
          <p className="sx-hero-note">{nbsp(presRule(pres.text))}</p>
          <Btn s={pres} />
        </div>
      </article>
      <section className="sx-named">
        <div className="sx-named-head">
          <div>
            <h4>Nomli davlat stipendiyalari</h4>
            <p>
              Oxirgi ikki kurs talabalariga beriladi: barcha fanlardan “a’lo” baholar (ko‘pi bilan 25
              foizi “yaxshi”), ilmiy yoki ijodiy faollik. Sohiblari bitirgandan keyin bir yil
              davomida magistraturaga imtihonsiz qabul qilinadi.
            </p>
          </div>
          <div className="sx-named-sum">
            <small>Har bir stipendiya · {stipBadge(n0, M).l.replace('Oylik miqdori · ', '')}</small>
            <b>{nbsp(stipBadge(n0, M).v)}</b>
            <span>{named.length} ta stipendiya</span>
          </div>
        </div>
        <ul>
          {named.map((x) => (
            <li key={x.id}>
              <Ic n={x.icon ?? NAMED_META[x.id]?.[0] ?? 'yulduz'} />
              <b>{nbsp(x.t)}</b>
              <small>{x.soha ?? NAMED_META[x.id]?.[1] ?? ''}</small>
            </li>
          ))}
          <li className="sx-named-cta on-dark">
            <Ic n="kalendar" />
            <b>Ariza qabuli — avgust oyi</b>
            <small>Har yili, my.edu.uz orqali</small>
            <Btn s={n0} />
          </li>
        </ul>
      </section>
      <div className="sx-dept">
        {dept.map((x) => {
          return (
            <article key={x.id}>
              <Ic n={x.icon ?? 'qalqon'} />
              <div>
                <Status s={x} />
                <h4>{nbsp(x.t)}</h4>
                <p>{nbsp(x.perk)}</p>
                <small>
                  <b>Kimlar uchun:</b> {nbsp(x.who)}
                </small>
              </div>
              <Btn s={x} />
            </article>
          )
        })}
      </div>
      <h3 className="sx-h">Xorijda ta’lim</h3>
      {/* 3 ustunli setka: 0- va 5-kartalar ikki ustunli — har 5 tadan iborat guruh ikki qatorni töla egallaydi */}
      <MoreList className="sx-fgrid" id="xorijiy-stipendiyalar" noun="dastur" first={5} step={5}>
        {FOREIGN.map((x, i) => (
          <ForeignCard key={x.id} s={x} big={i % 5 === 0} />
        ))}
      </MoreList>
    </div>
  )
}
