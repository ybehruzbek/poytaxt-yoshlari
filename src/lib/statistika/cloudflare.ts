/**
 * Cloudflare Web Analytics maʼlumotlari (GraphQL Analytics API, faqat serverda).
 * Saytdagi hisoblagiç (CfBeacon) har bir sahifa oçilişini Cloudflare'ga yuboradi; bu yerda ular yiğib olinadi.
 *  - “köriş” (count) — sahifa oçilişlari soni;
 *  - “tashrif” (sum.visits) — saytga taşqaridan (qidiruv, Telegram, töğridan-töğri) kiriş soni.
 * Cloudflare noyob foydalanuvçini sanamaydi (cookie yöq), şuning uçun “tashrif” — eng yaqin körsatkiç.
 * Natijalar qisqa muddat xotirada saqlanadi: panel tez oçiladi va API çeklovidan (5 daqiqada 300 sörov) oşilmaydi.
 */

const API = 'https://api.cloudflare.com/client/v4/graphql'
const DATASET = 'rumPageloadEventsAdaptiveGroups'
/** Toşkent vaqti (UTC+5, yozgi vaqt yöq) */
export const TZ = 5 * 3600 * 1000
const DAY = 86400 * 1000
/** bir sörovdagi eng uzun oraliq (namunasiz, töliq maʼlumot) */
const BOLAK = 3 * DAY

const HOST = new URL(process.env.NEXT_PUBLIC_SERVER_URL || 'https://yoshkent.uz').hostname

export const sozlangan = () => Boolean(process.env.CF_API_TOKEN && /^[0-9a-f]{32}$/i.test(process.env.CF_ACCOUNT_ID ?? ''))

export type Qator = { k: string; tashrif: number; koris: number }
export type Nuqta = { t: number; tashrif: number; koris: number }
export type Davr = 1 | 7 | 30 | 90
export type Stat = {
  davr: Davr
  from: number
  to: number
  /** Cloudflare saqlaydigan muddat sabab davr qisqartirilgan bölsa — haqiqiy boşlanişi */
  qisqardi: boolean
  jami: { tashrif: number; koris: number }
  /** bugun — soatbay, boşqa davrlar — kunbay (Toşkent vaqti) */
  qadam: 'soat' | 'kun'
  seriya: Nuqta[]
  qurilma: Qator[]
  brauzer: Qator[]
  tizim: Qator[]
  davlat: Qator[]
  manba: Qator[]
  sahifa: Qator[]
}
export type Hozir = { d5: number; d30: number; bugun: { tashrif: number; koris: number }; keca: { tashrif: number; koris: number } }

type Group = { count: number; sum?: { visits: number }; dimensions?: Record<string, string> }

/* ---------- API ---------- */

async function gql<T>(query: string): Promise<T> {
  const res = await fetch(API, {
    method: 'POST',
    headers: { Authorization: `Bearer ${process.env.CF_API_TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
    cache: 'no-store',
    signal: AbortSignal.timeout(15000),
  })
  const j = (await res.json().catch(() => null)) as { data?: T; errors?: { message: string }[] | null } | null
  if (!res.ok || !j || (j.errors && j.errors.length)) {
    throw new Error(j?.errors?.map((e) => e.message).join('; ') || `Cloudflare javob bermadi (HTTP ${res.status})`)
  }
  return j.data as T
}

const account = () => (process.env.CF_ACCOUNT_ID ?? '').toLowerCase()
const wrap = (body: string) => `{ viewer { accounts(filter: { accountTag: "${account()}" }) { ${body} } } }`
const iso = (t: number) => new Date(t).toISOString().replace(/\.\d{3}Z$/, 'Z')
// bot: 0 — Cloudflare bot deb aniqlagan körişlar sanalmaydi
const filter = (from: number, to: number) =>
  `{ AND: [{ datetime_geq: "${iso(from)}" }, { datetime_lt: "${iso(to)}" }, { requestHost: "${HOST}" }, { bot: 0 }] }`

/* ---------- qisqa xotira ---------- */

const memo = new Map<string, { t: number; p: Promise<unknown> }>()
function cached<T>(key: string, ttl: number, fn: () => Promise<T>): Promise<T> {
  const hit = memo.get(key)
  if (hit && Date.now() - hit.t < ttl) return hit.p as Promise<T>
  const p = fn()
  memo.set(key, { t: Date.now(), p })
  p.catch(() => memo.delete(key))
  return p
}

/* ---------- çeklovlar ---------- */

type Limits = { maxDuration: number; notOlderThan: number }
/** Cloudflare bu maʼlumot uçun qança orqaga va bir sörovda qança kenglikda berişi (soniya) */
function limits(): Promise<Limits> {
  return cached('limits', DAY, async () => {
    type R = { viewer: { accounts: { settings: Record<string, Limits> }[] } }
    const d = await gql<R>(wrap(`settings { ${DATASET} { maxDuration notOlderThan } }`))
    const l = d.viewer.accounts[0]?.settings?.[DATASET]
    if (!l) throw new Error('Cloudflare hisobida Web Analytics maʼlumoti topilmadi')
    return l
  })
}

/* ---------- yiğiş ---------- */

const DIM = {
  qurilma: ['deviceType', 10],
  brauzer: ['userAgentBrowser', 12],
  tizim: ['userAgentOS', 12],
  davlat: ['countryName', 30],
  manba: ['refererHost', 60],
  sahifa: ['requestPath', 100],
} as const
type DimKey = keyof typeof DIM

const metric = 'count sum { visits }'
const one = (g: Group) => ({ tashrif: g.sum?.visits ?? 0, koris: g.count ?? 0 })

type Bolak = { seriya: { t: number; tashrif: number; koris: number }[] } & Record<DimKey, Qator[]> & {
    jami: { tashrif: number; koris: number }
  }

/** Bir sörovga sığadigan oraliq: barça kesimlar bitta GraphQL sörovida (taxalluslar bilan) */
async function bolak(from: number, to: number): Promise<Bolak> {
  const f = filter(from, to)
  const parts = [
    `jami: ${DATASET}(filter: ${f}, limit: 1) { ${metric} }`,
    `seriya: ${DATASET}(filter: ${f}, limit: 5000, orderBy: [datetimeHour_ASC]) { ${metric} dimensions { datetimeHour } }`,
    ...Object.entries(DIM).map(
      ([k, [dim, n]]) => `${k}: ${DATASET}(filter: ${f}, limit: ${n}, orderBy: [count_DESC]) { ${metric} dimensions { ${dim} } }`,
    ),
  ]
  type R = { viewer: { accounts: Record<string, Group[]>[] } }
  const a = (await gql<R>(wrap(parts.join('\n')))).viewer.accounts[0] ?? {}
  const out = {
    jami: one(a.jami?.[0] ?? { count: 0 }),
    seriya: (a.seriya ?? []).map((g) => ({ t: Date.parse(g.dimensions?.datetimeHour ?? ''), ...one(g) })),
  } as Bolak
  for (const [k, [dim]] of Object.entries(DIM) as [DimKey, (typeof DIM)[DimKey]][]) {
    out[k] = (a[k] ?? []).map((g) => ({ k: g.dimensions?.[dim] ?? '', ...one(g) }))
  }
  return out
}

/** Toşkent vaqti böyiça kun boşi (UTC millisoniya) */
export const kunBoshi = (t: number) => Math.floor((t + TZ) / DAY) * DAY - TZ

function merge(list: Qator[][]): Qator[] {
  const m = new Map<string, Qator>()
  for (const l of list)
    for (const q of l) {
      const x = m.get(q.k) ?? { k: q.k, tashrif: 0, koris: 0 }
      x.tashrif += q.tashrif
      x.koris += q.koris
      m.set(q.k, x)
    }
  return [...m.values()].sort((a, b) => b.koris - a.koris || b.tashrif - a.tashrif)
}

/** Tanlangan davr statistikasi: 1 (bugun), 7, 30 yoki 90 kun */
export function davrStat(davr: Davr): Promise<Stat> {
  const now = Date.now()
  // bugungi maʼlumot tez-tez yangilanadi, uzun davrlar — kamroq
  const ttl = davr === 1 ? 2 * 60e3 : 10 * 60e3
  return cached(`davr:${davr}`, ttl, async () => {
    const lim = await limits()
    const to = now
    const want = kunBoshi(now) - (davr - 1) * DAY
    const oldest = now - lim.notOlderThan * 1000 + 60e3
    const from = Math.max(want, oldest)
    // Cloudflare bir haftadan uzun oraliqni ~10% namuna böyiça beradi va kam taşrifli saytda raqamlar
    // yöqolib qoladi (2026-11-24 da serverda tekşirildi: 72 soat — töliq, 10 kun — namuna). Şuning uçun
    // davr 3 kunlik bölaklarga bölinadi; har bölak — barça kesimlar bilan bitta sörov
    const step = Math.max(3600e3, Math.min(lim.maxDuration * 1000, BOLAK))

    const ranges: [number, number][] = []
    for (let a = from; a < to; a += step) ranges.push([a, Math.min(a + step, to)])
    // bir vaqtda köpi bilan 5 ta sörov (90 kun — 30 ta sörov; çeklov: 5 daqiqada 300 ta)
    const parts: Bolak[] = []
    for (let i = 0; i < ranges.length; i += 5) {
      parts.push(...(await Promise.all(ranges.slice(i, i + 5).map(([a, b]) => bolak(a, b)))))
    }

    const qadam = davr === 1 ? 'soat' : 'kun'
    const unit = qadam === 'soat' ? 3600e3 : DAY
    const start = qadam === 'soat' ? kunBoshi(now) : kunBoshi(from)
    const buckets = new Map<number, Nuqta>()
    for (let t = start; t <= to; t += unit) buckets.set(t, { t, tashrif: 0, koris: 0 })
    for (const p of parts)
      for (const s of p.seriya) {
        if (!Number.isFinite(s.t)) continue
        const key = qadam === 'soat' ? Math.floor((s.t - start) / unit) * unit + start : kunBoshi(s.t)
        const b = buckets.get(key)
        if (b) {
          b.tashrif += s.tashrif
          b.koris += s.koris
        }
      }

    const stat: Stat = {
      davr,
      from,
      to,
      qisqardi: from > want,
      jami: parts.reduce((s, p) => ({ tashrif: s.tashrif + p.jami.tashrif, koris: s.koris + p.jami.koris }), { tashrif: 0, koris: 0 }),
      qadam,
      seriya: [...buckets.values()],
    } as Stat
    for (const k of Object.keys(DIM) as DimKey[]) stat[k] = merge(parts.map((p) => p[k]))
    return stat
  })
}

/** Hozirgi holat: oxirgi 5 va 30 daqiqa, bugun va keçaning şu vaqtgaça (Toşkent vaqti) */
export function hozir(): Promise<Hozir> {
  return cached('hozir', 60e3, async () => {
    const now = Date.now()
    const b = kunBoshi(now)
    const q = (name: string, from: number, to: number) => `${name}: ${DATASET}(filter: ${filter(from, to)}, limit: 1) { ${metric} }`
    type R = { viewer: { accounts: Record<string, Group[]>[] } }
    const a =
      (
        await gql<R>(
          wrap(
            [
              q('d5', now - 5 * 60e3, now),
              q('d30', now - 30 * 60e3, now),
              q('bugun', b, now),
              q('keca', b - DAY, now - DAY),
            ].join('\n'),
          ),
        )
      ).viewer.accounts[0] ?? {}
    const g = (k: string) => one(a[k]?.[0] ?? { count: 0 })
    return { d5: g('d5').koris, d30: g('d30').koris, bugun: g('bugun'), keca: g('keca') }
  })
}
