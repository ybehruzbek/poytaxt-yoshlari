import type { CollectionConfig } from 'payload'

import { kontent, kontentYashirin } from '@/admin/access'
import { G } from '@/admin/groups'
import { bandlar, boglanma, manzilNomi, matn, qator, rasm, rasmlar, sana, son, tanlov, uzunMatn } from '@/fields'
import { saytManzil, yangilash } from '@/lib/revalidate'

/**
 * “Faoliyat” bölimi: yönalişlar, loyihalar va tadbirlar arxivi. Saytdagi /faoliyat/yonalishlar, /loyihalar,
 * /tadbirlar sahifalari va volontyorlik sahifasidagi raqamlar şu töplamlardan olinadi.
 */

const post = (label = 'Kanal posti raqami') =>
  son('post', label, {
    izoh: '“Poytaxt yoşlari” Telegram kanalidagi post raqami (havolaning oxiridagi son, masalan 6230). Saytda manba havolasi bölib çiqadi.',
  })

export const Directions: CollectionConfig = {
  slug: 'directions',
  labels: { singular: 'Faoliyat yönaliş', plural: 'Faoliyat yönalişlari' },
  orderable: true,
  admin: {
    group: G.faoliyat,
    useAsTitle: 'short',
    defaultColumns: ['short', 'title', 'updatedAt'],
    description: 'Saytdagi “Faoliyat yönalişlari” sahifasi. Tartibni sudrab özgartiriş mumkin — saytda şu tartibda çiqadi.',
    preview: (doc, { locale }) => saytManzil(`/faoliyat/yonalishlar/${doc.slug ?? ''}`, locale),
    hidden: kontentYashirin,
  },
  access: kontent,
  hooks: yangilash(['/faoliyat', '/'], true),
  fields: [
    matn('title', 'Rasmiy nomi', { majburiy: true, namuna: 'Yoşlarning intellektual salohiyatini oşiriş' }),
    matn('short', 'Qisqa nomi', { majburiy: true, izoh: 'Saralaş tugmalari va kartalarda körinadi.', namuna: 'Intellektual salohiyat' }),
    manzilNomi('short'),
    uzunMatn('about', 'Yönaliş haqida', { majburiy: true, qator: 6, izoh: 'Kengaş şu yönaliş böyiça qanday işlarni amalga oşirişi — rasmiy uslubda.' }),
  ],
}

export const PROJECT_STATUS = [
  { label: 'Davom etmoqda', value: 'davom etmoqda' },
  { label: 'Har yili ötkaziladi', value: 'har yili' },
  { label: 'Yakunlangan', value: 'yakunlangan' },
] as const

export const Projects: CollectionConfig = {
  slug: 'projects',
  labels: { singular: 'Loyiha', plural: 'Loyihalar' },
  orderable: true,
  admin: {
    group: G.faoliyat,
    useAsTitle: 'title',
    defaultColumns: ['cover', 'title', 'dir', 'holat', 'period', '_status'],
    listSearchableFields: ['title', 'lead'],
    description: 'Saytdagi “Loyihalar” sahifasi va har bir loyihaning alohida sahifasi.',
    preview: (doc, { locale }) => saytManzil(`/faoliyat/loyihalar/${doc.slug ?? ''}`, locale),
    hidden: kontentYashirin,
  },
  access: kontent,
  versions: { drafts: true, maxPerDoc: 30 },
  hooks: yangilash(['/faoliyat', '/'], true),
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Asosiy maʼlumot',
          fields: [
            matn('title', 'Loyiha nomi', { majburiy: true, namuna: '“Zakovat” intellektual öyinlari' }),
            qator(
              { ...boglanma('dir', 'Yönaliş', 'directions', { majburiy: true }), admin: { width: '50%' } },
              tanlov('holat', 'Loyiha holati', PROJECT_STATUS, { majburiy: true, kenglik: '25%', sukut: 'davom etmoqda' }),
              matn('period', 'Davri', { kenglik: '25%', namuna: '2023–2026', tilli: false }),
            ),
            uzunMatn('lead', 'Qisqa tavsif', { majburiy: true, qator: 3, izoh: 'Röyxat kartasida va sahifa tepasida çiqadi (1–2 gap).' }),
            uzunMatn('description', 'Batafsil tavsif', { qator: 6 }),
            matn('audience', 'Kimlar uçun', { namuna: 'Oliy taʼlim taşkilotlari talabalari' }),
            {
              name: 'national',
              label: 'Respublika miqyosidagi loyiha (Markaziy Kengaş bilan)',
              type: 'checkbox',
              defaultValue: false,
            },
          ],
        },
        {
          label: 'Natijalar va bosqiçlar',
          fields: [
            bandlar('partners', 'Hamkorlar', { band: 'Hamkor taşkilot' }),
            {
              name: 'results',
              label: 'Natijalar (raqam va faktlar)',
              type: 'array',
              labels: { singular: 'Natija', plural: 'Natijalar' },
              fields: [qator(uzunMatn('text', 'Natija', { majburiy: true, qator: 2, kenglik: '75%' }), { ...post('Post'), admin: { width: '25%' } })],
            },
            {
              name: 'milestones',
              label: 'Bosqiçlar (sana böyiça)',
              type: 'array',
              labels: { singular: 'Bosqiç', plural: 'Bosqiçlar' },
              fields: [
                qator(
                  { ...sana('date', 'Sana', { majburiy: true }), admin: { width: '25%', date: { pickerAppearance: 'dayOnly', displayFormat: 'd MMMM yyyy' } } },
                  uzunMatn('text', 'Nima bölib ötdi', { majburiy: true, qator: 2, kenglik: '55%' }),
                  { ...post('Post'), admin: { width: '20%' } },
                ),
              ],
            },
            {
              name: 'posts',
              label: 'Kanaldagi boşqa postlar',
              type: 'array',
              labels: { singular: 'Post', plural: 'Postlar' },
              admin: { description: 'Loyihaga oid qöşimça postlar raqamlari.', initCollapsed: true },
              fields: [son('n', 'Post raqami', { majburiy: true })],
            },
          ],
        },
        {
          label: 'Rasmlar',
          fields: [
            rasm('cover', 'Muqova rasmi', { majburiy: true, izoh: 'Röyxatda va sahifa tepasida çiqadi. Gorizontal rasm tavsiya etiladi.' }),
            rasmlar('gallery', 'Fotogalereya', { izoh: 'Sahifa pastidagi suratlar. Bir neçtasini birdaniga tanlaş mumkin.' }),
          ],
        },
      ],
    },
    manzilNomi('title'),
  ],
}

export const Events: CollectionConfig = {
  slug: 'events',
  labels: { singular: 'Tadbir', plural: 'Tadbirlar' },
  admin: {
    group: G.faoliyat,
    useAsTitle: 'title',
    defaultColumns: ['img', 'title', 'date', 'dir', 'type', 'upcoming'],
    listSearchableFields: ['title', 'place', 'summary'],
    description: 'Saytdagi “Tadbirlar va kalendar” sahifasi (arxiv va yaqin tadbirlar). Yangi tadbir qöşilsa, röyxat boşida sanasi böyiça çiqadi.',
    preview: (_doc, { locale }) => saytManzil('/faoliyat/tadbirlar', locale),
    hidden: kontentYashirin,
  },
  defaultSort: '-date',
  access: kontent,
  hooks: yangilash(['/faoliyat', '/'], true),
  fields: [
    matn('title', 'Tadbir nomi', { majburiy: true }),
    qator(
      { ...sana('date', 'Sana', { majburiy: true }), admin: { width: '33%', date: { pickerAppearance: 'dayOnly', displayFormat: 'd MMMM yyyy' } } },
      { ...boglanma('dir', 'Yönaliş', 'directions', { majburiy: true }), admin: { width: '34%' } },
      matn('type', 'Turi', { kenglik: '33%', namuna: 'uçraşuv, seminar, festival…' }),
    ),
    matn('place', 'Ötkazilgan joy', { namuna: 'Yoşlar ijod saroyi' }),
    uzunMatn('summary', 'Qisqa mazmuni', { majburiy: true, qator: 3 }),
    rasm('img', 'Rasm', { majburiy: true }),
    {
      name: 'upcoming',
      label: 'Yaqin tadbir (hali bölib ötmagan)',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar', description: 'Belgilansa, boş sahifadagi “Yaqin tadbirlar”da çiqadi.' },
    },
    { ...post(), admin: { ...post().admin, position: 'sidebar' } },
  ],
}
