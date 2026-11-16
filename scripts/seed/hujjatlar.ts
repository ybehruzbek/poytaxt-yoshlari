/** Normativ-huquqiy hujjatlarni bazaga köçiradi. Işga tuşiriş: pnpm payload run scripts/seed/hujjatlar.ts */
import { getPayload } from 'payload'

import config from '../../src/payload.config'
import { GROUPS } from '../../src/components/hujjatlar/data'

import { upsert } from './_lib'

const payload = await getPayload({ config })
let n = 0
for (const g of GROUPS) {
  const grp = await upsert(payload, 'act-groups', { slug: { equals: g.id } }, { slug: g.id, generateSlug: false, t: g.t, lead: g.lead })
  for (const a of g.acts) {
    await upsert(payload, 'acts', { and: [{ t: { equals: a.t } }, { grp: { equals: grp.id } }] }, {
      grp: grp.id, kind: a.kind, y: a.y, t: a.t, d: a.d, org: a.org, no: a.no, name: a.name, href: a.href ?? null,
      for: a.for ?? [], by: a.by, kw: a.kw, reg: a.reg, noT: a.noT,
    })
    n++
  }
}
console.log('guruhlar:', GROUPS.length, ', hujjatlar:', n)
process.exit(0)
