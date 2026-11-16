/** “Aʼzo böliş” va “Volontyorlik” sahifalari matnlarini bazaga köçiradi. pnpm payload run scripts/seed/sahifa-matnlari.ts */
import { getPayload } from 'payload'

import config from '../../src/payload.config'
import { AFTER, CONDITIONS, STEPS } from '../../src/components/azolik/data'
import { DUTIES, LAW, QUIZ, RIGHTS, STEPS as VSTEPS, TIMES } from '../../src/components/volontyorlik/data'

const payload = await getPayload({ config })
const t = (a: string[]) => a.map((x) => ({ t: x }))

await payload.updateGlobal({
  slug: 'azolik-sahifa',
  locale: 'uz',
  overrideAccess: true,
  data: { conditions: CONDITIONS, steps: STEPS, after: t(AFTER) } as never,
})
console.log('azolik-sahifa: yangilandi')

const dirs = await payload.find({ collection: 'vol-directions', limit: 100, depth: 0, pagination: false })
const idOf = new Map(dirs.docs.map((d) => [(d as { slug?: string }).slug, d.id]))
const miss = QUIZ.flatMap((q) => q.a.flatMap((a) => a.dirs)).filter((s) => !idOf.has(s))
if (miss.length) throw new Error(`yönaliş topilmadi: ${[...new Set(miss)].join(', ')}`)

await payload.updateGlobal({
  slug: 'volontyorlik-sahifa',
  locale: 'uz',
  overrideAccess: true,
  data: {
    stats: [
      { v: '{TADBIRLAR}', t: 'ta volontyorlik va xayriya tadbiri ötkazildi' },
      { v: '1 287', t: 'nafar nomzod “Universe” volontyorlar maktabiga ariza berdi' },
      { v: '37', t: 'nafar volontyor 4 bosqiçli saralovdan ötib, maktabda tahsil oldi' },
    ],
    steps: VSTEPS,
    times: t(TIMES),
    law: LAW,
    rights: t(RIGHTS),
    duties: t(DUTIES),
    quiz: QUIZ.map((q) => ({ q: q.q, a: q.a.map((a) => ({ t: a.t, dirs: a.dirs.map((s) => idOf.get(s)) })) })),
  } as never,
})
console.log('volontyorlik-sahifa: yangilandi')
process.exit(0)
