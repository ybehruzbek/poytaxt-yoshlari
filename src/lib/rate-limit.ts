/**
 * Murojaat shakli uchun spam cheklovi va ishonchli mijoz IP'si (server tomonida ishlatiladi).
 *
 *  - Bitta IP'dan 10 daqiqada 5 tadan ortiq murojaat qabul qilinmaydi.
 *  - IP'dan qat'i nazar, butun sayt bo'yicha 10 daqiqada 60 tadan ortiq murojaat qabul qilinmaydi
 *    (soxta/ko'p manzil bilan bazani to'ldirishning oldi olinadi).
 *  - Faol (oyna ichidagi) hisoblagichlar xotirani bo'shatish uchun HECH QACHON o'chirilmaydi:
 *    joy tugasa, yangi manzillar rad etiladi ("fail closed").
 *  Hisoblagich jarayon xotirasida — bitta server nusxasi uchun. Bir nechta nusxada umumiy, TTL'li
 *  xotira (masalan, Redis INCR + EXPIRE) kerak bo'ladi.
 */
const WINDOW = 10 * 60 * 1000
const LIMIT = 5
const GLOBAL_LIMIT = 60
const MAX_KEYS = 10_000
const hits = new Map<string, number[]>()
let globalHits: number[] = []
let lastSweep = 0

function sweep(now: number) {
  for (const [k, ts] of hits) {
    const recent = ts.filter((t) => now - t < WINDOW)
    if (recent.length) hits.set(k, recent)
    else hits.delete(k)
  }
  lastSweep = now
}

export function rateLimited(ip: string): boolean {
  const now = Date.now()

  // 1) umumiy chegara — IP'ga bog'liq emas
  globalHits = globalHits.filter((t) => now - t < WINDOW)
  if (globalHits.length >= GLOBAL_LIMIT) return true

  // 2) muddati o'tganlarnigina tozalaymiz; faol hisoblagichlarga tegmaymiz
  if (now - lastSweep > WINDOW || hits.size >= MAX_KEYS) sweep(now)
  if (hits.size >= MAX_KEYS && !hits.has(ip)) return true // joy yo'q — yangi kalit rad etiladi

  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW)
  if (recent.length >= LIMIT) {
    hits.set(ip, recent)
    return true
  }
  recent.push(now)
  hits.set(ip, recent)
  globalHits.push(now)
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
  return /^[0-9a-f:.]{3,45}$/.test(ip) ? ip : 'unknown'
}
