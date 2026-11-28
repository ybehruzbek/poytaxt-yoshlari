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
  { k: 'azolik', t: 'A’zolik' },
  { k: 'imtiyoz', t: 'Imtiyozlar' },
  { k: 'taskilot', t: 'Boshlang‘ich tashkilotlar' },
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
    q: 'Ittifoqqa kim a’zo bo‘lishi mumkin?',
    a: [
      'Ittifoq maqsadini qo‘llab-quvvatlash istagini bildirgan, 14 yoshga to‘lgan va 30 yoshdan oshmagan O‘zbekiston Respublikasi fuqarolari hamda O‘zbekiston Respublikasida muntazam yashab kelayotgan fuqaroligi bo‘lmagan shaxslar a’zo bo‘lishi mumkin.',
    ],
    more: { href: USTAV('4.2'), label: 'Ustavning 4.2-bandi' },
  },
  {
    id: 'qanday-azo-bolaman',
    cat: 'azolik',
    q: 'Ittifoqqa a’zo bo‘lish tartibi qanday?',
    a: ['Ariza o‘qish yoki ish joyidagi Ittifoq boshlang‘ich tashkilotiga taqdim etiladi.'],
    li: [
      'Arizani boshlang‘ich tashkilotning Umumiy yig‘ilishi yoki, Kengash shakllantirilgan bo‘lsa, boshlang‘ich tashkilot Kengashi ko‘rib chiqadi.',
      'Qabul qilish to‘g‘risidagi qaror yakuniy hisoblanadi, yuqori organlar tasdig‘i talab qilinmaydi.',
      'Boshlang‘ich tashkilot aniqlanmagan hollarda ariza saytdagi “A’zo bo‘lish” shakli orqali Kengashga yuborilishi mumkin.',
    ],
    more: { href: '/biz-haqimizda/ittifoq#azo-bolish', label: 'A’zolik tartibi' },
  },
  {
    id: 'azolik-badali',
    cat: 'azolik',
    q: 'A’zolik badali undiriladimi?',
    a: [
      'Ittifoq Ustavida a’zolik badali ko‘zda tutilmagan. Ittifoq mulki ixtiyoriy mulkiy badallar va ehsonlar, tadbirkorlik faoliyatidan olingan daromadlar, grant, subsidiya va ijtimoiy buyurtma mablag‘lari, bosma nashrlardan tushumlar hamda qonun hujjatlarida taqiqlanmagan boshqa tushumlar hisobidan shakllanadi.',
    ],
    more: { href: USTAV('7.2'), label: 'Ustavning 7.2-bandi' },
  },
  {
    id: '30-yoshdan-keyin',
    cat: 'azolik',
    q: 'A’zo 30 yoshdan oshgach uning a’zoligi qanday hal etiladi?',
    a: [
      'A’zoning yoshi 30 dan oshgach uning a’zoligi bekor qilinishi mumkin. Ittifoqning rahbar organlariga saylangan a’zolarga bu yosh cheklovi qo‘llanilmaydi.',
    ],
    more: { href: USTAV('4.6'), label: 'Ustavning 4.3 va 4.6-bandlari' },
  },
  {
    id: 'huquq-va-majburiyatlar',
    cat: 'azolik',
    q: 'Ittifoq a’zosi qanday huquqlarga ega?',
    a: ['Ustavga ko‘ra a’zo quyidagi huquqlarga ega:'],
    li: [
      'umumiy yig‘ilishlar, konferensiyalar va Qurultoyda o‘z fikrini erkin ifoda etish;',
      'saylanadigan rahbar organlar va nazorat-taftish organlariga saylash va saylanish;',
      'Ittifoq organlari faoliyati to‘g‘risida ma’lumot olish;',
      'har qanday rahbar organga ariza va takliflar bilan murojaat etish.',
    ],
    more: { href: USTAV('4.10'), label: 'Ustavning 4.10-bandi' },
  },
  {
    id: 'yuridik-shaxslar',
    cat: 'azolik',
    q: 'Yuridik shaxslar Ittifoqqa a’zo bo‘lishi mumkinmi?',
    a: [
      'Mumkin. Yoshlar sohasidagi nodavlat notijorat tashkilotlari, korxona, muassasa va tashkilotlar, markazlar, klublar hamda ta’sis hujjatlari Ittifoqning Ustav maqsadlari, vazifalari va dasturiy hujjatlariga zid bo‘lmagan boshqa yuridik shaxslar a’zo bo‘lishi mumkin. Ular Ittifoq Markaziy Kengashi Ijroiya qo‘mitasining qarori bilan a’zolikka qabul qilinadi.',
    ],
    more: { href: USTAV('4.7'), label: 'Ustavning 4.7 va 4.8-bandlari' },
  },

  /* ---------------- Imtiyozlar ---------------- */
  {
    id: 'qanday-imtiyozlar-bor',
    cat: 'imtiyoz',
    q: 'Ittifoq orqali qanday imtiyozlardan foydalanish mumkin?',
    a: ['Ittifoq quyidagi imtiyozlarni beradi:'],
    li: [
      '“O‘zbekiston belgisi” ko‘krak nishoni — Markaziy Kengash qarori bilan;',
      'oliy ta’limning pedagogika yo‘nalishlariga test sinovlarisiz, davlat granti asosida qabul uchun tavsiyanoma;',
      'harbiy xizmatdan keyin kontrakt asosida o‘qiyotgan talabalar uchun kontrakt summasining 35 foizini to‘lab berish;',
      'sudda javob berayotgan yoshlar uchun Ittifoq kafilligi.',
    ],
    more: { href: '/biz-haqimizda/ittifoq#mukofotlar', label: 'Mukofot va imtiyozlar' },
  },
  {
    id: 'tavsiyanoma',
    cat: 'imtiyoz',
    q: 'Oliy ta’limga tavsiyanoma kimga beriladi?',
    a: [
      'Ittifoq tizimidagi sardorlar, yo‘nalish yetakchilari va tizimda ikki yil faoliyat yuritgan yoshlarga. Tavsiyanoma bilan doimiy yashash joyidagi oliy ta’lim tashkilotining pedagogika yo‘nalishlariga test sinovlarisiz, davlat granti asosida qabul qilinadi. Har yili har bir hududdan 1 nafar yosh tavsiya etiladi.',
    ],
    more: { href: '/biz-haqimizda/ittifoq#mukofotlar', label: 'Mukofot va imtiyozlar' },
  },
  {
    id: 'harbiydan-keyin-kontrakt',
    cat: 'imtiyoz',
    q: 'Harbiy xizmatdan keyin kontrakt to‘lovi bo‘yicha qanday yordam bor?',
    a: [
      'Muddatli harbiy xizmatni o‘tab, harbiy qism qo‘mondonligining tavsiyanomasi bilan oliy ta’lim tashkilotiga to‘lov-kontrakt asosida qabul qilingan talabalarning kontrakt summasining 35 foizi Ittifoq tomonidan to‘lab beriladi.',
    ],
    more: { href: '/biz-haqimizda/ittifoq#mukofotlar', label: 'Mukofot va imtiyozlar' },
  },

  /* ---------------- Boşlanğiç taşkilotlar ---------------- */
  {
    id: 'boshlangich-qanday-tuziladi',
    cat: 'taskilot',
    q: 'Boshlang‘ich tashkilot qanday tuziladi?',
    a: [
      'Boshlang‘ich tashkilot ish, o‘qish yoki xizmat joyida kamida besh nafar Ittifoq a’zosi (xayrixoh yoshlar) bo‘lganda ularning yig‘ilishi qarori bilan va Ustavda belgilangan Ittifoq kengashining roziligi bilan tuziladi.',
    ],
    more: { href: USTAV('6.2.2'), label: 'Ustavning 6.2.2-bandi' },
  },
  {
    id: 'ott-yetakchisi',
    cat: 'taskilot',
    q: 'Oliy ta’lim tashkilotidagi yoshlar yetakchisi haqidagi ma’lumotni qayerdan olish mumkin?',
    a: [
      'Toshkent shahridagi oliy ta’lim tashkilotlari boshlang‘ich tashkilotlarining yoshlar yetakchilari ro‘yxati “OTT yoshlar yetakchilari” sahifasida berilgan. Unda OTT nomi yoki yetakchining ismi bo‘yicha qidirish mumkin.',
    ],
    more: { href: '/biz-haqimizda/boshlangich-tashkilotlar/oliy-talim', label: 'OTT yoshlar yetakchilari' },
  },

  /* ---------------- Tadbir va loyihalar ---------------- */
  {
    id: 'tadbirda-qatnashish',
    cat: 'tadbir',
    q: 'Tadbir va tanlovlarda ishtirok etish tartibi qanday?',
    a: [
      'Tanlovlar, ro‘yxatdan o‘tish va chellenjlar “E’lonlar” sahifasida, rejalashtirilgan tadbirlar “Tadbirlar va kalendar” sahifasida e’lon qilinadi. Har bir e’londa qatnashish shartlari ko‘rsatiladi.',
    ],
    more: { href: '/faoliyat/elonlar', label: 'E’lonlar' },
  },
  {
    id: 'loyiha-taklif',
    cat: 'tadbir',
    q: 'Loyiha g‘oyasini qanday taklif etish mumkin?',
    a: [
      '“Elektron murojaat” sahifasida murojaat turi sifatida “Taklif” tanlanadi va g‘oya bayon etiladi. Hujjat yoki taqdimot faylini (PDF, Word, rasm, 10 MB gacha) biriktirish mumkin.',
    ],
    more: { href: '/boglanish/murojaat', label: 'Elektron murojaat' },
  },

  /* ---------------- Murojaat ---------------- */
  {
    id: 'qanday-murojaat',
    cat: 'murojaat',
    q: 'Kengashga qanday murojaat qilish mumkin?',
    a: ['Murojaat quyidagi usullarda qabul qilinadi:'],
    li: [
      'saytdagi “Elektron murojaat” shakli orqali;',
      `elektron pochta orqali: ${EMAIL};`,
      `telefon orqali: ${PHONES.map((p) => p.v).join(', ')};`,
      'Kengash raisi va bo‘lim boshliqlarining fuqarolar qabulida (jadval “Aloqa ma’lumotlari” sahifasida).',
    ],
    more: { href: '/boglanish/murojaat', label: 'Elektron murojaat' },
  },
  {
    id: 'murojaat-muddati',
    cat: 'murojaat',
    q: 'Murojaatlar qanday muddatda ko‘rib chiqiladi?',
    a: [
      `${LAW.title}ning 28-moddasiga ko‘ra ariza va shikoyatlar kelib tushgan kundan boshlab 15 kun ičida, qo‘shimcha tekshirish yoki hujjatlar talab etilsa, bir oygacha muddatda ko‘rib chiqiladi. Takliflar bir oygacha muddatda ko‘rib chiqiladi.`,
    ],
    more: { href: '/boglanish/murojaat', label: 'Elektron murojaat' },
  },
  {
    id: 'qayerda-joylashgan',
    cat: 'murojaat',
    q: 'Kengash qayerda joylashgan va qachon ishlaydi?',
    a: [
      `${ADDRESS.line} (${ADDRESS.landmark}). Ish vaqti: ${HOURS.days.toLowerCase()}, ${HOURS.time}. ${HOURS.off}.`,
    ],
    more: { href: '/boglanish/aloqa', label: 'Aloqa ma’lumotlari' },
  },
]

/** Bosh sahifadagi qisqa blok */
export const FAQ_HOME = ['kim-azo-bolishi-mumkin', 'qanday-azo-bolaman', 'azolik-badali', 'qanday-imtiyozlar-bor', 'murojaat-muddati']

/** Ittifoq sahifasidagi aʼzolik bölimi ostida */
export const FAQ_AZOLIK = ['azolik-badali', '30-yoshdan-keyin', 'boshlangich-qanday-tuziladi']

export const pickFaq = (ids: string[]) => ids.map((id) => FAQ.find((f) => f.id === id)!).filter(Boolean)
