import 'server-only'

import { getPayload } from 'payload'
import { cache } from 'react'

import config from '@payload-config'
import { DEFAULT_MIQDOR, type Miqdorlar } from '@/lib/miqdorlar'

type G = {
  bhm?: { v?: number | null; from?: string | null; act?: string | null }
  stip?: { v?: number | null; from?: string | null; url?: string | null; source?: string | null }
  stipSum?: { prezident?: number | null; nomli?: number | null; alo?: number | null }
  mb?: { v?: number | null; from?: string | null; url?: string | null }
}

/** Admin paneldagi “Miqdorlar” sozlamasi; töldirilmagan qiymatlar zaxiradan olinadi */
export const getMiqdorlar = cache(async (locale = 'uz'): Promise<Miqdorlar> => {
  try {
    const payload = await getPayload({ config })
    const g = (await payload.findGlobal({ slug: 'miqdorlar', locale: locale as 'uz', fallbackLocale: 'uz', depth: 0 })) as G
    const D = DEFAULT_MIQDOR
    return {
      BHM: { v: g.bhm?.v || D.BHM.v, from: g.bhm?.from || D.BHM.from, act: g.bhm?.act || D.BHM.act },
      STIP_BAZA: {
        v: g.stip?.v || D.STIP_BAZA.v,
        from: g.stip?.from || D.STIP_BAZA.from,
        url: g.stip?.url || D.STIP_BAZA.url,
        source: g.stip?.source || D.STIP_BAZA.source,
      },
      STIP_SUM: {
        prezident: g.stipSum?.prezident || D.STIP_SUM.prezident,
        nomli: g.stipSum?.nomli || D.STIP_SUM.nomli,
        alo: g.stipSum?.alo || D.STIP_SUM.alo,
      },
      MB_STAVKA: { v: g.mb?.v || D.MB_STAVKA.v, from: g.mb?.from || D.MB_STAVKA.from, url: g.mb?.url || D.MB_STAVKA.url },
    }
  } catch {
    return DEFAULT_MIQDOR
  }
})
