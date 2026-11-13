import Link from 'next/link'
import { getPayload } from 'payload'

import config from '@payload-config'
import { EventsViews } from '@/components/site/EventsViews'
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

        <EventsViews items={items.map((e) => ({ title: e.title, type: e.type, org: e.org, img: e.img, href: e.href, left: leftLabel(e.left), day: e.p.day, mon: e.p.mon, wd: e.p.wd, full: e.p.full, time: e.p.time }))} />
      </div>
    </section>
  )
}
