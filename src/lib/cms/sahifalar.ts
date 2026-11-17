import 'server-only'

import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import { cache } from 'react'

import config from '@payload-config'
import type * as I from '@/components/ittifoq/data'
import type * as K from '@/components/kengash/data'

import { mediaUrl, type Rel } from './util'

/** Yagona sahifalar (globals) — bazadan, avvalgi kod içidagi maʼlumot bilan bir xil şaklda */
type Doc = Record<string, unknown>
const str = (v: unknown) => (typeof v === 'string' ? v : '')
const ts = (v: unknown) => ((v as { t?: string }[]) ?? []).map((x) => x.t ?? '').filter(Boolean)

/**
 * Yagona sahifa maʼlumoti server keşida saqlanadi: “Ittifoq haqida” va “Markaziy Kengaş” kabi katta
 * sahifalarning bazadan olinişi 0,5–1,3 soniya davom etadi — har sörovda takrorlanmasin.
 * Admin panelda saqlanganda keş darhol yangilanadi (revalidate.ts → `global:<slug>` tegi), aks holda bir soatda.
 */
const global = (slug: string, locale: string) =>
  unstable_cache(
    async () => {
      const payload = await getPayload({ config })
      return (await payload.findGlobal({
        slug: slug as 'natijalar',
        locale: locale as 'uz',
        fallbackLocale: 'uz',
        depth: 1,
      })) as unknown as Doc
    },
    ['cms-global', slug, locale],
    { tags: ['cms-global', `global:${slug}`], revalidate: 3600 },
  )()

export type KengashData = {
  ABOUT: typeof K.ABOUT
  STATS: K.Stat[]
  ORGANS: K.Organ[]
  POWERS: string[]
  MEMBERS: typeof K.MEMBERS
  LEADERS: K.Leader[]
  BODIES: typeof K.BODIES
  CONTACT: typeof K.CONTACT
  IMG: { building: string; delegates: string }
  EVENTS: K.KgEvent[]
}

export const getKengash = cache(async (locale = 'uz'): Promise<KengashData> => {
  const g = await global('markaziy-kengash', locale)
  const about = (g.about as Doc) ?? {}
  const m = (g.members as Doc) ?? {}
  const img = (g.images as Doc) ?? {}
  const c = (g.contact as Doc) ?? {}
  return {
    ABOUT: { lead: str(about.lead), paras: ts(about.paras) },
    STATS: ((g.stats as Doc[]) ?? []).map((x) => ({ v: str(x.v), l: str(x.l) })),
    ORGANS: ((g.organs as Doc[]) ?? []).map((x) => ({ t: str(x.t), d: str(x.d), ...(x.meta ? { meta: str(x.meta) } : {}) })),
    POWERS: ts(g.powers),
    MEMBERS: {
      lead: str(m.lead),
      byPost: ts(m.byPost),
      fields: ts(m.fields),
      link: str(m.link),
      extra: str(m.extra),
      facts: ts(m.facts),
    },
    LEADERS: ((g.leaders as Doc[]) ?? []).map((l) => ({
      name: str(l.name),
      role: str(l.role),
      ...(l.img ? { img: mediaUrl(l.img as Rel) } : {}),
      ...(l.full ? { full: str(l.full) } : {}),
      ...(l.born ? { born: str(l.born) } : {}),
      edu: ts(l.edu),
      career: ((l.career as Doc[]) ?? []).map((x) => ({ y: str(x.y), t: str(x.t) })),
    })),
    BODIES: ((g.bodies as Doc[]) ?? []).map((b) => ({ t: str(b.t), meta: str(b.meta), d: str(b.d), items: ts(b.items) })),
    CONTACT: { address: str(c.address), map: str(c.map) },
    IMG: { building: mediaUrl(img.building as Rel), delegates: mediaUrl(img.delegates as Rel) },
    EVENTS: ((g.events as Doc[]) ?? []).map((e) => ({ date: str(e.date), t: str(e.t), d: str(e.d), img: mediaUrl(e.img as Rel), href: str(e.href) })),
  }
})

/* ---------- “Özbekiston yoşlar ittifoqi” sahifasi ---------- */

export type IttifoqData = {
  WHO: typeof I.WHO
  MISSION: typeof I.MISSION
  QUOTE: typeof I.QUOTE
  STATS: I.Stat[]
  MORE_STATS: I.Stat[]
  HISTORY: I.Milestone[]
  PRIVILEGES: I.Privilege[]
  INTL: typeof I.INTL
  IMG: typeof I.IMG
  PALACE: typeof I.PALACE
  CITY_CENTRE: typeof I.CITY_CENTRE
  CENTRES: I.Centre[]
  STRUCTURE: typeof I.STRUCTURE
  JOIN: typeof I.JOIN
  OFFICIAL: typeof I.OFFICIAL
  PRIORITIES: typeof I.PRIORITIES
  ORGS: typeof I.ORGS
  COMPANIES: I.Company[]
}

export const getIttifoq = cache(async (locale = 'uz'): Promise<IttifoqData> => {
  const g = await global('ittifoq-sahifa', locale)
  const o = (v: unknown) => (v as Doc) ?? {}
  const arr = (v: unknown) => (v as Doc[]) ?? []
  const stat = (x: Doc) => ({ v: str(x.v), l: str(x.l) })
  const body = (b: unknown) => ({ t: str(o(b).t), d: str(o(b).d), meta: ts(o(b).meta) })
  const who = o(g.who)
  const intl = o(g.intl)
  const pal = o(g.palace)
  const cc = o(g.cityCentre)
  const st = o(g.structure)
  const j = o(g.join)
  const orgs = o(g.orgs)
  const im = o(g.img)
  const IMG = Object.fromEntries(Object.keys(im).filter((k) => k !== 'id').map((k) => [k, mediaUrl(im[k] as Rel)])) as typeof I.IMG
  return {
    WHO: { paras: ts(who.paras), motto: str(who.motto) },
    MISSION: { text: str(o(g.mission).text) },
    QUOTE: { text: str(o(g.quote).text), author: str(o(g.quote).author), role: str(o(g.quote).role) },
    STATS: arr(g.stats).map(stat),
    MORE_STATS: arr(g.moreStats).map(stat),
    HISTORY: arr(g.history).map((h) => ({ y: str(h.y), ...(h.d ? { d: str(h.d) } : {}), t: str(h.t) })),
    PRIVILEGES: arr(g.privileges).map((p) => ({
      group: (p.group === 'davlat' ? 'davlat' : 'ittifoq') as I.Privilege['group'],
      t: str(p.t),
      text: str(p.text),
      fact: str(p.fact),
      img: mediaUrl(p.img as Rel),
      num: str(p.num),
      numL: str(p.numL),
      ...(p.badge ? { badge: true } : {}),
      ...(p.medal ? { medal: mediaUrl(p.medal as Rel) } : {}),
    })),
    INTL: {
      text: str(intl.text),
      assoc: str(intl.assoc),
      facts: arr(intl.facts).map(stat),
      forms: ts(intl.forms),
      projects: ts(intl.projects),
      partners: mediaUrl(intl.partners as Rel),
      flags: mediaUrl(intl.flags as Rel),
    },
    IMG,
    PALACE: {
      name: str(pal.name),
      org: str(pal.org),
      text: str(pal.text),
      features: ts(pal.features),
      img: mediaUrl(pal.img as Rel),
      gallery: ((pal.gallery as Rel[]) ?? []).map((x) => mediaUrl(x)).filter(Boolean),
    },
    CITY_CENTRE: { name: str(cc.name), text: str(cc.text), facts: ts(cc.facts), img: mediaUrl(cc.img as Rel) },
    CENTRES: arr(g.centres).map((c) => ({ region: str(c.region), img: mediaUrl(c.img as Rel) })),
    STRUCTURE: {
      qurultoy: body(st.qurultoy),
      council: body(st.council),
      chair: body(st.chair),
      exec: body(st.exec),
      audit: body(st.audit),
      levels: arr(st.levels).map(body),
      principles: ts(st.principles),
    },
    JOIN: {
      steps: arr(j.steps).map((s) => ({ band: str(s.band), t: str(s.t), d: str(s.d) })),
      rights: ts(j.rights),
      duties: ts(j.duties),
      legal: { d: str(o(j.legal).d), how: str(o(j.legal).how) },
      note: str(j.note),
      ends: ts(j.ends),
      cta: { t: str(o(j.cta).t), d: str(o(j.cta).d) },
    },
    OFFICIAL: { rows: arr(g.official).map((r) => [str(r.k), str(r.v)] as [string, string]) },
    PRIORITIES: {
      titles: arr(g.priorities).map((p) => str(p.title)),
      items: arr(g.priorities).map((p) => str(p.item)),
    },
    ORGS: {
      lead: str(orgs.lead),
      ngos: arr(orgs.ngos).map((n) => ({ t: str(n.t), g: n.g as I.Org['g'], d: str(n.d), ...(n.logo ? { logo: mediaUrl(n.logo as Rel) } : {}) })),
      companies: ts(orgs.companies),
    },
    COMPANIES: arr(g.companies).map((c) => ({ kind: c.kind as I.Company['kind'], t: str(c.t), d: str(c.d), share: str(c.share), logo: mediaUrl(c.logo as Rel) })),
  }
})

/** “Aʼzo böliş” sahifasi */
export const getAzolik = cache(async (locale = 'uz') => {
  const g = await global('azolik-sahifa', locale)
  return {
    CONDITIONS: ((g.conditions as Doc[]) ?? []).map((c) => ({ k: str(c.k), t: str(c.t), d: str(c.d), band: str(c.band) })),
    STEPS: ((g.steps as Doc[]) ?? []).map((s) => ({ band: str(s.band), t: str(s.t), d: str(s.d) })),
    AFTER: ts(g.after),
  }
})

/** raqam içidagi bo'şliq — bölinmas (1 287 ikki qatorga bölinmasin) */
const nb = (v: string) => v.replace(/(\d) (?=\d)/g, '$1 ')

/** “Volontyorlik” sahifasi; `stats` dagi {TADBIRLAR} — sahifa özi hisoblaydi */
export const getVolSahifa = cache(async (locale = 'uz') => {
  const g = await global('volontyorlik-sahifa', locale)
  const law = (g.law as Doc) ?? {}
  return {
    STATS: ((g.stats as Doc[]) ?? []).map((s) => ({ v: nb(str(s.v)), t: str(s.t) })),
    STEPS: ((g.steps as Doc[]) ?? []).map((s) => ({ t: str(s.t), d: str(s.d) })),
    TIMES: ts(g.times),
    LAW: { t: str(law.t), no: str(law.no), url: str(law.url) },
    RIGHTS: ts(g.rights),
    DUTIES: ts(g.duties),
    QUIZ: ((g.quiz as Doc[]) ?? []).map((q) => ({
      q: str(q.q),
      a: ((q.a as Doc[]) ?? []).map((a) => ({ t: str(a.t), dirs: ((a.dirs as Doc[]) ?? []).map((d) => str(d?.slug)).filter(Boolean) })),
    })),
  }
})
export type VolSahifa = Awaited<ReturnType<typeof getVolSahifa>>

/** Boş sahifa matnlari */
export const getBosh = cache(async (locale = 'uz') => {
  const g = await global('bosh-sahifa', locale)
  const grp = (k: string) => ((g[k] as Doc) ?? {}) as Doc
  const hero = grp('hero')
  const about = grp('about')
  const opps = grp('opps')
  const ben = grp('benefits')
  const cta = grp('cta')
  const heads = grp('heads')
  const opp = (k: string) => {
    const o = (opps[k] as Doc) ?? {}
    return { lead: str(o.lead), desc: str(o.desc) }
  }
  return {
    hero: { kicker: str(hero.kicker), lead: str(hero.lead) },
    about: { title: str(about.title), text: str(about.text), year: str(about.year), yearLabel: str(about.yearLabel), ottLabel: str(about.ottLabel), partnersLabel: str(about.partnersLabel) },
    opps: { title: str(opps.title), accent: str(opps.accent), grant: opp('grant'), stip: opp('stip'), vol: opp('vol'), tanlov: opp('tanlov') },
    benefits: {
      title: str(ben.title),
      lead: str(ben.lead),
      roles: ((ben.roles as Doc[]) ?? []).map((r, i, all) => ({ id: all.findIndex((x) => x.icon === r.icon) === i ? str(r.icon) : `${str(r.icon)}-${i}`, icon: str(r.icon), t: str(r.t), h: str(r.h), items: ts(r.items), href: str(r.href), more: str(r.more) })),
    },
    cta: { title: str(cta.title), text: str(cta.text), steps: ((cta.steps as Doc[]) ?? []).map((s) => ({ t: str(s.t), d: str(s.d) })) },
    heads: { news: str(heads.news), events: str(heads.events), faq: str(heads.faq) },
  }
})
export type BoshData = Awaited<ReturnType<typeof getBosh>>
