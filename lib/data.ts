// ===== POYTAXT YOSHLARI — SAYT TUZILMASI =====
//
// Bu yerda faqat SAYT TUZILMASI turadi: navigatsiya, footer, aloqa ma'lumotlari.
// Bular kod bilan birga o'zgaradi (yangi sahifa qo'shilsa — yangi menyu bandi).
//
// KONTENT (yangiliklar, loyihalar, rahbariyat, hujjatlar, ...) bu yerda EMAS.
// U bazada saqlanadi va `lib/queries.ts` orqali o'qiladi. Admin panel orqali
// tahrirlanadi. Kontentni bu faylga qaytarib qo'shmang — ikkita manba bo'lib
// qoladi va ular bir-biriga zid bo'lib ketadi.

// ===== NAVIGATION =====
export const navLinks = [
  { href: "/tashkilot", label: "Biz haqimizda" },
  { href: "/faoliyat", label: "Yo'nalishlar" },
  { href: "/tadbirlar", label: "Tadbirlar" },
  { href: "/loyihalar", label: "Loyihalar" },
  { href: "/yangiliklar", label: "Yangiliklar" },
  { href: "/hududlar", label: "Tumanlar" },
  { href: "/rahbariyat", label: "Rahbariyat" },
  { href: "/yetakchilar", label: "Yetakchilar" },
  { href: "/hujjatlar", label: "Hujjatlar" },
  { href: "/galereya", label: "Galeriya" },
] as const;

// ===== MEGA MENU =====
export const megaMenuCategories = [
  {
    title: "Tashkilot haqida",
    links: [
      { href: "/tashkilot", label: "Tashkilot haqida" },
      { href: "/tashkilot/missiya", label: "Missiya va qadriyatlar" },
      { href: "/tashkilot/tarix", label: "Tariximiz" },
      { href: "/rahbariyat", label: "Rahbariyat" },
      { href: "/hujjatlar", label: "Hujjatlar" },
    ]
  },
  {
    title: "Faoliyat",
    links: [
      { href: "/faoliyat", label: "Barcha yo'nalishlar" },
      { href: "/loyihalar", label: "Asosiy loyihalar" },
      { href: "/tadbirlar", label: "Tadbirlar" },
      { href: "/faoliyat/volontyorlik", label: "Volontyorlik" },
      { href: "/faoliyat/talaba-yoshlari", label: "Talabalar uchun" },
    ]
  },
  {
    title: "Axborot markazi",
    links: [
      { href: "/yangiliklar", label: "Barcha yangiliklar" },
      { href: "/galereya", label: "Fotogalereya" },
      { href: "/axborot-markazi", label: "Media markaz" },
    ]
  },
  {
    title: "Hududlar",
    links: [
      { href: "/hududlar", label: "Tumanlar ro'yxati" },
      { href: "/yetakchilar", label: "Mahalliy yetakchilar" },
    ]
  },
  {
    title: "Foydali",
    links: [
      { href: "/murojaat#murojaat", label: "Murojaat yuborish" },
      { href: "/murojaat#savol-javob", label: "Ko'p beriladigan savollar" },
      { href: "/murojaat#aloqa", label: "Qayta aloqa" },
    ]
  }
];

// ===== ABOUT CARDS =====
// Tashkilotning doimiy tamoyillari — kontent emas, sahifa tuzilmasi.
export const aboutCards = [
  {
    icon: "fa-shield-halved",
    iconClass: "blue" as const,
    title: "Huquqlarni himoya qilish",
    desc: "Yoshlarning ijtimoiy-iqtisodiy, siyosiy va ma'naviy huquqlarini faol himoya qilish, qonuniy manfaatlarini ta'minlash.",
  },
  {
    icon: "fa-graduation-cap",
    iconClass: "green" as const,
    title: "Ta'lim va rivojlanish",
    desc: "Bilim va ko'nikmalarni oshirish, kasbiy maslahat berish, zamonaviy ta'lim dasturlarini tashkil etish.",
  },
  {
    icon: "fa-rocket",
    iconClass: "green" as const,
    title: "Innovatsiyalar va texnologiyalar",
    desc: "Yosh innovatorlar, dasturchilar va tadbirkorlarni qo'llab-quvvatlash, startap ekotizimini rivojlantirish.",
  },
  {
    icon: "fa-handshake",
    iconClass: "blue" as const,
    title: "Jamiyatda ishtirok",
    desc: "Faol fuqarolik pozitsiyasini shakllantirish, volontyorlik va ijtimoiy loyihalarni tashkil etish.",
  },
] as const;

// ===== CTA BENEFITS =====
export const ctaBenefits = [
  "Bepul ta'lim kurslari, seminarlar va master-klasslar",
  "Grant dasturlari va yirik loyihalarda ishtirok",
  "Butun mamlakat bo'yicha professional tarmoq",
] as const;

// ===== APPEAL TYPES =====
// Murojaat toifalari — server tomonda validatsiya uchun ham shu ro'yxat ishlatiladi
// (lib/validation.ts). Yangi toifa qo'shsangiz, ikkalasi ham yangilanadi.
export const appealTypes = [
  "Taklif",
  "Murojaat",
  "Shikoyat",
  "Tashabbus",
  "Savol",
] as const;

export type AppealType = (typeof appealTypes)[number];

// ===== APPEAL GUARANTEES =====
export const appealGuarantees = [
  { icon: "fa-shield-halved", iconBg: "var(--blue-pale)", iconColor: "var(--blue)", title: "Maxfiylik kafolati", desc: "Barcha murojaatlar maxfiy holda ko'rib chiqiladi." },
  { icon: "fa-clock", iconBg: "var(--green-pale)", iconColor: "var(--green)", title: "Tezkor javob", desc: "Murojaatlarga 3 ish kuni ichida javob beriladi." },
  { icon: "fa-circle-check", iconBg: "#FEF3C7", iconColor: "#D97706", title: "Natijaga yo'naltirilgan", desc: "Har bir murojaat amaliy natijaga erishishga qaratiladi." },
] as const;

// ===== FAQ (Ko'p beriladigan savollar) =====
// Murojaat jarayoni haqidagi doimiy tushuntirishlar — sahifa tuzilmasining qismi.
export const faqItems = [
  {
    q: "Murojaatimga qancha vaqtda javob berasiz?",
    a: "Har bir murojaat ro'yxatga olinadi va mas'ul xodimga biriktiriladi. Dastlabki aloqa 3 ish kuni ichida, yakuniy javob esa murojaat murakkabligiga qarab 15 kungacha bo'lgan muddatda beriladi.",
  },
  {
    q: "Ittifoqqa a'zo bo'lish uchun nima qilishim kerak?",
    a: "Murojaat formasida «Tashabbus» turini tanlab, o'zingiz haqingizda qisqacha yozing — tumaningizdagi bo'lim mas'ul xodimi siz bilan bog'lanadi va a'zolik jarayonini tushuntiradi.",
  },
  {
    q: "Loyiha yoki g'oyamni qanday taqdim etaman?",
    a: "Formada «Taklif» turini tanlab, g'oyangizni qisqacha bayon qiling. Loyihangiz ekspertlar tomonidan ijtimoiy ahamiyati bo'yicha ko'rib chiqiladi va natija haqida sizga xabar beriladi.",
  },
  {
    q: "Tadbirlarga qatnashish pullikmi?",
    a: "Yo'q, Yoshlar Ittifoqi tashkil etadigan tadbirlar yoshlar uchun bepul. Ayrim tadbirlarda o'rinlar soni cheklangan bo'ladi — shuning uchun tadbir sahifasida oldindan ro'yxatdan o'ting.",
  },
  {
    q: "Yuborgan ma'lumotlarim kimga ko'rinadi?",
    a: "Murojaatingiz faqat uni ko'rib chiqadigan mas'ul xodimlarga ko'rinadi va maxfiylik siyosatiga muvofiq qayta ishlanadi. Ma'lumotlar uchinchi shaxslarga berilmaydi.",
  },
  {
    q: "Tumanimdagi bo'lim bilan qanday bog'lanaman?",
    a: "«Hududlar» sahifasida barcha tuman bo'limlari va ularning yetakchilari ko'rsatilgan. O'z tumaningizni tanlab, bevosita mahalliy bo'lim bilan bog'lanishingiz mumkin.",
  },
] as const;

// ===== CONTACT INFO =====
export const contactInfoItems = [
  {
    label: "Manzil",
    value: "O'zMU Madaniyat saroy, Universitet Ko'chasi, Toshkent, Oʻzbekiston",
    icon: "fa-map-marker-alt",
    iconBg: "var(--blue-pale)",
    iconColor: "var(--blue)",
  },
  { icon: "fa-phone", iconBg: "var(--green-pale)", iconColor: "var(--green)", label: "Telefon", values: ["+998 71 233 55 77", "+998 71 233 55 78"] },
  { icon: "fa-envelope", iconBg: "#FEF3C7", iconColor: "#D97706", label: "Email", value: "info@yoshlartoshkent.uz" },
] as const;

// ===== FOOTER =====
export const footerNav = [
  { href: "/", label: "Bosh sahifa" },
  { href: "/tashkilot", label: "Tashkilot haqida" },
  { href: "/faoliyat#yonalishlar", label: "Yo'nalishlar" },
  { href: "/tadbirlar", label: "Tadbirlar" },
  { href: "/faoliyat#loyihalar", label: "Loyihalar" },
  { href: "/axborot-markazi#yangiliklar", label: "Yangiliklar" },
  { href: "/axborot-markazi#galeriya", label: "Galeriya" },
] as const;

export const footerResources = [
  { href: "/hujjatlar", label: "Hujjatlar" },
  { href: "/murojaat#murojaat", label: "Murojaat" },
  { href: "/hududlar#tumanlar", label: "Tumanlar" },
  { href: "/rahbariyat", label: "Rahbariyat" },
  { href: "/murojaat#aloqa", label: "Aloqa" },
] as const;

export const footerContact = [
  { icon: "fa-map-marker-alt", text: "Universitet Ko'chasi, Toshkent, Oʻzbekiston" },
  { icon: "fa-phone", text: "+998 71 233 55 77" },
  { icon: "fa-envelope", text: "info@yoshlartoshkent.uz" },
  { icon: "fa-clock", text: "Dush — Juma: 9:00 — 18:00" },
] as const;

export const socialLinks = [
  { href: "#", icon: "fa-telegram-plane", label: "Telegram" },
  { href: "#", icon: "fa-instagram", label: "Instagram" },
  { href: "#", icon: "fa-youtube", label: "YouTube" },
  { href: "#", icon: "fa-facebook-f", label: "Facebook" },
] as const;

// ===== BRAND ASSETS =====
import logoImg from "@/public/logo.png";
import heroImg from "@/public/login-bg-1920.jpeg";

export const LOGO_URL = logoImg.src;
export const HERO_IMAGE_URL = heroImg.src;
