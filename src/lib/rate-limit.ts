/** Murojaat shakli uchun spam cheklovi va ishonchli mijoz IP'si (server tomonida ishlatiladi). */
/* Spam himoyasi: bitta IP'dan 10 daqiqada 5 tadan ortiq murojaat qabul qilinmaydi.
   Hisoblagich jarayon xotirasida, hajmi cheklangan va eskilari tozalanadi.
   (Bitta server nusxasi uchun; bir nechta nusxada umumiy xotira — masalan, Redis — kerak bo'ladi.) */
const WINDOW = 10 * 60 * 1000
const LIMIT = 5
const MAX_KEYS = 10_000
const hits = new Map<string, number[]>()
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
  if (now - lastSweep > WINDOW || hits.size > MAX_KEYS) sweep(now)
  // tozalashdan keyin ham to'lib qolgan bo'lsa — eng eski kalitlarni chiqaramiz (Map qo'shilish tartibini saqlaydi)
  while (hits.size >= MAX_KEYS) hits.delete(hits.keys().next().value as string)
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW)
  recent.push(now)
  hits.delete(ip) // qayta qo'shib, "eng yangi" qilib qo'yamiz
  hits.set(ip, recent.slice(-(LIMIT + 1)))
  return recent.length > LIMIT
}

/**
 * Mijoz IP'si — faqat ishonchli proksi qo'shgan qiymatdan.
 * Serverda (Dokploy → Traefik) teskari proksi X-Forwarded-For oxiriga haqiqiy ulanish manzilini QO'SHADI;
 * chap tomondagi qiymatlarni esa mijoz o'zi yozib yuborishi mumkin. Shuning uchun o'ngdan
 * TRUSTED_PROXY_HOPS-inchi qiymat olinadi (sukut: 1 — bitta proksi).
 */
export function clientIp(h: Headers): string {
  const hops = Math.max(1, Number(process.env.TRUSTED_PROXY_HOPS) || 1)
  const chain = (h.get('x-forwarded-for') ?? '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
  const ip = chain.length >= hops ? chain[chain.length - hops] : h.get('x-real-ip')?.trim()
  // kutilmagan shakl bo'lsa — umumiy kalit (cheklov hammaga birga ishlaydi, chetlab o'tib bo'lmaydi)
  return ip && /^[0-9a-f:.]{3,45}$/i.test(ip) ? ip : 'unknown'
}
