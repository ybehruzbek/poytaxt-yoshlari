import type { ComponentType } from 'react'

import { AboutB, AboutC, MembersB, MembersC, OrgansB, OrgansC, PowersB, PowersC } from './AltKgOne'
import { BodiesB, BodiesC, ContactB, ContactC, DecisionsB, DecisionsC, LeadersB, LeadersC } from './AltKgTwo'

/**
 * VAQTINCHA: bölimlar B/C variantlari reestri. Kalit: «{bölim}-{b|c}».
 * Tanlov tugagaç olib taşlanadi.
 */
export const KgVariants: Record<string, ComponentType<{ L: (h: string) => string }>> = {
  'kab-b': AboutB,
  'kab-c': AboutC,
  'kor-b': OrgansB,
  'kor-c': OrgansC,
  'kva-b': PowersB,
  'kva-c': PowersC,
  'kta-b': MembersB,
  'kta-c': MembersC,
  'kra-b': LeadersB,
  'kra-c': LeadersC,
  'kij-b': BodiesB,
  'kij-c': BodiesC,
  'kqa-b': DecisionsB,
  'kqa-c': DecisionsC,
  'kal-b': ContactB,
  'kal-c': ContactC,
}
