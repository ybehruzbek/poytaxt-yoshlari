import type { ComponentType } from 'react'

/**
 * VAQTINCHA: bölimlar B/C variantlari reestri. Kalit: «{bölim}-{b|c}».
 * Variant fayllari qöşilganda şu yerga ulanadi; tanlov tugagaç olib taşlanadi.
 */
export const KgVariants: Record<string, ComponentType<{ L: (h: string) => string }>> = {}
