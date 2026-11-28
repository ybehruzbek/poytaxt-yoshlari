/* Jamoa bölimi uçun umumiy maʼlumot va belgilar (A va B variantlari) */
import type { Reception, Social } from './data'
import type { Hududiy } from '@/lib/cms/biz'

/* Rahbariyat kartasi uçun çiziqli belgilar (24×24) */
export const IC = {
  phone:
    'M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z',
  mail: 'M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm18 2-10 7L2 6',
  Telegram: 'M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z',
  Instagram:
    'M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm10 4.5h.01M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
  Facebook: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z',
  clock: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zm0-14v4l3 2',
}

export function Ic({ d }: { d: string }) {
  return (
    <span className="hk-lead-ic" aria-hidden="true">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d={d} />
      </svg>
    </span>
  )
}

export type Member = {
  phone?: string
  email?: string
  socials?: Social[]
  name: string
  role: string
  img: string
  /** bölimning rasmiy töliq nomi */
  dept?: string
  room: string
  /** qabul: “çorşanba, 14:00–17:00” (xona raqami körsatilmaydi) */
  reception?: string
  duties?: string[]
  /** vazifalar şaxsiy emas, bölimniki */
  deptDuties?: boolean
}

/** “Duşanba”, “14:00 — 17:00” → “duşanba, 14:00–17:00” (kun nomi gap ičida kiçik harf bilan) */
const fmtRec = (day: string, time: string) =>
  // vaqt bölinmas (u2060) — qator faqat kun nomidan keyin bölinadi
  `${day.toLocaleLowerCase('uz')}, ${time.replace(/\s*—\s*/, '\u2060–\u2060')}`

const recOf = (RECEPTION: Reception[], name: string) => {
  const r = RECEPTION.find((x) => x.name === name)
  return r ? fmtRec(r.day, r.time) : undefined
}

/** Jamoa: rais → bölim boşliqlari → mutaxassislar */
export type Team = { title: string; lead?: boolean; people: Member[] }[]

/** Jamoa admin paneldagi xodimlar va bölimlardan yiğiladi (Biz haqimizda → Kengaş xodimlari) */
export const teamOf = ({ CHAIR, DEPTS, RECEPTION }: Hududiy): Team => [
  {
    title: 'Rais',
    lead: true,
    people: [
      {
        ...CHAIR,
        room: CHAIR.room,
        reception: recOf(RECEPTION, CHAIR.name),
        duties: CHAIR.duties,
      },
    ],
  },
  {
    title: 'Bo‘lim boshliqlari',
    people: DEPTS.flatMap((d) =>
      d.staff
        .filter((x) => x.role.startsWith('Bo‘lim boshlig‘i'))
        .map((x) => ({
          ...x,
          dept: d.t,
          room: d.room,
          reception: recOf(RECEPTION, x.name),
          duties: x.duties ?? d.tasks,
          deptDuties: !x.duties,
        })),
    ),
  },
  {
    title: 'Mutaxassislar',
    people: DEPTS.flatMap((d) =>
      d.staff
        .filter((x) => !x.role.startsWith('Bo‘lim boshlig‘i'))
        .map((x) => ({
          ...x,
          dept: d.t,
          room: d.room,
          duties: x.duties ?? d.tasks,
          deptDuties: !x.duties,
        })),
    ),
  },
]
