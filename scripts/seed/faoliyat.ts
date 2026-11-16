/**
 * “Faoliyat” bölimini kod içidagi maʼlumotdan bazaga köçiradi: yönalişlar, loyihalar, tadbirlar, natijalar
 * va eski eʼlonlar (yangiliklar töplamiga, kind: 'elon'). Işga tuşiriş: pnpm payload run scripts/seed/faoliyat.ts
 */
import { getPayload } from 'payload'

import config from '../../src/payload.config'
import { ANNOUNCEMENTS } from '../../src/components/faoliyat/announcements'
import { DIRECTIONS, PROJECTS, REPORT_2025, YEARS } from '../../src/components/faoliyat/data'
import { EVENTS } from '../../src/components/faoliyat/events'
import { slugifyUz } from '../../src/lib/slugify'
import { blocksToLexical } from '../../src/lib/tg/transform'

import { kun, media, upsert } from './_lib'

const payload = await getPayload({ config })
const only = process.env.ONLY?.split(',')
const want = (k: string) => !only || only.includes(k)

// 1) Yönalişlar
const dirId = new Map<string, number>()
for (const d of DIRECTIONS) {
  const doc = await upsert(payload, 'directions', { slug: { equals: d.slug } }, {
    title: d.title,
    short: d.short,
    about: d.about,
    slug: d.slug,
    generateSlug: false,
  })
  dirId.set(d.slug, doc.id as number)
}
console.log('yönalişlar:', dirId.size)

// 2) Loyihalar
if (want('projects')) {
  for (const p of PROJECTS) {
    const cover = await media(payload, p.cover, p.title, 'Loyihalar')
    const gallery: number[] = []
    for (const [i, g] of p.gallery.entries()) {
      const id = await media(payload, g, `${p.title} — ${i + 1}-surat`, 'Loyihalar')
      if (id) gallery.push(id)
    }
    await upsert(payload, 'projects', { slug: { equals: p.slug } }, {
      title: p.title,
      slug: p.slug,
      generateSlug: false,
      dir: dirId.get(p.dir),
      holat: p.status,
      period: p.period,
      lead: p.lead,
      description: p.description,
      audience: p.audience,
      national: p.national,
      partners: p.partners.map((t) => ({ t })),
      results: p.results.map((r) => ({ text: r.text, post: r.post })),
      milestones: p.milestones.map((m) => ({ date: kun(m.date), text: m.text, post: m.post })),
      posts: p.posts.map((n) => ({ n })),
      cover,
      gallery,
      _status: 'published',
    })
  }
  console.log('loyihalar:', PROJECTS.length)
}

// 3) Tadbirlar
if (want('events')) {
  let n = 0
  for (const e of EVENTS) {
    const img = await media(payload, e.img, e.title, 'Tadbirlar')
    await upsert(payload, 'events', { post: { equals: e.id } }, {
      title: e.title,
      date: kun(e.date),
      dir: dirId.get(e.dir),
      type: e.type,
      place: e.place,
      summary: e.summary,
      img,
      upcoming: !!e.upcoming,
      post: e.id,
    })
    if (++n % 50 === 0) console.log('  tadbirlar:', n)
  }
  console.log('tadbirlar:', n)
}

// 4) Natijalar
if (want('natijalar')) {
  await payload.updateGlobal({
    slug: 'natijalar',
    locale: 'uz',
    overrideAccess: true,
    data: {
      report: { post: REPORT_2025.post, nums: REPORT_2025.nums.map((x) => ({ v: x.v, t: x.t })) },
      years: YEARS.map((y) => ({ y: y.y, items: y.items.map((i) => ({ text: i.text, post: i.post })) })),
    } as never,
  })
  console.log('natijalar: yangilandi')
}

// 5) Eski eʼlonlar → Yangiliklar (kind: 'elon'); kanaldan allaqaçon import qilinganlari tegilmaydi
if (want('elonlar')) {
  let added = 0
  for (const a of ANNOUNCEMENTS) {
    const exists = await payload.count({ collection: 'news', where: { tgId: { equals: a.id } }, overrideAccess: true })
    if (exists.totalDocs) continue
    const image = await media(payload, a.img, a.title, 'Eʼlonlar')
    if (!image) continue
    try { await payload.create({
      collection: 'news',
      locale: 'uz',
      overrideAccess: true,
      data: {
        title: a.title,
        slug: `${slugifyUz(a.title).slice(0, 70)}-${a.id}`,
        category: 'imkoniyat',
        publishedAt: kun(a.date),
        image,
        excerpt: a.text,
        content: blocksToLexical([{ p: a.text }]),
        kind: 'elon',
        tgId: a.id,
        source: `https://t.me/poytaxtyoshlari_yi/${a.id}`,
        _status: 'published',
      } as never,
    }) } catch (e) { console.log('  ! eʼlon', a.id, JSON.stringify((e as { data?: unknown }).data ?? String(e))); continue }
    added++
  }
  console.log('eʼlonlar qöşildi:', added)
}

process.exit(0)
