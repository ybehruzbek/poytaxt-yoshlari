/**
 * Talabalar, öquvçilar va yoşlar uçun davlat imtiyozlari: kompensatsiyalar, kontrakt tölovini qoplaş, moddiy yordam,
 * chegirmalar. Faqat amaldagi yoki kuçga kiriş sanasi belgilangan normativ hujjatlar asosida.
 * Miqdorlar lib/miqdorlar.ts dagi BHM ga bog'langan: BHM özgarsa, summalar özi qayta hisoblanadi.
 */
import { BHM, MB_STAVKA, rateFull, som } from '@/lib/miqdorlar'

export type BenefitCat = 'talaba' | 'oquvchi' | 'yosh'

export const BENEFIT_CATS: { key: BenefitCat; t: string }[] = [
  { key: 'talaba', t: 'Talabalar' },
  { key: 'oquvchi', t: 'O‘quvchilar' },
  { key: 'yosh', t: 'Yoshlar va yosh oilalar' },
]

export type Benefit = {
  id: string
  cat: BenefitCat
  t: string
  /** karta boşidagi blok */
  badge: { l: string; v: string }
  icon: string
  who: string
  amount: string
  how: string
  /** normativ hujjat */
  basis: string
  /** hujjat kuçga kiradigan sana (hali kuçga kirmagan bölsa) */
  from?: string
  url: string
  source: string
}

const B = (k: number) => rateFull({ base: 'bhm', k })
const PF222 = 'https://lex.uz/docs/7850416'
const PF222_T = 'Prezidentning 2025-yil 20-noyabrdagi PF–222-son farmoni (Yoshlar daftari)'

export const BENEFITS: Benefit[] = [
  /* ---------- Talabalar ---------- */
  {
    id: 'ijara',
    cat: 'talaba',
    t: 'Ijara to‘lovining bir qismini qoplash',
    badge: { l: 'Har oy · Toshkent shahrida', v: som(BHM.v) },
    icon: 'uy',
    who: 'Davlat oliy ta’lim tashkilotlarining kunduzgi ta’lim shaklidagi, yotoqxonada joy berilmagan, doimiy yashash joyidan boshqa tuman (shahar)da ijarada yashab o‘qiyotgan talabalari',
    amount: `Toshkent shahrida ${B(1)}, boshqa hududlarda ${B(0.5)} — har oy`,
    how: 'Ariza har oyning 7-sanasigacha kontrakt.edu.uz yoki my.gov.uz orqali beriladi. Ijara shartnomasi ijara.soliq.uz tizimida ro‘yxatdan o‘tkazilgan bo‘lishi lozim. Kam ta’minlangan oilalar farzandlari va a’lo baholarga o‘qiydigan talabalarga ustuvorlik beriladi.',
    basis: 'Vazirlar Mahkamasining 2021-yil 24-sentabrdagi 605-son qarori',
    url: 'https://talimxabarlari.uz/82445/',
    source: 'talimxabarlari.uz',
  },
  {
    id: 'yotoqxona',
    cat: 'talaba',
    t: 'Yotoqxona to‘lovini qoplash',
    badge: { l: 'Qoplanadi', v: 'Yotoqxona to‘lovi to‘liq' },
    icon: 'yotoq',
    who: 'Oilasi “Ijtimoiy himoya yagona reyestri”ga kiritilgan, davlat oliy ta’lim tashkilotlarida kunduzgi ta’lim shaklida o‘qiyotgan talabalar',
    amount:
      'Oliy ta’lim tashkiloti kengashi tasdiqlagan yotoqxona to‘lovi to‘liq miqdorda; yotoqxonaga joylashtirishda ustuvorlik',
    how: 'Ariza har o‘quv yili uchun bir marta kontrakt.edu.uz orqali beriladi; mablag‘ talabaning bank kartasiga to‘lanadi.',
    basis: 'Vazirlar Mahkamasining 2026-yil 28-yanvardagi 32-son qarori',
    url: 'https://infoedu.uz/ijtimoiy-reyestr-yotoqxona-tolovi-qoplanadi',
    source: 'infoedu.uz',
  },
  {
    id: 'magistr-qizlar',
    cat: 'talaba',
    t: 'Magistraturada o‘qiyotgan xotin-qizlarning kontrakt to‘lovini qoplash',
    badge: { l: 'Kontrakt to‘lovi', v: '100 foiz davlat hisobidan' },
    icon: 'magistr',
    who: 'Davlat oliy ta’lim tashkilotlari magistraturasida to‘lov-kontrakt asosida o‘qiyotgan barcha xotin-qizlar',
    amount: 'Bazaviy kontrakt summasining 100 foizi, qaytarilmaydigan asosda',
    how: 'Ariza har yili 15-sentabrgacha oliy ta’lim tashkiloti rektoriga beriladi; qaror rektor buyrug‘i bilan rasmiylashtiriladi. Differensial kontrakt va qo‘shma ta’lim dasturlariga tatbiq etilmaydi.',
    basis: 'Vazirlar Mahkamasining 2022-yil 15-avgustdagi 447-son qarori',
    url: 'https://gov.uz/oz/edu/news/view/201736',
    source: 'gov.uz — Ta’lim va ilm-fan vazirligi',
  },
  {
    id: 'reyestr-kontrakt',
    cat: 'talaba',
    t: 'Ijtimoiy reyestrdagi oilalar farzandlarining kontrakt to‘lovini qoplash',
    badge: { l: 'Kontraktning 50 foizigacha', v: `${som(50 * BHM.v)}gacha` },
    icon: 'kontrakt',
    who: 'Oilasi ijtimoiy reyestrga kiritilgan, kunduzgi ta’lim shaklida o‘qiyotgan 14–30 yoshdagi talabalar (davlat, nodavlat va xorijiy oliy ta’lim tashkilotlari)',
    amount: `Kontrakt summasining 50 foizigacha, o‘quv yili uchun ${B(50)}dan oshmagan miqdorda`,
    how: 'Ariza my.gov.uz orqali beriladi, qarorni mahalla yettiligi qabul qiladi. Ijtimoiy shartnoma shartlari: o‘lchirma bali kamida 4, volontyorlik, oyiga kamida bitta kitob o‘qish, xorijiy tilni B1 darajasida egallash.',
    basis: PF222_T,
    url: PF222,
    source: 'lex.uz',
  },
  {
    id: 'pedagog-farzandi',
    cat: 'talaba',
    t: 'Pedagoglar farzandlariga kontrakt chegirmasi',
    badge: { l: 'Kontrakt to‘lovidan', v: '30 foiz chegirma' },
    icon: 'kitob',
    who: 'Davlat oliy ta’lim tashkilotlarining kunduzgi bakalavriatida o‘qiyotgan pedagoglar farzandlari',
    amount: 'Kontrakt summasining 30 foizi, har o‘quv yili uchun, har bir farzandga alohida',
    how: 'Chegirma pedagog maqomi idoralararo axborot almashinuvi orqali tasdiqlangach kontrakt.edu.uz tizimida avtomatik qo‘llanadi.',
    basis: 'Vazirlar Mahkamasining 2026-yil 17-sentabrdagi 501-son qarori',
    url: 'https://gov.uz/oz/edu/news/view/222430',
    source: 'gov.uz — Ta’lim va ilm-fan vazirligi',
  },
  {
    id: 'talim-krediti',
    cat: 'talaba',
    t: 'Ta’lim krediti',
    badge: { l: 'Xotin-qizlar uchun', v: 'Foizsiz kredit' },
    icon: 'bank',
    who: 'Kunduzgi bakalavriat va magistratura talabalari, texnikum o‘quvchilari',
    amount: `Birinchi kursda kontraktning 100 foizigacha; xotin-qizlar uchun foizsiz, yigitlar uchun Markaziy bankning asosiy stavkasida (${MB_STAVKA.v} foiz)`,
    how: 'Ariza my.gov.uz orqali beriladi, qaror 5 ish kunida qabul qilinadi. Kredit bitirgandan keyin 7-oydan boshlab 7 yil davomida qaytariladi; ijtimoiy reyestrdagi oilalar farzandlaridan garov talab etilmaydi.',
    basis: 'Prezidentning 2024-yil 27-maydagi PF–82-son farmoni',
    url: 'https://gov.uz/oz/edu/news/view/214742',
    source: 'gov.uz — Ta’lim va ilm-fan vazirligi',
  },
  {
    id: 'xalqaro-imtihon',
    cat: 'talaba',
    t: 'Xalqaro imtihon xarajatlarini qoplash',
    badge: { l: 'Qoplanadi', v: 'Imtihon to‘lovi to‘liq' },
    icon: 'sertifikat',
    who: 'Imtihon kuni 31 yoshga to‘lmagan, belgilangan ballni olgan O‘zbekiston fuqarolari (IELTS 7.0 va undan yuqori, SAT, TOEFL, TOPIK, HSK, TestDaF va boshqa 18 ta imtihon)',
    amount: 'Imtihon uchun to‘langan summa to‘liq qaytariladi',
    how: 'Ariza sertifikat olingan kundan boshlab 180 kun ichida my.gov.uz orqali beriladi; mablag‘ tekshiruvdan so‘ng Xalq banki orqali to‘lanadi.',
    basis: 'Vazirlar Mahkamasining 2021-yil 13-apreldagi 209-son qarori',
    url: 'https://infoedu.uz/xalqaro-imtihon-xarajatlari-yil-oxirigacha-26-ming-yoshga-qoplanadi',
    source: 'infoedu.uz',
  },
  /* ---------- Öquvçilar ---------- */
  {
    id: 'transport',
    cat: 'oquvchi',
    t: 'Toshkent shahar jamoat transportida 50 foiz chegirma',
    badge: { l: 'Tarif rejalariga', v: '50 foiz chegirma' },
    icon: 'avtobus',
    who: 'O‘quvchilar va talabalar',
    amount: 'Jamoat transportining tarif rejalari (oylik yo‘l kartalari) narxining 50 foizi',
    how: 'Chegirma o‘quvchi yoki talaba guvohnomasi asosida rasmiylashtirilgan transport kartasi orqali qo‘llanadi; bir martalik yo‘l haqiga tatbiq etilmaydi.',
    basis: 'Vazirlar Mahkamasining 2012-yil 17-sentabrdagi 273-son qarori',
    url: 'https://infoedu.uz/toshkentda-yol-haqi-oshadi-talabalarga-chegirma',
    source: 'infoedu.uz',
  },
  {
    id: 'darsliklar',
    cat: 'oquvchi',
    t: 'Darsliklarni bepul ijaraga berish',
    badge: { l: 'Umumta’lim maktablarida', v: 'Bepul' },
    icon: 'kitob',
    who: 'Umumta’lim maktablarining barcha o‘quvchilari',
    amount: 'Darslik va mavzu daftarlari ijarasi davlat budjeti hisobidan',
    how: 'Darsliklar o‘quv yili boshida maktab kutubxonasi orqali beriladi.',
    basis: 'Davlat budjeti mablag‘lari hisobidan',
    url: 'https://xalqtaliminfo.uz/en/post/1439',
    source: 'xalqtaliminfo.uz',
  },
  {
    id: 'birinchi-sinf',
    cat: 'oquvchi',
    t: '1-sinf o‘quvchilariga “Prezident sovg‘asi”',
    badge: { l: 'Har bir birinchi sinf o‘quvchisiga', v: '12 turdagi o‘quv qurollari' },
    icon: 'sovga',
    who: 'Davlat va nodavlat umumta’lim maktablarining 1-sinf o‘quvchilari',
    amount: '12 turdagi o‘quv qurollari to‘plami',
    how: 'Sovg‘alar o‘quv yili boshlanishi arafasida maktablar orqali topshiriladi.',
    basis: 'Prezident tashabbusi asosida har yili',
    url: 'https://infoedu.uz/1-sinf-oquvchilariga-prezident-sovgalari-25-avgustga-qadar-yetkaziladi',
    source: 'infoedu.uz',
  },
  {
    id: 'sanat-maktablari',
    cat: 'oquvchi',
    t: 'San’at va madaniyat maktablarida bepul ta’lim va yashash',
    badge: { l: '2026/2027 o‘quv yilidan', v: 'Davlat hisobidan' },
    icon: 'nota',
    who: 'Madaniyat vazirligi tizimidagi ixtisoslashtirilgan san’at va madaniyat maktablari o‘quvchilari',
    amount: 'O‘qish va yotoqxonada yashash xarajatlari to‘liq davlat budjeti hisobidan',
    how: 'Alohida ariza talab etilmaydi; xarajatlar maktab budjeti orqali qoplanadi.',
    basis: 'Prezidentning 2026-yil 21-apreldagi PQ–150-son qarori',
    url: 'https://infoedu.uz/sanat-va-madaniyat-maktablarida-oqish-va-yashash-xarajatlari-endi-toliq-davlat-byudjetidan-qoplanadi',
    source: 'infoedu.uz',
  },
  {
    id: 'qoshimcha-talim-vaucher',
    cat: 'oquvchi',
    t: 'Qo‘shimcha ta’lim uchun vaucher',
    badge: { l: 'Yo‘l xarajatlari · oyiga', v: `${som(BHM.v)}gacha` },
    icon: 'vaucher',
    who: 'Oilasi ijtimoiy reyestrga kiritilgan o‘quvchilar',
    amount: `Darsdan tashqari (qo‘shimcha) ta’lim xarajatlari vaucher orqali; mashg‘ulotlarga qatnash uchun yo‘l xarajatlariga oyiga ${B(1)}gacha`,
    how: 'Vaucher 12 oy amal qiladi; mablag‘ ota-onaning ijtimoiy kartasiga o‘tkaziladi.',
    basis: 'Prezidentning 2026-yil 11-sentabrdagi PF–193-son farmoni',
    from: '2027-yil 1-yanvardan',
    url: 'https://anhor.uz/uzl/jamiyat/talaba-ijarasi-vaucher-orqali-qoplanadi',
    source: 'anhor.uz',
  },
  /* ---------- Yoşlar va yoş oilalar ---------- */
  {
    id: 'haydovchilik',
    cat: 'yosh',
    t: 'Haydovchilik kurslari xarajatlarini qoplash',
    badge: { l: 'Bir marta', v: `${som(8 * BHM.v)}gacha` },
    icon: 'avto',
    who: 'Oilasi ijtimoiy reyestrga kiritilgan 30 yoshgacha bo‘lgan yoshlar (A, B, D, DE toifalari)',
    amount: `Bir marta ${B(8)}gacha: yarmi kurs boshlanishida, qolgan qismi guvohnoma olingach to‘lanadi`,
    how: 'Ariza yoshlarning yagona elektron platformasi yoki mahalla yoshlar yetakchisi orqali beriladi; Yoshlar daftaridan yiliga ikki martagacha foydalanish mumkin.',
    basis: PF222_T,
    url: PF222,
    source: 'lex.uz',
  },
  {
    id: 'kurslar',
    cat: 'yosh',
    t: 'Kasb, til va axborot texnologiyalari kurslari xarajatlarini qoplash',
    badge: { l: 'Har oy, 6 oygacha', v: `${som(4 * BHM.v)}gacha` },
    icon: 'kurs',
    who: 'Oilasi ijtimoiy reyestrga kiritilgan yoshlar; fan, sport va san’atda iqtidorli yoshlar',
    amount: `Har oy ${B(4)}gacha, 6 oygacha; iqtidorli yoshlar uchun har oy ${B(1)}gacha`,
    how: 'Mablag‘ platformada ro‘yxatdan o‘tgan o‘quv markaziga to‘lanadi; mashg‘ulotlarga qatnash Face ID orqali nazorat qilinadi.',
    basis: `${PF222_T}; Vazirlar Mahkamasining 2026-yil 25-fevraldagi 78-son qarori`,
    url: PF222,
    source: 'lex.uz',
  },
  {
    id: 'ikki-olti',
    cat: 'yosh',
    t: '“2+6” xorijiy tillarni o‘rganish dasturi',
    badge: { l: 'Har oy, Toshkent shahrida', v: `${som(2 * BHM.v)}gacha` },
    icon: 'til',
    who: 'Boshlang‘ich darajadagi til sertifikatiga ega, dastlabki ikki oylik kurs to‘lovini o‘zi amalga oshirgan yoshlar',
    amount: `Keyingi 6 oy uchun har oy: Toshkent shahrida ${B(2)}gacha, Nukus va viloyat markazlarida ${B(1.5)}gacha, tumanlarda ${B(1)}gacha`,
    how: 'Dastur yiliga 20 000 nafar yoshni qamrab oladi. Dasturdan foydalangan yoshlar kurslar xarajatlarini qoplash imtiyozidan qayta foydalanmaydi.',
    basis: 'Vazirlar Mahkamasining 2025-yil oktabrdagi qarori',
    url: 'https://kun.uz/news/2025/10/09/26-dasturiga-muvofiq-yoshlarga-subsidiya-ajratiladi',
    source: 'kun.uz',
  },
  {
    id: 'yosh-oila-ijara',
    cat: 'yosh',
    t: 'Yosh oilalarga ijara to‘lovini qoplash',
    badge: { l: 'Har oy, 12 oygacha', v: `${som(3 * BHM.v)}gacha` },
    icon: 'uy',
    who: 'Ijtimoiy reyestrga kiritilgan yosh oilalar',
    amount: `Ijara haqining 50 foizi: oyiga ${B(2)}gacha; Toshkent, Nukus va viloyat markazlarida ${B(3)}gacha; 12 oygacha`,
    how: 'Ijara shartnomasi soliq organlarida ro‘yxatdan o‘tkazilgan bo‘lishi lozim; to‘lov ikkinchi oydan boshlab amalga oshiriladi.',
    basis: PF222_T,
    url: PF222,
    source: 'lex.uz',
  },
  {
    id: 'ijtimoiy-shartnoma',
    cat: 'yosh',
    t: 'Ijtimoiy shartnoma shartlarini namunali bajargan yoshlarni rag‘batlantirish',
    badge: { l: 'Yiliga bir marta', v: som(3 * BHM.v) },
    icon: 'yulduz',
    who: 'Ijtimoiy shartnoma shartlarini kamida 6 oy davomida yuqori darajada bajargan 1 000 nafar yosh',
    amount: `Yiliga bir marta ${B(3)}`,
    how: 'Nomzodlar Yoshlar daftari tizimidagi ijtimoiy shartnoma natijalari asosida aniqlanadi.',
    basis: PF222_T,
    url: PF222,
    source: 'lex.uz',
  },
  {
    id: 'harbiy-xizmat',
    cat: 'yosh',
    t: 'Muddatli harbiy xizmatni o‘taganlar uchun imtiyozlar',
    badge: { l: 'Davlat xizmatiga kirish testida', v: '+10 foiz ball' },
    icon: 'qalqon',
    who: 'Muddatli harbiy xizmatni o‘tagan va o‘tayotgan yoshlar',
    amount:
      'Xizmatdan boshatilgan yili oliy ta’limga kirish uchun til va fan sertifikatlari xarajatlari qoplanadi; xizmat davomida sirtqi bakalavriatda o‘qish; davlat xizmatiga kirish testida 10 foiz qo‘shimcha ball (2027-yil 1-apreldan); tadbirkorlik kreditlari foizining 6 foiz bandigacha kompensatsiyasi',
    how: 'Imtiyozlar tegishli platformalar (my.gov.uz, Yoshlar daftari) orqali harbiy xizmatni o‘taganlik to‘g‘risidagi hujjat asosida beriladi.',
    basis: 'Prezidentning 2026-yil 7-apreldagi PQ–134-son qarori',
    url: 'https://lex.uz/docs/8124852',
    source: 'lex.uz',
  },
  {
    id: 'yosh-tadbirkor-kredit',
    cat: 'yosh',
    t: 'Yosh tadbirkorlar uchun imtiyozli kreditlar',
    badge: { l: 'Garovsiz', v: '20 mln so‘mgacha' },
    icon: 'bank',
    who: '31 yoshga to‘lmagan yoshlar, talabalar va yosh tadbirkorlar',
    amount:
      '“Yoshlar biznesi” dasturi (Aloqabank) bo‘yicha 300 mln so‘mgacha, 7 yilgacha; “Kelajak tadbirkorlari” dasturi (O‘zmilliybank) bo‘yicha garovsiz 20 mln so‘mgacha, garov bilan 300 mln so‘mgacha',
    how: 'Ariza tegishli bank filiallari va mobil ilovalari orqali beriladi.',
    basis: 'Prezidentning 2026-yil iyundagi farmoni (2026–2028-yillar dasturi)',
    url: 'https://anhor.uz/uzl/news/talabalar-yosh-tadbirkorlarga-kredit',
    source: 'anhor.uz',
  },
]
