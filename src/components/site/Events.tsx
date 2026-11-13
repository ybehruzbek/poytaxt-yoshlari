/* eslint-disable @next/next/no-img-element -- rasmlar Payload'dan tayyor ölçamda keladi */
import Link from 'next/link'
import { getPayload } from 'payload'

import config from '@payload-config'
import { More } from '@/components/site/MoreBtn'
import { toNewsCard } from '@/lib/news'

import type { Locale } from '@/i18n/config'

type Ev = {
  title: string
  type: string // tadbir turi
  org: string // joyi
  start: string // ISO
  img: string
  href: string
}

/** Kanaldan kelgan kelgusi tadbirlar (admin panelda turi “Kelgusi tadbir”), eng yaqini birinçi */
async function upcoming(locale: Locale): Promise<Ev[]> {
  const payload = await getPayload({ config })
  const res = await payload.find({
    collection: 'news',
    locale,
    depth: 1,
    limit: 4,
    sort: 'eventDate',
    where: {
      and: [{ _status: { equals: 'published' } }, { kind: { equals: 'tadbir' } }, { eventDate: { greater_than_equal: new Date().toISOString() } }],
    },
  })
  return res.docs.map((d) => {
    const c = toNewsCard(d)
    return {
      title: c.title,
      type: 'Tadbir',
      org: d.eventPlace || 'Toşkent şahri',
      start: d.eventDate as string,
      img: c.image,
      href: `/${locale}/yangiliklar/${c.slug}`,
    }
  })
}

const MON_FULL = ['yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun', 'iyul', 'avgust', 'sentabr', 'oktabr', 'noyabr', 'dekabr']
const WD = ['Yakşanba', 'Duşanba', 'Seşanba', 'Çorşanba', 'Payşanba', 'Juma', 'Şanba']

/** ISO → Toshkent vaqtidagi qismlar */
function parts(iso: string) {
  const d = new Date(new Date(iso).getTime() + 5 * 3600 * 1000)
  const hh = String(d.getUTCHours()).padStart(2, '0')
  const mm = String(d.getUTCMinutes()).padStart(2, '0')
  return {
    day: String(d.getUTCDate()).padStart(2, '0'),
    mon: MON_FULL[d.getUTCMonth()].toUpperCase(), // oy nomi to'liq: NOYABR
    wd: WD[d.getUTCDay()],
    full: `${d.getUTCDate()}-${MON_FULL[d.getUTCMonth()]}`,
    time: `${hh}:${mm}`,
  }
}
function daysLeft(iso: string) {
  return Math.max(0, Math.ceil((new Date(iso).getTime() - Date.now()) / 86400000))
}
const Org = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 21h18M5 21V8l7-5 7 5v13M9 21v-6h6v6" />
  </svg>
)
const Clock = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
)

const leftLabel = (n: number) => (n === 0 ? 'Bugun' : n === 1 ? 'Ertaga' : `${n} kun qoldi`)


/**
 * Yaqin tadbirlar — "chipta" ko'rinishi: tepada rasm va qolgan kunlar, o'yilgan chiziq,
 * pastda sana, vaqt, joyi va “Batafsil”. Maʼlumot “Poytaxt yoşlari” kanalidan (kelgusi tadbirlar).
 */
export async function Events({ locale }: { locale: Locale }) {
  const href = `/${locale}/faoliyat/tadbirlar`
  const items = (await upcoming(locale)).map((e) => ({ ...e, p: parts(e.start), left: daysLeft(e.start) }))
  // kelgusi tadbir bölmasa — bölim körsatilmaydi (namuna maʼlumot qöyilmaydi)
  if (!items.length) return null

  return (
    <section className="sec ev-sec" id="tadbirlar" aria-labelledby="ev-title">
      <div className="wrap">
        <div className="sec-head">
          <h2 className="h2" id="ev-title">Yaqin tadbirlar</h2>
          <Link href={href} className="btn btn-ghost">Barça tadbirlar
            <span className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg></span>
          </Link>
        </div>

        {/* Kalendar qator: çapda sana, örtada sarlavha, öngda rasm va “Batafsil” */}
        <ol className="ev-rows">
          {items.map((e) => (
            <li key={e.href}>
              <Link href={e.href}>
                <span className="ev-row-d">
                  <b>{e.p.day}</b>
                  <small>{e.p.mon}</small>
                </span>
                <span className="ev-row-t">
                  <strong>{e.title}</strong>
                  <span className="ev-row-m">
                    <span><Clock /> {e.p.wd}, {e.p.time}</span>
                    <span><Org /> {e.org}</span>
                  </span>
                </span>
                <img src={e.img} alt="" />
                <span className="ev-row-l">{leftLabel(e.left)}</span>
                <span className="more-btn"><More /></span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
