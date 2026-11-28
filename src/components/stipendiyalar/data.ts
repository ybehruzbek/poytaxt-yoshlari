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
  { key: 'xorij', t: 'Xorijda ta’lim' },
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
    v: `${som(rateSum(lo, M)).replace('\u00A0so‘m', '')} – ${som(rateSum(hi, M))}`,
  }
}

/** gov.uz — Taʼlim va ilm-fan vazirligi: Prezident va nomli davlat stipendiyalari tartibi */
const EDU = 'https://gov.uz/oz/edu/pages/talabalar-uchun-stipendiya-va-grantlar'
const EDU_SRC = 'gov.uz — Ta’lim va ilm-fan vazirligi'
const COMMISSION = 'Ta’lim va ilm-fan vazirligi huzuridagi tanlov komissiyasi'
const PREZ: Rate = { base: 'stip', k: STIP_K.prezident }
const NAMED: Rate = { base: 'stip', k: STIP_K.nomli }
const NAMED_PERK = `Oylik stipendiya — ${som(rateSum(NAMED))}; bitirgandan keyin bir yil davomida magistraturaga kirish imtihonlarisiz, qo‘shimcha davlat granti asosida qabul`
const NAMED_CYCLE = 'Har yili: avval oliy ta’lim tashkilotida saralash, so‘ngra avgust oyida my.edu.uz orqali ariza'
const NAMED_HOW =
  'Davlat stipendiyasi bir o‘quv yiliga tayinlanadi. Nomzodlarni oliy ta’lim tashkiloti kengashi tavsiya etadi, g‘oliblarni ilmiy ishlar, yutuqlar va test sinovlari natijalariga ko‘ra Ta’lim va ilm-fan vazirligi huzuridagi tanlov komissiyasi aniqlaydi.'

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

const NAMED_TALAB = 'barcha fanlardan “a’lo” baholarga (ko‘pi bilan 25 foizi “yaxshi”) o‘qiyotgan, ilmiy yoki ijodiy faoliyatda faol'

export const STIPENDS: Stipend[] = [
  {
    id: 'prezident',
    cat: 'davlat',
    t: 'O‘zbekiston Respublikasi Prezidentining davlat stipendiyasi',
    org: COMMISSION,
    rates: [{ r: PREZ }],
    who: 'Butun o‘qish davrida faqat “a’lo” baholarga o‘qiyotgan bakalavriatning bitiruvchi kurs talabalari va magistrantlar',
    perk: `Oylik stipendiya — ${som(rateSum(PREZ))}; bakalavriat sohiblari ikki yil davomida magistraturaga imtihonsiz, qo‘shimcha davlat granti asosida qabul qilinadi`,
    cycle: NAMED_CYCLE,
    text: 'Bakalavriatda har bir oliy ta’lim tashkilotidan bir nafar bitiruvchi, magistraturada har bir tanlov yo‘nalishi bo‘yicha bir nafar talaba stipendiya sohibi bo‘ladi. Nomzoddan kamida 2 ta e’lon qilingan ilmiy ish talab etiladi. ' + NAMED_HOW,
    url: EDU,
    source: EDU_SRC,
  },
  named(
    'islom-karimov',
    'Islom Karimov',
    `Barcha yo‘nalishlarning oxirgi ikki kurs talabalari: ${NAMED_TALAB}`,
    'Har bir oliy ta’lim tashkilotidan bir nafar talaba stipendiya sohibi bo‘ladi.',
  ),
  named(
    'navoiy',
    'Alisher Navoiy',
    `Gumanitar yo‘nalishlarning oxirgi ikki kurs talabalari: ${NAMED_TALAB}`,
    'Stipendiya gumanitar yo‘nalishlardagi yuqori kurslarning har ming nafar talabasiga bittadan ajratiladi.',
  ),
  named(
    'bobur',
    'Zahiriddin Muhammad Bobur',
    `Tarix va geografiya yo‘nalishlarining oxirgi ikki kurs talabalari: ${NAMED_TALAB}`,
    'Tarix va geografiya mutaxassislarini tayyorlovchi har bir oliy ta’lim tashkilotidan bir nafar talaba stipendiya sohibi bo‘ladi.',
  ),
  named(
    'imom-buxoriy',
    'Imom al-Buxoriy',
    `O‘zbekiston xalqaro islomshunoslik akademiyasining yuqori kurs talabalari: ${NAMED_TALAB}`,
    'Stipendiya islomshunoslik sohasida yuqori natijalarga erishgan talabalarga tayinlanadi.',
  ),
  named(
    'beruniy',
    'Abu Rayhon Beruniy',
    `Texnika yo‘nalishlarining oxirgi ikki kurs talabalari: ${NAMED_TALAB}`,
    'Stipendiya texnika yo‘nalishlaridagi yuqori kurslarning har ming nafar talabasiga bittadan ajratiladi; patent, ixtiro va dasturiy mahsulotlar qo‘shimcha yutuq sifatida inobatga olinadi.',
  ),
  named(
    'ibn-sino',
    'Abu Ali ibn Sino',
    `Tibbiyot yo‘nalishlarining oxirgi ikki kurs talabalari: ${NAMED_TALAB}`,
    'Stipendiya tibbiyot yo‘nalishlaridagi yuqori kurslarning har ming nafar talabasiga bittadan ajratiladi.',
  ),
  named(
    'avloniy',
    'Abdulla Avloniy',
    `Pedagogika yo‘nalishining oxirgi ikki kurs talabalari: ${NAMED_TALAB}`,
    'Pedagogika yo‘nalishidagi har bir oliy ta’lim tashkilotidan bir nafar talaba stipendiya sohibi bo‘ladi.',
  ),
  named(
    'ulugbek',
    'Mirzo Ulug‘bek',
    `Tabiiy fanlar yo‘nalishlarining oxirgi ikki kurs talabalari: ${NAMED_TALAB}`,
    'Stipendiya tabiiy fanlar yo‘nalishlaridagi yuqori kurslarning har ming nafar talabasiga bittadan ajratiladi.',
  ),
  named(
    'qaipbergenov',
    'To‘lepbergen Qaipbergenov',
    `Qoraqalpog‘iston Respublikasidagi oliy ta’lim tashkilotlarining oxirgi ikki kurs talabalari: ${NAMED_TALAB}`,
    'Qoraqalpog‘iston Respublikasidagi har bir oliy ta’lim tashkilotidan bir nafar talaba stipendiya sohibi bo‘ladi.',
  ),
  named(
    'yusupov',
    'Ibroyim Yusupov',
    `Qoraqalpog‘iston Respublikasidagi oliy ta’lim tashkilotlarining oxirgi ikki kurs talabalari: ${NAMED_TALAB}`,
    'Qoraqalpog‘iston Respublikasidagi har bir oliy ta’lim tashkilotidan bir nafar talaba stipendiya sohibi bo‘ladi.',
  ),
  named(
    'pahlavon-mahmud',
    'Pahlavon Mahmud',
    `Jismoniy madaniyat va sport yo‘nalishlarining oxirgi ikki kurs talabalari: ${NAMED_TALAB}`,
    'Jismoniy tarbiya va sport mutaxassislarini tayyorlovchi har bir oliy ta’lim tashkilotidan bir nafar talaba stipendiya sohibi bo‘ladi.',
  ),
  {
    id: 'oliy-bosh-qomondon',
    cat: 'davlat',
    t: '“Oliy Bosh Qo‘mondon” davlat stipendiyasi',
    org: 'Mudofaa vazirligi',
    badge: { l: 'Ta’sis etilgan', v: 'Prezidentning PF–61-son farmoni' },
    who: 'Oliy harbiy ta’lim muassasalarining eng namunali kursantlari va tinglovchilari',
    perk: 'Oylik davlat stipendiyasi; besh yil davomida harbiy magistraturaga kirish imtihonlarisiz qabul',
    cycle: 'Har yili, oliy harbiy ta’lim muassasalari tavsiyasi asosida',
    text: 'Stipendiya Prezidentning 2025-yil 26-martdagi PF–61-son farmoni bilan iqtidorli harbiy xizmatchilarni moddiy va ma’naviy rag‘batlantirish maqsadida ta’sis etilgan. Nomzodlarni oliy harbiy ta’lim muassasalari tavsiya etadi, tanlovni Mudofaa vazirligi o‘tkazadi.',
    url: 'https://gov.uz/oz/mudofaa/news/view/127805',
    source: 'gov.uz — Mudofaa vazirligi',
  },
  {
    id: 'sogliq-vazir',
    cat: 'davlat',
    t: 'Sog‘liqni saqlash vaziri stipendiyasi',
    org: 'Sog‘liqni saqlash vazirligi',
    rates: [
      { l: 'bakalavriat', r: { base: 'bhm', k: 3 } },
      { l: 'magistratura', r: { base: 'bhm', k: 4 } },
    ],
    who: 'Tibbiyot oliy ta’lim muassasalarining kunduzgi bakalavriat va magistratura talabalari',
    perk: `Har oy bakalavriat talabalariga ${rateFull({ base: 'bhm', k: 3 })}, magistrantlarga ${rateFull({ base: 'bhm', k: 4 })} miqdorida stipendiya to‘lanadi`,
    cycle: 'Har yili, odatda oktabr oyida ssvstipendiya.uz platformasi orqali',
    text: 'Tanlov to‘liq elektron shaklda o‘tkaziladi: arizalar va hujjatlar tekshiriladi, nomzodlar portfeli ekspertlar tomonidan baholanadi, so‘ngra suhbat va loyiha taqdimoti o‘tkaziladi. Ariza bilan birga rezyume, transkript, portfel, tavsiyanoma, xorijiy til sertifikati va loyiha konsepsiyasi taqdim etiladi.',
    url: 'https://ssvstipendiya.uz/uz',
    source: 'ssvstipendiya.uz — Sog‘liqni saqlash vazirligi',
  },
  {
    id: 'el-yurt-umidi',
    cat: 'xorij',
    t: '“El-yurt umidi” stipendiyasi',
    org: 'Prezident huzuridagi “El-yurt umidi” jamg‘armasi',
    badge: { l: 'Ta’lim bosqichlari', v: 'Bakalavriat, magistratura, doktorantura' },
    who: 'O‘zbekiston fuqarolari: bakalavriat uchun 30 yoshgacha, magistratura uchun 22–40 yosh, doktorantura uchun 25–45 yosh',
    perk: 'Nufuzli xorijiy universitetlarda ta’lim xarajatlari; reytingning dastlabki 100 taligidagi universitetlarga to‘liq grant bilan qabul qilinganlar imtihonsiz g‘olib deb topiladi',
    deadline: '2026-11-15',
    cycle: 'Yiliga kamida ikki marta; ariza jamg‘armaning onlayn platformasi orqali',
    text: 'Stipendiya Prezidentning 2025-yil 5-maydagi PF–77-son farmoniga muvofiq beriladi. Saralash olti bosqichdan iborat: hujjatlar o‘rganiladi, xalqaro reytingdagi universitetlarga qabul qilinganlar alohida saralanadi, qolgan nomzodlar test sinovi va suhbatdan o‘tadi. Magistratura uchun kamida bir yil, doktorantura uchun kamida ikki yil mehnat staji talab etiladi.',
    url: 'https://el-yurt.uz/',
    source: 'el-yurt.uz',
  },
  {
    id: 'chevening',
    cat: 'xorij',
    t: 'Chevening stipendiyasi',
    org: 'Buyuk Britaniya hukumati',
    badge: { l: 'Davlat', v: 'Buyuk Britaniya' },
    who: 'Bakalavr diplomi va kamida ikki yillik ish tajribasiga ega O‘zbekiston fuqarolari',
    perk: 'Bir yillik magistratura: o‘qish, yashash va aviachipta xarajatlari to‘liq qoplanadi',
    cycle: 'Har yili, ariza odatda avgust — oktabr',
    text: 'Stipendiya Buyuk Britaniya universitetlarining istalgan bir yillik magistratura dasturida o‘qish imkonini beradi. Nomzodlar yetakchilik salohiyati, kasbiy rejalari va ingliz tilini bilish darajasi asosida saralanadi.',
    url: 'https://www.chevening.org/scholarship/uzbekistan/',
    source: 'chevening.org',
  },
  {
    id: 'fulbright',
    cat: 'xorij',
    t: 'Fulbright xorijiy talabalar dasturi',
    org: 'AQSH Davlat departamenti, AQSHning O‘zbekistondagi elchixonasi',
    badge: { l: 'Davlat', v: 'Amerika Qo‘shma Shtatlari' },
    who: 'Bakalavr diplomiga ega, tanlov davrida O‘zbekistonda yashayotgan yosh mutaxassislar va bitiruvchilar',
    perk: 'AQSH universitetlarida ikki yilgacha magistratura: o‘qish, yashash va yo‘l xarajatlari',
    cycle: 'Har yili; tanlov AQSH elchixonasi orqali e’lon qilinadi',
    text: 'Dastur yosh mutaxassislar va bitiruvchilarga AQSHda magistrlik daraja olish imkonini beradi. Nomzodlar akademik natijalar, kasbiy maqsadlar va ingliz tilini bilish darajasi asosida saralanadi.',
    url: 'https://foreign.fulbrightonline.org/',
    source: 'foreign.fulbrightonline.org',
  },
  {
    id: 'daad',
    cat: 'xorij',
    t: 'DAAD stipendiyalari',
    org: 'Germaniya akademik almashinuv xizmati (DAAD)',
    badge: { l: 'Davlat', v: 'Germaniya' },
    who: 'Talabalar, bitiruvchilar, yosh olimlar va tadqiqotchilar',
    perk: 'Magistratura, doktorantura va ilmiy stajirovka uchun oylik stipendiya, sug‘urta va yo‘l xarajatlari',
    cycle: 'Dasturga qarab; muddatlar DAAD stipendiyalar bazasida e’lon qilinadi',
    text: 'DAAD stipendiyalar bazasida O‘zbekiston fuqarolari uchun ochiq dasturlar ta’lim bosqichi va soha bo‘yicha saralanadi. Har bir dasturning o‘z talablari va ariza muddati mavjud.',
    url: 'https://www2.daad.de/deutschland/stipendium/datenbank/en/21148-scholarship-database/',
    source: 'daad.de',
  },
  {
    id: 'stipendium-hungaricum',
    cat: 'xorij',
    t: 'Stipendium Hungaricum',
    org: 'Vengriya hukumati, Ta’lim va ilm-fan vazirligi',
    badge: { l: 'Davlat', v: 'Vengriya' },
    who: 'Bakalavriat, magistratura va doktoranturaga kirmoqchi bo‘lgan O‘zbekiston fuqarolari',
    perk: 'O‘qish haqi, oylik stipendiya, yotoqxona va tibbiy sug‘urta',
    cycle: 'Har yili, ariza odatda noyabr — yanvar',
    text: 'O‘zbekiston dasturning hamkor davlatlaridan biri bo‘lib, nomzodlar Ta’lim va ilm-fan vazirligi tomonidan tavsiya etiladi. Ariza dasturning rasmiy platformasi orqali topshiriladi.',
    url: 'https://stipendiumhungaricum.hu/',
    source: 'stipendiumhungaricum.hu',
  },
  {
    id: 'turkiye-burslari',
    cat: 'xorij',
    t: 'Türkiye Bursları',
    org: 'Türkiya Respublikasi hukumati',
    badge: { l: 'Davlat', v: 'Türkiya' },
    who: 'Bakalavriat, magistratura va doktoranturaga kirmoqchi bo‘lgan xorijlik yoshlar',
    perk: 'O‘qish haqi, oylik stipendiya, yotoqxona, sug‘urta, aviachipta va bir yillik türk tili kursi',
    cycle: 'Har yili, ariza odatda yanvar — fevral',
    text: 'Ariza rasmiy platforma orqali onlayn topshiriladi. Nomzodlar akademik natijalar va suhbat asosida saralanadi, g‘oliblar Türkiya universitetlariga joylashtiriladi.',
    url: 'https://www.turkiyeburslari.gov.tr/',
    source: 'turkiyeburslari.gov.tr',
  },
  {
    id: 'gks',
    cat: 'xorij',
    t: 'Global Korea Scholarship (GKS)',
    org: 'Koreya Respublikasi hukumati',
    badge: { l: 'Davlat', v: 'Koreya Respublikasi' },
    who: 'Bakalavriat, magistratura va doktoranturaga kirmoqchi bo‘lgan xorijlik yoshlar',
    perk: 'O‘qish haqi, oylik stipendiya, aviachipta, tibbiy sug‘urta va bir yillik koreys tili kursi',
    cycle: 'Har yili: bakalavriat — sentabr — oktabr, magistratura va doktorantura — fevral — mart',
    text: 'Ariza elchixona yoki universitet orqali topshiriladi. Tanlov shartlari va kvotalar har yili rasmiy “Study in Korea” portalida e’lon qilinadi.',
    url: 'https://www.studyinkorea.go.kr/en/main.do',
    source: 'studyinkorea.go.kr',
  },
  {
    id: 'mext',
    cat: 'xorij',
    t: 'Yaponiya hukumati (MEXT) stipendiyasi',
    org: 'Yaponiya Ta’lim, madaniyat, sport, fan va texnologiyalar vazirligi',
    badge: { l: 'Davlat', v: 'Yaponiya' },
    who: 'Yaponiyada bakalavriat, magistratura yoki ilmiy tadqiqotni davom ettirmoqchi bo‘lgan yoshlar',
    perk: 'O‘qish haqi, oylik stipendiya va aviachipta',
    cycle: 'Har yili, Yaponiya elchixonasi tavsiyasi asosida; ariza odatda bahorda',
    text: 'Hujjatlar bevosita vazirlikka emas, Yaponiyaning O‘zbekistondagi elchixonasiga topshiriladi. Saralash hujjatlar, yozma imtihon va suhbat asosida o‘tkaziladi.',
    url: 'https://www.studyinjapan.go.jp/en/smap_stopj-applications_research.html',
    source: 'studyinjapan.go.jp',
  },
  {
    id: 'erasmus-mundus',
    cat: 'xorij',
    t: 'Erasmus Mundus qo‘shma magistratura stipendiyalari',
    org: 'Yevropa Ittifoqi',
    badge: { l: 'Davlat', v: 'Yevropa Ittifoqi mamlakatlari' },
    who: 'Bakalavr diplomiga ega bo‘lgan bitiruvchilar',
    perk: 'Bir nechta Yevropa universitetida qo‘shma magistratura: o‘qish, yashash va yo‘l xarajatlari',
    cycle: 'Dasturga qarab, ariza odatda oktabr — yanvar',
    text: 'Erasmus Mundus katalogida yuzlab qo‘shma magistratura dasturlari jamlangan. Ariza har bir dasturning o‘z sayti orqali topshiriladi.',
    url: 'https://www.eacea.ec.europa.eu/scholarships/erasmus-mundus-catalogue_en',
    source: 'eacea.ec.europa.eu',
  },
  {
    id: 'csc',
    cat: 'xorij',
    t: 'Xitoy hukumati stipendiyasi (CSC)',
    org: 'Xitoy stipendiyalar kengashi',
    badge: { l: 'Davlat', v: 'Xitoy Xalq Respublikasi' },
    who: 'Bakalavriat, magistratura va doktoranturaga kirmoqchi bo‘lgan xorijlik yoshlar',
    perk: 'O‘qish haqi, yotoqxona, oylik stipendiya va tibbiy sug‘urta',
    cycle: 'Har yili, ariza odatda yanvar — aprel',
    text: 'Ariza “Campus China” rasmiy platformasi orqali universitet yoki elchixona yo‘nalishi bo‘yicha topshiriladi.',
    url: 'https://www.campuschina.org/',
    source: 'campuschina.org',
  },
]
