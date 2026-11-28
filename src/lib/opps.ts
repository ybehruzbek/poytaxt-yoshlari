/** Imkoniyatlar: turlar va NAMUNA ro'yxat (keyin admin paneldagi "Imkoniyatlar" bo'limidan keladi). */
export type OppType = 'grant' | 'stip' | 'vol' | 'tanlov'

export const OPP_TYPES: Array<{
  key: OppType
  label: string
  lead: string
  desc: string
  img: string
  color: string
  dark?: boolean
}> = [
  {
    key: 'grant',
    label: 'Grantlar',
    lead: 'Yoshlar tashabbuslarini moliyalashtirish',
    desc: 'Ijtimoiy, ta’limiy, ekologik va innovatsion loyihalar uchun poytaxt va davlat dasturlari doirasidagi grantlar.',
    img: '/img/opp-grant.jpg',
    color: 'var(--blue)',
  },
  {
    key: 'stip',
    label: 'Stipendiyalar',
    lead: 'Bilim va yutuqlarni rag‘batlantirish',
    desc: 'Prezident va nomli davlat stipendiyalari hamda xorijda ta’lim olish uchun stipendiyalar.',
    img: '/img/opp-stip.jpg',
    color: 'var(--navy)',
  },
  {
    key: 'vol',
    label: 'Volontyorlik',
    lead: 'Ijtimoiy faollikni rivojlantirish',
    desc: 'Shahar miqyosidagi tadbirlar, forumlar va ijtimoiy aksiyalarda volontyor sifatida ishtirok etish.',
    img: '/img/opp-vol.jpg',
    color: 'var(--green)',
  },
  {
    key: 'tanlov',
    label: 'Tanlovlar',
    lead: 'Iste’dodli yoshlarni aniqlash',
    desc: 'Davlat mukofotlari hamda ilm-fan, madaniyat, adabiyot, tibbiyot va sport sohalaridagi yoshlar tanlovlari.',
    img: '/img/news-1.jpg',
    color: 'var(--yellow)',
    dark: true,
  },
]

export type Opp = { type: OppType; title: string; level: string; deadline: string | null }

export const OPPS: Opp[] = [
  { type: 'grant', title: 'Yoshlar tashabbuslari granti', level: 'Poytaxt miqyosida', deadline: '2026-11-30' },
  { type: 'grant', title: 'Startap g‘oyalar granti', level: 'Davlat dasturi', deadline: '2026-12-20' },
  { type: 'stip', title: 'Faol talabalar stipendiyasi', level: 'Poytaxt miqyosida', deadline: '2026-12-15' },
  { type: 'stip', title: 'Iqtidorli yoshlar stipendiyasi', level: 'Davlat dasturi', deadline: '2026-12-31' },
  { type: 'vol', title: 'Shahar volontyorlari dasturi', level: 'Poytaxt miqyosida', deadline: null },
  { type: 'vol', title: 'Katta tadbirlar volontyorligi', level: 'Poytaxt miqyosida', deadline: null },
  { type: 'tanlov', title: 'Kitobxonlik tanlovi', level: 'Poytaxt miqyosida', deadline: '2026-11-27' },
  { type: 'tanlov', title: '“Yil yoshi” tanlovi', level: 'Davlat dasturi', deadline: '2026-12-10' },
  { type: 'tanlov', title: 'Yosh jurnalistlar tanlovi', level: 'Poytaxt miqyosida', deadline: '2026-12-05' },
]

const MON_FULL = ['yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun', 'iyul', 'avgust', 'sentabr', 'oktabr', 'noyabr', 'dekabr']

/** "2026-11-30" → "30-noyabr" */
export function deadlineLabel(d: string | null): string {
  if (!d) return 'Doimiy'
  const [, m, day] = d.split('-').map(Number)
  return `${day}-${MON_FULL[m - 1]}`
}

/** Muddatgacha qolgan kunlar (Toshkent vaqti, kun oxirigacha) */
export function daysTo(d: string | null, now = Date.now()): number | null {
  if (!d) return null
  return Math.max(0, Math.ceil((new Date(`${d}T23:59:59+05:00`).getTime() - now) / 86400000))
}
