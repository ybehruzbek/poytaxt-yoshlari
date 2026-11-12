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
  anons: 'OAV uçun anons',
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
    title: 'Poytaxtning 70 dan ortiq yoşlar yetakçisi respublika forumida qatnaşdi',
    lead: '9–11-oktabr kunlari Özbekiston yoşlar ittifoqi Markaziy Kengaşi tomonidan ötkazilgan “Oliy taʼlim yetakçilarining forumi”da Toşkent şahridagi oliy taʼlim taşkilotlarining 70 dan ortiq yoşlar yetakçisi qatnaşdi.',
    body: [
      'Poytaxt vakillari respublikaning turli hududlaridan kelgan yoşlar yetakçilari bilan tajriba almaşdi, boşlanğiç taşkilotlar faoliyatidagi samarali yondaşuvlar va ilğor loyihalar bilan tanişdi.',
      'Forumda orttirilgan tajriba va yangi hamkorlik aloqalari talaba-yoşlar taşabbuslarini qöllab-quvvatlaş hamda oliy taʼlim taşkilotlari bilan sohaviy va brend loyihalarni birgalikda amalga oşirişda qöllaniladi.',
    ],
    facts: [
      { v: '70+', k: 'poytaxt yoşlar yetakçisi' },
      { v: '3', k: 'kun davom etdi' },
    ],
    album: 6890,
    video: 'hSJUcwB0qUM',
  },
  {
    slug: 'hududiy-koordinatorlar-instituti',
    kind: 'reliz',
    date: '2026-10-08',
    title: 'Toşkent şahrida “Hududiy koordinatorlar instituti” modeli joriy etiladi',
    lead: 'Özbekiston yoşlar ittifoqi Toşkent şahar hududiy Kengaşi poytaxtdagi oliy taʼlim taşkilotlari yoşlar yetakçilari bilan işni muvofiqlaştiriş uçun yangi taşkiliy model — “Hududiy koordinatorlar instituti”ni joriy etmoqda.',
    body: [
      'Model doirasida Kengaş qamrovidagi 98 ta oliy taʼlim taşkiloti hududiy joylaşuviga köra 9 ta guruhga birlaştirildi, 10 nafar yoşlar yetakçisi hududiy koordinator etib belgilandi. Hududdagi tayanç oliy taʼlim taşkilotining yoşlar yetakçisi koordinator vazifasini bajaradi: biriktirilgan taşkilotlar yoşlar yetakçilarining hamkorligini muvofiqlaştiradi, istiqbolli taşabbuslarni birlaştiradi va qöşma loyihalarni amalga oşirişga kömaklaşadi.',
      'Yangi institutning ustuvor yönalişi — oliy taʼlim taşkilotlaridagi eng salohiyatli va taşabbuskor yoşlarni aniqlaş, ularning bilim va könikmalarini rivojlantiriş hamda yirik loyihalarga jalb etiş. Taşkilotlarning ixtisoslaşuvi va ilmiy salohiyatidan kelib çiqib, bir neçta oliy taʼlim taşkiloti hamkorligida brend loyihalar yaratişga alohida eʼtibor qaratiladi.',
    ],
    facts: [
      { v: '98', k: 'oliy taʼlim taşkiloti' },
      { v: '9', k: 'hududiy guruh' },
      { v: '10', k: 'hududiy koordinator' },
    ],
  },
  {
    slug: 'ott-yetakchilari-birinchi-umumiy-yigilishi',
    kind: 'reliz',
    date: '2026-10-08',
    title: 'OTT yoşlar yetakçilarining yangi öquv yilidagi birinçi umumiy yiğilişi bölib ötdi',
    lead: '7-oktabr kuni Toşkent arxitektura-quriliş universitetida Kengaş poytaxtdagi oliy taʼlim taşkilotlari boşlanğiç taşkilotlarining yoşlar yetakçilari uçun 2026/2027-öquv yilidagi birinçi umumiy yiğilişni ötkazdi.',
    body: [
      'Kengaytirilgan yiğilişda boşlanğiç taşkilotlar oldida 2026/2027-öquv yilida turgan ustuvor maqsad va vazifalar belgilab olindi, ularning faoliyatini takomillaştiriş va yoşlar bilan işlaş samaradorligini oşiriş masalalari körib çiqildi.',
    ],
    album: 6822,
  },
  {
    slug: 'oliy-talim-yetakchilari-forumi-anons',
    kind: 'anons',
    date: '2026-10-08',
    title: 'Oliy taʼlim taşkilotlari yoşlar yetakçilarining respublika forumi',
    lead: 'Özbekiston yoşlar ittifoqi Markaziy Kengaşi tomonidan ötkaziladigan forumda respublikadan 200 nafardan ortiq yoşlar yetakçisi, jumladan, Toşkent şahridagi 91 ta oliy taʼlim taşkilotining yoşlar yetakçilari qatnaşadi.',
    body: [
      'Uç kunlik forumda yoşlar yetakçilarining huquq va majburiyatlari, faoliyatni samarali taşkil etiş, şaxsiy brendni şakllantiriş, notiqlik mahorati, zamonaviy raqamli texnologiyalardan foydalaniş va yoşlar bilan işlaşning ilğor usullariga bağişlangan seminar-treninglar va amaliy maşğulotlar ötkaziladi.',
      'Forum doirasida “IELTS Marafon”, “Suvni birgalikda asraymiz”, “Yölovçi” va “Kitob-top” loyihalari taqdimoti, hududlararo tajriba almaşiş, intellektual öyinlar, sport musobaqalari hamda madaniy-maʼrifiy tadbirlar rejalaştirilgan.',
    ],
    facts: [
      { v: '200+', k: 'yoşlar yetakçisi' },
      { v: '91', k: 'poytaxt OTTsidan yetakçilar' },
    ],
    event: { when: '9–11-oktabr', place: 'Yoşlar oromgohi, Toşkent viloyati' },
  },
  {
    slug: 'ajdodlar-izidan-respublika-bosqichi',
    kind: 'anons',
    date: '2026-10-16',
    title: '“Ajdodlar izidan” intellektual tanlovining respublika bosqiçi',
    lead: '24-oktabr kuni Yoşlar ijod saroyida yoş harbiy xizmatçilar va kursantlar örtasida “Ajdodlar izidan” intellektual tanlovining respublika bosqiçi bölib ötadi.',
    body: [
      'Tanlovning maqsadi — yoş harbiylarda kitobxonlik madaniyatini yuksaltiriş, ajdodlarimizning boy maʼnaviy va harbiy merosini çuqur örganiş, milliy qadriyatlarga hurmat va vatanparvarlik tuyğularini mustahkamlaş.',
    ],
    event: { when: '24-oktabr', time: '09:00', place: 'Yoşlar ijod saroyi, Toşkent şahri' },
  },
  {
    slug: 'talaba-va-kursantlar-sport-musobaqalari',
    kind: 'reliz',
    date: '2026-09-29',
    title: 'Talaba va kursantlar örtasida döstlik sport musobaqalari ötkazildi',
    lead: '25–26-sentabr kunlari Harbiy xavfsizlik va mudofaa universitetida Öqituvçi va murabbiylar kuniga bağişlangan döstlik sport musobaqalari bölib ötdi. Unda 10 ta oliy va oliy harbiy taʼlim muassasasidan 340 nafar yoş sportçi qatnaşdi.',
    body: [
      'Tadbir ikki tomonlama imzolangan hamkorlik memorandumlari ijrosi doirasida taşkil etildi. Musobaqada Harbiy xavfsizlik va mudofaa universiteti, Jamoat xavfsizligi universiteti, Islom Karimov nomidagi Toşkent davlat texnika universiteti, Toşkent davlat transport universiteti, Muhammad al-Xorazmiy nomidagi Toşkent axborot texnologiyalari universiteti, Çirçiq davlat pedagogika universiteti, Jahon iqtisodiyoti va diplomatiya universiteti, Bojxona instituti, Içki işlar vazirligi Akademiyasi hamda Favqulodda vaziyatlar vazirligi Akademiyasi jamoalari iştirok etdi.',
      'Ikki kun davomida mini futbol, voleybol, arqon tortiş va 100 metrga estafeta yuguriş böyiça bellaşuvlar bölib ötdi. Musobaqalar Özbekiston davlat jismoniy tarbiya va sport universiteti hakamlari hamda Harbiy xavfsizlik va mudofaa universitetining Jismoniy tayyorgarlik va sport kafedrasi mutaxassislari nazorati ostida ötkazildi.',
      'Ğolib jamoalarga Kengaş va hamkor taşkilotlarning sovğalari, medallar, faxriy yorliqlar hamda kitoblar töplami topşirildi.',
    ],
    facts: [
      { v: '340', k: 'yoş sportçi' },
      { v: '10', k: 'taʼlim muassasasi' },
      { v: '4', k: 'sport turi' },
    ],
    album: 6784,
  },
]

/** “Kengaş haqida” — har bir reliz oxiridagi doimiy band */
export const ABOUT =
  'Özbekiston yoşlar ittifoqi Toşkent şahar hududiy Kengaşi poytaxtdagi oliy taʼlim taşkilotlari, harbiy qismlar va muassasalardagi boşlanğiç taşkilotlar faoliyatini muvofiqlaştiradi, yoşlarning taşabbuslarini qöllab-quvvatlaydi va ularning manfaatlarini ifodalaydi.'

export const ORG = 'Özbekiston yoşlar ittifoqi Toşkent şahar hududiy Kengaşi'
