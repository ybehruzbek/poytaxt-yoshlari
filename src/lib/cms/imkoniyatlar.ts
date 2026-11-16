import 'server-only'

import { getPayload } from 'payload'
import { cache } from 'react'

import config from '@payload-config'
import type { Grant } from '@/components/grantlar/data'
import type { Benefit } from '@/components/imtiyozlar/data'
import type { Award } from '@/components/mukofotlar/data'
import type { Stipend } from '@/components/stipendiyalar/data'
import type { Contest } from '@/components/tanlovlar/data'
import type { VolDir } from '@/components/volontyorlik/data'
import { type Miqdorlar, type Rate, stipK, summalar } from '@/lib/miqdorlar'

import { getMiqdorlar } from './miqdorlar'
import { iso, mediaUrl, type Rel } from './util'

/**
 * “Imkoniyatlar” maʼlumotlari bazadan: grantlar, stipendiyalar, tanlovlar, mukofotlar, imtiyozlar, volontyorlik yönalişlari.
 * Matndagi {BHM×3} kabi belgilar joriy “Miqdorlar” böyiça summaga almaştiriladi; natija avvalgi kod içidagi
 * maʼlumot bilan bir xil şaklda — sahifa komponentlari özgarmaydi.
 */
type Doc = Record<string, unknown>
const str = (v: unknown) => (typeof v === 'string' ? v : '')

async function list(collection: string, locale: string) {
  const payload = await getPayload({ config })
  const r = await payload.find({
    collection: collection as 'grants',
    locale: locale as 'uz',
    fallbackLocale: 'uz',
    sort: '_order',
    depth: 1,
    pagination: false,
    overrideAccess: false,
  })
  return r.docs as unknown as Doc[]
}

export const getGrants = cache(async (locale = 'uz'): Promise<Grant[]> => {
  const [M, docs] = await Promise.all([getMiqdorlar(locale), list('grants', locale)])
  const s = (v: unknown) => summalar(str(v), M)
  return docs.map((g) => ({
    id: str(g.slug),
    cat: g.cat as Grant['cat'],
    origin: (g.origin || 'mahalliy') as Grant['origin'],
    t: str(g.t),
    org: str(g.org),
    amount: s(g.amount),
    who: str(g.who),
    text: s(g.text),
    ...(g.deadline ? { deadline: iso(g.deadline as string) } : {}),
    cycle: str(g.cycle),
    ...(g.note ? { note: str(g.note) } : {}),
    url: str(g.url),
    source: str(g.source),
    ...(g.img ? { img: mediaUrl(g.img as Rel, 'card') } : {}),
  }))
})

/** Bazadagi stipendiya asosini (prezident / nomli / alo / stip / bhm) sayt hisob-kitobidagi stavkaga ögiriş */
function toRate(r: { base?: string; k?: number | null }, M: Miqdorlar): Rate {
  const K = stipK(M)
  if (r.base === 'prezident') return { base: 'stip', k: K.prezident }
  if (r.base === 'nomli') return { base: 'stip', k: K.nomli }
  if (r.base === 'alo') return { base: 'stip', k: K.alo }
  return { base: r.base === 'bhm' ? 'bhm' : 'stip', k: r.k ?? 1 }
}

export const getStipends = cache(async (locale = 'uz'): Promise<Stipend[]> => {
  const [M, docs] = await Promise.all([getMiqdorlar(locale), list('stipends', locale)])
  const s = (v: unknown) => summalar(str(v), M)
  return docs.map((d) => {
    const rates = ((d.rates as { l?: string; base?: string; k?: number }[]) ?? []).map((x) => ({
      ...(x.l ? { l: x.l } : {}),
      r: toRate(x, M),
    }))
    const badge = d.badge as { l?: string; v?: string } | null
    return {
      id: str(d.slug),
      cat: d.turi === 'xorij' ? 'xorij' : 'davlat',
      turi: d.turi as Stipend['turi'],
      ...(d.icon ? { icon: str(d.icon) } : {}),
      ...(d.soha ? { soha: str(d.soha) } : {}),
      ...(d.flag ? { flag: str(d.flag) } : {}),
      t: str(d.t),
      org: str(d.org),
      ...(rates.length ? { rates } : {}),
      ...(badge?.v ? { badge: { l: s(badge.l), v: s(badge.v) } } : {}),
      who: str(d.who),
      perk: s(d.perk),
      cycle: str(d.cycle),
      text: s(d.text),
      ...(d.deadline ? { deadline: iso(d.deadline as string) } : {}),
      url: str(d.url),
      source: str(d.source),
    }
  })
})

export const getContests = cache(async (locale = 'uz'): Promise<Contest[]> => {
  const [M, docs] = await Promise.all([getMiqdorlar(locale), list('contests', locale)])
  const s = (v: unknown) => summalar(str(v), M)
  return docs.map((c) => {
    const b = (c.badge as { l?: string; v?: string }) ?? {}
    const w = c.window as { from?: string; to?: string } | null
    return {
      id: str(c.slug),
      cat: c.cat as Contest['cat'],
      t: str(c.t),
      org: str(c.org),
      badge: { l: s(b.l), v: s(b.v) },
      who: str(c.who),
      prize: s(c.prize),
      cycle: str(c.cycle),
      text: s(c.text),
      ...(c.deadline ? { deadline: iso(c.deadline as string) } : {}),
      ...(w?.from && w?.to ? { window: [iso(w.from), iso(w.to)] as [string, string] } : {}),
      url: str(c.url),
      source: str(c.source),
      ...(c.img ? { img: mediaUrl(c.img as Rel, 'card') } : {}),
    }
  })
})

export const getAwards = cache(async (locale = 'uz'): Promise<Award[]> => {
  const [M, docs] = await Promise.all([getMiqdorlar(locale), list('awards', locale)])
  const s = (v: unknown) => summalar(str(v), M)
  return docs.map((a) => {
    const p = (a.prize as { base?: string; k?: number }) ?? {}
    return {
      id: str(a.slug),
      t: str(a.t),
      basis: str(a.basis),
      ...(a.img ? { img: mediaUrl(a.img as Rel) } : {}),
      prize: { base: p.base === 'stip' ? 'stip' : 'bhm', k: p.k ?? 0 },
      who: str(a.who),
      perks: s(a.perks),
      how: str(a.how),
      count: str(a.count),
      short: str(a.short),
      facts: [str(a.fact1), str(a.fact2)],
      timeline: ((a.timeline as { from?: number; to?: number; t?: string; end?: boolean }[]) ?? []).map((x) => ({
        from: x.from ?? 1,
        to: x.to ?? 1,
        t: x.t ?? '',
        ...(x.end ? { end: true } : {}),
      })),
      when: str(a.when),
      url: str(a.url),
      source: str(a.source),
      ...(a.extraT && a.extraUrl ? { extra: { t: str(a.extraT), url: str(a.extraUrl) } } : {}),
    }
  })
})

export const getBenefits = cache(async (locale = 'uz'): Promise<Benefit[]> => {
  const [M, docs] = await Promise.all([getMiqdorlar(locale), list('benefits', locale)])
  const s = (v: unknown) => summalar(str(v), M)
  return docs.map((b) => {
    const bd = (b.badge as { l?: string; v?: string }) ?? {}
    return {
      id: str(b.slug),
      cat: b.cat as Benefit['cat'],
      t: str(b.t),
      badge: { l: s(bd.l), v: s(bd.v) },
      icon: str(b.icon),
      who: str(b.who),
      amount: s(b.amount),
      how: s(b.how),
      basis: str(b.basis),
      ...(b.from ? { from: str(b.from) } : {}),
      url: str(b.url),
      source: str(b.source),
    }
  })
})

export const getVolDirs = cache(async (locale = 'uz'): Promise<VolDir[]> => {
  const docs = await list('vol-directions', locale)
  return docs.map((d) => ({
    id: str(d.slug),
    icon: str(d.icon),
    t: str(d.t),
    text: str(d.text),
    tasks: ((d.tasks as { t?: string }[]) ?? []).map((x) => x.t ?? '').filter(Boolean),
    age: (Number(d.age) === 18 ? 18 : 16) as VolDir['age'],
    ...(d.example ? { example: str(d.example) } : {}),
  }))
})
