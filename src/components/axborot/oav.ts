/**
 * “OAVda Kengaş haqida”: Kengaş haqida OAV va davlat organlari saytlaridagi materiallar.
 * Har bir havola oçib tekşirilgan (2026-yil 12-noyabr). Sarlavha — naşrdagi asl nomi
 * (özbekçasi yangi alifboda), qisqa mazmun — Axborot xizmati tayyorlagan.
 */

export type MediaKind = 'online' | 'gov'

export const MEDIA_KINDS: Record<MediaKind, string> = {
  online: 'Internet nashrlari',
  gov: 'Davlat organlari saytlari',
}

export type MediaItem = {
  outlet: string
  domain: string
  kind: MediaKind
  lang: 'uz' | 'ru'
  title: string
  date: string
  url: string
  sum: string
}

export const MEDIA: MediaItem[] = [
  {
    outlet: 'Mudofaa vazirligi',
    domain: 'gov.uz',
    kind: 'gov',
    lang: 'uz',
    title: 'Harbiy qobiliyat va liderlik sinovi',
    date: '2026-01-15',
    url: 'https://gov.uz/oz/mudofaa/news/view/120352',
    sum: 'Kengash Harbiy xavfsizlik va mudofaa universiteti bilan hamkorlikda poytaxt OTTlari talaba va yoshlar yetakchilari uchun “Vatanparvar liderlar” harbiy-vatanparvarlik kvestini o‘tkazdi.',
  },
  {
    outlet: 'Toshkent to‘qimachilik va yengil sanoat instituti',
    domain: 'ttysi.uz',
    kind: 'gov',
    lang: 'uz',
    title: 'TTYSI Yoshlar ittifoqi boshlang‘ich tashkilotining hisobot-saylov yig‘ilishi bo‘lib o‘tdi',
    date: '2025-10-10',
    url: 'https://ttysi.uz/oz/leads/report-and-election-meeti',
    sum: 'Institut boshlang‘ich tashkilotining hisobot-saylov yig‘ilishida yangi yoshlar yetakchisi saylandi. Yig‘ilishda Kengash raisi va mas’ul xodimlari qatnashdi.',
  },
  {
    outlet: 'O‘zA',
    domain: 'uza.uz',
    kind: 'online',
    lang: 'uz',
    title: 'Bugun Yoshlar ittifoqi faoliyati qanchalik samarali?',
    date: '2025-01-15',
    url: 'https://uza.uz/oz/posts/bugun-yoshlar-ittifoqi-faoliyati-qanchalik-samarali_677908',
    sum: 'O‘zbekiston milliy axborot agentligi Kengash bo‘lim boshlig‘i bilan Ittifoq faoliyati samaradorligi haqidagi suhbatni e’lon qildi.',
  },
  {
    outlet: 'Yoshlar ishlari agentligi',
    domain: 'gov.uz',
    kind: 'gov',
    lang: 'uz',
    title: '“O‘zbekiston belgisi” ko‘krak nishoni topshirildi',
    date: '2024-12-24',
    url: 'https://gov.uz/oz/yoshlar/news/view/31316',
    sum: '“O‘zbekiston belgisi” ko‘krak nishoni bilan taqdirlanganlar orasida Kengash bo‘lim boshlig‘i ham bor.',
  },
  {
    outlet: 'Oliy Majlis Senati',
    domain: 'senat.uz',
    kind: 'gov',
    lang: 'uz',
    title: 'Yoshlar parlamenti va O‘zbekiston yoshlar ittifoqi Toshkent shahar Kengashi o‘rtasida memorandum imzolandi',
    date: '2024-08-14',
    url: 'https://senat.uz/post/post-2519',
    sum: 'Talabalarning huquqiy savodxonligini oshirish va ularni qonun ijodkorligiga jalb etish bo‘yicha hamkorlik memorandumi imzolandi.',
  },
  {
    outlet: 'O‘zA',
    domain: 'uza.uz',
    kind: 'online',
    lang: 'uz',
    title: 'O‘zbekiston Yoshlar ittifoqi Toshkent shahar kengashi raisi lavozimiga yangi rahbar saylandi',
    date: '2020-12-08',
    url: 'https://uza.uz/uz/posts/ozbekiston-yoshlar-ittifoqi-toshkent-shahar-kengashi-raisi-lavozimiga-yangi-rahbar-saylandi_192698',
    sum: 'Kengash raisi lavozimiga yangi rahbar saylangani va uning Ittifoqdagi avvalgi faoliyati haqida xabar.',
  },
  {
    outlet: 'UzNews',
    domain: 'uznews.uz',
    kind: 'online',
    lang: 'ru',
    title: 'У хокима Ташкента появилась новая заместительница',
    date: '2020-03-17',
    url: 'https://www.uznews.uz/ru/news/15716',
    sum: 'Poytaxt hokimining yangi o‘rinbosari shu vaqtgacha Kengash raisi lavozimida ishlagani xabar qilindi.',
  },
  {
    outlet: 'Daryo',
    domain: 'daryo.uz',
    kind: 'online',
    lang: 'uz',
    title: 'Toshkent shahrida 168 ta yosh oilaga “Yoshlar uylari” topshirildi',
    date: '2019-12-28',
    url: 'https://daryo.uz/2019/12/28/toshkent-shahrida-168-ta-yosh-oilaga-yoshlar-uylari-topshirildi-foto/',
    sum: 'Yosh oilalarga uy topshirish tadbirida Kengash faollari qatnashdi. Uylar Kengash tizimiga murojaat qilgan nomzodlarga berildi, boshlang‘ich badalni Ittifoq to‘lab beradi.',
  },
  {
    outlet: 'Gazeta.uz',
    domain: 'gazeta.uz',
    kind: 'online',
    lang: 'ru',
    title: 'Элбек Шукуров назначен замхокима Ташкента',
    date: '2018-08-10',
    url: 'https://www.gazeta.uz/ru/2018/08/10/youth/',
    sum: 'Kengash raisi poytaxt hokimining yoshlar siyosati bo‘yicha o‘rinbosari etib tayinlandi.',
  },
  {
    outlet: 'Kun.uz',
    domain: 'kun.uz',
    kind: 'online',
    lang: 'ru',
    title: 'Назначен новый заместитель хокима Ташкента',
    date: '2018-08-10',
    url: 'https://kun.uz/ru/news/2018/08/10/naznacen-novyj-zamestitel-hokima-taskenta',
    sum: '2017-yildan Kengashni boshqargan rahbar Toshkent shahar hokimi o‘rinbosari etib tayinlangani haqida.',
  },
  {
    outlet: 'Xabar.uz',
    domain: 'xabar.uz',
    kind: 'online',
    lang: 'uz',
    title: 'Toshkentdagi eng yaxshi kitob do‘koni qaysiligini bilasizmi?',
    date: '2018-03-18',
    url: 'https://xabar.uz/uz/madaniyat/toshkentdagi-eng-yaxshi-kitob-dokoni-qaysiligini-bilasizmi',
    sum: '“Namunali kitob do‘koni” shahar tanlovi hokimlik, shahar matbuot va axborot boshqarmasi, Kengash va Yozuvchilar uyushmasi hamkorligida o‘tkazildi.',
  },
  {
    outlet: 'Gazeta.uz',
    domain: 'gazeta.uz',
    kind: 'online',
    lang: 'ru',
    title: 'Интервью. Элбек Шукуров: “Направим энергию в культуру, спорт и социальный бизнес”',
    date: '2017-08-15',
    url: 'https://www.gazeta.uz/ru/2017/08/15/shukurov/',
    sum: 'Kengash raisi bilan madaniyat, sport va ijtimoiy tadbirkorlik bo‘yicha rejalar haqida intervyu.',
  },
  {
    outlet: 'Daryo',
    domain: 'daryo.uz',
    kind: 'online',
    lang: 'uz',
    title: 'O‘zbekiston yoshlar ittifoqining Qoraqalpog‘iston, Toshkent shahri va Andijon viloyati kengashlariga raislar saylandi',
    date: '2017-07-12',
    url: 'https://daryo.uz/2017/07/11/ozbekiston-yoshlar-ittifoqining-qoraqalpogiston-toshkent-shahri-va-andijon-viloyati-kengashlariga-raislar-saylandi/',
    sum: 'Ittifoqning hududiy kengashlari, jumladan Toshkent shahar Kengashi yig‘ilishlarida yangi raislar saylandi.',
  },
  {
    outlet: 'Kun.uz',
    domain: 'kun.uz',
    kind: 'online',
    lang: 'uz',
    title: 'Toshkent yoshlar ittifoqiga rahbar saylandi',
    date: '2017-07-11',
    url: 'https://kun.uz/news/2017/07/11/toskent-eslar-ittifokiga-rabar-tajinlandi',
    sum: 'Kengashning kengaytirilgan yig‘ilishida yangi rais saylangani xabar qilindi.',
  },
  {
    outlet: 'UzNews',
    domain: 'uznews.uz',
    kind: 'online',
    lang: 'ru',
    title: 'Руководителем ташкентского союза молодежи избран Элбек Шукуров',
    date: '2017-07-11',
    url: 'https://uznews.uz/ru/news/47025',
    sum: 'Kengash yig‘ilishida yangi rais saylandi. Xabarda Prezident farmoniga ko‘ra Kengash raisi shahar hokimining yoshlar masalalari bo‘yicha maslahatchisi bo‘lishi qayd etilgan.',
  },
]
