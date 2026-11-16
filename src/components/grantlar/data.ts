/**
 * Özbekistonlik yoşlar uçun grantlar — faqat yoşlar, talabalar, öquvçilar va yoş olimlar iştirok eta oladigan dasturlar
 * (fuqarolik jamiyati institutlari, xalqaro taşkilotlar va yoş çeklovi bölmagan umumiy dasturlar kiritilmaydi).
 * Rasmiy manbalar asosida (2026-yil 14-noyabr holatiga).
 * Har bir yozuvda manba havolasi bor; muddat aniq bölsa `deadline` (YYYY-MM-DD), aks holda `cycle` — qaçon ötkazilişi.
 * Keyinçalik admin paneldagi “Imkoniyatlar” bölimiga ötkaziladi.
 */
import { bhmUpTo } from '@/lib/miqdorlar'

export type GrantCat = 'startap' | 'talim' | 'ilm' | 'ijtimoiy' | 'ekologiya' | 'ijod'

/** grant beruvçi: Özbekiston taşkilotlari yoki xorijiy va xalqaro taşkilotlar */
export type GrantOrigin = 'mahalliy' | 'xorijiy'

export const GRANT_ORIGINS: { key: GrantOrigin; t: string }[] = [
  { key: 'mahalliy', t: 'Mahalliy grantlar' },
  { key: 'xorijiy', t: 'Xorijiy grantlar' },
]

export const GRANT_CATS: { key: GrantCat; t: string }[] = [
  { key: 'startap', t: 'Startap va tadbirkorlik' },
  { key: 'talim', t: 'Talaba va öquvçilar' },
  { key: 'ilm', t: 'Ilm-fan va tadqiqot' },
  { key: 'ijtimoiy', t: 'Ijtimoiy loyihalar' },
  { key: 'ekologiya', t: 'Ekologiya' },
  { key: 'ijod', t: 'Madaniyat va ijod' },
]

export type Grant = {
  id: string
  cat: GrantCat
  /** sukut böyiça — mahalliy */
  origin?: GrantOrigin
  t: string
  org: string
  amount: string
  who: string
  text: string
  /** aniq qabul muddati */
  deadline?: string
  /** muddat aniq bölmasa — tanlov qaçon ötkaziliş tartibi */
  cycle: string
  /** “Nizom loyihasi” kabi alohida holat */
  note?: string
  url: string
  source: string
  img?: string
}

export const GRANTS: Grant[] = [
  {
    id: 'itpark',
    cat: 'startap',
    t: 'IT Park startap grantlari',
    org: 'IT Park, Yoş tadbirkorlarni qöllab-quvvatlaş jamğarmasi',
    amount: '300 mln söm (mahalliy bozor) yoki 1 mlrd söm (xalqaro bozor)',
    who: '18 yoşdan oşgan, raqamli texnologiyalar sohasida startap loyihasiga ega jamoalar',
    text: 'Iştirokçilar OneID orqali IT Park platformasida röyxatdan ötib, jamoa sifatida ariza yuboradi. Loyihalar taqdimoti 25-noyabrgaça ötkaziladi, ğoliblar 25-dekabrgaça taqdirlanadi. Har bir iştirokçi faqat bitta yönaliş böyiça ariza yuboradi.',
    cycle: 'Har yili: 1-iyulgaça eʼlon, 1-avgustgaça ariza',
    url: 'https://www.it-park.uz/uz/itpark/startups',
    source: 'it-park.uz',
    img: '/img/grantlar/itpark.webp',
  },
  {
    id: 'chempionat',
    cat: 'startap',
    t: '“Yoş tadbirkorlar” çempionati',
    org: 'Yoşlar işlari agentligi, Yoşlar tadbirkorligini rivojlantiriş davlat jamğarmasi',
    amount: 'Har bir loyihaga 1 mlrd sömgaça investitsiya',
    who: 'Yoş tadbirkorlar va startap jamoalari',
    text: 'Çempionat 2026-yildan boşlab har yili ötkaziladi va 100 tagaça eng yaxşi biznes hamda startap loyiha tanlab olinadi. Mablağ Yoşlar tadbirkorligini rivojlantiriş davlat jamğarmasi va “Yoşlar Ventures” vençur fondi hisobidan ajratiladi. Ğoliblar xorijiy akseleratorlarda amaliyot ötaydi.',
    cycle: 'Har yili, 2026-yildan',
    url: 'https://daryo.uz/en/2026/02/16/uzbekistan-to-fund-100-projects-under-annual-young-entrepreneurs-championship/',
    source: 'daryo.uz',
  },
  {
    id: 'innovatsion-goya',
    cat: 'talim',
    t: '“Eng innovatsion ğoya” respublika tanlovi',
    org: 'Innovatsion rivojlaniş agentligi',
    amount: '50 mln sömdan 500 mln sömgaça',
    who: 'Davlat oliy taʼlim taşkilotlarining talabalari',
    text: 'Tanlov Vazirlar Mahkamasining 2026-yil 4-sentabrdagi 463-son qarori asosida ikki bosqiçda ötkaziladi. Oliy taʼlim taşkiloti bosqiçida 50, 30 va 20 mln söm, respublika bosqiçida 500, 300 va 200 mln söm miqdorida mablağ ajratiladi. Har bir iştirokçi bitta ğoya bilan qatnaşadi.',
    cycle: 'Har yili sentabr — dekabr; ariza 10-oktabrgaça',
    url: 'https://infoedu.uz/eng-innovatsion-goya-tanlovi-grant',
    source: 'infoedu.uz',
  },
  {
    id: 'spinoff',
    cat: 'talim',
    t: 'Texnikumlar huzuridagi “spin-off” korxonalari granti',
    org: 'Kasbiy taʼlim agentligi, Kasbiy taʼlimni rivojlantiriş jamğarmasi',
    amount: '1 mlrd sömgaça',
    who: 'Davlat texnikumlari huzurida öquvçilar startap loyihalari asosida taşkil etilgan korxonalar',
    text: 'Tartib Vazirlar Mahkamasining 2026-yil 29-sentabrdagi 524-son qarori bilan tasdiqlangan. Ariza bilan birga startap loyihasi taqdimoti, kamida bitta pedagog faoliyatini tasdiqlovçi hujjat va kamida 5 nafar öquvçi bilan tuzilgan dual taʼlim şartnomalari taqdim etiladi. Loyiha 100 ballik tizimda baholanadi, ötiş bali — 71.',
    cycle: 'Doimiy, ariza asosida',
    url: 'https://infoedu.uz/texnikumlarda-spinoff-korxonalar-tashkil-etiladi',
    source: 'infoedu.uz',
    img: '/img/grantlar/spinoff.webp',
  },
  {
    id: 'startap-goya',
    cat: 'talim',
    t: '“Eng yaxşi startap ğoyasi” tanlovi',
    org: 'Taʼlim va ilm-fan vazirligi',
    amount: 'Tuman bosqiçida 5 mln, viloyat bosqiçida 10 mln sömgaça',
    who: 'Umumiy örta taʼlimning 9–11-sinf öquvçilari, kasbiy taʼlim taşkilotlari öquvçilari',
    text: 'Tanlov Prezidentning 2026-yil 11-fevraldagi PQ–59-son qaroriga muvofiq “Mohirlik va biznes soati” maşğulotlari doirasida ötkaziladi. Loyihalar har çorakda ota-onalar, biznes va ilmiy hamjamiyat vakillariga taqdim etiladi.',
    cycle: '2026/2027-öquv yilidan, muntazam',
    url: 'https://gov.uz/oz/edu/news/view/131963',
    source: 'gov.uz — Taʼlim va ilm-fan vazirligi',
    img: '/img/grantlar/startap-goya.webp',
  },
  {
    id: 'jahon-banki',
    cat: 'ilm',
    t: 'Yoş olimlar uçun tadqiqot granti (Jahon banki dasturi)',
    org: 'Innovatsion rivojlaniş agentligi va Jahon banki',
    amount: '200 000 AQŞ dollarigaça',
    who: 'Yoş olimlar va tadqiqotçilar',
    text: '“Özbekiston Milliy innovatsion tizimini modernizatsiya qiliş” loyihasi doirasida qayta tiklanuvçi energiya, biotexnologiya, tibbiyot, qişloq xöjaligi, sunʼiy intellekt va AKT sohalaridagi loyihalar 24 oygaça moliyalaştiriladi. Tajribali olimlar uçun 600 000 dollargaça grant nazarda tutilgan. Loyihalar ingliz tilida qabul qilinadi.',
    cycle: 'Tanlov eʼloniga muvofiq',
    url: 'https://infoedu.uz/jahon-banki-ishtirokida-ilmiy-tadqiqot-va-tijoratlashtirish-sifatini-oshirish-dasturi-boyicha-grant-tanlovi',
    source: 'infoedu.uz',
    img: '/img/grantlar/jahon-banki.webp',
  },
  {
    id: 'startaplar-generatori',
    cat: 'startap',
    t: '“Oliygohlar — startaplar generatori” dasturi',
    org: 'Taʼlim va ilm-fan vazirligi, oliy taʼlim taşkilotlari',
    amount: 'Har bir loyihaga 20 000 AQŞ dollarigaça investitsiya',
    who: 'Oliy taʼlim taşkilotlarining talabalari va yoş ilmiy xodimlari',
    text: 'Dastur Prezidentning 2026-yil 11-fevraldagi PQ–59-son qarori asosida 2026-yil 1-sentabrdan amalga oşirilmoqda. Oliy taʼlim taşkilotlari talabalar startaplariga öz mablağlaridan investitsiya kiritadi, inkubatsiya markazlari va talabalar akseleratorlari taşkil etiladi. Eng yaxşi loyihalarning minimal işçi mahsulot (MVP) yaratiş xarajatlarining 50 foizi, 50 000 dollargaça qoplanadi.',
    cycle: 'Doimiy, 2026-yil 1-sentabrdan',
    url: 'https://infoedu.uz/oliygohlar-startaplar-generatoriga-aylanadi-1-sentabrdan-boshlanadigan-yangi-dastur-haqida-batafsil',
    source: 'infoedu.uz; gov.uz — Taʼlim va ilm-fan vazirligi',
  },
  {
    id: 'kreativ-goya',
    cat: 'talim',
    t: '“Eng yaxşi kreativ ğoya” respublika tanlovi',
    org: 'Innovatsion rivojlaniş agentligi, oliy taʼlim taşkilotlari',
    amount: 'Oliy taʼlim taşkiloti jamğarmasidan 300 mln sömgaça',
    who: 'Oliy taʼlim taşkilotlarining innovatsion faoliyat bilan şuğullanayotgan talabalari',
    text: 'Tanlov oliy taʼlim taşkilotlari va respublika bosqiçlarida ötkaziladi. 2026-yilgi respublika bosqiçida 94 ta oliy taʼlim taşkilotidan 281 ta ğoya taqdim etilib, 7 nafar ğolib aniqlangan. Ğoyalar innovatsion yangiligi, xarajatlar smetasining asoslanganligi hamda iqtisodiy va ijtimoiy samarasi böyiça baholanadi.',
    cycle: 'Har yili',
    url: 'https://gov.uz/oz/innovation/news/view/206299',
    source: 'gov.uz — Innovatsion rivojlaniş agentligi',
  },
  {
    id: 'bolajak-olim',
    cat: 'ilm',
    t: '“Bölajak olim” ilmiy ğoyalar granti',
    org: 'Innovatsion rivojlaniş agentligi',
    amount: bhmUpTo(400),
    who: '40 yoşdan oşmagan Özbekiston fuqarolari, ilmiy darajasi va iş joyidan qatʼi nazar',
    text: 'Grant jamiyat yoki iqtisodiyotdagi aniq muammoni hal etişga qaratilgan, bir yilgaça muddatda amalga oşiriladigan ilmiy ğoyalarga ajratiladi. Mablağ hisobidan maket yoki prototip yaratiladi va uning namunasi vazirlik körgazmalar zalida namoyiş etiladi. 2026-yilda ariza 14-sentabrdan 13-oktabrgaça qabul qilingan.',
    cycle: 'Har yili, kuzda',
    url: 'https://gov.uz/oz/innovation/contest/view/222296',
    source: 'gov.uz — Innovatsion rivojlaniş agentligi',
  },
  {
    id: 'akademik-harakatchanlik',
    cat: 'ilm',
    t: '“Akademik harakatçanlik” dasturi granti',
    org: 'Innovatsion rivojlaniş agentligi',
    amount: bhmUpTo(200),
    who: '40 yoşdan oşmagan yoş olimlar, barça fan yönalişlari böyiça',
    text: 'Yoş olimlar öz iş joyidan ajralmagan holda yetakçi ilmiy markazlar va oliy taʼlim muassasalarining laboratoriyalarida 1 oydan 6 oygaça ilmiy loyihasini amalga oşiradi. Dastur Vazirlar Mahkamasining 2021-yil 19-apreldagi 222-son qarori asosida ötkaziladi; 2026-yilda ariza 4-iyundan 4-iyulgaça qabul qilingan.',
    cycle: 'Har yili, yozda',
    url: 'https://gov.uz/oz/innovation/contest/view/174198',
    source: 'gov.uz — Innovatsion rivojlaniş agentligi',
  },
  {
    id: 'xorijiy-stajirovka',
    cat: 'ilm',
    t: 'Yoş olimlarning xorijiy ilmiy stajirovkasi',
    org: 'Innovatsion rivojlaniş agentligi',
    amount: 'Xorijiy ilmiy markazda 6 oygaça stajirovka budjet mablağlari hisobidan',
    who: 'Oliy taʼlim muassasalari va ilmiy taşkilotlar tavsiya etgan yoş olimlar',
    text: 'Yoş olimlar Vazirlar Mahkamasining 2021-yil 19-apreldagi 222-son qarori bilan tasdiqlangan nizom asosida yetakçi xorijiy ilmiy taşkilotlarga qisqa muddatli stajirovkaga yuboriladi. Masalan, 2026-yilda AQŞning Texas universitetida 6 oylik stajirovka uçun tanlov ötkazilgan. Hujjatlar faqat internship.ilmiy.uz tizimi orqali qabul qilinadi.',
    cycle: 'Tanlov eʼloniga muvofiq, yil davomida',
    url: 'https://gov.uz/oz/innovation/contest/view/106892',
    source: 'gov.uz — Innovatsion rivojlaniş agentligi',
  },
  {
    id: 'yashil-tashabbuslar',
    cat: 'ekologiya',
    t: 'Yoşlarning “yaşil taşabbuslari”ni qöllab-quvvatlaş jamğarmasi',
    org: 'Yoşlar işlari agentligi huzuridagi jamğarma',
    amount: 'Jamğarma mablağlari doirasida loyihalarni moliyalaştiriş',
    who: 'Ekologik ğoya va loyihalarga ega yoşlar',
    text: 'Jamğarma Vazirlar Mahkamasining 2025-yil 8-oktabrdagi 631-son qarori bilan taşkil etilgan. Mablağlar çiqindilarni qayta işlaş, toza energiya manbalaridan foydalaniş, daraxt ekiş va atrof-muhitni muhofaza qiliş böyiça yoşlar loyihalarini moliyalaştirişga yönaltiriladi.',
    cycle: 'Tanlov eʼloniga muvofiq',
    url: 'https://yuz.uz/en/news/yoshlarning-yashil-tashabbuslari-qollab-quvvatlanadi',
    source: 'yuz.uz — “Yangi Özbekiston” gazetasi',
  },
  {
    id: 'madaniyat-grant',
    cat: 'ijod',
    t: 'Madaniyat va sanʼat sohasidagi loyihalar uçun grantlar',
    org: 'Madaniyat vazirligi, “Ijodga investitsiya” jamğarmasi',
    amount: 'Har bir tanlov eʼlonida belgilanadi; qaytarilmaydigan asosda',
    who: 'Ijodkorlar va ijodiy jamoalar: teatr, musiqa, raqs, kino, animatsiya, adabiyot, ijodiy startaplar',
    text: 'Grantlar Prezidentning 2026-yil 21-apreldagi PQ–150-son qarori asosida tört yönaliş böyiça ajratiladi: sahna sanʼati va kino, adabiyot va ijtimoiy loyihalar, ijodiy startaplar, innovatsiya va raqamlaştiriş. Loyiha 100 ballik tizimda baholanadi, ötiş bali — 65. Tanlov eʼloni ariza qabuli tugaşidan kamida 30 kun oldin çiqariladi.',
    cycle: 'Har yili, oçiq tanlov asosida',
    url: 'https://madaniyatgrant.uz/grants',
    source: 'madaniyatgrant.uz — Madaniyat vazirligi',
  },
  {
    id: 'youth4climate',
    origin: 'xorijiy',
    cat: 'ekologiya',
    t: 'Youth4Climate: iqlim böyiça yoşlar yeçimlari granti',
    org: 'BMT Taraqqiyot dasturi (UNDP) va Italiya hukumati',
    amount: '30 000 AQŞ dollarigaça',
    who: '18–29 yoşdagi yoşlar, loyihasi UNDP dasturi amal qiladigan davlatda (jumladan, Özbekistonda) amalga oşiriladi',
    text: 'Grant iqlim özgarişiga moslaşiş, energetika, ekotizimlarni asraş va barqaror rivojlaniş böyiça yoşlar taşabbuslarini moliyalaştiradi. Tanlov 2023-yildan har yili bahorda eʼlon qilinadi; 2026-yilgi tanlov tört mavsum hisoblanadi.',
    cycle: 'Har yili, ariza odatda bahorda',
    url: 'https://unric.org/en/2026-youth4climate-call-for-solutions/',
    source: 'unric.org — BMT axborot markazi',
  },
  {
    id: 'upshift',
    origin: 'xorijiy',
    cat: 'ijtimoiy',
    t: 'UNICEF UPSHIFT ijtimoiy innovatsiyalar dasturi',
    org: 'BMT Bolalar jamğarmasi (UNICEF), IT Park',
    amount: 'Boşlanğiç moliyalaştiriş, mentorlik va öqitiş',
    who: '16–24 yoşdagi yoşlar; qizlar, qişloq yoşlari, nogironligi bölgan va öqimayotgan hamda işlamayotgan yoşlarga ustuvorlik',
    text: 'Dastur doirasida yoşlar jamoalari öz hududidagi ijtimoiy muammoga yeçim işlab çiqadi, ğoyani sinovdan ötkazadi va eng yaxşi loyihalar moliyalaştiriladi. 2026-yilda media, dizayn, hunarmandçilik, işlab çiqariş va innovatsiya yönalişlari böyiça tanlovlar eʼlon qilingan.',
    cycle: 'Mavsumlar böyiça, tanlov eʼloniga muvofiq',
    url: 'https://www.unicef.org/uzbekistan/en/youth-and-adolescents-development',
    source: 'unicef.org — UNICEF Özbekiston',
  },
  {
    id: 'pollination',
    origin: 'xorijiy',
    cat: 'ijtimoiy',
    t: 'The Pollination Project boşlanğiç granti',
    org: 'The Pollination Project (AQŞ)',
    amount: 'Kiçik boşlanğiç grant (loyiha budjeti 10 000 AQŞ dollaridan kam bölişi lozim)',
    who: 'Volontyorlar boşqaradigan ijtimoiy loyihaga ega şaxslar va norasmiy guruhlar; birinçi marta ariza beruvçilar',
    text: 'Grant iqlim, taʼlim, xotin-qizlar, jamoa rivoji va sanʼat sohalaridagi ijtimoiy taşabbuslarni qöllab-quvvatlaydi. Ariza ingliz tilida, tavsiyanoma beruvçi bilan topşiriladi.',
    deadline: '2026-11-30',
    cycle: 'Doimiy qabul; har yili dekabrda tanaffus',
    url: 'https://thepollinationproject.org/apply/',
    source: 'thepollinationproject.org',
  },
  {
    id: 'wikimedia-rapid',
    origin: 'xorijiy',
    cat: 'ijtimoiy',
    t: 'Wikimedia Rapid Fund granti',
    org: 'Wikimedia Foundation',
    amount: '500–5 000 AQŞ dollari; bir şaxsga yiliga 10 000 dollargaça',
    who: 'Vikipediya va Wikimedia loyihalarida faol işlayotgan şaxslar, norasmiy guruhlar va taşkilotlar',
    text: 'Grant Vikipediyani özbek tilida boyitiş, oçiq bilim, taʼlim, madaniy meros va media loyihalarini moliyalaştiradi. Mablağ mahalliy valyutada tölanadi.',
    deadline: '2027-02-01',
    cycle: 'Yiliga beş marta (navbatdagi muddatlar: 1-fevral, 1-aprel)',
    url: 'https://meta.wikimedia.org/wiki/Grants:Project/Rapid',
    source: 'meta.wikimedia.org',
  },
  {
    id: 'prince-claus',
    origin: 'xorijiy',
    cat: 'ijod',
    t: 'Prince Claus Fund “Seed Award” mukofot-granti',
    org: 'Prince Claus Fund (Niderlandiya)',
    amount: '5 000 yevro',
    who: 'Kasbiy faoliyatining dastlabki 1–5 yilidagi rassom va madaniyat sohasi xodimlari; Özbekiston huquqli davlatlar röyxatida',
    text: 'Grant ijtimoiy masalalarni yoritadigan ijodiy işlarga yiliga 100 nafar ijodkorga beriladi. Ariza 3 daqiqagaça video yoki audio taqdimot bilan topşiriladi; grant bir şaxsga bir marta beriladi.',
    cycle: 'Har yili, tanlov eʼloniga muvofiq',
    url: 'https://princeclausfund.nl/awards-and-programmes/seed-award',
    source: 'princeclausfund.nl',
  },
  {
    id: 'ctc',
    origin: 'xorijiy',
    cat: 'ijod',
    t: 'Britaniya Kengaşi “Connections Through Culture” granti',
    org: 'Britaniya Kengaşi',
    amount: '10 000 funt sterlinggaça',
    who: 'Ijodkorlar, mustaqil mutaxassislar va ijodiy jamoalar; loyihada Buyuk Britaniya va Özbekistondan hamkor bölişi şart',
    text: 'Grant Özbekiston va Buyuk Britaniya ijodkorlarining qöşma madaniy loyihalarini moliyalaştiradi. 2026-yilgi tanlovda ariza 17-iyundan 12-avgustgaça qabul qilingan, loyihalar 2026-yil dekabrdan 2027-yil dekabrgaça amalga oşiriladi.',
    cycle: 'Har yili, ariza odatda yozda',
    url: 'https://www.britishcouncil.uz/en/programmes/arts/connections-through-culture-2025',
    source: 'britishcouncil.uz',
  },
  {
    id: 'aeif',
    origin: 'xorijiy',
    cat: 'ijtimoiy',
    t: 'AQŞ elçixonasining “Alumni Engagement Innovation Fund” granti',
    org: 'AQŞning Özbekistondagi elçixonasi',
    amount: '5 000–35 000 AQŞ dollari',
    who: 'AQŞ hukumati almaşinuv dasturlari bitiruvçilaridan iborat kamida ikki kişilik jamoalar',
    text: 'Grant biznes, STEM va sunʼiy intellekt, taʼlim, madaniyat, sport va turizm sohalaridagi jamoat loyihalarini moliyalaştiradi; qöşimça hissa talab etilmaydi.',
    cycle: 'Har yili bir marta, tanlov eʼloniga muvofiq',
    url: 'https://simpler.grants.gov/opportunity/361768',
    source: 'grants.gov',
  },
  {
    id: 'yozuvchi',
    cat: 'ijod',
    t: 'Yoş yozuvçilar uçun grant',
    org: 'Yoşlar işlari agentligi, Kitobxonlik madaniyatini rivojlantiriş jamğarmasi',
    amount: 'Asarni naşrga tayyorlaş va kamida 1 000 nusxada çop etiş xarajatlari',
    who: '31 yoşdan oşmagan, ijodiy uyuşma, OAV yoki naşriyot tavsiyanomasiga ega yoş yozuvçilar',
    text: 'Tanlov eʼlon qilingaç bir oy davomida ariza, asarning qoralama nusxasi va tavsiyanoma elektron şaklda yuboriladi. Asarlarni ekspertlar guruhi saralaydi. Çop etilgan nusxalarning 10 foizi muallifga bepul beriladi.',
    cycle: 'Har yili bir marta',
    url: 'https://api-portal.gov.uz/uploads/64/2026/04/03/839f2835-dada-572a-b0b8-aea435b09c96_media_.pdf',
    source: 'Yoşlar işlari agentligi, nizom (PDF)',
  },
]
