/**
 * Talabalar, öquvçilar va yoşlar uçun davlat imtiyozlari: kompensatsiyalar, kontrakt tölovini qoplaş, moddiy yordam,
 * chegirmalar. Faqat amaldagi yoki kuçga kiriş sanasi belgilangan normativ hujjatlar asosida.
 * Miqdorlar lib/miqdorlar.ts dagi BHM ga bog'langan: BHM özgarsa, summalar özi qayta hisoblanadi.
 */
import { BHM, MB_STAVKA, rateFull, som } from '@/lib/miqdorlar'

export type BenefitCat = 'talaba' | 'oquvchi' | 'yosh'

export const BENEFIT_CATS: { key: BenefitCat; t: string }[] = [
  { key: 'talaba', t: 'Talabalar' },
  { key: 'oquvchi', t: 'Öquvçilar' },
  { key: 'yosh', t: 'Yoşlar va yoş oilalar' },
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
const PF222_T = 'Prezidentning 2025-yil 20-noyabrdagi PF–222-son farmoni (Yoşlar daftari)'

export const BENEFITS: Benefit[] = [
  /* ---------- Talabalar ---------- */
  {
    id: 'ijara',
    cat: 'talaba',
    t: 'Ijara tölovining bir qismini qoplaş',
    badge: { l: 'Har oy · Toşkent şahrida', v: som(BHM.v) },
    icon: 'uy',
    who: 'Davlat oliy taʼlim taşkilotlarining kunduzgi taʼlim şaklidagi, yotoqxonada joy berilmagan, doimiy yaşaş joyidan boşqa tuman (şahar)da ijarada yaşab öqiyotgan talabalari',
    amount: `Toşkent şahrida ${B(1)}, boşqa hududlarda ${B(0.5)} — har oy`,
    how: 'Ariza har oyning 7-sanasigaça kontrakt.edu.uz yoki my.gov.uz orqali beriladi. Ijara şartnomasi ijara.soliq.uz tizimida röyxatdan ötkazilgan bölişi lozim. Kam taʼminlangan oilalar farzandlari va aʼlo baholarga öqiydigan talabalarga ustuvorlik beriladi.',
    basis: 'Vazirlar Mahkamasining 2021-yil 24-sentabrdagi 605-son qarori',
    url: 'https://talimxabarlari.uz/82445/',
    source: 'talimxabarlari.uz',
  },
  {
    id: 'yotoqxona',
    cat: 'talaba',
    t: 'Yotoqxona tölovini qoplaş',
    badge: { l: 'Qoplanadi', v: 'Yotoqxona tölovi töliq' },
    icon: 'yotoq',
    who: 'Oilasi “Ijtimoiy himoya yagona reyestri”ga kiritilgan, davlat oliy taʼlim taşkilotlarida kunduzgi taʼlim şaklida öqiyotgan talabalar',
    amount:
      'Oliy taʼlim taşkiloti kengaşi tasdiqlagan yotoqxona tölovi töliq miqdorda; yotoqxonaga joylaştirişda ustuvorlik',
    how: 'Ariza har öquv yili uçun bir marta kontrakt.edu.uz orqali beriladi; mablağ talabaning bank kartasiga tölanadi.',
    basis: 'Vazirlar Mahkamasining 2026-yil 28-yanvardagi 32-son qarori',
    url: 'https://infoedu.uz/ijtimoiy-reyestr-yotoqxona-tolovi-qoplanadi',
    source: 'infoedu.uz',
  },
  {
    id: 'magistr-qizlar',
    cat: 'talaba',
    t: 'Magistraturada öqiyotgan xotin-qizlarning kontrakt tölovini qoplaş',
    badge: { l: 'Kontrakt tölovi', v: '100 foiz davlat hisobidan' },
    icon: 'magistr',
    who: 'Davlat oliy taʼlim taşkilotlari magistraturasida tölov-kontrakt asosida öqiyotgan barça xotin-qizlar',
    amount: 'Bazaviy kontrakt summasining 100 foizi, qaytarilmaydigan asosda',
    how: 'Ariza har yili 15-sentabrgaça oliy taʼlim taşkiloti rektoriga beriladi; qaror rektor buyruği bilan rasmiylaştiriladi. Differensial kontrakt va qöşma taʼlim dasturlariga tatbiq etilmaydi.',
    basis: 'Vazirlar Mahkamasining 2022-yil 15-avgustdagi 447-son qarori',
    url: 'https://gov.uz/oz/edu/news/view/201736',
    source: 'gov.uz — Taʼlim va ilm-fan vazirligi',
  },
  {
    id: 'reyestr-kontrakt',
    cat: 'talaba',
    t: 'Ijtimoiy reyestrdagi oilalar farzandlarining kontrakt tölovini qoplaş',
    badge: { l: 'Kontraktning 50 foizigaça', v: `${som(50 * BHM.v)}gaça` },
    icon: 'kontrakt',
    who: 'Oilasi ijtimoiy reyestrga kiritilgan, kunduzgi taʼlim şaklida öqiyotgan 14–30 yoşdagi talabalar (davlat, nodavlat va xorijiy oliy taʼlim taşkilotlari)',
    amount: `Kontrakt summasining 50 foizigaça, öquv yili uçun ${B(50)}dan oşmagan miqdorda`,
    how: 'Ariza my.gov.uz orqali beriladi, qarorni mahalla yettiligi qabul qiladi. Ijtimoiy şartnoma şartlari: ölçirma bali kamida 4, volontyorlik, oyiga kamida bitta kitob öqiş, xorijiy tilni B1 darajasida egallaş.',
    basis: PF222_T,
    url: PF222,
    source: 'lex.uz',
  },
  {
    id: 'pedagog-farzandi',
    cat: 'talaba',
    t: 'Pedagoglar farzandlariga kontrakt çegirmasi',
    badge: { l: 'Kontrakt tölovidan', v: '30 foiz çegirma' },
    icon: 'kitob',
    who: 'Davlat oliy taʼlim taşkilotlarining kunduzgi bakalavriatida öqiyotgan pedagoglar farzandlari',
    amount: 'Kontrakt summasining 30 foizi, har öquv yili uçun, har bir farzandga alohida',
    how: 'Çegirma pedagog maqomi idoralararo axborot almaşinuvi orqali tasdiqlangaç kontrakt.edu.uz tizimida avtomatik qöllanadi.',
    basis: 'Vazirlar Mahkamasining 2026-yil 17-sentabrdagi 501-son qarori',
    url: 'https://gov.uz/oz/edu/news/view/222430',
    source: 'gov.uz — Taʼlim va ilm-fan vazirligi',
  },
  {
    id: 'talim-krediti',
    cat: 'talaba',
    t: 'Taʼlim krediti',
    badge: { l: 'Xotin-qizlar uçun', v: 'Foizsiz kredit' },
    icon: 'bank',
    who: 'Kunduzgi bakalavriat va magistratura talabalari, texnikum öquvçilari',
    amount: `Birinçi kursda kontraktning 100 foizigaça; xotin-qizlar uçun foizsiz, yigitlar uçun Markaziy bankning asosiy stavkasida (${MB_STAVKA.v} foiz)`,
    how: 'Ariza my.gov.uz orqali beriladi, qaror 5 iş kunida qabul qilinadi. Kredit bitirgandan keyin 7-oydan boşlab 7 yil davomida qaytariladi; ijtimoiy reyestrdagi oilalar farzandlaridan garov talab etilmaydi.',
    basis: 'Prezidentning 2024-yil 27-maydagi PF–82-son farmoni',
    url: 'https://gov.uz/oz/edu/news/view/214742',
    source: 'gov.uz — Taʼlim va ilm-fan vazirligi',
  },
  {
    id: 'xalqaro-imtihon',
    cat: 'talaba',
    t: 'Xalqaro imtihon xarajatlarini qoplaş',
    badge: { l: 'Qoplanadi', v: 'Imtihon tölovi töliq' },
    icon: 'sertifikat',
    who: 'Imtihon kuni 31 yoşga tölmagan, belgilangan ballni olgan Özbekiston fuqarolari (IELTS 7.0 va undan yuqori, SAT, TOEFL, TOPIK, HSK, TestDaF va boşqa 18 ta imtihon)',
    amount: 'Imtihon uçun tölangan summa töliq qaytariladi',
    how: 'Ariza sertifikat olingan kundan boşlab 180 kun içida my.gov.uz orqali beriladi; mablağ tekşiruvdan söng Xalq banki orqali tölanadi.',
    basis: 'Vazirlar Mahkamasining 2021-yil 13-apreldagi 209-son qarori',
    url: 'https://infoedu.uz/xalqaro-imtihon-xarajatlari-yil-oxirigacha-26-ming-yoshga-qoplanadi',
    source: 'infoedu.uz',
  },
  /* ---------- Öquvçilar ---------- */
  {
    id: 'transport',
    cat: 'oquvchi',
    t: 'Toşkent şahar jamoat transportida 50 foiz çegirma',
    badge: { l: 'Tarif rejalariga', v: '50 foiz çegirma' },
    icon: 'avtobus',
    who: 'Öquvçilar va talabalar',
    amount: 'Jamoat transportining tarif rejalari (oylik yöl kartalari) narxining 50 foizi',
    how: 'Çegirma öquvçi yoki talaba guvohnomasi asosida rasmiylaştirilgan transport kartasi orqali qöllanadi; bir martalik yöl haqiga tatbiq etilmaydi.',
    basis: 'Vazirlar Mahkamasining 2012-yil 17-sentabrdagi 273-son qarori',
    url: 'https://infoedu.uz/toshkentda-yol-haqi-oshadi-talabalarga-chegirma',
    source: 'infoedu.uz',
  },
  {
    id: 'darsliklar',
    cat: 'oquvchi',
    t: 'Darsliklarni bepul ijaraga beriş',
    badge: { l: 'Umumtaʼlim maktablarida', v: 'Bepul' },
    icon: 'kitob',
    who: 'Umumtaʼlim maktablarining barça öquvçilari',
    amount: 'Darslik va mavzu daftarlari ijarasi davlat budjeti hisobidan',
    how: 'Darsliklar öquv yili boşida maktab kutubxonasi orqali beriladi.',
    basis: 'Davlat budjeti mablağlari hisobidan',
    url: 'https://xalqtaliminfo.uz/en/post/1439',
    source: 'xalqtaliminfo.uz',
  },
  {
    id: 'birinchi-sinf',
    cat: 'oquvchi',
    t: '1-sinf öquvçilariga “Prezident sovğasi”',
    badge: { l: 'Har bir birinçi sinf öquvçisiga', v: '12 turdagi öquv qurollari' },
    icon: 'sovga',
    who: 'Davlat va nodavlat umumtaʼlim maktablarining 1-sinf öquvçilari',
    amount: '12 turdagi öquv qurollari töplami',
    how: 'Sovğalar öquv yili boşlanişi arafasida maktablar orqali topşiriladi.',
    basis: 'Prezident taşabbusi asosida har yili',
    url: 'https://infoedu.uz/1-sinf-oquvchilariga-prezident-sovgalari-25-avgustga-qadar-yetkaziladi',
    source: 'infoedu.uz',
  },
  {
    id: 'sanat-maktablari',
    cat: 'oquvchi',
    t: 'Sanʼat va madaniyat maktablarida bepul taʼlim va yaşaş',
    badge: { l: '2026/2027 öquv yilidan', v: 'Davlat hisobidan' },
    icon: 'nota',
    who: 'Madaniyat vazirligi tizimidagi ixtisoslaştirilgan sanʼat va madaniyat maktablari öquvçilari',
    amount: 'Öqiş va yotoqxonada yaşaş xarajatlari töliq davlat budjeti hisobidan',
    how: 'Alohida ariza talab etilmaydi; xarajatlar maktab budjeti orqali qoplanadi.',
    basis: 'Prezidentning 2026-yil 21-apreldagi PQ–150-son qarori',
    url: 'https://infoedu.uz/sanat-va-madaniyat-maktablarida-oqish-va-yashash-xarajatlari-endi-toliq-davlat-byudjetidan-qoplanadi',
    source: 'infoedu.uz',
  },
  {
    id: 'qoshimcha-talim-vaucher',
    cat: 'oquvchi',
    t: 'Qöşimça taʼlim uçun vauçer',
    badge: { l: 'Yöl xarajatlari · oyiga', v: `${som(BHM.v)}gaça` },
    icon: 'vaucher',
    who: 'Oilasi ijtimoiy reyestrga kiritilgan öquvçilar',
    amount: `Darsdan taşqari (qöşimça) taʼlim xarajatlari vauçer orqali; maşğulotlarga qatnaş uçun yöl xarajatlariga oyiga ${B(1)}gaça`,
    how: 'Vauçer 12 oy amal qiladi; mablağ ota-onaning ijtimoiy kartasiga ötkaziladi.',
    basis: 'Prezidentning 2026-yil 11-sentabrdagi PF–193-son farmoni',
    from: '2027-yil 1-yanvardan',
    url: 'https://anhor.uz/uzl/jamiyat/talaba-ijarasi-vaucher-orqali-qoplanadi',
    source: 'anhor.uz',
  },
  /* ---------- Yoşlar va yoş oilalar ---------- */
  {
    id: 'haydovchilik',
    cat: 'yosh',
    t: 'Haydovçilik kurslari xarajatlarini qoplaş',
    badge: { l: 'Bir marta', v: `${som(8 * BHM.v)}gaça` },
    icon: 'avto',
    who: 'Oilasi ijtimoiy reyestrga kiritilgan 30 yoşgaça bölgan yoşlar (A, B, D, DE toifalari)',
    amount: `Bir marta ${B(8)}gaça: yarmi kurs boşlanişida, qolgan qismi guvohnoma olingaç tölanadi`,
    how: 'Ariza yoşlarning yagona elektron platformasi yoki mahalla yoşlar yetakçisi orqali beriladi; Yoşlar daftaridan yiliga ikki martagaça foydalaniş mumkin.',
    basis: PF222_T,
    url: PF222,
    source: 'lex.uz',
  },
  {
    id: 'kurslar',
    cat: 'yosh',
    t: 'Kasb, til va axborot texnologiyalari kurslari xarajatlarini qoplaş',
    badge: { l: 'Har oy, 6 oygaça', v: `${som(4 * BHM.v)}gaça` },
    icon: 'kurs',
    who: 'Oilasi ijtimoiy reyestrga kiritilgan yoşlar; fan, sport va sanʼatda iqtidorli yoşlar',
    amount: `Har oy ${B(4)}gaça, 6 oygaça; iqtidorli yoşlar uçun har oy ${B(1)}gaça`,
    how: 'Mablağ platformada röyxatdan ötgan öquv markaziga tölanadi; maşğulotlarga qatnaş Face ID orqali nazorat qilinadi.',
    basis: `${PF222_T}; Vazirlar Mahkamasining 2026-yil 25-fevraldagi 78-son qarori`,
    url: PF222,
    source: 'lex.uz',
  },
  {
    id: 'ikki-olti',
    cat: 'yosh',
    t: '“2+6” xorijiy tillarni örganiş dasturi',
    badge: { l: 'Har oy, Toşkent şahrida', v: `${som(2 * BHM.v)}gaça` },
    icon: 'til',
    who: 'Boşlanğiç darajadagi til sertifikatiga ega, dastlabki ikki oylik kurs tölovini özi amalga oşirgan yoşlar',
    amount: `Keyingi 6 oy uçun har oy: Toşkent şahrida ${B(2)}gaça, Nukus va viloyat markazlarida ${B(1.5)}gaça, tumanlarda ${B(1)}gaça`,
    how: 'Dastur yiliga 20 000 nafar yoşni qamrab oladi. Dasturdan foydalangan yoşlar kurslar xarajatlarini qoplaş imtiyozidan qayta foydalanmaydi.',
    basis: 'Vazirlar Mahkamasining 2025-yil oktabrdagi qarori',
    url: 'https://kun.uz/news/2025/10/09/26-dasturiga-muvofiq-yoshlarga-subsidiya-ajratiladi',
    source: 'kun.uz',
  },
  {
    id: 'yosh-oila-ijara',
    cat: 'yosh',
    t: 'Yoş oilalarga ijara tölovini qoplaş',
    badge: { l: 'Har oy, 12 oygaça', v: `${som(3 * BHM.v)}gaça` },
    icon: 'uy',
    who: 'Ijtimoiy reyestrga kiritilgan yoş oilalar',
    amount: `Ijara haqining 50 foizi: oyiga ${B(2)}gaça; Toşkent, Nukus va viloyat markazlarida ${B(3)}gaça; 12 oygaça`,
    how: 'Ijara şartnomasi soliq organlarida röyxatdan ötkazilgan bölişi lozim; tölov ikkinçi oydan boşlab amalga oşiriladi.',
    basis: PF222_T,
    url: PF222,
    source: 'lex.uz',
  },
  {
    id: 'ijtimoiy-shartnoma',
    cat: 'yosh',
    t: 'Ijtimoiy şartnoma şartlarini namunali bajargan yoşlarni rağbatlantiriş',
    badge: { l: 'Yiliga bir marta', v: som(3 * BHM.v) },
    icon: 'yulduz',
    who: 'Ijtimoiy şartnoma şartlarini kamida 6 oy davomida yuqori darajada bajargan 1 000 nafar yoş',
    amount: `Yiliga bir marta ${B(3)}`,
    how: 'Nomzodlar Yoşlar daftari tizimidagi ijtimoiy şartnoma natijalari asosida aniqlanadi.',
    basis: PF222_T,
    url: PF222,
    source: 'lex.uz',
  },
  {
    id: 'harbiy-xizmat',
    cat: 'yosh',
    t: 'Muddatli harbiy xizmatni ötaganlar uçun imtiyozlar',
    badge: { l: 'Davlat xizmatiga kiriş testida', v: '+10 foiz ball' },
    icon: 'qalqon',
    who: 'Muddatli harbiy xizmatni ötagan va ötayotgan yoşlar',
    amount:
      'Xizmatdan boşatilgan yili oliy taʼlimga kiriş uçun til va fan sertifikatlari xarajatlari qoplanadi; xizmat davomida sirtqi bakalavriatda öqiş; davlat xizmatiga kiriş testida 10 foiz qöşimça ball (2027-yil 1-apreldan); tadbirkorlik kreditlari foizining 6 foiz bandigaça kompensatsiyasi',
    how: 'Imtiyozlar tegişli platformalar (my.gov.uz, Yoşlar daftari) orqali harbiy xizmatni ötaganlik töğrisidagi hujjat asosida beriladi.',
    basis: 'Prezidentning 2026-yil 7-apreldagi PQ–134-son qarori',
    url: 'https://lex.uz/docs/8124852',
    source: 'lex.uz',
  },
  {
    id: 'yosh-tadbirkor-kredit',
    cat: 'yosh',
    t: 'Yoş tadbirkorlar uçun imtiyozli kreditlar',
    badge: { l: 'Garovsiz', v: '20 mln sömgaça' },
    icon: 'bank',
    who: '31 yoşga tölmagan yoşlar, talabalar va yoş tadbirkorlar',
    amount:
      '“Yoşlar biznesi” dasturi (Aloqabank) böyiça 300 mln sömgaça, 7 yilgaça; “Kelajak tadbirkorlari” dasturi (Özmilliybank) böyiça garovsiz 20 mln sömgaça, garov bilan 300 mln sömgaça',
    how: 'Ariza tegişli bank filiallari va mobil ilovalari orqali beriladi.',
    basis: 'Prezidentning 2026-yil iyundagi farmoni (2026–2028-yillar dasturi)',
    url: 'https://anhor.uz/uzl/news/talabalar-yosh-tadbirkorlarga-kredit',
    source: 'anhor.uz',
  },
]
