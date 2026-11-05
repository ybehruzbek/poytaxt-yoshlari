import config from '@payload-config'
import { getPayload } from 'payload'

import { DEFAULT_SOCIALS, NETS, type Net } from './socials'

/** Admin paneldagi ijtimoiy tarmoq havolalari (o'qib bo'lmasa — boshlang'ich havolalar) */
export async function getSocials(): Promise<Record<Net, string>> {
  try {
    const payload = await getPayload({ config })
    const doc = (await payload.findGlobal({ slug: 'socials', depth: 0 })) as Partial<Record<Net, string | null>>
    // hali saqlanmagan maydon (null/undefined) — boshlang'ich havola; ataylab bo'shatilgan ('') — ko'rsatilmaydi
    return Object.fromEntries(NETS.map((n) => [n, doc[n] ?? DEFAULT_SOCIALS[n]])) as Record<Net, string>
  } catch (err) {
    console.error('[socials] havolalarni öqib bölmadi:', err)
    return DEFAULT_SOCIALS
  }
}
