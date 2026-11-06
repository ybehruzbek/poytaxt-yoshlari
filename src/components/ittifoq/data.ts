/**
 * "Özbekiston yoşlar ittifoqi" sahifasi mazmuni.
 * Manba: "Özbekiston yoşlar ittifoqining faoliyati töğrisida" taqdimoti (2026).
 * Keyinçalik admin paneldan (Payload) boşqariladi.
 */

export const INTRO =
  'Özbekiston yoşlar ittifoqi 2017-yil 30-iyunda Özbekiston Respublikasi Prezidenti taşabbusi bilan taşkil etilgan, mamlakat yoşlarini birlaştiruvçi nodavlat notijorat taşkilotidir.'

export const MISSION = {
  lead: 'Jismonan soğlom, maʼnan yetuk va intellektual rivojlangan, mustaqil fikrlaydigan yoş avlodni şakllantiriş',
  rest: ' — yoşlarni taşqi tahdidlar va «ommaviy madaniyat»ning zararli taʼsiridan himoya qiliş, ularning huquq va qonuniy manfaatlarini himoya qilişga kömaklaşiş.',
}

export const QUOTE = {
  text: 'Yoşlik — ğanimat, vaqt — ğanimat, fursat borida otni qamçilang! Davlatimiz, xalqimiz yaratib berayotgan imkoniyatlarning qadriga yeting! Dunyoga öz sözingizni ayting!',
  author: 'Şavkat Mirziyoyev',
  role: 'Özbekiston Respublikasi Prezidenti',
}

export type Stat = { v: string; l: string }

export const STATS: Stat[] = [
  { v: '59 974', l: 'yoşlar yetakçilari va koordinatorlari' },
  { v: '1 489', l: 'taʼlim muassasalari va korxonalardagi boşlanğiç taşkilotlar' },
  { v: '14', l: 'hududda Yoşlar markazi doimiy faoliyat yuritadi' },
  { v: '20+', l: 'mamlakat bilan xalqaro hamkorlik' },
]

export const MORE_STATS: Stat[] = [
  { v: '12 273', l: 'maʼnaviy-maʼrifiy, sport va boşqa tadbirlar' },
  { v: '1,87 mln', l: 'yoş loyihalarga qamrab olindi' },
  { v: '81 198', l: 'yoş harbiy xizmatçi kuç tuzilmalaridagi taşkilotlarda' },
  { v: '36', l: 'taşkilot ittifoq tizimida faoliyat yuritadi' },
]

export type Goal = { t: string; items: [string, string]; c: string }

export const GOALS: Goal[] = [
  {
    t: 'Taʼlim va kasb-hunarga yönaltiriş',
    items: ['Kasb-hunar örganiş va zamonaviy bilimlarni özlaştirişga imkoniyat yaratiş', 'Innovatsion loyihalar va startaplarni qöllab-quvvatlaş'],
    c: 'var(--yellow)',
  },
  {
    t: 'Ijtimoiy taşabbus va volontyorlik',
    items: ['Volontyorlik faoliyatini kengaytiriş va rivojlantiriş', 'Jamiyatdagi muammolarni hal etişda yoşlarning iştirokini oşiriş'],
    c: 'var(--green)',
  },
  {
    t: 'Yoşlarning huquq va manfaatlarini himoya qiliş',
    items: ['Yoşlarni iş bilan taʼminlaş, yoş mutaxassislarning mehnat huquqlarini himoya qiliş', 'Qiyin şaroitdagi, nogironligi bölgan va ehtiyojmand oilalar farzandlarini qöllab-quvvatlaş'],
    c: 'var(--blue)',
  },
  {
    t: 'Innovatsiya va texnologiyalar',
    items: ['Yoşlarni raqamli texnologiyalar va IT sohasida bilim olişga rağbatlantiriş', 'Texnoparklar va ilmiy laboratoriyalar bilan hamkorlik qiliş'],
    c: 'var(--sky)',
  },
  {
    t: 'Soğlom turmuş tarzi va sport',
    items: ['Sport tadbirlari va musobaqalarni taşkil qiliş', 'Zararkundalikka (giyohvandlik, tamaki, alkogol) qarşi profilaktika işlari'],
    c: 'var(--lime)',
  },
  {
    t: 'Xalqaro yoşlar taşkilotlari bilan hamkorlik',
    items: ['Çet eldagi yoşlar bilan hamkorlikni rivojlantiriş', 'Xalqaro almaşinuv dasturlari va forumlarda iştirok etiş'],
    c: 'var(--silver)',
  },
]

export type Privilege = { t: string; text: string; fact: string }

export const PRIVILEGES: Privilege[] = [
  {
    t: '«Özbekiston belgisi» kökrak nişoni',
    text: 'Prezidentning 2003-yil 4-avgustdagi PF-3290-son Farmoniga asosan Vatan şaʼnini yuksaltirişga xizmat qilayotgan faol yoşlar taqdirlanadi.',
    fact: '2003-yildan buyon 1 198 nafar yoş taqdirlangan',
  },
  {
    t: 'Tavsiyanoma beriş',
    text: 'Vazirlar Mahkamasining 914-son qaroriga asosan ittifoqning faol aʼzolariga oliy taʼlim muassasalariga imtiyozli qabul qiliş böyiça tavsiyanoma beriladi.',
    fact: 'Har bir hududdan 1 nafardan',
  },
  {
    t: 'Yoşlarga kafillik',
    text: '2017-yil 5-dekabrda Oliy sud bilan imzolangan memorandumga asosan jinoyat köçasiga adaşib kirgan yoşlar uçun kafillik xatlari beriladi.',
    fact: 'Yoşlar sud zalidan ozod etilmoqda',
  },
  {
    t: 'Kontrakt töʼlovi',
    text: 'PQ-213-son qarorga muvofiq muddatli harbiy xizmatni tugatgan talabalarning kontrakt töʼlovi qoplab beriladi.',
    fact: '2018–2024-yillarda 17 009 talabaga 53,77 mlrd söm',
  },
]

export type Direction = { t: string; p: string[] }

export const PROJECTS: Direction[] = [
  { t: 'Qadriyat', p: ['Milliy Fashion Show', 'Kitob olami festivali'] },
  { t: 'Taʼlim', p: ['Yetakçilar forumi', 'Ittifoq Quiz', 'Talaba fest', 'Munozara'] },
  { t: 'Ekologiya', p: ['Suvni birgalikda asraymiz!', 'Bir talaba — on köçat'] },
  { t: 'Bandlik', p: ['Qaytiş'] },
  { t: 'Sunʼiy intellekt', p: ['AI Yoşlar ittifoqi'] },
  { t: 'Vatanparvarlik', p: ['Ajdodlar izidan', 'Vatanparvarlar', 'Universal'] },
  { t: 'Maʼrifat qalqoni', p: ['Qalqon jamoatçilik guruhi'] },
  { t: 'Xalqaro hamdöstlik', p: ['Yoş diplomatlar', 'Turkiy dunyo yoşlar harakati', 'Milliy dialog'] },
  { t: 'Ijtimoiy fikr', p: ['TEDx Ittifoq', 'Talaba kundaligi'] },
  { t: 'Sport', p: ['Ittifoq billur kubogi'] },
]

export const INTL = {
  text: 'Ittifoq xalqaro va çet eldagi mahalliy yoşlar taşkilotlari bilan faol hamkorlik qiladi: forumlar va sammitlar, amaliyot va almaşinuv dasturlari, uçraşuv va konferensiyalar.',
  assoc: 'Ittifoq qoşida Özbekiston yoşlar umumjahon assotsiatsiyasi taşkil etilgan — u xorijda öqiyotgan va işlayotgan özbekistonlik yoşlarni qöllab-quvvatlaydi.',
  facts: [
    { v: '20+', l: 'hamkor mamlakat' },
    { v: '25', l: 'davlatda assotsiatsiya vakillari' },
    { v: '100 000', l: 'yoş xalqaro loyihalarda' },
  ] as Stat[],
}

export const IMG = {
  team: '/img/ittifoq/jamoa-prezident.jpg',
  leaders: '/img/ittifoq/yetakchilar.jpg',
  seminar: '/img/ittifoq/seminar.jpg',
  girls: '/img/ittifoq/kitob-qizlar.jpg',
  readers: '/img/ittifoq/kitobxonlar.jpg',
  books: '/img/ittifoq/kitoblar-olami.jpg',
  volunteers: '/img/ittifoq/volontyorlar.jpg',
}
