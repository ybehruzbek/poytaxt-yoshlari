/**
 * Yoşlar uçun taʼsis etilgan davlat mukofotlari. Huquqiy asos va nizomlar lex.uz dagi amaldagi tahrirlar böyiça tekşirilgan.
 * Pul mukofotlari BHM ga bog'langan (lib/miqdorlar.ts): BHM özgarsa, summalar özi qayta hisoblanadi.
 */
import { rateFull, type Rate } from '@/lib/miqdorlar'

export type Award = {
  id: string
  t: string
  /** mukofotni taʼsis etgan hujjat */
  basis: string
  /** medal yoki nişon tasviri (bölsa) */
  img?: string
  prize: Rate
  who: string
  perks: string
  how: string
  count: string
  /** qisqa tavsif: kimlar uçun va yiliga neça kişi (havola panellarida) */
  short: string
  /** karta boşidagi qisqa ikki fakt (medal yonida) */
  facts: [string, string]
  /** yil davomidagi jarayon: oy raqamlari (1–12) va izoh — vaqt çizğisi uçun; `end` — taqdirlaş */
  timeline: { from: number; to: number; t: string; end?: boolean }[]
  /** taqdirlaş vaqti */
  when: string
  url: string
  source: string
  extra?: { t: string; url: string }
}

export const AWARDS: Award[] = [
  {
    id: 'mard-oglon',
    t: '“Mard o‘g‘lon” davlat mukofoti',
    basis: 'Prezidentning 2017-yil 21-noyabrdagi PQ–3402-son qarori bilan tasdiqlangan nizom',
    img: '/img/mukofotlar/mard-oglon.png',
    prize: { base: 'bhm', k: 50 },
    who: '14 yoshdan 30 yoshgacha bo‘lgan yigitlar: fan, ta’lim, tibbiyot, madaniyat, adabiyot, san’at, sport, ishlab chiqarish, harbiy xizmat va huquqni muhofaza qilish sohalarida yuksak natijalarga erishganlar',
    perks:
      'Nishon va guvohnoma; o‘quvchilar bakalavriatga, talabalar magistraturaga kirish imtihonlarisiz, davlat granti asosida qabul qilinadi',
    how: 'Hujjatlar 1-martgacha yashash joyidagi Yoshlar ishlari agentligining tuman (shahar) bo‘limiga topshiriladi. Hudud nomzodlari hokim tomonidan imzolanib, Prezident huzuridagi Davlat mukofotlari komissiyasiga yuboriladi.',
    count: 'Har bir hududdan 2 nafardan, jami 28 nafar',
    short: 'Har yili 14 yoshdan 30 yoshgacha bo‘lgan 28 nafar yigit taqdirlanadi.',
    facts: ['14–30 yosh', 'Yiliga 28 nafar'],
    timeline: [
      { from: 1, to: 2, t: 'Hujjatlar qabuli' },
      { from: 3, to: 5, t: 'Saralash bosqichlari' },
      { from: 6, to: 6, t: '30-iyun', end: true },
    ],
    when: 'Taqdirlash: 30-iyun — Yoshlar kuni',
    url: 'https://lex.uz/docs/3418697',
    source: 'lex.uz',
    extra: { t: 'Agentlik e’loni', url: 'https://gov.uz/oz/yoshlar/news/view/127186' },
  },
  {
    id: 'zulfiya',
    t: '“Zulfiya” nomidagi davlat mukofoti',
    basis:
      'Prezidentning 1999-yil 10-iyundagi PF–2326-son farmoni; saralash tartibi Vazirlar Mahkamasining 2024-yil 1-noyabrdagi 731-son qarori bilan tasdiqlangan',
    prize: { base: 'bhm', k: 50 },
    who: '14 yoshdan 30 yoshgacha bo‘lgan qizlar: fan, ta’lim, adabiyot, madaniyat, san’at, sport, axborot texnologiyalari va jamoatchilik faoliyatida oxirgi uch yilda yuksak natijalarga erishganlar',
    perks:
      'Ko‘krak nishoni va sovrindorlik yorlig‘i; o‘quvchilar bakalavriatga, talabalar magistraturaga kirish imtihonlarisiz, davlat granti asosida qabul qilinadi',
    how: 'Hujjatlar tuman (shahar) oila va xotin-qizlar bo‘limiga topshiriladi. Tuman bosqichi 2-sentabr — 20-oktabr, hududiy bosqich suhbat bilan 21-oktabr — 30-noyabr, respublika bosqichi 1–31-dekabr. Mukofot bir shaxsga bir marta beriladi.',
    count: 'Har bir hududdan 2 nafardan, jami 28 nafar',
    short: 'Har yili 14 yoshdan 30 yoshgacha bo‘lgan 28 nafar qiz taqdirlanadi.',
    facts: ['14–30 yosh', 'Yiliga 28 nafar'],
    timeline: [
      { from: 9, to: 10, t: 'Tuman bosqichi' },
      { from: 11, to: 11, t: 'Hududiy bosqich' },
      { from: 12, to: 12, t: 'Respublika bosqichi' },
      { from: 3, to: 3, t: '8-mart', end: true },
    ],
    when: 'Taqdirlash: 8-mart arafasida',
    url: 'https://lex.uz/docs/213812',
    source: 'lex.uz',
    extra: { t: 'Saralash tartibi', url: 'https://lex.uz/docs/7190311' },
  },
  {
    id: 'kelajak-bunyodkori',
    t: '“Kelajak bunyodkori” medali',
    basis: 'O‘zbekiston Respublikasining 2017-yil 28-dekabrdagi O‘RQ–451-son Qonuni',
    img: '/img/mukofotlar/kelajak-bunyodkori.png',
    prize: { base: 'bhm', k: 10 },
    who: '14 yoshdan 30 yoshgacha bo‘lgan yigit va qizlar: vatanparvarlik va fidoyilik namunasini ko‘rsatgan, jamiyat hayotida faol, o‘qish yoki mehnatda yuksak natijalarga erishganlar',
    perks: 'Medal; qonun hujjatlarida belgilangan imtiyozlar',
    how: 'Nomzodlar “Davlat mukofotlari to‘g‘risida”gi Qonunda belgilangan umumiy tartibda taqdim etiladi; medal Prezident farmoni bilan beriladi.',
    count: 'Qonunda belgilanmagan',
    short: '14 yoshdan 30 yoshgacha bo‘lgan yigit va qizlarga beriladi.',
    facts: ['14–30 yosh', 'Yigit va qizlar'],
    timeline: [{ from: 6, to: 6, t: '30-iyun', end: true }],
    when: 'Taqdirlash: Yoshlar kuni arafasida',
    url: 'https://lex.uz/docs/3479565',
    source: 'lex.uz',
    extra: { t: '2026-yilgi farmon', url: 'https://president.uz/oz/lists/view/9360' },
  },
  {
    id: 'ilgor-ijodkor',
    t: '“Ilg‘or ijodkor” Prezident mukofoti',
    basis:
      'Prezidentning 2026-yil 20-apreldagi PF–66-son farmoni (“Yangi O‘zbekiston yoshlari — 2030” strategiyasi)',
    prize: { base: 'bhm', k: 200 },
    who: 'She’riyat, dramaturgiya va bolalar adabiyoti yo‘nalishlarida ijod qilayotgan yosh yozuvchi va shoirlar',
    perks:
      'Har bir yo‘nalish g‘olibiga pul mukofoti Kitobxonlik madaniyatini rivojlantirish jamg‘armasi hisobidan beriladi',
    how: 'G‘oliblarni Yoshlar ishlari agentligi, Ta’lim va ilm-fan vazirligi, Yozuvchilar uyushmasi, mutaxassislar va jamoatchilik vakillaridan iborat komissiya aniqlaydi. Tanlov tartibi Vazirlar Mahkamasi tomonidan tasdiqlanadi.',
    count: 'Har bir yo‘nalish bo‘yicha g‘oliblar',
    short: 'She’riyat, dramaturgiya va bolalar adabiyoti yo‘nalishlarida yosh ijodkorlarga beriladi.',
    facts: ['3 ta yo‘nalish', 'Yosh ijodkorlar'],
    timeline: [],
    when: 'Tanlov tartibi tasdiqlanganidan so‘ng e’lon qilinadi',
    url: 'https://lex.uz/docs/8155028',
    source: 'lex.uz',
  },
]

export const awardSum = (a: Award) => rateFull(a.prize)
