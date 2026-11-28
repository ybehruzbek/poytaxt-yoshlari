/**
 * “Imkoniyatlar” bölimini kod içidagi maʼlumotdan bazaga köçiradi: Miqdorlar, grantlar, stipendiyalar, tanlovlar,
 * davlat mukofotlari, imtiyozlar, volontyorlik yönalişlari. Hisoblangan summalar {BHM×3} kabi belgilarga qaytariladi —
 * saytda “Miqdorlar” sozlamasidan qayta hisoblanadi. Işga tuşiriş: pnpm payload run scripts/seed/imkoniyatlar.ts
 */
import { getPayload } from 'payload'

import config from '../../src/payload.config'
import { GRANTS } from '../../src/components/grantlar/data'
import { BENEFITS } from '../../src/components/imtiyozlar/data'
import { AWARDS } from '../../src/components/mukofotlar/data'
import { STIPENDS } from '../../src/components/stipendiyalar/data'
import { CONTESTS } from '../../src/components/tanlovlar/data'
import { DIRS } from '../../src/components/volontyorlik/data'
import { DEFAULT_MIQDOR as D, stipK } from '../../src/lib/miqdorlar'

import { kun, media, upsert } from './_lib'

const payload = await getPayload({ config })

const S = '[\\s\\u00A0\\u202F]'
const n = (x: string) => Number(x.replace(/[\s  ]/g, ''))
const k = (x: string) => x.replace('.', ',')
const NICE = [0.5, 1, 1.5, 2, 3, 4, 5, 8, 10, 20, 50, 100, 200, 400]

/** Hisoblangan summalarni belgilarga qaytariş (saytda joriy BHM böyiça qayta hisoblanadi) */
function tok(t: string | undefined): string {
  if (!t) return t ?? ''
  let s = t
  s = s.replace(new RegExp(`BHMning${S}([\\d,.]+)${S}barobarigacha${S}\\(([\\d\\s\\u00A0]+)${S}so‘mgacha\\)`, 'g'), (_, kk) => `{BHM≤${kk}}`)
  s = s.replace(new RegExp(`([\\d][\\d\\s\\u00A0]*?)${S}so‘m${S}\\(BHMning${S}([\\d,]+)${S}barobari\\)`, 'g'), (_, _n, kk) => `{BHM×${kk}+}`)
  s = s.replace(new RegExp(`([\\d][\\d\\s\\u00A0]*?)${S}so‘m${S}\\(bazaviy${S}stipendiyaning${S}([\\d,]+)${S}barobari\\)`, 'g'), (_, _n, kk) => `{STIP×${kk}+}`)
  for (const [key, v] of [['PREZIDENT', D.STIP_SUM.prezident], ['NOMLI', D.STIP_SUM.nomli], ['ALO', D.STIP_SUM.alo]] as const) {
    s = s.replace(new RegExp(`${String(v).replace(/\B(?=(\d{3})+(?!\d))/g, `${S}`)}${S}so‘m`, 'g'), `{${key}}`)
  }
  s = s.replace(new RegExp(`(\\d{1,3}(?:${S}\\d{3})+)${S}so‘m`, 'g'), (m, num) => {
    const r = n(num) / D.BHM.v
    return NICE.includes(r) ? `{BHM×${k(String(r))}}` : m
  })
  s = s.replace(/\((\d+) foiz\)/g, (m, x) => (Number(x) === D.MB_STAVKA.v ? '({MB} foiz)' : m))
  return s
}

// 0) Miqdorlar
await payload.updateGlobal({
  slug: 'miqdorlar',
  overrideAccess: true,
  locale: 'uz',
  data: {
    bhm: { v: D.BHM.v, from: D.BHM.from, act: D.BHM.act },
    stip: { v: D.STIP_BAZA.v, from: D.STIP_BAZA.from, source: D.STIP_BAZA.source, url: D.STIP_BAZA.url },
    stipSum: D.STIP_SUM,
    mb: { v: D.MB_STAVKA.v, from: D.MB_STAVKA.from, url: D.MB_STAVKA.url },
  } as never,
})
console.log('miqdorlar: yangilandi')

const by = (slug: string) => ({ slug: { equals: slug } })

// 1) Grantlar
for (const g of GRANTS) {
  await upsert(payload, 'grants', by(g.id), {
    slug: g.id, generateSlug: false, t: g.t, cat: g.cat, origin: g.origin ?? 'mahalliy', org: g.org, amount: tok(g.amount), who: g.who,
    text: tok(g.text), deadline: g.deadline ? kun(g.deadline) : null, cycle: g.cycle, note: g.note, url: g.url, source: g.source,
    img: g.img ? await media(payload, g.img, g.t, 'Grantlar') : null,
  })
}
console.log('grantlar:', GRANTS.length)

// 2) Stipendiyalar
const NAMED: Record<string, [string, string]> = {
  'islom-karimov': ['yulduz', 'Barcha yo‘nalishlar'], navoiy: ['kitob', 'Gumanitar fanlar'], bobur: ['globus', 'Tarix va geografiya'],
  'imom-buxoriy': ['oy', 'Islomshunoslik'], beruniy: ['tishli', 'Texnika'], 'ibn-sino': ['yurak', 'Tibbiyot'], avloniy: ['qalpoq', 'Pedagogika'],
  ulugbek: ['atom', 'Tabiiy fanlar'], qaipbergenov: ['qalam', 'Qoraqalpog‘iston OTTlari'], yusupov: ['pero', 'Qoraqalpog‘iston OTTlari'],
  'pahlavon-mahmud': ['medal', 'Jismoniy madaniyat va sport'],
}
const FLAG: Record<string, string> = {
  'el-yurt-umidi': 'uz', chevening: 'gb', fulbright: 'us', daad: 'de', 'stipendium-hungaricum': 'hu', 'turkiye-burslari': 'tr', gks: 'kr', mext: 'jp', 'erasmus-mundus': 'eu', csc: 'cn',
}
const K = stipK(D)
const near = (a: number, b: number) => Math.abs(a - b) < 1e-6
for (const st of STIPENDS) {
  const turi = st.id === 'prezident' ? 'prezident' : NAMED[st.id] ? 'nomli' : st.cat === 'xorij' ? 'xorij' : 'idoraviy'
  const rates = (st.rates ?? []).map(({ l, r }) => {
    if (r.base === 'stip' && near(r.k, K.prezident)) return { l, base: 'prezident' }
    if (r.base === 'stip' && near(r.k, K.nomli)) return { l, base: 'nomli' }
    if (r.base === 'stip' && near(r.k, K.alo)) return { l, base: 'alo' }
    return { l, base: r.base, k: r.k }
  })
  await upsert(payload, 'stipends', by(st.id), {
    slug: st.id, generateSlug: false, t: st.t, turi,
    icon: NAMED[st.id]?.[0] ?? (st.id === 'sogliq-vazir' ? 'tibbiyot' : st.id === 'oliy-bosh-qomondon' ? 'qalqon' : null),
    soha: NAMED[st.id]?.[1], flag: FLAG[st.id] ?? null, org: st.org, rates, badge: st.badge ?? undefined,
    who: st.who, perk: tok(st.perk), cycle: st.cycle, text: tok(st.text), deadline: st.deadline ? kun(st.deadline) : null, url: st.url, source: st.source,
  })
}
console.log('stipendiyalar:', STIPENDS.length)

// 3) Tanlovlar
for (const c of CONTESTS) {
  await upsert(payload, 'contests', by(c.id), {
    slug: c.id, generateSlug: false, t: c.t, cat: c.cat, org: c.org, badge: { l: tok(c.badge.l), v: tok(c.badge.v) }, who: c.who, prize: tok(c.prize),
    text: tok(c.text), deadline: c.deadline ? kun(c.deadline) : null, cycle: c.cycle, window: c.window ? { from: kun(c.window[0]), to: kun(c.window[1]) } : undefined,
    url: c.url, source: c.source, img: c.img ? await media(payload, c.img, c.t, 'Tanlovlar') : null,
  })
}
console.log('tanlovlar:', CONTESTS.length)

// 4) Davlat mukofotlari
for (const a of AWARDS) {
  await upsert(payload, 'awards', by(a.id), {
    slug: a.id, generateSlug: false, t: a.t, basis: a.basis, img: a.img ? await media(payload, a.img, a.t, 'Mukofotlar') : null,
    prize: { base: a.prize.base, k: a.prize.k }, who: a.who, perks: tok(a.perks), how: a.how, count: a.count, short: a.short,
    fact1: a.facts[0], fact2: a.facts[1], when: a.when, timeline: a.timeline.map((x) => ({ from: x.from, to: x.to, t: x.t, end: !!x.end })),
    url: a.url, source: a.source, extraT: a.extra?.t, extraUrl: a.extra?.url,
  })
}
console.log('mukofotlar:', AWARDS.length)

// 5) Imtiyozlar
for (const b of BENEFITS) {
  await upsert(payload, 'benefits', by(b.id), {
    slug: b.id, generateSlug: false, t: b.t, cat: b.cat, icon: b.icon, badge: { l: tok(b.badge.l), v: tok(b.badge.v) }, who: b.who,
    amount: tok(b.amount), how: tok(b.how), basis: b.basis, from: b.from, url: b.url, source: b.source,
  })
}
console.log('imtiyozlar:', BENEFITS.length)

// 6) Volontyorlik yönalişlari
for (const d of DIRS) {
  await upsert(payload, 'vol-directions', by(d.id), {
    slug: d.id, generateSlug: false, t: d.t, icon: d.icon, age: String(d.age), text: d.text, tasks: d.tasks.map((t) => ({ t })), example: d.example,
  })
}
console.log('volontyorlik yo‘nalishlari:', DIRS.length)

process.exit(0)
