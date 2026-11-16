/**
 * "Özbekiston yoşlar ittifoqi" sahifasi mazmuni.
 * Manba: "Özbekiston yoşlar ittifoqining faoliyati töğrisida" taqdimoti (2026).
 * Keyinçalik admin paneldan (Payload) boşqariladi.
 */

/** Ittifoq haqida (motto — sahifa boşidagi şior) */
export const WHO = {
  paras: [
    'Özbekiston yoşlar ittifoqi — mamlakat yoşlarini birlaştiruvçi nodavlat notijorat taşkilot. U 2017-yil 30-iyunda taşkil etilgan. Şu kun har yili butun mamlakatda “Yoşlar kuni” sifatida nişonlanadi.',
    'Ittifoqqa 14 yoşga tölgan va 30 yoşdan oşmagan Özbekiston Respublikasi fuqarolari hamda Özbekistonda muntazam yaşab kelayotgan fuqaroligi bölmagan şaxslar ixtiyoriy ravişda aʼzo bölişi mumkin. Ittifoq faoliyati ixtiyoriylik, qonuniylik, oşkoralik, aʼzolarning teng huquqliligi va özini özi boşqariş tamoyillariga asoslanadi.',
  ],
  motto: 'Yoşlar — kelajak bunyodkori!',
}

/** Maqsadimiz (katta sarlavha) */
/**
 * Maqsadimiz — Ustavning 2.1-bandi va Prezidentning 2017-yil 5-iyuldagi PF-5106-son Farmoni asosida, bitta jumlada.
 * Butun jumla bir xil rangda (bitta maqsad — qismlarga ajratilmaydi).
 */
export const MISSION = {
  text: 'Yoşlarning huquq va qonuniy manfaatlarini himoya qiliş, ularni mamlakatdagi islohotlarga faol jalb etiş, yigit-qizlarning maʼnaviy va kasbiy saviyasini yuksaltiriş hamda intellektual va ijodiy salohiyatini röyobga çiqarişga kömaklaşiş.',
}

/** y — yil (katta raqam), d — kun va oy (bölsa), t — matn */
export type Milestone = { y: string; d?: string; t: string }

/** Qisqa tarix */
export const HISTORY: Milestone[] = [
  { y: '2001', t: '“Kamolot” yoşlar ijtimoiy harakati taşkil etildi.' },
  { y: '2017', d: '30-iyun', t: 'Toşkentdagi Simpoziumlar saroyida “Kamolot” yoşlar ijtimoiy harakatining IV qurultoyi bölib ötdi. Qurultoy delegatlari “Kamolot” negizida Özbekiston yoşlar ittifoqini tuziş taklifini qöllab-quvvatladi.' },
  { y: '2017', d: '5-iyul', t: 'Özbekiston yoşlar ittifoqi faoliyatining ustuvor yönalişlari belgilandi, 30-iyun “Yoşlar kuni” deb eʼlon qilindi.' },
  { y: 'Bugun', t: 'Ittifoqning Qoraqalpoğiston Respublikasi, barça viloyatlar va Toşkent şahrida hududiy kengaşlari, taʼlim muassasalari, korxonalar va harbiy qismlarda boşlanğiç taşkilotlari faoliyat yuritadi.' },
]

export const QUOTE = {
  text: 'Yoşlik — ğanimat, vaqt — ğanimat, fursat borida otni qamçilang! Davlatimiz, xalqimiz yaratib berayotgan imkoniyatlarning qadriga yeting! Dunyoga öz sözingizni ayting!',
  author: 'Şavkat Mirziyoyev',
  role: 'Özbekiston Respublikasi Prezidenti',
}

export type Stat = { v: string; l: string }

export const STATS: Stat[] = [
  { v: '59 974', l: 'yoşlar yetakçilari va koordinatorlari' },
  { v: '1 489', l: 'taʼlim muassasalari va korxonalardagi boşlanğiç taşkilotlar' },
  { v: '14', l: 'hududda Yoşlar markazi doimiy faoliyat yuritadi' },
  { v: '20+', l: 'mamlakat bilan xalqaro hamkorlik' },
]

export const MORE_STATS: Stat[] = [
  { v: '12 273', l: 'bir yilda ötkazilgan maʼnaviy-maʼrifiy, sport va boşqa tadbirlar' },
  { v: '1,87 mln', l: 'yoş loyihalarga qamrab olindi' },
  { v: '81 198', l: 'yoş harbiy xizmatçi kuç tuzilmalaridagi taşkilotlarda' },
  { v: '36', l: 'taşkilot Ittifoq tizimida faoliyat yuritadi' },
]

/**
 * Mukofot va imtiyozlar. Faktlar rasmiy manbalar böyiça tekşirilgan (2026-yil noyabr):
 * “Özbekiston belgisi” — PF-1822 (1997), Nizom PF-3290 (2003); tavsiyanoma — VM 914-son qaror (2017, amaldagi tahriri);
 * harbiy xizmatdan keyingi kontrakt — Markaziy Kengaş amaliyoti (35 foiz); kafillik — Oliy sud bilan memorandum;
 * “Mard öğlon” — PQ-3402 (2017), hozir nomzodlarni Yoşlar işlari agentligi taqdim etadi (PF-226, 2024);
 * “Kelajak bunyodkori” — ÖRQ-451 (2017).
 * `group`: `ittifoq` — Ittifoqning özi beradigan imtiyozlar; `davlat` — Ittifoq taklifi bilan taʼsis etilgan davlat mukofotlari.
 */
/** `num`/`numL` — kartadagi asosiy raqam va uning izohi */
export type Privilege = { t: string; text: string; fact: string; img: string; badge?: boolean; group: 'ittifoq' | 'davlat'; num: string; numL: string; medal?: string }

/**
 * Davlat mukofotlari bilan taqdirlangan yoşlar — kollaj (Prezident matbuot xizmati, “Yoşlar kuni” marosimlari, 2023–2026):
 * markazda “Yangi Özbekistonni yoşlar quradi” umumiy surati, atrofida mukofot topşiriş lahzalari.
 * Mukofot va nişon tasvirlari: buyurtmaçi taqdim etgan suratlar (1567×2000). Davlat mukofotlari kartalarida ramka
 * suratning özi nisbatida — surat töliq körinadi.
 */
export const AWARDEES = {
  center: '/img/ittifoq/mukofotlanganlar/umumiy.webp',
  around: Array.from({ length: 14 }, (_, i) => `/img/ittifoq/mukofotlanganlar/${String(i + 1).padStart(2, '0')}.webp`),
}

export const PRIVILEGES: Privilege[] = [
  {
    group: 'ittifoq',
    t: '“Özbekiston belgisi” kökrak nişoni',
    text: 'Vatan şaʼnini yuksaltirişga munosib hissa qöşgan faol yoşlar Ittifoq Markaziy Kengaşining qarori bilan şu nişon bilan taqdirlanadi.',
    fact: '1997-yilda taʼsis etilgan',
    num: '1997',
    numL: 'taʼsis etilgan yil',
    img: '/img/ittifoq/nishon-ozbekiston-belgisi.webp',
    badge: true,
  },
  {
    group: 'ittifoq',
    t: 'Oliy taʼlimga tavsiyanoma',
    text: 'Ittifoq tizimidagi sardorlar, yönaliş yetakçilari va tizimda ikki yil faoliyat yuritgan yoşlar Ittifoq tavsiyanomasi bilan doimiy yaşaş joyidagi oliy taʼlim taşkilotining pedagogika yönalişlariga test sinovlarisiz, davlat granti asosida qabul qilinadi.',
    fact: 'Har yili har bir hududdan 1 nafar',
    num: '1 nafar',
    numL: 'har yili har bir hududdan',
    img: '/img/ittifoq/kitobxonlar.jpg',
  },
  {
    group: 'ittifoq',
    t: 'Harbiy xizmatni ötagan talabalarning kontrakt tölovi',
    text: 'Muddatli harbiy xizmatni ötab, harbiy qism qömondonligining tavsiyanomasi bilan oliy taʼlim taşkilotiga tölov-kontrakt asosida qabul qilingan talabalarning kontrakt tölovi qisman Ittifoq tomonidan tölab beriladi.',
    fact: 'Kontrakt summasining 35 foizi',
    num: '35%',
    numL: 'kontrakt summasidan',
    img: '/img/ittifoq/harbiy.jpg',
  },
  {
    group: 'ittifoq',
    t: 'Ittifoq kafilligi',
    text: 'Jinoyat sodir etib, sudda javob berayotgan yoş Ittifoq kafilligi bilan ozodlikdan mahrum etilmasligi mumkin. Bunda Ittifoq bir yil davomida uning xulq-atvorini kuzatib boradi va jamiyat uçun foydali işlarga jalb etadi.',
    fact: 'Oliy sud bilan memorandum asosida',
    num: '1 yil',
    numL: 'xulq-atvor kuzatiladigan muddat',
    img: '/img/ittifoq/seminar.jpg',
  },
  {
    group: 'davlat',
    t: '“Mard öğlon” davlat mukofoti',
    medal: '/img/ittifoq/medal-mard-oglon.webp',
    text: 'Ittifoq Markaziy Kengaşining taklifi bilan 2017-yilda taʼsis etilgan. Mukofot fan, taʼlim, madaniyat, sport, harbiy xizmat va boşqa sohalarda yuksak natijalarga erişgan yigitlarga “Yoşlar kuni” arafasida topşiriladi.',
    fact: 'Hozirgi vaqtda nomzodlar Yoşlar işlari agentligi tomonidan taqdim etiladi',
    num: '2 nafar',
    numL: 'har yili har bir hududdan',
    img: '/img/ittifoq/yetakchilar.jpg',
  },
  {
    group: 'davlat',
    t: '“Kelajak bunyodkori” medali',
    medal: '/img/ittifoq/medal-kelajak-bunyodkori.webp',
    text: 'Ittifoq taklifi bilan 2017-yilda taʼsis etilgan. Medal öqiş, mehnat va jamoat işlarida faollik körsatgan yoşlarga Prezident farmoni bilan beriladi.',
    fact: '2017-yildan beri beriladi',
    num: '14–30',
    numL: 'yoşdagi yoşlar taqdirlanadi',
    img: '/img/ittifoq/volontyorlar.jpg',
  },
]

export const INTL = {
  text: 'Ittifoq xalqaro taşkilotlar va xorijiy davlatlarning yoşlar taşkilotlari bilan hamkorlik qiladi. Hamkorlik şakllari:',
  assoc: 'Ittifoq qoşida Özbekiston yoşlari umumjahon assotsiatsiyasi taşkil etilgan. Assotsiatsiya xorijda öqiyotgan va işlayotgan özbekistonlik yoşlarni qöllab-quvvatlaydi.',
  facts: [
    { v: '20+', l: 'hamkor mamlakat' },
    { v: '25', l: 'davlatda assotsiatsiya vakillari' },
    { v: '100 000', l: 'yoş xalqaro loyihalarda' },
  ] as Stat[],
  forms: ['Forumlar va sammitlar', 'Amaliyot va almaşinuv dasturlari', 'Uçraşuvlar va konferensiyalar'],
  projects: ['Milliy dialog', 'Yoş diplomatlar', 'Turkiy dunyo yoşlar harakati', 'BMT modeli', 'Isteʼdodli yoşlar', 'Taʼlim Expo', 'TDT modeli', 'Xorijdagi vatandoşlar biznes marafoni'],
  partners: '/img/ittifoq/hamkorlar.png',
  flags: '/img/ittifoq/bayroqlar.png',
}

export const IMG = {
  team: '/img/ittifoq/jamoa-prezident.jpg',
  /** Hero kollaji: UzA (uza.uz) suratlaridan yiğilgan, 11 ta yoş */
  collage: '/img/ittifoq/hero-kollaj.jpg',
  /** Iqtibos uçun: Prezident matbuot xizmati suratlari */
  presYouth1: '/img/ittifoq/prezident-yoshlar-1.jpg',
  presYouth2: '/img/ittifoq/prezident-yoshlar-2.jpg',
  collageSm: '/img/ittifoq/hero-kollaj-sm.jpg',
  leaders: '/img/ittifoq/yetakchilar.jpg',
  seminar: '/img/ittifoq/seminar.jpg',
  girls: '/img/ittifoq/kitob-qizlar.jpg',
  readers: '/img/ittifoq/kitobxonlar.jpg',
  books: '/img/ittifoq/kitoblar-olami.jpg',
  volunteers: '/img/ittifoq/volontyorlar.jpg',
}

/* ---------------- Yoşlar markazlari ---------------- */

export const PALACE = {
  name: 'Yoşlar ijod saroyi',
  org: 'Özbekiston yoşlar ittifoqi',
  text: 'Toşkent şahridagi Yoşlar ijod saroyida xalqimizning sanʼat merosini namoyiş etuvçi körgazmalar, ijodiy tadbirlar va uçraşuvlar ötkaziladi.',
  features: ['“Kitoblar olami” kitobxonlik maydoni', 'Podkast studiyasi', 'Kovorking va uçraşuv xonalari', 'Körgazmalar va ijodiy tadbirlar'],
  img: '/img/markazlar/ijod-saroyi.jpg',
  gallery: ['/img/markazlar/ijod-kitoblar-olami.jpg', '/img/markazlar/ijod-podkast.jpg', '/img/markazlar/ijod-davr-bizniki.jpg'],
}

/* Toşkent şahar markazi: matn NAMUNA — manzil, ish vaqti va rasmiy tavsif kelgaçi almaştiriladi */
export const CITY_CENTRE = {
  name: 'Toşkent şahar Yoşlar markazi',
  text: 'Toşkent şahridagi Yoşlar markazida yoşlar uçun tadbirlar, tögaraklar va uçraşuvlar ötkaziladi.',
  facts: ['Tadbir va uçraşuvlar zali', 'Tögaraklar va örganiş xonalari', 'Yoşlar taşabbuslarini qöllab-quvvatlaş'],
  img: '/img/markazlar/toshkent-shahar.jpg',
}

export type Centre = { region: string; img: string }

/** Toşkent şahri birinçi, keyin viloyatlar */
export const CENTRES: Centre[] = [
  { region: 'Toşkent şahri', img: '/img/markazlar/toshkent-shahar.jpg' },
  { region: 'Toşkent viloyati', img: '/img/markazlar/toshkent-viloyati.jpg' },
  { region: 'Qoraqalpoğiston Respublikasi', img: '/img/markazlar/qoraqalpogiston.jpg' },
  { region: 'Andijon viloyati', img: '/img/markazlar/andijon.jpg' },
  { region: 'Buxoro viloyati', img: '/img/markazlar/buxoro.jpg' },
  { region: 'Jizzax viloyati', img: '/img/markazlar/jizzax.jpg' },
  { region: 'Qaşqadaryo viloyati', img: '/img/markazlar/qashqadaryo.jpg' },
  { region: 'Navoiy viloyati', img: '/img/markazlar/navoiy.jpg' },
  { region: 'Namangan viloyati', img: '/img/markazlar/namangan.jpg' },
  { region: 'Samarqand viloyati', img: '/img/markazlar/samarqand.jpg' },
  { region: 'Sirdaryo viloyati', img: '/img/markazlar/sirdaryo.jpg' },
  { region: 'Surxondaryo viloyati', img: '/img/markazlar/surxondaryo.jpg' },
  { region: 'Farğona viloyati', img: '/img/markazlar/fargona.jpg' },
  { region: 'Xorazm viloyati', img: '/img/markazlar/xorazm.jpg' },
]

/* ---------------- Tuzilma, aʼzolik, rasmiy maʼlumotlar ---------------- */

export type Organ = { t: string; d: string }

/**
 * Taşkiliy tuzilma — Ittifoq Ustavi asosida (5-bob “Rahbar organlar”, 6-bob “Tuzilma”, 1-bob tamoyillar).
 * Raqam va muddatlar Ustavdagi kabi; matnni özgartirişda Ustavga solişturing.
 */
export type Body = { t: string; d: string; meta: string[] }

export const STRUCTURE = {
  /** 5.1–5.7: rahbar organlar */
  qurultoy: {
    t: 'Qurultoy',
    d: 'Ittifoqning oliy rahbar organi. Ustavni tasdiqlaydi, Markaziy Kengaş va Markaziy nazorat-taftiş komissiyasini saylaydi, ularning hisobotlarini tinglaydi.',
    meta: ['Hisobot Qurultoyi — yilda kamida bir marta', 'Vakolatli Qurultoy — 5 yilda kamida bir marta', 'Delegatlar hududiy kengaşlar konferensiyalarida saylanadi'],
  } as Body,
  council: {
    t: 'Markaziy Kengaş',
    d: 'Qurultoylar oraliğida Ittifoqqa rahbarlik qiladi: Qurultoy qarorlari ijrosini taʼminlaydi, yillik iş reja va byudjetni tasdiqlaydi.',
    meta: ['Kamida 61 kişi', '5 yil muddatga', 'Har hududdan kamida 2 nafar yoş vakil'],
  } as Body,
  chair: {
    t: 'Markaziy Kengaş raisi',
    d: 'Markaziy Kengaş, Ijroiya qömitasi va apparat faoliyatiga rahbarlik qiladi.',
    meta: ['Qurultoy 5 yilga saylaydi'],
  } as Body,
  exec: {
    t: 'Ijroiya qömitasi',
    d: 'Ittifoq faoliyatini taşkil etiş böyiça tezkor qarorlar qabul qiladi, hududiy kengaşlar faoliyatini muvofiqlaştiradi.',
    meta: ['Markaziy Kengaş aʼzolaridan', 'Kamida 15 kişi', '5 yil muddatga'],
  } as Body,
  audit: {
    t: 'Markaziy nazorat-taftiş komissiyasi',
    d: 'Ittifoqning markaziy nazorat organi: byudjet ijrosi va moliyaviy-xöjalik faoliyatini tekşiradi.',
    meta: ['Kamida 11 kişi', '5 yil muddatga', 'Qurultoyga hisobot beradi'],
  } as Body,
  /** 6.1–6.3: taşkiliy tuzilma (yuqoridan pastga) */
  levels: [
    {
      t: 'Hududiy kengaşlar',
      d: 'Qoraqalpoğiston Respublikasi, viloyatlar va Toşkent şahrida işlaydi. Yuqori organi — Konferensiya, u Kengaş, rais va nazorat-taftiş komissiyasini saylaydi.',
      meta: ['Konferensiya 2,5 yilda kamida bir marta', 'Kengaş kamida 21 kişi'],
    },
    {
      t: 'Mahalliy kengaşlar',
      d: 'Maʼmuriy-hududiy bölinişga muvofiq tuziladi. Yuqori organi — Konferensiya; boşlanğiç taşkilotlar şu yerga delegat saylaydi.',
      meta: ['Konferensiya 2,5 yilda kamida bir marta', 'Kengaş yiğilişi 6 oyda kamida bir marta'],
    },
    {
      t: 'Boşlanğiç taşkilotlar',
      d: 'Öqiş, iş va xizmat joylarida tuziladi. Yuqori organi — aʼzolarning Umumiy yoki Hisobot-saylov yiğilişi; taşkilotga aʼzolar saylagan yetakçi rahbarlik qiladi.',
      meta: ['Kamida 5 nafar aʼzo', 'Yetakçi 2,5 yilga saylanadi', '100 dan ortiq aʼzoda — kamida 7 kişilik Kengaş'],
    },
  ] as Body[],
  /** 1-bob: faoliyat tamoyillari */
  principles: ['Ixtiyoriylik', 'Qonuniylik', 'Oşkoralik', 'Aʼzolarning teng huquqliligi', 'Özini özi boşqariş'],
}

/**
 * Aʼzolikka qabul qiliş tartibi — Ustavning IV bobi (“Ittifoqqa aʼzolik”) asosida.
 * `band` — Ustavdagi band raqami (Ustav sahifasidagi #band-4.2 kabi havolaga ulanadi).
 */
export const JOIN = {
  /** jismoniy şaxslar uçun tartib (4.1, 4.2, 4.4, 4.5-bandlar) */
  steps: [
    {
      band: '4.2',
      t: 'Belgilangan talablarga muvofiqlik',
      d: '14 yoşga tölgan va 30 yoşdan oşmagan, Ittifoq maqsadini qöllab-quvvatlaş istagini bildirgan Özbekiston Respublikasi fuqarosi yoki Özbekistonda muntazam yaşab kelayotgan fuqaroligi bölmagan şaxs aʼzo bölişi mumkin.',
    },
    {
      band: '4.1',
      t: 'Ariza taqdim etiş',
      d: 'Aʼzolikka qabul qiliniş uçun öqiş yoki iş joyidagi Ittifoq boşlanğiç taşkilotiga tegişli mazmundagi ariza taqdim etiladi.',
    },
    {
      band: '4.4',
      t: 'Boşlanğiç taşkilotda körib çiqiş',
      d: 'Aʼzolikka qabul qiliş boşlanğiç taşkilotning Umumiy yiğilişi, Kengaş şakllantirilgan bölsa — boşlanğiç taşkilot Kengaşining yiğilişi tomonidan amalga oşiriladi.',
    },
    {
      band: '4.5',
      t: 'Qaror yakuniy hisoblanadi',
      d: 'Boşlanğiç taşkilotning qabul qiliş töğrisidagi qarori yakuniy hisoblanadi va Ittifoqning yuqori organlari tomonidan tasdiqlaniş talab qilinmaydi.',
    },
  ],
  /** 4.10-band */
  rights: [
    'Umumiy yiğilişlar, konferensiyalar, Qurultoy va rahbar organlar yiğilişlarida öz fikrini erkin ifoda etiş',
    'Şaxsan yoki vakili orqali saylanadigan organlar qarorlarini işlab çiqişda iştirok etiş',
    'Saylanadigan rahbar organlar va nazorat-taftiş organlariga saylaş va saylaniş',
    'Ittifoq organlari faoliyati töğrisida maʼlumot oliş',
    'Ittifoqning har qanday rahbar organiga ariza va takliflar bilan murojaat etiş',
  ],
  /** 4.11-band */
  duties: [
    'Ittifoqning Ustav maqsadlarini amalga oşirişda qatnaşiş',
    'Yoşlar örtasida va jamiyatda Ittifoqning taʼsiri va nufuzini oşiriş',
    'Rahbar organlar, boşlanğiç taşkilot umumiy yiğilişlari va Kengaşi qarorlarini bajariş',
    'Boşlanğiç taşkilot faoliyati va Ittifoqning barça yönalişlarida faol iştirok etiş',
  ],
  /** 4.7, 4.8-bandlar */
  legal: {
    d: 'Yoşlar sohasidagi nodavlat notijorat taşkilotlari, korxona, muassasa va taşkilotlar, markazlar, klublar hamda taʼsis hujjatlari Ittifoq Ustaviga zid bölmagan boşqa yuridik şaxslar aʼzo bölişi mumkin.',
    how: 'Qabul qiliş Ittifoq Markaziy Kengaşi Ijroiya qömitasining qarori asosida amalga oşiriladi.',
  },
  /** 4.3-band */
  note: 'Ittifoqning rahbar organlariga saylangan aʼzolarga 30 yoşlik çeklov qöllanilmaydi.',
  /** 4.6-band: jismoniy şaxslar aʼzoligining bekor qilinişi */
  ends: [
    'aʼzoning arizasiga köra',
    'aʼzoning yoşi 30 dan oşgaç (rahbar organlarga saylanganlar bundan mustasno)',
    'Ustavga zid xatti-harakatlarga yöl qöyilganda',
    'boşqa davlat fuqaroligi olinganda',
    'sud tomonidan muomalaga layoqatsiz deb topilganda yoki vafot etganda',
    'Ittifoq faoliyati tugatilganda',
  ],
  cta: { t: 'Ittifoqqa aʼzo böliş', d: 'Ariza öqiş yoki iş joyidagi Ittifoq boşlanğiç taşkilotiga taqdim etiladi. Arizani saytda onlayn yuboriş ham mumkin: Kengaş uni tegişli boşlanğiç taşkilotga yetkazadi.' },
}

/** Rasmiy maʼlumotlar */
export const OFFICIAL = {
  rows: [
    ['Töliq nomi', 'Özbekiston yoşlar ittifoqi'],
    ['Ruşça', 'Союз молодежи Узбекистана'],
    ['Inglizça', 'Uzbekistan Youth Union'],
    ['Taşkiliy-huquqiy şakli', 'Nodavlat notijorat taşkilot (ittifoq)'],
    ['Taşkil etilgan sana', '2017-yil 30-iyun'],
    ['Markaziy Kengaş manzili', 'Toşkent şahri, Alişer Navoiy köçasi, 11-uy'],
  ] as [string, string][],
}

/* ---------------- PF-5106: ustuvor yönalişlar ---------------- */

/**
 * Prezidentning 2017-yil 5-iyuldagi PF-5106-son Farmoni, 3-band — Ittifoq faoliyatining 12 ta ustuvor yönalişi
 * (asl matn qisqartirib, maʼnosi saqlangan holda berilgan). Manba: https://lex.uz/docs/-3255680
 */
export const PRIORITIES = {
  /** Har bir yönalişning qisqa nomi (items bilan bir xil tartibda) */
  titles: [
    'Yoşlarga oid davlat siyosatini amalga oşirişda ijtimoiy şeriklik',
    'Yoşlarning huquq va qonuniy manfaatlarini himoya qiliş',
    'Demokratik islohotlarda yoşlar faolligini oşiriş',
    'Yoşlarning kasb egallaşi va bandligiga kömaklaşiş',
    'Kitobxonlikni rivojlantiriş va yoşlar madaniyatini yuksaltiriş',
    'Soğlom turmuş tarzi va oila institutini mustahkamlaş',
    'Yoşlarning böş vaqtini mazmunli taşkil etiş',
    'Ijtimoiy himoyaga muhtoj yoşlarni qöllab-quvvatlaş',
    'Yoşlar örtasida huquqbuzarliklar profilaktikasi',
    'Yoş rahbar kadrlar zaxirasini şakllantiriş',
    'Yoşlar siyosati sohasida xalqaro hamkorlikni rivojlantiriş',
    'Yoşlar bilan işlaşda ğoyaviy-uslubiy yordam körsatiş',
  ],
  items: [
    'Yoşlarga oid davlat siyosatini amalga oşirişda davlat organlari, nodavlat notijorat taşkilotlari va fuqarolik jamiyati institutlari bilan samarali hamkorlikni taʼminlovçi, “Yoşlar — kelajak bunyodkori” şiori ostida professional işlaydigan tuzilmaga aylaniş.',
    'Yoşlarning huquqlari, erkinliklari va qonuniy manfaatlarini himoya qiliş, ularni milliy va umuminsoniy qadriyatlarga hurmat, Vatanga muhabbat ruhida tarbiyalaş, turli mafkuraviy tahdidlardan asraş.',
    'Demokratik islohotlarda yoşlar faolligini oşiriş, maʼnaviyati yuksak, mustaqil fikrlaydigan, el-yurt manfaati yölida bor kuçini safarbar qiladigan taşabbuskor yoşlar safini kengaytiriş.',
    'Yoşlarning zamonaviy kasblarni egallaşi, bandligi, kiçik biznes va tadbirkorlikka jalb etilişi, intellektual va ijodiy salohiyatini röyobga çiqarişiga kömaklaşiş.',
    'Ilmiy va badiiy kitoblarni, jumladan elektron asarlarni öqişga qiziqişni oşiriş; huquqiy, ekologik, tibbiy va axborot texnologiyalari madaniyatini yuksaltiriş orqali yot ğoyalarga qarşi immunitetni şakllantiriş.',
    'Soğlom turmuş tarzi va oila muqaddasligi ğoyalarini tarğib qiliş, erta turmuş quriş va yoş oilalar ajralişining oldini oliş.',
    'Yoşlarning böş vaqtini mazmunli taşkil etiş: sport va jismoniy tarbiya, ijodiy tögaraklar, xorijiy tillar va boşqa öquv kurslariga keng jalb etiş.',
    'Yoş oilalarni, imkoniyati çeklangan va ijtimoiy himoyaga muhtoj yoşlarni maʼnaviy va moddiy qöllab-quvvatlaş, ular uçun munosib uy-joy va şaroit yaratiş.',
    'Yoşlar örtasida huquqbuzarlik va jinoyatçilikning barvaqt oldini oliş va profilaktika işlarida faol iştirok etiş.',
    'Bilimli, taşabbuskor, halol va fidoyi yoş rahbar kadrlarni tarbiyalaş, zaxirasini yaratiş va masʼul lavozimlarga tavsiya etiş.',
    'Yoşlar siyosati sohasida xalqaro hamkorlikni rivojlantiriş, xorijda tahsil olayotgan va mehnat qilayotgan yoşlarning huquq va manfaatlarini himoya qiliş.',
    'Davlat organlari, nodavlat notijorat taşkilotlari va fuqarolik jamiyati institutlariga yoşlar bilan işlaşda ğoyaviy-uslubiy yordam beriş.',
  ],
}

/* ---------------- Ittifoq taʼsisçiligidagi taşkilotlar ---------------- */

/** g — faoliyat sohasi (guruhlab körsatiş uçun) */
export type Org = { t: string; d: string; logo?: string; g: 'talim' | 'ijod' | 'ijtimoiy' | 'iqtisod' }

export const ORG_GROUPS: { key: Org['g']; t: string }[] = [
  { key: 'talim', t: 'Taʼlim va ilm-fan' },
  { key: 'ijod', t: 'Ijod va madaniyat' },
  { key: 'ijtimoiy', t: 'Ijtimoiy himoya va huquq' },
  { key: 'iqtisod', t: 'Tadbirkorlik va xalqaro aloqalar' },
]

export const ORGS = {
  lead: 'Ittifoq tizimida 36 ta taşkilot faoliyat yuritadi, jumladan 19 ta nodavlat notijorat taşkilot va 14 ta tijorat taşkiloti. Ularda 228 kişi işlaydi.',
  ngos: [
    { t: 'Yetakçilar akademiyasi', g: 'talim', d: 'Mahalla, taʼlim muassasalari, vazirlik va idoralardagi yoşlar yetakçilarini öqitiş hamda ularning faoliyati samaradorligini oşiriş bilan şuğullanadi.', logo: '/img/tashkilotlar/yetakchilar.png' },
    { t: 'Özbekiston quvnoqlar va zukkolar assotsiatsiyasi', g: 'ijod', d: 'Yoşlarning intellektual salohiyatini rivojlantiradi, iqtidorli yoşlarni aniqlaş va ularning isteʼdodini röyobga çiqarişga kömaklaşadi.', logo: '/img/tashkilotlar/qvz.png' },
    { t: 'Prezidentning 5 taşabbus loyiha ofisi', g: 'ijod', d: 'Yoşlarning musiqa, tasviriy sanʼat, adabiyot va teatrga qiziqişini oşiriş hamda kitobxonlikni tarğib qiliş işlarini muvofiqlaştiradi.', logo: '/img/tashkilotlar/tashabbus5.png' },
    { t: 'Yoşlar tadbirkorligini qöllab-quvvatlaş markazi', g: 'iqtisod', d: 'Yoş tadbirkorlarni qöllab-quvvatlaydi, biznes ğoyalarini amalga oşirişda uslubiy va amaliy yordam körsatadi.', logo: '/img/tashkilotlar/tadbirkorlik.png' },
    { t: 'Respublika yoş ijodkorlar kengaşi', g: 'ijod', d: 'Hududlardagi isteʼdodli yoş ijodkorlarni aniqlaş va ularning ijodiy faoliyatini qöllab-quvvatlaş bilan şuğullanadi.', logo: '/img/tashkilotlar/ijodkorlar.png' },
    { t: 'Özbekiston volontyorlari assotsiatsiyasi', g: 'ijtimoiy', d: 'Volontyorlik faoliyatini taşkil etadi, fuqarolik taşabbuslarini rivojlantiradi hamda volontyorlarning huquq va manfaatlarini himoya qiladi.', logo: '/img/tashkilotlar/volontyorlar.png' },
    { t: 'Özbekiston yoşlari umumjahon assotsiatsiyasi', g: 'iqtisod', d: 'Xorijda taʼlim olayotgan va mehnat faoliyatini amalga oşirayotgan özbekistonlik yoşlarga huquqiy va ijtimoiy kömak körsatadi.', logo: '/img/tashkilotlar/umumjahon.png' },
    { t: 'Loyihalar boşqaruvi markazi', g: 'iqtisod', d: 'Maʼnaviy-maʼrifiy va ijtimoiy mavzulardagi axborot mahsulotlari: maqolalar, eşittirişlar, videoroliklar va filmlar tayyorlaydi.', logo: '/img/tashkilotlar/mpmg.png' },
    { t: '“Yangi avlod forumi” bolalar ijodiyoti markazi', g: 'ijod', d: 'Maktabdan taşqari taʼlimni rivojlantiradi, bolalarning madaniyat va sanʼat sohasidagi qobiliyatlarini qöllab-quvvatlaydi.', logo: '/img/tashkilotlar/yangiavlod.png' },
    { t: 'Respublika yoşlar markazi', g: 'ijtimoiy', d: 'Hududlarda yoşlarning savodxonligini oşiradi, kasb-hunar va ijodiy yönalişlardagi öquv tögaraklarini taşkil etadi.', logo: '/img/tashkilotlar/yoshlarmarkazi.png' },
    { t: 'Ijtimoiy-huquqiy media markaz', g: 'ijtimoiy', d: 'Yoşlarning huquqiy ongi va madaniyatini yuksaltirişga qaratilgan media mahsulotlarni tayyorlaydi.', logo: '/img/tashkilotlar/mediamarkaz.png' },
    { t: 'Özbekiston yoş fermerlari kengaşi', g: 'iqtisod', d: 'Yoşlar örtasida fermerlik faoliyatini tarğib qiladi, köp tarmoqli fermer xöjaliklarini rivojlantirişga kömaklaşadi.', logo: '/img/tashkilotlar/fermerlar.png' },
    { t: 'Imkoniyati çeklangan yoşlar va bolalar markazi', g: 'ijtimoiy', d: 'Imkoniyati çeklangan yoşlar va bolalarga teng imkoniyatlar yaratadi, ularga huquqiy, psixologik va pedagogik yordam körsatadi.', logo: '/img/tashkilotlar/imkoniyat.png' },
    { t: 'Yoşlar ijod saroyi', g: 'ijod', d: 'Sanʼat merosini namoyiş etuvçi körgazmalar, ijodiy tadbirlar va uçraşuvlar ötkaziladigan maskan.', logo: '/img/tashkilotlar/ijodsaroyi.png' },
    { t: 'Yoş huquqşunoslar kengaşi', g: 'ijtimoiy', d: 'Sud-huquq islohotlarida yoşlarning iştirokini kengaytiradi, yoşlarning huquq va qonuniy manfaatlarini himoya qiladi.', logo: '/img/tashkilotlar/huquqshunoslar.png' },
    { t: 'Respublika yoş olimlar kengaşi', g: 'talim', d: 'Ilmiy tadqiqot olib borayotgan yoş olimlar va iqtidorli yoşlarni moddiy va maʼnaviy jihatdan qöllab-quvvatlaydi.', logo: '/img/tashkilotlar/olimlar.png' },
    { t: 'Yoş dizaynerlar kengaşi', g: 'ijod', d: 'Yoş dizaynerlarning işlanmalarini ommalaştiradi, ijodiy yoşlar jamoasini şakllantiradi.', logo: '/img/tashkilotlar/dizaynerlar.png' },
    { t: 'Yoş kinoijodkorlar kengaşi', g: 'ijod', d: 'Isteʼdodli yoş kinoijodkorlarni aniqlaydi va ularning loyihalarini amalga oşirişga kömaklaşadi.', logo: '/img/tashkilotlar/kino.png' },
    { t: 'Tibbiyot oliy öquv yurtlari talabalari assotsiatsiyasi', g: 'talim', d: 'Yoşlarning tibbiy savodxonligini oşiradi, soğliqni saqlaş sohasiga xorijiy grantlarni jalb etişga kömaklaşadi.', logo: '/img/tashkilotlar/tibbiyot.png' },
  ] as Org[],
  companies: [
    '“Yoşlar” teleradiokanali',
    '“Ozod yurt tölqinlari” telekanali',
    '“Yoşlar ovozi” radiosi',
    '“Yoşlar ovozi” gazetasi',
    '“Yoş kuç” jurnali',
    'Yoşlar naşriyot uyi',
    '“Kitob olami” kovorking va kitob dökonlari',
    'Yoşlar turizm agentligi',
    'Yoşlar oromgohi',
    '“Şafran” toğ kurort majmuasi',
    'Motivatsion kontent studiyasi',
  ],
}

/* ---------------- Media, naşriyot va xizmat taşkilotlari (taqdimotdan) ---------------- */

export type Company = { t: string; d: string; share: string; logo: string; kind: 'Media' | 'Naşriyot' | 'Xizmat' }

/** Ittifoq uluşi bölgan, faoliyat yuritayotgan taşkilotlar. “Uluş” — Ittifoq Markaziy Kengaşining ustav fondidagi uluşi */
export const COMPANIES: Company[] = [
  { kind: 'Media', t: '“Yoşlar” teleradiokanali', d: 'Yoşlarga möljallangan teleradiodasturlar tayyorlaydi va efirga uzatadi.', share: '50%', logo: '/img/tashkilotlar/c-yoshlartv.png' },
  { kind: 'Media', t: '“Ozod yurt tölqinlari” (My5)', d: 'Teledasturlar tayyorlaydi va ularni efirga uzatadi.', share: '61%', logo: '/img/tashkilotlar/c-ozodyurt.png' },
  { kind: 'Media', t: '“Yoşlar ovozi” radiosi', d: 'Radioeşittirişlar tayyorlaydi va efirga uzatadi.', share: '49%', logo: '/img/tashkilotlar/c-ovoziradio.png' },
  { kind: 'Media', t: 'Motivatsion kontent', d: 'Ijtimoiy tarmoqlar uçun yoşlarga möljallangan axborot mahsulotlarini tayyorlaydi.', share: '40%', logo: '/img/tashkilotlar/c-motivatsion.png' },
  { kind: 'Naşriyot', t: '“Yoşlar ovozi” gazetasi', d: 'Gazeta naşr etadi va uni obunaçilarga yetkazadi.', share: '100%', logo: '/img/tashkilotlar/c-ovozigazeta.png' },
  { kind: 'Naşriyot', t: '“Yoş kuç” jurnali', d: 'Jurnal naşr etadi.', share: '100%', logo: '/img/tashkilotlar/c-yoshkuch.png' },
  { kind: 'Naşriyot', t: 'Yoşlar naşriyot uyi', d: 'Kitoblar va boşqa bosma mahsulotlarni naşr etadi.', share: '100%', logo: '/img/tashkilotlar/c-nashriyot.png' },
  { kind: 'Xizmat', t: '“Kitob olami”', d: 'Kitob savdosini amalga oşiradi va kovorking xizmatlarini körsatadi.', share: '100%', logo: '/img/tashkilotlar/c-kitobolami.png' },
  { kind: 'Xizmat', t: 'Yoşlar turizm agentligi', d: 'Turistik xizmatlar körsatadi, sayohatlar uçun joylarni oldindan band qiladi.', share: '100%', logo: '/img/tashkilotlar/c-turizm.png' },
  { kind: 'Xizmat', t: 'Yoşlar oromgohi', d: 'Yoşlar uçun soğlomlaştiriş va dam oliş xizmatlarini körsatadi.', share: '100%', logo: '/img/tashkilotlar/c-oromgoh.png' },
  { kind: 'Xizmat', t: '“Şafran” toğ kurort majmuasi', d: 'Toğ kurortida soğlomlaştiriş va dam oliş xizmatlarini körsatadi.', share: '100%', logo: '/img/tashkilotlar/c-shafran.png' },
]
