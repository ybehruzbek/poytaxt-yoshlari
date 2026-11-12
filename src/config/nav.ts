/**
 * Asosiy navigatsiya — MAJBURIY tuzilma (buyurtmachi tasdiqlagan).
 * Tartib va nomlarni o'zgartirmang. `href` — til prefiksisiz yo'l (/uz qo'shiladi).
 */
export type NavLink = {
  label: string
  href: string
  /** Mega-menyu uchun qisqa izoh */
  desc?: string
  children?: NavLink[]
}

export type NavGroup = {
  key: string
  label: string
  /** Ochiladigan menyusi yo'q bo'lsa — to'g'ridan-to'g'ri havola */
  href?: string
  /** Mega-menyudagi kirish matni */
  intro?: string
  items?: NavLink[]
}

export const NAV: NavGroup[] = [
  {
    key: 'biz',
    label: 'Biz haqimizda',
    intro: 'Ittifoq, Markaziy Kengaş, Toşkent şahar hududiy Kengaşi, boşlanğiç taşkilotlar va hamkorlar.',
    items: [
      { label: 'Özbekiston yoşlar ittifoqi', href: '/biz-haqimizda/ittifoq', desc: 'Taşkilot tarixi, maqsad va vazifalari' },
      { label: 'Markaziy Kengaş', href: '/biz-haqimizda/markaziy-kengash', desc: 'Ittifoqning respublika darajasidagi boşqaruvi' },
      { label: 'Toşkent şahar hududiy Kengaşi', href: '/biz-haqimizda/hududiy-kengash', desc: 'Kengaş rahbariyati va xodimlari' },
      {
        label: 'Boşlanğiç taşkilotlar',
        href: '/biz-haqimizda/boshlangich-tashkilotlar',
        desc: 'OTT va harbiy qismlardagi taşkilotlar',
        children: [
          { label: 'Oliy taʼlim taşkilotlaridagi', href: '/biz-haqimizda/boshlangich-tashkilotlar/oliy-talim' },
          { label: 'Harbiy qismlar va muassasalardagi', href: '/biz-haqimizda/boshlangich-tashkilotlar/harbiy' },
        ],
      },
      { label: 'Hamkorlar', href: '/biz-haqimizda/hamkorlar', desc: 'Ittifoqning Özbekistondagi va xalqaro hamkorlari' },
    ],
  },
  {
    key: 'faoliyat',
    label: 'Faoliyat',
    intro: 'Yönalişlar, loyihalar, tadbirlar, eʼlonlar va natijalar.',
    items: [
      { label: 'Faoliyat yönalişlari', href: '/faoliyat/yonalishlar', desc: 'Kengaşning ustuvor yönalişlari' },
      { label: 'Loyihalar', href: '/faoliyat/loyihalar', desc: 'Kengaş va hamkorlar loyihalari' },
      { label: 'Tadbirlar va kalendar', href: '/faoliyat/tadbirlar', desc: 'Yaqin tadbirlar taqvimi' },
      { label: 'Eʼlonlar', href: '/faoliyat/elonlar', desc: 'Tanlovlar va röyxatdan ötiş haqida eʼlonlar' },
      { label: 'Natijalar va hisobotlar', href: '/faoliyat/natijalar', desc: 'Kengaş faoliyati yakunlari' },
    ],
  },
  { key: 'yangiliklar', label: 'Yangiliklar', href: '/yangiliklar' },
  {
    key: 'hujjatlar',
    label: 'Hujjatlar',
    intro: 'Normativ-huquqiy hujjatlar, Kengaş hujjatlari va namunalar.',
    items: [
      { label: 'Normativ-huquqiy hujjatlar', href: '/hujjatlar/normativ', desc: 'Yoşlar siyosatiga oid hujjatlar' },
      { label: 'Kengaş hujjatlari', href: '/hujjatlar/kengash', desc: 'Qarorlar, rejalar, hisobotlar' },
      { label: 'Hujjat namunalari', href: '/hujjatlar/namunalar', desc: 'Ariza va blanka namunalari' },
    ],
  },
  {
    key: 'axborot',
    label: 'Axborot xizmati',
    intro: 'Foto, video, press-relizlar va OAVdagi çiqişlar.',
    items: [
      { label: 'Fotogalereya', href: '/axborot-xizmati/fotogalereya', desc: 'Tadbirlardan suratlar' },
      { label: 'Videogalereya', href: '/axborot-xizmati/videogalereya', desc: 'Tadbirlardan video lavhalar' },
      { label: 'Press-relizlar', href: '/axborot-xizmati/press-relizlar', desc: 'Kengaşning rasmiy axborotlari' },
      { label: 'OAV biz haqimizda', href: '/axborot-xizmati/oav', desc: 'OAVdagi Kengaş haqidagi materiallar' },
    ],
  },
  {
    key: 'boglanish',
    label: 'Boğlaniş',
    intro: 'Aloqa maʼlumotlari, köp beriladigan savollar va elektron murojaat.',
    items: [
      { label: 'Aloqa maʼlumotlari', href: '/boglanish/aloqa', desc: 'Telefon, poçta, manzil va xarita' },
      { label: 'Köp beriladigan savollar', href: '/boglanish/savollar', desc: 'Aʼzolik, imtiyozlar va murojaat haqida' },
      { label: 'Elektron murojaat', href: '/boglanish/murojaat', desc: 'Onlayn murojaat yuboriş' },
    ],
  },
]

/** Yo'l bo'yicha sahifa nomi va yo'l zanjiri (breadcrumb) */
export function findNav(path: string): { group?: NavGroup; trail: NavLink[] } {
  for (const g of NAV) {
    if (g.href === path) return { group: g, trail: [{ label: g.label, href: g.href }] }
    for (const it of g.items ?? []) {
      if (it.href === path) return { group: g, trail: [it] }
      for (const ch of it.children ?? []) {
        if (ch.href === path) return { group: g, trail: [it, ch] }
      }
    }
  }
  return { trail: [] }
}

/** Guruhning barcha yo'llari ("faol" holatni aniqlash uchun) */
export function groupPaths(g: NavGroup): string[] {
  if (g.href) return [g.href]
  return (g.items ?? []).flatMap((i) => [i.href, ...(i.children ?? []).map((c) => c.href)])
}
