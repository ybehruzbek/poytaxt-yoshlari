import type { ComponentType } from 'react'

import { AboutB, AboutC } from './AltHkOne'
import { AppealB, AppealC, ContactB, ContactC } from './AltHkTwo'

/**
 * VAQTINCHA: bölimlar B/C variantlari reestri. Kalit: «{bölim}-{b|c}».
 * Tanlov tugagaç olib taşlanadi.
 */
export const HkVariants: Record<string, ComponentType<{ L: (h: string) => string }>> = {
  'hab-b': AboutB,
  'hab-c': AboutC,
  'hmu-b': AppealB,
  'hmu-c': AppealC,
  'hal-b': ContactB,
  'hal-c': ContactC,
}
