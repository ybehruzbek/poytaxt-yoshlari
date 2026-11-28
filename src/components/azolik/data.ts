/**
 * “Aʼzo böliş” sahifasi mazmuni — Özbekiston yoşlar ittifoqi Ustavining IV bobi (“Ittifoqqa aʼzolik”) asosida.
 * `band` — Ustavdagi band raqami (Ustav sahifasidagi #band-4.2 kabi havolaga ulanadi).
 */

/** Aʼzolik şartlari (4.2, 4.3-bandlar) */
export const CONDITIONS = [
  { k: '14–30', t: 'Yosh', d: '14 yoshga to‘lgan va 30 yoshdan oshmagan shaxslar a’zo bo‘lishi mumkin.', band: '4.2' },
  {
    k: 'Fuqarolik',
    t: 'Maqom',
    d: 'O‘zbekiston Respublikasi fuqarolari, shuningdek O‘zbekistonda muntazam yashab kelayotgan fuqaroligi bo‘lmagan shaxslar.',
    band: '4.2',
  },
  { k: 'Ustav', t: 'Istak', d: 'Ittifoq maqsadini qo‘llab-quvvatlash istagini bildirish.', band: '4.2' },
]

/** Aʼzolikka qabul qiliş tartibi (4.1, 4.4, 4.5-bandlar) */
export const STEPS = [
  {
    band: '4.1',
    t: 'Ariza taqdim etiladi',
    d: 'A’zolikka qabul qilinish uchun o‘qish yoki ish joyidagi Ittifoq boshlang‘ich tashkilotiga yozma ariza taqdim etiladi.',
  },
  {
    band: '4.4',
    t: 'Ariza ko‘rib chiqiladi',
    d: 'Ariza boshlang‘ich tashkilotning Umumiy yig‘ilishida, Kengash shakllantirilgan bo‘lsa — boshlang‘ich tashkilot Kengashining yig‘ilishida ko‘rib chiqiladi.',
  },
  {
    band: '4.5',
    t: 'Qaror qabul qilinadi',
    d: 'Boshlang‘ich tashkilotning a’zolikka qabul qilish to‘g‘risidagi qarori yakuniy hisoblanadi va Ittifoqning yuqori organlari tomonidan tasdiqlanish talab qilinmaydi.',
  },
]

/** Onlayn ariza yuborilgaç: keyingi bosqiçlar */
export const AFTER = [
  'Ariza Kengashda ro‘yxatga olinadi va siz ko‘rsatgan o‘qish yoki ish joyidagi Ittifoq boshlang‘ich tashkilotiga yuboriladi.',
  'Ariza boshlang‘ich tashkilotning Umumiy yig‘ilishida (Kengash yig‘ilishida) ko‘rib chiqiladi (Ustavning 4.4-bandi).',
  'Qabul qilinganligi haqidagi qaror siz ko‘rsatgan telefon yoki elektron pochta orqali ma’lum qilinadi.',
]
