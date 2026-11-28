/**
 * Yagona sahifalarni (globals) kod içidagi maʼlumotdan bazaga köçiradi: Markaziy Kengaş.
 * Işga tuşiriş: pnpm payload run scripts/seed/sahifalar.ts
 */
import { getPayload } from 'payload'

import config from '../../src/payload.config'
import * as K from '../../src/components/kengash/data'

import { media } from './_lib'

const payload = await getPayload({ config })
const t = (arr: string[]) => arr.map((x) => ({ t: x }))

await payload.updateGlobal({
  slug: 'markaziy-kengash',
  locale: 'uz',
  overrideAccess: true,
  data: {
    about: { lead: K.ABOUT.lead, paras: t(K.ABOUT.paras) },
    stats: K.STATS,
    organs: K.ORGANS,
    powers: t(K.POWERS),
    members: {
      lead: K.MEMBERS.lead, facts: t(K.MEMBERS.facts), byPost: t(K.MEMBERS.byPost), fields: t(K.MEMBERS.fields),
      link: K.MEMBERS.link, extra: K.MEMBERS.extra,
    },
    leaders: await Promise.all(
      K.LEADERS.map(async (l) => ({
        name: l.name, full: l.full, role: l.role, img: l.img ? await media(payload, l.img, l.name, 'Markaziy Kengash') : null,
        born: l.born, edu: t(l.edu ?? []), career: l.career ?? [],
      })),
    ),
    bodies: K.BODIES.map((b) => ({ t: b.t, meta: b.meta, d: b.d, items: t(b.items) })),
    events: await Promise.all(K.EVENTS.map(async (e) => ({ ...e, img: await media(payload, e.img, e.t, 'Markaziy Kengash') }))),
    images: {
      building: await media(payload, K.IMG.building, 'Markaziy Kengash binosi', 'Markaziy Kengash'),
      delegates: await media(payload, K.IMG.delegates, 'Delegatlar', 'Markaziy Kengash'),
    },
    contact: K.CONTACT,
  } as never,
})
console.log('Markaziy Kengash: yangilandi')
process.exit(0)
