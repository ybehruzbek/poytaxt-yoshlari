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
    body: 'Kengaş Yoşlar ijod saroyida adabiy davra suhbatlari, kitob festivallari va ijodkorlar bilan uçraşuvlar taşkil etadi. Oliy taʼlim taşkilotlaridagi boşlanğiç taşkilotlar bilan birga kitobxonlik tanlovlari ötkaziladi.',
    projects: [],
  },
  {
    slug: 'intellektual',
    title: 'Intellektual rivojlaniş',
    lead: '“Zakovat”, “Munozara” debatlari va intellektual tanlovlar.',
    body: 'Intellektual öyinlar va debat turnirlari yoşlarning mantiqiy fikrlaşi va nutq madaniyatini rivojlantiradi. Kengaş şahar bosqiçlarini taşkil etadi, ğolib jamoalar respublika bosqiçida poytaxt şarafini himoya qiladi.',
    projects: [],
  },
  {
    slug: 'harbiy-vatanparvarlik',
    title: 'Harbiy-vatanparvarlik tarbiyasi',
    lead: 'Harbiy qismlar va muassasalardagi yoşlar bilan işlaş, harbiy-sport musobaqalari.',
    body: 'Kengaş qudratli tuzilmalar bilan hamkorlikda yoş harbiylar uçun intellektual öyinlar, harbiy-sport musobaqalari, “Jasorat maktabi” öquv yiğinlari va uçraşuvlar ötkazadi.',
    projects: [],
  },
  {
    slug: 'volontyorlik',
    title: 'Volontyorlik va xayriya',
    lead: 'Köngillilar maktabi, xayriya aksiyalari va qutqaruvçi klublar.',
    body: 'Yoşlarni köngillilik faoliyatiga jalb qiliş, xayriya aksiyalari va köngillilar klublari musobaqalari Kengaşning doimiy yönalişlaridan biri.',
    projects: [],
  },
  {
    slug: 'sport-salomatlik',
    title: 'Sport va soğlom turmuş tarzi',
    lead: 'Talabalar va yoş harbiylar örtasida sport musobaqalari va marafonlar.',
    body: 'Oliy taʼlim taşkilotlari va harbiy qismlar örtasida futbol, şaxmat, kibersport va boşqa sport turlari böyiça musobaqalar, soğlom turmuş tarzini tarğib qiluvçi marafonlar ötkaziladi.',
    projects: [],
  },
  {
    slug: 'yetakchilik',
    title: 'Yetakçilik va boşlanğiç taşkilotlar',
    lead: 'Oliy taʼlim taşkilotlaridagi yoşlar yetakçilari tizimini rivojlantiriş.',
    body: 'Kengaş qamrovida 98 ta oliy taʼlim taşkiloti bor. Ulardagi boşlanğiç taşkilotlarda hisobot-saylov yiğilişlari ötkaziladi, yetakçilar uçun öquv seminarlari va forumlar taşkil etiladi.',
    projects: [],
  },
  {
    slug: 'huquqiy-madaniyat',
    title: 'Huquqiy madaniyat va profilaktika',
    lead: 'Huquqiy savodxonlik, yöl harakati xavfsizligi va zararli illatlarning oldini oliş.',
    body: 'Davra suhbatlari, tarğibot loyihalari va media mahsulotlar orqali yoşlarning huquqiy madaniyatini oşiriş, giyohvandlik, yöl-transport hodisalari va soxta axborotlarning oldini oliş işlari olib boriladi.',
    projects: [],
  },
  {
    slug: 'ekologiya',
    title: 'Ekologiya',
    lead: 'Ekologik aksiyalar, köçat ekiş va suvni tejaş çellenjlari.',
    body: 'Yoşlar ekologik aksiyalar, köçat ekiş tadbirlari va suvni tejaşga qaratilgan çellenjlar orqali atrof-muhitni asraşga jalb qilinadi.',
    projects: [],
  },
  {
    slug: 'media',
    title: 'Media va axborot',
    lead: 'Filmlar, körsatuvlar, podkastlar va kanaldagi rubrikalar.',
    body: 'Kengaş yoşlar hayotini yorituvçi motivatsion filmlar, maxsus körsatuvlar, podkastlar va “Poytaxt yoşlari” kanalidagi doimiy rubrikalarni tayyorlaydi.',
    projects: [],
  },
  {
    slug: 'ijod-turizm',
    title: 'Ijod, madaniyat va turizm',
    lead: 'Festivallar, ijodiy tanlovlar va yoşlar sayohatlari.',
    body: 'Festivallar, moda va videorolik tanlovlari, ijodiy kreçlar hamda içki va taşqi sayohatlar yoşlarning ijodiy salohiyatini oşirişga xizmat qiladi.',
    projects: [],
  },
  {
    slug: 'talim-kasb',
    title: 'Taʼlim va kasbiy rivojlaniş',
    lead: 'Til kurslari, biznes va IELTS marafonlari, xalqaro öquv dasturlari.',
    body: 'Bepul til kurslari, biznes va tayyorlov marafonlari, konferensiyalar va xalqaro öquv dasturlari orqali yoşlarning bilim va kasbiy könikmalari rivojlantiriladi.',
    projects: [],
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
        text: '“Kitob olami” festivalida 2 kun davomida 8000 nafardan ortiq yoş iştirok etdi, 20 ga yaqin naşriyot taqdirlandi.',
        post: 4684,
      },
    ],
  },
  {
    y: '2024',
    items: [
      {
        text: '“Universe” volontyorlar maktabiga 1287 nafar nomzod orasidan 4 bosqiçli imtihon orqali 37 nafar rasmiy iştirokçi saralandi.',
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
