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
    izoh: '“Poytaxt yoshlari” Telegram kanalidagi post raqami (havolaning oxiridagi son, masalan 6230). Saytda manba havolasi bo‘lib chiqadi.',
  })

export const Directions: CollectionConfig = {
  slug: 'directions',
  labels: { singular: 'Faoliyat yo‘nalish', plural: 'Faoliyat yo‘nalishlari' },
  orderable: true,
  admin: {
    group: G.faoliyat,
    useAsTitle: 'short',
    defaultColumns: ['short', 'title', 'updatedAt'],
    description: 'Saytdagi “Faoliyat yo‘nalishlari” sahifasi. Tartibni sudrab o‘zgartirish mumkin — saytda shu tartibda chiqadi.',
    preview: (doc, { locale }) => saytManzil(`/faoliyat/yonalishlar/${doc.slug ?? ''}`, locale),
    hidden: kontentYashirin,
  },
  access: kontent,
  hooks: yangilash(['/faoliyat', '/'], true),
  fields: [
    matn('title', 'Rasmiy nomi', { majburiy: true, namuna: 'Yoshlarning intellektual salohiyatini oshirish' }),
    matn('short', 'Qisqa nomi', { majburiy: true, izoh: 'Saralash tugmalari va kartalarda ko‘rinadi.', namuna: 'Intellektual salohiyat' }),
    manzilNomi('short'),
    uzunMatn('about', 'Yo‘nalish haqida', { majburiy: true, qator: 6, izoh: 'Kengash shu yo‘nalish bo‘yicha qanday ishlarni amalga oshirishi — rasmiy uslubda.' }),
  ],
}

export const PROJECT_STATUS = [
  { label: 'Davom etmoqda', value: 'davom etmoqda' },
  { label: 'Har yili o‘tkaziladi', value: 'har yili' },
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
          label: 'Asosiy ma’lumot',
          fields: [
            matn('title', 'Loyiha nomi', { majburiy: true, namuna: '“Zakovat” intellektual o‘yinlari' }),
            qator(
              { ...boglanma('dir', 'Yo‘nalish', 'directions', { majburiy: true }), admin: { width: '50%' } },
              tanlov('holat', 'Loyiha holati', PROJECT_STATUS, { majburiy: true, kenglik: '25%', sukut: 'davom etmoqda' }),
              matn('period', 'Davri', { kenglik: '25%', namuna: '2023–2026', tilli: false }),
            ),
            uzunMatn('lead', 'Qisqa tavsif', { majburiy: true, qator: 3, izoh: 'Ro‘yxat kartasida va sahifa tepasida chiqadi (1–2 gap).' }),
            uzunMatn('description', 'Batafsil tavsif', { qator: 6 }),
            matn('audience', 'Kimlar uchun', { namuna: 'Oliy ta’lim tashkilotlari talabalari' }),
            {
              name: 'national',
              label: 'Respublika miqyosidagi loyiha (Markaziy Kengash bilan)',
              type: 'checkbox',
              defaultValue: false,
            },
          ],
        },
        {
          label: 'Natijalar va bosqichlar',
          fields: [
            bandlar('partners', 'Hamkorlar', { band: 'Hamkor tashkilot' }),
            {
              name: 'results',
              label: 'Natijalar (raqam va faktlar)',
              type: 'array',
              labels: { singular: 'Natija', plural: 'Natijalar' },
              fields: [qator(uzunMatn('text', 'Natija', { majburiy: true, qator: 2, kenglik: '75%' }), { ...post('Post'), admin: { width: '25%' } })],
            },
            {
              name: 'milestones',
              label: 'Bosqichlar (sana bo‘yicha)',
              type: 'array',
              labels: { singular: 'Bosqich', plural: 'Bosqichlar' },
              fields: [
                qator(
                  { ...sana('date', 'Sana', { majburiy: true }), admin: { width: '25%', date: { pickerAppearance: 'dayOnly', displayFormat: 'd MMMM yyyy' } } },
                  uzunMatn('text', 'Nima bo‘lib o‘tdi', { majburiy: true, qator: 2, kenglik: '55%' }),
                  { ...post('Post'), admin: { width: '20%' } },
                ),
              ],
            },
            {
              name: 'posts',
              label: 'Kanaldagi boshqa postlar',
              type: 'array',
              labels: { singular: 'Post', plural: 'Postlar' },
              admin: { description: 'Loyihaga oid qo‘shimcha postlar raqamlari.', initCollapsed: true },
              fields: [son('n', 'Post raqami', { majburiy: true })],
            },
          ],
        },
        {
          label: 'Rasmlar',
          fields: [
            rasm('cover', 'Muqova rasmi', { majburiy: true, izoh: 'Ro‘yxatda va sahifa tepasida chiqadi. Gorizontal rasm tavsiya etiladi.' }),
            rasmlar('gallery', 'Fotogalereya', { izoh: 'Sahifa pastidagi suratlar. Bir nechtasini birdaniga tanlash mumkin.' }),
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
    description: 'Saytdagi “Tadbirlar va kalendar” sahifasi (arxiv va yaqin tadbirlar). Yangi tadbir qo‘shilsa, ro‘yxat boshida sanasi bo‘yicha chiqadi.',
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
      { ...boglanma('dir', 'Yo‘nalish', 'directions', { majburiy: true }), admin: { width: '34%' } },
      matn('type', 'Turi', { kenglik: '33%', namuna: 'uchrashuv, seminar, festival…' }),
    ),
    matn('place', 'O‘tkazilgan joy', { namuna: 'Yoshlar ijod saroyi' }),
    uzunMatn('summary', 'Qisqa mazmuni', { majburiy: true, qator: 3 }),
    rasm('img', 'Rasm', { majburiy: true }),
    {
      name: 'upcoming',
      label: 'Yaqin tadbir (hali bo‘lib o‘tmagan)',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar', description: 'Belgilansa, bosh sahifadagi “Yaqin tadbirlar”da chiqadi.' },
    },
    { ...post(), admin: { ...post().admin, position: 'sidebar' } },
  ],
}
