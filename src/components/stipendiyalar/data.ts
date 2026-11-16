/**
 * Özbekistonlik yoşlar uçun stipendiyalar: avval davlat nomli stipendiyalari, keyin xorijda taʼlim oliş uçun stipendiyalar.
 * Oliy taʼlim taşkilotlarining öz stipendiyalari kiritilmaydi.
 * Rasmiy manbalar asosida. Miqdorlar lib/miqdorlar.ts dagi BHM va bazaviy stipendiyadan hisoblanadi. Har bir yozuvda batafsil maʼlumot uçun manba havolasi bor;
 * muddat aniq bölsa `deadline` (YYYY-MM-DD), aks holda `cycle` — ariza qaçon qabul qilinişi.
 * Keyinçalik admin paneldagi “Imkoniyatlar” bölimiga ötkaziladi.
 */
import { DEFAULT_MIQDOR, fmtK, type Miqdorlar, rateFull, rateSum, rateText, som, STIP_K, type Rate } from '@/lib/miqdorlar'

export type StipCat = 'davlat' | 'xorij'

export const STIP_CATS: { key: StipCat; t: string }[] = [
  { key: 'davlat', t: 'Davlat stipendiyalari' },
  { key: 'xorij', t: 'Xorijda taʼlim' },
]

export type Stipend = {
  id: string
  cat: StipCat
  /** sahifadagi örni (admin panelda tanlanadi) */
  turi?: 'prezident' | 'nomli' | 'idoraviy' | 'xorij'
  /** nomli/idoraviy stipendiya ikonkasi */
  icon?: string
  /** nomli stipendiya sohasi (setkada nom ostida) */
  soha?: string
  /** xorijiy dastur davlati bayroği (bayroqlar/{flag}.png) */
  flag?: string
  t: string
  /** tanlovni ötkazuvçi (davlat stipendiyalari) yoki stipendiya beruvçi (xorijiy) taşkilot */
  org: string
  /** karta boşidagi blok: oylik miqdor (`rates` dan avtomatik hisoblanadi) yoki boşqa asosiy maʼlumot */
  badge?: { l: string; v: string }
  /** oylik miqdor: BHM yoki bazaviy stipendiyaga nisbatan necha barobar (lib/miqdorlar.ts) */
  rates?: { l?: string; r: Rate }[]
  who: string
  perk: string
  cycle: string
  text: string
  /** aniq ariza muddati */
  deadline?: string
  url: string
  source: string
}

/** Karta boşidagi blok: miqdor bölsa — “Oyiga · BHMning 3 barobari” va summa, aks holda `badge` */
export function stipBadge(s: Stipend, M: Miqdorlar = DEFAULT_MIQDOR): { l: string; v: string } {
  if (!s.rates?.length) return s.badge ?? { l: '', v: '' }
  const [lo, hi] = [s.rates[0].r, s.rates[s.rates.length - 1].r]
  if (lo === hi || (lo.base === hi.base && lo.k === hi.k)) return { l: `Oylik miqdori · ${rateText(lo)}`, v: som(rateSum(lo, M)) }
  return {
    l: `Oylik miqdori · ${lo.base === 'bhm' ? 'BHMning' : 'bazaviy stipendiyaning'} ${fmtK(lo.k)}–${fmtK(hi.k)} barobari`,
    v: `${som(rateSum(lo, M)).replace('\u00A0söm', '')} – ${som(rateSum(hi, M))}`,
  }
}

/** gov.uz — Taʼlim va ilm-fan vazirligi: Prezident va nomli davlat stipendiyalari tartibi */
const EDU = 'https://gov.uz/oz/edu/pages/talabalar-uchun-stipendiya-va-grantlar'
const EDU_SRC = 'gov.uz — Taʼlim va ilm-fan vazirligi'
const COMMISSION = 'Taʼlim va ilm-fan vazirligi huzuridagi tanlov komissiyasi'
const PREZ: Rate = { base: 'stip', k: STIP_K.prezident }
const NAMED: Rate = { base: 'stip', k: STIP_K.nomli }
const NAMED_PERK = `Oylik stipendiya — ${som(rateSum(NAMED))}; bitirgandan keyin bir yil davomida magistraturaga kiriş imtihonlarisiz, qöşimça davlat granti asosida qabul`
const NAMED_CYCLE = 'Har yili: avval oliy taʼlim taşkilotida saralaş, söngra avgust oyida my.edu.uz orqali ariza'
const NAMED_HOW =
  'Davlat stipendiyasi bir öquv yiliga tayinlanadi. Nomzodlarni oliy taʼlim taşkiloti kengaşi tavsiya etadi, ğoliblarni ilmiy işlar, yutuqlar va test sinovlari natijalariga köra Taʼlim va ilm-fan vazirligi huzuridagi tanlov komissiyasi aniqlaydi.'

/** Nomli davlat stipendiyasi uçun umumiy yozuv */
const named = (id: string, name: string, who: string, text: string): Stipend => ({
  id,
  cat: 'davlat',
  t: `${name} nomidagi davlat stipendiyasi`,
  org: COMMISSION,
  rates: [{ r: NAMED }],
  who,
  perk: NAMED_PERK,
  cycle: NAMED_CYCLE,
  text: `${text} ${NAMED_HOW}`,
  url: EDU,
  source: EDU_SRC,
})

const NAMED_TALAB = 'barça fanlardan “aʼlo” baholarga (köpi bilan 25 foizi “yaxşi”) öqiyotgan, ilmiy yoki ijodiy faoliyatda faol'

export const STIPENDS: Stipend[] = [
  {
    id: 'prezident',
    cat: 'davlat',
    t: 'Özbekiston Respublikasi Prezidentining davlat stipendiyasi',
    org: COMMISSION,
    rates: [{ r: PREZ }],
    who: 'Butun öqiş davrida faqat “aʼlo” baholarga öqiyotgan bakalavriatning bitiruvçi kurs talabalari va magistrantlar',
    perk: `Oylik stipendiya — ${som(rateSum(PREZ))}; bakalavriat sohiblari ikki yil davomida magistraturaga imtihonsiz, qöşimça davlat granti asosida qabul qilinadi`,
    cycle: NAMED_CYCLE,
    text: 'Bakalavriatda har bir oliy taʼlim taşkilotidan bir nafar bitiruvçi, magistraturada har bir tanlov yönalişi böyiça bir nafar talaba stipendiya sohibi böladi. Nomzoddan kamida 2 ta eʼlon qilingan ilmiy iş talab etiladi. ' + NAMED_HOW,
    url: EDU,
    source: EDU_SRC,
  },
  named(
    'islom-karimov',
    'Islom Karimov',
    `Barça yönalişlarning oxirgi ikki kurs talabalari: ${NAMED_TALAB}`,
    'Har bir oliy taʼlim taşkilotidan bir nafar talaba stipendiya sohibi böladi.',
  ),
  named(
    'navoiy',
    'Alişer Navoiy',
    `Gumanitar yönalişlarning oxirgi ikki kurs talabalari: ${NAMED_TALAB}`,
    'Stipendiya gumanitar yönalişlardagi yuqori kurslarning har ming nafar talabasiga bittadan ajratiladi.',
  ),
  named(
    'bobur',
    'Zahiriddin Muhammad Bobur',
    `Tarix va geografiya yönalişlarining oxirgi ikki kurs talabalari: ${NAMED_TALAB}`,
    'Tarix va geografiya mutaxassislarini tayyorlovçi har bir oliy taʼlim taşkilotidan bir nafar talaba stipendiya sohibi böladi.',
  ),
  named(
    'imom-buxoriy',
    'Imom al-Buxoriy',
    `Özbekiston xalqaro islomşunoslik akademiyasining yuqori kurs talabalari: ${NAMED_TALAB}`,
    'Stipendiya islomşunoslik sohasida yuqori natijalarga erişgan talabalarga tayinlanadi.',
  ),
  named(
    'beruniy',
    'Abu Rayhon Beruniy',
    `Texnika yönalişlarining oxirgi ikki kurs talabalari: ${NAMED_TALAB}`,
    'Stipendiya texnika yönalişlaridagi yuqori kurslarning har ming nafar talabasiga bittadan ajratiladi; patent, ixtiro va dasturiy mahsulotlar qöşimça yutuq sifatida inobatga olinadi.',
  ),
  named(
    'ibn-sino',
    'Abu Ali ibn Sino',
    `Tibbiyot yönalişlarining oxirgi ikki kurs talabalari: ${NAMED_TALAB}`,
    'Stipendiya tibbiyot yönalişlaridagi yuqori kurslarning har ming nafar talabasiga bittadan ajratiladi.',
  ),
  named(
    'avloniy',
    'Abdulla Avloniy',
    `Pedagogika yönalişining oxirgi ikki kurs talabalari: ${NAMED_TALAB}`,
    'Pedagogika yönalişidagi har bir oliy taʼlim taşkilotidan bir nafar talaba stipendiya sohibi böladi.',
  ),
  named(
    'ulugbek',
    'Mirzo Uluğbek',
    `Tabiiy fanlar yönalişlarining oxirgi ikki kurs talabalari: ${NAMED_TALAB}`,
    'Stipendiya tabiiy fanlar yönalişlaridagi yuqori kurslarning har ming nafar talabasiga bittadan ajratiladi.',
  ),
  named(
    'qaipbergenov',
    'Tölepbergen Qaipbergenov',
    `Qoraqalpoğiston Respublikasidagi oliy taʼlim taşkilotlarining oxirgi ikki kurs talabalari: ${NAMED_TALAB}`,
    'Qoraqalpoğiston Respublikasidagi har bir oliy taʼlim taşkilotidan bir nafar talaba stipendiya sohibi böladi.',
  ),
  named(
    'yusupov',
    'Ibroyim Yusupov',
    `Qoraqalpoğiston Respublikasidagi oliy taʼlim taşkilotlarining oxirgi ikki kurs talabalari: ${NAMED_TALAB}`,
    'Qoraqalpoğiston Respublikasidagi har bir oliy taʼlim taşkilotidan bir nafar talaba stipendiya sohibi böladi.',
  ),
  named(
    'pahlavon-mahmud',
    'Pahlavon Mahmud',
    `Jismoniy madaniyat va sport yönalişlarining oxirgi ikki kurs talabalari: ${NAMED_TALAB}`,
    'Jismoniy tarbiya va sport mutaxassislarini tayyorlovçi har bir oliy taʼlim taşkilotidan bir nafar talaba stipendiya sohibi böladi.',
  ),
  {
    id: 'oliy-bosh-qomondon',
    cat: 'davlat',
    t: '“Oliy Boş Qömondon” davlat stipendiyasi',
    org: 'Mudofaa vazirligi',
    badge: { l: 'Taʼsis etilgan', v: 'Prezidentning PF–61-son farmoni' },
    who: 'Oliy harbiy taʼlim muassasalarining eng namunali kursantlari va tinglovçilari',
    perk: 'Oylik davlat stipendiyasi; beş yil davomida harbiy magistraturaga kiriş imtihonlarisiz qabul',
    cycle: 'Har yili, oliy harbiy taʼlim muassasalari tavsiyasi asosida',
    text: 'Stipendiya Prezidentning 2025-yil 26-martdagi PF–61-son farmoni bilan iqtidorli harbiy xizmatçilarni moddiy va maʼnaviy rağbatlantiriş maqsadida taʼsis etilgan. Nomzodlarni oliy harbiy taʼlim muassasalari tavsiya etadi, tanlovni Mudofaa vazirligi ötkazadi.',
    url: 'https://gov.uz/oz/mudofaa/news/view/127805',
    source: 'gov.uz — Mudofaa vazirligi',
  },
  {
    id: 'sogliq-vazir',
    cat: 'davlat',
    t: 'Soğliqni saqlaş vaziri stipendiyasi',
    org: 'Soğliqni saqlaş vazirligi',
    rates: [
      { l: 'bakalavriat', r: { base: 'bhm', k: 3 } },
      { l: 'magistratura', r: { base: 'bhm', k: 4 } },
    ],
    who: 'Tibbiyot oliy taʼlim muassasalarining kunduzgi bakalavriat va magistratura talabalari',
    perk: `Har oy bakalavriat talabalariga ${rateFull({ base: 'bhm', k: 3 })}, magistrantlarga ${rateFull({ base: 'bhm', k: 4 })} miqdorida stipendiya tölanadi`,
    cycle: 'Har yili, odatda oktabr oyida ssvstipendiya.uz platformasi orqali',
    text: 'Tanlov töliq elektron şaklda ötkaziladi: arizalar va hujjatlar tekşiriladi, nomzodlar portfeli ekspertlar tomonidan baholanadi, söngra suhbat va loyiha taqdimoti ötkaziladi. Ariza bilan birga rezyume, transkript, portfel, tavsiyanoma, xorijiy til sertifikati va loyiha konsepsiyasi taqdim etiladi.',
    url: 'https://ssvstipendiya.uz/uz',
    source: 'ssvstipendiya.uz — Soğliqni saqlaş vazirligi',
  },
  {
    id: 'el-yurt-umidi',
    cat: 'xorij',
    t: '“El-yurt umidi” stipendiyasi',
    org: 'Prezident huzuridagi “El-yurt umidi” jamğarmasi',
    badge: { l: 'Taʼlim bosqiçlari', v: 'Bakalavriat, magistratura, doktorantura' },
    who: 'Özbekiston fuqarolari: bakalavriat uçun 30 yoşgaça, magistratura uçun 22–40 yoş, doktorantura uçun 25–45 yoş',
    perk: 'Nufuzli xorijiy universitetlarda taʼlim xarajatlari; reytingning dastlabki 100 taligidagi universitetlarga töliq grant bilan qabul qilinganlar imtihonsiz ğolib deb topiladi',
    deadline: '2026-11-15',
    cycle: 'Yiliga kamida ikki marta; ariza jamğarmaning onlayn platformasi orqali',
    text: 'Stipendiya Prezidentning 2025-yil 5-maydagi PF–77-son farmoniga muvofiq beriladi. Saralaş olti bosqiçdan iborat: hujjatlar örganiladi, xalqaro reytingdagi universitetlarga qabul qilinganlar alohida saralanadi, qolgan nomzodlar test sinovi va suhbatdan ötadi. Magistratura uçun kamida bir yil, doktorantura uçun kamida ikki yil mehnat staji talab etiladi.',
    url: 'https://el-yurt.uz/',
    source: 'el-yurt.uz',
  },
  {
    id: 'chevening',
    cat: 'xorij',
    t: 'Chevening stipendiyasi',
    org: 'Buyuk Britaniya hukumati',
    badge: { l: 'Davlat', v: 'Buyuk Britaniya' },
    who: 'Bakalavr diplomi va kamida ikki yillik iş tajribasiga ega Özbekiston fuqarolari',
    perk: 'Bir yillik magistratura: öqiş, yaşaş va aviaçipta xarajatlari töliq qoplanadi',
    cycle: 'Har yili, ariza odatda avgust — oktabr',
    text: 'Stipendiya Buyuk Britaniya universitetlarining istalgan bir yillik magistratura dasturida öqiş imkonini beradi. Nomzodlar yetakçilik salohiyati, kasbiy rejalari va ingliz tilini biliş darajasi asosida saralanadi.',
    url: 'https://www.chevening.org/scholarship/uzbekistan/',
    source: 'chevening.org',
  },
  {
    id: 'fulbright',
    cat: 'xorij',
    t: 'Fulbright xorijiy talabalar dasturi',
    org: 'AQŞ Davlat departamenti, AQŞning Özbekistondagi elçixonasi',
    badge: { l: 'Davlat', v: 'Amerika Qöşma Ştatlari' },
    who: 'Bakalavr diplomiga ega, tanlov davrida Özbekistonda yaşayotgan yoş mutaxassislar va bitiruvçilar',
    perk: 'AQŞ universitetlarida ikki yilgaça magistratura: öqiş, yaşaş va yöl xarajatlari',
    cycle: 'Har yili; tanlov AQŞ elçixonasi orqali eʼlon qilinadi',
    text: 'Dastur yoş mutaxassislar va bitiruvçilarga AQŞda magistrlik daraja oliş imkonini beradi. Nomzodlar akademik natijalar, kasbiy maqsadlar va ingliz tilini biliş darajasi asosida saralanadi.',
    url: 'https://foreign.fulbrightonline.org/',
    source: 'foreign.fulbrightonline.org',
  },
  {
    id: 'daad',
    cat: 'xorij',
    t: 'DAAD stipendiyalari',
    org: 'Germaniya akademik almaşinuv xizmati (DAAD)',
    badge: { l: 'Davlat', v: 'Germaniya' },
    who: 'Talabalar, bitiruvçilar, yoş olimlar va tadqiqotçilar',
    perk: 'Magistratura, doktorantura va ilmiy stajirovka uçun oylik stipendiya, suğurta va yöl xarajatlari',
    cycle: 'Dasturga qarab; muddatlar DAAD stipendiyalar bazasida eʼlon qilinadi',
    text: 'DAAD stipendiyalar bazasida Özbekiston fuqarolari uçun oçiq dasturlar taʼlim bosqiçi va soha böyiça saralanadi. Har bir dasturning öz talablari va ariza muddati mavjud.',
    url: 'https://www2.daad.de/deutschland/stipendium/datenbank/en/21148-scholarship-database/',
    source: 'daad.de',
  },
  {
    id: 'stipendium-hungaricum',
    cat: 'xorij',
    t: 'Stipendium Hungaricum',
    org: 'Vengriya hukumati, Taʼlim va ilm-fan vazirligi',
    badge: { l: 'Davlat', v: 'Vengriya' },
    who: 'Bakalavriat, magistratura va doktoranturaga kirmoqçi bölgan Özbekiston fuqarolari',
    perk: 'Öqiş haqi, oylik stipendiya, yotoqxona va tibbiy suğurta',
    cycle: 'Har yili, ariza odatda noyabr — yanvar',
    text: 'Özbekiston dasturning hamkor davlatlaridan biri bölib, nomzodlar Taʼlim va ilm-fan vazirligi tomonidan tavsiya etiladi. Ariza dasturning rasmiy platformasi orqali topşiriladi.',
    url: 'https://stipendiumhungaricum.hu/',
    source: 'stipendiumhungaricum.hu',
  },
  {
    id: 'turkiye-burslari',
    cat: 'xorij',
    t: 'Türkiye Bursları',
    org: 'Türkiya Respublikasi hukumati',
    badge: { l: 'Davlat', v: 'Türkiya' },
    who: 'Bakalavriat, magistratura va doktoranturaga kirmoqçi bölgan xorijlik yoşlar',
    perk: 'Öqiş haqi, oylik stipendiya, yotoqxona, suğurta, aviaçipta va bir yillik türk tili kursi',
    cycle: 'Har yili, ariza odatda yanvar — fevral',
    text: 'Ariza rasmiy platforma orqali onlayn topşiriladi. Nomzodlar akademik natijalar va suhbat asosida saralanadi, ğoliblar Türkiya universitetlariga joylaştiriladi.',
    url: 'https://www.turkiyeburslari.gov.tr/',
    source: 'turkiyeburslari.gov.tr',
  },
  {
    id: 'gks',
    cat: 'xorij',
    t: 'Global Korea Scholarship (GKS)',
    org: 'Koreya Respublikasi hukumati',
    badge: { l: 'Davlat', v: 'Koreya Respublikasi' },
    who: 'Bakalavriat, magistratura va doktoranturaga kirmoqçi bölgan xorijlik yoşlar',
    perk: 'Öqiş haqi, oylik stipendiya, aviaçipta, tibbiy suğurta va bir yillik koreys tili kursi',
    cycle: 'Har yili: bakalavriat — sentabr — oktabr, magistratura va doktorantura — fevral — mart',
    text: 'Ariza elçixona yoki universitet orqali topşiriladi. Tanlov şartlari va kvotalar har yili rasmiy “Study in Korea” portalida eʼlon qilinadi.',
    url: 'https://www.studyinkorea.go.kr/en/main.do',
    source: 'studyinkorea.go.kr',
  },
  {
    id: 'mext',
    cat: 'xorij',
    t: 'Yaponiya hukumati (MEXT) stipendiyasi',
    org: 'Yaponiya Taʼlim, madaniyat, sport, fan va texnologiyalar vazirligi',
    badge: { l: 'Davlat', v: 'Yaponiya' },
    who: 'Yaponiyada bakalavriat, magistratura yoki ilmiy tadqiqotni davom ettirmoqçi bölgan yoşlar',
    perk: 'Öqiş haqi, oylik stipendiya va aviaçipta',
    cycle: 'Har yili, Yaponiya elçixonasi tavsiyasi asosida; ariza odatda bahorda',
    text: 'Hujjatlar bevosita vazirlikka emas, Yaponiyaning Özbekistondagi elçixonasiga topşiriladi. Saralaş hujjatlar, yozma imtihon va suhbat asosida ötkaziladi.',
    url: 'https://www.studyinjapan.go.jp/en/smap_stopj-applications_research.html',
    source: 'studyinjapan.go.jp',
  },
  {
    id: 'erasmus-mundus',
    cat: 'xorij',
    t: 'Erasmus Mundus qöşma magistratura stipendiyalari',
    org: 'Yevropa Ittifoqi',
    badge: { l: 'Davlat', v: 'Yevropa Ittifoqi mamlakatlari' },
    who: 'Bakalavr diplomiga ega bölgan bitiruvçilar',
    perk: 'Bir neçta Yevropa universitetida qöşma magistratura: öqiş, yaşaş va yöl xarajatlari',
    cycle: 'Dasturga qarab, ariza odatda oktabr — yanvar',
    text: 'Erasmus Mundus katalogida yuzlab qöşma magistratura dasturlari jamlangan. Ariza har bir dasturning öz sayti orqali topşiriladi.',
    url: 'https://www.eacea.ec.europa.eu/scholarships/erasmus-mundus-catalogue_en',
    source: 'eacea.ec.europa.eu',
  },
  {
    id: 'csc',
    cat: 'xorij',
    t: 'Xitoy hukumati stipendiyasi (CSC)',
    org: 'Xitoy stipendiyalar kengaşi',
    badge: { l: 'Davlat', v: 'Xitoy Xalq Respublikasi' },
    who: 'Bakalavriat, magistratura va doktoranturaga kirmoqçi bölgan xorijlik yoşlar',
    perk: 'Öqiş haqi, yotoqxona, oylik stipendiya va tibbiy suğurta',
    cycle: 'Har yili, ariza odatda yanvar — aprel',
    text: 'Ariza “Campus China” rasmiy platformasi orqali universitet yoki elçixona yönalişi böyiça topşiriladi.',
    url: 'https://www.campuschina.org/',
    source: 'campuschina.org',
  },
]
