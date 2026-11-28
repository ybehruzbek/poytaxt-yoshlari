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
  { key: 'talim', t: 'Talaba va o‘quvchilar' },
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
    org: 'IT Park, Yosh tadbirkorlarni qo‘llab-quvvatlash jamg‘armasi',
    amount: '300 mln so‘m (mahalliy bozor) yoki 1 mlrd so‘m (xalqaro bozor)',
    who: '18 yoshdan oshgan, raqamli texnologiyalar sohasida startap loyihasiga ega jamoalar',
    text: 'Ishtirokchilar OneID orqali IT Park platformasida ro‘yxatdan o‘tib, jamoa sifatida ariza yuboradi. Loyihalar taqdimoti 25-noyabrgacha o‘tkaziladi, g‘oliblar 25-dekabrgacha taqdirlanadi. Har bir ishtirokchi faqat bitta yo‘nalish bo‘yicha ariza yuboradi.',
    cycle: 'Har yili: 1-iyulgacha e’lon, 1-avgustgacha ariza',
    url: 'https://www.it-park.uz/uz/itpark/startups',
    source: 'it-park.uz',
    img: '/img/grantlar/itpark.webp',
  },
  {
    id: 'chempionat',
    cat: 'startap',
    t: '“Yosh tadbirkorlar” chempionati',
    org: 'Yoshlar ishlari agentligi, Yoshlar tadbirkorligini rivojlantirish davlat jamg‘armasi',
    amount: 'Har bir loyihaga 1 mlrd so‘mgacha investitsiya',
    who: 'Yosh tadbirkorlar va startap jamoalari',
    text: 'Chempionat 2026-yildan boshlab har yili o‘tkaziladi va 100 tagacha eng yaxshi biznes hamda startap loyiha tanlab olinadi. Mablag‘ Yoshlar tadbirkorligini rivojlantirish davlat jamg‘armasi va “Yoshlar Ventures” venchur fondi hisobidan ajratiladi. G‘oliblar xorijiy akseleratorlarda amaliyot o‘taydi.',
    cycle: 'Har yili, 2026-yildan',
    url: 'https://daryo.uz/en/2026/02/16/uzbekistan-to-fund-100-projects-under-annual-young-entrepreneurs-championship/',
    source: 'daryo.uz',
  },
  {
    id: 'innovatsion-goya',
    cat: 'talim',
    t: '“Eng innovatsion g‘oya” respublika tanlovi',
    org: 'Innovatsion rivojlanish agentligi',
    amount: '50 mln so‘mdan 500 mln so‘mgacha',
    who: 'Davlat oliy ta’lim tashkilotlarining talabalari',
    text: 'Tanlov Vazirlar Mahkamasining 2026-yil 4-sentabrdagi 463-son qarori asosida ikki bosqichda o‘tkaziladi. Oliy ta’lim tashkiloti bosqichida 50, 30 va 20 mln so‘m, respublika bosqichida 500, 300 va 200 mln so‘m miqdorida mablag‘ ajratiladi. Har bir ishtirokchi bitta g‘oya bilan qatnashadi.',
    cycle: 'Har yili sentabr — dekabr; ariza 10-oktabrgacha',
    url: 'https://infoedu.uz/eng-innovatsion-goya-tanlovi-grant',
    source: 'infoedu.uz',
  },
  {
    id: 'spinoff',
    cat: 'talim',
    t: 'Texnikumlar huzuridagi “spin-off” korxonalari granti',
    org: 'Kasbiy ta’lim agentligi, Kasbiy ta’limni rivojlantirish jamg‘armasi',
    amount: '1 mlrd so‘mgacha',
    who: 'Davlat texnikumlari huzurida o‘quvchilar startap loyihalari asosida tashkil etilgan korxonalar',
    text: 'Tartib Vazirlar Mahkamasining 2026-yil 29-sentabrdagi 524-son qarori bilan tasdiqlangan. Ariza bilan birga startap loyihasi taqdimoti, kamida bitta pedagog faoliyatini tasdiqlovchi hujjat va kamida 5 nafar o‘quvchi bilan tuzilgan dual ta’lim shartnomalari taqdim etiladi. Loyiha 100 ballik tizimda baholanadi, o‘tish bali — 71.',
    cycle: 'Doimiy, ariza asosida',
    url: 'https://infoedu.uz/texnikumlarda-spinoff-korxonalar-tashkil-etiladi',
    source: 'infoedu.uz',
    img: '/img/grantlar/spinoff.webp',
  },
  {
    id: 'startap-goya',
    cat: 'talim',
    t: '“Eng yaxshi startap g‘oyasi” tanlovi',
    org: 'Ta’lim va ilm-fan vazirligi',
    amount: 'Tuman bosqichida 5 mln, viloyat bosqichida 10 mln so‘mgacha',
    who: 'Umumiy o‘rta ta’limning 9–11-sinf o‘quvchilari, kasbiy ta’lim tashkilotlari o‘quvchilari',
    text: 'Tanlov Prezidentning 2026-yil 11-fevraldagi PQ–59-son qaroriga muvofiq “Mohirlik va biznes soati” mashg‘ulotlari doirasida o‘tkaziladi. Loyihalar har chorakda ota-onalar, biznes va ilmiy hamjamiyat vakillariga taqdim etiladi.',
    cycle: '2026/2027-o‘quv yilidan, muntazam',
    url: 'https://gov.uz/oz/edu/news/view/131963',
    source: 'gov.uz — Ta’lim va ilm-fan vazirligi',
    img: '/img/grantlar/startap-goya.webp',
  },
  {
    id: 'jahon-banki',
    cat: 'ilm',
    t: 'Yosh olimlar uchun tadqiqot granti (Jahon banki dasturi)',
    org: 'Innovatsion rivojlanish agentligi va Jahon banki',
    amount: '200 000 AQSH dollarigacha',
    who: 'Yosh olimlar va tadqiqotchilar',
    text: '“O‘zbekiston Milliy innovatsion tizimini modernizatsiya qilish” loyihasi doirasida qayta tiklanuvchi energiya, biotexnologiya, tibbiyot, qishloq xo‘jaligi, sun’iy intellekt va AKT sohalaridagi loyihalar 24 oygacha moliyalashtiriladi. Tajribali olimlar uchun 600 000 dollargacha grant nazarda tutilgan. Loyihalar ingliz tilida qabul qilinadi.',
    cycle: 'Tanlov e’loniga muvofiq',
    url: 'https://infoedu.uz/jahon-banki-ishtirokida-ilmiy-tadqiqot-va-tijoratlashtirish-sifatini-oshirish-dasturi-boyicha-grant-tanlovi',
    source: 'infoedu.uz',
    img: '/img/grantlar/jahon-banki.webp',
  },
  {
    id: 'startaplar-generatori',
    cat: 'startap',
    t: '“Oliygohlar — startaplar generatori” dasturi',
    org: 'Ta’lim va ilm-fan vazirligi, oliy ta’lim tashkilotlari',
    amount: 'Har bir loyihaga 20 000 AQSH dollarigacha investitsiya',
    who: 'Oliy ta’lim tashkilotlarining talabalari va yosh ilmiy xodimlari',
    text: 'Dastur Prezidentning 2026-yil 11-fevraldagi PQ–59-son qarori asosida 2026-yil 1-sentabrdan amalga oshirilmoqda. Oliy ta’lim tashkilotlari talabalar startaplariga o‘z mablag‘laridan investitsiya kiritadi, inkubatsiya markazlari va talabalar akseleratorlari tashkil etiladi. Eng yaxshi loyihalarning minimal ishchi mahsulot (MVP) yaratish xarajatlarining 50 foizi, 50 000 dollargacha qoplanadi.',
    cycle: 'Doimiy, 2026-yil 1-sentabrdan',
    url: 'https://infoedu.uz/oliygohlar-startaplar-generatoriga-aylanadi-1-sentabrdan-boshlanadigan-yangi-dastur-haqida-batafsil',
    source: 'infoedu.uz; gov.uz — Ta’lim va ilm-fan vazirligi',
  },
  {
    id: 'kreativ-goya',
    cat: 'talim',
    t: '“Eng yaxshi kreativ g‘oya” respublika tanlovi',
    org: 'Innovatsion rivojlanish agentligi, oliy ta’lim tashkilotlari',
    amount: 'Oliy ta’lim tashkiloti jamg‘armasidan 300 mln so‘mgacha',
    who: 'Oliy ta’lim tashkilotlarining innovatsion faoliyat bilan shug‘ullanayotgan talabalari',
    text: 'Tanlov oliy ta’lim tashkilotlari va respublika bosqichlarida o‘tkaziladi. 2026-yilgi respublika bosqichida 94 ta oliy ta’lim tashkilotidan 281 ta g‘oya taqdim etilib, 7 nafar g‘olib aniqlangan. G‘oyalar innovatsion yangiligi, xarajatlar smetasining asoslanganligi hamda iqtisodiy va ijtimoiy samarasi bo‘yicha baholanadi.',
    cycle: 'Har yili',
    url: 'https://gov.uz/oz/innovation/news/view/206299',
    source: 'gov.uz — Innovatsion rivojlanish agentligi',
  },
  {
    id: 'bolajak-olim',
    cat: 'ilm',
    t: '“Bo‘lajak olim” ilmiy g‘oyalar granti',
    org: 'Innovatsion rivojlanish agentligi',
    amount: bhmUpTo(400),
    who: '40 yoshdan oshmagan O‘zbekiston fuqarolari, ilmiy darajasi va ish joyidan qat’i nazar',
    text: 'Grant jamiyat yoki iqtisodiyotdagi aniq muammoni hal etishga qaratilgan, bir yilgacha muddatda amalga oshiriladigan ilmiy g‘oyalarga ajratiladi. Mablag‘ hisobidan maket yoki prototip yaratiladi va uning namunasi vazirlik ko‘rgazmalar zalida namoyish etiladi. 2026-yilda ariza 14-sentabrdan 13-oktabrgacha qabul qilingan.',
    cycle: 'Har yili, kuzda',
    url: 'https://gov.uz/oz/innovation/contest/view/222296',
    source: 'gov.uz — Innovatsion rivojlanish agentligi',
  },
  {
    id: 'akademik-harakatchanlik',
    cat: 'ilm',
    t: '“Akademik harakatchanlik” dasturi granti',
    org: 'Innovatsion rivojlanish agentligi',
    amount: bhmUpTo(200),
    who: '40 yoshdan oshmagan yosh olimlar, barcha fan yo‘nalishlari bo‘yicha',
    text: 'Yosh olimlar o‘z ish joyidan ajralmagan holda yetakchi ilmiy markazlar va oliy ta’lim muassasalarining laboratoriyalarida 1 oydan 6 oygacha ilmiy loyihasini amalga oshiradi. Dastur Vazirlar Mahkamasining 2021-yil 19-apreldagi 222-son qarori asosida o‘tkaziladi; 2026-yilda ariza 4-iyundan 4-iyulgacha qabul qilingan.',
    cycle: 'Har yili, yozda',
    url: 'https://gov.uz/oz/innovation/contest/view/174198',
    source: 'gov.uz — Innovatsion rivojlanish agentligi',
  },
  {
    id: 'xorijiy-stajirovka',
    cat: 'ilm',
    t: 'Yosh olimlarning xorijiy ilmiy stajirovkasi',
    org: 'Innovatsion rivojlanish agentligi',
    amount: 'Xorijiy ilmiy markazda 6 oygacha stajirovka budjet mablag‘lari hisobidan',
    who: 'Oliy ta’lim muassasalari va ilmiy tashkilotlar tavsiya etgan yosh olimlar',
    text: 'Yosh olimlar Vazirlar Mahkamasining 2021-yil 19-apreldagi 222-son qarori bilan tasdiqlangan nizom asosida yetakchi xorijiy ilmiy tashkilotlarga qisqa muddatli stajirovkaga yuboriladi. Masalan, 2026-yilda AQSHning Texas universitetida 6 oylik stajirovka uchun tanlov o‘tkazilgan. Hujjatlar faqat internship.ilmiy.uz tizimi orqali qabul qilinadi.',
    cycle: 'Tanlov e’loniga muvofiq, yil davomida',
    url: 'https://gov.uz/oz/innovation/contest/view/106892',
    source: 'gov.uz — Innovatsion rivojlanish agentligi',
  },
  {
    id: 'yashil-tashabbuslar',
    cat: 'ekologiya',
    t: 'Yoshlarning “yashil tashabbuslari”ni qo‘llab-quvvatlash jamg‘armasi',
    org: 'Yoshlar ishlari agentligi huzuridagi jamg‘arma',
    amount: 'Jamg‘arma mablag‘lari doirasida loyihalarni moliyalashtirish',
    who: 'Ekologik g‘oya va loyihalarga ega yoshlar',
    text: 'Jamg‘arma Vazirlar Mahkamasining 2025-yil 8-oktabrdagi 631-son qarori bilan tashkil etilgan. Mablag‘lar chiqindilarni qayta ishlash, toza energiya manbalaridan foydalanish, daraxt ekish va atrof-muhitni muhofaza qilish bo‘yicha yoshlar loyihalarini moliyalashtirishga yo‘naltiriladi.',
    cycle: 'Tanlov e’loniga muvofiq',
    url: 'https://yuz.uz/en/news/yoshlarning-yashil-tashabbuslari-qollab-quvvatlanadi',
    source: 'yuz.uz — “Yangi O‘zbekiston” gazetasi',
  },
  {
    id: 'madaniyat-grant',
    cat: 'ijod',
    t: 'Madaniyat va san’at sohasidagi loyihalar uchun grantlar',
    org: 'Madaniyat vazirligi, “Ijodga investitsiya” jamg‘armasi',
    amount: 'Har bir tanlov e’lonida belgilanadi; qaytarilmaydigan asosda',
    who: 'Ijodkorlar va ijodiy jamoalar: teatr, musiqa, raqs, kino, animatsiya, adabiyot, ijodiy startaplar',
    text: 'Grantlar Prezidentning 2026-yil 21-apreldagi PQ–150-son qarori asosida to‘rt yo‘nalish bo‘yicha ajratiladi: sahna san’ati va kino, adabiyot va ijtimoiy loyihalar, ijodiy startaplar, innovatsiya va raqamlashtirish. Loyiha 100 ballik tizimda baholanadi, o‘tish bali — 65. Tanlov e’loni ariza qabuli tugashidan kamida 30 kun oldin chiqariladi.',
    cycle: 'Har yili, ochiq tanlov asosida',
    url: 'https://madaniyatgrant.uz/grants',
    source: 'madaniyatgrant.uz — Madaniyat vazirligi',
  },
  {
    id: 'youth4climate',
    origin: 'xorijiy',
    cat: 'ekologiya',
    t: 'Youth4Climate: iqlim bo‘yicha yoshlar yechimlari granti',
    org: 'BMT Taraqqiyot dasturi (UNDP) va Italiya hukumati',
    amount: '30 000 AQSH dollarigacha',
    who: '18–29 yoshdagi yoshlar, loyihasi UNDP dasturi amal qiladigan davlatda (jumladan, O‘zbekistonda) amalga oshiriladi',
    text: 'Grant iqlim o‘zgarishiga moslashish, energetika, ekotizimlarni asrash va barqaror rivojlanish bo‘yicha yoshlar tashabbuslarini moliyalashtiradi. Tanlov 2023-yildan har yili bahorda e’lon qilinadi; 2026-yilgi tanlov to‘rt mavsum hisoblanadi.',
    cycle: 'Har yili, ariza odatda bahorda',
    url: 'https://unric.org/en/2026-youth4climate-call-for-solutions/',
    source: 'unric.org — BMT axborot markazi',
  },
  {
    id: 'upshift',
    origin: 'xorijiy',
    cat: 'ijtimoiy',
    t: 'UNICEF UPSHIFT ijtimoiy innovatsiyalar dasturi',
    org: 'BMT Bolalar jamg‘armasi (UNICEF), IT Park',
    amount: 'Boshlang‘ich moliyalashtirish, mentorlik va o‘qitish',
    who: '16–24 yoshdagi yoshlar; qizlar, qishloq yoshlari, nogironligi bo‘lgan va o‘qimayotgan hamda ishlamayotgan yoshlarga ustuvorlik',
    text: 'Dastur doirasida yoshlar jamoalari o‘z hududidagi ijtimoiy muammoga yechim ishlab chiqadi, g‘oyani sinovdan o‘tkazadi va eng yaxshi loyihalar moliyalashtiriladi. 2026-yilda media, dizayn, hunarmandchilik, ishlab chiqarish va innovatsiya yo‘nalishlari bo‘yicha tanlovlar e’lon qilingan.',
    cycle: 'Mavsumlar bo‘yicha, tanlov e’loniga muvofiq',
    url: 'https://www.unicef.org/uzbekistan/en/youth-and-adolescents-development',
    source: 'unicef.org — UNICEF O‘zbekiston',
  },
  {
    id: 'pollination',
    origin: 'xorijiy',
    cat: 'ijtimoiy',
    t: 'The Pollination Project boshlang‘ich granti',
    org: 'The Pollination Project (AQSH)',
    amount: 'Kichik boshlang‘ich grant (loyiha budjeti 10 000 AQSH dollaridan kam bo‘lishi lozim)',
    who: 'Volontyorlar boshqaradigan ijtimoiy loyihaga ega shaxslar va norasmiy guruhlar; birinchi marta ariza beruvchilar',
    text: 'Grant iqlim, ta’lim, xotin-qizlar, jamoa rivoji va san’at sohalaridagi ijtimoiy tashabbuslarni qo‘llab-quvvatlaydi. Ariza ingliz tilida, tavsiyanoma beruvchi bilan topshiriladi.',
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
    amount: '500–5 000 AQSH dollari; bir shaxsga yiliga 10 000 dollargacha',
    who: 'Vikipediya va Wikimedia loyihalarida faol ishlayotgan shaxslar, norasmiy guruhlar va tashkilotlar',
    text: 'Grant Vikipediyani o‘zbek tilida boyitish, ochiq bilim, ta’lim, madaniy meros va media loyihalarini moliyalashtiradi. Mablag‘ mahalliy valyutada to‘lanadi.',
    deadline: '2027-02-01',
    cycle: 'Yiliga besh marta (navbatdagi muddatlar: 1-fevral, 1-aprel)',
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
    who: 'Kasbiy faoliyatining dastlabki 1–5 yilidagi rassom va madaniyat sohasi xodimlari; O‘zbekiston huquqli davlatlar ro‘yxatida',
    text: 'Grant ijtimoiy masalalarni yoritadigan ijodiy ishlarga yiliga 100 nafar ijodkorga beriladi. Ariza 3 daqiqagacha video yoki audio taqdimot bilan topshiriladi; grant bir shaxsga bir marta beriladi.',
    cycle: 'Har yili, tanlov e’loniga muvofiq',
    url: 'https://princeclausfund.nl/awards-and-programmes/seed-award',
    source: 'princeclausfund.nl',
  },
  {
    id: 'ctc',
    origin: 'xorijiy',
    cat: 'ijod',
    t: 'Britaniya Kengashi “Connections Through Culture” granti',
    org: 'Britaniya Kengashi',
    amount: '10 000 funt sterlinggacha',
    who: 'Ijodkorlar, mustaqil mutaxassislar va ijodiy jamoalar; loyihada Buyuk Britaniya va O‘zbekistondan hamkor bo‘lishi shart',
    text: 'Grant O‘zbekiston va Buyuk Britaniya ijodkorlarining qo‘shma madaniy loyihalarini moliyalashtiradi. 2026-yilgi tanlovda ariza 17-iyundan 12-avgustgacha qabul qilingan, loyihalar 2026-yil dekabrdan 2027-yil dekabrgacha amalga oshiriladi.',
    cycle: 'Har yili, ariza odatda yozda',
    url: 'https://www.britishcouncil.uz/en/programmes/arts/connections-through-culture-2025',
    source: 'britishcouncil.uz',
  },
  {
    id: 'aeif',
    origin: 'xorijiy',
    cat: 'ijtimoiy',
    t: 'AQSH elchixonasining “Alumni Engagement Innovation Fund” granti',
    org: 'AQSHning O‘zbekistondagi elchixonasi',
    amount: '5 000–35 000 AQSH dollari',
    who: 'AQSH hukumati almashinuv dasturlari bitiruvchilaridan iborat kamida ikki kishilik jamoalar',
    text: 'Grant biznes, STEM va sun’iy intellekt, ta’lim, madaniyat, sport va turizm sohalaridagi jamoat loyihalarini moliyalashtiradi; qo‘shimcha hissa talab etilmaydi.',
    cycle: 'Har yili bir marta, tanlov e’loniga muvofiq',
    url: 'https://simpler.grants.gov/opportunity/361768',
    source: 'grants.gov',
  },
  {
    id: 'yozuvchi',
    cat: 'ijod',
    t: 'Yosh yozuvchilar uchun grant',
    org: 'Yoshlar ishlari agentligi, Kitobxonlik madaniyatini rivojlantirish jamg‘armasi',
    amount: 'Asarni nashrga tayyorlash va kamida 1 000 nusxada chop etish xarajatlari',
    who: '31 yoshdan oshmagan, ijodiy uyushma, OAV yoki nashriyot tavsiyanomasiga ega yosh yozuvchilar',
    text: 'Tanlov e’lon qilingach bir oy davomida ariza, asarning qoralama nusxasi va tavsiyanoma elektron shaklda yuboriladi. Asarlarni ekspertlar guruhi saralaydi. Chop etilgan nusxalarning 10 foizi muallifga bepul beriladi.',
    cycle: 'Har yili bir marta',
    url: 'https://api-portal.gov.uz/uploads/64/2026/04/03/839f2835-dada-572a-b0b8-aea435b09c96_media_.pdf',
    source: 'Yoshlar ishlari agentligi, nizom (PDF)',
  },
]
