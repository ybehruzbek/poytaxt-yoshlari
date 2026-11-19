import 'server-only'

import type { Field, SanitizedCollectionConfig } from 'payload'

import type { File as FileDoc, Media } from '@/payload-types'

import { getPayloadClient } from './auth'
import { qisqaVaqt } from './vaqt'

export type LibKind = 'media' | 'files'
export const LIB_PER_PAGE = 48

type Any = Record<string, unknown>
export type LibItem = { id: number; url: string; thumb: string; name: string; alt: string; size: string; dims: string; when: string; mime: string }
export type Usage = { where: string; title: string; href: string }

const kb = (b?: number | null) => (!b ? '' : b > 1048576 ? `${(b / 1048576).toFixed(1)} MB` : `${Math.ceil(b / 1024)} KB`)

function toItem(kind: LibKind, d: Any): LibItem {
  if (kind === 'files') {
    const f = d as unknown as FileDoc
    return { id: f.id, url: f.url ?? '', thumb: '', name: f.filename ?? '', alt: f.title ?? '', size: kb(f.filesize), dims: '', when: qisqaVaqt(f.createdAt), mime: f.mimeType ?? '' }
  }
  const m = d as unknown as Media
  return {
    id: m.id,
    url: m.sizes?.card?.url ?? m.url ?? '',
    thumb: m.sizes?.thumb?.url ?? m.url ?? '',
    name: m.filename ?? '',
    alt: m.alt ?? '',
    size: kb(m.filesize),
    dims: m.width && m.height ? `${m.width} × ${m.height}` : '',
    when: qisqaVaqt(m.createdAt),
    mime: m.mimeType ?? '',
  }
}

export async function listLibrary(kind: LibKind, p: { q?: string; sahifa?: string }) {
  const payload = await getPayloadClient()
  const q = p.q?.trim()
  const key = kind === 'files' ? 'title' : 'alt'
  const page = Math.max(1, Number.parseInt(p.sahifa ?? '1', 10) || 1)
  const r = await payload.find({
    collection: kind,
    where: q ? { or: [{ [key]: { like: q } }, { filename: { like: q } }] } : {},
    sort: '-createdAt',
    page,
    limit: LIB_PER_PAGE,
    depth: 0,
    locale: 'uz',
    overrideAccess: true,
  })
  return { items: (r.docs as unknown as Any[]).map((d) => toItem(kind, d)), page: r.page ?? 1, totalPages: r.totalPages, totalDocs: r.totalDocs }
}

export async function getLibItem(kind: LibKind, id: number) {
  const payload = await getPayloadClient()
  try {
    return toItem(kind, (await payload.findByID({ collection: kind, id, depth: 0, locale: 'uz', overrideAccess: true })) as unknown as Any)
  } catch {
    return null
  }
}

/** Shu töplamga (media yoki files) havola qiluvçi barça maydonlar — nuqtali yöl bilan (“rows.image”) */
function uploadPaths(fields: Field[], target: LibKind, prefix = ''): string[] {
  const out: string[] = []
  for (const f of fields) {
    const name = 'name' in f && f.name ? f.name : null
    if ((f.type === 'upload' || f.type === 'relationship') && f.relationTo === target && name) out.push(prefix + name)
    else if (f.type === 'row' || f.type === 'collapsible' || (f.type === 'group' && !name)) out.push(...uploadPaths(f.fields, target, prefix))
    else if ((f.type === 'group' || f.type === 'array') && name) out.push(...uploadPaths(f.fields, target, `${prefix}${name}.`))
    else if (f.type === 'tabs') for (const t of f.tabs) out.push(...uploadPaths(t.fields, target, 'name' in t && t.name ? `${prefix}${t.name}.` : prefix))
  }
  return out
}

/** Global içida id ni qidiradi (qiymatlar daraxti böyiça) */
function containsId(v: unknown, paths: string[], id: number): boolean {
  const walk = (x: unknown, parts: string[]): boolean => {
    if (Array.isArray(x)) return x.some((y) => walk(y, parts))
    if (!parts.length) return x === id || (!!x && typeof x === 'object' && (x as Any).id === id)
    return !!x && typeof x === 'object' && walk((x as Any)[parts[0]], parts.slice(1))
  }
  return paths.some((p) => walk(v, p.split('.')))
}

/** Fayl qayerda işlatilgan: yangiliklar, bölimlar va sahifa matnlari (öçirişdan oldin tekşiriladi) */
export async function usageOf(kind: LibKind, id: number): Promise<Usage[]> {
  const payload = await getPayloadClient()
  const out: Usage[] = []
  const cols = Object.values(payload.collections as unknown as Record<string, { config: SanitizedCollectionConfig }>).map((c) => c.config)
  await Promise.all(
    cols.map(async (c) => {
      const paths = uploadPaths(c.fields, kind)
      if (!paths.length) return
      const r = await payload.find({
        collection: c.slug as never,
        where: { or: paths.map((p) => ({ [p]: { equals: id } })) },
        limit: 20,
        depth: 0,
        locale: 'uz',
        overrideAccess: true,
        draft: !!(c.versions && typeof c.versions === 'object' && c.versions.drafts),
      })
      const label = typeof c.labels.plural === 'string' ? c.labels.plural : c.slug
      for (const d of r.docs as unknown as Any[]) {
        const t = String(d[c.admin.useAsTitle ?? 'id'] ?? `#${d.id}`)
        const href = c.slug === 'news' ? `/boshqaruv/yangiliklar/${d.id}` : `/boshqaruv/bolim/${c.slug}/${d.id}`
        out.push({ where: label, title: t, href })
      }
    }),
  )
  for (const g of payload.globals.config) {
    const paths = uploadPaths(g.fields, kind)
    if (!paths.length) continue
    const doc = await payload.findGlobal({ slug: g.slug as never, depth: 0, locale: 'uz', overrideAccess: true })
    if (containsId(doc, paths, id)) out.push({ where: 'Sahifa matni', title: typeof g.label === 'string' ? g.label : g.slug, href: `/boshqaruv/sahifa/${g.slug}` })
  }
  return out
}
