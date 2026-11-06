/**
 * "Özbekiston yoşlar ittifoqi" sahifasi mazmuni.
 * Manba: "Özbekiston yoşlar ittifoqining faoliyati töğrisida" taqdimoti (2026).
 * Keyinçalik admin paneldan (Payload) boşqariladi.
 */

/** Sahifa boşidagi qisqa matn */
export const INTRO =
  'Mamlakat yoşlarini birlaştiruvçi eng katta taşkilot. Biz yoşlarning ovozini eşitamiz, ğoyalarini qöllab-quvvatlaymiz va ularni real natijaga aylantirişga yordam beramiz.'

/** Biz kimmiz */
export const WHO = {
  paras: [
    'Özbekiston yoşlar ittifoqi — mamlakat yoşlarini birlaştiruvçi nodavlat notijorat taşkilot. U 2017-yil 30-iyunda taşkil etilgan. Şu kun har yili butun mamlakatda «Yoşlar kuni» sifatida nişonlanadi.',
    'Ittifoqqa 14 yoşdan 30 yoşgaça bölgan har bir yigit-qiz öz xohişi bilan aʼzo bölişi mumkin. Bizda heç kim majburlab yozilmaydi: kimdir sport bilan, kimdir ilm bilan, kimdir volontyorlik yoki öz biznesi bilan keladi. Barçamizni bitta maqsad birlaştiradi — özimiz va yurtimiz uçun foydali iş qiliş.',
  ],
  motto: 'Yoşlar — kelajak bunyodkori',
}

/** Maqsadimiz (katta sarlavha) */
export const MISSION = {
  lead: 'Biz yoşlar öz kuçiga işonadigan, bilim va kasb egallaydigan, öz örnini topadigan va mamlakat hayotida faol qatnaşadigan muhit yaratamiz.',
  rest: ' Sizda ğoya bölsa — biz uni amalga oşirişga yordam beramiz. Sizga yordam kerak bölsa — biz yoningizdamiz.',
  charter:
    'Ustavimizda bu şunday yozilgan: Ittifoqning maqsadi — yigit-qizlarning huquq va manfaatlarini himoya qiliş, ularning maʼnaviy va kasbiy saviyasini oşiriş, intellektual va ijodiy salohiyatini röyobga çiqarişga kömaklaşiş, yoşlarni mamlakatdagi islohotlarga va Özbekistonning rivojiga faol jalb qiliş.',
}

export type Milestone = { y: string; t: string }

/** Qisqa tarix */
export const HISTORY: Milestone[] = [
  { y: '2001', t: '«Kamolot» yoşlar ijtimoiy harakati taşkil etildi. U ön olti yil davomida yoşlar bilan işlab, katta tajriba töpladi.' },
  { y: '30.06.2017', t: 'Toşkentdagi Simpoziumlar saroyida «Kamolot»ning IV qurultoyi bölib ötdi. Delegatlar uning negizida yangi taşkilot — Özbekiston yoşlar ittifoqini tuziş taklifini qöllab-quvvatladi.' },
  { y: '05.07.2017', t: 'Prezidentning PF-5106-son Farmoni qabul qilindi: Ittifoqning ustuvor yönalişlari belgilandi, 30-iyun «Yoşlar kuni» deb eʼlon qilindi.' },
  { y: 'Bugun', t: 'Ittifoq «Kamolot»ning huquqiy vorisi sifatida butun mamlakat böylab işlaydi: Qoraqalpoğiston Respublikasi, barça viloyatlar va Toşkent şahrida hududiy kengaşlari, taʼlim muassasalari, korxonalar va harbiy qismlarda boşlanğiç taşkilotlari bor.' },
]

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

export type Goal = { t: string; d: string; c: string }

/** Nima qilamiz */
export const GOALS: Goal[] = [
  { t: 'Taʼlim va kasb', d: 'Yoşlarga zamonaviy kasb egallaş, yangi bilim oliş va öz yölini topişda yordam beramiz. Innovatsion loyihalar va startaplarni qöllab-quvvatlaymiz.', c: 'var(--yellow)' },
  { t: 'Iş va tadbirkorlik', d: 'Yoşlarning bandligi, öz işini boşlaşi va tadbirkorlik qobiliyatini rivojlantiriş uçun imkoniyatlar yaratamiz.', c: 'var(--green)' },
  { t: 'Huquq va manfaatlarni himoya qiliş', d: 'Yoşlarning huquqlarini himoya qilamiz. Qiyin vaziyatga tuşgan, nogironligi bölgan va ehtiyojmand oilalardagi yoşlarni alohida qöllab-quvvatlaymiz.', c: 'var(--blue)' },
  { t: 'Isteʼdod va ilm', d: 'Isteʼdodli yoşlarni izlab topamiz, ularning ijodiy va ilmiy salohiyatini oçişga şaroit yaratamiz.', c: 'var(--sky)' },
  { t: 'Sport va soğlom turmuş', d: 'Sport musobaqalari va tadbirlar ötkazamiz, yoşlarni muntazam sport bilan şuğullanişga çorlaymiz. Giyohvandlik, çekiş va içkilikka qarşi profilaktika işlarini olib boramiz.', c: 'var(--lime)' },
  { t: 'Kitobxonlik va maʼnaviyat', d: 'Kitob öqişni, milliy qadriyatlarni va vatanparvarlikni tarğib qilamiz. Yoşlarni zararli ğoyalar va «ommaviy madaniyat»ning salbiy taʼsiridan asraymiz.', c: 'var(--yellow)' },
  { t: 'Volontyorlik va taşabbuslar', d: 'Jamiyatdagi muammolarni hal etişda yoşlarning özi taşabbus körsatişi uçun volontyorlik harakatini kengaytiramiz.', c: 'var(--green)' },
  { t: 'Raqamli texnologiyalar', d: 'Yoşlarni IT va raqamli texnologiyalarni örganişga undaymiz, texnoparklar va ilmiy laboratoriyalar bilan hamkorlik qilamiz.', c: 'var(--blue)' },
  { t: 'Xalqaro hamkorlik', d: 'Xorijiy yoşlar taşkilotlari bilan hamkorlik qilamiz, almaşinuv dasturlari va xalqaro forumlarda iştirok etamiz. Çet elda öqiyotgan va işlayotgan yurtdoşlarimizni qöllab-quvvatlaymiz.', c: 'var(--sky)' },
  { t: 'Yoş yetakçilar', d: 'Bilimli, taşabbuskor va halol yoş yetakçilarni tarbiyalaymiz. Ittifoq yoşlar uçun «ijtimoiy lift» — faol yigit-qizlarning ösişi va jamiyatga xizmat qilişi uçun yöl oçadi.', c: 'var(--lime)' },
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
    t: 'Ikkinçi imkoniyat',
    text: 'Oliy sud bilan imzolangan memorandum asosida adaşib qolgan yoşlarga Ittifoq kafillik xatini beradi — bu ularga töğri yölga qaytiş imkonini beradi.',
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

/* ---------------- Tuzilma, aʼzolik, rasmiy maʼlumotlar ---------------- */

export type Organ = { t: string; d: string }

/** Qanday tuzilganmiz */
export const STRUCTURE = {
  lead: 'Ittifoq demokratik tamoyillar asosida işlaydi: rahbarlar aʼzolar tomonidan saylanadi, qarorlar oçiq muhokama qilinadi.',
  organs: [
    { t: 'Qurultoy', d: 'Ittifoqning oliy organi. U Ustavni tasdiqlaydi, Markaziy Kengaş va uning raisini saylaydi.' },
    { t: 'Markaziy Kengaş', d: 'Qurultoylar oraliğida Ittifoqqa rahbarlik qiladi. Uning tarkibida har bir hududdan kamida ikki nafar yoş vakil böladi.' },
    { t: 'Ijroiya qömitasi', d: 'Kundalik taşkiliy masalalar böyiça tezkor qarorlar qabul qiladi.' },
    { t: 'Nazorat-taftiş komissiyasi', d: 'Ittifoq faoliyati va mablağlarining töğri işlatilişini nazorat qiladi.' },
    { t: 'Hududiy kengaşlar', d: 'Qoraqalpoğiston Respublikasi, viloyatlar va Toşkent şahrida işlaydi. Toşkent şahar hududiy kengaşi poytaxt yoşlari bilan işlaydi.' },
    { t: 'Boşlanğiç taşkilotlar', d: 'Öqiş, iş va xizmat joylarida tuziladi. Kamida beş nafar aʼzo bölsa, boşlanğiç taşkilot oçiş mumkin. Uni aʼzolar özlari saylagan yetakçi boşqaradi.' },
  ] as Organ[],
  principles: ['Ixtiyoriylik', 'Qonuniylik', 'Oçiqlik', 'Aʼzolarning teng huquqliligi', 'Özini özi boşqariş'],
}

/** Qanday aʼzo böliş mumkin */
export const JOIN = {
  steps: [
    { t: 'Yoşingiz 14 dan 30 gaça bölsin', d: 'Özbekiston fuqarosi yoki mamlakatda doimiy yaşaydigan şaxs bölsangiz kifoya.' },
    { t: 'Ariza yozing', d: 'Öqiş yoki iş joyingizdagi boşlanğiç taşkilotga yoki saytimiz orqali murojaat qiling.' },
    { t: 'Boşlanğiç taşkilot qaror qabul qiladi', d: 'Uning qarori yakuniy — yuqori taşkilot tasdiği talab qilinmaydi.' },
    { t: 'Faol böling', d: 'Loyihalarda qatnaşing, öz ğoyangizni taklif qiling, yetakçi yoki sardor böling.' },
  ] as Organ[],
  rights: ['Fikringizni erkin bildirasiz', 'Rahbar organlarga saylaysiz va saylanasiz', 'Ittifoq faoliyati haqida maʼlumot olasiz', 'Istalgan rahbar organga taklif bilan murojaat qilasiz'],
  perks: [
    'Faol aʼzo, örtaça özlaştirişi 86 foiz va undan yuqori bölgan bakalavr va magistrlarga kontrakt tölovining 35 foizi Ittifoq jamğarmasi hisobidan tölab beriladi.',
    'Respublika va xalqaro forumlar, tanlovlar, sport musobaqalari, intellektual öyinlar va almaşinuv dasturlarida qatnaşiş imkoniyati.',
  ],
  cta: { t: 'Kelajakni birga quramiz', d: 'Sizning ğoyangiz, bilimingiz va ğayratingiz yurtimiz uçun kerak. Özbekiston yoşlar ittifoqiga qöşiling — tengdoşlaringiz bilan birga örganing, yarating va öz hissangizni qöşing.' },
}

/** Rasmiy maʼlumotlar */
export const OFFICIAL = {
  rows: [
    ['Töliq nomi', 'Özbekiston yoşlar ittifoqi'],
    ['Ruşça', 'Союз молодежи Узбекистана'],
    ['Inglizça', 'Uzbekistan Youth Union'],
    ['Taşkiliy-huquqiy şakli', 'Nodavlat notijorat taşkilot (ittifoq)'],
    ['Taşkil etilgan sana', '2017-yil 30-iyun'],
    ['Markaziy Kengaş manzili', 'Toşkent şahri, Alişer Navoiy köçasi, 11-uy'],
  ] as [string, string][],
  laws: [
    { t: 'Özbekiston Respublikasi Konstitutsiyasi' },
    { t: '«Yoşlarga oid davlat siyosati töğrisida»gi Qonun' },
    { t: '«Nodavlat notijorat taşkilotlari töğrisida»gi va «Nodavlat notijorat taşkilotlari faoliyatining kafolatlari töğrisida»gi qonunlar' },
    { t: 'Prezidentning 2017-yil 5-iyuldagi PF-5106-son Farmoni', href: 'https://lex.uz/docs/-3255680' },
    { t: 'Özbekiston yoşlar ittifoqining Ustavi' },
  ] as { t: string; href?: string }[],
}
