import 'server-only'

import { getPayload } from 'payload'
import { cache } from 'react'

import config from '@payload-config'
import type { Act, ActGroup } from '@/components/hujjatlar/data'

import { iso } from './util'

/** Hujjatlar bazadan: normativ hujjatlar guruhlari, Kengaş hujjatlari, namunalar */
type Doc = Record<string, unknown>
const str = (v: unknown) => (typeof v === 'string' ? v : '')

async function list(collection: string, locale: string, sort = '_order', depth = 0) {
  const payload = await getPayload({ config })
  const r = await payload.find({ collection: collection as 'acts', locale: locale as 'uz', fallbackLocale: 'uz', sort, depth, pagination: false, overrideAccess: false })
  return r.docs as unknown as Doc[]
}

export const getActGroups = cache(async (locale = 'uz'): Promise<ActGroup[]> => {
  const [groups, acts] = await Promise.all([list('act-groups', locale), list('acts', locale)])
  return groups.map((g) => ({
    id: str(g.slug),
    t: str(g.t),
    lead: str(g.lead),
    acts: acts
      .filter((a) => (typeof a.grp === 'object' ? (a.grp as Doc)?.id : a.grp) === g.id)
      .map(
        (a): Act => ({
          ...(a.y ? { y: str(a.y) } : {}),
          t: str(a.t),
          d: str(a.d),
          ...(a.href ? { href: str(a.href) } : {}),
          kind: a.kind as Act['kind'],
          org: str(a.org),
          ...(a.no ? { no: str(a.no) } : {}),
          ...(a.name ? { name: str(a.name) } : {}),
          ...(a.by ? { by: str(a.by) } : {}),
          ...(a.kw ? { kw: str(a.kw) } : {}),
          ...(a.reg ? { reg: str(a.reg) } : {}),
          ...(a.noT ? { noT: str(a.noT) } : {}),
          ...(((a.for as string[]) ?? []).length ? { for: a.for as Act['for'] } : {}),
        }),
      ),
  }))
})

export type FileDoc = { id: number; t: string; d: string; kind: string; date: string; no: string; url: string; size: number; ext: string }

const fileOf = (f: unknown) => {
  const x = (f as { url?: string; filesize?: number; filename?: string } | null) ?? {}
  return { url: str(x.url), size: Number(x.filesize ?? 0), ext: (str(x.filename).split('.').pop() ?? '').toUpperCase() }
}

export const getKengashDocs = cache(async (locale = 'uz'): Promise<FileDoc[]> =>
  (await list('kengash-docs', locale, '-date', 1)).map((d) => ({
    id: Number(d.id),
    t: str(d.t),
    d: str(d.d),
    kind: str(d.kind),
    date: iso(d.date as string),
    no: str(d.no),
    ...fileOf(d.file),
  })),
)

export const getTemplates = cache(async (locale = 'uz'): Promise<FileDoc[]> =>
  (await list('templates', locale, '_order', 1)).map((d) => ({
    id: Number(d.id),
    t: str(d.t),
    d: str(d.d),
    kind: str(d.cat),
    date: '',
    no: '',
    ...fileOf(d.file),
  })),
)
