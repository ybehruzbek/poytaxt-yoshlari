/**
 * “OAV biz haqimizda”: Kengaş haqida OAV va davlat organlari saytlaridagi materiallar.
 * Har bir havola oçib tekşirilgan (2026-yil 12-noyabr). Sarlavha — naşrdagi asl nomi
 * (özbekçasi yangi alifboda), qisqa mazmun — Axborot xizmati tayyorlagan.
 */

export type MediaKind = 'online' | 'gov'

export const MEDIA_KINDS: Record<MediaKind, string> = {
  online: 'Internet naşrlari',
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
    sum: 'Kengaş Harbiy xavfsizlik va mudofaa universiteti bilan hamkorlikda poytaxt OTTlari talaba va yoşlar yetakçilari uçun “Vatanparvar liderlar” harbiy-vatanparvarlik kvestini ötkazdi.',
  },
  {
    outlet: 'Toşkent töqimaçilik va yengil sanoat instituti',
    domain: 'ttysi.uz',
    kind: 'gov',
    lang: 'uz',
    title: 'TTYSI Yoşlar ittifoqi boşlanğiç taşkilotining hisobot-saylov yiğilişi bölib ötdi',
    date: '2025-10-10',
    url: 'https://ttysi.uz/oz/leads/report-and-election-meeti',
    sum: 'Institut boşlanğiç taşkilotining hisobot-saylov yiğilişida yangi yoşlar yetakçisi saylandi. Yiğilişda Kengaş raisi va masʼul xodimlari qatnaşdi.',
  },
  {
    outlet: 'ÖzA',
    domain: 'uza.uz',
    kind: 'online',
    lang: 'uz',
    title: 'Bugun Yoşlar ittifoqi faoliyati qançalik samarali?',
    date: '2025-01-15',
    url: 'https://uza.uz/oz/posts/bugun-yoshlar-ittifoqi-faoliyati-qanchalik-samarali_677908',
    sum: 'Özbekiston milliy axborot agentligi Kengaş bölim boşliği bilan Ittifoq faoliyati samaradorligi haqidagi suhbatni eʼlon qildi.',
  },
  {
    outlet: 'Yoşlar işlari agentligi',
    domain: 'gov.uz',
    kind: 'gov',
    lang: 'uz',
    title: '“Özbekiston belgisi” körkak nişoni topşirildi',
    date: '2024-12-24',
    url: 'https://gov.uz/oz/yoshlar/news/view/31316',
    sum: '“Özbekiston belgisi” körkak nişoni bilan taqdirlanganlar orasida Kengaş bölim boşliği ham bor.',
  },
  {
    outlet: 'Oliy Majlis Senati',
    domain: 'senat.uz',
    kind: 'gov',
    lang: 'uz',
    title: 'Yoşlar parlamenti va Özbekiston yoşlar ittifoqi Toşkent şahar Kengaşi örtasida memorandum imzolandi',
    date: '2024-08-14',
    url: 'https://senat.uz/post/post-2519',
    sum: 'Talabalarning huquqiy savodxonligini oşiriş va ularni qonun ijodkorligiga jalb etiş böyiça hamkorlik memorandumi imzolandi.',
  },
  {
    outlet: 'ÖzA',
    domain: 'uza.uz',
    kind: 'online',
    lang: 'uz',
    title: 'Özbekiston Yoşlar ittifoqi Toşkent şahar kengaşi raisi lavozimiga yangi rahbar saylandi',
    date: '2020-12-08',
    url: 'https://uza.uz/uz/posts/ozbekiston-yoshlar-ittifoqi-toshkent-shahar-kengashi-raisi-lavozimiga-yangi-rahbar-saylandi_192698',
    sum: 'Kengaş raisi lavozimiga yangi rahbar saylangani va uning Ittifoqdagi avvalgi faoliyati haqida xabar.',
  },
  {
    outlet: 'UzNews',
    domain: 'uznews.uz',
    kind: 'online',
    lang: 'ru',
    title: 'У хокима Ташкента появилась новая заместительница',
    date: '2020-03-17',
    url: 'https://www.uznews.uz/ru/news/15716',
    sum: 'Poytaxt hokimining yangi örinbosari şu vaqtgaça Kengaş raisi lavozimida işlagani xabar qilindi.',
  },
  {
    outlet: 'Daryo',
    domain: 'daryo.uz',
    kind: 'online',
    lang: 'uz',
    title: 'Toşkent şahrida 168 ta yoş oilaga “Yoşlar uylari” topşirildi',
    date: '2019-12-28',
    url: 'https://daryo.uz/2019/12/28/toshkent-shahrida-168-ta-yosh-oilaga-yoshlar-uylari-topshirildi-foto/',
    sum: 'Yoş oilalarga uy topşiriş tadbirida Kengaş faollari qatnaşdi. Uylar Kengaş tizimiga murojaat qilgan nomzodlarga berildi, boşlanğiç badalni Ittifoq tölab beradi.',
  },
  {
    outlet: 'Gazeta.uz',
    domain: 'gazeta.uz',
    kind: 'online',
    lang: 'ru',
    title: 'Элбек Шукуров назначен замхокима Ташкента',
    date: '2018-08-10',
    url: 'https://www.gazeta.uz/ru/2018/08/10/youth/',
    sum: 'Kengaş raisi poytaxt hokimining yoşlar siyosati böyiça örinbosari etib tayinlandi.',
  },
  {
    outlet: 'Kun.uz',
    domain: 'kun.uz',
    kind: 'online',
    lang: 'ru',
    title: 'Назначен новый заместитель хокима Ташкента',
    date: '2018-08-10',
    url: 'https://kun.uz/ru/news/2018/08/10/naznacen-novyj-zamestitel-hokima-taskenta',
    sum: '2017-yildan Kengaşni boşqargan rahbar Toşkent şahar hokimi örinbosari etib tayinlangani haqida.',
  },
  {
    outlet: 'Xabar.uz',
    domain: 'xabar.uz',
    kind: 'online',
    lang: 'uz',
    title: 'Toşkentdagi eng yaxşi kitob dökoni qaysiligini bilasizmi?',
    date: '2018-03-18',
    url: 'https://xabar.uz/uz/madaniyat/toshkentdagi-eng-yaxshi-kitob-dokoni-qaysiligini-bilasizmi',
    sum: '“Namunali kitob dökoni” şahar tanlovi hokimlik, şahar matbuot va axborot boşqarmasi, Kengaş va Yozuvçilar uyuşmasi hamkorligida ötkazildi.',
  },
  {
    outlet: 'Gazeta.uz',
    domain: 'gazeta.uz',
    kind: 'online',
    lang: 'ru',
    title: 'Интервью. Элбек Шукуров: “Направим энергию в культуру, спорт и социальный бизнес”',
    date: '2017-08-15',
    url: 'https://www.gazeta.uz/ru/2017/08/15/shukurov/',
    sum: 'Kengaş raisi bilan madaniyat, sport va ijtimoiy tadbirkorlik böyiça rejalar haqida intervyu.',
  },
  {
    outlet: 'Daryo',
    domain: 'daryo.uz',
    kind: 'online',
    lang: 'uz',
    title: 'Özbekiston yoşlar ittifoqining Qoraqalpoğiston, Toşkent şahri va Andijon viloyati kengaşlariga raislar saylandi',
    date: '2017-07-12',
    url: 'https://daryo.uz/2017/07/11/ozbekiston-yoshlar-ittifoqining-qoraqalpogiston-toshkent-shahri-va-andijon-viloyati-kengashlariga-raislar-saylandi/',
    sum: 'Ittifoqning hududiy kengaşlari, jumladan Toşkent şahar Kengaşi yiğilişlarida yangi raislar saylandi.',
  },
  {
    outlet: 'Kun.uz',
    domain: 'kun.uz',
    kind: 'online',
    lang: 'uz',
    title: 'Toşkent yoşlar ittifoqiga rahbar saylandi',
    date: '2017-07-11',
    url: 'https://kun.uz/news/2017/07/11/toskent-eslar-ittifokiga-rabar-tajinlandi',
    sum: 'Kengaşning kengaytirilgan yiğilişida yangi rais saylangani xabar qilindi.',
  },
  {
    outlet: 'UzNews',
    domain: 'uznews.uz',
    kind: 'online',
    lang: 'ru',
    title: 'Руководителем ташкентского союза молодежи избран Элбек Шукуров',
    date: '2017-07-11',
    url: 'https://uznews.uz/ru/news/47025',
    sum: 'Kengaş yiğilişida yangi rais saylandi. Xabarda Prezident farmoniga köra Kengaş raisi şahar hokimining yoşlar masalalari böyiça maslahatçisi bölişi qayd etilgan.',
  },
]
