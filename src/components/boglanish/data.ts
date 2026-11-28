/**
 * “Boğlaniş” bölimi (Aloqa maʼlumotlari, Manzil va xarita, Elektron murojaat) uçun maʼlumotlar.
 * Qabul jadvali va poçta — hududiy Kengaş maʼlumotlaridan (components/hududiy/data.ts).
 * Keyinçalik admin paneldan boşqariladi.
 */
import { CONTACT, RECEPTION } from '@/components/hududiy/data'

export const ORG = 'O‘zbekiston yoshlar ittifoqi Toshkent shahar hududiy Kengashi'

export const ADDRESS = {
  /** rasmiy manzil */
  full: 'O‘zbekiston Respublikasi, Toshkent shahri, Olmazor tumani, Universitet ko‘chasi, 4-uy',
  line: 'Toshkent shahri, Olmazor tumani, Universitet ko‘chasi, 4-uy',
  /** ikki qatorga bölib körsatiş uçun: şahar va tuman / köça va uy */
  city: 'Toshkent shahri, Olmazor tumani',
  street: 'Universitet ko‘chasi, 4-uy',
  landmark: 'Toshkent shahar Yoshlar markazi binosi',
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
  { v: '+998 71 246-10-70', href: 'tel:+998712461070' },
  { v: '+998 71 246-10-80', href: 'tel:+998712461080' },
  { v: '+998 71 246-10-90', href: 'tel:+998712461090' },
]
export const EMAIL = CONTACT.email
/** Rasmiy poçta manzillari: Kengaş poçtasi va yoshkent.uz domenidagi poçta */
export const EMAILS = [CONTACT.email, 'info@yoshkent.uz']
export const HOURS = {
  days: 'Dushanba — juma',
  time: '09:00 — 18:00',
  off: 'Shanba, yakshanba — dam olish kunlari',
}
export const SOCIALS = CONTACT.socials

/** Lavozim: “Kengaş raisi” özgarmaydi, bölim nomiga “boşliği” qöşiladi */
const position = (dept: string) =>
  dept === 'Kengash raisi' ? dept : `${dept}${dept.endsWith('bo‘limi') ? '' : ' bo‘limi'} boshlig‘i`

/** Fuqarolar qabuli: kun, rahbar, lavozim, xona (hududiy Kengaş jadvali) */
export const RECEPTIONS = RECEPTION.map((r) => ({
  day: r.day,
  time: r.time.replace(/\s*—\s*/, '–'),
  room: `${Number(r.room)}-xona`,
  name: r.name,
  dept: position(r.dept),
}))

/**
 * “Jismoniy va yuridik şaxslarning murojaatlari töğrisida”gi Qonun (ÖRQ-445, 11.09.2017):
 * 3- va 5-moddalar (murojaat turlari), 28-modda (körib çiqiş muddatlari). Manba: lex.uz
 */
export const LAW = {
  title: '“Jismoniy va yuridik shaxslarning murojaatlari to‘g‘risida”gi Qonun',
  href: 'https://lex.uz/uz/docs/-3336169',
  terms: [
    { v: '15 kun', t: 'ičida ariza va shikoyatlar kelib tushgan kundan boshlab ko‘rib chiqiladi' },
    { v: '1 oygacha', t: 'qo‘shimcha tekshirish yoki hujjatlar talab etilsa, shuningdek takliflar ko‘rib chiqiladi' },
  ],
  types: [
    { t: 'Ariza', d: 'Huquq, erkinlik va qonuniy manfaatlarni amalga oshirishda ko‘mak so‘rash.' },
    { t: 'Taklif', d: 'Davlat va jamiyat faoliyatini takomillashtirish bo‘yicha tavsiyalar.' },
    {
      t: 'Shikoyat',
      d: 'Buzilgan huquq va erkinliklarni tiklash, qonuniy manfaatlarni himoya qilish talabi.',
    },
  ],
}
