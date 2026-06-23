// ===== POYTAXT YOSHLARI — STATIC DATA LAYER =====
// Barcha statik ma'lumotlar shu yerda

// ===== NAVIGATION =====
export const navLinks = [
  { href: "#biz-haqimizda", label: "Biz haqimizda" },
  { href: "#yonalishlar", label: "Yo'nalishlar" },
  { href: "#loyihalar", label: "Loyihalar" },
  { href: "#yangiliklar", label: "Yangiliklar" },
  { href: "#tumanlar", label: "Tumanlar" },
  { href: "#rahbariyat", label: "Rahbariyat" },
  { href: "#hujjatlar", label: "Hujjatlar" },
  { href: "#galeriya", label: "Galeriya" },
  { href: "#murojaat", label: "Murojaat" },
] as const;

// ===== MINI STATS =====
export const miniStats = [
  { target: 500000, label: "A'zolar soni", showPlus: true },
  { target: 14, label: "Viloyat filiallari", showPlus: false },
  { target: 1200, label: "Amalga oshirilgan loyihalar", showPlus: true },
  { target: 33, label: "Faoliyat yillari", showPlus: true },
] as const;

// ===== ABOUT CARDS =====
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

// ===== TIMELINE =====
export const timelineItems = [
  { year: "1991", text: "Mustaqillik yilida tashkilotga asos solingan" },
  { year: "1995", text: "Birinchi qurultoy o'tkazilib, Nizom tasdiqlangan" },
  { year: "2017", text: "«Kelajak bunyodkori» loyihasi ishga tushirilgan" },
  { year: "2021", text: "Tashkilot tizimi isloh qilingan, yangi struktura joriy etilgan" },
  { year: "2024", text: "«Yoshlar — kelajak kafolati» davlat dasturi doirasida keng ko'lamli ishlar boshlangan" },
] as const;

// ===== NEWS =====
export interface NewsItem {
  id: string;
  title: string;
  excerpt?: string;
  date: string;
  tag: string;
  tagClass: string;
  image: string;
  featured?: boolean;
}

export const newsItems: NewsItem[] = [
  {
    id: "1",
    title: "Yoshlar Ittifoqi 2025-yil uchun yangi strategiya dasturini tasdiqladi",
    excerpt: "Markaziy Kengashning navbatdagi yig'ilishida 2025-yilga mo'ljallangan keng qamrovli strategiya dasturi muhokama qilindi va tasdiqlandi. Raqamlash, ijtimoiy himoya va ta'lim sohalaridagi ustuvor yo'nalishlar belgilab olindi.",
    date: "15 Noyabr 2024",
    tag: "Strategiya",
    tagClass: "tag-blue",
    image: "https://picsum.photos/seed/youth-strategy-uzb/800/500",
    featured: true,
  },
  {
    id: "2",
    title: "«Kelajak bunyodkori» tanlovining final bosqichi bo'lib o'tdi",
    date: "12 Noyabr 2024",
    tag: "Ta'lim",
    tagClass: "tag-green",
    image: "https://picsum.photos/seed/kelajak-bunyodkori-uz/400/300",
  },
  {
    id: "3",
    title: "Yosh sportchilarimiz xalqaro musobaqada 15 medal qo'lga kiritdi",
    date: "8 Noyabr 2024",
    tag: "Sport",
    tagClass: "tag-orange",
    image: "https://picsum.photos/seed/youth-sport-medals-uz/400/300",
  },
];

// ===== PROJECTS =====
export interface ProjectItem {
  id: string;
  title: string;
  desc: string;
  image: string;
  progress: number;
  status: string;
}

export const projects: ProjectItem[] = [
  {
    id: "1",
    title: "Yoshlar Texnoparki",
    desc: "Yosh innovatorlar uchun zamonaviy texnoparklar tarmog'ini yaratish va IT sohasiga yo'naltirish dasturi.",
    image: "https://picsum.photos/seed/technopark-youth-uz/600/400",
    progress: 75,
    status: "Faol",
  },
  {
    id: "2",
    title: "Digital Yoshlar",
    desc: "Raqamli savodxonlikni oshirish, dasturlash va sun'iy intellekt sohalarida bepul ta'lim berish.",
    image: "https://picsum.photos/seed/digital-youth-uz/600/400",
    progress: 85,
    status: "Faol",
  },
  {
    id: "3",
    title: "Kelajak O'qituvchilari",
    desc: "Ta'lim sohasida kadrlar tayyorlash, malaka oshirish va pedagogik kasbga jalb qilish dasturi.",
    image: "https://picsum.photos/seed/future-teachers-uz/600/400",
    progress: 60,
    status: "Faol",
  },
  {
    id: "4",
    title: "Sport Salohiyati",
    desc: "Ommaviy sport va sog'lom turmush tarzini targ'ib qilish, yosh sportchilarni qo'llab-quvvatlash.",
    image: "https://picsum.photos/seed/sport-potential-uz/600/400",
    progress: 70,
    status: "Faol",
  },
  {
    id: "5",
    title: "Yashil Makon",
    desc: "Ekologik mas'uliyatni oshirish, yashil hududlarni kengaytirish va atrof-muhitni muhofaza qilish.",
    image: "https://picsum.photos/seed/green-space-eco-uz/600/400",
    progress: 45,
    status: "Faol",
  },
  {
    id: "6",
    title: "Ishga Joylashtirish",
    desc: "Yoshlarni mehnat bozorida qo'llab-quvvatlash, kasbiy yo'nalish bo'yicha maslahat berish dasturi.",
    image: "https://picsum.photos/seed/employment-youth-uz/600/400",
    progress: 55,
    status: "Faol",
  },
];

// ===== FULL STATS =====
export const fullStats = [
  { target: 500000, suffix: "+", label: "A'zolar soni" },
  { target: 14, suffix: "", label: "Viloyat filiallari" },
  { target: 33, suffix: "+", label: "Yillik faoliyat" },
  { target: 1200, suffix: "+", label: "Loyihalar amalga oshirildi" },
] as const;

// ===== MAP REGIONS =====
export interface MapRegion {
  name: string;
  head: string;
  desc: string;
  points: string;
}

export const mapRegions: MapRegion[] = [
  { name: "Qoraqalpog'iston Respublikasi", head: "A. Qo'chqorov", desc: "12 ta tuman va 1 ta shahar bo'yicha faol ish olib boradi. Ekologiya va yoshlar masalalari ustuvor yo'nalishlar.", points: "18,95 55,55 115,60 130,105 125,170 82,195 35,175 18,140" },
  { name: "Xorazm viloyati", head: "D. Yo'ldoshev", desc: "10 ta tuman filiali faoliyat yuritadi. Tarixiy meros va turizm sohasida yoshlarni jalb qilish loyihalari.", points: "55,55 118,22 168,32 152,60 115,60" },
  { name: "Buxoro viloyati", head: "Sh. Rahimov", desc: "11 ta tuman filiali mavjud. Hunarmandchilik va madaniyat dasturlari orqali yoshlarni qo'llab-quvvatlash.", points: "130,105 165,88 210,98 222,148 178,178 125,170 132,135" },
  { name: "Navoiy viloyati", head: "B. Tursunov", desc: "8 ta tuman filiali ishlaydi. Sanoat va texnologik ta'limga alohida e'tibor qaratilmoqda.", points: "168,32 222,42 260,72 248,122 222,148 210,98 165,88 152,60" },
  { name: "Jizzax viloyati", head: "M. Azimov", desc: "12 ta tuman bo'yicha filiallar faol. Qishloq yoshlarini qo'llab-quvvatlash dasturlari amalga oshirilmoqda.", points: "260,72 308,55 338,88 322,135 248,122" },
  { name: "Sirdaryo viloyati", head: "K. Nazarov", desc: "9 ta tuman filiali mavjud. Qishloq xo'jaligi va tadbirkorlik yo'nalishlarida yoshlarni qo'llab-quvvatlash.", points: "338,88 372,65 402,88 392,125 322,135" },
  { name: "Toshkent viloyati", head: "S. Karimov", desc: "15 ta tuman filiali keng ko'lamli faoliyat olib boradi. Poytaxt atrofida yoshlar uchun zamonaviy imkoniyatlar.", points: "372,65 420,38 458,55 448,105 402,88" },
  { name: "Toshkent shahri", head: "J. Xolmatov", desc: "11 ta tuman bo'yicha filiallar faol. IT, ta'lim va madaniyat sohalarida eng ko'p loyihalar shu yerda.", points: "425,65 445,58 452,72 448,88 435,85 425,78" },
  { name: "Samarqand viloyati", head: "R. Mirzayev", desc: "14 ta tuman filiali ishlaydi. Turizm, ta'lim va xalqaro aloqalar yo'nalishlarida faol.", points: "222,148 260,72 248,122 322,135 302,178 242,190 222,168" },
  { name: "Qashqadaryo viloyati", head: "F. Bozorov", desc: "13 ta tuman filiali mavjud. Madaniy meros va sport dasturlari rivojlanmoqda.", points: "222,168 242,190 302,178 322,215 272,252 208,238 155,210 125,170 178,178" },
  { name: "Surxondaryo viloyati", head: "H. Oripov", desc: "13 ta tuman filiali faoliyat yuritadi. Ekoturizm va yoshlar tadbirkorligi yo'nalishlarida ishlar.", points: "302,178 322,215 382,242 415,268 395,298 332,292 272,252" },
  { name: "Namangan viloyati", head: "I. Toshmatov", desc: "11 ta tuman filiali mavjud. Hunarmandchilik va kichik tadbirkorlikni rivojlantirish dasturlari.", points: "420,38 458,55 468,72 462,112 448,105" },
  { name: "Andijon viloyati", head: "N. Madaminov", desc: "14 ta tuman filiali faol. San'at va madaniyat sohasida yoshlar salohiyatini ochish loyihalari.", points: "458,55 492,42 502,62 468,72" },
  { name: "Farg'ona viloyati", head: "Y. Qodirov", desc: "15 ta tuman filiali keng ko'lamli ish olib boradi. Tadbirkorlik, ta'lim va sport sohalarida faol loyihalar.", points: "468,72 502,62 515,90 502,128 480,132 462,112" },
];

// ===== CTA BENEFITS =====
export const ctaBenefits = [
  "Bepul ta'lim kurslari, seminarlar va master-klasslar",
  "Grant dasturlari va yirik loyihalarda ishtirok",
  "Butun mamlakat bo'yicha professional tarmoq",
] as const;

// ===== FOOTER =====
export const footerNav = [
  { href: "#bosh-sahifa", label: "Bosh sahifa" },
  { href: "#tashkilot", label: "Tashkilot haqida" },
  { href: "#yangiliklar", label: "Yangiliklar" },
  { href: "#loyihalar", label: "Loyihalar" },
  { href: "#hududlar", label: "Hududlar" },
] as const;

export const footerResources = [
  { href: "#", label: "Yoshlar siyosati" },
  { href: "#", label: "Grant dasturlari" },
  { href: "#", label: "Ta'lim markazlari" },
  { href: "#", label: "Me'yoriy hujjatlar" },
  { href: "#", label: "Ochiq ma'lumotlar" },
] as const;

export const footerContact = [
  { icon: "fa-map-marker-alt", text: "Toshkent sh., Shayxontohur t., Zarqaynar ko'chasi, 3-uy" },
  { icon: "fa-phone", text: "+998 71 232-44-88" },
  { icon: "fa-envelope", text: "info@yoshlarittifoqi.uz" },
  { icon: "fa-clock", text: "Dush — Shan: 09:00 — 18:00" },
] as const;

export const socialLinks = [
  { href: "#", icon: "fa-telegram-plane", label: "Telegram" },
  { href: "#", icon: "fa-instagram", label: "Instagram" },
  { href: "#", icon: "fa-youtube", label: "YouTube" },
  { href: "#", icon: "fa-facebook-f", label: "Facebook" },
] as const;

// ===== LOGO URL =====
export const LOGO_URL = "/logo.png";

export const HERO_IMAGE_URL = "/login-bg.jpg";
