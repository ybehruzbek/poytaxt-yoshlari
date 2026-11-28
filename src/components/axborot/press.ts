/**
 * Press-relizlar — Kengaş Axborot xizmatining jurnalistlar uçun rasmiy materiallari.
 * Ikki tur: “Press-reliz” (bölib ötgan voqea yoki qaror haqida rasmiy xabar) va
 * “OAV uçun anons” (jurnalistlarni tadbirga taklif: sana, vaqt, manzil).
 * Matnlar Kengaş rasmiy kanalidagi xabarlar asosida, faqat ulardagi faktlar bilan.
 * Admin panel ulanganda bu röyxat bazadan olinadi.
 */

export type PressKind = 'reliz' | 'anons'

export const PRESS_KINDS: Record<PressKind, string> = {
  reliz: 'Press-reliz',
  anons: 'OAV uchun anons',
}

export type PressItem = {
  slug: string
  kind: PressKind
  /** eʼlon qilingan sana */
  date: string
  title: string
  /** birinçi xatboşi — eng muhim fakt */
  lead: string
  body: string[]
  /** asosiy raqamlar */
  facts?: { v: string; k: string }[]
  /** anons uçun: tadbir vaqti va joyi */
  event?: { when: string; time?: string; place: string }
  /** fotogalereyadagi albom (ALBUMS.id) */
  album?: number
  /** videogalereyadagi video (YouTube id) */
  video?: string
}

export const PRESS: PressItem[] = [
  {
    slug: 'oliy-talim-yetakchilari-forumi-yakunlari',
    kind: 'reliz',
    date: '2026-10-12',
    title: 'Poytaxtning 70 dan ortiq yoshlar yetakchisi respublika forumida qatnashdi',
    lead: '9–11-oktabr kunlari O‘zbekiston yoshlar ittifoqi Markaziy Kengashi tomonidan o‘tkazilgan “Oliy ta’lim yetakchilarining forumi”da Toshkent shahridagi oliy ta’lim tashkilotlarining 70 dan ortiq yoshlar yetakchisi qatnashdi.',
    body: [
      'Poytaxt vakillari respublikaning turli hududlaridan kelgan yoshlar yetakchilari bilan tajriba almashdi, boshlang‘ich tashkilotlar faoliyatidagi samarali yondashuvlar va ilg‘or loyihalar bilan tanishdi.',
      'Forumda orttirilgan tajriba va yangi hamkorlik aloqalari talaba-yoshlar tashabbuslarini qo‘llab-quvvatlash hamda oliy ta’lim tashkilotlari bilan sohaviy va brend loyihalarni birgalikda amalga oshirishda qo‘llaniladi.',
    ],
    facts: [
      { v: '70+', k: 'poytaxt yoshlar yetakchisi' },
      { v: '3', k: 'kun davom etdi' },
    ],
    album: 6890,
    video: 'hSJUcwB0qUM',
  },
  {
    slug: 'hududiy-koordinatorlar-instituti',
    kind: 'reliz',
    date: '2026-10-08',
    title: 'Toshkent shahrida “Hududiy koordinatorlar instituti” modeli joriy etiladi',
    lead: 'O‘zbekiston yoshlar ittifoqi Toshkent shahar hududiy Kengashi poytaxtdagi oliy ta’lim tashkilotlari yoshlar yetakchilari bilan ishni muvofiqlashtirish uchun yangi tashkiliy model — “Hududiy koordinatorlar instituti”ni joriy etmoqda.',
    body: [
      'Model doirasida Kengash qamrovidagi 98 ta oliy ta’lim tashkiloti hududiy joylashuviga ko‘ra 9 ta guruhga birlashtirildi, 10 nafar yoshlar yetakchisi hududiy koordinator etib belgilandi. Hududdagi tayanch oliy ta’lim tashkilotining yoshlar yetakchisi koordinator vazifasini bajaradi: biriktirilgan tashkilotlar yoshlar yetakchilarining hamkorligini muvofiqlashtiradi, istiqbolli tashabbuslarni birlashtiradi va qo‘shma loyihalarni amalga oshirishga ko‘maklashadi.',
      'Yangi institutning ustuvor yo‘nalishi — oliy ta’lim tashkilotlaridagi eng salohiyatli va tashabbuskor yoshlarni aniqlash, ularning bilim va ko‘nikmalarini rivojlantirish hamda yirik loyihalarga jalb etish. Tashkilotlarning ixtisoslashuvi va ilmiy salohiyatidan kelib chiqib, bir nechta oliy ta’lim tashkiloti hamkorligida brend loyihalar yaratishga alohida e’tibor qaratiladi.',
    ],
    facts: [
      { v: '98', k: 'oliy ta’lim tashkiloti' },
      { v: '9', k: 'hududiy guruh' },
      { v: '10', k: 'hududiy koordinator' },
    ],
  },
  {
    slug: 'ott-yetakchilari-birinchi-umumiy-yigilishi',
    kind: 'reliz',
    date: '2026-10-08',
    title: 'OTT yoshlar yetakchilarining yangi o‘quv yilidagi birinchi umumiy yig‘ilishi bo‘lib o‘tdi',
    lead: '7-oktabr kuni Toshkent arxitektura-qurilish universitetida Kengash poytaxtdagi oliy ta’lim tashkilotlari boshlang‘ich tashkilotlarining yoshlar yetakchilari uchun 2026/2027-o‘quv yilidagi birinchi umumiy yig‘ilishni o‘tkazdi.',
    body: [
      'Kengaytirilgan yig‘ilishda boshlang‘ich tashkilotlar oldida 2026/2027-o‘quv yilida turgan ustuvor maqsad va vazifalar belgilab olindi, ularning faoliyatini takomillashtirish va yoshlar bilan ishlash samaradorligini oshirish masalalari ko‘rib chiqildi.',
    ],
    album: 6822,
  },
  {
    slug: 'oliy-talim-yetakchilari-forumi-anons',
    kind: 'anons',
    date: '2026-10-08',
    title: 'Oliy ta’lim tashkilotlari yoshlar yetakchilarining respublika forumi',
    lead: 'O‘zbekiston yoshlar ittifoqi Markaziy Kengashi tomonidan o‘tkaziladigan forumda respublikadan 200 nafardan ortiq yoshlar yetakchisi, jumladan, Toshkent shahridagi 91 ta oliy ta’lim tashkilotining yoshlar yetakchilari qatnashadi.',
    body: [
      'Uch kunlik forumda yoshlar yetakchilarining huquq va majburiyatlari, faoliyatni samarali tashkil etish, shaxsiy brendni shakllantirish, notiqlik mahorati, zamonaviy raqamli texnologiyalardan foydalanish va yoshlar bilan ishlashning ilg‘or usullariga bag‘ishlangan seminar-treninglar va amaliy mashg‘ulotlar o‘tkaziladi.',
      'Forum doirasida “IELTS Marafon”, “Suvni birgalikda asraymiz”, “Yo‘lovchi” va “Kitob-top” loyihalari taqdimoti, hududlararo tajriba almashish, intellektual o‘yinlar, sport musobaqalari hamda madaniy-ma’rifiy tadbirlar rejalashtirilgan.',
    ],
    facts: [
      { v: '200+', k: 'yoshlar yetakchisi' },
      { v: '91', k: 'poytaxt OTTsidan yetakchilar' },
    ],
    event: { when: '9–11-oktabr', place: 'Yoshlar oromgohi, Toshkent viloyati' },
  },
  {
    slug: 'ajdodlar-izidan-respublika-bosqichi',
    kind: 'anons',
    date: '2026-10-16',
    title: '“Ajdodlar izidan” intellektual tanlovining respublika bosqichi',
    lead: '24-oktabr kuni Yoshlar ijod saroyida yosh harbiy xizmatchilar va kursantlar o‘rtasida “Ajdodlar izidan” intellektual tanlovining respublika bosqichi bo‘lib o‘tadi.',
    body: [
      'Tanlovning maqsadi — yosh harbiylarda kitobxonlik madaniyatini yuksaltirish, ajdodlarimizning boy ma’naviy va harbiy merosini chuqur o‘rganish, milliy qadriyatlarga hurmat va vatanparvarlik tuyg‘ularini mustahkamlash.',
    ],
    event: { when: '24-oktabr', time: '09:00', place: 'Yoshlar ijod saroyi, Toshkent shahri' },
  },
  {
    slug: 'talaba-va-kursantlar-sport-musobaqalari',
    kind: 'reliz',
    date: '2026-09-29',
    title: 'Talaba va kursantlar o‘rtasida do‘stlik sport musobaqalari o‘tkazildi',
    lead: '25–26-sentabr kunlari Harbiy xavfsizlik va mudofaa universitetida O‘qituvchi va murabbiylar kuniga bag‘ishlangan do‘stlik sport musobaqalari bo‘lib o‘tdi. Unda 10 ta oliy va oliy harbiy ta’lim muassasasidan 340 nafar yosh sportchi qatnashdi.',
    body: [
      'Tadbir ikki tomonlama imzolangan hamkorlik memorandumlari ijrosi doirasida tashkil etildi. Musobaqada Harbiy xavfsizlik va mudofaa universiteti, Jamoat xavfsizligi universiteti, Islom Karimov nomidagi Toshkent davlat texnika universiteti, Toshkent davlat transport universiteti, Muhammad al-Xorazmiy nomidagi Toshkent axborot texnologiyalari universiteti, Chirchiq davlat pedagogika universiteti, Jahon iqtisodiyoti va diplomatiya universiteti, Bojxona instituti, Ichki ishlar vazirligi Akademiyasi hamda Favqulodda vaziyatlar vazirligi Akademiyasi jamoalari ishtirok etdi.',
      'Ikki kun davomida mini futbol, voleybol, arqon tortish va 100 metrga estafeta yugurish bo‘yicha bellashuvlar bo‘lib o‘tdi. Musobaqalar O‘zbekiston davlat jismoniy tarbiya va sport universiteti hakamlari hamda Harbiy xavfsizlik va mudofaa universitetining Jismoniy tayyorgarlik va sport kafedrasi mutaxassislari nazorati ostida o‘tkazildi.',
      'G‘olib jamoalarga Kengash va hamkor tashkilotlarning sovg‘alari, medallar, faxriy yorliqlar hamda kitoblar to‘plami topshirildi.',
    ],
    facts: [
      { v: '340', k: 'yosh sportchi' },
      { v: '10', k: 'ta’lim muassasasi' },
      { v: '4', k: 'sport turi' },
    ],
    album: 6784,
  },
]

/** “Kengaş haqida” — har bir reliz oxiridagi doimiy band */
export const ABOUT =
  'O‘zbekiston yoshlar ittifoqi Toshkent shahar hududiy Kengashi poytaxtdagi oliy ta’lim tashkilotlari, harbiy qismlar va muassasalardagi boshlang‘ich tashkilotlar faoliyatini muvofiqlashtiradi, yoshlarning tashabbuslarini qo‘llab-quvvatlaydi va ularning manfaatlarini ifodalaydi.'

export const ORG = 'O‘zbekiston yoshlar ittifoqi Toshkent shahar hududiy Kengashi'
