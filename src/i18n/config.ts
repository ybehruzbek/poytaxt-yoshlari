/** Sayt tillari. Manzillar: /uz, /ru, /en */
export const locales = ['uz', 'ru', 'en'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'uz'

export const localeLabels: Record<Locale, string> = {
  uz: 'O‘zbekcha',
  ru: 'Русский',
  en: 'English',
}

export function isLocale(value: string | undefined): value is Locale {
  return !!value && (locales as readonly string[]).includes(value)
}
