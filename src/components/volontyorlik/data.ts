/**
 * “Volontyorlik” sahifasi maʼlumotlari. Huquqiy asos — “Volontyorlik faoliyati töğrisida”gi Qonun
 * (ÖRQ–585, 2019-yil 2-dekabr): yönalişlar — 6-modda, yoş talablari, huquq va majburiyatlar — 12-modda,
 * volontyorlik şartnomasi — 16-modda. Tadbirlar va natijalar Kengaşning “Poytaxt yoşlari” kanalidagi postlaridan
 * (components/faoliyat).
 */
export const LAW = {
  t: '“Volontyorlik faoliyati to‘g‘risida”gi O‘zbekiston Respublikasi Qonuni',
  no: 'O‘RQ–585, 2019-yil 2-dekabr',
  url: 'https://lex.uz/docs/4623999',
}

export type VolDir = {
  id: string
  icon: string
  t: string
  text: string
  tasks: string[]
  /** eng kam yoş (Qonunning 12-moddasi) */
  age: 16 | 18
  /** Kengaş tajribasidan namuna */
  example?: string
}

export const DIRS: VolDir[] = [
  {
    id: 'ijtimoiy',
    icon: 'qol',
    t: 'Ijtimoiy yordam',
    text: 'Kam ta’minlangan va ko‘p bolali oilalar, yolg‘iz keksalar hamda ijtimoiy himoyaga muhtoj shaxslarni qo‘llab-quvvatlash.',
    tasks: [
      'Xayriya aksiyalarini tashkil etish',
      'Sovg‘a va oziq-ovqat tarqatish',
      'Bayram dasturlarini o‘tkazish',
    ],
    age: 16,
    example: '“Mehrli yurak” xayriya aksiyasi — Taskin bolalar hospisi',
  },
  {
    id: 'gamxorlik',
    icon: 'yurak',
    t: 'Bemorlar va nogironligi bo‘lgan shaxslarga g‘amxo‘rlik',
    text: 'Bemorlar, nogironligi bo‘lgan shaxslar, maktab-internat tarbiyalanuvchilari va qariyalarga g‘amxo‘rlik qilish.',
    tasks: [
      'Tibbiyot muassasalarida bolalar uchun dasturlar',
      'Maktab-internatlarga tashrif',
      'Kundalik yordam ko‘rsatish',
    ],
    age: 16,
    example: '“Yozni Kamalak bilan!” aksiyasi — Toshkent shahar Onkologiya markazi',
  },
  {
    id: 'ekologiya',
    icon: 'barg',
    t: 'Ekologiya va atrof-muhit',
    text: 'Atrof-muhitni muhofaza qilish, ko‘chatlar ekish, ommaviy hashar va obodonlashtirish tadbirlarida ishtirok etish.',
    tasks: ['Daraxt va ko‘chat ekish', 'Ommaviy hasharlar', 'Ekologik targ‘ibot'],
    age: 16,
    example: 'Taskin bolalar hospisi hududida ekologik bog‘ barpo etish',
  },
  {
    id: 'meros',
    icon: 'gumbaz',
    t: 'Madaniy meros',
    text: 'Madaniy meros obyektlari, tarixiy-madaniy muhit va qadamjolarni saqlash bo‘yicha tadbirlar o‘tkazish.',
    tasks: [
      'Tarixiy obidalarni obodonlashtirish',
      'Ekskursiyalarda ko‘maklashish',
      'Targ‘ibot materiallari tayyorlash',
    ],
    age: 16,
  },
  {
    id: 'tadbirlar',
    icon: 'bayroq',
    t: 'Ommaviy tadbirlar va forumlar',
    text: 'Milliy va xalqaro ahamiyatga molik sport, madaniy va jamoat tadbirlarini o‘tkazishga ko‘maklashish.',
    tasks: [
      'Ishtirokchilarni kutib olish va ro‘yxatga olish',
      'Mehmonlarga yo‘l-yo‘riq ko‘rsatish',
      'Tadbir maydonida tartibni ta’minlash',
    ],
    age: 16,
    example: 'Kibersport musobaqalari va “BMT modeli” konferensiyalari volontyorligi',
  },
  {
    id: 'favqulodda',
    icon: 'qalqon',
    t: 'Favqulodda vaziyatlarda yordam',
    text: 'Favqulodda vaziyatlar oqibatlarining oldini olish va ularni bartaraf etishda vakolatli organlarga ko‘maklashish.',
    tasks: [
      'Jabrlanganlarga yordam ko‘rsatish',
      'Insonparvarlik yordamini tarqatish',
      'Vakolatli organlar topshiriqlarini bajarish',
    ],
    age: 18,
  },
  {
    id: 'talim',
    icon: 'kitob',
    t: 'Ta’lim va mentorlik',
    text: 'O‘quvchi va yoshlarga bilim berishda ko‘maklashish, mentorlik, o‘quv kurslari va treninglar o‘tkazish.',
    tasks: [
      'Fanlardan qo‘shimcha mashg‘ulotlar',
      'Kasbga yo‘naltirish suhbatlari',
      'Loyiha boshqaruvi bo‘yicha treninglar',
    ],
    age: 16,
    example: '“Universe” volontyorlar maktabi — loyiha boshqaruvi bo‘yicha darslar',
  },
  {
    id: 'raqamli',
    icon: 'ekran',
    t: 'Raqamli volontyorlik',
    text: 'Masofadan turib media, dizayn, tarjima va axborot texnologiyalari sohasida ijtimoiy loyihalarga yordam berish.',
    tasks: [
      'Foto va video materiallar tayyorlash',
      'Ijtimoiy tarmoqlarda targ‘ibot',
      'Matnlarni tarjima qilish',
    ],
    age: 16,
  },
]

/** Volontyor böliş tartibi */
export const STEPS = [
  {
    t: 'Ariza berish',
    d: 'Sahifadagi shakl orqali yo‘nalish va bandlik vaqtini ko‘rsatib ariza yuboriladi.',
  },
  {
    t: 'Suhbat',
    d: 'Kengash mutaxassisi bilan suhbatda qiziqish va imkoniyatlarga mos yo‘nalish belgilanadi.',
  },
  {
    t: 'O‘rgatuv',
    d: 'Volontyorlik asoslari va jamoada ishlash bo‘yicha seminar-treningda ishtirok etiladi.',
  },
  {
    t: 'Tadbirga biriktirish',
    d: 'Volontyor tadbir yoki loyihaga biriktiriladi. Oyiga 20 soatdan ortiq bandlikda yozma shartnoma tuziladi.',
  },
  {
    t: 'Tavsiyanoma',
    d: 'Faol volontyorlarga volontyorlik faoliyati to‘g‘risida tavsiyanoma beriladi.',
  },
]

/** Volontyorning huquqlari (Qonunning 12-moddasi) */
export const RIGHTS = [
  'Volontyorlik faoliyatida ishtirok etishni erkin tanlash va istalgan vaqtda tugatish',
  'Volontyorlik faoliyati tashkilotchisi to‘g‘risida ishonchli axborot olish',
  'Maxsus kiyim-bosh olish, yo‘l, yashash, ovqatlanish va boshqa xarajatlar o‘rnini qoplatish',
  'Volontyorlik faoliyati tashkilotchisidan tavsiyanoma olish',
  'Tashkilotchi mablag‘lari hisobidan hayot va sog‘liqni sug‘urta qildirish',
]

/** Volontyorning majburiyatlari (Qonunning 12-moddasi) */
export const DUTIES = [
  'Topshiriqlarni vijdonan bajarish',
  'Fuqarolar va tashkilotlarning huquq va qonuniy manfaatlarini buzmaslik',
  'Volontyorlik davomida ma’lum bo‘lgan maxfiy ma’lumotlarni oshkor etmaslik',
  'Berilgan moddiy resurslar va asbob-uskunalarni ehtiyot qilish hamda qaytarish',
]

/** Yönaliş tanlaş testi: har bir javob yönalişlarga ball beradi */
export const QUIZ: { q: string; a: { t: string; dirs: string[] }[] }[] = [
  {
    q: 'Qaysi ish sizga ko‘proq yoqadi?',
    a: [
      { t: 'Odamlarga bevosita yordam berish', dirs: ['ijtimoiy', 'gamxorlik'] },
      { t: 'Tabiat va shaharni asrash', dirs: ['ekologiya', 'meros'] },
      { t: 'Katta tadbirlarda jamoada ishlash', dirs: ['tadbirlar', 'favqulodda'] },
      { t: 'Bilim berish va o‘rgatish', dirs: ['talim', 'raqamli'] },
    ],
  },
  {
    q: 'Haftasiga qancha vaqt ajrata olasiz?',
    a: [
      { t: '2–4 soat', dirs: ['raqamli', 'ekologiya'] },
      { t: '5–10 soat', dirs: ['ijtimoiy', 'talim', 'meros'] },
      { t: 'Faqat dam olish kunlari', dirs: ['tadbirlar', 'ekologiya'] },
      { t: 'Zarur bo‘lganda istalgan vaqt', dirs: ['favqulodda', 'gamxorlik'] },
    ],
  },
  {
    q: 'Qaysi muhitda ishlash qulay?',
    a: [
      { t: 'Ochiq havoda', dirs: ['ekologiya', 'tadbirlar'] },
      { t: 'Kichik guruhda, xotirjam muhitda', dirs: ['gamxorlik', 'talim'] },
      { t: 'Masofadan, kompyuter orqali', dirs: ['raqamli'] },
      { t: 'Tezkor va mas’uliyatli vaziyatlarda', dirs: ['favqulodda', 'tadbirlar'] },
    ],
  },
  {
    q: 'Qaysi ko‘nikmangiz kuchliroq?',
    a: [
      { t: 'Muloqot va hamdardlik', dirs: ['ijtimoiy', 'gamxorlik'] },
      { t: 'Tashkilotchilik', dirs: ['tadbirlar', 'meros'] },
      { t: 'Media, dizayn yoki tillar', dirs: ['raqamli'] },
      { t: 'Biror fanni chuqur bilish', dirs: ['talim'] },
    ],
  },
  {
    q: 'Volontyorlikdan nimani kutasiz?',
    a: [
      { t: 'Jamiyatga foyda keltirish', dirs: ['ijtimoiy', 'favqulodda'] },
      { t: 'Yangi tajriba va tanishlar', dirs: ['tadbirlar', 'meros'] },
      { t: 'Kasbiy ko‘nikmalarni rivojlantirish', dirs: ['talim', 'raqamli'] },
      { t: 'Atrof-muhitni yaxshilash', dirs: ['ekologiya'] },
    ],
  },
]

/** Bandlik vaqti (ariza şakli) */
export const TIMES = [
  'Haftasiga 2–4 soat',
  'Haftasiga 5–10 soat',
  'Faqat dam olish kunlari',
  'Tadbirlar davrida',
]
