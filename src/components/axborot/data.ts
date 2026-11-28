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
  uchrashuv: 'Uchrashuvlar',
  yigilish: 'Yig‘ilishlar',
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
  /** suratlar soni */
  n: number
  /** suratlar manzillari (admin panel → Fotoalbomlar); bölmasa — /img/axborot/foto/{id}/{i}.webp */
  photos?: string[]
}

export const ALBUMS: Album[] = [
  {
    id: 7037,
    title: '“Talabalar haftaligi”: “Qizlar akademiyasi” loyihasi vakillari bilan uchrashuv',
    date: '2026-11-09',
    type: 'uchrashuv',
    place: 'O‘zbekiston davlat jahon tillari universiteti',
    n: 7,
  },
  {
    id: 7017,
    title: 'Rektor boshlang‘ich tashkilot vakillari va faol talabalar bilan uchrashdi',
    date: '2026-11-05',
    type: 'uchrashuv',
    place: 'Toshkent davlat sharqshunoslik universiteti',
    n: 10,
  },
  {
    id: 6988,
    title: 'Bloger va bankir Xojimurod Tojiboyev bilan ochiq uchrashuv',
    date: '2026-10-29',
    type: 'uchrashuv',
    place: 'Fan va texnologiyalar universiteti',
    n: 10,
  },
  {
    id: 6965,
    title: '“Mutolaa”, “Ustoz AI” loyihalari va “Yashil tashabbuslar” jamg‘armasi taqdimoti',
    date: '2026-10-27',
    type: 'taqdimot',
    place: 'Toshkent davlat yuridik universiteti',
    n: 7,
  },
  {
    id: 6973,
    title: 'Institut Yoshlar kengashi bilan uchrashuv',
    date: '2026-10-27',
    type: 'uchrashuv',
    place: 'Toshkent kimyo-texnologiya instituti',
    n: 10,
  },
  {
    id: 6947,
    title: 'Hisobot yig‘ilishi: Yoshlar kengashi a’zolariga ishonch yorliqlari topshirildi',
    date: '2026-10-23',
    type: 'yigilish',
    place: 'Toshkent davlat iqtisodiyot universiteti',
    n: 7,
  },
  {
    id: 6930,
    title: 'Toshkent davlat sharqshunoslik universiteti talabalarining Samarqandga sayohati',
    date: '2026-10-20',
    type: 'sayohat',
    place: 'Samarqand shahri',
    n: 10,
  },
  {
    id: 6916,
    title: '“Talabalikdan liderlikkacha” mavzusida ochiq muloqot',
    date: '2026-10-16',
    type: 'uchrashuv',
    place: 'Alisher Navoiy nomidagi Toshkent davlat o‘zbek tili va adabiyoti universiteti',
    n: 7,
  },
  {
    id: 6904,
    title: 'Boshlang‘ich tashkilotning ilk yig‘ilishi: yangi Yoshlar yetakchisi saylandi',
    date: '2026-10-15',
    type: 'yigilish',
    place: 'Toshkent xalqaro ijtimoiy innovatsiyalar universiteti',
    n: 10,
  },
  {
    id: 6890,
    title: '“Oliy ta’lim yetakchilarining forumi”: poytaxtdan 70 dan ortiq yoshlar yetakchisi qatnashdi',
    date: '2026-10-12',
    type: 'forum',
    place: 'Yoshlar oromgohi, Toshkent viloyati',
    n: 10,
  },
  {
    id: 6822,
    title: 'OTT yoshlar yetakchilarining 2026/2027-o‘quv yilidagi birinchi umumiy yig‘ilishi',
    date: '2026-10-08',
    type: 'yigilish',
    place: 'Toshkent arxitektura-qurilish universiteti',
    n: 10,
  },
  {
    id: 6784,
    title: 'O‘qituvchi va murabbiylar kuniga bag‘ishlangan do‘stlik sport musobaqalari',
    date: '2026-09-29',
    type: 'sport',
    place: 'Harbiy xavfsizlik va mudofaa universiteti',
    n: 9,
  },
]

/** Albomning i-surati (1 dan boşlab) */
export const photo = (a: Pick<Album, 'id' | 'photos'>, i: number) => a.photos?.[i - 1] ?? `/img/axborot/foto/${a.id}/${i}.webp`
export const cover = (a: Album) => photo(a, 1)

/* ============================== VIDEO ============================== */

export type VideoType = 'korsatuv' | 'reportaj' | 'tadbir'

export const VIDEO_TYPES: Record<VideoType, string> = {
  korsatuv: 'Ko‘rsatuv',
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
    title: '“Oliy ta’lim yetakchilarining forumi”: maxsus reportaj',
    date: '2026-10-18',
    sec: 268,
    type: 'reportaj',
    series: 'forum',
  },
  {
    id: 'gp_Urm_QTBA',
    title: '“Oliy ta’lim yetakchilarining forumi”',
    date: '2026-10-17',
    sec: 206,
    type: 'tadbir',
    series: 'forum',
  },
  {
    id: 'Zpz_SUWGtOs',
    title: '“Istiqlol farzandlari” ko‘rsatuvi. 4-qism',
    date: '2026-09-01',
    sec: 346,
    type: 'korsatuv',
    series: 'istiqlol',
  },
  {
    id: '2wc0U2rNVbE',
    title: '“Istiqlol farzandlari” ko‘rsatuvi. 3-qism',
    date: '2026-08-31',
    sec: 175,
    type: 'korsatuv',
    series: 'istiqlol',
  },
  {
    id: '5wBoX2rZCDA',
    title: '“Istiqlol farzandlari” ko‘rsatuvi. 2-qism',
    date: '2026-08-31',
    sec: 292,
    type: 'korsatuv',
    series: 'istiqlol',
  },
  {
    id: '7dulz8ihblQ',
    title: '“Istiqlol farzandlari” ko‘rsatuvi. 1-qism',
    date: '2026-08-30',
    sec: 201,
    type: 'korsatuv',
    series: 'istiqlol',
  },
  {
    id: 'S8C46HiYSmc',
    title: '“Istiqlol farzandlari” maxsus ko‘rsatuvi: tizer',
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
    title: 'Inha universitetida yangi talabalar bilan uchrashuv',
    date: '2026-08-30',
    sec: 177,
    type: 'tadbir',
    series: 'tadbir',
  },
  {
    id: 'VNf6hA_IZ2I',
    title: '“Yangi O‘zbekistonda yangi qadamlar”: Xalqaro talabalar turizm forumi',
    date: '2026-08-30',
    sec: 40,
    type: 'tadbir',
    series: 'tadbir',
  },
]

export const SERIES: { key: string; title: string; note: string }[] = [
  { key: 'istiqlol', title: '“Istiqlol farzandlari”', note: 'Mustaqillik yillarida ulg‘aygan yoshlar haqida maxsus ko‘rsatuv' },
  { key: 'forum', title: '“Oliy ta’lim yetakchilarining forumi”', note: 'Poytaxt OTT yoshlar yetakchilari respublika forumida' },
  { key: 'tadbir', title: 'Tadbirlardan lavhalar', note: 'Uchrashuvlar, tanlovlar va forumlar' },
]

export type Short = { id: string; title: string }

export const SHORTS: Short[] = [
  { id: '07PwcXp8XWw', title: 'OTT boshlang‘ich tashkilot yetakchilari yig‘ilishi' },
  { id: '2fQp5UzUSrQ', title: 'Toshkent shahar Yosh o‘qituvchi va olimlar kengashining birinchi ta’sis yig‘ilishi' },
  { id: '7S2siUrmzuQ', title: '“Toshkent talabalar assotsiatsiyasi”ning ilk ta’sis yig‘ilishi' },
  { id: 'eRFMEc8yZv0', title: 'Toshkent shahar bolalar tashkilotining birinchi konferensiyasi' },
  { id: 'vfO43mtjgag', title: 'O‘zbekiston davlat jahon tillari universitetida “Ishonch yorlig‘i” topshirildi' },
  { id: 'smseGi--tNw', title: 'Toshkent to‘qimachilik va yengil sanoat institutida “Ishonch yorlig‘i” topshirildi' },
  { id: 'V8C7Kf5KeNU', title: 'Harbiy tibbiyot akademiyasida “Saylov va yoshlar” davra suhbati' },
  { id: 'eYDaG7HTpxM', title: '“Saylov va yoshlar” mavzusida davra suhbati' },
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

/** Jurnalistlar uçun aloqa: Kengaş Axborot xizmati */
export const PRESS_CONTACT = {
  unit: 'Axborot xizmati bo‘limi',
  phone: { v: '+998 71 246-10-80', href: 'tel:+998712461080' },
  email: { v: 'info@yoshkent.uz', href: 'mailto:info@yoshkent.uz' },
  telegram: { v: '@poytaxtyoshlari_yi', href: 'https://t.me/poytaxtyoshlari_yi' },
}
