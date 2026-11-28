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
    intro: 'Ittifoq, Markaziy Kengash, Toshkent shahar hududiy Kengashi, boshlang‘ich tashkilotlar va hamkorlar.',
    items: [
      { label: 'O‘zbekiston yoshlar ittifoqi', href: '/biz-haqimizda/ittifoq', desc: 'Tashkilot tarixi, maqsad va vazifalari' },
      { label: 'Markaziy Kengash', href: '/biz-haqimizda/markaziy-kengash', desc: 'Ittifoqning respublika darajasidagi boshqaruvi' },
      { label: 'Toshkent shahar hududiy Kengashi', href: '/biz-haqimizda/hududiy-kengash', desc: 'Kengash rahbariyati va xodimlari' },
      {
        label: 'Boshlang‘ich tashkilotlar',
        href: '/biz-haqimizda/boshlangich-tashkilotlar',
        desc: 'OTT va harbiy qismlardagi tashkilotlar',
        children: [
          { label: 'Oliy ta’lim tashkilotlaridagi', href: '/biz-haqimizda/boshlangich-tashkilotlar/oliy-talim' },
          { label: 'Harbiy qismlar va muassasalardagi', href: '/biz-haqimizda/boshlangich-tashkilotlar/harbiy' },
        ],
      },
      { label: 'Hamkorlar', href: '/biz-haqimizda/hamkorlar', desc: 'Ittifoqning O‘zbekistondagi va xalqaro hamkorlari' },
    ],
  },
  {
    key: 'faoliyat',
    label: 'Faoliyat',
    intro: 'Yo‘nalishlar, loyihalar, tadbirlar, e’lonlar va natijalar.',
    items: [
      { label: 'Faoliyat yo‘nalishlari', href: '/faoliyat/yonalishlar', desc: 'Kengashning ustuvor yo‘nalishlari' },
      { label: 'Loyihalar', href: '/faoliyat/loyihalar', desc: 'Kengash va hamkorlar loyihalari' },
      { label: 'Tadbirlar va kalendar', href: '/faoliyat/tadbirlar', desc: 'Yaqin tadbirlar taqvimi' },
      { label: 'E’lonlar', href: '/faoliyat/elonlar', desc: 'Tanlovlar va ro‘yxatdan o‘tish haqida e’lonlar' },
      { label: 'Grantlar', href: '/faoliyat/grantlar', desc: 'Yoshlar uchun grantlar va ularning shartlari' },
      { label: 'Stipendiyalar', href: '/faoliyat/stipendiyalar', desc: 'Davlat va xorijiy stipendiyalar' },
      { label: 'Tanlovlar', href: '/faoliyat/tanlovlar', desc: 'Yoshlar uchun sohaviy tanlovlar' },
      { label: 'Davlat mukofotlari', href: '/faoliyat/davlat-mukofotlari', desc: 'Yoshlar uchun ta’sis etilgan davlat mukofotlari' },
      { label: 'Imtiyozlar', href: '/faoliyat/imtiyozlar', desc: 'Talabalar, o‘quvchilar va yoshlar uchun imtiyozlar' },
      { label: 'Volontyorlik', href: '/faoliyat/volontyorlik', desc: 'Volontyorlik yo‘nalishlari va ariza' },
      { label: 'Natijalar va hisobotlar', href: '/faoliyat/natijalar', desc: 'Kengash faoliyati yakunlari' },
    ],
  },
  { key: 'yangiliklar', label: 'Yangiliklar', href: '/yangiliklar' },
  {
    key: 'hujjatlar',
    label: 'Hujjatlar',
    intro: 'Normativ-huquqiy hujjatlar, Kengash hujjatlari va namunalar.',
    items: [
      { label: 'Normativ-huquqiy hujjatlar', href: '/hujjatlar/normativ', desc: 'Yoshlar siyosatiga oid hujjatlar' },
      { label: 'Kengash hujjatlari', href: '/hujjatlar/kengash', desc: 'Qarorlar, rejalar, hisobotlar' },
      { label: 'Hujjat namunalari', href: '/hujjatlar/namunalar', desc: 'Ariza va blanka namunalari' },
    ],
  },
  {
    key: 'axborot',
    label: 'Axborot xizmati',
    intro: 'Foto, video, press-relizlar va OAVdagi chiqishlar.',
    items: [
      { label: 'Fotogalereya', href: '/axborot-xizmati/fotogalereya', desc: 'Tadbirlardan suratlar' },
      { label: 'Videogalereya', href: '/axborot-xizmati/videogalereya', desc: 'Tadbirlardan video lavhalar' },
      { label: 'Press-relizlar', href: '/axborot-xizmati/press-relizlar', desc: 'Kengashning rasmiy axborotlari' },
      { label: 'OAVda Kengash haqida', href: '/axborot-xizmati/oav', desc: 'OAVdagi Kengash haqidagi materiallar' },
    ],
  },
  {
    key: 'boglanish',
    label: 'Bog‘lanish',
    intro: 'Aloqa ma’lumotlari, ko‘p beriladigan savollar va elektron murojaat.',
    items: [
      { label: 'Aloqa ma’lumotlari', href: '/boglanish/aloqa', desc: 'Telefon, pochta, manzil va xarita' },
      { label: 'Ko‘p beriladigan savollar', href: '/boglanish/savollar', desc: 'A’zolik, imtiyozlar va murojaat haqida' },
      { label: 'Elektron murojaat', href: '/boglanish/murojaat', desc: 'Onlayn murojaat yuborish' },
      { label: 'A’zo bo‘lish', href: '/boglanish/azo-bolish', desc: 'Ittifoqqa a’zolik tartibi va ariza' },
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
