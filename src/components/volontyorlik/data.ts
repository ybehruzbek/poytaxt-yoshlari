/**
 * “Volontyorlik” sahifasi maʼlumotlari. Huquqiy asos — “Volontyorlik faoliyati töğrisida”gi Qonun
 * (ÖRQ–585, 2019-yil 2-dekabr): yönalişlar — 6-modda, yoş talablari, huquq va majburiyatlar — 12-modda,
 * volontyorlik şartnomasi — 16-modda. Tadbirlar va natijalar Kengaşning “Poytaxt yoşlari” kanalidagi postlaridan
 * (components/faoliyat).
 */
export const LAW = {
  t: '“Volontyorlik faoliyati töğrisida”gi Özbekiston Respublikasi Qonuni',
  no: 'ÖRQ–585, 2019-yil 2-dekabr',
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
    text: 'Kam taʼminlangan va köp bolali oilalar, yolğiz keksalar hamda ijtimoiy himoyaga muhtoj şaxslarni qöllab-quvvatlaş.',
    tasks: [
      'Xayriya aksiyalarini taşkil etiş',
      'Sovğa va oziq-ovqat tarqatiş',
      'Bayram dasturlarini ötkaziş',
    ],
    age: 16,
    example: '“Mehrli yurak” xayriya aksiyasi — Taskin bolalar hospisi',
  },
  {
    id: 'gamxorlik',
    icon: 'yurak',
    t: 'Bemorlar va nogironligi bölgan şaxslarga ğamxörlik',
    text: 'Bemorlar, nogironligi bölgan şaxslar, maktab-internat tarbiyalanuvçilari va qariyalarga ğamxörlik qiliş.',
    tasks: [
      'Tibbiyot muassasalarida bolalar uçun dasturlar',
      'Maktab-internatlarga taşrif',
      'Kundalik yordam körsatiş',
    ],
    age: 16,
    example: '“Yozni Kamalak bilan!” aksiyasi — Toşkent şahar Onkologiya markazi',
  },
  {
    id: 'ekologiya',
    icon: 'barg',
    t: 'Ekologiya va atrof-muhit',
    text: 'Atrof-muhitni muhofaza qiliş, köçatlar ekiş, ommaviy haşar va obodonlaştiriş tadbirlarida iştirok etiş.',
    tasks: ['Daraxt va köçat ekiş', 'Ommaviy haşarlar', 'Ekologik tarğibot'],
    age: 16,
    example: 'Taskin bolalar hospisi hududida ekologik boğ barpo etiş',
  },
  {
    id: 'meros',
    icon: 'gumbaz',
    t: 'Madaniy meros',
    text: 'Madaniy meros obyektlari, tarixiy-madaniy muhit va qadamjolarni saqlaş böyiça tadbirlar ötkaziş.',
    tasks: [
      'Tarixiy obidalarni obodonlaştiriş',
      'Ekskursiyalarda kömaklaşiş',
      'Tarğibot materiallari tayyorlaş',
    ],
    age: 16,
  },
  {
    id: 'tadbirlar',
    icon: 'bayroq',
    t: 'Ommaviy tadbirlar va forumlar',
    text: 'Milliy va xalqaro ahamiyatga molik sport, madaniy va jamoat tadbirlarini ötkazişga kömaklaşiş.',
    tasks: [
      'Iştirokçilarni kutib oliş va röyxatga oliş',
      'Mehmonlarga yöl-yöriq körsatiş',
      'Tadbir maydonida tartibni taʼminlaş',
    ],
    age: 16,
    example: 'Kibersport musobaqalari va “BMT modeli” konferensiyalari volontyorligi',
  },
  {
    id: 'favqulodda',
    icon: 'qalqon',
    t: 'Favqulodda vaziyatlarda yordam',
    text: 'Favqulodda vaziyatlar oqibatlarining oldini oliş va ularni bartaraf etişda vakolatli organlarga kömaklaşiş.',
    tasks: [
      'Jabrlanganlarga yordam körsatiş',
      'Insonparvarlik yordamini tarqatiş',
      'Vakolatli organlar topşiriqlarini bajariş',
    ],
    age: 18,
  },
  {
    id: 'talim',
    icon: 'kitob',
    t: 'Taʼlim va mentorlik',
    text: 'Öquvçi va yoşlarga bilim berişda kömaklaşiş, mentorlik, öquv kurslari va treninglar ötkaziş.',
    tasks: [
      'Fanlardan qöşimça maşğulotlar',
      'Kasbga yönaltiriş suhbatlari',
      'Loyiha boşqaruvi böyiça treninglar',
    ],
    age: 16,
    example: '“Universe” volontyorlar maktabi — loyiha boşqaruvi böyiça darslar',
  },
  {
    id: 'raqamli',
    icon: 'ekran',
    t: 'Raqamli volontyorlik',
    text: 'Masofadan turib media, dizayn, tarjima va axborot texnologiyalari sohasida ijtimoiy loyihalarga yordam beriş.',
    tasks: [
      'Foto va video materiallar tayyorlaş',
      'Ijtimoiy tarmoqlarda tarğibot',
      'Matnlarni tarjima qiliş',
    ],
    age: 16,
  },
]

/** Volontyor böliş tartibi */
export const STEPS = [
  {
    t: 'Ariza beriş',
    d: 'Sahifadagi şakl orqali yönaliş va bandlik vaqtini körsatib ariza yuboriladi.',
  },
  {
    t: 'Suhbat',
    d: 'Kengaş mutaxassisi bilan suhbatda qiziqiş va imkoniyatlarga mos yönaliş belgilanadi.',
  },
  {
    t: 'Örgatuv',
    d: 'Volontyorlik asoslari va jamoada işlaş böyiça seminar-treningda iştirok etiladi.',
  },
  {
    t: 'Tadbirga biriktiriş',
    d: 'Volontyor tadbir yoki loyihaga biriktiriladi. Oyiga 20 soatdan ortiq bandlikda yozma şartnoma tuziladi.',
  },
  {
    t: 'Tavsiyanoma',
    d: 'Faol volontyorlarga volontyorlik faoliyati töğrisida tavsiyanoma beriladi.',
  },
]

/** Volontyorning huquqlari (Qonunning 12-moddasi) */
export const RIGHTS = [
  'Volontyorlik faoliyatida iştirok etişni erkin tanlaş va istalgan vaqtda tugatiş',
  'Volontyorlik faoliyati taşkilotçisi töğrisida işonçli axborot oliş',
  'Maxsus kiyim-boş oliş, yöl, yaşaş, ovqatlaniş va boşqa xarajatlar örnini qoplatiş',
  'Volontyorlik faoliyati taşkilotçisidan tavsiyanoma oliş',
  'Taşkilotçi mablağlari hisobidan hayot va soğliqni suğurta qildiriş',
]

/** Volontyorning majburiyatlari (Qonunning 12-moddasi) */
export const DUTIES = [
  'Topşiriqlarni vijdonan bajariş',
  'Fuqarolar va taşkilotlarning huquq va qonuniy manfaatlarini buzmaslik',
  'Volontyorlik davomida maʼlum bölgan maxfiy maʼlumotlarni oşkor etmaslik',
  'Berilgan moddiy resurslar va asbob-uskunalarni ehtiyot qiliş hamda qaytariş',
]

/** Yönaliş tanlaş testi: har bir javob yönalişlarga ball beradi */
export const QUIZ: { q: string; a: { t: string; dirs: string[] }[] }[] = [
  {
    q: 'Qaysi iş sizga köproq yoqadi?',
    a: [
      { t: 'Odamlarga bevosita yordam beriş', dirs: ['ijtimoiy', 'gamxorlik'] },
      { t: 'Tabiat va şaharni asraş', dirs: ['ekologiya', 'meros'] },
      { t: 'Katta tadbirlarda jamoada işlaş', dirs: ['tadbirlar', 'favqulodda'] },
      { t: 'Bilim beriş va örgatiş', dirs: ['talim', 'raqamli'] },
    ],
  },
  {
    q: 'Haftasiga qança vaqt ajrata olasiz?',
    a: [
      { t: '2–4 soat', dirs: ['raqamli', 'ekologiya'] },
      { t: '5–10 soat', dirs: ['ijtimoiy', 'talim', 'meros'] },
      { t: 'Faqat dam oliş kunlari', dirs: ['tadbirlar', 'ekologiya'] },
      { t: 'Zarur bölganda istalgan vaqt', dirs: ['favqulodda', 'gamxorlik'] },
    ],
  },
  {
    q: 'Qaysi muhitda işlaş qulay?',
    a: [
      { t: 'Oçiq havoda', dirs: ['ekologiya', 'tadbirlar'] },
      { t: 'Kiçik guruhda, xotirjam muhitda', dirs: ['gamxorlik', 'talim'] },
      { t: 'Masofadan, kompyuter orqali', dirs: ['raqamli'] },
      { t: 'Tezkor va masʼuliyatli vaziyatlarda', dirs: ['favqulodda', 'tadbirlar'] },
    ],
  },
  {
    q: 'Qaysi könikmangiz kuçliroq?',
    a: [
      { t: 'Muloqot va hamdardlik', dirs: ['ijtimoiy', 'gamxorlik'] },
      { t: 'Taşkilotçilik', dirs: ['tadbirlar', 'meros'] },
      { t: 'Media, dizayn yoki tillar', dirs: ['raqamli'] },
      { t: 'Biror fanni çuqur biliş', dirs: ['talim'] },
    ],
  },
  {
    q: 'Volontyorlikdan nimani kutasiz?',
    a: [
      { t: 'Jamiyatga foyda keltiriş', dirs: ['ijtimoiy', 'favqulodda'] },
      { t: 'Yangi tajriba va tanişlar', dirs: ['tadbirlar', 'meros'] },
      { t: 'Kasbiy könikmalarni rivojlantiriş', dirs: ['talim', 'raqamli'] },
      { t: 'Atrof-muhitni yaxşilaş', dirs: ['ekologiya'] },
    ],
  },
]

/** Bandlik vaqti (ariza şakli) */
export const TIMES = [
  'Haftasiga 2–4 soat',
  'Haftasiga 5–10 soat',
  'Faqat dam oliş kunlari',
  'Tadbirlar davrida',
]
