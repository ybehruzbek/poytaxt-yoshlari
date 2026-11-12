/**
 * “Aʼzo böliş” sahifasi mazmuni — Özbekiston yoşlar ittifoqi Ustavining IV bobi (“Ittifoqqa aʼzolik”) asosida.
 * `band` — Ustavdagi band raqami (Ustav sahifasidagi #band-4.2 kabi havolaga ulanadi).
 */

/** Aʼzolik şartlari (4.2, 4.3-bandlar) */
export const CONDITIONS = [
  { k: '14–30', t: 'Yoş', d: '14 yoşga tölgan va 30 yoşdan oşmagan şaxslar aʼzo bölişi mumkin.', band: '4.2' },
  {
    k: 'Fuqarolik',
    t: 'Maqom',
    d: 'Özbekiston Respublikasi fuqarolari, şuningdek Özbekistonda muntazam yaşab kelayotgan fuqaroligi bölmagan şaxslar.',
    band: '4.2',
  },
  { k: 'Ustav', t: 'Istak', d: 'Ittifoq maqsadini qöllab-quvvatlaş istagini bildiriş.', band: '4.2' },
]

/** Aʼzolikka qabul qiliş tartibi (4.1, 4.4, 4.5-bandlar) */
export const STEPS = [
  {
    band: '4.1',
    t: 'Ariza taqdim etiladi',
    d: 'Aʼzolikka qabul qiliniş uçun öqiş yoki iş joyidagi Ittifoq boşlanğiç taşkilotiga yozma ariza taqdim etiladi.',
  },
  {
    band: '4.4',
    t: 'Ariza körib çiqiladi',
    d: 'Ariza boşlanğiç taşkilotning Umumiy yiğilişida, Kengaş şakllantirilgan bölsa — boşlanğiç taşkilot Kengaşining yiğilişida körib çiqiladi.',
  },
  {
    band: '4.5',
    t: 'Qaror qabul qilinadi',
    d: 'Boşlanğiç taşkilotning aʼzolikka qabul qiliş töğrisidagi qarori yakuniy hisoblanadi va Ittifoqning yuqori organlari tomonidan tasdiqlaniş talab qilinmaydi.',
  },
]

/** Ariza namunasi — Ustavning 4.1-bandida közda tutilgan “tegişli mazmundagi ariza” */
export const ARIZA = {
  to: (org: string) => `Özbekiston yoşlar ittifoqi ${org || '__________________'} boşlanğiç taşkiloti yetakçisiga`,
  from: (name: string) => (name ? `${name}dan` : '______________________ dan'),
  body: 'Meni Özbekiston yoşlar ittifoqi aʼzoligiga qabul qilişingizni söyrayman. Ittifoq Ustavi bilan tanişdim, uning maqsadlarini qöllab-quvvatlayman, Ustav talablariga rioya qiliş va aʼzolik majburiyatlarini bajarişni zimmamga olaman.',
}

/** B — onlayn ariza yuborilgaç: keyingi bosqiçlar */
export const AFTER = [
  'Ariza Kengaşda röyxatga olinadi va siz körsatgan öqiş yoki iş joyidagi Ittifoq boşlanğiç taşkilotiga yuboriladi.',
  'Ariza boşlanğiç taşkilotning Umumiy yiğilişida (Kengaş yiğilişida) körib çiqiladi (Ustavning 4.4-bandi).',
  'Qabul qilinganligi haqidagi qaror siz körsatgan telefon yoki elektron poçta orqali maʼlum qilinadi.',
]
