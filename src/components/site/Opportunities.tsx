/* eslint-disable @next/next/no-img-element -- prototip rasmlari; CMS ulanganda next/image ga o'tadi */
import Link from 'next/link'

import type { Locale } from '@/i18n/config'
import { getContests, getGrants, getStipends, getVolDirs } from '@/lib/cms/imkoniyatlar'
import { OPP_TYPES, type OppType, daysTo, deadlineLabel } from '@/lib/opps'
import { type BoshData, getBosh } from '@/lib/cms/sahifalar'
import { More } from './MoreBtn'

/** Kartalar: fonsiz suratlar public/img/odamlar dan (ölçami — sahifa sakramasligi uçun) */
const CARDS = [
  { t: 'grant', href: '/faoliyat/grantlar', name: 'Grantlar', img: 'grantlar', w: 714, cls: 'o1' },
  { t: 'stip', href: '/faoliyat/stipendiyalar', name: 'Stipendiyalar', img: 'stipendiyalar', w: 727, cls: 'o2' },
  { t: 'vol', href: '/faoliyat/volontyorlik', name: 'Volontyorlik', img: 'volontyorlik', w: 764, cls: 'o3' },
  { t: 'tanlov', href: '/faoliyat/tanlovlar', name: 'Tanlovlar', img: 'tanlovlar', w: 666, cls: 'o4' },
] as const
type Card = (typeof CARDS)[number]

const Cut = ({ c, className }: { c: Card; className: string }) => (
  <img className={className} src={`/img/odamlar/${c.img}.webp`} width={c.w} height={1200} alt="" loading="lazy" decoding="async" />
)

/** Karta uçun qisqa maʼlumot: faol dasturlar soni va eng yaqin muddat (raqam va birlik bölinmaydi) */
function meta(t: OppType, lists: Lists) {
  const list = lists[t]
  const next =
    list
      .map((o) => o.deadline)
      .filter((d): d is string => !!d && (daysTo(d) ?? 0) > 0)
      .sort()[0] ?? null
  return {
    count: `${list.length}\u00a0ta ${t === 'vol' ? 'yönaliş' : 'dastur'}`,
    when: next ? `Muddat: ${deadlineLabel(next)}` : t === 'grant' || t === 'vol' ? 'Doimiy qabul' : 'Har yili tanlov',
  }
}

/** Karta kengayganda chiqadigan ma'lumot: qisqa tavsif, faol dasturlar soni, eng yaqin muddat va "Batafsil" */
type Lists = Record<OppType, Array<{ deadline?: string }>>

function OppInfo({ t, lists, O }: { t: OppType; lists: Lists; O: BoshData['opps'] }) {
  const type = { ...OPP_TYPES.find((x) => x.key === t)!, ...Object.fromEntries(Object.entries(O[t]).filter(([, v]) => v)) }
  // haqiqiy röyxatlardan (admin panel): grantlar, stipendiyalar, tanlovlar va volontyorlik yönalişlari
  const real = lists[t]
  const list = real.map((g) => ({ deadline: g.deadline ?? null }))
  const next =
    list
      .map((o) => o.deadline)
      .filter((d): d is string => !!d && (daysTo(d) ?? 0) > 0)
      .sort()[0] ?? null
  return (
    <div className="opp-info">
      <p>{type.desc}</p>
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
 * Siz uchun imkoniyatlar.
 * Rangli kartalar: sichqoncha (yoki klaviatura fokusi) kelgan karta kengayadi, qolganlari torayadi;
 * kengaygan kartada qisqa tavsif, faol dasturlar soni va eng yaqin muddat chiqadi.
 */
export async function Opportunities({ locale }: { locale: Locale }) {
  const [grant, stip, tanlov, vol, { opps: O }] = await Promise.all([getGrants(locale), getStipends(locale), getContests(locale), getVolDirs(locale), getBosh(locale)])
  const lists = { grant, stip, tanlov, vol: vol.map(() => ({})) } as Lists
  return (
    <>
      <section className="sec" id="imkoniyatlar">
        <div className="wrap">
          <h2 className="h2 opps-title">
            {O.title} <span>{O.accent}</span>
          </h2>
          {/* VAQTINÇA: 3 ta dizayn varianti (DevSectionsPanel), tasdiqlangaç bittasi qoladi */}
          <div className="vx" data-v="opps-a">
          <div className="opps">
            <Link href={`/${locale}/faoliyat/grantlar`} className="opp big o1">
              <div className="title">
                <b>Grantlar</b>
                <span>{O.grant.lead || OPP_TYPES[0].lead}</span>
              </div>
              <svg
                className="deco"
                style={{ left: '20px', top: '320px', width: '72px', transform: 'rotate(-28deg)' }}
                viewBox="0 0 40 40"
              >
                <path
                  fill="#532822"
                  d="M20 0l4 13 13-6-6 13 13 4-13 4 6 13-13-6-4 13-4-13-13 6 6-13-13-4 13-4-6-13 13 6z"
                />
              </svg>
              <svg
                className="deco"
                style={{ left: '100px', top: '300px', width: '160px' }}
                viewBox="0 0 100 100"
              >
                <circle cx="50" cy="50" r="38" fill="none" stroke="#89C0FF" strokeWidth="22" />
              </svg>
              <svg
                className="deco"
                style={{ left: '36px', top: '420px', width: '90px' }}
                viewBox="0 0 100 100"
              >
                <path
                  fill="#FF939A"
                  d="M50 2l8 9 12-4 3 12 12 2-3 12 10 8-9 8 6 11-12 4 1 12-12-1-4 12-11-6-8 9-8-9-11 6-4-12-12 1 1-12-12-4 6-11-9-8 10-8-3-12 12-2 3-12 12 4z"
                />
              </svg>
              <Cut c={CARDS[0]} className="opp-cut" />
              <OppInfo t="grant" lists={lists} O={O} />
            </Link>
            <Link href={`/${locale}/faoliyat/stipendiyalar`} className="opp o2">
              <p className="name">Stipendiyalar</p>
              <svg
                className="deco"
                style={{ left: '-10px', top: '120px', width: '120px', opacity: '.25' }}
                viewBox="0 0 100 100"
              >
                <path
                  fill="#89C0FF"
                  d="M50 2l8 9 12-4 3 12 12 2-3 12 10 8-9 8 6 11-12 4 1 12-12-1-4 12-11-6-8 9-8-9-11 6-4-12-12 1 1-12-12-4 6-11-9-8 10-8-3-12 12-2 3-12 12 4z"
                />
              </svg>
              <svg
                className="deco"
                style={{ right: '30px', top: '150px', width: '30px', opacity: '.5' }}
                viewBox="0 0 40 40"
              >
                <path
                  fill="#FF854B"
                  d="M20 0c2 12 8 18 20 20-12 2-18 8-20 20-2-12-8-18-20-20 12-2 18-8 20-20z"
                />
              </svg>
              <Cut c={CARDS[1]} className="opp-cut" />
              <OppInfo t="stip" lists={lists} O={O} />
            </Link>
            <Link href={`/${locale}/faoliyat/volontyorlik`} className="opp o3">
              <p className="name">Volontyorlik</p>
              <div
                className="deco leaf"
                style={{
                  left: '110px',
                  top: '40px',
                  width: '110px',
                  height: '110px',
                  transform: 'rotate(-32deg)',
                }}
              ></div>
              <div
                className="deco leaf"
                style={{
                  left: '18px',
                  top: '270px',
                  width: '36px',
                  height: '36px',
                  transform: 'rotate(28deg)',
                }}
              ></div>
              <Cut c={CARDS[2]} className="opp-cut" />
              <OppInfo t="vol" lists={lists} O={O} />
            </Link>
            <Link href={`/${locale}/faoliyat/tanlovlar`} className="opp o4">
              <p className="name">Tanlovlar</p>
              <div
                className="deco"
                style={{
                  left: '25px',
                  top: '180px',
                  width: '55px',
                  height: '134px',
                  borderRadius: '28px',
                  background: 'rgba(255,255,255,.45)',
                }}
              ></div>
              <div
                className="deco"
                style={{
                  left: '95px',
                  top: '130px',
                  width: '55px',
                  height: '134px',
                  borderRadius: '28px',
                  background: 'rgba(255,255,255,.45)',
                }}
              ></div>
              <div
                className="deco"
                style={{
                  left: '165px',
                  top: '100px',
                  width: '55px',
                  height: '134px',
                  borderRadius: '28px',
                  background: 'rgba(255,255,255,.45)',
                }}
              ></div>
              <Cut c={CARDS[3]} className="opp-cut" />
              <OppInfo t="tanlov" lists={lists} O={O} />
            </Link>
          </div>
          </div>

          {/* B — odamning boşi karta ustidan çiqadi, pastda oq maʼlumot paneli */}
          <div className="vx" data-v="opps-b">
            <div className="ob">
              {CARDS.map((c) => {
                const m = meta(c.t, lists)
                return (
                  <Link key={c.t} href={`/${locale}${c.href}`} className={`ob-card ${c.cls}`}>
                    <span className="ob-bg" aria-hidden="true">
                      <i />
                      <i />
                    </span>
                    <Cut c={c} className="ob-p" />
                    <span className="ob-info">
                      <span className="ob-txt">
                        <b>{c.name}</b>
                        <small>{m.count}</small>
                        <small>{m.when}</small>
                      </span>
                      <span className="more-btn">
                        <More />
                      </span>
                    </span>
                  </Link>
                )
              })}
            </div>
          </div>

          {/* C — stikerlar devori: har xil balandlikdagi kartalar, orqada katta şakl, qiyşiq yorliq */}
          <div className="vx" data-v="opps-c">
            <div className="osw">
              {CARDS.map((c) => {
                const m = meta(c.t, lists)
                return (
                  <Link key={c.t} href={`/${locale}${c.href}`} className={`oc-card ${c.cls}`}>
                    <span className="oc-shape" aria-hidden="true" />
                    <b className="oc-name">{c.name}</b>
                    <span className="oc-sticker">{m.count}</span>
                    <Cut c={c} className="oc-p" />
                    <span className="oc-foot">
                      <small>{m.when}</small>
                      <span className="more-btn">
                        <More />
                      </span>
                    </span>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
