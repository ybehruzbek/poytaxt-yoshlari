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
    intro: 'Ittifoq, Kengash va jamoamiz bilan tanishing.',
    items: [
      { label: 'O‘zbekiston yoshlar ittifoqi', href: '/biz-haqimizda/ittifoq', desc: 'Tashkilot tarixi, maqsad va vazifalari' },
      { label: 'Markaziy Kengash', href: '/biz-haqimizda/markaziy-kengash', desc: 'Ittifoqning respublika darajasidagi boshqaruvi' },
      { label: 'Toshkent shahar hududiy Kengashi', href: '/biz-haqimizda/hududiy-kengash', desc: 'Poytaxt kengashi faoliyati va tuzilmasi' },
      { label: 'Rahbariyat', href: '/biz-haqimizda/rahbariyat', desc: 'Kengash rahbarlari' },
      { label: 'Jamoamiz', href: '/biz-haqimizda/jamoa', desc: 'Barcha xodimlar' },
      { label: 'Qabul kunlari', href: '/biz-haqimizda/qabul-kunlari', desc: 'Rahbariyat qabuli jadvali' },
    ],
  },
  {
    key: 'faoliyat',
    label: 'Faoliyat',
    intro: 'Yo‘nalishlar, boshlang‘ich tashkilotlar, yetakchilar va loyihalar.',
    items: [
      { label: 'Faoliyat yo‘nalishlari', href: '/faoliyat/yonalishlar', desc: 'Kengashning ustuvor yo‘nalishlari' },
      { label: 'Oliy ta’lim tashkilotlaridagi boshlang‘ich tashkilotlar', href: '/faoliyat/otm-tashkilotlar', desc: 'Poytaxt OTMlaridagi tashkilotlar' },
      { label: 'Harbiy qismlardagi boshlang‘ich tashkilotlar', href: '/faoliyat/harbiy-tashkilotlar', desc: 'Harbiy qismlardagi tashkilotlar' },
      {
        label: 'Yoshlar yetakchilari',
        href: '/faoliyat/yetakchilar',
        desc: 'OTM va harbiy qismlardagi yetakchilar',
        children: [
          { label: 'OTMlardagi yetakchilar', href: '/faoliyat/yetakchilar/otm' },
          { label: 'Harbiy qismlardagi yetakchilar', href: '/faoliyat/yetakchilar/harbiy' },
        ],
      },
      { label: 'Loyihalar', href: '/faoliyat/loyihalar', desc: 'Kengash va hamkorlar loyihalari' },
      { label: 'Tadbirlar va kalendar', href: '/faoliyat/tadbirlar', desc: 'Yaqin tadbirlar taqvimi' },
    ],
  },
  {
    key: 'hujjatlar',
    label: 'Hujjatlar',
    intro: 'Qonunchilik, Kengash qarorlari va namunalar.',
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
      { label: 'Videogalereya', href: '/axborot-xizmati/videogalereya', desc: 'Video lavhalar' },
      { label: 'Press-relizlar', href: '/axborot-xizmati/press-relizlar', desc: 'Rasmiy axborotlar' },
      { label: 'OAV biz haqimizda', href: '/axborot-xizmati/oav', desc: 'Matbuotdagi chiqishlar' },
    ],
  },
  {
    key: 'boglanish',
    label: 'Bog‘lanish',
    intro: 'Savol, taklif yoki murojaatingiz bormi?',
    items: [
      { label: 'Aloqa ma’lumotlari', href: '/boglanish/aloqa', desc: 'Telefon, pochta, ish vaqti' },
      { label: 'Manzil va xarita', href: '/boglanish/manzil', desc: 'Bizni qanday topish mumkin' },
      { label: 'Elektron murojaat', href: '/boglanish/murojaat', desc: 'Onlayn murojaat yuborish' },
    ],
  },
  { key: 'yangiliklar', label: 'Yangiliklar', href: '/yangiliklar' },
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
