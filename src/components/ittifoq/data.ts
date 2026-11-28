/**
 * "Özbekiston yoşlar ittifoqi" sahifasi mazmuni.
 * Manba: "Özbekiston yoşlar ittifoqining faoliyati töğrisida" taqdimoti (2026).
 * Keyinçalik admin paneldan (Payload) boşqariladi.
 */

/** Ittifoq haqida (motto — sahifa boşidagi şior) */
export const WHO = {
  paras: [
    'O‘zbekiston yoshlar ittifoqi — mamlakat yoshlarini birlashtiruvchi nodavlat notijorat tashkilot. U 2017-yil 30-iyunda tashkil etilgan. Shu kun har yili butun mamlakatda “Yoshlar kuni” sifatida nishonlanadi.',
    'Ittifoqqa 14 yoshga to‘lgan va 30 yoshdan oshmagan O‘zbekiston Respublikasi fuqarolari hamda O‘zbekistonda muntazam yashab kelayotgan fuqaroligi bo‘lmagan shaxslar ixtiyoriy ravishda a’zo bo‘lishi mumkin. Ittifoq faoliyati ixtiyoriylik, qonuniylik, oshkoralik, a’zolarning teng huquqliligi va o‘zini o‘zi boshqarish tamoyillariga asoslanadi.',
  ],
  motto: 'Yoshlar — kelajak bunyodkori!',
}

/** Maqsadimiz (katta sarlavha) */
/**
 * Maqsadimiz — Ustavning 2.1-bandi va Prezidentning 2017-yil 5-iyuldagi PF-5106-son Farmoni asosida, bitta jumlada.
 * Butun jumla bir xil rangda (bitta maqsad — qismlarga ajratilmaydi).
 */
export const MISSION = {
  text: 'Yoshlarning huquq va qonuniy manfaatlarini himoya qilish, ularni mamlakatdagi islohotlarga faol jalb etish, yigit-qizlarning ma’naviy va kasbiy saviyasini yuksaltirish hamda intellektual va ijodiy salohiyatini ro‘yobga chiqarishga ko‘maklashish.',
}

/** y — yil (katta raqam), d — kun va oy (bölsa), t — matn */
export type Milestone = { y: string; d?: string; t: string }

/** Qisqa tarix */
export const HISTORY: Milestone[] = [
  { y: '2001', t: '“Kamolot” yoshlar ijtimoiy harakati tashkil etildi.' },
  { y: '2017', d: '30-iyun', t: 'Toshkentdagi Simpoziumlar saroyida “Kamolot” yoshlar ijtimoiy harakatining IV qurultoyi bo‘lib o‘tdi. Qurultoy delegatlari “Kamolot” negizida O‘zbekiston yoshlar ittifoqini tuzish taklifini qo‘llab-quvvatladi.' },
  { y: '2017', d: '5-iyul', t: 'O‘zbekiston yoshlar ittifoqi faoliyatining ustuvor yo‘nalishlari belgilandi, 30-iyun “Yoshlar kuni” deb e’lon qilindi.' },
  { y: 'Bugun', t: 'Ittifoqning Qoraqalpog‘iston Respublikasi, barcha viloyatlar va Toshkent shahrida hududiy kengashlari, ta’lim muassasalari, korxonalar va harbiy qismlarda boshlang‘ich tashkilotlari faoliyat yuritadi.' },
]

export const QUOTE = {
  text: 'Yoshlik — g‘animat, vaqt — g‘animat, fursat borida otni qamchilang! Davlatimiz, xalqimiz yaratib berayotgan imkoniyatlarning qadriga yeting! Dunyoga o‘z so‘zingizni ayting!',
  author: 'Shavkat Mirziyoyev',
  role: 'O‘zbekiston Respublikasi Prezidenti',
}

export type Stat = { v: string; l: string }

export const STATS: Stat[] = [
  { v: '59 974', l: 'yoshlar yetakchilari va koordinatorlari' },
  { v: '1 489', l: 'ta’lim muassasalari va korxonalardagi boshlang‘ich tashkilotlar' },
  { v: '14', l: 'hududda Yoshlar markazi doimiy faoliyat yuritadi' },
  { v: '20+', l: 'mamlakat bilan xalqaro hamkorlik' },
]

export const MORE_STATS: Stat[] = [
  { v: '12 273', l: 'bir yilda o‘tkazilgan ma’naviy-ma’rifiy, sport va boshqa tadbirlar' },
  { v: '1,87 mln', l: 'yosh loyihalarga qamrab olindi' },
  { v: '81 198', l: 'yosh harbiy xizmatchi kuch tuzilmalaridagi tashkilotlarda' },
  { v: '36', l: 'tashkilot Ittifoq tizimida faoliyat yuritadi' },
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
    t: '“O‘zbekiston belgisi” ko‘krak nishoni',
    text: 'Vatan sha’nini yuksaltirishga munosib hissa qo‘shgan faol yoshlar Ittifoq Markaziy Kengashining qarori bilan shu nishon bilan taqdirlanadi.',
    fact: '1997-yilda ta’sis etilgan',
    num: '1997',
    numL: 'ta’sis etilgan yil',
    img: '/img/ittifoq/nishon-ozbekiston-belgisi.webp',
    badge: true,
  },
  {
    group: 'ittifoq',
    t: 'Oliy ta’limga tavsiyanoma',
    text: 'Ittifoq tizimidagi sardorlar, yo‘nalish yetakchilari va tizimda ikki yil faoliyat yuritgan yoshlar Ittifoq tavsiyanomasi bilan doimiy yashash joyidagi oliy ta’lim tashkilotining pedagogika yo‘nalishlariga test sinovlarisiz, davlat granti asosida qabul qilinadi.',
    fact: 'Har yili har bir hududdan 1 nafar',
    num: '1 nafar',
    numL: 'har yili har bir hududdan',
    img: '/img/ittifoq/kitobxonlar.jpg',
  },
  {
    group: 'ittifoq',
    t: 'Harbiy xizmatni o‘tagan talabalarning kontrakt to‘lovi',
    text: 'Muddatli harbiy xizmatni o‘tab, harbiy qism qo‘mondonligining tavsiyanomasi bilan oliy ta’lim tashkilotiga to‘lov-kontrakt asosida qabul qilingan talabalarning kontrakt to‘lovi qisman Ittifoq tomonidan to‘lab beriladi.',
    fact: 'Kontrakt summasining 35 foizi',
    num: '35%',
    numL: 'kontrakt summasidan',
    img: '/img/ittifoq/harbiy.jpg',
  },
  {
    group: 'ittifoq',
    t: 'Ittifoq kafilligi',
    text: 'Jinoyat sodir etib, sudda javob berayotgan yosh Ittifoq kafilligi bilan ozodlikdan mahrum etilmasligi mumkin. Bunda Ittifoq bir yil davomida uning xulq-atvorini kuzatib boradi va jamiyat uchun foydali ishlarga jalb etadi.',
    fact: 'Oliy sud bilan memorandum asosida',
    num: '1 yil',
    numL: 'xulq-atvor kuzatiladigan muddat',
    img: '/img/ittifoq/seminar.jpg',
  },
  {
    group: 'davlat',
    t: '“Mard o‘g‘lon” davlat mukofoti',
    medal: '/img/ittifoq/medal-mard-oglon.webp',
    text: 'Ittifoq Markaziy Kengashining taklifi bilan 2017-yilda ta’sis etilgan. Mukofot fan, ta’lim, madaniyat, sport, harbiy xizmat va boshqa sohalarda yuksak natijalarga erishgan yigitlarga “Yoshlar kuni” arafasida topshiriladi.',
    fact: 'Hozirgi vaqtda nomzodlar Yoshlar ishlari agentligi tomonidan taqdim etiladi',
    num: '2 nafar',
    numL: 'har yili har bir hududdan',
    img: '/img/ittifoq/yetakchilar.jpg',
  },
  {
    group: 'davlat',
    t: '“Kelajak bunyodkori” medali',
    medal: '/img/ittifoq/medal-kelajak-bunyodkori.webp',
    text: 'Ittifoq taklifi bilan 2017-yilda ta’sis etilgan. Medal o‘qish, mehnat va jamoat ishlarida faollik ko‘rsatgan yoshlarga Prezident farmoni bilan beriladi.',
    fact: '2017-yildan beri beriladi',
    num: '14–30',
    numL: 'yoshdagi yoshlar taqdirlanadi',
    img: '/img/ittifoq/volontyorlar.jpg',
  },
]

export const INTL = {
  text: 'Ittifoq xalqaro tashkilotlar va xorijiy davlatlarning yoshlar tashkilotlari bilan hamkorlik qiladi. Hamkorlik shakllari:',
  assoc: 'Ittifoq qoshida O‘zbekiston yoshlari umumjahon assotsiatsiyasi tashkil etilgan. Assotsiatsiya xorijda o‘qiyotgan va ishlayotgan o‘zbekistonlik yoshlarni qo‘llab-quvvatlaydi.',
  facts: [
    { v: '20+', l: 'hamkor mamlakat' },
    { v: '25', l: 'davlatda assotsiatsiya vakillari' },
    { v: '100 000', l: 'yosh xalqaro loyihalarda' },
  ] as Stat[],
  forms: ['Forumlar va sammitlar', 'Amaliyot va almashinuv dasturlari', 'Uchrashuvlar va konferensiyalar'],
  projects: ['Milliy dialog', 'Yosh diplomatlar', 'Turkiy dunyo yoshlar harakati', 'BMT modeli', 'Iste’dodli yoshlar', 'Ta’lim Expo', 'TDT modeli', 'Xorijdagi vatandoshlar biznes marafoni'],
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
  name: 'Yoshlar ijod saroyi',
  org: 'O‘zbekiston yoshlar ittifoqi',
  text: 'Toshkent shahridagi Yoshlar ijod saroyida xalqimizning san’at merosini namoyish etuvchi ko‘rgazmalar, ijodiy tadbirlar va uchrashuvlar o‘tkaziladi.',
  features: ['“Kitoblar olami” kitobxonlik maydoni', 'Podkast studiyasi', 'Kovorking va uchrashuv xonalari', 'Ko‘rgazmalar va ijodiy tadbirlar'],
  img: '/img/markazlar/ijod-saroyi.jpg',
  gallery: ['/img/markazlar/ijod-kitoblar-olami.jpg', '/img/markazlar/ijod-podkast.jpg', '/img/markazlar/ijod-davr-bizniki.jpg'],
}

/* Toşkent şahar markazi: matn NAMUNA — manzil, ish vaqti va rasmiy tavsif kelgaçi almaştiriladi */
export const CITY_CENTRE = {
  name: 'Toshkent shahar Yoshlar markazi',
  text: 'Toshkent shahridagi Yoshlar markazida yoshlar uchun tadbirlar, to‘garaklar va uchrashuvlar o‘tkaziladi.',
  facts: ['Tadbir va uchrashuvlar zali', 'To‘garaklar va o‘rganish xonalari', 'Yoshlar tashabbuslarini qo‘llab-quvvatlash'],
  img: '/img/markazlar/toshkent-shahar.jpg',
}

export type Centre = { region: string; img: string }

/** Toşkent şahri birinçi, keyin viloyatlar */
export const CENTRES: Centre[] = [
  { region: 'Toshkent shahri', img: '/img/markazlar/toshkent-shahar.jpg' },
  { region: 'Toshkent viloyati', img: '/img/markazlar/toshkent-viloyati.jpg' },
  { region: 'Qoraqalpog‘iston Respublikasi', img: '/img/markazlar/qoraqalpogiston.jpg' },
  { region: 'Andijon viloyati', img: '/img/markazlar/andijon.jpg' },
  { region: 'Buxoro viloyati', img: '/img/markazlar/buxoro.jpg' },
  { region: 'Jizzax viloyati', img: '/img/markazlar/jizzax.jpg' },
  { region: 'Qashqadaryo viloyati', img: '/img/markazlar/qashqadaryo.jpg' },
  { region: 'Navoiy viloyati', img: '/img/markazlar/navoiy.jpg' },
  { region: 'Namangan viloyati', img: '/img/markazlar/namangan.jpg' },
  { region: 'Samarqand viloyati', img: '/img/markazlar/samarqand.jpg' },
  { region: 'Sirdaryo viloyati', img: '/img/markazlar/sirdaryo.jpg' },
  { region: 'Surxondaryo viloyati', img: '/img/markazlar/surxondaryo.jpg' },
  { region: 'Farg‘ona viloyati', img: '/img/markazlar/fargona.jpg' },
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
    d: 'Ittifoqning oliy rahbar organi. Ustavni tasdiqlaydi, Markaziy Kengash va Markaziy nazorat-taftish komissiyasini saylaydi, ularning hisobotlarini tinglaydi.',
    meta: ['Hisobot Qurultoyi — yilda kamida bir marta', 'Vakolatli Qurultoy — 5 yilda kamida bir marta', 'Delegatlar hududiy kengashlar konferensiyalarida saylanadi'],
  } as Body,
  council: {
    t: 'Markaziy Kengash',
    d: 'Qurultoylar oralig‘ida Ittifoqqa rahbarlik qiladi: Qurultoy qarorlari ijrosini ta’minlaydi, yillik ish reja va byudjetni tasdiqlaydi.',
    meta: ['Kamida 61 kishi', '5 yil muddatga', 'Har hududdan kamida 2 nafar yosh vakil'],
  } as Body,
  chair: {
    t: 'Markaziy Kengash raisi',
    d: 'Markaziy Kengash, Ijroiya qo‘mitasi va apparat faoliyatiga rahbarlik qiladi.',
    meta: ['Qurultoy 5 yilga saylaydi'],
  } as Body,
  exec: {
    t: 'Ijroiya qo‘mitasi',
    d: 'Ittifoq faoliyatini tashkil etish bo‘yicha tezkor qarorlar qabul qiladi, hududiy kengashlar faoliyatini muvofiqlashtiradi.',
    meta: ['Markaziy Kengash a’zolaridan', 'Kamida 15 kishi', '5 yil muddatga'],
  } as Body,
  audit: {
    t: 'Markaziy nazorat-taftish komissiyasi',
    d: 'Ittifoqning markaziy nazorat organi: byudjet ijrosi va moliyaviy-xo‘jalik faoliyatini tekshiradi.',
    meta: ['Kamida 11 kishi', '5 yil muddatga', 'Qurultoyga hisobot beradi'],
  } as Body,
  /** 6.1–6.3: taşkiliy tuzilma (yuqoridan pastga) */
  levels: [
    {
      t: 'Hududiy kengashlar',
      d: 'Qoraqalpog‘iston Respublikasi, viloyatlar va Toshkent shahrida ishlaydi. Yuqori organi — Konferensiya, u Kengash, rais va nazorat-taftish komissiyasini saylaydi.',
      meta: ['Konferensiya 2,5 yilda kamida bir marta', 'Kengash kamida 21 kishi'],
    },
    {
      t: 'Mahalliy kengashlar',
      d: 'Ma’muriy-hududiy bo‘linishga muvofiq tuziladi. Yuqori organi — Konferensiya; boshlang‘ich tashkilotlar shu yerga delegat saylaydi.',
      meta: ['Konferensiya 2,5 yilda kamida bir marta', 'Kengash yig‘ilishi 6 oyda kamida bir marta'],
    },
    {
      t: 'Boshlang‘ich tashkilotlar',
      d: 'O‘qish, ish va xizmat joylarida tuziladi. Yuqori organi — a’zolarning Umumiy yoki Hisobot-saylov yig‘ilishi; tashkilotga a’zolar saylagan yetakchi rahbarlik qiladi.',
      meta: ['Kamida 5 nafar a’zo', 'Yetakchi 2,5 yilga saylanadi', '100 dan ortiq a’zoda — kamida 7 kishilik Kengash'],
    },
  ] as Body[],
  /** 1-bob: faoliyat tamoyillari */
  principles: ['Ixtiyoriylik', 'Qonuniylik', 'Oshkoralik', 'A’zolarning teng huquqliligi', 'O‘zini o‘zi boshqarish'],
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
      d: '14 yoshga to‘lgan va 30 yoshdan oshmagan, Ittifoq maqsadini qo‘llab-quvvatlash istagini bildirgan O‘zbekiston Respublikasi fuqarosi yoki O‘zbekistonda muntazam yashab kelayotgan fuqaroligi bo‘lmagan shaxs a’zo bo‘lishi mumkin.',
    },
    {
      band: '4.1',
      t: 'Ariza taqdim etish',
      d: 'A’zolikka qabul qilinish uchun o‘qish yoki ish joyidagi Ittifoq boshlang‘ich tashkilotiga tegishli mazmundagi ariza taqdim etiladi.',
    },
    {
      band: '4.4',
      t: 'Boshlang‘ich tashkilotda ko‘rib chiqish',
      d: 'A’zolikka qabul qilish boshlang‘ich tashkilotning Umumiy yig‘ilishi, Kengash shakllantirilgan bo‘lsa — boshlang‘ich tashkilot Kengashining yig‘ilishi tomonidan amalga oshiriladi.',
    },
    {
      band: '4.5',
      t: 'Qaror yakuniy hisoblanadi',
      d: 'Boshlang‘ich tashkilotning qabul qilish to‘g‘risidagi qarori yakuniy hisoblanadi va Ittifoqning yuqori organlari tomonidan tasdiqlanish talab qilinmaydi.',
    },
  ],
  /** 4.10-band */
  rights: [
    'Umumiy yig‘ilishlar, konferensiyalar, Qurultoy va rahbar organlar yig‘ilishlarida o‘z fikrini erkin ifoda etish',
    'Shaxsan yoki vakili orqali saylanadigan organlar qarorlarini ishlab chiqishda ishtirok etish',
    'Saylanadigan rahbar organlar va nazorat-taftish organlariga saylash va saylanish',
    'Ittifoq organlari faoliyati to‘g‘risida ma’lumot olish',
    'Ittifoqning har qanday rahbar organiga ariza va takliflar bilan murojaat etish',
  ],
  /** 4.11-band */
  duties: [
    'Ittifoqning Ustav maqsadlarini amalga oshirishda qatnashish',
    'Yoshlar o‘rtasida va jamiyatda Ittifoqning ta’siri va nufuzini oshirish',
    'Rahbar organlar, boshlang‘ich tashkilot umumiy yig‘ilishlari va Kengashi qarorlarini bajarish',
    'Boshlang‘ich tashkilot faoliyati va Ittifoqning barcha yo‘nalishlarida faol ishtirok etish',
  ],
  /** 4.7, 4.8-bandlar */
  legal: {
    d: 'Yoshlar sohasidagi nodavlat notijorat tashkilotlari, korxona, muassasa va tashkilotlar, markazlar, klublar hamda ta’sis hujjatlari Ittifoq Ustaviga zid bo‘lmagan boshqa yuridik shaxslar a’zo bo‘lishi mumkin.',
    how: 'Qabul qilish Ittifoq Markaziy Kengashi Ijroiya qo‘mitasining qarori asosida amalga oshiriladi.',
  },
  /** 4.3-band */
  note: 'Ittifoqning rahbar organlariga saylangan a’zolarga 30 yoshlik cheklov qo‘llanilmaydi.',
  /** 4.6-band: jismoniy şaxslar aʼzoligining bekor qilinişi */
  ends: [
    'a’zoning arizasiga ko‘ra',
    'a’zoning yoshi 30 dan oshgach (rahbar organlarga saylanganlar bundan mustasno)',
    'Ustavga zid xatti-harakatlarga yo‘l qo‘yilganda',
    'boshqa davlat fuqaroligi olinganda',
    'sud tomonidan muomalaga layoqatsiz deb topilganda yoki vafot etganda',
    'Ittifoq faoliyati tugatilganda',
  ],
  cta: { t: 'Ittifoqqa a’zo bo‘lish', d: 'Ariza o‘qish yoki ish joyidagi Ittifoq boshlang‘ich tashkilotiga taqdim etiladi. Arizani saytda onlayn yuborish ham mumkin: Kengash uni tegishli boshlang‘ich tashkilotga yetkazadi.' },
}

/** Rasmiy maʼlumotlar */
export const OFFICIAL = {
  rows: [
    ['To‘liq nomi', 'O‘zbekiston yoshlar ittifoqi'],
    ['Rushcha', 'Союз молодежи Узбекистана'],
    ['Inglizcha', 'Uzbekistan Youth Union'],
    ['Tashkiliy-huquqiy shakli', 'Nodavlat notijorat tashkilot (ittifoq)'],
    ['Tashkil etilgan sana', '2017-yil 30-iyun'],
    ['Markaziy Kengash manzili', 'Toshkent shahri, Alisher Navoiy ko‘chasi, 11-uy'],
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
    'Yoshlarga oid davlat siyosatini amalga oshirishda ijtimoiy sheriklik',
    'Yoshlarning huquq va qonuniy manfaatlarini himoya qilish',
    'Demokratik islohotlarda yoshlar faolligini oshirish',
    'Yoshlarning kasb egallashi va bandligiga ko‘maklashish',
    'Kitobxonlikni rivojlantirish va yoshlar madaniyatini yuksaltirish',
    'Sog‘lom turmush tarzi va oila institutini mustahkamlash',
    'Yoshlarning bo‘sh vaqtini mazmunli tashkil etish',
    'Ijtimoiy himoyaga muhtoj yoshlarni qo‘llab-quvvatlash',
    'Yoshlar o‘rtasida huquqbuzarliklar profilaktikasi',
    'Yosh rahbar kadrlar zaxirasini shakllantirish',
    'Yoshlar siyosati sohasida xalqaro hamkorlikni rivojlantirish',
    'Yoshlar bilan ishlashda g‘oyaviy-uslubiy yordam ko‘rsatish',
  ],
  items: [
    'Yoshlarga oid davlat siyosatini amalga oshirishda davlat organlari, nodavlat notijorat tashkilotlari va fuqarolik jamiyati institutlari bilan samarali hamkorlikni ta’minlovchi, “Yoshlar — kelajak bunyodkori” shiori ostida professional ishlaydigan tuzilmaga aylanish.',
    'Yoshlarning huquqlari, erkinliklari va qonuniy manfaatlarini himoya qilish, ularni milliy va umuminsoniy qadriyatlarga hurmat, Vatanga muhabbat ruhida tarbiyalash, turli mafkuraviy tahdidlardan asrash.',
    'Demokratik islohotlarda yoshlar faolligini oshirish, ma’naviyati yuksak, mustaqil fikrlaydigan, el-yurt manfaati yo‘lida bor kuchini safarbar qiladigan tashabbuskor yoshlar safini kengaytirish.',
    'Yoshlarning zamonaviy kasblarni egallashi, bandligi, kichik biznes va tadbirkorlikka jalb etilishi, intellektual va ijodiy salohiyatini ro‘yobga chiqarishiga ko‘maklashish.',
    'Ilmiy va badiiy kitoblarni, jumladan elektron asarlarni o‘qishga qiziqishni oshirish; huquqiy, ekologik, tibbiy va axborot texnologiyalari madaniyatini yuksaltirish orqali yot g‘oyalarga qarshi immunitetni shakllantirish.',
    'Sog‘lom turmush tarzi va oila muqaddasligi g‘oyalarini targ‘ib qilish, erta turmush qurish va yosh oilalar ajralishining oldini olish.',
    'Yoshlarning bo‘sh vaqtini mazmunli tashkil etish: sport va jismoniy tarbiya, ijodiy to‘garaklar, xorijiy tillar va boshqa o‘quv kurslariga keng jalb etish.',
    'Yosh oilalarni, imkoniyati cheklangan va ijtimoiy himoyaga muhtoj yoshlarni ma’naviy va moddiy qo‘llab-quvvatlash, ular uchun munosib uy-joy va sharoit yaratish.',
    'Yoshlar o‘rtasida huquqbuzarlik va jinoyatchilikning barvaqt oldini olish va profilaktika ishlarida faol ishtirok etish.',
    'Bilimli, tashabbuskor, halol va fidoyi yosh rahbar kadrlarni tarbiyalash, zaxirasini yaratish va mas’ul lavozimlarga tavsiya etish.',
    'Yoshlar siyosati sohasida xalqaro hamkorlikni rivojlantirish, xorijda tahsil olayotgan va mehnat qilayotgan yoshlarning huquq va manfaatlarini himoya qilish.',
    'Davlat organlari, nodavlat notijorat tashkilotlari va fuqarolik jamiyati institutlariga yoshlar bilan ishlashda g‘oyaviy-uslubiy yordam berish.',
  ],
}

/* ---------------- Ittifoq taʼsisçiligidagi taşkilotlar ---------------- */

/** g — faoliyat sohasi (guruhlab körsatiş uçun) */
export type Org = { t: string; d: string; logo?: string; g: 'talim' | 'ijod' | 'ijtimoiy' | 'iqtisod' }

export const ORG_GROUPS: { key: Org['g']; t: string }[] = [
  { key: 'talim', t: 'Ta’lim va ilm-fan' },
  { key: 'ijod', t: 'Ijod va madaniyat' },
  { key: 'ijtimoiy', t: 'Ijtimoiy himoya va huquq' },
  { key: 'iqtisod', t: 'Tadbirkorlik va xalqaro aloqalar' },
]

export const ORGS = {
  lead: 'Ittifoq tizimida 36 ta tashkilot faoliyat yuritadi, jumladan 19 ta nodavlat notijorat tashkilot va 14 ta tijorat tashkiloti. Ularda 228 kishi ishlaydi.',
  ngos: [
    { t: 'Yetakchilar akademiyasi', g: 'talim', d: 'Mahalla, ta’lim muassasalari, vazirlik va idoralardagi yoshlar yetakchilarini o‘qitish hamda ularning faoliyati samaradorligini oshirish bilan shug‘ullanadi.', logo: '/img/tashkilotlar/yetakchilar.png' },
    { t: 'O‘zbekiston quvnoqlar va zukkolar assotsiatsiyasi', g: 'ijod', d: 'Yoshlarning intellektual salohiyatini rivojlantiradi, iqtidorli yoshlarni aniqlash va ularning iste’dodini ro‘yobga chiqarishga ko‘maklashadi.', logo: '/img/tashkilotlar/qvz.png' },
    { t: 'Prezidentning 5 tashabbus loyiha ofisi', g: 'ijod', d: 'Yoshlarning musiqa, tasviriy san’at, adabiyot va teatrga qiziqishini oshirish hamda kitobxonlikni targ‘ib qilish ishlarini muvofiqlashtiradi.', logo: '/img/tashkilotlar/tashabbus5.png' },
    { t: 'Yoshlar tadbirkorligini qo‘llab-quvvatlash markazi', g: 'iqtisod', d: 'Yosh tadbirkorlarni qo‘llab-quvvatlaydi, biznes g‘oyalarini amalga oshirishda uslubiy va amaliy yordam ko‘rsatadi.', logo: '/img/tashkilotlar/tadbirkorlik.png' },
    { t: 'Respublika yosh ijodkorlar kengashi', g: 'ijod', d: 'Hududlardagi iste’dodli yosh ijodkorlarni aniqlash va ularning ijodiy faoliyatini qo‘llab-quvvatlash bilan shug‘ullanadi.', logo: '/img/tashkilotlar/ijodkorlar.png' },
    { t: 'O‘zbekiston volontyorlari assotsiatsiyasi', g: 'ijtimoiy', d: 'Volontyorlik faoliyatini tashkil etadi, fuqarolik tashabbuslarini rivojlantiradi hamda volontyorlarning huquq va manfaatlarini himoya qiladi.', logo: '/img/tashkilotlar/volontyorlar.png' },
    { t: 'O‘zbekiston yoshlari umumjahon assotsiatsiyasi', g: 'iqtisod', d: 'Xorijda ta’lim olayotgan va mehnat faoliyatini amalga oshirayotgan o‘zbekistonlik yoshlarga huquqiy va ijtimoiy ko‘mak ko‘rsatadi.', logo: '/img/tashkilotlar/umumjahon.png' },
    { t: 'Loyihalar boshqaruvi markazi', g: 'iqtisod', d: 'Ma’naviy-ma’rifiy va ijtimoiy mavzulardagi axborot mahsulotlari: maqolalar, eshittirishlar, videoroliklar va filmlar tayyorlaydi.', logo: '/img/tashkilotlar/mpmg.png' },
    { t: '“Yangi avlod forumi” bolalar ijodiyoti markazi', g: 'ijod', d: 'Maktabdan tashqari ta’limni rivojlantiradi, bolalarning madaniyat va san’at sohasidagi qobiliyatlarini qo‘llab-quvvatlaydi.', logo: '/img/tashkilotlar/yangiavlod.png' },
    { t: 'Respublika yoshlar markazi', g: 'ijtimoiy', d: 'Hududlarda yoshlarning savodxonligini oshiradi, kasb-hunar va ijodiy yo‘nalishlardagi o‘quv to‘garaklarini tashkil etadi.', logo: '/img/tashkilotlar/yoshlarmarkazi.png' },
    { t: 'Ijtimoiy-huquqiy media markaz', g: 'ijtimoiy', d: 'Yoshlarning huquqiy ongi va madaniyatini yuksaltirishga qaratilgan media mahsulotlarni tayyorlaydi.', logo: '/img/tashkilotlar/mediamarkaz.png' },
    { t: 'O‘zbekiston yosh fermerlari kengashi', g: 'iqtisod', d: 'Yoshlar o‘rtasida fermerlik faoliyatini targ‘ib qiladi, ko‘p tarmoqli fermer xo‘jaliklarini rivojlantirishga ko‘maklashadi.', logo: '/img/tashkilotlar/fermerlar.png' },
    { t: 'Imkoniyati cheklangan yoshlar va bolalar markazi', g: 'ijtimoiy', d: 'Imkoniyati cheklangan yoshlar va bolalarga teng imkoniyatlar yaratadi, ularga huquqiy, psixologik va pedagogik yordam ko‘rsatadi.', logo: '/img/tashkilotlar/imkoniyat.png' },
    { t: 'Yoshlar ijod saroyi', g: 'ijod', d: 'San’at merosini namoyish etuvchi ko‘rgazmalar, ijodiy tadbirlar va uchrashuvlar o‘tkaziladigan maskan.', logo: '/img/tashkilotlar/ijodsaroyi.png' },
    { t: 'Yosh huquqshunoslar kengashi', g: 'ijtimoiy', d: 'Sud-huquq islohotlarida yoshlarning ishtirokini kengaytiradi, yoshlarning huquq va qonuniy manfaatlarini himoya qiladi.', logo: '/img/tashkilotlar/huquqshunoslar.png' },
    { t: 'Respublika yosh olimlar kengashi', g: 'talim', d: 'Ilmiy tadqiqot olib borayotgan yosh olimlar va iqtidorli yoshlarni moddiy va ma’naviy jihatdan qo‘llab-quvvatlaydi.', logo: '/img/tashkilotlar/olimlar.png' },
    { t: 'Yosh dizaynerlar kengashi', g: 'ijod', d: 'Yosh dizaynerlarning ishlanmalarini ommalashtiradi, ijodiy yoshlar jamoasini shakllantiradi.', logo: '/img/tashkilotlar/dizaynerlar.png' },
    { t: 'Yosh kinoijodkorlar kengashi', g: 'ijod', d: 'Iste’dodli yosh kinoijodkorlarni aniqlaydi va ularning loyihalarini amalga oshirishga ko‘maklashadi.', logo: '/img/tashkilotlar/kino.png' },
    { t: 'Tibbiyot oliy o‘quv yurtlari talabalari assotsiatsiyasi', g: 'talim', d: 'Yoshlarning tibbiy savodxonligini oshiradi, sog‘liqni saqlash sohasiga xorijiy grantlarni jalb etishga ko‘maklashadi.', logo: '/img/tashkilotlar/tibbiyot.png' },
  ] as Org[],
  companies: [
    '“Yoshlar” teleradiokanali',
    '“Ozod yurt to‘lqinlari” telekanali',
    '“Yoshlar ovozi” radiosi',
    '“Yoshlar ovozi” gazetasi',
    '“Yosh kuch” jurnali',
    'Yoshlar nashriyot uyi',
    '“Kitob olami” kovorking va kitob do‘konlari',
    'Yoshlar turizm agentligi',
    'Yoshlar oromgohi',
    '“Shafran” tog‘ kurort majmuasi',
    'Motivatsion kontent studiyasi',
  ],
}

/* ---------------- Media, naşriyot va xizmat taşkilotlari (taqdimotdan) ---------------- */

export type Company = { t: string; d: string; share: string; logo: string; kind: 'Media' | 'Nashriyot' | 'Xizmat' }

/** Ittifoq uluşi bölgan, faoliyat yuritayotgan taşkilotlar. “Uluş” — Ittifoq Markaziy Kengaşining ustav fondidagi uluşi */
export const COMPANIES: Company[] = [
  { kind: 'Media', t: '“Yoshlar” teleradiokanali', d: 'Yoshlarga mo‘ljallangan teleradiodasturlar tayyorlaydi va efirga uzatadi.', share: '50%', logo: '/img/tashkilotlar/c-yoshlartv.png' },
  { kind: 'Media', t: '“Ozod yurt to‘lqinlari” (My5)', d: 'Teledasturlar tayyorlaydi va ularni efirga uzatadi.', share: '61%', logo: '/img/tashkilotlar/c-ozodyurt.png' },
  { kind: 'Media', t: '“Yoshlar ovozi” radiosi', d: 'Radioeshittirishlar tayyorlaydi va efirga uzatadi.', share: '49%', logo: '/img/tashkilotlar/c-ovoziradio.png' },
  { kind: 'Media', t: 'Motivatsion kontent', d: 'Ijtimoiy tarmoqlar uchun yoshlarga mo‘ljallangan axborot mahsulotlarini tayyorlaydi.', share: '40%', logo: '/img/tashkilotlar/c-motivatsion.png' },
  { kind: 'Nashriyot', t: '“Yoshlar ovozi” gazetasi', d: 'Gazeta nashr etadi va uni obunachilarga yetkazadi.', share: '100%', logo: '/img/tashkilotlar/c-ovozigazeta.png' },
  { kind: 'Nashriyot', t: '“Yosh kuch” jurnali', d: 'Jurnal nashr etadi.', share: '100%', logo: '/img/tashkilotlar/c-yoshkuch.png' },
  { kind: 'Nashriyot', t: 'Yoshlar nashriyot uyi', d: 'Kitoblar va boshqa bosma mahsulotlarni nashr etadi.', share: '100%', logo: '/img/tashkilotlar/c-nashriyot.png' },
  { kind: 'Xizmat', t: '“Kitob olami”', d: 'Kitob savdosini amalga oshiradi va kovorking xizmatlarini ko‘rsatadi.', share: '100%', logo: '/img/tashkilotlar/c-kitobolami.png' },
  { kind: 'Xizmat', t: 'Yoshlar turizm agentligi', d: 'Turistik xizmatlar ko‘rsatadi, sayohatlar uchun joylarni oldindan band qiladi.', share: '100%', logo: '/img/tashkilotlar/c-turizm.png' },
  { kind: 'Xizmat', t: 'Yoshlar oromgohi', d: 'Yoshlar uchun sog‘lomlashtirish va dam olish xizmatlarini ko‘rsatadi.', share: '100%', logo: '/img/tashkilotlar/c-oromgoh.png' },
  { kind: 'Xizmat', t: '“Shafran” tog‘ kurort majmuasi', d: 'Tog‘ kurortida sog‘lomlashtirish va dam olish xizmatlarini ko‘rsatadi.', share: '100%', logo: '/img/tashkilotlar/c-shafran.png' },
]
