/**
 * “Özbekiston yoşlar ittifoqi” sahifasini bazaga köçiradi (global ittifoq-sahifa).
 * Işga tuşiriş: pnpm payload run scripts/seed/ittifoq.ts
 */
import { getPayload } from 'payload'

import config from '../../src/payload.config'
import * as I from '../../src/components/ittifoq/data'

import { media } from './_lib'

const payload = await getPayload({ config })
const t = (arr: readonly string[]) => arr.map((x) => ({ t: x }))
const img = (p: string | undefined, alt: string) => (p ? media(payload, p, alt, 'Ittifoq sahifasi') : Promise.resolve(null))
const organ = (b: I.Body) => ({ t: b.t, d: b.d, meta: t(b.meta) })

const imgs: Record<string, number | null> = {}
for (const [k, v] of Object.entries(I.IMG)) imgs[k] = await img(v, k)

await payload.updateGlobal({
  slug: 'ittifoq-sahifa',
  locale: 'uz',
  overrideAccess: true,
  data: {
    who: { paras: t(I.WHO.paras), motto: I.WHO.motto },
    mission: I.MISSION,
    quote: I.QUOTE,
    stats: I.STATS,
    moreStats: I.MORE_STATS,
    history: I.HISTORY,
    privileges: await Promise.all(
      I.PRIVILEGES.map(async (p) => ({
        group: p.group, t: p.t, text: p.text, fact: p.fact, num: p.num, numL: p.numL, badge: !!p.badge,
        img: await img(p.img, p.t), medal: await img(p.medal, p.t),
      })),
    ),
    intl: {
      text: I.INTL.text, assoc: I.INTL.assoc, facts: I.INTL.facts, forms: t(I.INTL.forms), projects: t(I.INTL.projects),
      partners: await img(I.INTL.partners, 'Xalqaro hamkorlar'), flags: await img(I.INTL.flags, 'Hamkor davlatlar bayroqlari'),
    },
    palace: {
      name: I.PALACE.name, org: I.PALACE.org, text: I.PALACE.text, features: t(I.PALACE.features), img: await img(I.PALACE.img, I.PALACE.name),
      gallery: (await Promise.all(I.PALACE.gallery.map((g, i) => img(g, `${I.PALACE.name} — ${i + 1}`)))).filter(Boolean),
    },
    cityCentre: { name: I.CITY_CENTRE.name, text: I.CITY_CENTRE.text, facts: t(I.CITY_CENTRE.facts), img: await img(I.CITY_CENTRE.img, I.CITY_CENTRE.name) },
    centres: await Promise.all(I.CENTRES.map(async (c) => ({ region: c.region, img: await img(c.img, `${c.region} Yoshlar markazi`) }))),
    structure: {
      qurultoy: organ(I.STRUCTURE.qurultoy), council: organ(I.STRUCTURE.council), chair: organ(I.STRUCTURE.chair),
      exec: organ(I.STRUCTURE.exec), audit: organ(I.STRUCTURE.audit), levels: I.STRUCTURE.levels.map(organ), principles: t(I.STRUCTURE.principles),
    },
    official: I.OFFICIAL.rows.map(([k, v]) => ({ k, v })),
    priorities: I.PRIORITIES.titles.map((title, i) => ({ title, item: I.PRIORITIES.items[i] })),
    join: {
      steps: I.JOIN.steps, rights: t(I.JOIN.rights), duties: t(I.JOIN.duties), legal: I.JOIN.legal, note: I.JOIN.note, ends: t(I.JOIN.ends), cta: I.JOIN.cta,
    },
    orgs: {
      lead: I.ORGS.lead,
      ngos: await Promise.all(I.ORGS.ngos.map(async (o) => ({ t: o.t, g: o.g, d: o.d, logo: await img(o.logo, o.t) }))),
      companies: t(I.ORGS.companies),
    },
    companies: await Promise.all(I.COMPANIES.map(async (c) => ({ kind: c.kind, t: c.t, d: c.d, share: c.share, logo: await img(c.logo, c.t) }))),
    img: imgs,
  } as never,
})
console.log('Ittifoq sahifasi: yangilandi')
process.exit(0)
