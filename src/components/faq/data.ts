/**
 * “Köp beriladigan savollar” (FAQ). Har bir javob faqat rasmiy manbaga tayanadi:
 * Ittifoq Ustavi (components/ustav/data.ts), saytdagi aloqa maʼlumotlari (components/boglanish/data.ts),
 * “Jismoniy va yuridik şaxslarning murojaatlari töğrisida”gi Qonun va tekşirilgan imtiyozlar (components/ittifoq/data.ts).
 * Javobi rasmiy tasdiqlanmagan savollar (masalan, volontyorlikka yoziliş tartibi) qöşilmaydi.
 * Keyinçalik admin paneldan boşqariladi.
 */
import { ADDRESS, EMAIL, HOURS, LAW, PHONES } from '@/components/boglanish/data'

export type FaqCat = 'azolik' | 'imtiyoz' | 'taskilot' | 'tadbir' | 'murojaat'

export const FAQ_CATS: { k: FaqCat; t: string }[] = [
  { k: 'azolik', t: 'Aʼzolik' },
  { k: 'imtiyoz', t: 'Imtiyozlar' },
  { k: 'taskilot', t: 'Boşlanğiç taşkilotlar' },
  { k: 'tadbir', t: 'Tadbir va loyihalar' },
  { k: 'murojaat', t: 'Murojaat' },
]

export type Faq = {
  id: string
  cat: FaqCat
  q: string
  /** javob xatboşilari */
  a: string[]
  /** javob ičidagi röyxat */
  li?: string[]
  /** batafsil sahifa (til prefiksisiz yöl) */
  more?: { href: string; label: string }
}

const USTAV = (band: string) => `/hujjatlar/normativ/ustav#band-${band}`

export const FAQ: Faq[] = [
  /* ---------------- Aʼzolik ---------------- */
  {
    id: 'kim-azo-bolishi-mumkin',
    cat: 'azolik',
    q: 'Ittifoqqa kim aʼzo bölişi mumkin?',
    a: [
      'Ittifoq maqsadini qöllab-quvvatlaş istagini bildirgan, 14 yoşga tölgan va 30 yoşdan oşmagan Özbekiston Respublikasi fuqarolari hamda Özbekiston Respublikasida muntazam yaşab kelayotgan fuqaroligi bölmagan şaxslar aʼzo bölişi mumkin.',
    ],
    more: { href: USTAV('4.2'), label: 'Ustavning 4.2-bandi' },
  },
  {
    id: 'qanday-azo-bolaman',
    cat: 'azolik',
    q: 'Ittifoqqa aʼzo böliş tartibi qanday?',
    a: ['Ariza öqiş yoki iş joyidagi Ittifoq boşlanğiç taşkilotiga taqdim etiladi.'],
    li: [
      'Arizani boşlanğiç taşkilotning Umumiy yiğilişi yoki, Kengaş şakllantirilgan bölsa, boşlanğiç taşkilot Kengaşi körib çiqadi.',
      'Qabul qiliş töğrisidagi qaror yakuniy hisoblanadi, yuqori organlar tasdiği talab qilinmaydi.',
      'Boşlanğiç taşkilot aniqlanmagan hollarda ariza saytdagi “Aʼzo böliş” şakli orqali Kengaşga yuborilişi mumkin.',
    ],
    more: { href: '/biz-haqimizda/ittifoq#azo-bolish', label: 'Aʼzolik tartibi' },
  },
  {
    id: 'azolik-badali',
    cat: 'azolik',
    q: 'Aʼzolik badali undiriladimi?',
    a: [
      'Ittifoq Ustavida aʼzolik badali közda tutilmagan. Ittifoq mulki ixtiyoriy mulkiy badallar va ehsonlar, tadbirkorlik faoliyatidan olingan daromadlar, grant, subsidiya va ijtimoiy buyurtma mablağlari, bosma naşrlardan tuşumlar hamda qonun hujjatlarida taqiqlanmagan boşqa tuşumlar hisobidan şakllanadi.',
    ],
    more: { href: USTAV('7.2'), label: 'Ustavning 7.2-bandi' },
  },
  {
    id: '30-yoshdan-keyin',
    cat: 'azolik',
    q: 'Aʼzo 30 yoşdan oşgaç uning aʼzoligi qanday hal etiladi?',
    a: [
      'Aʼzoning yoşi 30 dan oşgaç uning aʼzoligi bekor qilinişi mumkin. Ittifoqning rahbar organlariga saylangan aʼzolarga bu yoş çeklovi qöllanilmaydi.',
    ],
    more: { href: USTAV('4.6'), label: 'Ustavning 4.3 va 4.6-bandlari' },
  },
  {
    id: 'huquq-va-majburiyatlar',
    cat: 'azolik',
    q: 'Ittifoq aʼzosi qanday huquqlarga ega?',
    a: ['Ustavga köra aʼzo quyidagi huquqlarga ega:'],
    li: [
      'umumiy yiğilişlar, konferensiyalar va Qurultoyda öz fikrini erkin ifoda etiş;',
      'saylanadigan rahbar organlar va nazorat-taftiş organlariga saylaş va saylaniş;',
      'Ittifoq organlari faoliyati töğrisida maʼlumot oliş;',
      'har qanday rahbar organga ariza va takliflar bilan murojaat etiş.',
    ],
    more: { href: USTAV('4.10'), label: 'Ustavning 4.10-bandi' },
  },
  {
    id: 'yuridik-shaxslar',
    cat: 'azolik',
    q: 'Yuridik şaxslar Ittifoqqa aʼzo bölişi mumkinmi?',
    a: [
      'Mumkin. Yoşlar sohasidagi nodavlat notijorat taşkilotlari, korxona, muassasa va taşkilotlar, markazlar, klublar hamda taʼsis hujjatlari Ittifoqning Ustav maqsadlari, vazifalari va dasturiy hujjatlariga zid bölmagan boşqa yuridik şaxslar aʼzo bölişi mumkin. Ular Ittifoq Markaziy Kengaşi Ijroiya qömitasining qarori bilan aʼzolikka qabul qilinadi.',
    ],
    more: { href: USTAV('4.7'), label: 'Ustavning 4.7 va 4.8-bandlari' },
  },

  /* ---------------- Imtiyozlar ---------------- */
  {
    id: 'qanday-imtiyozlar-bor',
    cat: 'imtiyoz',
    q: 'Ittifoq orqali qanday imtiyozlardan foydalaniş mumkin?',
    a: ['Ittifoq quyidagi imtiyozlarni beradi:'],
    li: [
      '“Özbekiston belgisi” kökrak nişoni — Markaziy Kengaş qarori bilan;',
      'oliy taʼlimning pedagogika yönalişlariga test sinovlarisiz, davlat granti asosida qabul uçun tavsiyanoma;',
      'harbiy xizmatdan keyin kontrakt asosida öqiyotgan talabalar uçun kontrakt summasining 35 foizini tölab beriş;',
      'sudda javob berayotgan yoşlar uçun Ittifoq kafilligi.',
    ],
    more: { href: '/biz-haqimizda/ittifoq#mukofotlar', label: 'Mukofot va imtiyozlar' },
  },
  {
    id: 'tavsiyanoma',
    cat: 'imtiyoz',
    q: 'Oliy taʼlimga tavsiyanoma kimga beriladi?',
    a: [
      'Ittifoq tizimidagi sardorlar, yönaliş yetakçilari va tizimda ikki yil faoliyat yuritgan yoşlarga. Tavsiyanoma bilan doimiy yaşaş joyidagi oliy taʼlim taşkilotining pedagogika yönalişlariga test sinovlarisiz, davlat granti asosida qabul qilinadi. Har yili har bir hududdan 1 nafar yoş tavsiya etiladi.',
    ],
    more: { href: '/biz-haqimizda/ittifoq#mukofotlar', label: 'Mukofot va imtiyozlar' },
  },
  {
    id: 'harbiydan-keyin-kontrakt',
    cat: 'imtiyoz',
    q: 'Harbiy xizmatdan keyin kontrakt tölovi böyiça qanday yordam bor?',
    a: [
      'Muddatli harbiy xizmatni ötab, harbiy qism qömondonligining tavsiyanomasi bilan oliy taʼlim taşkilotiga tölov-kontrakt asosida qabul qilingan talabalarning kontrakt summasining 35 foizi Ittifoq tomonidan tölab beriladi.',
    ],
    more: { href: '/biz-haqimizda/ittifoq#mukofotlar', label: 'Mukofot va imtiyozlar' },
  },

  /* ---------------- Boşlanğiç taşkilotlar ---------------- */
  {
    id: 'boshlangich-qanday-tuziladi',
    cat: 'taskilot',
    q: 'Boşlanğiç taşkilot qanday tuziladi?',
    a: [
      'Boşlanğiç taşkilot iş, öqiş yoki xizmat joyida kamida beş nafar Ittifoq aʼzosi (xayrixoh yoşlar) bölganda ularning yiğilişi qarori bilan va Ustavda belgilangan Ittifoq kengaşining roziligi bilan tuziladi.',
    ],
    more: { href: USTAV('6.2.2'), label: 'Ustavning 6.2.2-bandi' },
  },
  {
    id: 'ott-yetakchisi',
    cat: 'taskilot',
    q: 'Oliy taʼlim taşkilotidagi yoşlar yetakçisi haqidagi maʼlumotni qayerdan oliş mumkin?',
    a: [
      'Toşkent şahridagi oliy taʼlim taşkilotlari boşlanğiç taşkilotlarining yoşlar yetakçilari röyxati “OTT yoşlar yetakçilari” sahifasida berilgan. Unda OTT nomi yoki yetakçining ismi böyiça qidiriş mumkin.',
    ],
    more: { href: '/biz-haqimizda/boshlangich-tashkilotlar/oliy-talim', label: 'OTT yoşlar yetakçilari' },
  },

  /* ---------------- Tadbir va loyihalar ---------------- */
  {
    id: 'tadbirda-qatnashish',
    cat: 'tadbir',
    q: 'Tadbir va tanlovlarda iştirok etiş tartibi qanday?',
    a: [
      'Tanlovlar, röyxatdan ötiş va çellenjlar “Eʼlonlar” sahifasida, rejalaştirilgan tadbirlar “Tadbirlar va kalendar” sahifasida eʼlon qilinadi. Har bir eʼlonda qatnaşiş şartlari körsatiladi.',
    ],
    more: { href: '/faoliyat/elonlar', label: 'Eʼlonlar' },
  },
  {
    id: 'loyiha-taklif',
    cat: 'tadbir',
    q: 'Loyiha ğoyasini qanday taklif etiş mumkin?',
    a: [
      '“Elektron murojaat” sahifasida murojaat turi sifatida “Taklif” tanlanadi va ğoya bayon etiladi. Hujjat yoki taqdimot faylini (PDF, Word, rasm, 10 MB gaça) biriktiriş mumkin.',
    ],
    more: { href: '/boglanish/murojaat', label: 'Elektron murojaat' },
  },

  /* ---------------- Murojaat ---------------- */
  {
    id: 'qanday-murojaat',
    cat: 'murojaat',
    q: 'Kengaşga qanday murojaat qiliş mumkin?',
    a: ['Murojaat quyidagi usullarda qabul qilinadi:'],
    li: [
      'saytdagi “Elektron murojaat” şakli orqali;',
      `elektron poçta orqali: ${EMAIL};`,
      `telefon orqali: ${PHONES.map((p) => p.v).join(', ')};`,
      'Kengaş raisi va bölim boşliqlarining fuqarolar qabulida (jadval “Aloqa maʼlumotlari” sahifasida).',
    ],
    more: { href: '/boglanish/murojaat', label: 'Elektron murojaat' },
  },
  {
    id: 'murojaat-muddati',
    cat: 'murojaat',
    q: 'Murojaatlar qanday muddatda körib çiqiladi?',
    a: [
      `${LAW.title}ning 28-moddasiga köra ariza va şikoyatlar kelib tuşgan kundan boşlab 15 kun ičida, qöşimça tekşiriş yoki hujjatlar talab etilsa, bir oygaça muddatda körib çiqiladi. Takliflar bir oygaça muddatda körib çiqiladi.`,
    ],
    more: { href: '/boglanish/murojaat', label: 'Elektron murojaat' },
  },
  {
    id: 'qayerda-joylashgan',
    cat: 'murojaat',
    q: 'Kengaş qayerda joylaşgan va qaçon işlaydi?',
    a: [
      `${ADDRESS.line} (${ADDRESS.landmark}). Iş vaqti: ${HOURS.days.toLowerCase()}, ${HOURS.time}. ${HOURS.off}.`,
    ],
    more: { href: '/boglanish/aloqa', label: 'Aloqa maʼlumotlari' },
  },
]

/** Bosh sahifadagi qisqa blok */
export const FAQ_HOME = ['kim-azo-bolishi-mumkin', 'qanday-azo-bolaman', 'azolik-badali', 'qanday-imtiyozlar-bor', 'murojaat-muddati']

/** Ittifoq sahifasidagi aʼzolik bölimi ostida */
export const FAQ_AZOLIK = ['azolik-badali', '30-yoshdan-keyin', 'boshlangich-qanday-tuziladi']

export const pickFaq = (ids: string[]) => ids.map((id) => FAQ.find((f) => f.id === id)!).filter(Boolean)
