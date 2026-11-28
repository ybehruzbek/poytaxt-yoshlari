/** Aloqa maʼlumotlari va FAQ ni bazaga köçiradi. pnpm payload run scripts/seed/boglanish.ts */
import { getPayload } from 'payload'

import config from '../../src/payload.config'
import { PRESS_CONTACT } from '../../src/components/axborot/data'
import { ADDRESS, EMAILS, HOURS, LAW, PHONES } from '../../src/components/boglanish/data'
import { FAQ, FAQ_AZOLIK, FAQ_HOME } from '../../src/components/faq/data'
import { CONTACT } from '../../src/components/hududiy/data'

import { upsert } from './_lib'

const payload = await getPayload({ config })

await payload.updateGlobal({
  slug: 'aloqa',
  locale: 'uz',
  overrideAccess: true,
  data: {
    address: { full: ADDRESS.full, line: ADDRESS.line, city: ADDRESS.city, street: ADDRESS.street, landmark: ADDRESS.landmark, metro: ADDRESS.metro.station, walk: ADDRESS.metro.walk },
    coords: { lat: 41.35214, lon: 69.20496 },
    phones: PHONES.map((p) => ({ v: p.v })),
    emails: EMAILS.map((v) => ({ v })),
    hours: HOURS,
    socials: CONTACT.socials,
    press: { unit: PRESS_CONTACT.unit, phone: PRESS_CONTACT.phone.v, email: PRESS_CONTACT.email.v, telegram: PRESS_CONTACT.telegram.v },
    law: { title: LAW.title, href: LAW.href, terms: LAW.terms, types: LAW.types },
  } as never,
})
console.log('aloqa: yangilandi')

// javoblardagi aloqa maʼlumotlari belgilarga qaytariladi — “Aloqa maʼlumotlari” özgarsa, javob ham yangilanadi
const tok = (s: string) =>
  s
    .replace(EMAILS[0], '{POCHTA}')
    .replace(PHONES.map((p) => p.v).join(', '), '{TELEFONLAR}')
    .replace(`${ADDRESS.line} (${ADDRESS.landmark}). Ish vaqti: ${HOURS.days.toLowerCase()}, ${HOURS.time}. ${HOURS.off}.`, '{MANZIL} ({MO‘LJAL}). Ish vaqti: {ISH_VAQTI}.')
for (const f of FAQ) {
  await upsert(payload, 'faqs', { slug: { equals: f.id } }, {
    slug: f.id, generateSlug: false, q: f.q, cat: f.cat, a: f.a.map((t) => ({ t: tok(t) })), li: (f.li ?? []).map((t) => ({ t: tok(t) })),
    more: f.more ?? {}, home: FAQ_HOME.includes(f.id), azolik: FAQ_AZOLIK.includes(f.id),
  })
}
console.log('savollar:', FAQ.length)
process.exit(0)
