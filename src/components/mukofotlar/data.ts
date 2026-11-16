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
    t: '“Mard öğlon” davlat mukofoti',
    basis: 'Prezidentning 2017-yil 21-noyabrdagi PQ–3402-son qarori bilan tasdiqlangan nizom',
    img: '/img/mukofotlar/mard-oglon.png',
    prize: { base: 'bhm', k: 50 },
    who: '14 yoşdan 30 yoşgaça bölgan yigitlar: fan, taʼlim, tibbiyot, madaniyat, adabiyot, sanʼat, sport, işlab çiqariş, harbiy xizmat va huquqni muhofaza qiliş sohalarida yuksak natijalarga erişganlar',
    perks:
      'Nişon va guvohnoma; öquvçilar bakalavriatga, talabalar magistraturaga kiriş imtihonlarisiz, davlat granti asosida qabul qilinadi',
    how: 'Hujjatlar 1-martgaça yaşaş joyidagi Yoşlar işlari agentligining tuman (şahar) bölimiga topşiriladi. Hudud nomzodlari hokim tomonidan imzolanib, Prezident huzuridagi Davlat mukofotlari komissiyasiga yuboriladi.',
    count: 'Har bir hududdan 2 nafardan, jami 28 nafar',
    short: 'Har yili 14 yoşdan 30 yoşgaça bölgan 28 nafar yigit taqdirlanadi.',
    facts: ['14–30 yoş', 'Yiliga 28 nafar'],
    timeline: [
      { from: 1, to: 2, t: 'Hujjatlar qabuli' },
      { from: 3, to: 5, t: 'Saralaş bosqiçlari' },
      { from: 6, to: 6, t: '30-iyun', end: true },
    ],
    when: 'Taqdirlaş: 30-iyun — Yoşlar kuni',
    url: 'https://lex.uz/docs/3418697',
    source: 'lex.uz',
    extra: { t: 'Agentlik eʼloni', url: 'https://gov.uz/oz/yoshlar/news/view/127186' },
  },
  {
    id: 'zulfiya',
    t: '“Zulfiya” nomidagi davlat mukofoti',
    basis:
      'Prezidentning 1999-yil 10-iyundagi PF–2326-son farmoni; saralaş tartibi Vazirlar Mahkamasining 2024-yil 1-noyabrdagi 731-son qarori bilan tasdiqlangan',
    prize: { base: 'bhm', k: 50 },
    who: '14 yoşdan 30 yoşgaça bölgan qizlar: fan, taʼlim, adabiyot, madaniyat, sanʼat, sport, axborot texnologiyalari va jamoatçilik faoliyatida oxirgi uç yilda yuksak natijalarga erişganlar',
    perks:
      'Kökrak nişoni va sovrindorlik yorliği; öquvçilar bakalavriatga, talabalar magistraturaga kiriş imtihonlarisiz, davlat granti asosida qabul qilinadi',
    how: 'Hujjatlar tuman (şahar) oila va xotin-qizlar bölimiga topşiriladi. Tuman bosqiçi 2-sentabr — 20-oktabr, hududiy bosqiç suhbat bilan 21-oktabr — 30-noyabr, respublika bosqiçi 1–31-dekabr. Mukofot bir şaxsga bir marta beriladi.',
    count: 'Har bir hududdan 2 nafardan, jami 28 nafar',
    short: 'Har yili 14 yoşdan 30 yoşgaça bölgan 28 nafar qiz taqdirlanadi.',
    facts: ['14–30 yoş', 'Yiliga 28 nafar'],
    timeline: [
      { from: 9, to: 10, t: 'Tuman bosqiçi' },
      { from: 11, to: 11, t: 'Hududiy bosqiç' },
      { from: 12, to: 12, t: 'Respublika bosqiçi' },
      { from: 3, to: 3, t: '8-mart', end: true },
    ],
    when: 'Taqdirlaş: 8-mart arafasida',
    url: 'https://lex.uz/docs/213812',
    source: 'lex.uz',
    extra: { t: 'Saralaş tartibi', url: 'https://lex.uz/docs/7190311' },
  },
  {
    id: 'kelajak-bunyodkori',
    t: '“Kelajak bunyodkori” medali',
    basis: 'Özbekiston Respublikasining 2017-yil 28-dekabrdagi ÖRQ–451-son Qonuni',
    img: '/img/mukofotlar/kelajak-bunyodkori.png',
    prize: { base: 'bhm', k: 10 },
    who: '14 yoşdan 30 yoşgaça bölgan yigit va qizlar: vatanparvarlik va fidoyilik namunasini körsatgan, jamiyat hayotida faol, öqiş yoki mehnatda yuksak natijalarga erişganlar',
    perks: 'Medal; qonun hujjatlarida belgilangan imtiyozlar',
    how: 'Nomzodlar “Davlat mukofotlari töğrisida”gi Qonunda belgilangan umumiy tartibda taqdim etiladi; medal Prezident farmoni bilan beriladi.',
    count: 'Qonunda belgilanmagan',
    short: '14 yoşdan 30 yoşgaça bölgan yigit va qizlarga beriladi.',
    facts: ['14–30 yoş', 'Yigit va qizlar'],
    timeline: [{ from: 6, to: 6, t: '30-iyun', end: true }],
    when: 'Taqdirlaş: Yoşlar kuni arafasida',
    url: 'https://lex.uz/docs/3479565',
    source: 'lex.uz',
    extra: { t: '2026-yilgi farmon', url: 'https://president.uz/oz/lists/view/9360' },
  },
  {
    id: 'ilgor-ijodkor',
    t: '“Ilğor ijodkor” Prezident mukofoti',
    basis:
      'Prezidentning 2026-yil 20-apreldagi PF–66-son farmoni (“Yangi Özbekiston yoşlari — 2030” strategiyasi)',
    prize: { base: 'bhm', k: 200 },
    who: 'Şeʼriyat, dramaturgiya va bolalar adabiyoti yönalişlarida ijod qilayotgan yoş yozuvçi va şoirlar',
    perks:
      'Har bir yönaliş ğolibiga pul mukofoti Kitobxonlik madaniyatini rivojlantiriş jamğarmasi hisobidan beriladi',
    how: 'Ğoliblarni Yoşlar işlari agentligi, Taʼlim va ilm-fan vazirligi, Yozuvçilar uyuşmasi, mutaxassislar va jamoatçilik vakillaridan iborat komissiya aniqlaydi. Tanlov tartibi Vazirlar Mahkamasi tomonidan tasdiqlanadi.',
    count: 'Har bir yönaliş böyiça ğoliblar',
    short: 'Şeʼriyat, dramaturgiya va bolalar adabiyoti yönalişlarida yoş ijodkorlarga beriladi.',
    facts: ['3 ta yönaliş', 'Yoş ijodkorlar'],
    timeline: [],
    when: 'Tanlov tartibi tasdiqlanganidan söng eʼlon qilinadi',
    url: 'https://lex.uz/docs/8155028',
    source: 'lex.uz',
  },
]

export const awardSum = (a: Award) => rateFull(a.prize)
