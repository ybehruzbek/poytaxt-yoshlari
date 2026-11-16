import 'server-only'

import { getPayload } from 'payload'
import { cache } from 'react'

import config from '@payload-config'
import type { Direction, DirSlug, Ev, Fact, Project, ProjectStatus } from '@/components/faoliyat/types'

import { iso, mediaUrl, type Rel } from './util'

/**
 * “Faoliyat” bölimi maʼlumotlari bazadan (admin panel → Faoliyat). Sahifa komponentlari avvalgi kod içidagi
 * maʼlumot bilan bir xil şakldagi obyektlarni oladi — körinişi özgarmaydi.
 */
export type Faoliyat = {
  directions: Direction[]
  projects: Project[]
  events: Ev[]
  report: { label: string; post: number; nums: { v: string; t: string }[] }
  years: { y: string; items: Fact[] }[]
}

type Doc = Record<string, unknown>
const dirSlug = (d: unknown) => ((d as { slug?: string } | null)?.slug ?? '') as DirSlug

export const getFaoliyat = cache(async (locale = 'uz'): Promise<Faoliyat> => {
  const payload = await getPayload({ config })
  const base = { locale: locale as 'uz', fallbackLocale: 'uz' as const, pagination: false as const, overrideAccess: false }
  const [dirs, projs, evs, res] = await Promise.all([
    payload.find({ ...base, collection: 'directions', sort: '_order', depth: 0 }),
    payload.find({ ...base, collection: 'projects', sort: '_order', depth: 1, where: { _status: { equals: 'published' } } }),
    payload.find({ ...base, collection: 'events', sort: '-date', depth: 1 }),
    payload.findGlobal({ slug: 'natijalar', locale: locale as 'uz', fallbackLocale: 'uz', depth: 0 }),
  ])

  const directions: Direction[] = (dirs.docs as unknown as Doc[]).map((d) => ({
    slug: d.slug as DirSlug,
    title: String(d.title ?? ''),
    short: String(d.short ?? ''),
    about: String(d.about ?? ''),
  }))

  const projects: Project[] = (projs.docs as unknown as Doc[]).map((p) => ({
    slug: String(p.slug ?? ''),
    title: String(p.title ?? ''),
    dir: dirSlug(p.dir),
    status: (p.holat ?? 'davom etmoqda') as ProjectStatus,
    period: String(p.period ?? ''),
    lead: String(p.lead ?? ''),
    description: String(p.description ?? ''),
    audience: String(p.audience ?? ''),
    partners: ((p.partners as { t?: string }[]) ?? []).map((x) => x.t ?? '').filter(Boolean),
    results: ((p.results as { text?: string; post?: number }[]) ?? []).map((r) => ({ text: r.text ?? '', post: r.post ?? 0 })),
    milestones: ((p.milestones as { date?: string; text?: string; post?: number }[]) ?? []).map((m) => ({
      date: iso(m.date),
      text: m.text ?? '',
      post: m.post ?? 0,
    })),
    posts: ((p.posts as { n?: number }[]) ?? []).map((x) => x.n ?? 0).filter(Boolean),
    cover: mediaUrl(p.cover as Rel, 'hero'),
    gallery: ((p.gallery as Rel[]) ?? []).map((g) => mediaUrl(g)).filter(Boolean),
    national: !!p.national,
  }))

  const events: Ev[] = (evs.docs as unknown as Doc[]).map((e) => ({
    id: Number(e.post ?? e.id),
    date: iso(e.date as string),
    title: String(e.title ?? ''),
    place: String(e.place ?? ''),
    type: String(e.type ?? ''),
    summary: String(e.summary ?? ''),
    dir: dirSlug(e.dir),
    img: mediaUrl(e.img as Rel, 'card'),
    ...(e.upcoming ? { upcoming: true } : {}),
  }))

  const r = (res as unknown as Doc).report as { label?: string; post?: number; nums?: { v?: string; t?: string }[] } | undefined
  const report = {
    label: r?.label || 'Yil yakunlari',
    post: r?.post ?? 0,
    nums: (r?.nums ?? []).map((n) => ({ v: n.v ?? '', t: n.t ?? '' })),
  }
  const years = (((res as unknown as Doc).years as { y?: string; items?: { text?: string; post?: number }[] }[]) ?? []).map((y) => ({
    y: y.y ?? '',
    items: (y.items ?? []).map((i) => ({ text: i.text ?? '', post: i.post ?? 0 })),
  }))

  return { directions, projects, events, report, years }
})

export const dirTitle = (f: Faoliyat, s: DirSlug) => f.directions.find((d) => d.slug === s)?.title ?? ''
export const dirProjects = (f: Faoliyat, s: DirSlug) => f.projects.filter((p) => p.dir === s)
