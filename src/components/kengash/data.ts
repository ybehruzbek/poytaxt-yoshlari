/**
 * “Markaziy Kengaş” sahifasi mazmuni.
 * Manba: Özbekiston yoşlar ittifoqining Ustavi (V bob, 5.1–5.7-bandlar). Keyinçalik admin paneldan boşqariladi.
 */

export const ABOUT = {
  lead: 'Markaziy Kengash — Qurultoylar oralig‘ida Ittifoqning rahbar organi.',
  paras: [
    'Kengash Qurultoy tomonidan 5 yil muddatga, kamida 61 kishidan iborat tarkibda saylanadi. Uning tarkibida Qoraqalpog‘iston Respublikasi, viloyatlar va Toshkent shahridan kamida ikki nafardan yoshlar vakili bo‘ladi.',
    'Kengash yig‘ilishi har olti oyda kamida bir marta chaqiriladi. A’zolarning uchdan ikki qismi qatnashganda yig‘ilish qaror qabul qilishga vakolatli, qarorlar esa a’zolarning ko‘pchiligi ovozi bilan qabul qilinadi.',
  ],
}

export type Stat = { v: string; l: string }

export const STATS: Stat[] = [
  { v: '61+', l: 'a’zo — Kengashning eng kam tarkibi' },
  { v: '5 yil', l: 'Kengash saylanadigan muddat' },
  { v: '6 oy', l: 'yig‘ilishlar orasidagi eng uzoq muddat' },
  { v: '14', l: 'hududning har biridan kamida 2 nafar vakil' },
]

export type Organ = { t: string; d: string; meta?: string }

/** Ittifoq rahbar organlari (Ustav, 5.1) */
export const ORGANS: Organ[] = [
  { t: 'Qurultoy', d: 'Ittifoqning oliy rahbar organi. Ustavni tasdiqlaydi, Markaziy Kengash va Markaziy nazorat-taftish komissiyasi tarkibini, ularning raislarini saylaydi.', meta: 'Hisobot Qurultoyi — yilda kamida bir marta' },
  { t: 'Markaziy Kengash', d: 'Qurultoylar oralig‘ida Ittifoqqa rahbarlik qiladi, Qurultoy qarorlari va dasturiy vazifalar ijrosini ta’minlaydi.', meta: '5 yilga, kamida 61 kishi' },
  { t: 'Ijroiya qo‘mitasi', d: 'Markaziy Kengash a’zolari orasidan saylanadi va tashkiliy masalalar bo‘yicha tezkor qarorlar qabul qiladi.', meta: '5 yilga, kamida 15 kishi' },
  { t: 'Markaziy nazorat-taftish komissiyasi', d: 'Ittifoq va uning tuzilmalari moliyaviy-xo‘jalik faoliyatini va Ustavga rioya qilinishini nazorat qiladi.', meta: '5 yilga, kamida 11 kishi' },
]

/** Markaziy Kengaşning vakolatlari (Ustav, 5.5.2 — qisqa va oddiy tilda) */
export const POWERS: string[] = [
  'Qurultoy qarorlari, dasturiy maqsad va vazifalar ijrosini, Ustav talablariga rioya etilishini ta’minlaydi',
  'Ittifoq nomidan yuridik shaxsning huquq va majburiyatlarini amalga oshiradi',
  'Ijroiya qo‘mitasi tarkibini saylaydi',
  'Rais va o‘rinbosarlarining yarim yillik va yillik hisobotlarini tinglaydi, ular o‘rtasida ish yo‘nalishlarini taqsimlaydi',
  'Ustuvor yo‘nalishlar bo‘yicha komissiya va ishchi guruhlar tuzadi',
  'Yillik ish rejasini tasdiqlaydi va uning bajarilishi haqidagi hisobotni tinglaydi',
  'Ittifoqning umumlashtirilgan byudjetini tasdiqlaydi va ijrosini nazorat qiladi',
  'Ittifoq tuzilmalari, korxonalari va ommaviy axborot vositalarining tashkiliy tuzilmasini tasdiqlaydi',
  'Ittifoqning ichki me’yoriy hujjatlarini tasdiqlaydi',
  'Zarur hollarda navbatdagi Qurultoygacha rais va o‘rinbosarlarni saylaydi',
]

/** Kengaş tarkibi (Ustav, 5.5.1) */
export const MEMBERS = {
  lead: 'Kengash tarkibi turli sohalarda band bo‘lgan yoshlarning turli toifalari hisobidan shakllantiriladi.',
  byPost: [
    'Markaziy Kengash raisi va uning o‘rinbosarlari',
    'Markaziy Kengash apparatining moliya-iqtisod va tashkiliy-kadrlar bo‘limlari mudirlari',
    'Yoshlar muammolarini o‘rganish va istiqbolli kadrlarni tayyorlash instituti direktori',
    'Ittifoq muassisligidagi markaziy gazetalar bosh muharriri va “Yoshlar” teleradiokanali direktori',
    'Qoraqalpog‘iston Respublikasi, viloyatlar va Toshkent shahar hududiy kengashlari raislari',
  ],
  fields: ['Ta’lim', 'Fan', 'Madaniyat va san’at', 'Ommaviy axborot vositalari', 'Ishlab chiqarish va xizmat', 'Tadbirkorlik va fermerlik', 'Sport', 'Sog‘liqni saqlash', 'Ekologiya', 'Qurolli kuchlar', 'Huquq-tartibot organlari'],
  link: 'Toshkent shahar hududiy Kengashining raisi lavozimi bo‘yicha Markaziy Kengash tarkibiga kiradi.',
  /** Ustav, 5.5.1-band, 2-xatboşi */
  extra: 'Markaziy Kengash tarkibiga Ittifoqning hamkor tashkilotlari vakillari hamda katta tajribaga ega bo‘lgan shaxslar ham kiritilishi mumkin.',
  /** Ustav, 5.5-band va 5.5.1-band, 3-xatboşi */
  facts: ['Kamida 61 nafar a’zo', '5 yil muddatga saylanadi', 'Har bir hududdan kamida 2 nafar yoshlar vakili'],
}

/* Rahbariyat: rais — Ittifoqning rasmiy sahifasi (yoshlarittifoqi.uz/uz/manage, 2024) va ochiq manbalar */
export type Leader = {
  name: string
  role: string
  img?: string
  /** töliq ism-şarif */
  full?: string
  born?: string
  edu?: string[]
  career?: { y: string; t: string }[]
}

export const LEADERS: Leader[] = [
  {
    name: 'Xayrulla Sattarov',
    full: 'Sattarov Xayrulla Fayzullayevich',
    role: 'O‘zbekiston yoshlar ittifoqi Markaziy Kengashi raisi',
    img: '/img/kengash/sattarov.jpg',
    born: '1977-yil 21-noyabrda Navoiy shahrida tug‘ilgan. Iqtisodchi.',
    edu: [
      'Navoiy davlat pedagogika instituti (2002)',
      'Toshkent moliya instituti (2006)',
      'Vazirlar Mahkamasi huzuridagi Biznes va tadbirkorlik oliy maktabi (2023)',
    ],
    career: [
      { y: '2004', t: '“Tadbirkor” aksiyadorlik tijorat bankida mehnat faoliyatini boshlagan, keyinchalik tijorat banklarida turli lavozimlarda ishlagan.' },
      { y: '2017', t: '“Mikrokreditbank” investitsiya loyihalarini moliyalashtirish departamenti boshlig‘i.' },
      { y: '2017–2018', t: '“Xalq banki” g‘aznachilik departamenti boshlig‘i.' },
      { y: '2019', t: '“Yoshlar kelajagimiz” jamg‘armasi direktori. Yoshlarni tadbirkorlikka jalb etish uchun “Biznes marafon” loyihasini yo‘lga qo‘ygan.' },
      { y: '2020', t: 'O‘zbekiston Savdo-sanoat palatasi Rayosati tarkibiga kiritilgan.' },
      { y: '2024', t: 'O‘zbekiston yoshlar ittifoqi Markaziy Kengashi raisi.' },
    ],
  },
]

/** Ijroiya qömitasi va nazorat-taftiş komissiyasi (Ustav, 5.6–5.7) */
export const BODIES = [
  {
    t: 'Ijroiya qo‘mitasi',
    meta: 'Kamida 15 kishi · 5 yil',
    d: 'Markaziy Kengash o‘z a’zolari orasidan saylaydi. Yig‘ilishlarini Markaziy Kengash raisi chaqiradi va olib boradi.',
    items: [
      'Hududiy bo‘linmalar, korxonalar va OAV faoliyatini muvofiqlashtiradi',
      'Loyihalar, grant va tanlovlar bo‘yicha qarorlar qabul qiladi',
      'Xalqaro tashkilotlar bilan hamkorlik va delegatsiyalar masalalarini hal qiladi',
      'Hududiy kengashlar byudjetlarini ko‘rib chiqadi',
    ],
  },
  {
    t: 'Markaziy nazorat-taftish komissiyasi',
    meta: 'Kamida 11 kishi · 5 yil',
    d: 'Qurultoy saylaydi va unga hisobot beradi. A’zolari rahbar organlar yig‘ilishlarida maslahat ovozi bilan qatnashadi.',
    items: [
      'Byudjet ijrosi va moliyaviy-xo‘jalik faoliyatini tekshiradi',
      'Ustav qoidalariga rioya qilinishini nazorat qiladi',
      'Ittifoq a’zolarining murojaatlarini ko‘rib chiqadi',
      'Aniqlangan kamchiliklarni bartaraf etish bo‘yicha takliflar kiritadi',
    ],
  },
]

export const CONTACT = {
  address: 'Toshkent shahri, Alisher Navoiy ko‘chasi, 11-uy',
  map: 'https://yandex.uz/maps/?text=Toshkent%2C%20Alisher%20Navoiy%20ko%27chasi%2C%2011',
}

export const IMG = {
  building: '/img/kengash/bino.jpg',
  forum2026: '/img/kengash/forum-2026.jpg',
  forum2024: '/img/kengash/forum-2024.jpg',
  election: '/img/kengash/saylov-2025.jpg',
  delegates: '/img/kengash/delegatlar.jpg',
}

export type KgEvent = { date: string; t: string; d: string; img: string; href: string }

/** Kengaş iştirokidagi soʼnggi tadbirlar (UzA xabarlari; suratlar: UzA) */
export const EVENTS: KgEvent[] = [
  {
    date: '12.10.2026',
    t: 'Oliy ta’lim yoshlar yetakchilari forumi — 2026',
    d: 'Ikki kunlik forumda Ittifoq loyihalari taqdim etildi: “IELTS Marafon”, “Suvni birgalikda asraymiz”, “Yo‘lovchi”, “Kitob-top”.',
    img: '/img/kengash/forum-2026.jpg',
    href: 'https://uza.uz/oz/posts/mRVoF0b1l4YssnBCB19nRc62BAGFaZ4n',
  },
  {
    date: '27.10.2025',
    t: 'Boshlang‘ich tashkilotda hisobot-saylov yig‘ilishi',
    d: 'Guliston davlat universitetidagi boshlang‘ich tashkilot yetakchisi hisobot berdi va qayta saylandi; yig‘ilishda Markaziy Kengash raisi ishtirok etdi.',
    img: '/img/kengash/saylov-2025.jpg',
    href: 'https://uza.uz/oz/posts/yoshlar-ittifoqi-yetakchisi-hisobot-berdi-va-qayta-saylandi_776143',
  },
  {
    date: '23.12.2024',
    t: 'Yoshlar yetakchilari forumi',
    d: 'Oliy ta’lim tashkilotlaridagi boshlang‘ich tashkilotlarning faol yetakchilari taqdirlandi.',
    img: '/img/kengash/forum-2024.jpg',
    href: 'https://uza.uz/oz/posts/faol-yoshlar-yetakchilari-taqdirlandi_671313',
  },
]
