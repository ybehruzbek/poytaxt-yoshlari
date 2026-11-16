import { revalidatePath } from 'next/cache'
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, GlobalAfterChangeHook } from 'payload'

import { locales } from '@/i18n/config'

/**
 * Admin panelda saqlanganda saytdagi tegişli sahifalar darhol yangilanadi (60 soniya kutilmaydi).
 * `paths` — til qöşimçasisiz yöllar ('/faoliyat/grantlar'); '/' — bosh sahifa. `layout: true` bölsa,
 * yöl ostidagi barça sahifalar (masalan, /faoliyat/loyihalar/[slug]) ham yangilanadi.
 * Next.js söröv konteksti taşqarisida (seed skripti, taymer) revalidatePath xato beradi — e'tiborsiz qoldiriladi.
 */
function run(paths: string[], layout: boolean) {
  for (const l of locales) {
    for (const p of paths) {
      try {
        revalidatePath(`/${l}${p === '/' ? '' : p}`, layout ? 'layout' : 'page')
      } catch {
        /* söröv taşqarisida — sahifa `revalidate` muddati böyiça yangilanadi */
      }
    }
  }
}

/** Töplam uçun: saqlaş va öçirişda */
export function yangilash(paths: string[], layout = false) {
  const afterChange: CollectionAfterChangeHook = ({ doc }) => {
    run(paths, layout)
    return doc
  }
  const afterDelete: CollectionAfterDeleteHook = ({ doc }) => {
    run(paths, layout)
    return doc
  }
  return { afterChange: [afterChange], afterDelete: [afterDelete] }
}

/** Yagona sahifa (global) uçun */
export function yangilashGlobal(paths: string[], layout = false) {
  const afterChange: GlobalAfterChangeHook = ({ doc }) => {
    run(paths, layout)
    return doc
  }
  return { afterChange: [afterChange] }
}

const SITE = (process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000').replace(/\/$/, '')

/** “Saytda köriş” tugmasi uçun manzil */
export const saytManzil = (path: string, locale?: string | null) =>
  `${SITE}/${locale && (locales as readonly string[]).includes(locale) ? locale : 'uz'}${path === '/' ? '' : path}`
