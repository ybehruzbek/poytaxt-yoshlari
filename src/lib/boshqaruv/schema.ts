import 'server-only'

import type { Field, SanitizedCollectionConfig, SanitizedGlobalConfig } from 'payload'

import { getPayloadClient } from './auth'
import type { Cond, CondTerm, DocSchema, Opt, SField } from './schema-types'

/** Yangi panelda universal şakl bilan oçiladigan bölimlar (yangiliklar, kiruvçi xabarlar, foydalanuvçilar — alohida) */
export const GENERIC_COLLECTIONS = [
  'directions',
  'projects',
  'events',
  'grants',
  'stipends',
  'contests',
  'benefits',
  'awards',
  'vol-directions',
  'albums',
  'videos',
  'press',
  'oav',
  'otts',
  'departments',
  'staff',
  'partners',
  'acts',
  'act-groups',
  'kengash-docs',
  'templates',
  'faqs',
  'authors',
] as const
export const GENERIC_GLOBALS = [
  'bosh-sahifa',
  'ittifoq-sahifa',
  'markaziy-kengash',
  'azolik-sahifa',
  'volontyorlik-sahifa',
  'natijalar',
  'aloqa',
  'socials',
  'miqdorlar',
] as const

const SKIP = new Set(['id', 'createdAt', 'updatedAt', '_status', '_order', 'tgId'])

/** Yorliq: matn yoki { uz, ru, en } */
const lbl = (l: unknown, fallback = ''): string => {
  if (typeof l === 'string') return l
  if (l && typeof l === 'object' && 'uz' in l) return String((l as { uz: unknown }).uz)
  return fallback
}

/**
 * admin.condition funksiyasini maʼlumotga aylantiradi (brauzerda kod bajarilmaydi). Qöllanadigan körinişlar:
 * `d?.x === 'a' || d?.x === 'b'`, `!d?.x`, `!d?.x?.length`, `s?.x === 'a'` (s — qöşni maydonlar).
 * Tanilmagan şart — maydon doim körinadi.
 */
function parseCond(fn: unknown): Cond | undefined {
  if (typeof fn !== 'function') return undefined
  const src = fn.toString().trim()
  const m = /^\(?\s*([\w$]*)\s*(?:,\s*([\w$]+)\s*)?\)?\s*=>\s*\(?([\s\S]+?)\)?\s*;?$/.exec(src)
  if (!m) return undefined
  const params = [m[1], m[2]].filter(Boolean)
  const terms: CondTerm[] = []
  for (const raw of m[3].split('||')) {
    const t = /^\s*(!)?\s*([\w$]+)\?\.([\w$]+(?:\?\.[\w$]+)*?)(\?\.length)?\s*(?:===\s*["']([^"']*)["'])?\s*$/.exec(raw)
    if (!t) return undefined
    const from = params.indexOf(t[2])
    if (from !== 0 && from !== 1) return undefined
    if (t[1] && t[5] !== undefined) return undefined
    terms.push({ from: from as 0 | 1, path: t[3].split('?.'), neg: !!t[1], len: !!t[4], eq: t[5] })
  }
  return terms.length ? { or: terms } : undefined
}

function opts(o: unknown[]): Opt[] {
  return o.map((x) => (typeof x === 'string' ? { v: x, t: x } : { v: String((x as { value: unknown }).value), t: lbl((x as { label: unknown }).label, String((x as { value: unknown }).value)) }))
}

/** Payload maydonini universal şakl maydoniga aylantiradi; körsatilmaydigan maydonlar uçun null */
function conv(f: Field): SField | null {
  const a = (f as { admin?: Record<string, unknown> }).admin ?? {}
  if (a.hidden === true || a.disabled === true) return null
  const name = 'name' in f ? f.name : undefined
  if (name && SKIP.has(name)) return null
  const base = {
    name,
    label: lbl((f as { label?: unknown }).label, name ?? ''),
    required: (f as { required?: boolean }).required || undefined,
    description: typeof a.description === 'string' ? a.description : lbl(a.description) || undefined,
    placeholder: typeof a.placeholder === 'string' ? a.placeholder : undefined,
    width: typeof a.width === 'string' ? a.width : undefined,
    side: a.position === 'sidebar' || undefined,
    readOnly: a.readOnly === true || undefined,
    when: parseCond(a.condition),
  }
  const kids = (fs: Field[]) => fs.map(conv).filter((x): x is SField => !!x)

  switch (f.type) {
    case 'text':
    case 'email':
    case 'code':
      return { ...base, type: f.type === 'code' ? 'text' : f.type, name: name!, maxLength: (f as { maxLength?: number }).maxLength, hasMany: (f as { hasMany?: boolean }).hasMany || undefined }
    case 'textarea':
      return { ...base, type: 'textarea', name: name!, maxLength: f.maxLength, rows: typeof a.rows === 'number' ? a.rows : undefined }
    case 'number':
      return { ...base, type: 'number', name: name!, min: f.min, max: f.max, step: typeof a.step === 'number' ? a.step : undefined }
    case 'checkbox':
      return { ...base, type: 'checkbox', name: name! }
    case 'date': {
      const pick = (a.date as { pickerAppearance?: string } | undefined)?.pickerAppearance
      return { ...base, type: 'date', name: name!, time: pick === 'dayAndTime' || pick === 'timeOnly' }
    }
    case 'select':
    case 'radio':
      return { ...base, type: 'select', name: name!, options: opts(f.options as unknown[]), hasMany: ('hasMany' in f && f.hasMany) || undefined }
    case 'richText':
      return { ...base, type: 'richText', name: name! }
    case 'upload':
      return { ...base, type: 'upload', name: name!, relationTo: String(f.relationTo), hasMany: f.hasMany || undefined, maxRows: 'maxRows' in f ? (f.maxRows as number) : undefined }
    case 'relationship':
      return Array.isArray(f.relationTo) ? null : { ...base, type: 'relationship', name: name!, relationTo: f.relationTo, hasMany: f.hasMany || undefined }
    case 'array':
      return { ...base, type: 'array', name: name!, fields: kids(f.fields), singular: lbl(f.labels?.singular, 'Band'), maxRows: f.maxRows, minRows: f.minRows }
    case 'group':
      return 'name' in f && f.name ? { ...base, type: 'group', name: f.name, fields: kids(f.fields) } : { ...base, type: 'collapsible', fields: kids(f.fields), open: true }
    case 'row':
      // slugField: sahifa manzili + “sarlavhadan avtomatik” qulfi bitta maydon bölib körsatiladi
      if (f.fields.some((x) => 'name' in x && x.name === 'generateSlug') && f.fields.some((x) => 'name' in x && x.name === 'slug')) {
        const sf = f.fields.find((x) => 'name' in x && x.name === 'slug') as { label?: unknown } | undefined
        return { ...base, type: 'slug', name: 'slug', label: lbl(sf?.label, 'Sahifa manzili') === 'slug' ? 'Sahifa manzili' : lbl(sf?.label, 'Sahifa manzili'), description: undefined }
      }
      return { ...base, type: 'row', fields: kids(f.fields) }
    case 'collapsible':
      return { ...base, type: 'collapsible', fields: kids(f.fields), open: !(a.initCollapsed as boolean) }
    case 'tabs':
      return {
        ...base,
        type: 'tabs',
        tabs: f.tabs.map((t) => ({
          name: 'name' in t ? t.name : undefined,
          label: lbl(t.label, 'name' in t ? t.name : ''),
          description: typeof t.description === 'string' ? t.description : undefined,
          fields: kids(t.fields),
        })),
      }
    default:
      return null // json, point, blocks, join, ui — universal şaklda yöq
  }
}

const previewOf = (c: SanitizedCollectionConfig | SanitizedGlobalConfig) => {
  try {
    const p = (c.admin as { preview?: (d: object, o: { locale: string }) => unknown }).preview
    const u = p ? p({}, { locale: 'uz' }) : null
    return typeof u === 'string' ? u : null
  } catch {
    return null
  }
}

export async function collectionSchema(slug: string): Promise<DocSchema | null> {
  if (!(GENERIC_COLLECTIONS as readonly string[]).includes(slug)) return null
  const payload = await getPayloadClient()
  const c = payload.collections[slug as (typeof GENERIC_COLLECTIONS)[number]]?.config
  if (!c) return null
  return {
    slug,
    kind: 'collection',
    singular: lbl(c.labels.singular, slug),
    plural: lbl(c.labels.plural, slug),
    description: typeof c.admin.description === 'string' ? c.admin.description : undefined,
    useAsTitle: c.admin.useAsTitle ?? 'id',
    drafts: !!(c.versions && typeof c.versions === 'object' && c.versions.drafts),
    fields: c.fields.map(conv).filter((x): x is SField => !!x),
    preview: previewOf(c),
  }
}

export async function globalSchema(slug: string): Promise<DocSchema | null> {
  if (!(GENERIC_GLOBALS as readonly string[]).includes(slug)) return null
  const payload = await getPayloadClient()
  const g = payload.globals.config.find((x) => x.slug === slug)
  if (!g) return null
  return {
    slug,
    kind: 'global',
    singular: lbl(g.label, slug),
    plural: lbl(g.label, slug),
    description: typeof g.admin?.description === 'string' ? g.admin.description : undefined,
    useAsTitle: '',
    drafts: !!(g.versions && typeof g.versions === 'object' && g.versions.drafts),
    fields: g.fields.map(conv).filter((x): x is SField => !!x),
    preview: previewOf(g),
  }
}

/** Sxemadagi (körinadigan) maydon nomlari — row/tabs/collapsible içidagilar ham */
function names(fields: SField[], out = new Set<string>()) {
  for (const f of fields) {
    if (f.type === 'row' || f.type === 'collapsible') names(f.fields, out)
    else if (f.type === 'tabs')
      for (const t of f.tabs) {
        if (t.name) out.add(t.name)
        else names(t.fields, out)
      }
    else if (f.type === 'slug') out.add('slug').add('generateSlug')
    else if (f.name) out.add(f.name)
  }
  return out
}

/** Boğlangan hujjat obyekti (depth: 1) → id */
const idOf = (x: unknown): unknown =>
  Array.isArray(x) ? x.map(idOf) : x && typeof x === 'object' && 'id' in x && ('createdAt' in x || 'filename' in x) ? (x as { id: unknown }).id : x

/**
 * Guruh, nomli tab va röyxat qatoridagi sxemada yöq (yaşirin yoki qöllanmaydigan) maydonlar özgarişsiz qaytariladi —
 * aks holda saqlaşda ular öçib ketardi.
 */
function rest(fields: SField[], v: unknown): Record<string, unknown> {
  if (!v || typeof v !== 'object' || Array.isArray(v)) return {}
  const known = names(fields)
  return Object.fromEntries(Object.entries(v as Record<string, unknown>).filter(([k]) => !known.has(k) && k !== 'id').map(([k, x]) => [k, idOf(x)]))
}

const nested = (fields: SField[], v: unknown) => ({ ...rest(fields, v), ...toSaveData(fields, v as Record<string, unknown>) })

/** Saqlaş uçun: şakl qiymatlaridan sxemadagi maydonlar olinadi, boğlanmalar id ga aylantiriladi */
export function toSaveData(fields: SField[], v: Record<string, unknown> | null | undefined): Record<string, unknown> {
  const out: Record<string, unknown> = {}
  const src = v ?? {}
  for (const f of fields) {
    if (f.type === 'row' || f.type === 'collapsible') Object.assign(out, toSaveData(f.fields, src))
    else if (f.type === 'tabs')
      for (const t of f.tabs) {
        if (t.name) out[t.name] = nested(t.fields, src[t.name])
        else Object.assign(out, toSaveData(t.fields, src))
      }
    else if (f.type === 'slug') {
      out.generateSlug = src.generateSlug !== false
      if (src.generateSlug === false) out.slug = src.slug
    } else if (!f.name || f.readOnly || !(f.name in src)) continue
    else if (f.type === 'group') out[f.name] = nested(f.fields, src[f.name])
    else if (f.type === 'array')
      out[f.name] = ((src[f.name] as Record<string, unknown>[] | null) ?? []).map((row) => ({ ...nested(f.fields, row), ...(row.id ? { id: row.id } : {}) }))
    else if (f.type === 'upload' || f.type === 'relationship') {
      const x = src[f.name]
      out[f.name] = Array.isArray(x) ? x.map((y) => (y && typeof y === 'object' ? (y as { id: unknown }).id : y)) : x && typeof x === 'object' ? (x as { id: unknown }).id : (x ?? null)
    } else out[f.name] = src[f.name]
  }
  return out
}

/** “Saytda köriş” havolasi — Payload'dagi admin.preview hujjatning öziga qarab hisoblanadi */
export async function previewFor(kind: 'collection' | 'global', slug: string, doc: Record<string, unknown> | null): Promise<string | null> {
  const payload = await getPayloadClient()
  const c = kind === 'collection' ? (payload.collections as unknown as Record<string, { config: SanitizedCollectionConfig } | undefined>)[slug]?.config : payload.globals.config.find((x) => x.slug === slug)
  const p = (c?.admin as { preview?: (d: object, o: { locale: string }) => unknown } | undefined)?.preview
  if (!p || !doc) return null
  try {
    const u = await p(doc, { locale: 'uz' })
    return typeof u === 'string' ? u : null
  } catch {
    return null
  }
}
