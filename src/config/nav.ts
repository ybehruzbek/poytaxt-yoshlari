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
    intro: 'Ittifoq, Kengaş va jamoamiz bilan tanişing.',
    items: [
      { label: 'Özbekiston yoşlar ittifoqi', href: '/biz-haqimizda/ittifoq', desc: 'Taşkilot tarixi, maqsad va vazifalari' },
      { label: 'Markaziy Kengaş', href: '/biz-haqimizda/markaziy-kengash', desc: 'Ittifoqning respublika darajasidagi boşqaruvi' },
      { label: 'Toşkent şahar hududiy Kengaşi', href: '/biz-haqimizda/hududiy-kengash', desc: 'Poytaxt kengaşi faoliyati va tuzilmasi' },
      { label: 'Rahbariyat', href: '/biz-haqimizda/rahbariyat', desc: 'Kengaş rahbarlari' },
      { label: 'Jamoamiz', href: '/biz-haqimizda/jamoa', desc: 'Barça xodimlar' },
      { label: 'Qabul kunlari', href: '/biz-haqimizda/qabul-kunlari', desc: 'Rahbariyat qabuli jadvali' },
    ],
  },
  {
    key: 'faoliyat',
    label: 'Faoliyat',
    intro: 'Yönalişlar, boşlanğiç taşkilotlar, yetakçilar va loyihalar.',
    items: [
      { label: 'Faoliyat yönalişlari', href: '/faoliyat/yonalishlar', desc: 'Kengaşning ustuvor yönalişlari' },
      { label: 'Oliy taʼlim taşkilotlaridagi boşlanğiç taşkilotlar', href: '/faoliyat/otm-tashkilotlar', desc: 'Poytaxt OTMlaridagi taşkilotlar' },
      { label: 'Harbiy qismlardagi boşlanğiç taşkilotlar', href: '/faoliyat/harbiy-tashkilotlar', desc: 'Harbiy qismlardagi taşkilotlar' },
      {
        label: 'Yoşlar yetakçilari',
        href: '/faoliyat/yetakchilar',
        desc: 'OTM va harbiy qismlardagi yetakçilar',
        children: [
          { label: 'OTMlardagi yetakçilar', href: '/faoliyat/yetakchilar/otm' },
          { label: 'Harbiy qismlardagi yetakçilar', href: '/faoliyat/yetakchilar/harbiy' },
        ],
      },
      { label: 'Loyihalar', href: '/faoliyat/loyihalar', desc: 'Kengaş va hamkorlar loyihalari' },
      { label: 'Tadbirlar va kalendar', href: '/faoliyat/tadbirlar', desc: 'Yaqin tadbirlar taqvimi' },
    ],
  },
  {
    key: 'hujjatlar',
    label: 'Hujjatlar',
    intro: 'Qonunçilik, Kengaş qarorlari va namunalar.',
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
      { label: 'Videogalereya', href: '/axborot-xizmati/videogalereya', desc: 'Video lavhalar' },
      { label: 'Press-relizlar', href: '/axborot-xizmati/press-relizlar', desc: 'Rasmiy axborotlar' },
      { label: 'OAV biz haqimizda', href: '/axborot-xizmati/oav', desc: 'Matbuotdagi çiqişlar' },
    ],
  },
  {
    key: 'boglanish',
    label: 'Boğlaniş',
    intro: 'Savol, taklif yoki murojaatingiz bormi?',
    items: [
      { label: 'Aloqa maʼlumotlari', href: '/boglanish/aloqa', desc: 'Telefon, poçta, iş vaqti' },
      { label: 'Manzil va xarita', href: '/boglanish/manzil', desc: 'Bizni qanday topiş mumkin' },
      { label: 'Elektron murojaat', href: '/boglanish/murojaat', desc: 'Onlayn murojaat yuboriş' },
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
