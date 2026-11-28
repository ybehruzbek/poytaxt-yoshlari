import 'server-only'

import { getPayload } from 'payload'
import { cache } from 'react'

import config from '@payload-config'
import type { Otm } from '@/components/boshlangich/data'
import { GROUPS, type Partner, REGIONS } from '@/components/hamkorlar/data'
import type { Dept, Person, Reception, Social } from '@/components/hududiy/data'

import { mediaUrl, type Rel } from './util'

/** “Biz haqimizda” maʼlumotlari bazadan: OTTlar va yetakçilar, hamkorlar, hududiy Kengaş jamoasi */
type Doc = Record<string, unknown>
const str = (v: unknown) => (typeof v === 'string' ? v : '')

async function list(collection: string, locale: string, depth = 1) {
  const payload = await getPayload({ config })
  const r = await payload.find({
    collection: collection as 'otts',
    locale: locale as 'uz',
    fallbackLocale: 'uz',
    sort: '_order',
    depth,
    pagination: false,
    overrideAccess: false,
  })
  return r.docs as unknown as Doc[]
}

export const getOtts = cache(async (locale = 'uz'): Promise<Otm[]> => {
  const docs = await list('otts', locale)
  return docs.map((o) => {
    const l = (o.leader as Doc) ?? {}
    const name = str(l.name)
    return {
      otm: str(o.otm),
      type: o.type as Otm['type'],
      ...(name
        ? {
            leader: {
              slug: str(l.slug),
              name,
              img: mediaUrl(l.img as Rel),
              role: str(l.role),
              spec: str(l.spec),
              phone: str(l.phone),
              email: str(l.email),
              telegram: str(l.telegram),
              instagram: str(l.instagram),
              facebook: str(l.facebook),
              about: str(l.about),
              elected: str(l.elected),
              members: str(l.members),
              reception: str(l.reception),
              achievements: ((l.achievements as { t?: string }[]) ?? []).map((x) => x.t ?? '').filter(Boolean),
            },
          }
        : {}),
    }
  })
})

export type PartnersData = { all: Partner[]; domestic: Partner[]; foreign: Partner[] }

export const getPartners = cache(async (locale = 'uz'): Promise<PartnersData> => {
  const docs = await list('partners', locale)
  const all: Partner[] = docs.map((p) => ({
    k: str(p.slug),
    name: str(p.name),
    group: p.group as Partner['group'],
    dirs: ((p.dirs as string[]) ?? []) as Partner['dirs'],
    ...(p.region ? { region: p.region as Partner['region'] } : {}),
    logo: mediaUrl(p.logo as Rel),
    ...(p.logoH ? { logoH: Number(p.logoH) } : {}),
    ...(p.site ? { site: str(p.site) } : {}),
    ...(p.domain ? { domain: str(p.domain) } : {}),
    what: str(p.what),
  }))
  // Özbekistondagi hamkorlar — toifalar tartibida; xalqaro — mintaqalar tartibida
  const domestic = GROUPS.filter((g) => g.k !== 'xalqaro').flatMap((g) => all.filter((p) => p.group === g.k))
  const foreign = REGIONS.flatMap((r) => all.filter((p) => p.group === 'xalqaro' && p.region === r.k))
  return { all, domestic, foreign }
})

export type Hududiy = {
  CHAIR: Person & { room: string; reception: string; duties: string[]; socials: Social[] }
  DEPTS: Dept[]
  RECEPTION: Reception[]
}

export const getHududiy = cache(async (locale = 'uz'): Promise<Hududiy> => {
  const [deps, staff] = await Promise.all([list('departments', locale, 0), list('staff', locale, 1)])
  const person = (s: Doc): Person => ({
    name: str(s.name),
    role: str(s.role),
    img: mediaUrl(s.img as Rel),
    ...(s.phone ? { phone: str(s.phone) } : {}),
    ...(s.email ? { email: str(s.email) } : {}),
    ...(((s.socials as unknown[]) ?? []).length
      ? { socials: (s.socials as Social[]).map((x) => ({ net: x.net, handle: x.handle, href: x.href })) }
      : {}),
    ...(((s.duties as unknown[]) ?? []).length ? { duties: (s.duties as { t?: string }[]).map((x) => x.t ?? '') } : {}),
  })
  const depId = (s: Doc) => (typeof s.dept === 'object' && s.dept ? (s.dept as Doc).id : s.dept)
  const chairDoc = staff.find((s) => s.chair)
  const q = (s: Doc | undefined) => (s?.qabul as { day?: string; time?: string; room?: string }) ?? {}
  const DEPTS: Dept[] = deps.map((d) => ({
    key: str(d.slug),
    short: str(d.short),
    t: str(d.t),
    room: str(d.room),
    tasks: ((d.tasks as { t?: string }[]) ?? []).map((x) => x.t ?? ''),
    staff: staff.filter((s) => !s.chair && depId(s) === d.id).map(person),
  }))
  const deptShort = (s: Doc) => (s.chair ? 'Kengash raisi' : (deps.find((d) => d.id === depId(s))?.short as string) ?? '')
  const DAYS = ['Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma', 'Shanba']
  const RECEPTION: Reception[] = staff
    .filter((s) => q(s).day)
    .map((s) => ({ day: q(s).day!, time: q(s).time ?? '', room: q(s).room ?? '', name: str(s.name), dept: deptShort(s) }))
    .sort((a, b) => DAYS.indexOf(a.day) - DAYS.indexOf(b.day))
  const ch = chairDoc ? person(chairDoc) : { name: '', role: '', img: '' }
  const CHAIR = {
    ...ch,
    room: q(chairDoc).room ? `${q(chairDoc).room}-xona` : '',
    reception: q(chairDoc).day ? `${q(chairDoc).day} · ${q(chairDoc).time ?? ''}` : '',
    duties: ch.duties ?? [],
    socials: ch.socials ?? [],
  }
  return { CHAIR, DEPTS, RECEPTION }
})
