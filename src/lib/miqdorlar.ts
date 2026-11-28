/**
 * Saytdagi barça pul miqdorlari şu asosiy qiymatlarga bog'langan: bazaviy hisoblaş miqdori (BHM), talabalar bazaviy
 * stipendiyasi va rasmiy stipendiya summalari. Qiymatlar admin paneldagi “Miqdorlar” sozlamasida (global `miqdorlar`)
 * saqlanadi: serverda `getMiqdorlar()` (lib/cms/miqdorlar.ts), brauzerda `useMiqdor()` (MiqdorProvider) orqali olinadi.
 * Quyidagi DEFAULT_MIQDOR — baza hali töldirilmagan holat uçun zaxira qiymatlar.
 */

export type Miqdorlar = {
  /** Bazaviy hisoblaş miqdori */
  BHM: { v: number; from: string; act: string }
  /** Oliy taʼlim talabalarining bazaviy stipendiyasi (oyiga) */
  STIP_BAZA: { v: number; from: string; url: string; source: string }
  /** Rasmiy jadvaldagi stipendiya summalari (söm) — koeffitsientlar şulardan hisoblanadi */
  STIP_SUM: { prezident: number; nomli: number; alo: number }
  /** Markaziy bankning asosiy stavkasi (yillik, foiz) — taʼlim krediti hisobi uçun */
  MB_STAVKA: { v: number; from: string; url: string }
}

export const DEFAULT_MIQDOR: Miqdorlar = {
  BHM: { v: 440_000, from: '2026-yil 1-sentabr', act: 'Prezidentning 2026-yil 23-iyundagi PF–115-son farmoni' },
  STIP_BAZA: {
    v: 609_548,
    from: '2026-yil 1-sentabr',
    url: 'https://gov.uz/oz/edu/sections/view/43494',
    source: 'gov.uz — Ta’lim va ilm-fan vazirligi',
  },
  STIP_SUM: { prezident: 2_579_444, nomli: 1_719_629, alo: 731_458 },
  MB_STAVKA: { v: 14, from: '2026-yil 3-sentabr', url: 'https://gov.uz/oz/edu/news/view/214742' },
}

/** Stipendiyalar bazaviy stipendiyaga nisbatan necha barobar (indeksatsiyada şu nisbatda oşadi) */
export const stipK = (M: Miqdorlar = DEFAULT_MIQDOR) => ({
  prezident: M.STIP_SUM.prezident / M.STIP_BAZA.v,
  nomli: M.STIP_SUM.nomli / M.STIP_BAZA.v,
  alo: M.STIP_SUM.alo / M.STIP_BAZA.v,
  baza: 1,
})

/* Eski nomlar — zaxira qiymatlar (bazaga ulanmagan joylar uçun) */
export const BHM = DEFAULT_MIQDOR.BHM
export const STIP_BAZA = DEFAULT_MIQDOR.STIP_BAZA
export const MB_STAVKA = DEFAULT_MIQDOR.MB_STAVKA
export const STIP_K = stipK(DEFAULT_MIQDOR)

/** Stavka: asos (BHM yoki bazaviy stipendiya) va koeffitsient */
export type Rate = { base: 'bhm' | 'stip'; k: number }

const NB = ' '

/** 2579444 → “2 579 444 söm” (raqam guruhlari va “söm” qatorga bölinmaydi) */
export const som = (n: number) => `${Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, NB)}${NB}so‘m`

/** 4.2318 → “4,23”, 3 → “3” */
export const fmtK = (k: number) => (Number.isInteger(k) ? String(k) : k.toFixed(2).replace(/0$/, '').replace('.', ','))

export const baseValue = (b: Rate['base'], M: Miqdorlar = DEFAULT_MIQDOR) => (b === 'bhm' ? M.BHM.v : M.STIP_BAZA.v)
export const rateSum = (r: Rate, M: Miqdorlar = DEFAULT_MIQDOR) => Math.round(r.k * baseValue(r.base, M))
export const baseName = (b: Rate['base']) => (b === 'bhm' ? 'BHM' : 'bazaviy stipendiya')

/** “BHMning 3 barobari” / “bazaviy stipendiyaning 4,23 barobari” */
export const rateText = (r: Rate) => `${r.base === 'bhm' ? 'BHMning' : 'bazaviy stipendiyaning'} ${fmtK(r.k)}${NB}barobari`

/** “1 320 000 söm (BHMning 3 barobari)” */
export const rateFull = (r: Rate, M: Miqdorlar = DEFAULT_MIQDOR) => `${som(rateSum(r, M))} (${rateText(r)})`

/** “BHMning 400 barobarigaça (176 000 000 sömgaça)” — grant va mukofotlar uçun */
export const bhmUpTo = (k: number, M: Miqdorlar = DEFAULT_MIQDOR) => `BHMning ${k}${NB}barobarigacha (${som(k * M.BHM.v)}gacha)`

/**
 * Admin panelda yozilgan matndagi belgilarni joriy summaga almaştiradi (BHM yoki stipendiya özgarsa, matn özi yangilanadi):
 *   {BHM×3}   → “1 320 000 söm”                     {BHM×3+} → “1 320 000 söm (BHMning 3 barobari)”
 *   {BHM≤400} → “BHMning 400 barobarigaça (… sömgaça)”  {BHM}    → BHMning özi
 *   {STIP×1,2} va {STIP×1,2+} — bazaviy stipendiya böyiça; {PREZIDENT}, {NOMLI}, {ALO} — rasmiy stipendiya summalari;
 *   {MB} — Markaziy bankning asosiy stavkasi (foiz).
 */
export const SUMMA_IZOH =
  'Summa avtomatik hisoblanishi uchun belgi yozing: {BHM×3} — BHMning 3 barobari (1 320 000 so‘m); {BHM×3+} — summa va “(BHMning 3 barobari)”; {BHM≤400} — “BHMning 400 barobarigacha (… so‘mgacha)”; {STIP×1,2} — bazaviy stipendiya bo‘yicha; {NOMLI}, {PREZIDENT}, {ALO} — stipendiya summalari; {MB} — Markaziy bank stavkasi.'

export function summalar(text: string, M: Miqdorlar = DEFAULT_MIQDOR): string {
  if (!text || !text.includes('{')) return text
  const num = (s: string) => Number(s.replace(',', '.'))
  const val = (b: string) => (b === 'BHM' ? M.BHM.v : M.STIP_BAZA.v)
  return text
    .replace(/\{BHM≤([\d.,]+)\}/g, (_, k) => bhmUpTo(num(k), M))
    .replace(/\{(BHM|STIP)(?:[×x*]([\d.,]+))?(\+)?\}/g, (_, b: string, k: string | undefined, full: string | undefined) => {
      const kk = k ? num(k) : 1
      return full ? rateFull({ base: b === 'BHM' ? 'bhm' : 'stip', k: kk }, M) : som(kk * val(b))
    })
    .replace(/\{(PREZIDENT|NOMLI|ALO)\}/g, (_, x: string) => som(M.STIP_SUM[x.toLowerCase() as 'prezident' | 'nomli' | 'alo']))
    .replace(/\{MB\}/g, String(M.MB_STAVKA.v))
}
