import { toJoriyAlifbo } from './alifbo'

/**
 * Bazadagi o'zbekcha kontentni JORIY lotin alifbosiga o'tkazish (2026-11-28, foydalanuvchi qarori).
 * Ikki joyda ishlatiladi: migratsiya (src/migrations/20261128_joriy_alifbo.ts — serverda o'zi bajariladi)
 * va lokal skript (pnpm imlo:db). Qayta ishga tushirish xavfsiz.
 *
 * 1) Enum qiymatlari (qabul kunlari, kompaniya turi) joriy shaklga qayta nomlanadi.
 * 2) Barcha jadvallarning text / varchar / jsonb ustunlarida yangi alifbo harfi (Ö Ğ Ş Ç ʼ) bor qiymatlar
 *    toJoriyAlifbo() bilan o'giriladi. Havola, slug — ASCII, ularga tegilmaydi. *_locales jadvallarida faqat “uz”.
 *    Fuqarolar yuborgan matnlar (murojaat, a'zolik va volontyorlik arizalari, matndagi xato xabarlari),
 *    foydalanuvchilar va Payload xizmat jadvallariga tegilmaydi.
 */
export type Query = (q: string, params?: unknown[]) => Promise<Record<string, unknown>[]>

const SKIP = /^(appeals|appeal_files|memberships|volunteers|text_errors|users|users_sessions|news_ratings|news_reactions|payload_)/
const YANGI = '[ÖöĞğŞşÇçʼ]'

const map = (v: unknown): unknown =>
  typeof v === 'string'
    ? toJoriyAlifbo(v)
    : Array.isArray(v)
      ? v.map(map)
      : v && typeof v === 'object'
        ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, map(x)]))
        : v

/** Enum qiymatlarini qayta nomlash (qiymat bo'lsa) */
async function enumlar(query: Query) {
  const labels = (await query(
    `select t.typname, e.enumlabel from pg_enum e join pg_type t on t.oid = e.enumtypid where e.enumlabel ~ '${YANGI}'`,
  )) as { typname: string; enumlabel: string }[]
  for (const { typname, enumlabel } of labels) {
    const yangi = toJoriyAlifbo(enumlabel)
    if (yangi !== enumlabel) await query(`alter type "public"."${typname}" rename value '${enumlabel}' to '${yangi.replace(/'/g, "''")}'`)
  }
  return labels.length
}

export async function bazaniJoriyga(query: Query, yoz = true): Promise<{ jami: number; enum: number; jadval: Record<string, number> }> {
  const en = yoz ? await enumlar(query) : 0
  const cols = (await query(
    `select c.table_name t, c.column_name c, c.data_type d,
            exists(select 1 from information_schema.columns x where x.table_schema='public' and x.table_name=c.table_name and x.column_name='_locale') loc
       from information_schema.columns c join information_schema.tables tb on tb.table_name=c.table_name and tb.table_schema='public'
      where c.table_schema='public' and tb.table_type='BASE TABLE' and c.data_type in ('text','character varying','jsonb')
        and exists(select 1 from information_schema.columns x where x.table_schema='public' and x.table_name=c.table_name and x.column_name='id')
      order by 1, 2`,
  )) as { t: string; c: string; d: string; loc: boolean }[]

  let jami = 0
  const jadval: Record<string, number> = {}
  for (const { t, c, d, loc } of cols) {
    if (SKIP.test(t)) continue
    const where = `${d === 'jsonb' ? `"${c}"::text` : `"${c}"`} ~ '${YANGI}'${loc ? ` and "_locale"::text = 'uz'` : ''}`
    const rows = await query(`select id, "${c}" v from "${t}" where ${where}`)
    for (const r of rows) {
      const next = d === 'jsonb' ? map(r.v) : toJoriyAlifbo(r.v as string)
      if (JSON.stringify(next) === JSON.stringify(r.v)) continue
      if (yoz) await query(`update "${t}" set "${c}" = $1 where id = $2`, [d === 'jsonb' ? JSON.stringify(next) : next, r.id])
      jadval[t] = (jadval[t] ?? 0) + 1
      jami++
    }
  }
  return { jami, enum: en, jadval }
}
