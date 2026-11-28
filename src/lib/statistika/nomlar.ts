/** Statistika qatorlarini odam öqiydigan nomlarga aylantiriş (qurilma, manba, davlat, sahifa) */
import { toJoriyAlifbo } from '@/lib/alifbo'
import { NAV } from '@/config/nav'
import type { Qator } from './cloudflare'

const QURILMA: Record<string, string> = { desktop: 'Kompyuter', mobile: 'Telefon', tablet: 'Planshet', smarttv: 'Televizor' }
export const qurilmaNomi = (k: string) => QURILMA[k.toLowerCase()] ?? (k || 'Noma’lum')

/** Kelgan sayt domeni → manba nomi (bir xil manbadagi domenlar bitta qatorga birlaşadi) */
const MANBA: [RegExp, string][] = [
  [/(^|\.)google\./, 'Google'],
  [/(^|\.)yandex\.|(^|\.)ya\.ru$/, 'Yandex'],
  [/(^|\.)bing\.com$/, 'Bing'],
  [/(^|\.)t\.me$|telegram/, 'Telegram'],
  [/instagram\.com$/, 'Instagram'],
  [/(^|\.)facebook\.com$|(^|\.)fb\.com$/, 'Facebook'],
  [/youtube\.com$|youtu\.be$/, 'YouTube'],
  [/(^|\.)x\.com$|twitter\.com$|t\.co$/, 'X (Twitter)'],
  [/linkedin\.com$/, 'LinkedIn'],
  [/(^|\.)gov\.uz$/, 'gov.uz saytlari'],
]
export function manbalar(list: Qator[], host: string): Qator[] {
  const m = new Map<string, Qator>()
  for (const q of list) {
    const h = q.k.toLowerCase().replace(/^www\./, '')
    // sayt içidagi ötişlar manba emas
    if (h === host || h.endsWith(`.${host}`)) continue
    const name = !h ? 'To‘g‘ridan-to‘g‘ri' : (MANBA.find(([re]) => re.test(h))?.[1] ?? h)
    const x = m.get(name) ?? { k: name, tashrif: 0, koris: 0 }
    x.tashrif += q.tashrif
    x.koris += q.koris
    m.set(name, x)
  }
  // manba böyiça asosiy körsatkiç — tashrif (saytga şu yerdan kirişlar)
  return [...m.values()].filter((q) => q.tashrif > 0).sort((a, b) => b.tashrif - a.tashrif)
}

let regions: Intl.DisplayNames | null = null
export function davlatNomi(code: string) {
  if (!code || code === 'XX' || code === 'T1') return 'Noma’lum'
  try {
    regions ??= new Intl.DisplayNames(['uz-Latn', 'uz'], { type: 'region' })
    return toJoriyAlifbo(regions.of(code.toUpperCase()) ?? code)
  } catch {
    return code
  }
}

/** Menyudagi sahifalar nomi: “/uz/biz-haqimizda/ittifoq” → “Özbekiston yoşlar ittifoqi” */
const NAV_NOM = new Map<string, string>([['/uz', 'Bosh sahifa']])
for (const g of NAV) {
  if (g.href) NAV_NOM.set(`/uz${g.href}`, g.label)
  for (const i of g.items ?? []) {
    NAV_NOM.set(`/uz${i.href}`, i.label)
    for (const c of i.children ?? []) NAV_NOM.set(`/uz${c.href}`, c.label)
  }
}
export const menyuNomi = (path: string) => NAV_NOM.get(path.replace(/\/$/, '') || '/uz') ?? null

/** Yangilik manzilidan slug: /uz/yangiliklar/{slug} */
export const yangilikSlug = (path: string) => /^\/(?:uz|ru|en)\/yangiliklar\/([^/?#]+)\/?$/.exec(path)?.[1] ?? null

/** Bir xil sahifaning “/uz/x” va “/uz/x/” kabi variantlari birlaşadi; til prefiksisiz kirişlar /uz ga qöşiladi */
export function sahifalar(list: Qator[]): Qator[] {
  const m = new Map<string, Qator>()
  for (const q of list) {
    let p = q.k.split(/[?#]/)[0].replace(/\/+$/, '') || '/'
    if (p === '/') p = '/uz'
    const x = m.get(p) ?? { k: p, tashrif: 0, koris: 0 }
    x.tashrif += q.tashrif
    x.koris += q.koris
    m.set(p, x)
  }
  return [...m.values()].sort((a, b) => b.koris - a.koris)
}
