/**
 * Ijtimoiy tarmoqlar: admin panelda ("Sayt sozlamalari → Ijtimoiy tarmoqlar") o'zgartiriladi.
 * Bu yerda — tarmoqlar ro'yxati, ruxsat etilgan domenlar va admin hali saqlamagan bo'lsa ishlatiladigan
 * boshlang'ich havolalar. Brauzer kodi ham, server kodi ham ishlatadi — payload importi yo'q.
 */
export const NETS = ['telegram', 'instagram', 'facebook', 'youtube'] as const
export type Net = (typeof NETS)[number]

export const NET_LABEL: Record<Net, string> = {
  telegram: 'Telegram',
  instagram: 'Instagram',
  facebook: 'Facebook',
  youtube: 'YouTube',
}

/** Har bir tarmoq uchun faqat shu domenlarga havola qabul qilinadi */
const HOSTS: Record<Net, string[]> = {
  telegram: ['t.me', 'telegram.me'],
  instagram: ['instagram.com', 'www.instagram.com'],
  facebook: ['facebook.com', 'www.facebook.com', 'm.facebook.com', 'fb.com'],
  youtube: ['youtube.com', 'www.youtube.com', 'm.youtube.com', 'youtu.be'],
}

export const DEFAULT_SOCIALS: Record<Net, string> = {
  telegram: 'https://t.me/poytaxtyoshlari_yi',
  instagram: 'https://www.instagram.com/yoshlar.uzb/',
  facebook: 'https://www.facebook.com/share/1DZFdJ2wTc/',
  youtube: 'https://www.youtube.com/@poytaxtyoshlari_uz',
}

/** To'g'ri havola bo'lsa null, aks holda xato matni (admin paneldagi tekshiruv) */
export function checkSocialUrl(net: Net, value: string): string | null {
  if (!value) return null // bo'sh — tarmoq saytda ko'rsatilmaydi
  let u: URL
  try {
    u = new URL(value)
  } catch {
    return 'To‘liq havola kiriting, masalan: https://…'
  }
  if (u.protocol !== 'https:') return 'Havola https:// bilan boshlanishi kerak.'
  if (!HOSTS[net].includes(u.hostname.toLowerCase())) return `${NET_LABEL[net]} havolasi bo‘lishi kerak (${HOSTS[net][0]}).`
  return null
}

/** Havoladan kuzatuv parametrlarini (?si=, ?mibextid= …) olib tashlaydi */
export function cleanSocialUrl(value: string): string {
  try {
    const u = new URL(value)
    u.search = ''
    u.hash = ''
    return u.toString()
  } catch {
    return value
  }
}

/** Telefondagi sahifa uchun qisqa nom: t.me/abc → @abc, instagram.com/abc → abc */
export function socialHandle(net: Net, url: string): string {
  try {
    const seg = new URL(url).pathname.split('/').filter(Boolean)
    const first = seg[0] ?? ''
    if (!first || first === 'share' || first === 'channel') return ''
    if (net === 'instagram') return first
    return first.startsWith('@') ? first : `@${first}`
  } catch {
    return ''
  }
}
