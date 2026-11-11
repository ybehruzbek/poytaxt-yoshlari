/**
 * “Markaziy Kengaş” sahifasi mazmuni.
 * Manba: Özbekiston yoşlar ittifoqining Ustavi (V bob, 5.1–5.7-bandlar). Keyinçalik admin paneldan boşqariladi.
 */

export const INTRO =
  'Qurultoylar oraliğida Özbekiston yoşlar ittifoqiga rahbarlik qiluvçi organ. Kengaş Qurultoy qarorlari ijrosini taʼminlaydi, Ittifoqning asosiy yönalişlari, rejasi va byudjetini belgilaydi.'

export const ABOUT = {
  lead: 'Markaziy Kengaş — Qurultoylar oraliğida Ittifoqning rahbar organi.',
  paras: [
    'Kengaş Qurultoy tomonidan 5 yil muddatga, kamida 61 kişidan iborat tarkibda saylanadi. Uning tarkibida Qoraqalpoğiston Respublikasi, viloyatlar va Toşkent şahridan kamida ikki nafardan yoşlar vakili böladi.',
    'Kengaş yiğilişi har olti oyda kamida bir marta çaqiriladi. Aʼzolarning uçdan ikki qismi qatnaşganda yiğiliş qaror qabul qilişga vakolatli, qarorlar esa aʼzolarning köpçiligi ovozi bilan qabul qilinadi.',
  ],
}

export type Stat = { v: string; l: string }

export const STATS: Stat[] = [
  { v: '61+', l: 'aʼzo — Kengaşning eng kam tarkibi' },
  { v: '5 yil', l: 'Kengaş saylanadigan muddat' },
  { v: '6 oy', l: 'yiğilişlar orasidagi eng uzoq muddat' },
  { v: '14', l: 'hududning har biridan kamida 2 nafar vakil' },
]

export type Organ = { t: string; d: string; meta?: string }

/** Ittifoq rahbar organlari (Ustav, 5.1) */
export const ORGANS: Organ[] = [
  { t: 'Qurultoy', d: 'Ittifoqning oliy rahbar organi. Ustav va Dasturni tasdiqlaydi, Markaziy Kengaş, uning raisi va örinbosarlarini saylaydi.', meta: 'Yilda kamida bir marta' },
  { t: 'Markaziy Kengaş', d: 'Qurultoylar oraliğida Ittifoqqa rahbarlik qiladi, Qurultoy qarorlari va dasturiy vazifalar ijrosini taʼminlaydi.', meta: '5 yilga, kamida 61 kişi' },
  { t: 'Ijroiya qömitasi', d: 'Markaziy Kengaş aʼzolari orasidan saylanadi va taşkiliy masalalar böyiça tezkor qarorlar qabul qiladi.', meta: '5 yilga, kamida 15 kişi' },
  { t: 'Markaziy nazorat-taftiş komissiyasi', d: 'Ittifoq va uning tuzilmalari moliyaviy-xöjalik faoliyatini va Ustavga rioya qilinişini nazorat qiladi.', meta: '5 yilga, kamida 11 kişi' },
]

/** Markaziy Kengaşning vakolatlari (Ustav, 5.5.2 — qisqa va oddiy tilda) */
export const POWERS: string[] = [
  'Qurultoy qarorlari, dasturiy maqsad va vazifalar ijrosini, Ustav talablariga rioya etilişini taʼminlaydi',
  'Ittifoq nomidan yuridik şaxsning huquq va majburiyatlarini amalga oşiradi',
  'Ijroiya qömitasi tarkibini saylaydi',
  'Rais va örinbosarlarining yarim yillik va yillik hisobotlarini tinglaydi, ular örtasida iş yönalişlarini taqsimlaydi',
  'Ustuvor yönalişlar böyiça komissiya va işçi guruhlar tuzadi',
  'Yillik iş rejasini tasdiqlaydi va uning bajarilişi haqidagi hisobotni tinglaydi',
  'Ittifoqning umumlaştirilgan byudjetini tasdiqlaydi va ijrosini nazorat qiladi',
  'Ittifoq tuzilmalari, korxonalari va ommaviy axborot vositalarining taşkiliy tuzilmasini tasdiqlaydi',
  'Ittifoqning içki meʼyoriy hujjatlarini tasdiqlaydi',
  'Zarur hollarda navbatdagi Qurultoygaça rais va örinbosarlarni saylaydi',
]

/** Kengaş tarkibi (Ustav, 5.5.1) */
export const MEMBERS = {
  lead: 'Kengaş tarkibi turli sohalarda band bölgan yoşlarning turli toifalari hisobidan şakllantiriladi.',
  byPost: [
    'Markaziy Kengaş raisi va uning örinbosarlari',
    'Markaziy Kengaş apparati boşqarma va bölim rahbarlari',
    'Yoşlar muammolarini örganiş va istiqbolli kadrlarni tayyorlaş instituti rektori',
    'Ittifoq naşrlari va “Yoşlar” teleradiokanali rahbarlari',
    'Qoraqalpoğiston Respublikasi, viloyatlar va Toşkent şahar hududiy kengaşlari raislari',
  ],
  fields: ['Taʼlim', 'Fan', 'Madaniyat va sanʼat', 'Ommaviy axborot vositalari', 'Işlab çiqariş va xizmat', 'Tadbirkorlik va fermerlik', 'Sport', 'Soğliqni saqlaş', 'Ekologiya', 'Qurolli kuçlar', 'Huquq-tartibot organlari'],
  link: 'Toşkent şahar hududiy Kengaşi raisi ham Markaziy Kengaş tarkibiga kiradi — poytaxt yoşlarining ovozi Ittifoqning boşqaruvida şu orqali eşitiladi.',
}

/* Rahbariyat: rais — UzA xabarlaridan (2025–2026); örinbosarlar NAMUNA — rasmiy maʼlumot kelgaçi almaştiriladi */
export type Leader = { name: string; role: string; img?: string }

export const LEADERS: Leader[] = [
  { name: 'Xayrulla Sattorov', role: 'Markaziy Kengaş raisi' },
  { name: 'Maʼlumot tez orada', role: 'Rais örinbosari' },
  { name: 'Maʼlumot tez orada', role: 'Rais örinbosari' },
]

/** Ijroiya qömitasi va nazorat-taftiş komissiyasi (Ustav, 5.6–5.7) */
export const BODIES = [
  {
    t: 'Ijroiya qömitasi',
    meta: 'Kamida 15 kişi · 5 yil',
    d: 'Markaziy Kengaş öz aʼzolari orasidan saylaydi. Yiğilişlarini Markaziy Kengaş raisi çaqiradi va olib boradi.',
    items: [
      'Hududiy bölinmalar, korxonalar va OAV faoliyatini muvofiqlaştiradi',
      'Loyihalar, grant va tanlovlar böyiça qarorlar qabul qiladi',
      'Xalqaro taşkilotlar bilan hamkorlik va delegatsiyalar masalalarini hal qiladi',
      'Hududiy kengaşlar byudjetlarini körib çiqadi',
    ],
  },
  {
    t: 'Markaziy nazorat-taftiş komissiyasi',
    meta: 'Kamida 11 kişi · 5 yil',
    d: 'Qurultoy saylaydi va unga hisobot beradi. Aʼzolari rahbar organlar yiğilişlarida maslahat ovozi bilan qatnaşadi.',
    items: [
      'Byudjet ijrosi va moliyaviy-xöjalik faoliyatini tekşiradi',
      'Ustav qoidalariga rioya qilinişini nazorat qiladi',
      'Ittifoq aʼzolarining murojaatlarini körib çiqadi',
      'Aniqlangan kamçiliklarni bartaraf etiş böyiça takliflar kiritadi',
    ],
  },
]

export const CONTACT = {
  address: 'Toşkent şahri, Alişer Navoiy köçasi, 11-uy',
  map: 'https://yandex.uz/maps/?text=Toshkent%2C%20Alisher%20Navoiy%20ko%27chasi%2C%2011',
  note: 'Telefon, elektron poçta va qabul kunlari rasmiy maʼlumot kelgaçi qöşiladi.',
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
    t: 'Oliy taʼlim yoşlar yetakçilari forumi — 2026',
    d: 'Ikki kunlik forumda Ittifoq loyihalari taqdim etildi: “IELTS Marafon”, “Suvni birgalikda asraymiz”, “Yölovçi”, “Kitob-top”.',
    img: '/img/kengash/forum-2026.jpg',
    href: 'https://uza.uz/oz/posts/mRVoF0b1l4YssnBCB19nRc62BAGFaZ4n',
  },
  {
    date: '27.10.2025',
    t: 'Boşlanğiç taşkilotda hisobot-saylov yiğilişi',
    d: 'Guliston davlat universitetidagi boşlanğiç taşkilot yetakçisi hisobot berdi va qayta saylandi; yiğilişda Markaziy Kengaş raisi iştirok etdi.',
    img: '/img/kengash/saylov-2025.jpg',
    href: 'https://uza.uz/oz/posts/yoshlar-ittifoqi-yetakchisi-hisobot-berdi-va-qayta-saylandi_776143',
  },
  {
    date: '23.12.2024',
    t: 'Yoşlar yetakçilari forumi',
    d: 'Oliy taʼlim muassasalaridagi boşlanğiç taşkilotlarning faol yetakçilari taqdirlandi.',
    img: '/img/kengash/forum-2024.jpg',
    href: 'https://uza.uz/oz/posts/faol-yoshlar-yetakchilari-taqdirlandi_671313',
  },
]
