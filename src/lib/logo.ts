import type { Locale } from '@/i18n/config'

/** Sayt logotipi: 180 px balandlikdagi WebP (ekranda 48–84 px, retina uçun 2×). Ölçam berilgani uçun sahifa sakramaydi */
const W: Record<Locale, number> = { uz: 322, ru: 391, en: 316 }

export const logo = (locale: Locale) => ({ src: `/img/logo-${locale}.webp`, width: W[locale], height: 180 })
