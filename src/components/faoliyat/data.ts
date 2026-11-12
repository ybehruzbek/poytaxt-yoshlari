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
    title: 'Maʼnaviy-maʼrifiy işlar va kitobxonlik',
    lead: 'Kitobxonlikni tarğib qiliş, adabiy uçraşuvlar va maʼnaviy tadbirlar.',
    about:
      'Yönaliş yoşlarda kitobxonlik madaniyatini, milliy qadriyatlar va tarixiy xotiraga hurmatni şakllantirişga qaratilgan. Tadbirlar Yoşlar ijod saroyi, oliy taʼlim taşkilotlari va harbiy qismlarda ötkaziladi.',
    works: [
      'Kitoblar festivali va kitob yarmarkalari',
      'Badiiy asarlar muhokamasiga bağişlangan davra suhbatlari, adabiy-musiqiy keçalar',
      'Rahbarlar, faxriylar va yoşlarning oçiq muloqotlari',
      'Allomalar va adiblar tavalludiga bağişlangan maʼnaviyat tadbirlari',
    ],
  },
  {
    slug: 'intellektual',
    title: 'Intellektual rivojlaniş',
    lead: '“Zakovat”, “Munozara” debatlari va intellektual tanlovlar.',
    about:
      'Yönaliş yoşlarning tahliliy fikrlaşi, bilimi va jamoada işlaş könikmasini rivojlantiradi. Şahar bosqiçlari ğoliblari respublika bosqiçlarida Toşkent şahri nomidan qatnaşadi.',
    works: [
      'Intellektual öyinlar va viktorinalar',
      'Jamoaviy debat turnirlarining şahar bosqiçlari',
      'Yoş harbiylar örtasida kitoblar asosidagi intellektual tanlov',
      'Talabalar uçun BMT modeli konferensiyalari',
      'Intellektual loyihalar koordinatorlari uçun öquv-seminarlar',
    ],
  },
  {
    slug: 'harbiy-vatanparvarlik',
    title: 'Harbiy-vatanparvarlik tarbiyasi',
    lead: 'Harbiy qismlar va muassasalardagi yoşlar bilan işlaş, harbiy-sport musobaqalari.',
    about:
      'Yönaliş yoşlarda Vatanga sadoqat, jismoniy çiniqqanlik va harbiy xizmatga hurmatni tarbiyalaydi. Tadbirlar kuç tuzilmalari, harbiy qismlar va muassasalar bilan hamkorlikda ötkaziladi.',
    works: [
      'Harbiy qismda ön kunlik harbiy-vatanparvarlik öquv yiğini',
      'Harbiy qismlarda oçiq eşiklar kunlari va uçraşuvlar',
      'Harbiy-sport musobaqalari va kursantlar örtasidagi bellaşuvlar',
      'Yoş harbiylar forumi, vatanparvarlik böyiça konferensiya va seminarlar',
    ],
  },
  {
    slug: 'volontyorlik',
    title: 'Volontyorlik va xayriya',
    lead: 'Volontyorlar maktabi va xayriya aksiyalari.',
    about:
      'Yönaliş yoşlarni ijtimoiy faollikka va yordamga muhtojlarga ğamxörlik qilişga jalb etadi, volontyorlarni tizimli öqitadi.',
    works: [
      'Volontyorlar maktabi: loyiha boşqaruvi va volontyorlik böyiça nazariy va amaliy darslar',
      'Bolalar hospisi, maktab-internat va onkologiya markazida xayriya aksiyalari',
      'Sardorlar uçun volontyorlik böyiça seminar-treninglar',
    ],
  },
  {
    slug: 'sport-salomatlik',
    title: 'Sport va soğlom turmuş tarzi',
    lead: 'OTT talabalari örtasida sport musobaqalari, festivallar va marafonlar.',
    about:
      'Yönaliş talabalar örtasida jismoniy faollik va soğlom turmuş tarzini tarğib qiladi. Musobaqalar OTT boşlanğiç taşkilotlari örtasida ötkaziladi.',
    works: [
      'Mini futbol, stol tennisi va şaxmat böyiça musobaqalar',
      'OTTlar örtasidagi örtoqlik bellaşuvlari',
      'Talabalar sport festivallari',
      'Yuriş marafonlari',
    ],
  },
  {
    slug: 'yetakchilik',
    title: 'Yetakçilik va boşlanğiç taşkilotlar',
    lead: 'Oliy taʼlim taşkilotlaridagi yoşlar yetakçilari tizimini rivojlantiriş.',
    about:
      'Yönaliş Kengaş qamrovidagi oliy taʼlim taşkilotlarida boşlanğiç taşkilotlar va yoşlar yetakçilari tizimini rivojlantiradi: yetakçilarni saralaş, öqitiş, faoliyatini baholaş va rağbatlantiriş.',
    works: [
      'Yoşlar yetakçilari uçun muntazam öquv-seminarlar',
      'Boşlanğiç taşkilotlarda hisobot-saylov yiğilişlari',
      'Yetakçilar forumlari va umumiy yiğilişlar',
      'Eng ilğor yetakçilar körik-tanlovi va taqdirlaş',
    ],
  },
  {
    slug: 'huquqiy-madaniyat',
    title: 'Huquqiy madaniyat va profilaktika',
    lead: 'Huquqiy savodxonlik, giyohvandlik va korrupsiyaning oldini oliş.',
    about:
      'Yönaliş yoşlarning huquqiy savodxonligini oşiriş hamda huquqbuzarlik, giyohvandlik va korrupsiyaning oldini olişga qaratilgan.',
    works: [
      'Saylov qonunçiligini tuşuntiriş böyiça davra suhbatlari',
      'Giyohvandlik va korrupsiyaning oldini oliş böyiça profilaktik tadbirlar',
      'Soxta axborotga qarşi immunitet mavzusidagi uçraşuvlar',
      'Talabalar bilan huquqiy mavzularda oçiq muloqotlar',
    ],
  },
  {
    slug: 'ekologiya',
    title: 'Ekologiya',
    lead: 'Ekologik aksiyalar, köçat ekiş va suvni tejaş çellenji.',
    about:
      'Yönaliş yoşlarda ekologik madaniyatni şakllantiriş va ularni atrof-muhitni asraş işlariga amaliy jalb etişga qaratilgan.',
    works: [
      'Çiqindilarni yiğiş aksiyalari (plogging)',
      'Daraxt va köçat ekiş',
      'Suvni tejaşga daʼvat qiluvçi çellenj va tarğibot aksiyalari',
      'Ekologik kvest musobaqalari',
    ],
  },
  {
    slug: 'media',
    title: 'Media va axborot',
    lead: 'Filmlar, körsatuvlar, podkastlar va kanaldagi rubrikalar.',
    about:
      'Yönaliş Kengaş faoliyati va yoşlar hayotini media mahsulotlari orqali yoritadi, yoşlarning mediasavodxonligini oşiradi.',
    works: [
      'Motivatsion filmlar va instaserial',
      'Maxsus telekörsatuv va kanaldagi axborot rubrikalari',
      'Mediasavodxonlik böyiça seminar-treninglar',
      'Bayram sanalariga bağişlangan videoroliklar tanlovlari',
    ],
  },
  {
    slug: 'ijod-turizm',
    title: 'Ijod, madaniyat va turizm',
    lead: 'Festivallar, ijodiy tanlovlar va yoşlar sayohatlari.',
    about:
      'Yönaliş yoşlarning ijodiy salohiyatini röyobga çiqariş, milliy madaniyatni tarğib qiliş, mazmunli dam oliş va sayohatlarni taşkil etişga qaratilgan.',
    works: [
      'Milliylikni tarğib qiluvçi talabalar festivallari',
      'Milliy liboslar va yoş dizaynerlar ijodi namoyişlari',
      'Yoşlar uçun içki sayohatlar',
      'Konsert dasturlari va ijodiy keçalar',
    ],
  },
  {
    slug: 'talim-kasb',
    title: 'Taʼlim va kasbiy rivojlaniş',
    lead: 'Til kurslari, biznes va IELTS marafonlari, xalqaro öquv dasturlari.',
    about:
      'Yönaliş yoşlarning bilim, til va kasbiy könikmalarini oşiriş, tadbirkorlikka qiziqtiriş hamda taʼlim olişdagi imtiyozlardan foydalaniş imkoniyatlarini kengaytirişga qaratilgan.',
    works: [
      'Tadbirkorlik va xorijiy tillar böyiça marafonlar, bepul til kurslari',
      'Liderlik treninglari va yozgi öquv lagerlari',
      'Talabalar ilmiy-amaliy konferensiyalari',
      'OTTga imtiyozli qabul tavsiyanomalari tanlovi',
    ],
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
