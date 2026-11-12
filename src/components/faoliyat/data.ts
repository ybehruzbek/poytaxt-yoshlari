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
    title: 'Maʼnaviy-maʼrifiy işlar va kitobxonlikni rivojlantiriş',
    short: 'Maʼnaviyat va kitobxonlik',
    about:
      'Mazkur yönaliş böyiça Kengaş yoşlar örtasida kitobxonlik madaniyatini yuksaltiriş, milliy va umuminsoniy qadriyatlarga hurmat hamda tarixiy xotirani asraş tuyğusini şakllantiriş böyiça işlarni amalga oşiradi. Xususan, Yoşlar ijod saroyida kitoblar festivallari, badiiy asarlar muhokamasiga bağişlangan davra suhbatlari va adabiy-musiqiy keçalar, oliy taʼlim taşkilotlarida rahbarlar va faxriylarning yoşlar bilan oçiq muloqotlari, allomalar va adiblar tavalludiga bağişlangan maʼnaviy-maʼrifiy tadbirlar ötkaziladi.',
  },
  {
    slug: 'intellektual',
    title: 'Yoşlarning intellektual salohiyatini oşiriş',
    short: 'Intellektual salohiyat',
    about:
      'Mazkur yönaliş böyiça Kengaş yoşlarning tahliliy va tanqidiy fikrlaşini, bilim darajasini va jamoada işlaş könikmalarini rivojlantirişga qaratilgan işlarni amalga oşiradi. Xususan, oliy taʼlim taşkilotlari va harbiy öquv yurtlarida intellektual öyinlar, debat turnirlari va BMT modeli konferensiyalari ötkaziladi, respublika intellektual tanlovlarining Toşkent şahar bosqiçlari taşkil etiladi. Şahar bosqiçlari ğoliblari respublika bosqiçlarida Toşkent şahri nomidan iştirok etadi.',
  },
  {
    slug: 'harbiy-vatanparvarlik',
    title: 'Yoşlarni harbiy-vatanparvarlik ruhida tarbiyalaş',
    short: 'Harbiy-vatanparvarlik',
    about:
      'Mazkur yönaliş böyiça Kengaş yoşlarni Vatanga sadoqat va harbiy xizmatga hurmat ruhida tarbiyalaş, ularning jismoniy tayyorgarligini oşiriş böyiça işlarni kuç tuzilmalari, harbiy qismlar va muassasalar bilan hamkorlikda amalga oşiradi. Xususan, harbiy qismlarda öquv yiğinlari va oçiq eşiklar kunlari, harbiy-sport musobaqalari, yoş harbiylar forumlari hamda vatanparvarlik tarbiyasiga oid ilmiy-amaliy konferensiya va seminarlar ötkaziladi.',
  },
  {
    slug: 'volontyorlik',
    title: 'Volontyorlik va xayriya faoliyatini rivojlantiriş',
    short: 'Volontyorlik va xayriya',
    about:
      'Mazkur yönaliş böyiça Kengaş yoşlarni ijtimoiy faollikka, yordamga muhtoj aholi qatlamlariga ğamxörlik qilişga jalb etiş hamda volontyorlarni tizimli tayyorlaş böyiça işlarni amalga oşiradi. Xususan, volontyorlik va loyiha boşqaruvi böyiça öquv kurslari, sardorlar uçun seminar-treninglar taşkil etiladi, bolalar hospisi, maktab-internat va onkologiya markazida xayriya aksiyalari ötkaziladi.',
  },
  {
    slug: 'sport-salomatlik',
    title: 'Jismoniy tarbiya, sport va soğlom turmuş tarzini tarğib qiliş',
    short: 'Sport va soğlom turmuş',
    about:
      'Mazkur yönaliş böyiça Kengaş yoşlar örtasida jismoniy tarbiya va sportni ommalaştiriş, soğlom turmuş tarzini tarğib qiliş böyiça işlarni amalga oşiradi. Xususan, oliy taʼlim taşkilotlaridagi boşlanğiç taşkilotlar örtasida mini futbol, stol tennisi va şaxmat böyiça musobaqalar, örtoqlik bellaşuvlari, talabalar sport festivallari va ommaviy yuriş marafonlari ötkaziladi.',
  },
  {
    slug: 'yetakchilik',
    title: 'Boşlanğiç taşkilotlar faoliyatini muvofiqlaştiriş va yoşlar yetakçilarini tayyorlaş',
    short: 'Boşlanğiç taşkilotlar va yetakçilar',
    about:
      'Mazkur yönaliş böyiça Kengaş öz qamrovidagi oliy taʼlim taşkilotlarida Ittifoq boşlanğiç taşkilotlari faoliyatini muvofiqlaştiradi, yoşlar yetakçilarini saralaş, öqitiş, faoliyatini baholaş va rağbatlantiriş tizimini yuritadi. Xususan, boşlanğiç taşkilotlarda hisobot-saylov yiğilişlari ötkaziladi, yoşlar yetakçilari uçun muntazam öquv-seminarlar, forumlar va körik-tanlovlar taşkil etiladi.',
  },
  {
    slug: 'huquqiy-madaniyat',
    title: 'Yoşlarning huquqiy madaniyatini yuksaltiriş va huquqbuzarliklar profilaktikasi',
    short: 'Huquqiy madaniyat',
    about:
      'Mazkur yönaliş böyiça Kengaş yoşlarning huquqiy savodxonligini oşiriş, ular örtasida huquqbuzarlik, giyohvandlik va korrupsiyaning oldini oliş böyiça işlarni amalga oşiradi. Xususan, saylov qonunçiligini tuşuntirişga qaratilgan davra suhbatlari, profilaktik tadbirlar hamda soxta axborotga qarşi kurasişga bağişlangan uçraşuvlar ötkaziladi.',
  },
  {
    slug: 'ekologiya',
    title: 'Yoşlarning ekologik madaniyatini şakllantiriş',
    short: 'Ekologiya',
    about:
      'Mazkur yönaliş böyiça Kengaş yoşlarda ekologik madaniyatni şakllantiriş va ularni atrof-muhitni muhofaza qiliş işlariga amaliy jalb etiş böyiça işlarni amalga oşiradi. Xususan, daraxt va köçat ekiş, çiqindilarni yiğiş aksiyalari, suv resurslarini tejaşga qaratilgan tarğibot tadbirlari va ekologik musobaqalar ötkaziladi.',
  },
  {
    slug: 'media',
    title: 'Axborot va media faoliyati',
    short: 'Axborot va media',
    about:
      'Mazkur yönaliş böyiça Kengaş öz faoliyati va poytaxt yoşlari hayotini ommaviy axborot vositalari va ijtimoiy tarmoqlarda yoritiş, yoşlarning mediasavodxonligini oşiriş böyiça işlarni amalga oşiradi. Xususan, motivatsion filmlar, telekörsatuvlar va videoroliklar tayyorlanadi, “Poytaxt yoşlari” Telegram kanalida axborot rubrikalari yuritiladi, mediasavodxonlik böyiça seminar-treninglar ötkaziladi.',
  },
  {
    slug: 'ijod-turizm',
    title: 'Yoşlarning ijodiy salohiyatini qöllab-quvvatlaş, madaniy hordiq va turizm',
    short: 'Ijod, madaniyat va turizm',
    about:
      'Mazkur yönaliş böyiça Kengaş yoşlarning ijodiy salohiyatini röyobga çiqariş, milliy madaniyat va qadriyatlarni tarğib qiliş hamda yoşlarning mazmunli hordiğini taşkil etiş böyiça işlarni amalga oşiradi. Xususan, talabalar festivallari, milliy liboslar namoyişlari, konsert dasturlari va ijodiy keçalar ötkaziladi, yoşlar uçun mamlakat böylab sayohatlar taşkil etiladi.',
  },
  {
    slug: 'talim-kasb',
    title: 'Yoşlarning taʼlim olişi, kasbiy rivojlanişi va tadbirkorligini qöllab-quvvatlaş',
    short: 'Taʼlim va kasbiy rivojlaniş',
    about:
      'Mazkur yönaliş böyiça Kengaş yoşlarning bilim, xorijiy til va kasbiy könikmalarini oşiriş, ularni tadbirkorlikka jalb etiş hamda taʼlim olişdagi imtiyozlardan foydalanişiga kömaklaşiş böyiça işlarni amalga oşiradi. Xususan, tadbirkorlik va xorijiy tillar böyiça marafonlar, liderlik treninglari, talabalar ilmiy-amaliy konferensiyalari ötkaziladi, oliy taʼlim taşkilotlariga imtiyozli qabul uçun tavsiyanomalar tanlovi taşkil etiladi.',
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
    { v: '250', t: 'loyiha va tadbir ötkazildi' },
    { v: '261 ming', t: 'yoş qamrab olindi' },
    { v: '457', t: 'taʼlim va intellekt yönalişidagi tadbir (323 ming yoş)' },
    { v: '67', t: 'sport va ijod loyihasi (79 ming yoş)' },
    { v: '19', t: 'taşkilot bilan hamkorlik yölga qöyildi' },
    { v: '48', t: 'telelavha OAVda efirga uzatildi' },
  ],
}

/** Yillar kesimida asosiy natijalar — har biri asl postdan tekşirilgan */
export const YEARS: Array<{ y: string; items: Fact[] }> = [
  {
    y: '2026',
    items: [
      {
        text: '“Munozara” intellektual turnirining respublika bosqiçida uçala sovrinli örinni Toşkent jamoalari egalladi: TIQXMMI MTU “Elita”, ÖzMU “Taraqqiyot yoşlari”, TDYU “Yuristlar”.',
        post: 6230,
      },
      {
        text: 'Kengaş qamrovidagi 98 ta oliy taʼlim taşkiloti 9 ta hududiy guruhga birlaştirilib, “Hududiy koordinatorlar instituti” modeli joriy etildi.',
        post: 6833,
      },
      {
        text: 'Toşkent şahridagi oliy taʼlim taşkilotlarining 70 dan ortiq yoşlar yetakçisi “Oliy taʼlim yetakçilarining forumi”da iştirok etdi.',
        post: 6890,
      },
      {
        text: 'TDŞU boşlanğiç taşkiloti taşkil etgan “Zakovat QUIZ”da 150 ga yaqin jamoa, 700 nafardan ortiq 1-kurs talabasi qatnaşdi.',
        post: 6758,
      },
    ],
  },
  {
    y: '2025',
    items: [
      {
        text: '250 ta loyiha va tadbir ötkazilib, 261 ming yoş qamrab olindi; 19 ta taşkilot bilan hamkorlik yölga qöyildi.',
        post: 5055,
      },
      {
        text: '“Munozara” intellektual debat turnirining respublika bosqiçida Toşkent davlat iqtisodiyot universiteti jamoasi 1-örinni egalladi.',
        post: 5055,
      },
      {
        text: '“Kitob olami” festivalida 2 kun davomida 8 000 nafardan ortiq yoş iştirok etdi, 20 ga yaqin naşriyot taqdirlandi.',
        post: 4684,
      },
    ],
  },
  {
    y: '2024',
    items: [
      {
        text: '“Universe” volontyorlar maktabiga 1 287 nafar nomzod orasidan 4 bosqiçli imtihon orqali 37 nafar rasmiy iştirokçi saralandi.',
        post: 1533,
      },
      {
        text: '“Toşkent talabalar assotsiatsiyasi”ning birinçi taʼsis yiğilişida 550 nafar delegat iştirok etdi.',
        post: 2187,
      },
    ],
  },
  {
    y: '2023',
    items: [
      {
        text: 'Faol aʼzo bölgan 387 nafar talabaga kontrakt summasining 35 foizi — 1 mlrd 497 mln 762 ming söm miqdoridagi sertifikat topşirildi.',
        post: 170,
      },
      {
        text: '“Poytaxt sardorlari forumi”da 300 nafar maktab sardorlar kengaşlari aʼzosi iştirok etdi.',
        post: 430,
      },
    ],
  },
]
