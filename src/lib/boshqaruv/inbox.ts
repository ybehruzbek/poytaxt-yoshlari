import 'server-only'

import type { Where } from 'payload'

import type { Appeal, AppealFile, Membership, TextError, Volunteer } from '@/payload-types'

import { getPayloadClient } from './auth'
import { APPEAL_TYPE, type InboxKind, type InboxSlug, type Tone } from './inbox-config'
import { qisqaVaqt, sanaVaqt } from './vaqt'

export const INBOX_PER_PAGE = 25

export type InboxRow = { id: number; title: string; sub: string; when: string; status: string; tag?: { t: string; tone: Tone } }
export type Field = { t: string; v: string; href?: string; copy?: boolean }
export type InboxItem = {
  id: number
  slug: InboxSlug
  title: string
  created: string
  status: string
  note: string | null // null — bu turda ichki izoh maydoni yöq
  tag?: { t: string; tone: Tone }
  fields: Field[]
  body?: { t: string; v: string }
  textError?: { text: string; context: string; comment: string; page: string }
  file?: { name: string; url: string; size: string; mime: string }
}

const SEARCH: Record<InboxSlug, string[]> = {
  appeals: ['name', 'phone', 'email', 'message'],
  memberships: ['name', 'phone', 'place'],
  volunteers: ['name', 'phone', 'dirs'],
  'text-errors': ['text', 'page', 'comment'],
}

const oneLine = (s: unknown, n = 140) => String(s ?? '').replace(/\s+/g, ' ').trim().slice(0, n)
/**
 * Matn xatosi yuborilgan sahifa manzili saytga kirgan foydalanuvçidan keladi — faqat saytning içki yöli qoldiriladi
 * (“javascript:” yoki boşqa domenga havola xodim bosganda işlab ketmasin)
 */
const safePath = (raw: string) => {
  try {
    const u = new URL(raw, 'http://x.local')
    return u.pathname.startsWith('/') && !u.pathname.startsWith('//') ? `${u.pathname}${u.search}` : '/'
  } catch {
    return '/'
  }
}
const tel = (p: string) => `tel:${p.replace(/[^\d+]/g, '')}`
const kb = (b?: number | null) => (!b ? '' : b > 1048576 ? `${(b / 1048576).toFixed(1)} MB` : `${Math.ceil(b / 1024)} KB`)

function toRow(slug: InboxSlug, d: Record<string, unknown>): InboxRow {
  const base = { id: d.id as number, when: qisqaVaqt(d.createdAt as string), status: String(d.status ?? 'yangi') }
  switch (slug) {
    case 'appeals':
      return { ...base, title: String(d.name), sub: oneLine(d.message), tag: APPEAL_TYPE[String(d.type)] }
    case 'memberships':
      return { ...base, title: String(d.name), sub: oneLine(d.place) }
    case 'volunteers':
      return { ...base, title: String(d.name), sub: oneLine(d.dirs) }
    default:
      return { ...base, title: `“${oneLine(d.text, 80)}”`, sub: safePath(String(d.page ?? '')) }
  }
}

/** Röyxat: holat (sukut — javob kutayotganlar), qidiruv, sahifalaş; har bir holat böyiça son */
export async function listInbox(kind: InboxKind, p: { holat?: string; q?: string; sahifa?: string }) {
  const payload = await getPayloadClient()
  const and: Where[] = []
  const q = p.q?.trim()
  if (q) and.push({ or: SEARCH[kind.slug].map((f) => ({ [f]: { like: q } })) })
  const holat = p.holat === 'all' ? null : kind.statuses.some((s) => s.v === p.holat) ? p.holat! : null
  const page = Math.max(1, Number.parseInt(p.sahifa ?? '1', 10) || 1)

  const [res, ...counts] = await Promise.all([
    payload.find({
      collection: kind.slug,
      where: { and: holat ? [...and, { status: { equals: holat } }] : and },
      sort: '-createdAt',
      page,
      limit: INBOX_PER_PAGE,
      depth: 0,
      overrideAccess: true,
    }),
    payload.count({ collection: kind.slug, where: { and }, overrideAccess: true }),
    ...kind.statuses.map((s) => payload.count({ collection: kind.slug, where: { and: [...and, { status: { equals: s.v } }] }, overrideAccess: true })),
  ])
  return {
    rows: res.docs.map((d) => toRow(kind.slug, d as unknown as Record<string, unknown>)),
    page: res.page ?? 1,
    totalPages: res.totalPages,
    totalDocs: res.totalDocs,
    holat: holat ?? 'all',
    counts: { all: counts[0].totalDocs, ...Object.fromEntries(kind.statuses.map((s, i) => [s.v, counts[i + 1].totalDocs])) } as Record<string, number>,
  }
}

/** Bitta xabar — körsatiş uçun tayyor maydonlar bilan */
export async function getInboxItem(kind: InboxKind, id: number): Promise<InboxItem | null> {
  const payload = await getPayloadClient()
  let d: Record<string, unknown>
  try {
    d = (await payload.findByID({ collection: kind.slug, id, depth: 1, overrideAccess: true })) as unknown as Record<string, unknown>
  } catch {
    return null
  }
  const base = { id, slug: kind.slug, created: sanaVaqt(d.createdAt as string), status: String(d.status ?? 'yangi') }
  const contact = (x: { phone?: string | null; email?: string | null }): Field[] => [
    ...(x.phone ? [{ t: 'Telefon', v: x.phone, href: tel(x.phone), copy: true }] : []),
    ...(x.email ? [{ t: 'Elektron pochta', v: x.email, href: `mailto:${x.email}`, copy: true }] : []),
  ]

  if (kind.slug === 'appeals') {
    const a = d as unknown as Appeal
    const f = a.file && typeof a.file === 'object' ? (a.file as AppealFile) : null
    return {
      ...base,
      title: a.name,
      note: a.note ?? '',
      tag: APPEAL_TYPE[a.type],
      fields: contact(a),
      body: { t: 'Murojaat matni', v: a.message },
      file: f?.url ? { name: f.filename ?? 'fayl', url: f.url, size: kb(f.filesize), mime: f.mimeType ?? '' } : undefined,
    }
  }
  if (kind.slug === 'memberships') {
    const m = d as unknown as Membership
    return {
      ...base,
      title: m.name,
      note: m.note ?? '',
      fields: [...contact(m), { t: 'Tug‘ilgan yili', v: String(m.birthYear) }, { t: 'O‘qish yoki ish joyi', v: m.place }],
    }
  }
  if (kind.slug === 'volunteers') {
    const v = d as unknown as Volunteer
    return {
      ...base,
      title: v.name,
      note: v.note ?? '',
      fields: [
        ...contact(v),
        { t: 'Tug‘ilgan yili', v: String(v.birthYear) },
        { t: 'O‘qish yoki ish joyi', v: v.place },
        { t: 'Yo‘nalishlar', v: v.dirs },
        ...(v.time ? [{ t: 'Bandlik vaqti', v: v.time }] : []),
      ],
      body: v.about ? { t: 'Tajriba va qiziqishlar', v: v.about } : undefined,
    }
  }
  const t = d as unknown as TextError
  return {
    ...base,
    title: `“${oneLine(t.text, 80)}”`,
    note: null,
    fields: [],
    textError: { text: t.text, context: t.context ?? '', comment: t.comment ?? '', page: safePath(t.page) },
  }
}
