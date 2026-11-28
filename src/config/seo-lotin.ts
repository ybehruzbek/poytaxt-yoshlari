/**
 * QIDIRUV TIZIMLARI UCHUN MATNLAR — joriy (eski) lotin yozuvida, ataylab.
 *
 * Odamlar Google va Yandex'da “yoshlar ittifoqi”, “o'zbekiston”, “a'zo bo'lish” deb qidiradi; yangi alifbodagi
 * “yoşlar” shakli bilan qidiruv deyarli yo'q (2026-11-24 dagi Google/Yandex takliflari tahlili). Shuning uchun
 * faqat qidiruvga ko'rinadigan qatlam — sahifa <title>, meta tavsif, ulashish kartasi va JSON-LD — shu yozuvda.
 * Sayt sahifasidagi barcha matn yangi alifboda qoladi (foydalanuvchi qarori, 2026-11-24).
 * Bu fayl `pnpm imlo` tekshiruvidan chiqarilgan (scripts/imlo.ts → SKIP_FILES).
 *
 * Sarlavha: avval qidiriladigan so'z, oxirida qisqa brend. Tavsif: ~150 belgi, rasmiy uslubda.
 */

/** Tashkilotning to'liq rasmiy nomi (qidiruv uchun) */
export const NOM = 'O‘zbekiston yoshlar ittifoqi Toshkent shahar hududiy Kengashi'
export const ITTIFOQ = 'O‘zbekiston yoshlar ittifoqi'
export const SAHAR = 'Toshkent'
/** Sarlavhalar oxiridagi qisqa brend */
export const BREND = 'Yoshlar ittifoqi Toshkent'
/** Qidiruvda uchraydigan boshqa nomlar (JSON-LD alternateName) */
export const MUQOBIL_NOMLAR = [
  'Yoshlar ittifoqi Toshkent',
  'Toshkent shahar yoshlar ittifoqi',
  'Yoshlar ittifoqi Toshkent shahar Kengashi',
  'Özbekiston yoşlar ittifoqi Toşkent şahar hududiy Kengaşi', // imlo-ok: yangi alifbodagi shakli ham qidiruv uchun
]

export const BOSH = {
  t: `Yoshlar ittifoqi Toshkent — ${NOM}`,
  d: 'O‘zbekiston yoshlar ittifoqi Toshkent shahar hududiy Kengashining rasmiy sayti: yoshlar uchun grantlar, stipendiyalar, tanlovlar, imtiyozlar, OTT boshlang‘ich tashkilotlari va yangiliklar.',
}

type Matn = { t: string; d: string }

/** Menyu sahifalari: kalit — til prefiksisiz yo'l (/faoliyat/grantlar) */
export const SAHIFA: Record<string, Matn> = {
  '/biz-haqimizda/ittifoq': {
    t: 'O‘zbekiston yoshlar ittifoqi haqida: tashkil topishi, maqsad va vazifalari',
    d: 'O‘zbekiston yoshlar ittifoqi haqida ma’lumot: qachon tashkil topgan, maqsad va vazifalari, faoliyat yo‘nalishlari, loyihalari, imtiyozlari va xalqaro hamkorligi.',
  },
  '/biz-haqimizda/markaziy-kengash': {
    t: 'Yoshlar ittifoqi Markaziy Kengashi: rahbariyati va tarkibi',
    d: 'O‘zbekiston yoshlar ittifoqi Markaziy Kengashi: vakolatlari, tarkibi, raisi va rahbariyati, Ijroiya qo‘mitasi hamda aloqa ma’lumotlari.',
  },
  '/biz-haqimizda/hududiy-kengash': {
    t: 'Yoshlar ittifoqi Toshkent shahar Kengashi raisi va jamoasi',
    d: 'O‘zbekiston yoshlar ittifoqi Toshkent shahar hududiy Kengashi raisi, bo‘lim boshliqlari va mutaxassislari, ularning vazifalari va aloqa ma’lumotlari.',
  },
  '/biz-haqimizda/boshlangich-tashkilotlar': {
    t: 'Yoshlar ittifoqi boshlang‘ich tashkilotlari Toshkentda',
    d: 'O‘zbekiston yoshlar ittifoqining Toshkent shahridagi boshlang‘ich tashkilotlari: oliy ta’lim tashkilotlarida hamda harbiy qismlar va muassasalarda.',
  },
  '/biz-haqimizda/boshlangich-tashkilotlar/oliy-talim': {
    t: 'OTT yoshlar yetakchilari: universitetlardagi Yoshlar ittifoqi tashkilotlari',
    d: 'Toshkent shahridagi universitet va institutlardagi Yoshlar ittifoqi boshlang‘ich tashkilotlari, yoshlar yetakchilari, ularning qabul kunlari va aloqa ma’lumotlari.',
  },
  '/biz-haqimizda/boshlangich-tashkilotlar/harbiy': {
    t: 'Harbiy qismlardagi Yoshlar ittifoqi boshlang‘ich tashkilotlari',
    d: 'Toshkent shahridagi harbiy qismlar va muassasalarda faoliyat yuritayotgan O‘zbekiston yoshlar ittifoqi boshlang‘ich tashkilotlari va yoshlar yetakchilari.',
  },
  '/biz-haqimizda/hamkorlar': {
    t: 'Yoshlar ittifoqining hamkorlari',
    d: 'O‘zbekiston yoshlar ittifoqining hamkorlari: vazirlik va idoralar, davlat korxonalari, nodavlat notijorat tashkilotlar, OAV va xorijiy yoshlar tashkilotlari.',
  },
  '/faoliyat/yonalishlar': {
    t: 'Yoshlar ittifoqi faoliyat yo‘nalishlari',
    d: 'O‘zbekiston yoshlar ittifoqi Toshkent shahar hududiy Kengashi faoliyatining asosiy yo‘nalishlari: ta’lim, ilm-fan, madaniyat, sport, volontyorlik, bandlik va boshqalar.',
  },
  '/faoliyat/loyihalar': {
    t: 'Yoshlar loyihalari — Yoshlar ittifoqi loyihalari Toshkentda',
    d: 'Yoshlar ittifoqi Toshkent shahar hududiy Kengashi amalga oshirgan va amalga oshirayotgan yoshlar loyihalari: maqsadi, ishtirokchilari va natijalari.',
  },
  '/faoliyat/tadbirlar': {
    t: 'Yoshlar tadbirlari Toshkentda: kalendar va arxiv',
    d: 'Yoshlar ittifoqi Toshkent shahar hududiy Kengashining yaqinlashayotgan tadbirlari, forumlar, uchrashuvlar va 2023-yildan buyon o‘tkazilgan tadbirlar arxivi.',
  },
  '/faoliyat/elonlar': {
    t: 'Yoshlar uchun e’lonlar: tanlovlar, ro‘yxatdan o‘tish, chellenjlar',
    d: 'Yoshlar uchun tanlovlar, ro‘yxatdan o‘tish, chellenjlar va tadbirlar haqidagi so‘nggi e’lonlar — Yoshlar ittifoqi Toshkent shahar hududiy Kengashi.',
  },
  '/faoliyat/grantlar': {
    t: 'Yoshlar uchun grantlar 2026: startap, ilm-fan, ta’lim va xalqaro dasturlar',
    d: 'O‘zbekistonlik yoshlar uchun grantlar 2026: startap, ilm-fan, ta’lim, ijtimoiy loyihalar, madaniyat va xalqaro dasturlar — miqdori, shartlari va ariza muddatlari.',
  },
  '/faoliyat/stipendiyalar': {
    t: 'Stipendiyalar 2026: Prezident stipendiyasi, nomdor va xorijiy stipendiyalar',
    d: 'Prezident stipendiyasi, nomdor davlat stipendiyalari va xorijda o‘qish uchun stipendiyalar: kimlarga beriladi, miqdori, imtiyozlari va ariza topshirish muddatlari.',
  },
  '/faoliyat/tanlovlar': {
    t: 'Yoshlar uchun tanlovlar 2026: respublika va xalqaro tanlovlar',
    d: 'Yoshlar va talabalar uchun tanlovlar 2026: ilm-fan, madaniyat, san’at, adabiyot, tibbiyot, sport va raqamli ijod sohalarida — shartlari, mukofotlari va muddatlari.',
  },
  '/faoliyat/davlat-mukofotlari': {
    t: 'Zulfiya mukofoti, Mard o‘g‘lon, Kelajak bunyodkori: shartlari va nizomi',
    d: '“Zulfiya” mukofoti, “Mard o‘g‘lon” davlat mukofoti, “Kelajak bunyodkori” medali va “Ilg‘or ijodkor”: kimlarga beriladi, shartlari, hujjat topshirish tartibi va nizomlari.',
  },
  '/faoliyat/imtiyozlar': {
    t: 'Yoshlar va talabalar uchun imtiyozlar 2026: ijara, kontrakt, kredit',
    d: 'Yoshlar uchun imtiyozlar: talabalar ijarasi kompensatsiyasi, kontrakt to‘lovini qoplash, imtiyozli ta’lim krediti, Yoshlar daftari va boshqalar — miqdori va shartlari.',
  },
  '/faoliyat/volontyorlik': {
    t: 'Volontyorlik: volontyor bo‘lish tartibi, turlari va qonun',
    d: 'Volontyorlik nima, uning turlari va yo‘nalishlari, volontyor bo‘lish tartibi, onlayn ariza, sertifikat hamda volontyorlik faoliyati to‘g‘risidagi qonun bo‘yicha huquq va majburiyatlar.',
  },
  '/faoliyat/natijalar': {
    t: 'Yoshlar ittifoqi Toshkent: natijalar va hisobotlar',
    d: 'O‘zbekiston yoshlar ittifoqi Toshkent shahar hududiy Kengashi faoliyatining yillar kesimidagi asosiy natijalari va hisobotlari.',
  },
  '/yangiliklar': {
    t: 'Yoshlar yangiliklari — Yoshlar ittifoqi Toshkent',
    d: 'Yoshlar ittifoqi Toshkent shahar hududiy Kengashi, OTT boshlang‘ich tashkilotlari, yoshlar tadbirlari va yoshlar uchun imkoniyatlar haqidagi so‘nggi yangiliklar.',
  },
  '/hujjatlar/normativ': {
    t: 'Yoshlarga oid normativ-huquqiy hujjatlar',
    d: 'Yoshlarga oid davlat siyosati, O‘zbekiston yoshlar ittifoqi faoliyati hamda yoshlarga yaratilgan imkoniyat va imtiyozlarga doir qonunlar, farmonlar va qarorlar.',
  },
  '/hujjatlar/normativ/ustav': {
    t: 'O‘zbekiston yoshlar ittifoqi Ustavi (nizomi)',
    d: 'O‘zbekiston yoshlar ittifoqining Adliya vazirligida ro‘yxatdan o‘tkazilgan Ustavi: maqsad va vazifalar, a’zolik, rahbar organlari, tuzilmasi va mulki.',
  },
  '/hujjatlar/kengash': {
    t: 'Yoshlar ittifoqi Toshkent shahar Kengashi hujjatlari',
    d: 'O‘zbekiston yoshlar ittifoqi Toshkent shahar hududiy Kengashining qarorlari, ish rejalari va hisobotlari.',
  },
  '/hujjatlar/namunalar': {
    t: 'Yoshlar ittifoqiga a’zo bo‘lish arizasi va hujjat namunalari',
    d: 'Ariza va blanka namunalari: O‘zbekiston yoshlar ittifoqiga a’zo bo‘lish arizasi, murojaat va boshlang‘ich tashkilot hujjatlari.',
  },
  '/axborot-xizmati/fotogalereya': {
    t: 'Fotogalereya — Yoshlar ittifoqi Toshkent tadbirlari',
    d: 'Yoshlar ittifoqi Toshkent shahar hududiy Kengashi tadbirlaridan fotoalbomlar: uchrashuvlar, forumlar, yig‘ilishlar va sayohatlar.',
  },
  '/axborot-xizmati/videogalereya': {
    t: 'Videogalereya — Yoshlar ittifoqi Toshkent',
    d: 'Yoshlar ittifoqi Toshkent shahar hududiy Kengashi tadbirlaridan video lavhalar, reportajlar va maxsus ko‘rsatuvlar.',
  },
  '/axborot-xizmati/press-relizlar': {
    t: 'Press-relizlar — Yoshlar ittifoqi Toshkent axborot xizmati',
    d: 'Yoshlar ittifoqi Toshkent shahar hududiy Kengashi axborot xizmatining press-relizlari va ommaviy axborot vositalari uchun anonslari.',
  },
  '/axborot-xizmati/oav': {
    t: 'OAVda Yoshlar ittifoqi Toshkent shahar Kengashi haqida',
    d: 'Yoshlar ittifoqi Toshkent shahar hududiy Kengashi faoliyati haqida ommaviy axborot vositalari va davlat organlari saytlaridagi materiallar.',
  },
  '/boglanish/aloqa': {
    t: 'Yoshlar ittifoqi Toshkent: manzil, telefon va qabul kunlari',
    d: 'O‘zbekiston yoshlar ittifoqi Toshkent shahar hududiy Kengashi: telefon, elektron pochta, manzil, ish vaqti va rahbariyatning fuqarolarni qabul qilish jadvali.',
  },
  '/boglanish/savollar': {
    t: 'Yoshlar ittifoqi bo‘yicha ko‘p beriladigan savollar',
    d: 'A’zolik, imtiyozlar, boshlang‘ich tashkilotlar, tadbirlar va murojaatlar bo‘yicha O‘zbekiston yoshlar ittifoqiga ko‘p beriladigan savollar va javoblar.',
  },
  '/boglanish/murojaat': {
    t: 'Yoshlar ittifoqiga onlayn murojaat yuborish',
    d: 'O‘zbekiston yoshlar ittifoqi Toshkent shahar hududiy Kengashiga ariza, taklif yoki shikoyatni onlayn yuborish.',
  },
  '/boglanish/azo-bolish': {
    t: 'Yoshlar ittifoqiga a’zo bo‘lish: shartlari va ariza',
    d: 'O‘zbekiston yoshlar ittifoqiga a’zo bo‘lish shartlari, qabul qilish tartibi va onlayn ariza — Toshkent shahar hududiy Kengashi.',
  },
}
