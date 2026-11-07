import type { ComponentType } from 'react'

import { AboutB, AboutC, DeptsB, DeptsC, ReceptionB, ReceptionC, TeamB, TeamC } from './AltHkOne'
import { AppealB, AppealC, ContactB, ContactC, OrgsB, OrgsC, ShotsB, ShotsC } from './AltHkTwo'

/**
 * VAQTINCHA: bölimlar B/C variantlari reestri. Kalit: «{bölim}-{b|c}».
 * Tanlov tugagaç olib taşlanadi.
 */
export const HkVariants: Record<string, ComponentType<{ L: (h: string) => string }>> = {
  'hab-b': AboutB,
  'hab-c': AboutC,
  'hap-b': DeptsB,
  'hap-c': DeptsC,
  'hja-b': TeamB,
  'hja-c': TeamC,
  'hqa-b': ReceptionB,
  'hqa-c': ReceptionC,
  'hmu-b': AppealB,
  'hmu-c': AppealC,
  'hbo-b': OrgsB,
  'hbo-c': OrgsC,
  'hla-b': ShotsB,
  'hla-c': ShotsC,
  'hal-b': ContactB,
  'hal-c': ContactC,
}
