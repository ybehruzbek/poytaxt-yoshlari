/**
 * Murojaat shakli va matndagi xato xabarlari uchun spam cheklovi va ishonchli mijoz IP'si (server tomonida ishlatiladi).
 *
 *  - Murojaat: bitta IP'dan 10 daqiqada 5 ta, butun sayt bo'yicha 60 ta.
 *  - Matndagi xato: bitta IP'dan 10 daqiqada 10 ta, butun sayt bo'yicha 120 ta.
 *  - Har bir funksiyaning hisoblagichi va kalitlari alohida: matndagi xato xabarlari murojaatlar limitini egallay olmaydi.
 *  - IP'dan qat'i nazar qo'yilgan chegaralar
 *    (soxta/ko'p manzil bilan bazani to'ldirishning oldi olinadi).
 *  - Faol (oyna ichidagi) hisoblagichlar xotirani bo'shatish uchun HECH QACHON o'chirilmaydi:
 *    joy tugasa, yangi manzillar rad etiladi ("fail closed").
 *  Hisoblagich jarayon xotirasida — bitta server nusxasi uchun. Bir nechta nusxada umumiy, TTL'li
 *  xotira (masalan, Redis INCR + EXPIRE) kerak bo'ladi.
 */
const WINDOW = 10 * 60 * 1000
const MAX_KEYS = 10_000 // har bir funksiya uçun alohida IP kalitlari çegarasi

/** Har bir funksiya öz hisoblagiçi bilan — biri ikkinçisining limitini egallab qöya olmaydi */
type Bucket = {
  limit: number
  global: number
  hits: Map<string, number[]>
  all: number[]
  lastSweep: number
}
const BUCKETS: Record<string, Bucket> = {}
const bucket = (scope: string, limit: number, global: number) =>
  (BUCKETS[scope] ??= { limit, global, hits: new Map(), all: [], lastSweep: 0 })

function sweep(b: Bucket, now: number) {
  for (const [k, ts] of b.hits) {
    const recent = ts.filter((t) => now - t < WINDOW)
    if (recent.length) b.hits.set(k, recent)
    else b.hits.delete(k)
  }
  b.lastSweep = now
}

/**
 * @param scope   funksiya nomi: 'appeal' (murojaatlar: 5 / 60), 'text-error' (matndagi xato: 10 / 120),
 *                'membership' (aʼzolik arizalari: 3 / 40), 'rating' (maqola baholari: 20 / 600)
 */
export function rateLimited(ip: string, scope: 'appeal' | 'text-error' | 'membership' | 'volunteer' | 'rating' = 'appeal'): boolean {
  const b =
    scope === 'appeal'
      ? bucket(scope, 5, 60)
      : scope === 'membership' || scope === 'volunteer'
        ? bucket(scope, 3, 40)
        : scope === 'rating'
          ? bucket(scope, 20, 600)
          : bucket(scope, 10, 120)
  const now = Date.now()

  // 1) funksiya chegarasi — IP'ga bog'liq emas
  b.all = b.all.filter((t) => now - t < WINDOW)
  if (b.all.length >= b.global) return true

  // 2) muddati o'tganlarnigina tozalaymiz; faol hisoblagichlarga tegmaymiz
  if (now - b.lastSweep > WINDOW || b.hits.size >= MAX_KEYS) sweep(b, now)
  if (b.hits.size >= MAX_KEYS && !b.hits.has(ip)) return true // joy yo'q — yangi kalit rad etiladi

  const recent = (b.hits.get(ip) ?? []).filter((t) => now - t < WINDOW)
  if (recent.length >= b.limit) {
    b.hits.set(ip, recent)
    return true
  }
  recent.push(now)
  b.hits.set(ip, recent)
  b.all.push(now)
  return false
}

/**
 * Mijoz IP'si — faqat ishonchli proksi qo'shgan qiymatdan.
 * Serverda (Dokploy → Traefik) teskari proksi X-Forwarded-For oxiriga haqiqiy ulanish manzilini QO'SHADI;
 * chap tomondagi qiymatlarni esa mijoz o'zi yozib yuborishi mumkin. Shuning uchun o'ngdan
 * TRUSTED_PROXY_HOPS-inchi qiymat olinadi (sukut: 1). Mijoz yuborishi mumkin bo'lgan boshqa
 * sarlavhalar (X-Real-IP va h.k.) zaxira sifatida O'QILMAYDI — kutilmagan holatda umumiy kalit.
 */
export function clientIp(h: Headers): string {
  const hops = Math.max(1, Number(process.env.TRUSTED_PROXY_HOPS) || 1)
  const chain = (h.get('x-forwarded-for') ?? '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
  if (chain.length < hops) return 'unknown'
  const ip = chain[chain.length - hops].toLowerCase()
  return /^[0-9a-f:.]{3,45}$/.test(ip) ? v6Prefix(ip) : 'unknown'
}

/**
 * IPv6 manzil /64 tarmoq qismi böyiça hisoblanadi: bitta abonentga butun /64 beriladi, aks holda
 * bir kişi undagi manzillarni almaştirib, limitni çetlab öta oladi. IPv4 (va ::ffff:IPv4) özgarmaydi.
 */
function v6Prefix(ip: string): string {
  if (!ip.includes(':') || ip.includes('.')) return ip
  const [head, tail = ''] = ip.split('::')
  const h = head ? head.split(':') : []
  const t = tail ? tail.split(':') : []
  const full = ip.includes('::') ? [...h, ...Array(Math.max(0, 8 - h.length - t.length)).fill('0'), ...t] : h
  if (full.length !== 8) return ip
  return `${full.slice(0, 4).map((x) => x.replace(/^0+(?=.)/, '')).join(':')}::/64`
}
