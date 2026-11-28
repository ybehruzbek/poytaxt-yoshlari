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
  labels: { singular: 'Oliy ta’lim tashkiloti', plural: 'OTT boshlang‘ich tashkilotlari' },
  orderable: true,
  admin: {
    group: G.biz,
    useAsTitle: 'otm',
    defaultColumns: ['otm', 'type', 'leader.name'],
    listSearchableFields: ['otm', 'leader.name'],
    description:
      'Saytdagi “Oliy ta’lim tashkilotlaridagi boshlang‘ich tashkilotlar” sahifasi va har bir yetakchining sahifasi. Yetakchi saylanmagan bo‘lsa, “Yoshlar yetakchisi” bo‘limini bo‘sh qoldiring — saytda “vakant” deb ko‘rsatiladi.',
    preview: (_d, { locale }) => saytManzil(`${BT}/oliy-talim`, locale),
    hidden: kontentYashirin,
  },
  access: kontent,
  hooks: { ...yangilash([BT, '/biz-haqimizda', '/boglanish/azo-bolish', '/'], true), beforeChange: [leaderSlug] },
  fields: [
    qator(
      matn('otm', 'Oliy ta’lim tashkiloti nomi', { majburiy: true, kenglik: '70%' }),
      tanlov('type', 'Turi', [
        { label: 'Davlat', value: 'davlat' },
        { label: 'Xorijiy (filial)', value: 'xorijiy' },
        { label: 'Nodavlat', value: 'nodavlat' },
      ], { majburiy: true, kenglik: '30%' }),
    ),
    {
      name: 'leader',
      label: 'Yoshlar yetakchisi',
      type: 'group',
      admin: { description: 'Shaxsiy ma’lumotlar (pasport, manzil, tug‘ilgan sana, shaxsiy telefon) yozilmaydi.' },
      fields: [
        qator(matn('name', 'Familiya, ism, otasining ismi', { tilli: false, kenglik: '60%' }), rasm('img', 'Surat (3:4)')),
        qator(matn('role', 'Lavozimi yoki kursi', { kenglik: '50%', namuna: '2-kurs talabasi' }), matn('spec', 'Mutaxassisligi', { kenglik: '50%' })),
        {
          type: 'collapsible',
          label: 'Aloqa (rasmiy)',
          admin: { initCollapsed: true },
          fields: [
            qator(
              matn('phone', 'Rasmiy ish telefoni', { tilli: false, kenglik: '50%', namuna: '+998 71 123-45-67' }),
              matn('email', 'Elektron pochta', { tilli: false, kenglik: '50%' }),
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
          label: 'Yetakchi sahifasi uchun',
          admin: { initCollapsed: true },
          fields: [
            uzunMatn('about', 'Faoliyati haqida', { qator: 3 }),
            qator(
              matn('elected', 'Saylangan sana', { tilli: false, kenglik: '33%', namuna: '15.09.2025' }),
              matn('members', 'A’zolar soni', { tilli: false, kenglik: '33%' }),
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
    description: 'Saytdagi “Hamkorlar” sahifasi va bosh sahifadagi hamkorlar lentasi.',
    preview: (_d, { locale }) => saytManzil('/biz-haqimizda/hamkorlar', locale),
    hidden: kontentYashirin,
  },
  access: kontent,
  hooks: yangilash(['/biz-haqimizda/hamkorlar', '/'], false),
  fields: [
    matn('name', 'Tashkilotning rasmiy nomi', { majburiy: true }),
    qator(
      tanlov('group', 'Toifa', P_GROUPS.map((g) => ({ label: g.t, value: g.k })), { majburiy: true, kenglik: '50%' }),
      { ...tanlov('region', 'Mintaqa (xalqaro hamkorlar)', P_REGIONS.map((g) => ({ label: g.t, value: g.k })), { kenglik: '50%' }), admin: { width: '50%', condition: (d) => d?.group === 'xalqaro' } },
    ),
    tanlov('dirs', 'Hamkorlik yo‘nalishlari', P_DIRS.map((g) => ({ label: g.t, value: g.k })), { köp: true }),
    uzunMatn('what', 'Birgalikdagi faoliyat', { majburiy: true, qator: 3 }),
    qator(rasm('logo', 'Logotip', { majburiy: true }), son('logoH', 'Logotip balandligi (px, kichik logotip uchun)', { izoh: 'Odatda bo‘sh qoldiriladi.' })),
    qator({ ...havola('site', 'Rasmiy sayti'), admin: { width: '60%', placeholder: 'https://' } }, matn('domain', 'Saytning qisqa nomi', { tilli: false, kenglik: '40%', namuna: 'yoshlar.gov.uz' })),
    manzilNomi('name'),
  ],
}

export const Departments: CollectionConfig = {
  slug: 'departments',
  labels: { singular: 'Bo‘lim', plural: 'Kengash bo‘limlari' },
  orderable: true,
  admin: {
    group: G.biz,
    useAsTitle: 'short',
    defaultColumns: ['short', 'room'],
    description: 'Toshkent shahar hududiy Kengashi apparatining bo‘limlari (sahifadagi tuzilma va vazifalar).',
    preview: (_d, { locale }) => saytManzil('/biz-haqimizda/hududiy-kengash', locale),
    hidden: kontentYashirin,
  },
  access: kontent,
  hooks: yangilash(['/biz-haqimizda/hududiy-kengash', '/boglanish'], true),
  fields: [
    matn('short', 'Qisqa nomi', { majburiy: true, namuna: 'Axborot xizmati' }),
    uzunMatn('t', 'Rasmiy to‘liq nomi', { majburiy: true, qator: 2 }),
    matn('room', 'Xona', { namuna: '12-xona' }),
    bandlar('tasks', 'Bo‘lim vazifalari', { band: 'Vazifa' }),
    manzilNomi('short'),
  ],
}

const KUNLAR = ['Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma', 'Shanba'].map((k) => ({ label: k, value: k }))

export const Staff: CollectionConfig = {
  slug: 'staff',
  labels: { singular: 'Xodim', plural: 'Kengash xodimlari' },
  orderable: true,
  admin: {
    group: G.biz,
    useAsTitle: 'name',
    defaultColumns: ['img', 'name', 'role', 'dept', 'chair'],
    description: 'Hududiy Kengash rahbariyati va xodimlari. Qabul kuni ko‘rsatilsa, xodim “Fuqarolarni qabul qilish jadvali”da chiqadi.',
    preview: (_d, { locale }) => saytManzil('/biz-haqimizda/hududiy-kengash', locale),
    hidden: kontentYashirin,
  },
  access: kontent,
  hooks: yangilash(['/biz-haqimizda/hududiy-kengash', '/boglanish'], true),
  fields: [
    qator(matn('name', 'Familiya, ism, otasining ismi', { majburiy: true, tilli: false, kenglik: '60%' }), matn('role', 'Lavozimi', { majburiy: true, kenglik: '40%' })),
    qator(
      { ...boglanma('dept', 'Bo‘limi', 'departments'), admin: { width: '50%', condition: (d) => !d?.chair } },
      { name: 'chair', label: 'Kengash raisi', type: 'checkbox', admin: { width: '50%' } },
    ),
    rasm('img', 'Surat', { majburiy: true }),
    qator(matn('phone', 'Xizmat telefoni', { tilli: false, kenglik: '50%' }), matn('email', 'Xizmat pochtasi', { tilli: false, kenglik: '50%' })),
    {
      name: 'qabul',
      label: 'Fuqarolarni qabul qilish',
      type: 'group',
      fields: [
        qator(
          tanlov('day', 'Kuni', KUNLAR, { kenglik: '34%' }),
          matn('time', 'Vaqti', { tilli: false, kenglik: '33%', namuna: '14:00 — 17:00' }),
          matn('room', 'Xona', { tilli: false, kenglik: '33%', namuna: '11' }),
        ),
      ],
    },
    bandlar('duties', 'Xizmat vazifalari (bo‘lmasa — bo‘lim vazifalari ko‘rsatiladi)', { band: 'Vazifa' }),
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
