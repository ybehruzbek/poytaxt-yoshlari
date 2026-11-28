import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

import { bazaniJoriyga, type Query } from '../lib/joriy-baza'

/**
 * Sayt matni joriy lotin alifbosiga qaytdi (2026-11-28): enum qiymatlari va bazadagi barcha o'zbekcha kontent
 * joriy shaklga o'tkaziladi (src/lib/joriy-baza.ts). Yangi alifbo endi faqat tashrif buyuruvchi tanlaganda
 * brauzerda hosil qilinadi. Orqaga qaytarish (down) yo'q — kerak bo'lsa zaxira nusxadan tiklanadi.
 */
export async function up({ db, payload }: MigrateUpArgs): Promise<void> {
  const query: Query = async (q, params = []) => {
    const parts = q.split(/\$\d+/)
    const chunks = parts.flatMap((p, i) => (i < params.length ? [sql.raw(p), sql`${params[i]}`] : [sql.raw(p)]))
    const res = (await db.execute(sql.join(chunks))) as unknown as { rows: Record<string, unknown>[] }
    return res.rows
  }
  const r = await bazaniJoriyga(query)
  payload.logger.info(`[joriy alifbo] ${r.jami} ta qiymat va ${r.enum} ta enum qiymati joriy alifboga o‘tkazildi`)
}

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  payload.logger.warn('[joriy alifbo] orqaga qaytarilmaydi — zaxira nusxadan tiklang')
}
