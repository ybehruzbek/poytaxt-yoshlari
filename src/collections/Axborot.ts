import type { CollectionConfig } from 'payload'

import { kontent, kontentYashirin } from '@/admin/access'
import { G } from '@/admin/groups'
import { ALBUM_TYPES, SERIES, VIDEO_TYPES } from '@/components/axborot/data'
import { MEDIA_KINDS } from '@/components/axborot/oav'
import { PRESS_KINDS } from '@/components/axborot/press'
import { bandlar, boglanma, havola, kod, manzilNomi, matn, qator, rasmlar, sana, son, tanlov, uzunMatn } from '@/fields'
import { saytManzil, yangilash } from '@/lib/revalidate'

/** “Axborot xizmati”: fotoalbomlar, videolar, press-relizlar, OAVda Kengaş haqida */

const AX = '/axborot-xizmati'
const kun = { pickerAppearance: 'dayOnly' as const, displayFormat: 'd MMMM yyyy' }
const opts = (r: Record<string, string>) => Object.entries(r).map(([value, label]) => ({ label, value }))

export const Albums: CollectionConfig = {
  slug: 'albums',
  labels: { singular: 'Fotoalbom', plural: 'Fotoalbomlar' },
  admin: {
    group: G.axborot,
    useAsTitle: 'title',
    defaultColumns: ['photos', 'title', 'date', 'type', 'place'],
    description: 'Saytdagi “Fotogalereya” sahifasi. Suratlarni birdaniga bir neçtasini tanlab yuklaş mumkin; birinçi surat — albom muqovasi.',
    preview: (_d, { locale }) => saytManzil(`${AX}/fotogalereya`, locale),
    hidden: kontentYashirin,
  },
  defaultSort: '-date',
  access: kontent,
  hooks: yangilash([AX], true),
  fields: [
    matn('title', 'Albom nomi', { majburiy: true }),
    qator(
      { ...sana('date', 'Sana', { majburiy: true }), admin: { width: '30%', date: kun } },
      tanlov('type', 'Turi', opts(ALBUM_TYPES), { majburiy: true, kenglik: '30%' }),
      matn('place', 'Joyi', { kenglik: '40%' }),
    ),
    rasmlar('photos', 'Suratlar', { majburiy: true, izoh: 'Tartibni sudrab özgartiriş mumkin. Birinçi uçta surat albom kartasida körinadi.' }),
    son('post', 'Kanal posti raqami', { yonda: true, izoh: 'Telegram kanaldagi asl post (bölsa).' }),
  ],
}

export const Videos: CollectionConfig = {
  slug: 'videos',
  labels: { singular: 'Video', plural: 'Videolar' },
  admin: {
    group: G.axborot,
    useAsTitle: 'title',
    defaultColumns: ['title', 'date', 'type', 'short'],
    description:
      'Saytdagi “Videogalereya” sahifasi. YouTube kanaldagi yangi videolar özi çiqadi; bu yerda — arxiv, turkum va turini belgilaş uçun.',
    preview: (_d, { locale }) => saytManzil(`${AX}/videogalereya`, locale),
    hidden: kontentYashirin,
  },
  defaultSort: '-date',
  access: kontent,
  hooks: yangilash([`${AX}/videogalereya`, `${AX}/press-relizlar`], true),
  fields: [
    matn('title', 'Video nomi', { majburiy: true }),
    qator(
      kod('youtubeId', 'YouTube ID', { majburiy: true, kenglik: '40%', namuna: 'hSJUcwB0qUM', izoh: 'Havoladagi “v=” dan keyingi qism; qisqa videoda — havolaning oxirgi qismi.' }),
      { name: 'short', label: 'Qisqa video (Shorts)', type: 'checkbox', admin: { width: '30%' } },
      { ...sana('date', 'Sana'), admin: { width: '30%', date: kun } },
    ),
    qator(
      tanlov('type', 'Turi', opts(VIDEO_TYPES), { kenglik: '35%' }),
      tanlov('series', 'Turkum', SERIES.map((s) => ({ label: s.title, value: s.key })), { kenglik: '35%' }),
      son('sec', 'Davomiyligi (soniya)', { kenglik: '30%' }),
    ),
  ],
}

export const Press: CollectionConfig = {
  slug: 'press',
  labels: { singular: 'Press-reliz', plural: 'Press-relizlar' },
  admin: {
    group: G.axborot,
    useAsTitle: 'title',
    defaultColumns: ['title', 'kind', 'date', '_status'],
    description: 'Saytdagi “Press-relizlar” sahifasi: rasmiy axborotlar va OAV uçun anonslar.',
    preview: (doc, { locale }) => saytManzil(`${AX}/press-relizlar/${doc.slug ?? ''}`, locale),
    hidden: kontentYashirin,
  },
  defaultSort: '-date',
  access: kontent,
  versions: { drafts: true, maxPerDoc: 30 },
  hooks: yangilash([`${AX}/press-relizlar`], true),
  fields: [
    matn('title', 'Sarlavha', { majburiy: true }),
    qator(tanlov('kind', 'Turi', opts(PRESS_KINDS), { majburiy: true, kenglik: '50%' }), { ...sana('date', 'Eʼlon qilingan sana', { majburiy: true }), admin: { width: '50%', date: kun } }),
    uzunMatn('lead', 'Birinçi xatboşi (eng muhim fakt)', { majburiy: true, qator: 3 }),
    bandlar('body', 'Matn (xatboşilar)', { band: 'Xatboşi' }),
    {
      name: 'facts',
      label: 'Asosiy raqamlar',
      type: 'array',
      labels: { singular: 'Raqam', plural: 'Raqamlar' },
      fields: [qator(matn('v', 'Raqam', { majburiy: true, kenglik: '30%', namuna: '70+' }), matn('k', 'Izoh', { majburiy: true, kenglik: '70%' }))],
    },
    {
      name: 'event',
      label: 'Anons uçun: tadbir vaqti va joyi',
      type: 'group',
      admin: { condition: (d) => d?.kind === 'anons' },
      fields: [qator(matn('when', 'Sana', { kenglik: '35%', namuna: '18-oktabr' }), matn('time', 'Vaqt', { kenglik: '20%', namuna: '10:00' }), matn('place', 'Joyi', { kenglik: '45%' }))],
    },
    qator({ ...boglanma('album', 'Fotoalbom', 'albums'), admin: { width: '50%' } }, { ...boglanma('video', 'Video', 'videos'), admin: { width: '50%' } }),
    manzilNomi('title'),
  ],
}

export const Oav: CollectionConfig = {
  slug: 'oav',
  labels: { singular: 'OAV materiali', plural: 'OAVda Kengaş haqida' },
  admin: {
    group: G.axborot,
    useAsTitle: 'title',
    defaultColumns: ['title', 'outlet', 'date'],
    description: 'Saytdagi “OAVda Kengaş haqida” sahifasi: boşqa naşr va saytlardagi materiallarga havolalar.',
    preview: (_d, { locale }) => saytManzil(`${AX}/oav`, locale),
    hidden: kontentYashirin,
  },
  defaultSort: '-date',
  access: kontent,
  hooks: yangilash([`${AX}/oav`]),
  fields: [
    matn('title', 'Material sarlavhasi', { majburiy: true }),
    qator(matn('outlet', 'Naşr yoki sayt nomi', { majburiy: true, kenglik: '50%' }), kod('domain', 'Domen', { kenglik: '25%', namuna: 'gov.uz' }), { ...sana('date', 'Sana', { majburiy: true }), admin: { width: '25%', date: kun } }),
    qator(tanlov('kind', 'Turi', opts(MEDIA_KINDS), { majburiy: true, kenglik: '50%' }), tanlov('lang', 'Tili', [{ label: 'Özbekça', value: 'uz' }, { label: 'Ruşça', value: 'ru' }], { majburiy: true, kenglik: '50%', sukut: 'uz' })),
    havola('url', 'Havola', { majburiy: true }),
    uzunMatn('sum', 'Qisqaça mazmuni', { majburiy: true, qator: 3 }),
  ],
}
