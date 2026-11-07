/**
 * “Faoliyat” bölimi turlari. Mazmun “Poytaxt yoşlari” Telegram kanalidan (2023–2026) yiğilgan;
 * har bir fakt kanaldagi asl postga bog‘langan (post raqami → TG(id)).
 */

export type DirSlug =
  | 'manaviyat-kitobxonlik'
  | 'intellektual'
  | 'harbiy-vatanparvarlik'
  | 'volontyorlik'
  | 'sport-salomatlik'
  | 'yetakchilik'
  | 'huquqiy-madaniyat'
  | 'ekologiya'
  | 'media'
  | 'ijod-turizm'
  | 'talim-kasb'

export type Direction = {
  slug: DirSlug
  title: string
  lead: string
  body: string
  projects: string[]
}

export type Fact = { text: string; post: number }
export type Milestone = { date: string; text: string; post: number }

export type ProjectStatus = 'davom etmoqda' | 'yakunlangan' | 'har yili'

export type Project = {
  slug: string
  title: string
  dir: DirSlug
  status: ProjectStatus
  period: string
  lead: string
  description: string
  audience: string
  partners: string[]
  results: Fact[]
  milestones: Milestone[]
  posts: number[]
  cover: string
  gallery: string[]
  national: boolean
}

/** Kanaldagi asl post havolasi */
export const TG = (id: number) => `https://t.me/poytaxtyoshlari_yi/${id}`
export const CHANNEL = 'https://t.me/poytaxtyoshlari_yi'

const MON = [
  'yanvar',
  'fevral',
  'mart',
  'aprel',
  'may',
  'iyun',
  'iyul',
  'avgust',
  'sentabr',
  'oktabr',
  'noyabr',
  'dekabr',
]

/** 2025-12-05 → 5-dekabr, 2025 */
export function fmtDate(iso: string, withYear = true) {
  const [y, m, d] = iso.split('-').map(Number)
  if (!y || !m) return iso
  const base = d ? `${d}-${MON[m - 1]}` : MON[m - 1]
  return withYear ? `${base}, ${y}` : base
}
