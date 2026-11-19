/**
 * Kiruvçi xabarlar (murojaat, aʼzolik va volontyorlik arizalari, matn xatolari) — bitta mexanizm uçun sozlamalar.
 * Server va brauzer ikkalasi işlatadi (bu faylda maxfiy narsa yöq).
 */
export type InboxSlug = 'appeals' | 'memberships' | 'volunteers' | 'text-errors'
export type Tone = 'orange' | 'blue' | 'green' | 'pink' | 'yellow' | 'brown'
export type StatusOpt = { v: string; t: string; tone: Tone; done?: boolean }

export type InboxKind = {
  slug: InboxSlug
  path: string // /boshqaruv/kiruvchi/{path}
  t: string // menyu va sarlavha
  one: string // bitta yozuv nomi
  statuses: StatusOpt[]
  searchHint: string
}

export const INBOX: InboxKind[] = [
  {
    slug: 'appeals',
    path: 'murojaatlar',
    t: 'Murojaatlar',
    one: 'Murojaat',
    searchHint: 'Ism, telefon yoki matn böyiça qidiriş',
    statuses: [
      { v: 'yangi', t: 'Yangi', tone: 'orange' },
      { v: 'jarayonda', t: 'Körib çiqilmoqda', tone: 'blue' },
      { v: 'yopildi', t: 'Yopildi', tone: 'green', done: true },
    ],
  },
  {
    slug: 'memberships',
    path: 'azolik',
    t: 'Aʼzolik arizalari',
    one: 'Aʼzolik arizasi',
    searchHint: 'Ism, telefon yoki öqiş joyi böyiça qidiriş',
    statuses: [
      { v: 'yangi', t: 'Yangi', tone: 'orange' },
      { v: 'takror', t: 'Takroriy', tone: 'yellow' },
      { v: 'yuborildi', t: 'Boşlanğiç taşkilotga yuborildi', tone: 'blue' },
      { v: 'qabul', t: 'Qabul qilindi', tone: 'green', done: true },
      { v: 'rad', t: 'Rad etildi', tone: 'pink', done: true },
    ],
  },
  {
    slug: 'volunteers',
    path: 'volontyorlik',
    t: 'Volontyorlik arizalari',
    one: 'Volontyorlik arizasi',
    searchHint: 'Ism, telefon yoki yönaliş böyiça qidiriş',
    statuses: [
      { v: 'yangi', t: 'Yangi', tone: 'orange' },
      { v: 'takror', t: 'Takroriy', tone: 'yellow' },
      { v: 'suhbat', t: 'Suhbatga taklif qilindi', tone: 'blue' },
      { v: 'qabul', t: 'Röyxatga kiritildi', tone: 'green', done: true },
      { v: 'rad', t: 'Rad etildi', tone: 'pink', done: true },
    ],
  },
  {
    slug: 'text-errors',
    path: 'matn-xatolari',
    t: 'Matn xatolari',
    one: 'Matndagi xato',
    searchHint: 'Matn yoki sahifa böyiça qidiriş',
    statuses: [
      { v: 'yangi', t: 'Yangi', tone: 'orange' },
      { v: 'tuzatildi', t: 'Tuzatildi', tone: 'green', done: true },
      { v: 'rad', t: 'Xato emas', tone: 'brown', done: true },
    ],
  },
]

export const kindByPath = (p: string) => INBOX.find((k) => k.path === p)
export const kindBySlug = (s: string) => INBOX.find((k) => k.slug === s)
export const inboxHref = (slug: InboxSlug, id?: number | string) => {
  const k = kindBySlug(slug)!
  return `/boshqaruv/kiruvchi/${k.path}${id ? `?id=${id}` : ''}`
}

export const APPEAL_TYPE: Record<string, { t: string; tone: Tone }> = {
  ariza: { t: 'Ariza', tone: 'orange' },
  taklif: { t: 'Taklif', tone: 'blue' },
  shikoyat: { t: 'Şikoyat', tone: 'pink' },
}
