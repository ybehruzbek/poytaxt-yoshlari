/**
 * “Boğlaniş” bölimi (Aloqa maʼlumotlari, Manzil va xarita, Elektron murojaat) uçun maʼlumotlar.
 * Qabul jadvali va poçta — hududiy Kengaş maʼlumotlaridan (components/hududiy/data.ts).
 * Keyinçalik admin paneldan boşqariladi.
 */
import { CONTACT, RECEPTION } from '@/components/hududiy/data'

export const ORG = 'Özbekiston yoşlar ittifoqi Toşkent şahar hududiy Kengaşi'

export const ADDRESS = {
  /** rasmiy manzil */
  full: 'Özbekiston Respublikasi, Toşkent şahri, Olmazor tumani, Universitet köçasi, 4-uy',
  line: 'Toşkent şahri, Olmazor tumani, Universitet köçasi, 4-uy',
  landmark: 'Toşkent şahar Yoşlar markazi binosi',
  /** jamoat transporti: Yandex Xaritalar maʼlumotiga köra eng yaqin bekat — 760 m */
  metro: { station: '“Beruniy” metro bekati', walk: '760 metr, piyoda taxminan 10 daqiqa' },
}

/**
 * Aniq nuqta — Kengaş joylaşgan bino (Toşkent şahar Yoşlar markazi; Yandex xaritasida
 * “Дворец культуры НУУз” deb belgilangan bino). Yandex'da Universitet köçasi, 4 manzili
 * (41.350803, 69.204755) universitetning asosiy binosiga tuşadi, bino undan ~120 m şimolda.
 * Matn böyiça qidiruv notöğri nuqtaga olib borgani uçun koordinata işlatiladi.
 */
const LAT = 41.35214
const LON = 69.20496
export const MAPS = {
  /** xaritani sahifaga joylaş (iframe) */
  yandexEmbed: `https://yandex.uz/map-widget/v1/?ll=${LON}%2C${LAT}&z=17&pt=${LON},${LAT},pm2rdl`,
  googleEmbed: `https://www.google.com/maps?q=${LAT},${LON}&z=17&output=embed`,
  /** yangi oynada oçiş */
  yandex: `https://yandex.uz/maps/?ll=${LON}%2C${LAT}&z=18&pt=${LON},${LAT},pm2rdl`,
  google: `https://www.google.com/maps/search/?api=1&query=${LAT},${LON}`,
}

export const PHONES = [
  { v: '+998 71 246-10-80', href: 'tel:+998712461080' },
  { v: '+998 71 246-10-90', href: 'tel:+998712461090' },
]
export const EMAIL = CONTACT.email
export const HOURS = {
  days: 'Duşanba — juma',
  time: '09:00 — 18:00',
  off: 'Şanba, yakşanba — dam oliş kunlari',
}
export const SOCIALS = CONTACT.socials

/** Fuqarolar qabuli: kun, rahbar, bölim, xona (hududiy Kengaş jadvali) */
export const RECEPTIONS = RECEPTION.map((r) => ({
  day: r.day,
  time: r.time.replace(/\s*—\s*/, '–'),
  room: `${Number(r.room)}-xona`,
  name: r.name,
  dept: r.dept,
}))

/** “Sizga nima kerak?” — mavzu böyiça yönaltiriş */
export const TOPICS = [
  {
    t: 'Savol yoki murojaat',
    d: 'Yoşlarga oid masala, ariza yoki şikoyat böyiça — onlayn murojaat qoldiring, masʼul xodim javob beradi.',
    go: 'Murojaat yuboriş',
    href: '/boglanish/murojaat',
  },
  {
    t: 'Ittifoqqa aʼzo böliş',
    d: 'Aʼzolik şartlari va tartibi bilan tanişing, ariza qoldiring — boşlanğiç taşkilotingiz bilan boğlaymiz.',
    go: 'Aʼzolik arizasi',
    href: '/boglanish/murojaat?mavzu=azo',
  },
  {
    t: 'Rahbariyat qabuli',
    d: 'Kengaş raisi va bölim boşliqlari haftaning belgilangan kunlarida fuqarolarni şaxsan qabul qiladi.',
    go: 'Qabul jadvali',
    href: '#qabul',
  },
  {
    t: 'Hamkorlik va OAV',
    d: 'Hamkorlik takliflari, intervyu va axborot sörovlari uçun poçta orqali yozing.',
    go: 'Poçtaga yoziş',
    href: `mailto:${CONTACT.email}`,
  },
]

/**
 * “Jismoniy va yuridik şaxslarning murojaatlari töğrisida”gi Qonun (ÖRQ-445, 11.09.2017):
 * 3- va 5-moddalar (murojaat turlari), 28-modda (körib çiqiş muddatlari). Manba: lex.uz
 */
export const LAW = {
  title: '“Jismoniy va yuridik şaxslarning murojaatlari töğrisida”gi Qonun',
  href: 'https://lex.uz/uz/docs/-3336169',
  terms: [
    { v: '15 kun', t: 'ariza va şikoyatlar kelib tuşgan kundan boşlab körib çiqiladi' },
    { v: '1 oy', t: 'qöşimça örganiş talab qilinsa, şuningdek takliflar uçun' },
  ],
  types: [
    { t: 'Ariza', d: 'Huquq, erkinlik va qonuniy manfaatlarni amalga oşirişda kömak söraş.' },
    { t: 'Taklif', d: 'Davlat va jamiyat faoliyatini takomillaştiriş böyiça tavsiyalar.' },
    {
      t: 'Şikoyat',
      d: 'Buzilgan huquq va erkinliklarni tiklaş, qonuniy manfaatlarni himoya qiliş talabi.',
    },
  ],
}
