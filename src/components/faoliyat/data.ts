/**
 * “Faoliyat” bölimi mazmuni. Manba — Kengaşning “Poytaxt yoşlari” Telegram kanali (2023–2026).
 * Raqamlar asl postlardan tekşirilgan; har bir fakt yonida post raqami (TG(id) — havola).
 */
import { PROJECTS } from './projects'
import type { Direction, DirSlug, Fact } from './types'

export { PROJECTS }

export const DIRECTIONS: Direction[] = [
  {
    slug: 'manaviyat-kitobxonlik',
    title: 'Ma’naviy-ma’rifiy ishlar va kitobxonlikni rivojlantirish',
    short: 'Ma’naviyat va kitobxonlik',
    about:
      'Mazkur yo‘nalish bo‘yicha Kengash yoshlar o‘rtasida kitobxonlik madaniyatini yuksaltirish, milliy va umuminsoniy qadriyatlarga hurmat hamda tarixiy xotirani asrash tuyg‘usini shakllantirish bo‘yicha ishlarni amalga oshiradi. Xususan, Yoshlar ijod saroyida kitoblar festivallari, badiiy asarlar muhokamasiga bag‘ishlangan davra suhbatlari va adabiy-musiqiy kechalar, oliy ta’lim tashkilotlarida rahbarlar va faxriylarning yoshlar bilan ochiq muloqotlari, allomalar va adiblar tavalludiga bag‘ishlangan ma’naviy-ma’rifiy tadbirlar o‘tkaziladi.',
  },
  {
    slug: 'intellektual',
    title: 'Yoshlarning intellektual salohiyatini oshirish',
    short: 'Intellektual salohiyat',
    about:
      'Mazkur yo‘nalish bo‘yicha Kengash yoshlarning tahliliy va tanqidiy fikrlashini, bilim darajasini va jamoada ishlash ko‘nikmalarini rivojlantirishga qaratilgan ishlarni amalga oshiradi. Xususan, oliy ta’lim tashkilotlari va harbiy o‘quv yurtlarida intellektual o‘yinlar, debat turnirlari va BMT modeli konferensiyalari o‘tkaziladi, respublika intellektual tanlovlarining Toshkent shahar bosqichlari tashkil etiladi. Shahar bosqichlari g‘oliblari respublika bosqichlarida Toshkent shahri nomidan ishtirok etadi.',
  },
  {
    slug: 'harbiy-vatanparvarlik',
    title: 'Yoshlarni harbiy-vatanparvarlik ruhida tarbiyalash',
    short: 'Harbiy-vatanparvarlik',
    about:
      'Mazkur yo‘nalish bo‘yicha Kengash yoshlarni Vatanga sadoqat va harbiy xizmatga hurmat ruhida tarbiyalash, ularning jismoniy tayyorgarligini oshirish bo‘yicha ishlarni kuch tuzilmalari, harbiy qismlar va muassasalar bilan hamkorlikda amalga oshiradi. Xususan, harbiy qismlarda o‘quv yig‘inlari va ochiq eshiklar kunlari, harbiy-sport musobaqalari, yosh harbiylar forumlari hamda vatanparvarlik tarbiyasiga oid ilmiy-amaliy konferensiya va seminarlar o‘tkaziladi.',
  },
  {
    slug: 'volontyorlik',
    title: 'Volontyorlik va xayriya faoliyatini rivojlantirish',
    short: 'Volontyorlik va xayriya',
    about:
      'Mazkur yo‘nalish bo‘yicha Kengash yoshlarni ijtimoiy faollikka, yordamga muhtoj aholi qatlamlariga g‘amxo‘rlik qilishga jalb etish hamda volontyorlarni tizimli tayyorlash bo‘yicha ishlarni amalga oshiradi. Xususan, volontyorlik va loyiha boshqaruvi bo‘yicha o‘quv kurslari, sardorlar uchun seminar-treninglar tashkil etiladi, bolalar hospisi, maktab-internat va onkologiya markazida xayriya aksiyalari o‘tkaziladi.',
  },
  {
    slug: 'sport-salomatlik',
    title: 'Jismoniy tarbiya, sport va sog‘lom turmush tarzini targ‘ib qilish',
    short: 'Sport va sog‘lom turmush',
    about:
      'Mazkur yo‘nalish bo‘yicha Kengash yoshlar o‘rtasida jismoniy tarbiya va sportni ommalashtirish, sog‘lom turmush tarzini targ‘ib qilish bo‘yicha ishlarni amalga oshiradi. Xususan, oliy ta’lim tashkilotlaridagi boshlang‘ich tashkilotlar o‘rtasida mini futbol, stol tennisi va shaxmat bo‘yicha musobaqalar, o‘rtoqlik bellashuvlari, talabalar sport festivallari va ommaviy yurish marafonlari o‘tkaziladi.',
  },
  {
    slug: 'yetakchilik',
    title: 'Boshlang‘ich tashkilotlar faoliyatini muvofiqlashtirish va yoshlar yetakchilarini tayyorlash',
    short: 'Boshlang‘ich tashkilotlar va yetakchilar',
    about:
      'Mazkur yo‘nalish bo‘yicha Kengash o‘z qamrovidagi oliy ta’lim tashkilotlarida Ittifoq boshlang‘ich tashkilotlari faoliyatini muvofiqlashtiradi, yoshlar yetakchilarini saralash, o‘qitish, faoliyatini baholash va rag‘batlantirish tizimini yuritadi. Xususan, boshlang‘ich tashkilotlarda hisobot-saylov yig‘ilishlari o‘tkaziladi, yoshlar yetakchilari uchun muntazam o‘quv-seminarlar, forumlar va ko‘rik-tanlovlar tashkil etiladi.',
  },
  {
    slug: 'huquqiy-madaniyat',
    title: 'Yoshlarning huquqiy madaniyatini yuksaltirish va huquqbuzarliklar profilaktikasi',
    short: 'Huquqiy madaniyat',
    about:
      'Mazkur yo‘nalish bo‘yicha Kengash yoshlarning huquqiy savodxonligini oshirish, ular o‘rtasida huquqbuzarlik, giyohvandlik va korrupsiyaning oldini olish bo‘yicha ishlarni amalga oshiradi. Xususan, saylov qonunchiligini tushuntirishga qaratilgan davra suhbatlari, profilaktik tadbirlar hamda soxta axborotga qarshi kurasishga bag‘ishlangan uchrashuvlar o‘tkaziladi.',
  },
  {
    slug: 'ekologiya',
    title: 'Yoshlarning ekologik madaniyatini shakllantirish',
    short: 'Ekologiya',
    about:
      'Mazkur yo‘nalish bo‘yicha Kengash yoshlarda ekologik madaniyatni shakllantirish va ularni atrof-muhitni muhofaza qilish ishlariga amaliy jalb etish bo‘yicha ishlarni amalga oshiradi. Xususan, daraxt va ko‘chat ekish, chiqindilarni yig‘ish aksiyalari, suv resurslarini tejashga qaratilgan targ‘ibot tadbirlari va ekologik musobaqalar o‘tkaziladi.',
  },
  {
    slug: 'media',
    title: 'Axborot va media faoliyati',
    short: 'Axborot va media',
    about:
      'Mazkur yo‘nalish bo‘yicha Kengash o‘z faoliyati va poytaxt yoshlari hayotini ommaviy axborot vositalari va ijtimoiy tarmoqlarda yoritish, yoshlarning mediasavodxonligini oshirish bo‘yicha ishlarni amalga oshiradi. Xususan, motivatsion filmlar, teleko‘rsatuvlar va videoroliklar tayyorlanadi, “Poytaxt yoshlari” Telegram kanalida axborot rubrikalari yuritiladi, mediasavodxonlik bo‘yicha seminar-treninglar o‘tkaziladi.',
  },
  {
    slug: 'ijod-turizm',
    title: 'Yoshlarning ijodiy salohiyatini qo‘llab-quvvatlash, madaniy hordiq va turizm',
    short: 'Ijod, madaniyat va turizm',
    about:
      'Mazkur yo‘nalish bo‘yicha Kengash yoshlarning ijodiy salohiyatini ro‘yobga chiqarish, milliy madaniyat va qadriyatlarni targ‘ib qilish hamda yoshlarning mazmunli hordig‘ini tashkil etish bo‘yicha ishlarni amalga oshiradi. Xususan, talabalar festivallari, milliy liboslar namoyishlari, konsert dasturlari va ijodiy kechalar o‘tkaziladi, yoshlar uchun mamlakat bo‘ylab sayohatlar tashkil etiladi.',
  },
  {
    slug: 'talim-kasb',
    title: 'Yoshlarning ta’lim olishi, kasbiy rivojlanishi va tadbirkorligini qo‘llab-quvvatlash',
    short: 'Ta’lim va kasbiy rivojlanish',
    about:
      'Mazkur yo‘nalish bo‘yicha Kengash yoshlarning bilim, xorijiy til va kasbiy ko‘nikmalarini oshirish, ularni tadbirkorlikka jalb etish hamda ta’lim olishdagi imtiyozlardan foydalanishiga ko‘maklashish bo‘yicha ishlarni amalga oshiradi. Xususan, tadbirkorlik va xorijiy tillar bo‘yicha marafonlar, liderlik treninglari, talabalar ilmiy-amaliy konferensiyalari o‘tkaziladi, oliy ta’lim tashkilotlariga imtiyozli qabul uchun tavsiyanomalar tanlovi tashkil etiladi.',
  },
]

/** Yönaliş nomi (slug böyiça) */
export const dirTitle = (s: DirSlug) => DIRECTIONS.find((d) => d.slug === s)?.title ?? ''

/** Yönalişdagi loyihalar */
export const dirProjects = (s: DirSlug) => PROJECTS.filter((p) => p.dir === s)

/** 2025-yil yakunlari (post 5055) — Kengaşning rasmiy hisoboti */
export const REPORT_2025 = {
  post: 5055,
  nums: [
    { v: '250', t: 'loyiha va tadbir o‘tkazildi' },
    { v: '261 ming', t: 'yosh qamrab olindi' },
    { v: '457', t: 'ta’lim va intellekt yo‘nalishidagi tadbir (323 ming yosh)' },
    { v: '67', t: 'sport va ijod loyihasi (79 ming yosh)' },
    { v: '19', t: 'tashkilot bilan hamkorlik yo‘lga qo‘yildi' },
    { v: '48', t: 'telelavha OAVda efirga uzatildi' },
  ],
}

/** Yillar kesimida asosiy natijalar — har biri asl postdan tekşirilgan */
export const YEARS: Array<{ y: string; items: Fact[] }> = [
  {
    y: '2026',
    items: [
      {
        text: '“Munozara” intellektual turnirining respublika bosqichida uchala sovrinli o‘rinni Toshkent jamoalari egalladi: TIQXMMI MTU “Elita”, O‘zMU “Taraqqiyot yoshlari”, TDYU “Yuristlar”.',
        post: 6230,
      },
      {
        text: 'Kengash qamrovidagi 98 ta oliy ta’lim tashkiloti 9 ta hududiy guruhga birlashtirilib, “Hududiy koordinatorlar instituti” modeli joriy etildi.',
        post: 6833,
      },
      {
        text: 'Toshkent shahridagi oliy ta’lim tashkilotlarining 70 dan ortiq yoshlar yetakchisi “Oliy ta’lim yetakchilarining forumi”da ishtirok etdi.',
        post: 6890,
      },
      {
        text: 'TDSHU boshlang‘ich tashkiloti tashkil etgan “Zakovat QUIZ”da 150 ga yaqin jamoa, 700 nafardan ortiq 1-kurs talabasi qatnashdi.',
        post: 6758,
      },
    ],
  },
  {
    y: '2025',
    items: [
      {
        text: '250 ta loyiha va tadbir o‘tkazilib, 261 ming yosh qamrab olindi; 19 ta tashkilot bilan hamkorlik yo‘lga qo‘yildi.',
        post: 5055,
      },
      {
        text: '“Munozara” intellektual debat turnirining respublika bosqichida Toshkent davlat iqtisodiyot universiteti jamoasi 1-o‘rinni egalladi.',
        post: 5055,
      },
      {
        text: '“Kitob olami” festivalida 2 kun davomida 8 000 nafardan ortiq yosh ishtirok etdi, 20 ga yaqin nashriyot taqdirlandi.',
        post: 4684,
      },
    ],
  },
  {
    y: '2024',
    items: [
      {
        text: '“Universe” volontyorlar maktabiga 1 287 nafar nomzod orasidan 4 bosqichli imtihon orqali 37 nafar rasmiy ishtirokchi saralandi.',
        post: 1533,
      },
      {
        text: '“Toshkent talabalar assotsiatsiyasi”ning birinchi ta’sis yig‘ilishida 550 nafar delegat ishtirok etdi.',
        post: 2187,
      },
    ],
  },
  {
    y: '2023',
    items: [
      {
        text: 'Faol a’zo bo‘lgan 387 nafar talabaga kontrakt summasining 35 foizi — 1 mlrd 497 mln 762 ming so‘m miqdoridagi sertifikat topshirildi.',
        post: 170,
      },
      {
        text: '“Poytaxt sardorlari forumi”da 300 nafar maktab sardorlar kengashlari a’zosi ishtirok etdi.',
        post: 430,
      },
    ],
  },
]
