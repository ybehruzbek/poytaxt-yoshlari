import type { Field, GlobalConfig } from 'payload'

import { sahifa } from '@/admin/access'
import { G } from '@/admin/groups'
import { bandlar, havola, kod, matn, qator, rasm, uzunMatn } from '@/fields'
import { saytManzil, yangilashGlobal } from '@/lib/revalidate'

/**
 * Yagona sahifalar (globals): Markaziy Kengaş. Har bir blok sahifadagi bölim bilan bir xil nomlangan.
 */

const royxat = (name: string, label: string, fields: Field[], sing = 'Band'): Field => ({
  name,
  label,
  type: 'array',
  labels: { singular: sing, plural: label },
  fields,
})

export const MarkaziyKengash: GlobalConfig = {
  slug: 'markaziy-kengash',
  label: 'Markaziy Kengaş sahifasi',
  admin: {
    group: G.biz,
    description: 'Saytdagi “Markaziy Kengaş” sahifasi. Matnlar Ittifoq Ustavining V bobi asosida.',
    preview: (_d, { locale }) => saytManzil('/biz-haqimizda/markaziy-kengash', locale),
  },
  access: sahifa,
  versions: { max: 30 },
  hooks: yangilashGlobal(['/biz-haqimizda/markaziy-kengash']),
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Kengaş haqida',
          fields: [
            {
              name: 'about',
              label: 'Kiriş matni',
              type: 'group',
              fields: [uzunMatn('lead', 'Asosiy jumla', { majburiy: true, qator: 2 }), bandlar('paras', 'Xatboşilar', { band: 'Xatboşi' })],
            },
            royxat('stats', 'Raqamlar', [qator(matn('v', 'Raqam', { majburiy: true, kenglik: '30%', namuna: '61+' }), matn('l', 'Izoh', { majburiy: true, kenglik: '70%' }))], 'Raqam'),
            royxat('organs', 'Rahbar organlar', [matn('t', 'Nomi', { majburiy: true }), uzunMatn('d', 'Tavsif', { majburiy: true, qator: 2 }), matn('meta', 'Qisqa maʼlumot')], 'Organ'),
            {
              ...bandlar('powers', 'Vakolatlar', { band: 'Vakolat' }),
              admin: { description: 'Tartibi muhim: sahifada vakolatlar mavzu guruhlariga şu tartib böyiça ajratiladi (1–4, 5–7, 8–10).' },
            },
          ],
        },
        {
          label: 'Tarkibi',
          fields: [
            {
              name: 'members',
              label: 'Kengaş tarkibi',
              type: 'group',
              fields: [
                uzunMatn('lead', 'Kiriş jumlasi', { majburiy: true, qator: 2 }),
                bandlar('facts', 'Asosiy talablar', { band: 'Talab' }),
                bandlar('byPost', 'Lavozimi böyiça aʼzolar', { band: 'Lavozim' }),
                bandlar('fields', 'Soha vakillari', { band: 'Soha' }),
                uzunMatn('link', 'Toşkent şahar Kengaşi raisining örni', { qator: 2 }),
                uzunMatn('extra', 'Qöşimça', { qator: 2 }),
              ],
            },
          ],
        },
        {
          label: 'Rahbariyat',
          fields: [
            royxat(
              'leaders',
              'Rahbarlar',
              [
                qator(matn('name', 'Qisqa ismi', { majburiy: true, kenglik: '50%' }), matn('full', 'Töliq ism-şarifi', { kenglik: '50%' })),
                matn('role', 'Lavozimi', { majburiy: true }),
                rasm('img', 'Surat'),
                uzunMatn('born', 'Tuğilgan sana va joy', { qator: 2 }),
                bandlar('edu', 'Maʼlumoti', { band: 'Taʼlim muassasasi' }),
                royxat('career', 'Mehnat faoliyati', [qator(matn('y', 'Yil', { majburiy: true, kenglik: '20%' }), uzunMatn('t', 'Lavozim', { majburiy: true, qator: 2, kenglik: '80%' }))], 'Bosqiç'),
              ],
              'Rahbar',
            ),
            royxat(
              'bodies',
              'Ijroiya qömitasi va nazorat-taftiş komissiyasi',
              [matn('t', 'Nomi', { majburiy: true }), matn('meta', 'Tarkibi va muddati'), uzunMatn('d', 'Tavsif', { qator: 2 }), bandlar('items', 'Vakolatlari', { band: 'Vakolat' })],
              'Organ',
            ),
          ],
        },
        {
          label: 'Tadbirlar va rasmlar',
          fields: [
            royxat(
              'events',
              'Kengaş iştirokidagi tadbirlar',
              [qator(kod('date', 'Sana', { majburiy: true, kenglik: '30%', namuna: '12.10.2026' }), matn('t', 'Nomi', { majburiy: true, kenglik: '70%' })), uzunMatn('d', 'Qisqa mazmuni', { qator: 2 }), rasm('img', 'Surat', { majburiy: true }), havola('href', 'Manba havolasi')],
              'Tadbir',
            ),
            {
              name: 'images',
              label: 'Sahifa rasmlari',
              type: 'group',
              fields: [qator(rasm('building', 'Kengaş binosi'), rasm('delegates', 'Delegatlar'))],
            },
            {
              name: 'contact',
              label: 'Manzil',
              type: 'group',
              fields: [matn('address', 'Manzil', { majburiy: true }), havola('map', 'Xaritadagi havola')],
            },
          ],
        },
      ],
    },
  ],
}

/** Tuzilma organi: nom, tavsif, qisqa maʼlumotlar */
const organ = (name: string, label: string): Field => ({
  name,
  label,
  type: 'group',
  fields: [matn('t', 'Nomi', { majburiy: true }), uzunMatn('d', 'Tavsif', { majburiy: true, qator: 2 }), bandlar('meta', 'Qisqa maʼlumotlar', { band: 'Maʼlumot' })],
})

/** “Özbekiston yoşlar ittifoqi” sahifasi */
export const IttifoqSahifa: GlobalConfig = {
  slug: 'ittifoq-sahifa',
  label: 'Ittifoq haqida sahifasi',
  admin: {
    group: G.biz,
    description: 'Saytdagi “Özbekiston yoşlar ittifoqi” sahifasi. Har bir tab sahifadagi bölimlarga mos.',
    preview: (_d, { locale }) => saytManzil('/biz-haqimizda/ittifoq', locale),
  },
  access: sahifa,
  versions: { max: 30 },
  hooks: yangilashGlobal(['/biz-haqimizda/ittifoq', '/']),
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Asosiy',
          fields: [
            { name: 'who', label: 'Ittifoq haqida', type: 'group', fields: [bandlar('paras', 'Xatboşilar', { band: 'Xatboşi' }), matn('motto', 'Şior')] },
            { name: 'mission', label: 'Maqsadimiz', type: 'group', fields: [uzunMatn('text', 'Maqsad (bitta jumla)', { majburiy: true, qator: 3 })] },
            { name: 'quote', label: 'Iqtibos', type: 'group', fields: [uzunMatn('text', 'Matn', { qator: 3 }), qator(matn('author', 'Muallif', { kenglik: '50%' }), matn('role', 'Lavozimi', { kenglik: '50%' }))] },
            royxat('stats', 'Asosiy raqamlar', [qator(matn('v', 'Raqam', { majburiy: true, kenglik: '30%' }), matn('l', 'Izoh', { majburiy: true, kenglik: '70%' }))], 'Raqam'),
            royxat('moreStats', 'Qöşimça raqamlar', [qator(matn('v', 'Raqam', { majburiy: true, kenglik: '30%' }), matn('l', 'Izoh', { majburiy: true, kenglik: '70%' }))], 'Raqam'),
            royxat('history', 'Qisqa tarix', [qator(matn('y', 'Yil', { majburiy: true, kenglik: '20%' }), matn('d', 'Kun va oy', { kenglik: '20%', namuna: '30-iyun' }), uzunMatn('t', 'Voqea', { majburiy: true, qator: 2, kenglik: '60%' }))], 'Voqea'),
          ],
        },
        {
          label: 'Imtiyozlar',
          fields: [
            royxat(
              'privileges',
              'Mukofot va imtiyozlar',
              [
                qator(
                  { name: 'group', label: 'Guruh', type: 'select', required: true, options: [{ label: 'Ittifoq imtiyozi', value: 'ittifoq' }, { label: 'Davlat mukofoti', value: 'davlat' }], admin: { width: '30%' } },
                  matn('t', 'Nomi', { majburiy: true, kenglik: '70%' }),
                ),
                uzunMatn('text', 'Tavsif', { majburiy: true, qator: 3 }),
                qator(matn('fact', 'Fakt', { kenglik: '40%' }), matn('num', 'Asosiy raqam', { kenglik: '25%' }), matn('numL', 'Raqam izohi', { kenglik: '35%' })),
                qator(rasm('img', 'Surat'), rasm('medal', 'Medal tasviri (davlat mukofoti)')),
                { name: 'badge', label: 'Nişon (surat kvadrat ramkada)', type: 'checkbox' },
              ],
              'Imtiyoz',
            ),
          ],
        },
        {
          label: 'Xalqaro hamkorlik',
          fields: [
            {
              name: 'intl',
              label: 'Xalqaro hamkorlik',
              type: 'group',
              fields: [
                uzunMatn('text', 'Kiriş matni', { qator: 2 }),
                uzunMatn('assoc', 'Assotsiatsiya haqida', { qator: 2 }),
                royxat('facts', 'Raqamlar', [qator(matn('v', 'Raqam', { kenglik: '30%' }), matn('l', 'Izoh', { kenglik: '70%' }))], 'Raqam'),
                bandlar('forms', 'Hamkorlik şakllari', { band: 'Şakl' }),
                bandlar('projects', 'Xalqaro loyihalar', { band: 'Loyiha' }),
                qator(rasm('partners', 'Hamkorlar rasmi'), rasm('flags', 'Bayroqlar rasmi')),
              ],
            },
          ],
        },
        {
          label: 'Yoşlar markazlari',
          fields: [
            {
              name: 'palace',
              label: 'Yoşlar ijod saroyi',
              type: 'group',
              fields: [qator(matn('name', 'Nomi', { kenglik: '50%' }), matn('org', 'Taşkilot', { kenglik: '50%' })), uzunMatn('text', 'Tavsif', { qator: 2 }), bandlar('features', 'Imkoniyatlar', { band: 'Imkoniyat' }), rasm('img', 'Asosiy surat'), { name: 'gallery', label: 'Qöşimça suratlar', type: 'upload', relationTo: 'media', hasMany: true }],
            },
            {
              name: 'cityCentre',
              label: 'Toşkent şahar Yoşlar markazi',
              type: 'group',
              fields: [matn('name', 'Nomi'), uzunMatn('text', 'Tavsif', { qator: 2 }), bandlar('facts', 'Imkoniyatlar', { band: 'Imkoniyat' }), rasm('img', 'Surat')],
            },
            royxat('centres', 'Hududlardagi markazlar', [qator(matn('region', 'Hudud', { majburiy: true, kenglik: '50%' }), rasm('img', 'Surat'))], 'Markaz'),
          ],
        },
        {
          label: 'Tuzilma',
          fields: [
            {
              name: 'structure',
              label: 'Taşkiliy tuzilma (Ustav, V–VI boblar)',
              type: 'group',
              fields: [
                organ('qurultoy', 'Qurultoy'),
                organ('council', 'Markaziy Kengaş'),
                organ('chair', 'Markaziy Kengaş raisi'),
                organ('exec', 'Ijroiya qömitasi'),
                organ('audit', 'Nazorat-taftiş komissiyasi'),
                royxat('levels', 'Tuzilma darajalari', [matn('t', 'Nomi', { majburiy: true }), uzunMatn('d', 'Tavsif', { qator: 2 }), bandlar('meta', 'Qisqa maʼlumotlar', { band: 'Maʼlumot' })], 'Daraja'),
                bandlar('principles', 'Faoliyat tamoyillari', { band: 'Tamoyil' }),
              ],
            },
            {
              name: 'official',
              label: 'Rasmiy maʼlumotlar',
              type: 'array',
              labels: { singular: 'Qator', plural: 'Rasmiy maʼlumotlar' },
              fields: [qator(matn('k', 'Nomi', { majburiy: true, kenglik: '40%' }), matn('v', 'Qiymati', { majburiy: true, kenglik: '60%' }))],
            },
            {
              name: 'priorities',
              label: 'Ustuvor yönalişlar (PF-5106)',
              type: 'array',
              labels: { singular: 'Yönaliş', plural: 'Ustuvor yönalişlar' },
              fields: [matn('title', 'Qisqa nomi', { majburiy: true }), uzunMatn('item', 'Töliq matni', { majburiy: true, qator: 2 })],
            },
          ],
        },
        {
          label: 'Aʼzolik',
          fields: [
            {
              name: 'join',
              label: 'Aʼzolik (Ustav, IV bob)',
              type: 'group',
              fields: [
                royxat('steps', 'Qabul qiliş tartibi', [qator(kod('band', 'Ustav bandi', { kenglik: '20%', namuna: '4.2' }), matn('t', 'Bosqiç', { majburiy: true, kenglik: '80%' })), uzunMatn('d', 'Tavsif', { qator: 2 })], 'Bosqiç'),
                bandlar('rights', 'Aʼzolarning huquqlari', { band: 'Huquq' }),
                bandlar('duties', 'Aʼzolarning majburiyatlari', { band: 'Majburiyat' }),
                { name: 'legal', label: 'Yuridik şaxslar aʼzoligi', type: 'group', fields: [uzunMatn('d', 'Kimlar', { qator: 2 }), uzunMatn('how', 'Tartibi', { qator: 2 })] },
                uzunMatn('note', 'Izoh', { qator: 2 }),
                bandlar('ends', 'Aʼzolik bekor qilinişi', { band: 'Holat' }),
                { name: 'cta', label: 'Çaqiriq bloki', type: 'group', fields: [matn('t', 'Sarlavha'), uzunMatn('d', 'Matn', { qator: 2 })] },
              ],
            },
          ],
        },
        {
          label: 'Taşkilotlar',
          fields: [
            {
              name: 'orgs',
              label: 'Ittifoq tizimidagi taşkilotlar',
              type: 'group',
              fields: [
                uzunMatn('lead', 'Kiriş matni', { qator: 2 }),
                royxat(
                  'ngos',
                  'Nodavlat notijorat taşkilotlar',
                  [
                    qator(matn('t', 'Nomi', { majburiy: true, kenglik: '65%' }), { name: 'g', label: 'Soha', type: 'select', required: true, options: [{ label: 'Taʼlim va ilm-fan', value: 'talim' }, { label: 'Ijod va madaniyat', value: 'ijod' }, { label: 'Ijtimoiy himoya va huquq', value: 'ijtimoiy' }, { label: 'Tadbirkorlik va xalqaro aloqalar', value: 'iqtisod' }], admin: { width: '35%' } }),
                    uzunMatn('d', 'Faoliyati', { qator: 2 }),
                    rasm('logo', 'Logotip'),
                  ],
                  'Taşkilot',
                ),
                bandlar('companies', 'Tijorat taşkilotlari (nomlari)', { band: 'Nomi' }),
              ],
            },
            royxat(
              'companies',
              'Media, naşriyot va xizmat taşkilotlari',
              [
                qator(
                  { name: 'kind', label: 'Turi', type: 'select', required: true, options: [{ label: 'Media', value: 'Media' }, { label: 'Naşriyot', value: 'Naşriyot' }, { label: 'Xizmat', value: 'Xizmat' }], admin: { width: '25%' } },
                  matn('t', 'Nomi', { majburiy: true, kenglik: '55%' }),
                  kod('share', 'Ittifoq uluşi', { kenglik: '20%', namuna: '100%' }),
                ),
                uzunMatn('d', 'Faoliyati', { qator: 2 }),
                rasm('logo', 'Logotip'),
              ],
              'Taşkilot',
            ),
          ],
        },
        {
          label: 'Sahifa rasmlari',
          fields: [
            {
              name: 'img',
              label: 'Sahifa rasmlari',
              type: 'group',
              fields: [
                qator(rasm('team', 'Jamoa (Prezident bilan)'), rasm('collage', 'Hero kollaji')),
                qator(rasm('collageSm', 'Hero kollaji (kiçik)'), rasm('leaders', 'Yetakçilar')),
                qator(rasm('presYouth1', 'Iqtibos uçun 1-surat'), rasm('presYouth2', 'Iqtibos uçun 2-surat')),
                qator(rasm('seminar', 'Seminar'), rasm('girls', 'Kitobxon qizlar')),
                qator(rasm('readers', 'Kitobxonlar'), rasm('books', '“Kitoblar olami”')),
                rasm('volunteers', 'Volontyorlar'),
              ],
            },
          ],
        },
      ],
    },
  ],
}
