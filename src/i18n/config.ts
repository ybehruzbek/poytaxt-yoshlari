/** Sayt tillari. Manzillar: /uz, /ru, /en */
export const locales = ['uz', 'ru', 'en'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'uz'

export const localeLabels: Record<Locale, string> = {
  uz: 'Özbekça',
  ru: 'Русский',
  en: 'English',
}

/** Hali tarjima qilinmagan tillar: til tanlagiçda “Tez orada” deb öçiq turadi, manzillari /uz ga yönaltiriladi */
export const soonLocales: readonly Locale[] = ['ru', 'en']
export const isLive = (l: Locale) => !soonLocales.includes(l)

export function isLocale(value: string | undefined): value is Locale {
  return !!value && (locales as readonly string[]).includes(value)
}
