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
  { key: 'madaniyat', t: 'Madaniyat va san’at' },
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
    t: '“Bo‘lajak olim” ilmiy g‘oyalar tanlovi',
    org: 'Innovatsion rivojlanish agentligi',
    badge: { l: 'Moliyalashtirish · BHMning 400 barobarigacha', v: som(400 * BHM.v) + 'gacha' },
    who: '40 yoshdan oshmagan O‘zbekiston fuqarolari, ilmiy darajasi va ish joyidan qat’i nazar',
    prize: 'Ilmiy g‘oyani amalga oshirish, maket yoki prototip yaratish uchun mablag‘',
    cycle: 'Har yili; 2026-yilda ariza 14-sentabr — 13-oktabr',
    text: 'Tanlovga jamiyat yoki iqtisodiyotdagi aniq muammoni hal etishga qaratilgan, bir yilgacha muddatda amalga oshiriladigan ilmiy g‘oyalar qabul qilinadi. G‘olib loyiha asosida yaratilgan namuna vazirlik ko‘rgazmalar zalida namoyish etiladi.',
    url: 'https://gov.uz/oz/innovation/contest/view/222296',
    source: 'gov.uz — Innovatsion rivojlanish agentligi',
    img: '/img/tanlovlar/bolajak-olim.webp',
  },
  {
    id: 'akademik-harakatchanlik',
    cat: 'ilm',
    t: '“Akademik harakatchanlik” dasturi tanlovi',
    org: 'Innovatsion rivojlanish agentligi',
    badge: { l: 'Loyiha qiymati · BHMning 200 barobarigacha', v: som(200 * BHM.v) + 'gacha' },
    who: '40 yoshdan oshmagan yosh olimlar, barcha fan yo‘nalishlari bo‘yicha',
    prize: 'Yetakchi ilmiy markazlar laboratoriyalarida 1 oydan 6 oygacha tadqiqot o‘tkazish imkoniyati va moliyalashtirish',
    cycle: 'Har yili; 2026-yilda ariza 4-iyun — 4-iyul',
    text: 'Dastur Vazirlar Mahkamasining 2021-yil 19-apreldagi 222-son qarori asosida o‘tkaziladi. Yosh olimlar o‘z ish joyidan ajralmagan holda ilmiy tashkilotlar va oliy ta’lim muassasalarining zamonaviy laboratoriyalarida loyihalarini amalga oshiradi.',
    url: 'https://gov.uz/oz/innovation/contest/view/174198',
    source: 'gov.uz — Innovatsion rivojlanish agentligi',
    img: '/img/tanlovlar/akademik-harakatchanlik.webp',
  },
  {
    id: 'ixtirochi',
    cat: 'ilm',
    t: '“Eng yaxshi oliy ta’lim ixtirochisi” respublika tanlovi',
    org: 'Innovatsion rivojlanish agentligi',
    badge: { l: 'Ustuvor yo‘nalishlar', v: '8 ta yo‘nalish' },
    who: 'Davlat oliy ta’lim tashkilotlarining talabalari va professor-o‘qituvchilari',
    prize: 'G‘olib va sovrindorlar 8 ta ustuvor yo‘nalish bo‘yicha taqdirlanadi',
    cycle: 'Har yili; 2026-yilda ariza 11-maygacha, g‘oliblar 2-oktabrda e’lon qilingan',
    text: 'Tanlov oliy ta’lim tashkiloti, hududiy va respublika bosqichlarida o‘tkaziladi. Ishtirok uchun patent talab etilmaydi: innovatsion ixtiro yoki foydali modelga ega har bir ishtirokchi id.ilmiy.uz tizimi orqali ariza topshiradi.',
    url: 'https://gov.uz/oz/innovation/contest/view/152136',
    source: 'gov.uz — Innovatsion rivojlanish agentligi',
    img: '/img/tanlovlar/ixtirochi.webp',
  },
  {
    id: 'bellashailik',
    cat: 'raqamli',
    t: '“BellashAIlik” respublika tanlovi',
    org: '“Digital Art” ijodiy birlashmasi, Kasbiy ta’lim agentligi',
    badge: { l: 'Yo‘nalish', v: 'Sun’iy intellekt yordamida ijod' },
    who: 'Sun’iy intellekt yordamida video, animatsiya va boshqa ijodiy kontent yaratadigan yoshlar',
    prize: 'G‘olib va sovrindorlar tashkilotchilar tomonidan taqdirlanadi',
    deadline: '2026-11-18',
    cycle: 'Ariza 2026-yil 18-noyabr soat 18:00gacha Telegram-bot orqali',
    text: 'Ariza @bellashailik_bot Telegram-boti orqali to‘ldiriladi va ijodiy ish yuklanadi. Tanlov sun’iy intellekt texnologiyalaridan ijodiy faoliyatda samarali foydalanayotgan iqtidorli yoshlarni aniqlash maqsadida o‘tkaziladi.',
    url: 'https://infoedu.uz/bellashailik-tanlovi-ariza-18-noyabr',
    source: 'infoedu.uz',
  },
  {
    id: 'botir-zokirov',
    cat: 'madaniyat',
    t: 'Botir Zokirov nomidagi zamonaviy estrada qo‘shiqchilari tanlovi',
    org: 'Madaniyat vazirligi',
    badge: { l: 'O‘tkazilish vaqti', v: 'Sentabr — dekabr' },
    who: 'Zamonaviy estrada yo‘nalishidagi yosh qo‘shiqchilar',
    prize: 'G‘olib va sovrindorlar vazirlik tomonidan taqdirlanadi',
    cycle: 'Har yili; 2026-yilda sentabr — dekabr',
    window: ['2026-09-01', '2026-12-31'],
    text: 'Tanlov iqtidorli yoshlarni qo‘llab-quvvatlash, yangi iste’dodlarni kashf etish va zamonaviy estrada san’atini rivojlantirish maqsadida o‘tkaziladi. Ishtirok shartlari Madaniyat vazirligi tomonidan e’lon qilinadi.',
    url: 'https://gov.uz/oz/madaniyat/news/view/206241',
    source: MADANIYAT_SRC,
  },
  {
    id: 'yoshlik-bahori',
    cat: 'madaniyat',
    t: '“Yoshlik bahori” yosh opera ijrochilari festivali',
    org: 'Madaniyat vazirligi',
    badge: { l: 'O‘tkazilish vaqti', v: 'Mart' },
    who: 'Yosh opera xonandalari',
    prize: 'G‘olib va sovrindorlar vazirlik tomonidan taqdirlanadi',
    cycle: 'Har yili, mart oyida',
    text: 'Respublika festivali yosh opera ijrochilarini aniqlash va qo‘llab-quvvatlash maqsadida Madaniyat vazirligi tomonidan o‘tkaziladigan respublika tanlovlari ro‘yxatiga kiritilgan.',
    url: MADANIYAT,
    source: MADANIYAT_SRC,
    img: '/img/tanlovlar/yoshlik-bahori.webp',
  },
  {
    id: 'xush-kayfiyat',
    cat: 'madaniyat',
    t: '“Xush kayfiyat” yosh qiziqchi va askiyachilar tanlovi',
    org: 'Madaniyat vazirligi',
    badge: { l: 'O‘tkazilish vaqti', v: 'Aprel' },
    who: 'Yosh qiziqchilar va askiyachilar',
    prize: 'G‘olib va sovrindorlar vazirlik tomonidan taqdirlanadi',
    cycle: 'Har yili, aprel oyida',
    text: 'Respublika tanlovi milliy askiya va qiziqchilik san’atini rivojlantirish, bu yo‘nalishdagi iqtidorli yoshlarni qo‘llab-quvvatlash maqsadida o‘tkaziladi.',
    url: MADANIYAT,
    source: MADANIYAT_SRC,
    img: '/img/tanlovlar/xush-kayfiyat.webp',
  },
  {
    id: 'sultonov-uzoqov',
    cat: 'madaniyat',
    t: 'Jo‘raxon Sultonov va Ma’murjon Uzoqov nomidagi yosh ijrochilar tanlovi',
    org: 'Madaniyat vazirligi',
    badge: { l: 'O‘tkazilish vaqti', v: 'May — iyul' },
    who: 'Milliy maqom va xalq qo‘shiqlari yo‘nalishidagi yosh ijrochilar',
    prize: 'G‘olib va sovrindorlar vazirlik tomonidan taqdirlanadi',
    cycle: 'Har yili, may — iyul oylarida',
    text: 'Respublika tanlovi teletanlov shaklida o‘tkaziladi. Arizalar Qoraqalpog‘iston Respublikasi, viloyatlar va Toshkent shahar madaniyat boshqarmalari orqali qabul qilinadi.',
    url: MADANIYAT,
    source: MADANIYAT_SRC,
    img: '/img/tanlovlar/sultonov-uzoqov.webp',
  },
  {
    id: 'marhabo-talantlar',
    cat: 'madaniyat',
    t: '“Marhabo, talantlar” respublika ko‘rik-tanlovi',
    org: 'Madaniyat vazirligi',
    badge: { l: 'O‘tkazilish vaqti', v: 'May — oktabr' },
    who: 'Musiqa, raqs va sahna san’ati yo‘nalishlaridagi iqtidorli bolalar va yoshlar',
    prize: 'G‘olib va sovrindorlar vazirlik tomonidan taqdirlanadi',
    cycle: 'Har yili, may — oktabr oylarida',
    text: 'Ko‘rik-tanlov hududiy va respublika bosqichlarida o‘tkaziladi hamda madaniyat va san’at sohasidagi yosh iste’dodlarni aniqlashga xizmat qiladi.',
    url: MADANIYAT,
    source: MADANIYAT_SRC,
    img: '/img/tanlovlar/marhabo-talantlar.webp',
  },

  {
    id: 'yosh-kitobxon',
    cat: 'adabiyot',
    t: '“Yosh kitobxon” tanlovi',
    org: 'Yoshlar ishlari agentligi',
    badge: { l: 'Yosh toifalari', v: '10 yoshdan 30 yoshgacha' },
    who: 'Maktab o‘quvchilari, talabalar va yoshlar — yosh toifalari bo‘yicha',
    prize: 'G‘olib va sovrindorlar rag‘batlantiriladi',
    cycle: 'Har yili; adabiyotlar ro‘yxati mavsum boshida e’lon qilinadi',
    text: 'Tanlov Yoshlar ishlari agentligi e’lon qiladigan adabiyotlar ro‘yxati asosida o‘tkaziladi. 2026-yilgi ro‘yxatga xalq og‘zaki ijodi namunalari, o‘zbek va jahon adabiyoti asarlari kiritilgan; asarlarning bir qismi “Mutolaa” elektron kutubxonasida mavjud.',
    url: 'https://gov.uz/oz/yoshlar/news/view/173331',
    source: 'gov.uz — Yoshlar ishlari agentligi',
    img: '/img/tanlovlar/yosh-kitobxon.webp',
  },
  {
    id: 'kelajak-tibbiyoti',
    cat: 'tibbiyot',
    t: '“Kelajak tibbiyoti” xalqaro tibbiyot olimpiadasi',
    org: 'Central Asian University',
    badge: { l: 'Birinchi o‘rin mukofoti', v: '500 mln so‘m' },
    who: 'Tibbiyot oliy ta’lim muassasalarining talabalari',
    prize: '2025-yilda 1-o‘rin uchun 500 mln, 2-o‘rin uchun 300 mln, 3-o‘rin uchun 150 mln so‘m',
    cycle: '2025-yilda ilk bor o‘tkazilgan; navbatdagi mavsum tashkilotchi tomonidan e’lon qilinadi',
    text: 'Olimpiada tibbiyotning asosiy yo‘nalishlari bo‘yicha nazariy testlar, AHA BLS standartlari bo‘yicha amaliy topshiriqlar, klinik holatlar va interfaol tibbiy viktorinalardan iborat. 2025-yilda 60 ta universitetdan 300 nafar talaba ishtirok etgan.',
    url: 'https://www.kun.uz/news/2025/10/29/toshkentda-kelajak-tibbiyoti-2025-yirik-xalqaro-tibbiyot-olimpiadasi-otkaziladi',
    source: 'kun.uz',
    img: '/img/tanlovlar/kelajak-tibbiyoti.webp',
  },
  {
    id: 'besh-tashabbus',
    cat: 'sport',
    t: '“Besh tashabbus olimpiadasi”',
    org: 'Yoshlar ishlari agentligi',
    badge: { l: 'Yosh toifalari', v: '16 yoshdan 30 yoshgacha' },
    who: 'Talabalar va mahalla yoshlari; sport musobaqalarida 16–21, 22–26 va 27–30 yosh toifalari',
    prize: 'G‘olib va sovrindorlar har bir bosqichda taqdirlanadi',
    cycle: 'Har yili: mahalla, tuman (shahar), viloyat va respublika bosqichlari',
    text: 'Olimpiada sport musobaqalari, san’at va madaniyat, kitobxonlik, intellektual o‘yinlar hamda kasbiy mahorat yo‘nalishlarini qamrab oladi. Har bir bosqich g‘oliblari keyingi bosqichga yo‘llanma oladi.',
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
    who: '14 yoshdan 17 yoshgacha bo‘lgan o‘quvchilar',
    prize: '2027-yildan 1-o‘rin uchun 25 mln, 2-o‘rin uchun 12 mln, 3-o‘rin uchun 6 mln so‘m; rekord natija ko‘rsatgan bitiruvchilarga imtihonsiz qabul',
    cycle: 'Har yili; final bosqichi Olimpiya shaharchasida o‘tkaziladi',
    text: 'Olimpiada “Yangi O‘zbekiston Olimpiya cho‘qqilari” uch bosqichli musobaqalarining respublika final bosqichi hisoblanadi. G‘oliblardan har yili 50 nafari xorijdagi xalqaro o‘quv-mashg‘ulot yig‘inlariga yuboriladi. O‘zbekiston rekordini yangilagan maktab bitiruvchilari oliy ta’lim tashkilotlarining sport yo‘nalishlariga davlat granti asosida imtihonsiz qabul qilinadi.',
    url: 'https://gov.uz/oz/sport/news/view/141293',
    source: 'gov.uz — Sport vazirligi; infoedu.uz',
    img: '/img/tanlovlar/prezident-olimpiadasi.webp',
  },
]
