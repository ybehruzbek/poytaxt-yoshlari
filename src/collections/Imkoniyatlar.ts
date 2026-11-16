import type { CollectionConfig, Field } from 'payload'

import { kontent, kontentYashirin } from '@/admin/access'
import { G } from '@/admin/groups'
import { bandlar, havola, manzilNomi, matn, qator, rasm, sana, son, tanlov, uzunMatn } from '@/fields'
import { SUMMA_IZOH } from '@/lib/miqdorlar'
import { saytManzil, yangilash } from '@/lib/revalidate'

/**
 * “Imkoniyatlar”: grantlar, stipendiyalar, tanlovlar, davlat mukofotlari, imtiyozlar, volontyorlik yönalişlari.
 * Summalar matnda {BHM×3} kabi belgilar bilan yoziladi va saytda “Miqdorlar” sozlamasidan avtomatik hisoblanadi.
 */

const summaliMatn = (name: string, label: string, o: { majburiy?: boolean; qator?: number } = {}) =>
  uzunMatn(name, label, { majburiy: o.majburiy, qator: o.qator ?? 2, izoh: SUMMA_IZOH })

/** Muddat: aniq sana bölsa — sana, bölmasa — qaçon ötkazilişi matn bilan */
const muddat = (): Field[] => [
  qator(
    { ...sana('deadline', 'Ariza muddati (oxirgi kun)'), admin: { width: '40%', description: 'Aniq bölsa. Saytda “N kun qoldi” bölib çiqadi.', date: { pickerAppearance: 'dayOnly', displayFormat: 'd MMMM yyyy' } } },
    matn('cycle', 'Qaçon ötkaziladi', { kenglik: '60%', namuna: 'Har yili: mart — aprel' }),
  ),
]

const manba = (): Field[] => [qator({ ...havola('url', 'Rasmiy sahifa havolasi', { majburiy: true }), admin: { width: '60%', placeholder: 'https://' } }, matn('source', 'Manba nomi', { kenglik: '40%', namuna: 'gov.uz — Taʼlim va ilm-fan vazirligi' }))]

const base = (slug: string, sing: string, plural: string, path: string, desc: string, cols: string[]): Partial<CollectionConfig> => ({
  slug,
  labels: { singular: sing, plural },
  orderable: true,
  admin: {
    group: G.faoliyat,
    useAsTitle: 't',
    defaultColumns: cols,
    listSearchableFields: ['t', 'org'],
    description: desc,
    preview: (_d, { locale }) => saytManzil(path, locale),
    hidden: kontentYashirin,
  },
  access: kontent,
  hooks: yangilash([path, '/'], false),
})

/* ---------- Grantlar ---------- */
export const Grants: CollectionConfig = {
  ...(base('grants', 'Grant', 'Grantlar', '/faoliyat/grantlar', 'Saytdagi “Grantlar” sahifasi va boş sahifadagi “Imkoniyatlar” bloki.', ['t', 'cat', 'origin', 'deadline']) as CollectionConfig),
  fields: [
    matn('t', 'Grant nomi', { majburiy: true }),
    qator(
      tanlov('cat', 'Yönaliş', [
        { label: 'Startap va tadbirkorlik', value: 'startap' },
        { label: 'Talaba va öquvçilar', value: 'talim' },
        { label: 'Ilm-fan va tadqiqot', value: 'ilm' },
        { label: 'Ijtimoiy loyihalar', value: 'ijtimoiy' },
        { label: 'Ekologiya', value: 'ekologiya' },
        { label: 'Madaniyat va ijod', value: 'ijod' },
      ], { majburiy: true, kenglik: '50%' }),
      tanlov('origin', 'Grant beruvçi', [
        { label: 'Mahalliy (Özbekiston)', value: 'mahalliy' },
        { label: 'Xorijiy va xalqaro', value: 'xorijiy' },
      ], { kenglik: '50%', sukut: 'mahalliy' }),
    ),
    matn('org', 'Grant beruvçi taşkilot', { majburiy: true }),
    summaliMatn('amount', 'Grant miqdori', { majburiy: true }),
    uzunMatn('who', 'Kimlar uçun', { majburiy: true, qator: 2 }),
    uzunMatn('text', 'Tavsif', { majburiy: true, qator: 4 }),
    ...muddat(),
    matn('note', 'Alohida izoh', { izoh: 'Masalan: “Nizom loyihasi”. Kartada belgi bölib çiqadi.' }),
    ...manba(),
    rasm('img', 'Rasm (ixtiyoriy)'),
    manzilNomi('t'),
  ],
}

/* ---------- Stipendiyalar ---------- */
export const STIP_TURI = [
  { label: 'Prezident stipendiyasi (asosiy karta)', value: 'prezident' },
  { label: 'Nomli davlat stipendiyasi', value: 'nomli' },
  { label: 'Idoraviy stipendiya (vazirlik, harbiy)', value: 'idoraviy' },
  { label: 'Xorijda taʼlim', value: 'xorij' },
] as const

export const STIP_IKONKA = ['yulduz', 'kitob', 'globus', 'oy', 'tishli', 'tibbiyot', 'yurak', 'qalpoq', 'atom', 'medal', 'qalqon', 'qalam', 'pero', 'kalendar']
export const BAYROQLAR = [
  { label: 'Özbekiston', value: 'uz' },
  { label: 'Buyuk Britaniya', value: 'gb' },
  { label: 'AQŞ', value: 'us' },
  { label: 'Germaniya', value: 'de' },
  { label: 'Vengriya', value: 'hu' },
  { label: 'Turkiya', value: 'tr' },
  { label: 'Koreya', value: 'kr' },
  { label: 'Yaponiya', value: 'jp' },
  { label: 'Yevropa Ittifoqi', value: 'eu' },
  { label: 'Xitoy', value: 'cn' },
]

export const Stipends: CollectionConfig = {
  ...(base('stipends', 'Stipendiya', 'Stipendiyalar', '/faoliyat/stipendiyalar', 'Saytdagi “Stipendiyalar” sahifasi: davlat va xorijiy stipendiyalar.', ['t', 'turi', 'deadline']) as CollectionConfig),
  fields: [
    matn('t', 'Stipendiya nomi', { majburiy: true }),
    qator(
      tanlov('turi', 'Sahifadagi örni', STIP_TURI, { majburiy: true, kenglik: '50%', izoh: 'Stipendiya sahifaning qaysi blokida çiqişi.' }),
      { ...tanlov('icon', 'Ikonka', STIP_IKONKA.map((v) => ({ label: v, value: v })), { kenglik: '25%' }), admin: { width: '25%', condition: (d) => d?.turi === 'nomli' || d?.turi === 'idoraviy' } },
      { ...tanlov('flag', 'Davlat bayroği', BAYROQLAR, { kenglik: '25%' }), admin: { width: '25%', condition: (d) => d?.turi === 'xorij' } },
    ),
    { ...matn('soha', 'Soha (qisqa)', { namuna: 'Gumanitar fanlar' }), admin: { condition: (d) => d?.turi === 'nomli', description: 'Nomli stipendiyalar setkasida nom ostida çiqadi.' } },
    matn('org', 'Tanlovni ötkazuvçi yoki stipendiya beruvçi', { majburiy: true }),
    {
      name: 'rates',
      label: 'Oylik miqdori',
      type: 'array',
      labels: { singular: 'Miqdor', plural: 'Miqdorlar' },
      admin: { description: 'Davlat stipendiyalari uçun. Summa “Miqdorlar” sozlamasidan avtomatik hisoblanadi.' },
      fields: [
        qator(
          matn('l', 'Izoh', { kenglik: '40%', namuna: 'bakalavriat' }),
          tanlov('base', 'Asos', [
            { label: 'Prezident stipendiyasi summasi', value: 'prezident' },
            { label: 'Nomli stipendiya summasi', value: 'nomli' },
            { label: '“Aʼlo” stipendiya summasi', value: 'alo' },
            { label: 'Bazaviy stipendiya × koeffitsient', value: 'stip' },
            { label: 'BHM × koeffitsient', value: 'bhm' },
          ], { majburiy: true, kenglik: '35%' }),
          { ...son('k', 'Koeffitsient', { kenglik: '25%' }), admin: { width: '25%', step: 0.01, condition: (_d, s) => s?.base === 'stip' || s?.base === 'bhm' } },
        ),
      ],
    },
    {
      name: 'badge',
      label: 'Kartadagi asosiy maʼlumot (miqdor bölmasa)',
      type: 'group',
      admin: { condition: (d) => !d?.rates?.length },
      fields: [qator(matn('l', 'Sarlavha', { kenglik: '50%', namuna: 'Stipendiya miqdori' }), matn('v', 'Qiymat', { kenglik: '50%', namuna: 'Töliq qoplanadi' }))],
    },
    uzunMatn('who', 'Kimlar uçun', { majburiy: true, qator: 2 }),
    summaliMatn('perk', 'Imtiyoz', { majburiy: true }),
    matn('cycle', 'Ariza qabuli', { majburiy: true }),
    uzunMatn('text', 'Tanlov tartibi', { qator: 4 }),
    sana('deadline', 'Ariza muddati (aniq bölsa)'),
    ...manba(),
    manzilNomi('t'),
  ],
}

/* ---------- Tanlovlar ---------- */
export const Contests: CollectionConfig = {
  ...(base('contests', 'Tanlov', 'Tanlovlar', '/faoliyat/tanlovlar', 'Saytdagi “Tanlovlar” sahifasi: yoşlar uçun sohaviy tanlovlar.', ['t', 'cat', 'deadline']) as CollectionConfig),
  fields: [
    matn('t', 'Tanlov nomi', { majburiy: true }),
    qator(
      tanlov('cat', 'Soha', [
        { label: 'Ilm-fan va innovatsiya', value: 'ilm' },
        { label: 'Raqamli ijod', value: 'raqamli' },
        { label: 'Madaniyat va sanʼat', value: 'madaniyat' },
        { label: 'Adabiyot va kitobxonlik', value: 'adabiyot' },
        { label: 'Tibbiyot', value: 'tibbiyot' },
        { label: 'Sport', value: 'sport' },
      ], { majburiy: true, kenglik: '40%' }),
      matn('org', 'Taşkilotçi', { majburiy: true, kenglik: '60%' }),
    ),
    {
      name: 'badge',
      label: 'Kartadagi asosiy maʼlumot',
      type: 'group',
      fields: [qator(summaliMatn('l', 'Sarlavha'), summaliMatn('v', 'Qiymat'))],
    },
    uzunMatn('who', 'Kimlar uçun', { majburiy: true, qator: 2 }),
    summaliMatn('prize', 'Mukofot', { majburiy: true }),
    uzunMatn('text', 'Tavsif', { majburiy: true, qator: 4 }),
    ...muddat(),
    {
      name: 'window',
      label: 'Ariza qabuli oralığı',
      type: 'group',
      admin: { description: 'Ariza qabul qilinadigan davr: boşlaniş va tugaş sanalari.' },
      fields: [qator({ ...sana('from', 'Boşlaniş'), admin: { width: '50%', date: { pickerAppearance: 'dayOnly', displayFormat: 'd MMMM yyyy' } } }, { ...sana('to', 'Tugaş'), admin: { width: '50%', date: { pickerAppearance: 'dayOnly', displayFormat: 'd MMMM yyyy' } } })],
    },
    ...manba(),
    rasm('img', 'Ötgan tanlovdan surat'),
    manzilNomi('t'),
  ],
}

/* ---------- Imtiyozlar ---------- */
export const IMTIYOZ_IKONKA = ['uy', 'kontrakt', 'til', 'avto', 'kurs', 'yotoq', 'magistr', 'kitob', 'bank', 'sertifikat', 'avtobus', 'sovga', 'nota', 'vaucher', 'yulduz', 'qalqon']

export const Benefits: CollectionConfig = {
  ...(base('benefits', 'Imtiyoz', 'Imtiyozlar', '/faoliyat/imtiyozlar', 'Saytdagi “Imtiyozlar” sahifasi: talabalar, öquvçilar va yoşlar uçun imtiyozlar.', ['t', 'cat']) as CollectionConfig),
  fields: [
    matn('t', 'Imtiyoz nomi', { majburiy: true }),
    qator(
      tanlov('cat', 'Kimlar uçun (toifa)', [
        { label: 'Talabalar', value: 'talaba' },
        { label: 'Öquvçilar', value: 'oquvchi' },
        { label: 'Yoşlar va yoş oilalar', value: 'yosh' },
      ], { majburiy: true, kenglik: '50%' }),
      tanlov('icon', 'Ikonka', IMTIYOZ_IKONKA.map((v) => ({ label: v, value: v })), { majburiy: true, kenglik: '50%' }),
    ),
    {
      name: 'badge',
      label: 'Kartadagi asosiy maʼlumot',
      type: 'group',
      fields: [qator(summaliMatn('l', 'Sarlavha'), summaliMatn('v', 'Qiymat'))],
    },
    uzunMatn('who', 'Kimlar uçun', { majburiy: true, qator: 2 }),
    summaliMatn('amount', 'Miqdori', { majburiy: true }),
    uzunMatn('how', 'Qanday olinadi', { majburiy: true, qator: 3 }),
    uzunMatn('basis', 'Huquqiy asos', { majburiy: true, qator: 2 }),
    matn('from', 'Qaçondan amal qiladi'),
    ...manba(),
    manzilNomi('t'),
  ],
}

/* ---------- Davlat mukofotlari ---------- */
export const Awards: CollectionConfig = {
  ...(base('awards', 'Davlat mukofoti', 'Davlat mukofotlari', '/faoliyat/davlat-mukofotlari', 'Saytdagi “Yoşlar uçun davlat mukofotlari” sahifasi va Ittifoq sahifasidagi mukofotlar bloki.', ['t', 'when']) as CollectionConfig),
  fields: [
    matn('t', 'Mukofot nomi', { majburiy: true }),
    uzunMatn('basis', 'Huquqiy asos', { majburiy: true, qator: 2 }),
    rasm('img', 'Medal yoki nişon tasviri (fonsiz PNG)'),
    {
      name: 'prize',
      label: 'Pul mukofoti',
      type: 'group',
      fields: [
        qator(
          tanlov('base', 'Asos', [{ label: 'BHM', value: 'bhm' }, { label: 'Bazaviy stipendiya', value: 'stip' }], { majburiy: true, kenglik: '50%', sukut: 'bhm' }),
          { ...son('k', 'Neça barobar', { majburiy: true, kenglik: '50%' }), admin: { width: '50%', step: 0.5 } },
        ),
      ],
    },
    uzunMatn('who', 'Kimlar uçun', { majburiy: true, qator: 2 }),
    uzunMatn('perks', 'Mukofot va imtiyozlar', { majburiy: true, qator: 2 }),
    uzunMatn('how', 'Topşiriş tartibi', { majburiy: true, qator: 3 }),
    matn('count', 'Yillik mukofotlar soni', { majburiy: true }),
    uzunMatn('short', 'Qisqa tavsif (Ittifoq sahifasi uçun)', { majburiy: true, qator: 2 }),
    qator(matn('fact1', '1-fakt', { majburiy: true, kenglik: '50%' }), matn('fact2', '2-fakt', { majburiy: true, kenglik: '50%' })),
    matn('when', 'Qaçon topşiriladi', { majburiy: true, namuna: '30-iyun — Yoşlar kuni arafasida' }),
    {
      name: 'timeline',
      label: 'Yillik jadval (oylar böyiça)',
      type: 'array',
      labels: { singular: 'Bosqiç', plural: 'Bosqiçlar' },
      admin: { description: 'Oy raqamlari 1–12. “Topşiriş” belgilansa, jadvalda alohida rangda çiqadi.' },
      fields: [
        qator(
          son('from', 'Boşlaniş oyi', { majburiy: true, kenglik: '20%', min: 1 }),
          son('to', 'Tugaş oyi', { majburiy: true, kenglik: '20%', min: 1 }),
          matn('t', 'Bosqiç nomi', { majburiy: true, kenglik: '45%' }),
          { name: 'end', label: 'Topşiriş', type: 'checkbox', admin: { width: '15%' } },
        ),
      ],
    },
    ...manba(),
    qator(matn('extraT', 'Qöşimça havola nomi', { kenglik: '40%' }), { ...havola('extraUrl', 'Qöşimça havola'), admin: { width: '60%', placeholder: 'https://' } }),
    manzilNomi('t'),
  ],
}

/* ---------- Volontyorlik yönalişlari ---------- */
export const VOL_IKONKA = ['qol', 'yurak', 'barg', 'gumbaz', 'bayroq', 'qalqon', 'kitob', 'ekran']

export const VolDirections: CollectionConfig = {
  ...(base('vol-directions', 'Volontyorlik yönaliş', 'Volontyorlik yönalişlari', '/faoliyat/volontyorlik', 'Saytdagi “Volontyorlik” sahifasidagi yönalişlar, test va ariza şaklidagi tanlovlar.', ['t', 'age']) as CollectionConfig),
  fields: [
    matn('t', 'Yönaliş nomi', { majburiy: true }),
    qator(
      tanlov('icon', 'Ikonka', VOL_IKONKA.map((v) => ({ label: v, value: v })), { majburiy: true, kenglik: '50%' }),
      tanlov('age', 'Eng kam yoş', [{ label: '16 yoş', value: '16' }, { label: '18 yoş (Qonun, 12-modda)', value: '18' }], { majburiy: true, kenglik: '50%', sukut: '16' }),
    ),
    uzunMatn('text', 'Tavsif', { majburiy: true, qator: 3 }),
    bandlar('tasks', 'Volontyor vazifalari', { band: 'Vazifa' }),
    matn('example', 'Kengaş tajribasidan namuna'),
    manzilNomi('t'),
  ],
}
