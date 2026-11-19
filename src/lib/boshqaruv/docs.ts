import 'server-only'

import type { SanitizedCollectionConfig, Where } from 'payload'

import { getPayloadClient } from './auth'
import type { DocSchema, SField } from './schema-types'
import { qisqaVaqt, sanaVaqt } from './vaqt'

export const DOCS_PER_PAGE = 25

type Any = Record<string, unknown>
export type Cell = { v: string; thumb?: string | null; tone?: 'green' | 'yellow' }
export type DocRow = { id: number; title: string; cells: Cell[] }
export type Column = { key: string; t: string }

/** Sxemadagi barça nomli maydonlar (yöl böyiça: "leader.name") */
function flat(fields: SField[], prefix = ''): Map<string, SField> {
  const m = new Map<string, SField>()
  for (const f of fields) {
    if (f.type === 'row' || f.type === 'collapsible') for (const [k, v] of flat(f.fields, prefix)) m.set(k, v)
    else if (f.type === 'tabs') for (const t of f.tabs) for (const [k, v] of flat(t.fields, t.name ? `${prefix}${t.name}.` : prefix)) m.set(k, v)
    else if (f.name) {
      m.set(prefix + f.name, f)
      if (f.type === 'group') for (const [k, v] of flat(f.fields, `${prefix}${f.name}.`)) m.set(k, v)
    }
  }
  return m
}

const get = (o: unknown, path: string) => path.split('.').reduce<unknown>((x, k) => (x && typeof x === 'object' ? (x as Any)[k] : undefined), o)
const thumbOf = (m: unknown) => (m && typeof m === 'object' ? (((m as Any).sizes as Any)?.thumb as Any)?.url ?? (m as Any).url ?? null : null) as string | null
const titleOf = (x: unknown) =>
  x && typeof x === 'object' ? String((x as Any).title ?? (x as Any).name ?? (x as Any).t ?? (x as Any).short ?? (x as Any).otm ?? (x as Any).filename ?? `#${(x as Any).id}`) : ''

function cell(f: SField | undefined, v: unknown, key: string): Cell {
  if (key === '_status') return v === 'published' ? { v: 'Eʼlon qilingan', tone: 'green' } : { v: 'Qoralama', tone: 'yellow' }
  if (key === 'updatedAt' || key === 'createdAt') return { v: typeof v === 'string' ? qisqaVaqt(v) : '' }
  if (!f) return { v: v == null ? '' : String(v) }
  switch (f.type) {
    case 'upload':
      return f.relationTo === 'media' ? { v: '', thumb: thumbOf(Array.isArray(v) ? v[0] : v) } : { v: Array.isArray(v) ? `${v.length} ta` : titleOf(v) }
    case 'relationship':
      return { v: Array.isArray(v) ? v.map(titleOf).join(', ') : titleOf(v) }
    case 'select': {
      const arr = Array.isArray(v) ? v : v == null ? [] : [v]
      return { v: arr.map((x) => f.options.find((o) => o.v === String(x))?.t ?? String(x)).join(', ') }
    }
    case 'checkbox':
      return { v: v ? 'Ha' : '' }
    case 'date':
      return { v: typeof v === 'string' ? (f.time ? sanaVaqt(v) : sanaVaqt(v).split(',')[0]) : '' }
    case 'array':
      return { v: Array.isArray(v) && v.length ? `${v.length} ta` : '' }
    case 'richText':
      return { v: '' }
    default:
      return { v: v == null ? '' : String(v).replace(/\s+/g, ' ').slice(0, 120) }
  }
}

/** Röyxat ustunlari: Payload'dagi defaultColumns (sarlavha maydonisiz — u alohida körsatiladi) */
export async function columnsOf(schema: DocSchema): Promise<Column[]> {
  const payload = await getPayloadClient()
  const c = (payload.collections as unknown as Record<string, { config: SanitizedCollectionConfig } | undefined>)[schema.slug]?.config
  const names = ((c?.admin.defaultColumns as string[] | undefined) ?? []).filter((n) => n !== schema.useAsTitle).slice(0, 4)
  const m = flat(schema.fields)
  return names.map((k) => ({ key: k, t: k === '_status' ? 'Holati' : k === 'updatedAt' ? 'Özgargan' : (m.get(k)?.label ?? k) }))
}

export async function listDocs(schema: DocSchema, p: { q?: string; sahifa?: string }) {
  const payload = await getPayloadClient()
  const c = (payload.collections as unknown as Record<string, { config: SanitizedCollectionConfig }>)[schema.slug].config
  const cols = await columnsOf(schema)
  const searchable = ((c.admin.listSearchableFields as string[] | undefined) ?? [schema.useAsTitle]).filter(Boolean)
  const q = p.q?.trim()
  const where: Where = q ? { or: searchable.map((f) => ({ [f]: { like: q } })) } : {}
  const page = Math.max(1, Number.parseInt(p.sahifa ?? '1', 10) || 1)
  const sort = (c.defaultSort as string | undefined) ?? (c.orderable ? '_order' : '-updatedAt')
  const res = await payload.find({ collection: schema.slug as never, where, sort, page, limit: DOCS_PER_PAGE, depth: 1, draft: schema.drafts, locale: 'uz', overrideAccess: true })
  const m = flat(schema.fields)
  const rows: DocRow[] = (res.docs as Any[]).map((d) => ({
    id: d.id as number,
    title: String(get(d, schema.useAsTitle) ?? '').trim() || `${schema.singular} #${d.id}`,
    cells: cols.map((col) => cell(m.get(col.key), get(d, col.key), col.key)),
  }))
  return { rows, cols, page: res.page ?? 1, totalPages: res.totalPages, totalDocs: res.totalDocs }
}

export async function getDoc(schema: DocSchema, id: number) {
  const payload = await getPayloadClient()
  try {
    return (await payload.findByID({ collection: schema.slug as never, id, depth: 1, draft: schema.drafts, locale: 'uz', overrideAccess: true })) as unknown as Any
  } catch {
    return null
  }
}

export async function getGlobalDoc(schema: DocSchema) {
  const payload = await getPayloadClient()
  return (await payload.findGlobal({ slug: schema.slug as never, depth: 1, draft: schema.drafts, locale: 'uz', overrideAccess: true })) as unknown as Any
}

/** Boğlanma maydonlari uçun tanlov röyxati (har bir to‘plamdan sarlavhasi bilan) */
export async function relationOptions(schema: DocSchema): Promise<Record<string, { id: number; t: string }[]>> {
  const targets = new Set<string>()
  for (const f of flat(schema.fields).values()) if (f.type === 'relationship') targets.add(f.relationTo)
  const walkArr = (fs: SField[]) => {
    for (const f of fs) {
      if (f.type === 'relationship') targets.add(f.relationTo)
      if ('fields' in f && Array.isArray(f.fields)) walkArr(f.fields)
      if (f.type === 'tabs') f.tabs.forEach((t) => walkArr(t.fields))
    }
  }
  walkArr(schema.fields)
  const payload = await getPayloadClient()
  const out: Record<string, { id: number; t: string }[]> = {}
  await Promise.all(
    [...targets].map(async (slug) => {
      const col = (payload.collections as unknown as Record<string, { config: SanitizedCollectionConfig } | undefined>)[slug]?.config
      if (!col) return
      const key = col.admin.useAsTitle ?? 'id'
      const r = await payload.find({ collection: slug as never, limit: 500, depth: 0, locale: 'uz', overrideAccess: true, sort: key })
      out[slug] = (r.docs as Any[]).map((d) => ({ id: d.id as number, t: String(get(d, key) ?? `#${d.id}`) }))
    }),
  )
  return out
}
