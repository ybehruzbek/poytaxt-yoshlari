/**
 * “Biz haqimizda” bölimini bazaga köçiradi: OTT boşlanğiç taşkilotlari va yetakçilar, hamkorlar, hududiy Kengaş
 * bölimlari va xodimlari (qabul jadvali bilan). Işga tuşiriş: pnpm payload run scripts/seed/biz-haqimizda.ts
 */
import { getPayload } from 'payload'

import config from '../../src/payload.config'
import { OTMS } from '../../src/components/boshlangich/data'
import { PARTNERS } from '../../src/components/hamkorlar/data'
import { CHAIR, DEPTS, RECEPTION } from '../../src/components/hududiy/data'

import { media, upsert } from './_lib'

const payload = await getPayload({ config })
const only = process.env.ONLY?.split(',')
const want = (k: string) => !only || only.includes(k)

if (want('otts')) {
  for (const o of OTMS) {
    const l = o.leader
    await upsert(payload, 'otts', { otm: { equals: o.otm } }, {
      otm: o.otm,
      type: o.type,
      leader: l
        ? {
            name: l.name, img: await media(payload, l.img, l.name, 'Yoshlar yetakchilari'), role: l.role, spec: l.spec,
            phone: l.phone, email: l.email, telegram: l.telegram || null, instagram: l.instagram || null, facebook: l.facebook || null,
            about: l.about, elected: l.elected, members: l.members, reception: l.reception,
            achievements: l.achievements.map((t) => ({ t })), slug: l.slug,
          }
        : {},
    })
  }
  console.log('OTTlar:', OTMS.length)
}

if (want('partners')) {
  for (const p of PARTNERS) {
    await upsert(payload, 'partners', { slug: { equals: p.k } }, {
      slug: p.k, generateSlug: false, name: p.name, group: p.group, region: p.region ?? null, dirs: p.dirs, what: p.what,
      logo: await media(payload, p.logo, p.name, 'Hamkorlar logotiplari'), logoH: p.logoH ?? null, site: p.site ?? null, domain: p.domain ?? null,
    })
  }
  console.log('hamkorlar:', PARTNERS.length)
}

if (want('hududiy')) {
  const rec = (name: string) => {
    const r = RECEPTION.find((x) => x.name === name)
    return r ? { day: r.day, time: r.time, room: r.room } : {}
  }
  await upsert(payload, 'staff', { name: { equals: CHAIR.name } }, {
    name: CHAIR.name, role: CHAIR.role, chair: true, img: await media(payload, CHAIR.img, CHAIR.name, 'Kengash xodimlari'),
    qabul: rec(CHAIR.name), duties: CHAIR.duties.map((t) => ({ t })), socials: CHAIR.socials,
  })
  for (const d of DEPTS) {
    const dep = await upsert(payload, 'departments', { slug: { equals: d.key } }, {
      slug: d.key, generateSlug: false, short: d.short, t: d.t, room: d.room, tasks: d.tasks.map((t) => ({ t })),
    })
    for (const p of d.staff) {
      await upsert(payload, 'staff', { name: { equals: p.name } }, {
        name: p.name, role: p.role, chair: false, dept: dep.id, img: await media(payload, p.img, p.name, 'Kengash xodimlari'),
        phone: p.phone, email: p.email, qabul: rec(p.name), duties: (p.duties ?? []).map((t) => ({ t })), socials: p.socials ?? [],
      })
    }
  }
  console.log('hududiy Kengash: bo‘limlar', DEPTS.length, ', xodimlar', DEPTS.reduce((a, d) => a + d.staff.length, 1))
}

process.exit(0)
