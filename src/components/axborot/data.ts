/**
 * Axborot xizmati: fotoalbomlar, videolar, press-relizlar.
 * VAQTINÇA: Kengaşning rasmiy Telegram va YouTube kanallaridagi haqiqiy materiallar asosida;
 * admin panel (Payload) ulanganda şu röyxatlar bazadan olinadi.
 */

export const MONTHS = [
  'yanvar',
  'fevral',
  'mart',
  'aprel',
  'may',
  'iyun',
  'iyul',
  'avgust',
  'sentabr',
  'oktabr',
  'noyabr',
  'dekabr',
]

/** “2026-12-noyabr” emas, “12-noyabr, 2026” — kun va oy, yil alohida */
export function dayMonth(iso: string) {
  const [, m, d] = iso.split('-').map(Number)
  return `${d}-${MONTHS[m - 1]}`
}
export function fullDate(iso: string) {
  return `${iso.slice(0, 4)}-yil ${dayMonth(iso)}`
}
export function monthKey(iso: string) {
  const [y, m] = iso.split('-').map(Number)
  return `${MONTHS[m - 1][0].toUpperCase()}${MONTHS[m - 1].slice(1)}, ${y}`
}
export function dur(sec: number) {
  return `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, '0')}`
}

/* ============================== FOTO ============================== */

export type AlbumType = 'uchrashuv' | 'forum' | 'yigilish' | 'sayohat' | 'sport' | 'taqdimot'

export const ALBUM_TYPES: Record<AlbumType, string> = {
  uchrashuv: 'Uçraşuvlar',
  yigilish: 'Yiğilişlar',
  forum: 'Forumlar',
  taqdimot: 'Taqdimotlar',
  sayohat: 'Sayohatlar',
  sport: 'Sport',
}

export type Album = {
  id: number
  title: string
  date: string
  type: AlbumType
  place: string
  /** suratlar soni: /img/axborot/foto/{id}/{1..n}.webp */
  n: number
}

export const ALBUMS: Album[] = [
  {
    id: 7037,
    title: '“Talabalar haftaligi”: “Qizlar akademiyasi” loyihasi vakillari bilan uçraşuv',
    date: '2026-11-09',
    type: 'uchrashuv',
    place: 'Özbekiston davlat jahon tillari universiteti',
    n: 7,
  },
  {
    id: 7017,
    title: 'Rektor boşlanğiç taşkilot vakillari va faol talabalar bilan uçraşdi',
    date: '2026-11-05',
    type: 'uchrashuv',
    place: 'Toşkent davlat şarqşunoslik universiteti',
    n: 10,
  },
  {
    id: 6988,
    title: 'Bloger va bankir Xojimurod Tojiboyev bilan oçiq uçraşuv',
    date: '2026-10-29',
    type: 'uchrashuv',
    place: 'Fan va texnologiyalar universiteti',
    n: 10,
  },
  {
    id: 6965,
    title: '“Mutolaa”, “Ustoz AI” loyihalari va “Yaşil taşabbuslar” jamğarmasi taqdimoti',
    date: '2026-10-27',
    type: 'taqdimot',
    place: 'Toşkent davlat yuridik universiteti',
    n: 7,
  },
  {
    id: 6973,
    title: 'Institut Yoşlar kengaşi bilan uçraşuv',
    date: '2026-10-27',
    type: 'uchrashuv',
    place: 'Toşkent kimyo-texnologiya instituti',
    n: 10,
  },
  {
    id: 6947,
    title: 'Hisobot yiğilişi: Yoşlar kengaşi aʼzolariga işonç yorliqlari topşirildi',
    date: '2026-10-23',
    type: 'yigilish',
    place: 'Toşkent davlat iqtisodiyot universiteti',
    n: 7,
  },
  {
    id: 6930,
    title: 'Şarqşunoslik universiteti talabalari qadimiy Samarqandda',
    date: '2026-10-20',
    type: 'sayohat',
    place: 'Samarqand şahri',
    n: 10,
  },
  {
    id: 6916,
    title: '“Talabalikdan liderlikkaça” mavzusida oçiq muloqot',
    date: '2026-10-16',
    type: 'uchrashuv',
    place: 'Alişer Navoiy nomidagi Toşkent davlat özbek tili va adabiyoti universiteti',
    n: 7,
  },
  {
    id: 6904,
    title: 'Boşlanğiç taşkilotning ilk yiğilişi: yangi Yoşlar yetakçisi saylandi',
    date: '2026-10-15',
    type: 'yigilish',
    place: 'Toşkent xalqaro ijtimoiy innovatsiyalar universiteti',
    n: 10,
  },
  {
    id: 6890,
    title: '“Oliy taʼlim yetakçilarining forumi”: poytaxtning 70 dan ortiq yoşlar yetakçisi',
    date: '2026-10-12',
    type: 'forum',
    place: 'Yoşlar oromgohi',
    n: 10,
  },
  {
    id: 6822,
    title: 'OTT yoşlar yetakçilarining 2026/2027-öquv yilidagi birinçi umumiy yiğilişi',
    date: '2026-10-08',
    type: 'yigilish',
    place: 'Toşkent arxitektura-quriliş universiteti',
    n: 10,
  },
  {
    id: 6784,
    title: 'Öqituvçi va murabbiylar kuniga bağişlangan döstlik sport musobaqalari',
    date: '2026-09-29',
    type: 'sport',
    place: 'Harbiy xavfsizlik va mudofaa universiteti',
    n: 9,
  },
]

export const photo = (id: number, i: number) => `/img/axborot/foto/${id}/${i}.webp`
export const cover = (a: Album) => photo(a.id, 1)

/* ============================== VIDEO ============================== */

export type VideoType = 'korsatuv' | 'reportaj' | 'tadbir'

export const VIDEO_TYPES: Record<VideoType, string> = {
  korsatuv: 'Körsatuv',
  reportaj: 'Reportaj',
  tadbir: 'Tadbir',
}

export type Video = {
  id: string
  title: string
  date: string
  /** davomiyligi (soniya) — YouTube lentasidan kelgan yangi videolarda bölmaydi */
  sec?: number
  type?: VideoType
  /** körsatuv turkumi (playlist) */
  series?: string
}

export const VIDEOS: Video[] = [
  {
    id: 'hSJUcwB0qUM',
    title: '“Oliy taʼlim yetakçilarining forumi”: maxsus reportaj',
    date: '2026-10-18',
    sec: 268,
    type: 'reportaj',
    series: 'forum',
  },
  {
    id: 'gp_Urm_QTBA',
    title: '“Oliy taʼlim yetakçilarining forumi”',
    date: '2026-10-17',
    sec: 206,
    type: 'tadbir',
    series: 'forum',
  },
  {
    id: 'Zpz_SUWGtOs',
    title: '“Istiqlol farzandlari” körsatuvi. 4-qism',
    date: '2026-09-01',
    sec: 346,
    type: 'korsatuv',
    series: 'istiqlol',
  },
  {
    id: '2wc0U2rNVbE',
    title: '“Istiqlol farzandlari” körsatuvi. 3-qism',
    date: '2026-08-31',
    sec: 175,
    type: 'korsatuv',
    series: 'istiqlol',
  },
  {
    id: '5wBoX2rZCDA',
    title: '“Istiqlol farzandlari” körsatuvi. 2-qism',
    date: '2026-08-31',
    sec: 292,
    type: 'korsatuv',
    series: 'istiqlol',
  },
  {
    id: '7dulz8ihblQ',
    title: '“Istiqlol farzandlari” körsatuvi. 1-qism',
    date: '2026-08-30',
    sec: 201,
    type: 'korsatuv',
    series: 'istiqlol',
  },
  {
    id: 'S8C46HiYSmc',
    title: '“Istiqlol farzandlari” maxsus körsatuvi: tizer',
    date: '2026-08-30',
    sec: 70,
    type: 'korsatuv',
    series: 'istiqlol',
  },
  {
    id: 'P7J0NGaUl2M',
    title: 'IIV akademiyasida “Mening tanlovim — Obod Vatanim” tadbiri',
    date: '2026-08-30',
    sec: 110,
    type: 'tadbir',
    series: 'tadbir',
  },
  {
    id: 'mO0sJgCZnc8',
    title: 'Inha universitetida yangi talabalar bilan uçraşuv',
    date: '2026-08-30',
    sec: 177,
    type: 'tadbir',
    series: 'tadbir',
  },
  {
    id: 'VNf6hA_IZ2I',
    title: '“Yangi Özbekistonda yangi qadamlar”: Xalqaro talabalar turizm forumi',
    date: '2026-08-30',
    sec: 40,
    type: 'tadbir',
    series: 'tadbir',
  },
]

export const SERIES: { key: string; title: string; note: string }[] = [
  { key: 'istiqlol', title: '“Istiqlol farzandlari”', note: 'Mustaqillik yillarida ulğaygan yoşlar haqida maxsus körsatuv' },
  { key: 'forum', title: 'Oliy taʼlim yetakçilarining forumi', note: 'Poytaxt OTT yoşlar yetakçilari respublika forumida' },
  { key: 'tadbir', title: 'Tadbirlardan lavhalar', note: 'Uçraşuvlar, tanlovlar va forumlar' },
]

export type Short = { id: string; title: string }

export const SHORTS: Short[] = [
  { id: '07PwcXp8XWw', title: 'OTT boşlanğiç taşkilot yetakçilari yiğilişi' },
  { id: '2fQp5UzUSrQ', title: 'Toşkent şahar Yoş öqituvçi va olimlar kengaşining 1-taʼsis yiğilişi' },
  { id: '7S2siUrmzuQ', title: '“Toşkent talabalar assotsiatsiyasi”ning ilk taʼsis yiğilişi' },
  { id: 'eRFMEc8yZv0', title: 'Toşkent şahar bolalar taşkilotining 1-konferensiyasi' },
  { id: 'vfO43mtjgag', title: 'Özbekiston davlat jahon tillari universitetida “Işonç yorliği” topşirildi' },
  { id: 'smseGi--tNw', title: 'Toşkent töqimaçilik va yengil sanoat institutida “Işonç yorliği” topşirildi' },
  { id: 'V8C7Kf5KeNU', title: 'Harbiy tibbiyot akademiyasida “Saylov va yoşlar” davra suhbati' },
  { id: 'eYDaG7HTpxM', title: '“Saylov va yoşlar” mavzusida davra suhbati' },
  { id: 'weelp6GIEnE', title: 'IIV akademiyasida “Mening tanlovim — Obod Vatanim”' },
]

/** Muqova: arxivdagilar — saytdagi siqilgan nusxa, kanalga yangi joylanganlar — YouTube'dan */
const LOCAL = new Set([...VIDEOS, ...SHORTS].map((v) => v.id))
const YTI = { code: 'https://i.ytimg.com/vi/' }.code
export const thumb = (id: string) =>
  LOCAL.has(id) ? `/img/axborot/video/${id}.webp` : `${YTI}${id}/hq720.jpg`
export const shortThumb = (id: string) =>
  LOCAL.has(id) ? `/img/axborot/video/s-${id}.webp` : `${YTI}${id}/hqdefault.jpg`

/* ============================== PRESS-RELIZLAR ============================== */

export type ReleaseType = 'xabar' | 'elon' | 'tanlov'

export const RELEASE_TYPES: Record<ReleaseType, string> = {
  xabar: 'Rasmiy xabar',
  elon: 'Eʼlon',
  tanlov: 'Tanlov',
}

export type Release = {
  date: string
  type: ReleaseType
  title: string
  lead: string
  /** muqova surati (ixtiyoriy) */
  img?: string
}

export const RELEASES: Release[] = [
  {
    date: '2026-11-12',
    type: 'tanlov',
    title: '“Bayroğim mening nigohimda” videoroliklar tanlovi eʼlon qilindi',
    lead: '18-noyabr — Özbekiston Respublikasi Davlat bayroği qabul qilingan kun munosabati bilan yoşlar orasida Vatanga muhabbat va milliy ğurur mavzusidagi videoroliklar tanlovi boşlandi. 9:16 va 16:9 formatdagi ijodiy işlar qabul qilinadi.',
  },
  {
    date: '2026-10-25',
    type: 'tanlov',
    title: 'Respublika ilmiy maqolalar tanlovi: “Hududlarni iqtisodiy rivojlantirişda ilmiy ğoyalar”',
    lead: 'Oliy Majlis Senati huzuridagi Yoşlar parlamenti va Kengaş hamkorligida eʼlon qilingan tanlovga maqolalar 2026-yil 30-oktabrgaça qabul qilindi.',
  },
  {
    date: '2026-10-16',
    type: 'elon',
    title: '“Ajdodlar izidan” intellektual tanlovining respublika bosqiçi',
    lead: '24-oktabr kuni Yoşlar ijod saroyida yoş harbiy xizmatçilar va kursantlar örtasida kitobxonlik va vatanparvarlik ruhidagi intellektual bellaşuv bölib ötdi.',
  },
  {
    date: '2026-10-12',
    type: 'xabar',
    title: 'Poytaxtning 70 dan ortiq yoşlar yetakçisi respublika forumida qatnaşdi',
    lead: '9–11-oktabr kunlari Markaziy Kengaş tomonidan ötkazilgan “Oliy taʼlim yetakçilarining forumi”da Toşkent şahridagi OTT yoşlar yetakçilari seminar, treninglar va oçiq muloqotlarda faol iştirok etdi.',
    img: '/img/axborot/foto/6890/1.webp',
  },
  {
    date: '2026-10-08',
    type: 'xabar',
    title: 'Toşkent şahrida “Hududiy koordinatorlar instituti” modeli joriy etiladi',
    lead: 'Kengaş qamrovidagi 98 ta oliy taʼlim taşkiloti joylaşuviga köra 9 ta hududiy guruhga birlaştirildi. Model boşlanğiç taşkilotlar hamkorligini kuçaytiriş va iqtidorli yoşlarni aniqlaşga qaratilgan.',
    img: '/img/axborot/foto/6822/2.webp',
  },
  {
    date: '2026-10-08',
    type: 'xabar',
    title: 'OTT yoşlar yetakçilarining 2026/2027-öquv yilidagi birinçi umumiy yiğilişi bölib ötdi',
    lead: 'Toşkent arxitektura-quriliş universitetida boşlanğiç taşkilotlar oldida turgan ustuvor maqsad va vazifalar belgilab olindi.',
    img: '/img/axborot/foto/6822/1.webp',
  },
  {
    date: '2026-10-07',
    type: 'elon',
    title: 'Boşlanğiç taşkilotlarning kengaytirilgan yiğilişi ötkaziladi',
    lead: 'Yiğilişda OTTlardagi boşlanğiç taşkilotlarning 2026–2027-öquv yilidagi ustuvor vazifalari va yoşlar bilan işlaş samaradorligini oşiriş masalalari körib çiqiladi.',
  },
  {
    date: '2026-09-29',
    type: 'xabar',
    title: 'Talaba va kursantlar örtasida döstlik sport musobaqalari ötkazildi',
    lead: '25–26-sentabr kunlari Harbiy xavfsizlik va mudofaa universitetida Öqituvçi va murabbiylar kuniga bağişlangan musobaqalar hamkorlik memorandumlari ijrosi doirasida taşkil etildi.',
    img: '/img/axborot/foto/6784/1.webp',
  },
]

/** Jurnalistlar uçun aloqa: Kengaş Axborot xizmati */
export const PRESS_CONTACT = {
  unit: 'Axborot xizmati bölimi',
  phone: { v: '+998 71 246-10-80', href: 'tel:+998712461080' },
  email: { v: 'info@yoshkent.uz', href: 'mailto:info@yoshkent.uz' },
  telegram: { v: '@poytaxtyoshlari_yi', href: 'https://t.me/poytaxtyoshlari_yi' },
}
