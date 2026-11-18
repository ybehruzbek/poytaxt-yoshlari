/* eslint-disable @next/next/no-img-element -- fonsiz suratlar tayyor ölçamda (WebP) */
import Link from 'next/link'

import type { Locale } from '@/i18n/config'
import { getContests, getGrants, getStipends, getVolDirs } from '@/lib/cms/imkoniyatlar'
import { OPP_TYPES, type OppType, daysTo, deadlineLabel } from '@/lib/opps'
import { getBosh } from '@/lib/cms/sahifalar'
import { More } from './MoreBtn'
import { OppTheme } from './OppThemes'

/** Kartalar: fonsiz suratlar public/img/odamlar dan (ölçami — sahifa sakramasligi uçun) */
const CARDS: Array<{ t: OppType; href: string; name: string; img: string; w: number; cls: string }> = [
  { t: 'grant', href: '/faoliyat/grantlar', name: 'Grantlar', img: 'grantlar', w: 714, cls: 'o1' },
  { t: 'stip', href: '/faoliyat/stipendiyalar', name: 'Stipendiyalar', img: 'stipendiyalar', w: 727, cls: 'o2' },
  // yigit, qiz, yigit, qiz — navbatma-navbat
  { t: 'tanlov', href: '/faoliyat/tanlovlar', name: 'Tanlovlar', img: 'tanlovlar', w: 666, cls: 'o3' },
  { t: 'vol', href: '/faoliyat/volontyorlik', name: 'Volontyorlik', img: 'volontyorlik', w: 764, cls: 'o4' },
]

/** Karta oçilganda çiqadigan maʼlumot: qisqa tavsif, faol dasturlar soni, eng yaqin muddat va “Batafsil” */
type Lists = Record<OppType, Array<{ deadline?: string }>>

function OppInfo({ t, lists, desc }: { t: OppType; lists: Lists; desc: string }) {
  const list = lists[t]
  const next =
    list
      .map((o) => o.deadline)
      .filter((d): d is string => !!d && (daysTo(d) ?? 0) > 0)
      .sort()[0] ?? null
  return (
    <div className="opp-info">
      <p>{desc}</p>
      <div className="opp-meta">
        <span>
          <b>{list.length}</b> {t === 'vol' ? 'ta yönaliş' : 'ta dastur'}
        </span>
        <span>
          {next ? (
            <>
              Eng yaqin muddat: <b>{deadlineLabel(next)}</b>
            </>
          ) : (
            <b>{t === 'grant' || t === 'vol' ? 'Doimiy qabul' : 'Har yili tanlov'}</b>
          )}
        </span>
      </div>
      <span className="opp-more more-btn">
        <More />
      </span>
    </div>
  )
}

/**
 * Yoşlar uçun imkoniyatlar: rangli kartalar bir qatorda; sukut böyiça “Grantlar” oçiq, boşqa karta ustiga
 * kelinsa (yoki fokus) öşa oçiladi: katta sarlavha va izoh, odam karta çetida, orqada yönalişning öz belgilari,
 * pastda maʼlumot paneli. Telefon va planşetda hamma kartalar oçiq holatda.
 */
export async function Opportunities({ locale }: { locale: Locale }) {
  const [grant, stip, tanlov, vol, { opps: O }] = await Promise.all([
    getGrants(locale),
    getStipends(locale),
    getContests(locale),
    getVolDirs(locale),
    getBosh(locale),
  ])
  const lists = { grant, stip, tanlov, vol: vol.map(() => ({})) } as Lists
  const text = (t: OppType) => {
    const base = OPP_TYPES.find((x) => x.key === t)!
    return { lead: O[t].lead || base.lead, desc: O[t].desc || base.desc }
  }
  return (
    <section className="sec" id="imkoniyatlar">
      <div className="wrap">
        <h2 className="h2 opps-title">
          {O.title} <span>{O.accent}</span>
        </h2>
        <div className="opps">
          {CARDS.map((c, i) => {
            const { lead, desc } = text(c.t)
            return (
              <Link key={c.t} href={`/${locale}${c.href}`} className={`opp ${c.cls}${i === 0 ? ' big' : ''}`}>
                <OppTheme t={c.t} />
                <div className="title">
                  <b>{c.name}</b>
                  <span>{lead}</span>
                </div>
                <img className="opp-cut" src={`/img/odamlar/${c.img}.webp`} width={c.w} height={1200} alt="" loading="lazy" decoding="async" />
                <OppInfo t={c.t} lists={lists} desc={desc} />
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
