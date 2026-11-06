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

export type Privilege = { t: string; text: string; fact: string; img: string; badge?: boolean }

export const PRIVILEGES: Privilege[] = [
  {
    t: '«Özbekiston belgisi» kökrak nişoni',
    text: 'Prezidentning 2003-yil 4-avgustdagi PF-3290-son Farmoniga asosan Vatan şaʼnini yuksaltirişga xizmat qilayotgan faol yoşlar taqdirlanadi.',
    fact: '2003-yildan buyon 1 198 nafar yoş taqdirlangan',
    img: '/img/ittifoq/belgi.png',
    badge: true,
  },
  {
    t: 'Tavsiyanoma beriş',
    text: 'Vazirlar Mahkamasining 914-son qaroriga asosan ittifoqning faol aʼzolariga oliy taʼlim muassasalariga imtiyozli qabul qiliş böyiça tavsiyanoma beriladi.',
    fact: 'Har bir hududdan 1 nafardan',
    img: '/img/ittifoq/kitobxonlar.jpg',
  },
  {
    t: 'Yoşlarga kafillik',
    text: '2017-yil 5-dekabrda Oliy sud bilan imzolangan memorandumga asosan jinoyat köçasiga adaşib kirgan yoşlar uçun kafillik xatlari beriladi.',
    fact: 'Yoşlar sud zalidan ozod etilmoqda',
    img: '/img/ittifoq/seminar.jpg',
  },
  {
    t: 'Kontrakt tölovi',
    text: 'PQ-213-son qarorga muvofiq muddatli harbiy xizmatni tugatgan talabalarning kontrakt tölovi qoplab beriladi.',
    fact: '2018–2024-yillarda 17 009 talabaga 53,77 mlrd söm',
    img: '/img/ittifoq/harbiy.jpg',
  },
]

export type Direction = { t: string; p: string[]; logo: string }

export const PROJECTS: Direction[] = [
  { t: 'Qadriyat', p: ['Milliy Fashion Show', 'Kitob olami festivali'], logo: '/img/loyihalar/qadriyat.png' },
  { t: 'Taʼlim', p: ['Yetakçilar forumi', 'Ittifoq Quiz', 'Talaba fest', 'Munozara'], logo: '/img/loyihalar/talim.png' },
  { t: 'Ekologiya', p: ['Suvni birgalikda asraymiz!', 'Bir talaba — on köçat'], logo: '/img/loyihalar/ekologiya.png' },
  { t: 'Bandlik', p: ['Qaytiş'], logo: '/img/loyihalar/bandlik.png' },
  { t: 'Sunʼiy intellekt', p: ['AI Yoşlar ittifoqi'], logo: '/img/loyihalar/ai.png' },
  { t: 'Vatanparvarlik', p: ['Ajdodlar izidan', 'Vatanparvarlar', 'Universal'], logo: '/img/loyihalar/vatanparvarlik.png' },
  { t: 'Maʼrifat qalqoni', p: ['Qalqon jamoatçilik guruhi'], logo: '/img/loyihalar/qalqon.png' },
  { t: 'Xalqaro hamdöstlik', p: ['Yoş diplomatlar', 'Turkiy dunyo yoşlar harakati', 'Milliy dialog'], logo: '/img/loyihalar/xalqaro.png' },
  { t: 'Ijtimoiy fikr', p: ['TEDx Ittifoq', 'Talaba kundaligi'], logo: '/img/loyihalar/ijtimoiy.png' },
  { t: 'Sport', p: ['Ittifoq billur kubogi'], logo: '/img/loyihalar/sport.png' },
]

export const INTL = {
  text: 'Ittifoq xalqaro va çet eldagi mahalliy yoşlar taşkilotlari bilan faol hamkorlik qiladi: forumlar va sammitlar, amaliyot va almaşinuv dasturlari, uçraşuv va konferensiyalar.',
  assoc: 'Ittifoq qoşida Özbekiston yoşlar umumjahon assotsiatsiyasi taşkil etilgan — u xorijda öqiyotgan va işlayotgan özbekistonlik yoşlarni qöllab-quvvatlaydi.',
  facts: [
    { v: '20+', l: 'hamkor mamlakat' },
    { v: '25', l: 'davlatda assotsiatsiya vakillari' },
    { v: '100 000', l: 'yoş xalqaro loyihalarda' },
  ] as Stat[],
  forms: ['Hamkorlikda forumlar va sammitlar', 'Amaliyot va almaşinuv dasturlari', 'Uçraşuv va konferensiyalar'],
  projects: ['Milliy dialog', 'Yoş diplomatlar', 'Turkiy dunyo yoşlar harakati', 'BMT modeli', 'Isteʼdodli yoşlar', 'Taʼlim Expo', 'TDT modeli', 'Xorijdagi vatandoşlar biznes marafoni'],
  partners: '/img/ittifoq/hamkorlar.png',
  flags: '/img/ittifoq/bayroqlar.png',
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

/* ---------------- Yoşlar markazlari ---------------- */

export const PALACE = {
  name: 'Yoşlar ijod saroyi',
  org: 'Özbekiston yoşlar ittifoqi',
  text: 'Poytaxtdagi yoşlar uçun oçiq ijod maskani. Saroyda xalqimizning sanʼat sohasidagi bebaho merosini namoyiş qiliş, uning milliy va umumbaşariy madaniyat taraqqiyotidagi örnini keng tarğib qiliş uçun körgazmalar taşkil etiladi.',
  features: ['«Kitoblar olami» kitobxonlik maydoni', 'Podkast studiyasi', 'Kovorking va uçraşuv xonalari', 'Körgazmalar va ijodiy tadbirlar'],
  img: '/img/markazlar/ijod-saroyi.jpg',
  gallery: ['/img/markazlar/ijod-kitoblar-olami.jpg', '/img/markazlar/ijod-podkast.jpg', '/img/markazlar/ijod-davr-bizniki.jpg'],
}

/* Toşkent şahar markazi: matn NAMUNA — manzil, ish vaqti va rasmiy tavsif kelgaçi almaştiriladi */
export const CITY_CENTRE = {
  name: 'Toşkent şahar Yoşlar markazi',
  text: 'Poytaxt yoşlarining asosiy uçraşuv maydoni: tadbirlar, tögaraklar, uçraşuvlar va yoşlar taşabbuslari şu yerda boşlanadi.',
  facts: ['Tadbir va uçraşuvlar zali', 'Tögaraklar va örganiş xonalari', 'Yoşlar taşabbuslarini qöllab-quvvatlaş'],
  img: '/img/markazlar/toshkent-shahar.jpg',
}

export type Centre = { region: string; img: string }

/** Toşkent şahri birinçi, keyin viloyatlar */
export const CENTRES: Centre[] = [
  { region: 'Toşkent şahri', img: '/img/markazlar/toshkent-shahar.jpg' },
  { region: 'Toşkent viloyati', img: '/img/markazlar/toshkent-viloyati.jpg' },
  { region: 'Qoraqalpoğiston Respublikasi', img: '/img/markazlar/qoraqalpogiston.jpg' },
  { region: 'Andijon viloyati', img: '/img/markazlar/andijon.jpg' },
  { region: 'Buxoro viloyati', img: '/img/markazlar/buxoro.jpg' },
  { region: 'Jizzax viloyati', img: '/img/markazlar/jizzax.jpg' },
  { region: 'Qaşqadaryo viloyati', img: '/img/markazlar/qashqadaryo.jpg' },
  { region: 'Navoiy viloyati', img: '/img/markazlar/navoiy.jpg' },
  { region: 'Namangan viloyati', img: '/img/markazlar/namangan.jpg' },
  { region: 'Samarqand viloyati', img: '/img/markazlar/samarqand.jpg' },
  { region: 'Sirdaryo viloyati', img: '/img/markazlar/sirdaryo.jpg' },
  { region: 'Surxondaryo viloyati', img: '/img/markazlar/surxondaryo.jpg' },
  { region: 'Farğona viloyati', img: '/img/markazlar/fargona.jpg' },
  { region: 'Xorazm viloyati', img: '/img/markazlar/xorazm.jpg' },
]
