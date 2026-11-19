/**
 * Universal şakl uçun maydonlar sxemasi — Payload konfiguratsiyasidan olinib, brauzerga oddiy JSON sifatida uzatiladi.
 * Funksiyalar (hook, ruxsat, tekşiruv) serverda qoladi; körsatiş şarti (`when`) maʼlumot sifatida keladi.
 */
export type Opt = { v: string; t: string }

type Base = {
  name?: string
  label?: string
  required?: boolean
  description?: string
  placeholder?: string
  width?: string
  side?: boolean // öng ustunda (sidebar)
  readOnly?: boolean
  when?: Cond // körsatiş şarti (Payload'dagi admin.condition'dan)
}

/** Körsatiş şarti — kod emas, maʼlumot: “yoki” bilan boğlangan oddiy solişturuvlar */
export type CondTerm = { from: 0 | 1; path: string[]; neg: boolean; len: boolean; eq?: string }
export type Cond = { or: CondTerm[] }

export type SField =
  | (Base & { type: 'text' | 'email' | 'textarea' | 'code'; name: string; maxLength?: number; rows?: number; hasMany?: boolean })
  | (Base & { type: 'number'; name: string; min?: number; max?: number; step?: number })
  | (Base & { type: 'checkbox'; name: string })
  | (Base & { type: 'date'; name: string; time: boolean })
  | (Base & { type: 'select'; name: string; options: Opt[]; hasMany?: boolean })
  | (Base & { type: 'richText'; name: string })
  | (Base & { type: 'slug'; name: 'slug' }) // Payload slugField: `slug` + yaşirin `generateSlug` (qulf)
  | (Base & { type: 'upload'; name: string; relationTo: string; hasMany?: boolean; maxRows?: number })
  | (Base & { type: 'relationship'; name: string; relationTo: string; hasMany?: boolean })
  | (Base & { type: 'array'; name: string; fields: SField[]; singular: string; maxRows?: number; minRows?: number })
  | (Base & { type: 'group'; name: string; fields: SField[] })
  | (Base & { type: 'row'; fields: SField[] })
  | (Base & { type: 'collapsible'; fields: SField[]; open?: boolean })
  | (Base & { type: 'tabs'; tabs: { name?: string; label: string; description?: string; fields: SField[] }[] })

export type DocSchema = {
  slug: string
  kind: 'collection' | 'global'
  singular: string
  plural: string
  description?: string
  useAsTitle: string
  drafts: boolean
  fields: SField[]
  preview?: string | null // saytdagi sahifa manzili
}
