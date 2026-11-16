import type { CollectionBeforeChangeHook, CollectionConfig } from 'payload'

import { kontent, kontentYashirin } from '@/admin/access'
import { G } from '@/admin/groups'
import { bandlar, boglanma, havola, kod, manzilNomi, matn, qator, rasm, son, tanlov, uzunMatn } from '@/fields'
import { DIRS as P_DIRS, GROUPS as P_GROUPS, REGIONS as P_REGIONS } from '@/components/hamkorlar/data'
import { slugifyUz } from '@/lib/slugify'
import { saytManzil, yangilash } from '@/lib/revalidate'

/**
 * “Biz haqimizda”: OTT boşlanğiç taşkilotlari va yoşlar yetakçilari, hamkorlar, hududiy Kengaş bölimlari va xodimlari.
 */

const BT = '/biz-haqimizda/boshlangich-tashkilotlar'

/** Yetakçi sahifasi manzili ismdan avtomatik (böş bölsa) */
const leaderSlug: CollectionBeforeChangeHook = ({ data }) => {
  const l = data?.leader as { name?: string; slug?: string } | undefined
  if (l?.name && !l.slug) l.slug = slugifyUz(l.name.split(' ').slice(0, 2).join(' '))
  return data
}

export const Otts: CollectionConfig = {
  slug: 'otts',
  labels: { singular: 'Oliy taʼlim taşkiloti', plural: 'OTT boşlanğiç taşkilotlari' },
  orderable: true,
  admin: {
    group: G.biz,
    useAsTitle: 'otm',
    defaultColumns: ['otm', 'type', 'leader.name'],
    listSearchableFields: ['otm', 'leader.name'],
    description:
      'Saytdagi “Oliy taʼlim taşkilotlaridagi boşlanğiç taşkilotlar” sahifasi va har bir yetakçining sahifasi. Yetakçi saylanmagan bölsa, “Yoşlar yetakçisi” bölimini böş qoldiring — saytda “vakant” deb körsatiladi.',
    preview: (_d, { locale }) => saytManzil(`${BT}/oliy-talim`, locale),
    hidden: kontentYashirin,
  },
  access: kontent,
  hooks: { ...yangilash([BT, '/biz-haqimizda', '/boglanish/azo-bolish', '/'], true), beforeChange: [leaderSlug] },
  fields: [
    qator(
      matn('otm', 'Oliy taʼlim taşkiloti nomi', { majburiy: true, kenglik: '70%' }),
      tanlov('type', 'Turi', [
        { label: 'Davlat', value: 'davlat' },
        { label: 'Xorijiy (filial)', value: 'xorijiy' },
        { label: 'Nodavlat', value: 'nodavlat' },
      ], { majburiy: true, kenglik: '30%' }),
    ),
    {
      name: 'leader',
      label: 'Yoşlar yetakçisi',
      type: 'group',
      admin: { description: 'Şaxsiy maʼlumotlar (pasport, manzil, tuğilgan sana, şaxsiy telefon) yozilmaydi.' },
      fields: [
        qator(matn('name', 'Familiya, ism, otasining ismi', { tilli: false, kenglik: '60%' }), rasm('img', 'Surat (3:4)')),
        qator(matn('role', 'Lavozimi yoki kursi', { kenglik: '50%', namuna: '2-kurs talabasi' }), matn('spec', 'Mutaxassisligi', { kenglik: '50%' })),
        {
          type: 'collapsible',
          label: 'Aloqa (rasmiy)',
          admin: { initCollapsed: true },
          fields: [
            qator(
              matn('phone', 'Rasmiy iş telefoni', { tilli: false, kenglik: '50%', namuna: '+998 71 123-45-67' }),
              matn('email', 'Elektron poçta', { tilli: false, kenglik: '50%' }),
            ),
            qator(
              { ...havola('telegram', 'Telegram'), admin: { width: '33%', placeholder: 'https://t.me/…' } },
              { ...havola('instagram', 'Instagram'), admin: { width: '33%', placeholder: 'https://instagram.com/…' } },
              { ...havola('facebook', 'Facebook'), admin: { width: '34%', placeholder: 'https://facebook.com/…' } },
            ),
          ],
        },
        {
          type: 'collapsible',
          label: 'Yetakçi sahifasi uçun',
          admin: { initCollapsed: true },
          fields: [
            uzunMatn('about', 'Faoliyati haqida', { qator: 3 }),
            qator(
              matn('elected', 'Saylangan sana', { tilli: false, kenglik: '33%', namuna: '15.09.2025' }),
              matn('members', 'Aʼzolar soni', { tilli: false, kenglik: '33%' }),
              matn('reception', 'Qabul kunlari', { kenglik: '34%' }),
            ),
            bandlar('achievements', 'Yutuqlar', { band: 'Yutuq' }),
          ],
        },
        kod('slug', 'Sahifa manzili', { yonda: true, izoh: 'Ismdan avtomatik yasaladi.' }),
      ],
    },
  ],
}

export const Partners: CollectionConfig = {
  slug: 'partners',
  labels: { singular: 'Hamkor', plural: 'Hamkorlar' },
  orderable: true,
  admin: {
    group: G.biz,
    useAsTitle: 'name',
    defaultColumns: ['logo', 'name', 'group', 'site'],
    listSearchableFields: ['name', 'what'],
    description: 'Saytdagi “Hamkorlar” sahifasi va boş sahifadagi hamkorlar lentasi.',
    preview: (_d, { locale }) => saytManzil('/biz-haqimizda/hamkorlar', locale),
    hidden: kontentYashirin,
  },
  access: kontent,
  hooks: yangilash(['/biz-haqimizda/hamkorlar', '/'], false),
  fields: [
    matn('name', 'Taşkilotning rasmiy nomi', { majburiy: true }),
    qator(
      tanlov('group', 'Toifa', P_GROUPS.map((g) => ({ label: g.t, value: g.k })), { majburiy: true, kenglik: '50%' }),
      { ...tanlov('region', 'Mintaqa (xalqaro hamkorlar)', P_REGIONS.map((g) => ({ label: g.t, value: g.k })), { kenglik: '50%' }), admin: { width: '50%', condition: (d) => d?.group === 'xalqaro' } },
    ),
    tanlov('dirs', 'Hamkorlik yönalişlari', P_DIRS.map((g) => ({ label: g.t, value: g.k })), { köp: true }),
    uzunMatn('what', 'Birgalikdagi faoliyat', { majburiy: true, qator: 3 }),
    qator(rasm('logo', 'Logotip', { majburiy: true }), son('logoH', 'Logotip balandligi (px, kiçik logotip uçun)', { izoh: 'Odatda böş qoldiriladi.' })),
    qator({ ...havola('site', 'Rasmiy sayti'), admin: { width: '60%', placeholder: 'https://' } }, matn('domain', 'Saytning qisqa nomi', { tilli: false, kenglik: '40%', namuna: 'yoshlar.gov.uz' })),
    manzilNomi('name'),
  ],
}

export const Departments: CollectionConfig = {
  slug: 'departments',
  labels: { singular: 'Bölim', plural: 'Kengaş bölimlari' },
  orderable: true,
  admin: {
    group: G.biz,
    useAsTitle: 'short',
    defaultColumns: ['short', 'room'],
    description: 'Toşkent şahar hududiy Kengaşi apparatining bölimlari (sahifadagi tuzilma va vazifalar).',
    preview: (_d, { locale }) => saytManzil('/biz-haqimizda/hududiy-kengash', locale),
    hidden: kontentYashirin,
  },
  access: kontent,
  hooks: yangilash(['/biz-haqimizda/hududiy-kengash', '/boglanish'], true),
  fields: [
    matn('short', 'Qisqa nomi', { majburiy: true, namuna: 'Axborot xizmati' }),
    uzunMatn('t', 'Rasmiy töliq nomi', { majburiy: true, qator: 2 }),
    matn('room', 'Xona', { namuna: '12-xona' }),
    bandlar('tasks', 'Bölim vazifalari', { band: 'Vazifa' }),
    manzilNomi('short'),
  ],
}

const KUNLAR = ['Duşanba', 'Seşanba', 'Çorşanba', 'Payşanba', 'Juma', 'Şanba'].map((k) => ({ label: k, value: k }))

export const Staff: CollectionConfig = {
  slug: 'staff',
  labels: { singular: 'Xodim', plural: 'Kengaş xodimlari' },
  orderable: true,
  admin: {
    group: G.biz,
    useAsTitle: 'name',
    defaultColumns: ['img', 'name', 'role', 'dept', 'chair'],
    description: 'Hududiy Kengaş rahbariyati va xodimlari. Qabul kuni körsatilsa, xodim “Fuqarolarni qabul qiliş jadvali”da çiqadi.',
    preview: (_d, { locale }) => saytManzil('/biz-haqimizda/hududiy-kengash', locale),
    hidden: kontentYashirin,
  },
  access: kontent,
  hooks: yangilash(['/biz-haqimizda/hududiy-kengash', '/boglanish'], true),
  fields: [
    qator(matn('name', 'Familiya, ism, otasining ismi', { majburiy: true, tilli: false, kenglik: '60%' }), matn('role', 'Lavozimi', { majburiy: true, kenglik: '40%' })),
    qator(
      { ...boglanma('dept', 'Bölimi', 'departments'), admin: { width: '50%', condition: (d) => !d?.chair } },
      { name: 'chair', label: 'Kengaş raisi', type: 'checkbox', admin: { width: '50%' } },
    ),
    rasm('img', 'Surat', { majburiy: true }),
    qator(matn('phone', 'Xizmat telefoni', { tilli: false, kenglik: '50%' }), matn('email', 'Xizmat poçtasi', { tilli: false, kenglik: '50%' })),
    {
      name: 'qabul',
      label: 'Fuqarolarni qabul qiliş',
      type: 'group',
      fields: [
        qator(
          tanlov('day', 'Kuni', KUNLAR, { kenglik: '34%' }),
          matn('time', 'Vaqti', { tilli: false, kenglik: '33%', namuna: '14:00 — 17:00' }),
          matn('room', 'Xona', { tilli: false, kenglik: '33%', namuna: '11' }),
        ),
      ],
    },
    bandlar('duties', 'Xizmat vazifalari (bölmasa — bölim vazifalari körsatiladi)', { band: 'Vazifa' }),
    {
      name: 'socials',
      label: 'Ijtimoiy tarmoqlar (rasmiy)',
      type: 'array',
      labels: { singular: 'Tarmoq', plural: 'Tarmoqlar' },
      admin: { initCollapsed: true },
      fields: [
        qator(
          tanlov('net', 'Tarmoq', [{ label: 'Telegram', value: 'Telegram' }, { label: 'Instagram', value: 'Instagram' }, { label: 'Facebook', value: 'Facebook' }], { majburiy: true, kenglik: '25%' }),
          matn('handle', 'Nomi', { tilli: false, kenglik: '30%', namuna: '@kengash' }),
          { ...havola('href', 'Havola', { majburiy: true }), admin: { width: '45%', placeholder: 'https://' } },
        ),
      ],
    },
  ],
}
