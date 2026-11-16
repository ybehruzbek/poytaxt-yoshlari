/**
 * Yoşlar iştirok eta oladigan sohaviy tanlovlar (davlat mukofotlari — components/mukofotlar): Yoşlar işlari agentligi, vazirliklar va boşqa
 * taşkilotlar tomonidan eʼlon qilinadi. Rasmiy manbalar asosida (2026-yil 14-noyabr holatiga).
 * Har bir yozuvda batafsil maʼlumot uçun manba havolasi bor. `deadline` — ariza muddati, `window` — tanlov bosqiçlari
 * davom etadigan davr (YYYY-MM-DD); ikkalasi ham bölmasa, `cycle` — tanlov qaçon ötkazilişi.
 * Keyinçalik admin paneldagi “Imkoniyatlar” bölimiga ötkaziladi.
 */
import { BHM, som } from '@/lib/miqdorlar'

export type ContestCat = 'ilm' | 'raqamli' | 'madaniyat' | 'adabiyot' | 'tibbiyot' | 'sport'

export const CONTEST_CATS: { key: ContestCat; t: string }[] = [
  { key: 'ilm', t: 'Ilm-fan va innovatsiya' },
  { key: 'raqamli', t: 'Raqamli ijod' },
  { key: 'madaniyat', t: 'Madaniyat va sanʼat' },
  { key: 'adabiyot', t: 'Adabiyot va kitobxonlik' },
  { key: 'tibbiyot', t: 'Tibbiyot' },
  { key: 'sport', t: 'Sport' },
]

export type Contest = {
  id: string
  cat: ContestCat
  t: string
  org: string
  /** karta boşidagi raqamli blok: yorliq va qiymat */
  badge: { l: string; v: string }
  who: string
  prize: string
  cycle: string
  text: string
  deadline?: string
  window?: [string, string]
  url: string
  source: string
  /** ötgan tanlovdan surat (manbalari: docs/matnlar/tanlov-suratlari.md) */
  img?: string
}

/** Madaniyat vazirligining 2026-yilgi respublika tanlovlari röyxati */
const MADANIYAT = 'https://gov.uz/oz/madaniyat/news/view/119054'
const MADANIYAT_SRC = 'gov.uz — Madaniyat vazirligi'

export const CONTESTS: Contest[] = [


  {
    id: 'bolajak-olim',
    cat: 'ilm',
    t: '“Bölajak olim” ilmiy ğoyalar tanlovi',
    org: 'Innovatsion rivojlaniş agentligi',
    badge: { l: 'Moliyalaştiriş · BHMning 400 barobarigaça', v: som(400 * BHM.v) + 'gaça' },
    who: '40 yoşdan oşmagan Özbekiston fuqarolari, ilmiy darajasi va iş joyidan qatʼi nazar',
    prize: 'Ilmiy ğoyani amalga oşiriş, maket yoki prototip yaratiş uçun mablağ',
    cycle: 'Har yili; 2026-yilda ariza 14-sentabr — 13-oktabr',
    text: 'Tanlovga jamiyat yoki iqtisodiyotdagi aniq muammoni hal etişga qaratilgan, bir yilgaça muddatda amalga oşiriladigan ilmiy ğoyalar qabul qilinadi. Ğolib loyiha asosida yaratilgan namuna vazirlik körgazmalar zalida namoyiş etiladi.',
    url: 'https://gov.uz/oz/innovation/contest/view/222296',
    source: 'gov.uz — Innovatsion rivojlaniş agentligi',
    img: '/img/tanlovlar/bolajak-olim.webp',
  },
  {
    id: 'akademik-harakatchanlik',
    cat: 'ilm',
    t: '“Akademik harakatçanlik” dasturi tanlovi',
    org: 'Innovatsion rivojlaniş agentligi',
    badge: { l: 'Loyiha qiymati · BHMning 200 barobarigaça', v: som(200 * BHM.v) + 'gaça' },
    who: '40 yoşdan oşmagan yoş olimlar, barça fan yönalişlari böyiça',
    prize: 'Yetakçi ilmiy markazlar laboratoriyalarida 1 oydan 6 oygaça tadqiqot ötkaziş imkoniyati va moliyalaştiriş',
    cycle: 'Har yili; 2026-yilda ariza 4-iyun — 4-iyul',
    text: 'Dastur Vazirlar Mahkamasining 2021-yil 19-apreldagi 222-son qarori asosida ötkaziladi. Yoş olimlar öz iş joyidan ajralmagan holda ilmiy taşkilotlar va oliy taʼlim muassasalarining zamonaviy laboratoriyalarida loyihalarini amalga oşiradi.',
    url: 'https://gov.uz/oz/innovation/contest/view/174198',
    source: 'gov.uz — Innovatsion rivojlaniş agentligi',
    img: '/img/tanlovlar/akademik-harakatchanlik.webp',
  },
  {
    id: 'ixtirochi',
    cat: 'ilm',
    t: '“Eng yaxşi oliy taʼlim ixtiroçisi” respublika tanlovi',
    org: 'Innovatsion rivojlaniş agentligi',
    badge: { l: 'Ustuvor yönalişlar', v: '8 ta yönaliş' },
    who: 'Davlat oliy taʼlim taşkilotlarining talabalari va professor-öqituvçilari',
    prize: 'Ğolib va sovrindorlar 8 ta ustuvor yönaliş böyiça taqdirlanadi',
    cycle: 'Har yili; 2026-yilda ariza 11-maygaça, ğoliblar 2-oktabrda eʼlon qilingan',
    text: 'Tanlov oliy taʼlim taşkiloti, hududiy va respublika bosqiçlarida ötkaziladi. Iştirok uçun patent talab etilmaydi: innovatsion ixtiro yoki foydali modelga ega har bir iştirokçi id.ilmiy.uz tizimi orqali ariza topşiradi.',
    url: 'https://gov.uz/oz/innovation/contest/view/152136',
    source: 'gov.uz — Innovatsion rivojlaniş agentligi',
    img: '/img/tanlovlar/ixtirochi.webp',
  },
  {
    id: 'bellashailik',
    cat: 'raqamli',
    t: '“BellashAIlik” respublika tanlovi',
    org: '“Digital Art” ijodiy birlaşmasi, Kasbiy taʼlim agentligi',
    badge: { l: 'Yönaliş', v: 'Sunʼiy intellekt yordamida ijod' },
    who: 'Sunʼiy intellekt yordamida video, animatsiya va boşqa ijodiy kontent yaratadigan yoşlar',
    prize: 'Ğolib va sovrindorlar taşkilotçilar tomonidan taqdirlanadi',
    deadline: '2026-11-18',
    cycle: 'Ariza 2026-yil 18-noyabr soat 18:00gaça Telegram-bot orqali',
    text: 'Ariza @bellashailik_bot Telegram-boti orqali töldiriladi va ijodiy iş yuklanadi. Tanlov sunʼiy intellekt texnologiyalaridan ijodiy faoliyatda samarali foydalanayotgan iqtidorli yoşlarni aniqlaş maqsadida ötkaziladi.',
    url: 'https://infoedu.uz/bellashailik-tanlovi-ariza-18-noyabr',
    source: 'infoedu.uz',
  },
  {
    id: 'botir-zokirov',
    cat: 'madaniyat',
    t: 'Botir Zokirov nomidagi zamonaviy estrada qöşiqçilari tanlovi',
    org: 'Madaniyat vazirligi',
    badge: { l: 'Ötkaziliş vaqti', v: 'Sentabr — dekabr' },
    who: 'Zamonaviy estrada yönalişidagi yoş qöşiqçilar',
    prize: 'Ğolib va sovrindorlar vazirlik tomonidan taqdirlanadi',
    cycle: 'Har yili; 2026-yilda sentabr — dekabr',
    window: ['2026-09-01', '2026-12-31'],
    text: 'Tanlov iqtidorli yoşlarni qöllab-quvvatlaş, yangi isteʼdodlarni kaşf etiş va zamonaviy estrada sanʼatini rivojlantiriş maqsadida ötkaziladi. Iştirok şartlari Madaniyat vazirligi tomonidan eʼlon qilinadi.',
    url: 'https://gov.uz/oz/madaniyat/news/view/206241',
    source: MADANIYAT_SRC,
  },
  {
    id: 'yoshlik-bahori',
    cat: 'madaniyat',
    t: '“Yoşlik bahori” yoş opera ijroçilari festivali',
    org: 'Madaniyat vazirligi',
    badge: { l: 'Ötkaziliş vaqti', v: 'Mart' },
    who: 'Yoş opera xonandalari',
    prize: 'Ğolib va sovrindorlar vazirlik tomonidan taqdirlanadi',
    cycle: 'Har yili, mart oyida',
    text: 'Respublika festivali yoş opera ijroçilarini aniqlaş va qöllab-quvvatlaş maqsadida Madaniyat vazirligi tomonidan ötkaziladigan respublika tanlovlari röyxatiga kiritilgan.',
    url: MADANIYAT,
    source: MADANIYAT_SRC,
    img: '/img/tanlovlar/yoshlik-bahori.webp',
  },
  {
    id: 'xush-kayfiyat',
    cat: 'madaniyat',
    t: '“Xuş kayfiyat” yoş qiziqçi va askiyaçilar tanlovi',
    org: 'Madaniyat vazirligi',
    badge: { l: 'Ötkaziliş vaqti', v: 'Aprel' },
    who: 'Yoş qiziqçilar va askiyaçilar',
    prize: 'Ğolib va sovrindorlar vazirlik tomonidan taqdirlanadi',
    cycle: 'Har yili, aprel oyida',
    text: 'Respublika tanlovi milliy askiya va qiziqçilik sanʼatini rivojlantiriş, bu yönalişdagi iqtidorli yoşlarni qöllab-quvvatlaş maqsadida ötkaziladi.',
    url: MADANIYAT,
    source: MADANIYAT_SRC,
    img: '/img/tanlovlar/xush-kayfiyat.webp',
  },
  {
    id: 'sultonov-uzoqov',
    cat: 'madaniyat',
    t: 'Jöraxon Sultonov va Maʼmurjon Uzoqov nomidagi yoş ijroçilar tanlovi',
    org: 'Madaniyat vazirligi',
    badge: { l: 'Ötkaziliş vaqti', v: 'May — iyul' },
    who: 'Milliy maqom va xalq qöşiqlari yönalişidagi yoş ijroçilar',
    prize: 'Ğolib va sovrindorlar vazirlik tomonidan taqdirlanadi',
    cycle: 'Har yili, may — iyul oylarida',
    text: 'Respublika tanlovi teletanlov şaklida ötkaziladi. Arizalar Qoraqalpoğiston Respublikasi, viloyatlar va Toşkent şahar madaniyat boşqarmalari orqali qabul qilinadi.',
    url: MADANIYAT,
    source: MADANIYAT_SRC,
    img: '/img/tanlovlar/sultonov-uzoqov.webp',
  },
  {
    id: 'marhabo-talantlar',
    cat: 'madaniyat',
    t: '“Marhabo, talantlar” respublika körik-tanlovi',
    org: 'Madaniyat vazirligi',
    badge: { l: 'Ötkaziliş vaqti', v: 'May — oktabr' },
    who: 'Musiqa, raqs va sahna sanʼati yönalişlaridagi iqtidorli bolalar va yoşlar',
    prize: 'Ğolib va sovrindorlar vazirlik tomonidan taqdirlanadi',
    cycle: 'Har yili, may — oktabr oylarida',
    text: 'Körik-tanlov hududiy va respublika bosqiçlarida ötkaziladi hamda madaniyat va sanʼat sohasidagi yoş isteʼdodlarni aniqlaşga xizmat qiladi.',
    url: MADANIYAT,
    source: MADANIYAT_SRC,
    img: '/img/tanlovlar/marhabo-talantlar.webp',
  },

  {
    id: 'yosh-kitobxon',
    cat: 'adabiyot',
    t: '“Yoş kitobxon” tanlovi',
    org: 'Yoşlar işlari agentligi',
    badge: { l: 'Yoş toifalari', v: '10 yoşdan 30 yoşgaça' },
    who: 'Maktab öquvçilari, talabalar va yoşlar — yoş toifalari böyiça',
    prize: 'Ğolib va sovrindorlar rağbatlantiriladi',
    cycle: 'Har yili; adabiyotlar röyxati mavsum boşida eʼlon qilinadi',
    text: 'Tanlov Yoşlar işlari agentligi eʼlon qiladigan adabiyotlar röyxati asosida ötkaziladi. 2026-yilgi röyxatga xalq oğzaki ijodi namunalari, özbek va jahon adabiyoti asarlari kiritilgan; asarlarning bir qismi “Mutolaa” elektron kutubxonasida mavjud.',
    url: 'https://gov.uz/oz/yoshlar/news/view/173331',
    source: 'gov.uz — Yoşlar işlari agentligi',
    img: '/img/tanlovlar/yosh-kitobxon.webp',
  },
  {
    id: 'kelajak-tibbiyoti',
    cat: 'tibbiyot',
    t: '“Kelajak tibbiyoti” xalqaro tibbiyot olimpiadasi',
    org: 'Central Asian University',
    badge: { l: 'Birinçi örin mukofoti', v: '500 mln söm' },
    who: 'Tibbiyot oliy taʼlim muassasalarining talabalari',
    prize: '2025-yilda 1-örin uçun 500 mln, 2-örin uçun 300 mln, 3-örin uçun 150 mln söm',
    cycle: '2025-yilda ilk bor ötkazilgan; navbatdagi mavsum taşkilotçi tomonidan eʼlon qilinadi',
    text: 'Olimpiada tibbiyotning asosiy yönalişlari böyiça nazariy testlar, AHA BLS standartlari böyiça amaliy topşiriqlar, klinik holatlar va interfaol tibbiy viktorinalardan iborat. 2025-yilda 60 ta universitetdan 300 nafar talaba iştirok etgan.',
    url: 'https://www.kun.uz/news/2025/10/29/toshkentda-kelajak-tibbiyoti-2025-yirik-xalqaro-tibbiyot-olimpiadasi-otkaziladi',
    source: 'kun.uz',
    img: '/img/tanlovlar/kelajak-tibbiyoti.webp',
  },
  {
    id: 'besh-tashabbus',
    cat: 'sport',
    t: '“Beş taşabbus olimpiadasi”',
    org: 'Yoşlar işlari agentligi',
    badge: { l: 'Yoş toifalari', v: '16 yoşdan 30 yoşgaça' },
    who: 'Talabalar va mahalla yoşlari; sport musobaqalarida 16–21, 22–26 va 27–30 yoş toifalari',
    prize: 'Ğolib va sovrindorlar har bir bosqiçda taqdirlanadi',
    cycle: 'Har yili: mahalla, tuman (şahar), viloyat va respublika bosqiçlari',
    text: 'Olimpiada sport musobaqalari, sanʼat va madaniyat, kitobxonlik, intellektual öyinlar hamda kasbiy mahorat yönalişlarini qamrab oladi. Har bir bosqiç ğoliblari keyingi bosqiçga yöllanma oladi.',
    url: 'https://uza.uz/ar/posts/besh-tashabbus-olimpiadasi-yoshlar-faolligini-namoyon-etmoqda_880481',
    source: 'uza.uz',
    img: '/img/tanlovlar/besh-tashabbus.webp',
  },
  {
    id: 'prezident-olimpiadasi',
    cat: 'sport',
    t: 'Prezident olimpiadasi',
    org: 'Sport vazirligi',
    badge: { l: 'Sport turlari', v: '35 ta sport turi' },
    who: '14 yoşdan 17 yoşgaça bölgan öquvçilar',
    prize: '2027-yildan 1-örin uçun 25 mln, 2-örin uçun 12 mln, 3-örin uçun 6 mln söm; rekord natija körsatgan bitiruvçilarga imtihonsiz qabul',
    cycle: 'Har yili; final bosqiçi Olimpiya şaharçasida ötkaziladi',
    text: 'Olimpiada “Yangi Özbekiston Olimpiya çöqqilari” uç bosqiçli musobaqalarining respublika final bosqiçi hisoblanadi. Ğoliblardan har yili 50 nafari xorijdagi xalqaro öquv-maşğulot yiğinlariga yuboriladi. Özbekiston rekordini yangilagan maktab bitiruvçilari oliy taʼlim taşkilotlarining sport yönalişlariga davlat granti asosida imtihonsiz qabul qilinadi.',
    url: 'https://gov.uz/oz/sport/news/view/141293',
    source: 'gov.uz — Sport vazirligi; infoedu.uz',
    img: '/img/tanlovlar/prezident-olimpiadasi.webp',
  },
]
