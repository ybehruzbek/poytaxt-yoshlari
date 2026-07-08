// ===== POYTAXT YOSHLARI — STATIC DATA LAYER =====
// Barcha statik ma'lumotlar shu yerda

// ===== NAVIGATION =====
export const navLinks = [
  { href: "/tashkilot", label: "Biz haqimizda" },
  { href: "/faoliyat", label: "Yo'nalishlar" },
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
      { href: "/faoliyat/grantlar", label: "Grantlar va tanlovlar" },
      { href: "/faoliyat/volontyorlik", label: "Volontyorlik" },
      { href: "/faoliyat/talabalar", label: "Talabalar uchun" },
    ]
  },
  {
    title: "Axborot markazi",
    links: [
      { href: "/yangiliklar", label: "Barcha yangiliklar" },
      { href: "/galereya", label: "Fotogalereya" },
      { href: "/axborot-markazi/video", label: "Videolar" },
      { href: "/axborot-markazi/press-reliz", label: "OAV uchun" },
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
    image: "/images/news/news_strategy_1782905584191.png",
    featured: true,
  },
  {
    id: "2",
    title: "«Kelajak bunyodkori» tanlovining final bosqichi bo'lib o'tdi",
    excerpt: "Poytaxtimizdagi Yoshlar ijod saroyida o'tkazilgan tanlovning yakuniy bosqichida 100 dan ortiq iqtidorli yigit-qizlar o'zlarining innovatsion g'oyalari bilan bellashdilar.",
    date: "12 Noyabr 2024",
    tag: "Ta'lim",
    tagClass: "tag-green",
    image: "/images/news/news_education_1782905592898.png",
  },
  {
    id: "3",
    title: "Yosh sportchilarimiz xalqaro musobaqada 15 medal qo'lga kiritdi",
    excerpt: "Qozog'iston poytaxti Ostona shahrida bo'lib o'tgan yengil atletika bo'yicha xalqaro turnirda vakillarimiz munosib ishtirok etib, umumjamoa hisobida birinchi o'rinni egallashdi.",
    date: "8 Noyabr 2024",
    tag: "Sport",
    tagClass: "tag-orange",
    image: "/images/news/news_sports_modest.png",
  },
  {
    id: "4",
    title: "Toshkentda 'Raqamli Avlod' yosh dasturchilar xakatoni boshlandi",
    date: "5 Noyabr 2024",
    tag: "Texnologiya",
    tagClass: "tag-blue",
    image: "/images/news/news_hackathon_1782905609599.png",
  },
  {
    id: "5",
    title: "Yashil Makon: Poytaxt yoshlari 10 mingta daraxt ekishdi",
    date: "1 Noyabr 2024",
    tag: "Ekologiya",
    tagClass: "tag-green",
    image: "/images/news/news_eco_1782905632260.png",
  },
  {
    id: "6",
    title: "Xalqaro ta'lim ko'rgazmasida yoshlarimizning faol ishtiroki",
    date: "28 Oktyabr 2024",
    tag: "Ta'lim",
    tagClass: "tag-blue",
    image: "/images/news/news_exhibition_1782905641384.png",
  }
];

// ===== PROJECTS =====
export interface ProjectItem {
  id: string;
  title: string;
  desc: string;
  image: string;
  progress: number;
  status: string;
  category: string;
}

export const projects: ProjectItem[] = [
  {
    id: "1",
    title: "Yoshlar Texnoparki",
    desc: "Yosh innovatorlar uchun zamonaviy texnoparklar tarmog'ini yaratish va IT sohasiga yo'naltirish dasturi.",
    image: "/images/projects/project_technopark_1782905388110.png",
    progress: 75,
    status: "Faol",
    category: "IT va Innovatsiya"
  },
  {
    id: "2",
    title: "Digital Yoshlar",
    desc: "Raqamli savodxonlikni oshirish, dasturlash va sun'iy intellekt sohalarida bepul ta'lim berish.",
    image: "/images/projects/project_digital_1782905396676.png",
    progress: 85,
    status: "Faol",
    category: "IT va Innovatsiya"
  },
  {
    id: "3",
    title: "Kelajak O'qituvchilari",
    desc: "Ta'lim sohasida kadrlar tayyorlash, malaka oshirish va pedagogik kasbga jalb qilish dasturi.",
    image: "/images/projects/project_teachers_1782905407793.png",
    progress: 60,
    status: "Faol",
    category: "Ta'lim"
  },
  {
    id: "4",
    title: "Sport Salohiyati",
    desc: "Ommaviy sport va sog'lom turmush tarzini targ'ib qilish, yosh sportchilarni qo'llab-quvvatlash.",
    image: "/images/projects/project_sports_modest.png",
    progress: 70,
    status: "Faol",
    category: "Sport"
  },
  {
    id: "5",
    title: "Yashil Makon",
    desc: "Ekologik holatni yaxshilash, daraxt ekish va atrof-muhitni muhofaza qilish yoshlar harakati.",
    image: "/images/projects/project_eco_1782905423561.png",
    progress: 90,
    status: "Yakunlangan",
    category: "Ekologiya"
  },
  {
    id: "6",
    title: "Ishga Joylashtirish",
    desc: "Yoshlarni mehnat bozorida qo'llab-quvvatlash, kasbiy yo'nalish bo'yicha maslahat berish dasturi.",
    image: "/images/projects/project_employment_1782905711723.png",
    progress: 55,
    status: "Yangi",
    category: "Bandlik"
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

// ===== DIRECTIONS =====
export interface DirectionItem {
  slug: string;
  icon: string;
  iconBg: string;
  iconColor: string;
  title: string;
  desc: string;
  fullDesc: string;
  image: string;
  stats: { label: string; value: string }[];
  goals: string[];
}

export const directions: DirectionItem[] = [
  {
    slug: "talim",
    icon: "fa-graduation-cap",
    iconBg: "var(--blue-pale)",
    iconColor: "var(--blue)",
    title: "Ta'lim",
    desc: "Yoshlar bilim va ko'nikmalarini oshirish, xorijiy tillarni o'rganish va kasbiy rivojlanish dasturlari.",
    fullDesc: "Biz yoshlarning zamonaviy ta'lim olishlari uchun qulay shart-sharoitlar yaratamiz. Bepul xorijiy tillar kurslari, IT dasturlash darslari hamda zamonaviy kasblarga o'qitish orqali yoshlarning kelajakdagi muvaffaqiyatiga poydevor quramiz.",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1600",
    stats: [
      { label: "O'quv kurslar", value: "150+" },
      { label: "O'qitilgan yoshlar", value: "25k+" },
      { label: "O'qituvchilar", value: "300+" }
    ],
    goals: [
      "Zamonaviy IT va til kurslarini har bir hududga yetkazish",
      "Ta'lim sifatini xalqaro standartlarga moslashtirish",
      "Iqtidorli o'quvchilarga maxsus grantlar ajratish"
    ]
  },
  {
    slug: "rahbarlik",
    icon: "fa-crown",
    iconBg: "var(--green-pale)",
    iconColor: "var(--green)",
    title: "Rahbarlik",
    desc: "Yosh yetakchilarni aniqlash, ularni tayyorlash va qo'llab-quvvatlash bo'yicha maxsus dasturlar.",
    fullDesc: "Kelajak rahbarlarini yetishtirish bizning asosiy vazifalarimizdan biridir. Yoshlar parlamentlari, mahalliy kengashlardagi yosh deputatlar va maxsus 'Rahbarlar maktabi' dasturlari doirasida biz yetakchilik qobiliyatlarini shakllantiramiz.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1600",
    stats: [
      { label: "Tayyorlangan rahbarlar", value: "1,200+" },
      { label: "Treninglar soni", value: "450+" },
      { label: "Viloyatlar bo'ylab qamrov", value: "100%" }
    ],
    goals: [
      "Yosh yetakchilar uchun maxsus 'Rahbarlar Maktabi' tarmog'ini yaratish",
      "Menejment va strategik rejalashtirish bo'yicha xalqaro tajriba almashish",
      "Davlat boshqaruviga iqtidorli yoshlarni jalb etish"
    ]
  },
  {
    slug: "volontyorlik",
    icon: "fa-handshake-angle",
    iconBg: "#FEE2E2",
    iconColor: "#EF4444",
    title: "Volontyorlik",
    desc: "Jamiyatga foyda keltiradigan volontyorlik loyihalari va aksiyalarni tashkil etish.",
    fullDesc: "Biz mehr-oqibat va o'zaro yordamni qadrlaymiz. O'zbekiston bo'ylab o'n minglab ko'ngilli yoshlarimiz ekologik aksiyalarda, qariyalarga yordam berishda va yirik xalqaro tadbirlarda faol qatnashib kelmoqdalar.",
    image: "https://images.unsplash.com/photo-1593113563332-ce147cb37783?auto=format&fit=crop&q=80&w=1600",
    stats: [
      { label: "Faol volontyorlar", value: "50k+" },
      { label: "Ekologik aksiyalar", value: "800+" },
      { label: "Yordam ko'rsatilgan oilalar", value: "10k+" }
    ],
    goals: [
      "Ko'ngillilar harakatini milliy miqyosda kuchaytirish",
      "Har bir mahallada volontyorlar guruhlarini shakllantirish",
      "Yirik xalqaro musobaqa va anjumanlarda volontyorlar faoliyatini tashkil etish"
    ]
  },
  {
    slug: "tadbirkorlik",
    icon: "fa-rocket",
    iconBg: "#FEF3C7",
    iconColor: "#D97706",
    title: "Tadbirkorlik",
    desc: "Yosh tadbirkorlarni qo'llab-quvvatlash, startup loyihalar va biznes treninglar.",
    fullDesc: "Biz yoshlarni nafaqat o'qiymiz, balki ularni ishbilarmonlikka yo'naltiramiz. Startap loyihalariga investitsiyalar jalb qilish, biznesni boshlash uchun imtiyozli kreditlar va bepul kovorking markazlari aynan bizning yosh tadbirkorlar uchun yaratilgan.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1600",
    stats: [
      { label: "Startap loyihalar", value: "300+" },
      { label: "Ajratilgan grantlar", value: "12 mlrd" },
      { label: "Yaratilgan ish o'rinlari", value: "4,500+" }
    ],
    goals: [
      "Yoshlar texnoparklarida yangi startaplarni inkubatsiyadan o'tkazish",
      "Biznes-reja tuzish va marketing bo'yicha bepul master-klasslar",
      "Yosh tadbirkorlar uchun maxsus yarmarkalar tashkil etish"
    ]
  },
  {
    slug: "talaba-yoshlari",
    icon: "fa-school",
    iconBg: "#F3E8FF",
    iconColor: "#7C3AED",
    title: "Talaba yoshlari",
    desc: "Oliy o'quv yurtlari talabalarining faolligini oshirish va qo'llab-quvvatlash.",
    fullDesc: "Oliy ta'lim muassasalarida tahsil olayotgan talabalar uchun maxsus loyihalar, stipendiyalar va xalqaro almashinuv dasturlarini amalga oshiramiz. Har bir OTM dagi yoshlar yetakchilari talabalar hayotini qiziqarli qilish uchun ishlaydi.",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1600",
    stats: [
      { label: "Qamrab olingan OTMlar", value: "120+" },
      { label: "Stipendiya sohiblari", value: "1,500+" },
      { label: "Xalqaro dasturlar", value: "45+" }
    ],
    goals: [
      "Talabalar uchun yotoqxonalarda qulayliklarni oshirish bo'yicha nazorat",
      "Iqtidorli talabalar uchun ilmiy konferensiyalar o'tkazish",
      "OTMlar aro sport va intellektual bellashuvlar tashkil etish"
    ]
  },
  {
    slug: "madaniyat",
    icon: "fa-palette",
    iconBg: "#FCE7F3",
    iconColor: "#EC4899",
    title: "Madaniyat",
    desc: "Milliy madaniyat, san'at va ijodiy loyihalar orqali yoshlarni rivojlantirish.",
    fullDesc: "Yoshlar orasida milliy merosimizni saqlash, teatr va san'at to'garaklari orqali yoshlarning ijodkorligini yuzaga chiqarish uchun turli festivallar o'tkazamiz. 'Yosh kitobxon' va shunga o'xshash loyihalar yoshlar ongini boyitishga yordam beradi.",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=1600",
    stats: [
      { label: "Madaniy tadbirlar", value: "1,200+" },
      { label: "Kitobxonlar", value: "300k+" },
      { label: "Teatr truppalari", value: "50+" }
    ],
    goals: [
      "Chekka hududlarda ko'chma kutubxonalar va teatrlar tashkil etish",
      "Yosh ijodkorlar uchun maxsus ko'rgazmalar o'tkazish",
      "Milliy maqom va baxshichilik san'atini yoshlar orasida targ'ib qilish"
    ]
  },
  {
    slug: "sport",
    icon: "fa-dumbbell",
    iconBg: "#FFEDD5",
    iconColor: "#EA580C",
    title: "Sport",
    desc: "Sog'lom turmush tarzini targ'ib qilish va sport musobaqalarini tashkil etish.",
    fullDesc: "Sport – yoshlar sog'lig'i va kelajagi garovidir. Biz yoshlar o'rtasida 'Besh tashabbus' olimpiadasi doirasida minifutbol, voleybol, stritbol va shaxmat bo'yicha millionlab yoshlarni qamrab oluvchi yirik sport tadbirlarini tashkil etamiz.",
    image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=1600",
    stats: [
      { label: "Olimpiada ishtirokchilari", value: "5 mln+" },
      { label: "Sport maydonchalari qurildi", value: "2,500+" },
      { label: "Xalqaro chempionlar", value: "120+" }
    ],
    goals: [
      "Ommaviy sportni mahallalar darajasiga tushirish",
      "Imkoniyati cheklangan yoshlar uchun parasportni rivojlantirish",
      "Yosh sportchilarni xalqaro arenalarga tayyorlash"
    ]
  },
  {
    slug: "ijtimoiy-loyihalar",
    icon: "fa-hand-holding-heart",
    iconBg: "#CCFBF1",
    iconColor: "#0D9488",
    title: "Ijtimoiy loyihalar",
    desc: "Ijtimoiy ahamiyatga molik grant loyihalar va jamoat tashabbuslari.",
    fullDesc: "Jamiyatimizning ijtimoiy ehtiyojmand qatlamlarini himoya qilish maqsadida biz alohida e'tibor talab etadigan yoshlarga psixologik, huquqiy va tibbiy yordam ko'rsatish bo'yicha kompleks chora-tadbirlarni amalga oshiramiz.",
    image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&q=80&w=1600",
    stats: [
      { label: "Huquqiy maslahatlar", value: "15k+" },
      { label: "Tibbiy yordam aksiyalari", value: "400+" },
      { label: "Qamrab olingan mahkumlar", value: "2,000+" }
    ],
    goals: [
      "Yoshlar daftari orqali ijtimoiy yordamni manzilli yetkazish",
      "Psixologik ko'mak markazlari faoliyatini kuchaytirish",
      "Huquqbuzarlikka moyil yoshlarni sog'lom hayotga qaytarish"
    ]
  }
];

// ===== DISTRICTS =====
export interface DistrictItem {
  name: string;
  youth: string;
  lat: number;
  lng: number;
  image: string;
}

export const districts: DistrictItem[] = [
  { name: "Bektemir", youth: "12,500+", lat: 41.2268, lng: 69.3248, image: "https://images.unsplash.com/photo-1584227092102-14eb0234a9ee?auto=format&fit=crop&q=80&w=800" },
  { name: "Chilanzar", youth: "95,000+", lat: 41.2750, lng: 69.2000, image: "https://images.unsplash.com/photo-1621213444036-7c60368140db?auto=format&fit=crop&q=80&w=800" },
  { name: "Yashnobod", youth: "78,000+", lat: 41.2952, lng: 69.3400, image: "https://images.unsplash.com/photo-1584949547514-6eec4e414c54?auto=format&fit=crop&q=80&w=800" },
  { name: "Mirobod", youth: "65,000+", lat: 41.2882, lng: 69.2818, image: "https://images.unsplash.com/photo-1502691866380-60b6af24e135?auto=format&fit=crop&q=80&w=800" },
  { name: "Mirzo Ulug'bek", youth: "110,000+", lat: 41.3323, lng: 69.3430, image: "https://images.unsplash.com/photo-1594980596870-8caa52a7eb80?auto=format&fit=crop&q=80&w=800" },
  { name: "Olmazor", youth: "120,000+", lat: 41.3500, lng: 69.2215, image: "https://images.unsplash.com/photo-1616016766488-81bf0529d3f1?auto=format&fit=crop&q=80&w=800" },
  { name: "Sergeli", youth: "85,000+", lat: 41.2201, lng: 69.2265, image: "https://images.unsplash.com/photo-1585002037920-7f282490b07b?auto=format&fit=crop&q=80&w=800" },
  { name: "Shayxontohur", youth: "72,000+", lat: 41.3263, lng: 69.2319, image: "https://images.unsplash.com/photo-1634149020967-17ed4ceca512?auto=format&fit=crop&q=80&w=800" },
  { name: "Uchtepa", youth: "88,000+", lat: 41.2891, lng: 69.1764, image: "https://images.unsplash.com/photo-1596700777174-8b6348c4cf3c?auto=format&fit=crop&q=80&w=800" },
  { name: "Yakkasaroy", youth: "55,000+", lat: 41.2812, lng: 69.2555, image: "https://images.unsplash.com/photo-1574701148212-8518049c7b2c?auto=format&fit=crop&q=80&w=800" },
  { name: "Yunusobod", youth: "70,000+", lat: 41.3653, lng: 69.2844, image: "https://images.unsplash.com/photo-1601555562095-2dfb94420e79?auto=format&fit=crop&q=80&w=800" },
  { name: "Yangihayot", youth: "45,000+", lat: 41.1963, lng: 69.2045, image: "https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?auto=format&fit=crop&q=80&w=800" },
];

// ===== LEADERSHIP =====
export interface LeaderItem {
  id: string;
  name: string;
  position: string;
  image: string;
}

export const leaders: LeaderItem[] = [
  { id: "1", name: "Karimov Jasur", position: "Toshkent shahar Kengashi raisi", image: "/images/leaders/leader_jasur_1782906199502.png" },
  { id: "2", name: "Toshmatova Nilufar", position: "Birinchi o'rinbosar", image: "/images/leaders/leader_nilufar_1782906209134.png" },
  { id: "3", name: "Saidov Bobur", position: "O'rinbosar — tashkilot ishi", image: "/images/leaders/leader_bobur_1782906218310.png" },
  { id: "4", name: "Xasanova Madina", position: "Loyihalar bo'yicha koordinator", image: "/images/leaders/leader_madina_1782906226072.png" },
];

// ===== YOUTH LEADERS =====
export interface YouthLeaderItem {
  id: string;
  name: string;
  place: string;
  image: string;
  category: "Oliygoh" | "Mahalla" | "Maktab";
}

export const youthLeaders: YouthLeaderItem[] = [
  { id: "1", name: "Raxmadjonova Nilufar", place: "INHA Universiteti", image: nilufarImg.src, category: "Oliygoh" },
  { id: "2", name: "Rustamova Shahnoza", place: "Yunusobod tumani, 'Minor' mahallasi", image: "https://picsum.photos/seed/youth-leader-2/400/500.jpg", category: "Mahalla" },
  { id: "3", name: "Ismoilov Doston", place: "O'zbekiston Milliy Universiteti", image: "https://picsum.photos/seed/youth-leader-3/400/500.jpg", category: "Oliygoh" },
  { id: "4", name: "Aliyeva Malika", place: "Chilonzor tumani, 'Bog'zor' mahallasi", image: "https://picsum.photos/seed/youth-leader-4/400/500.jpg", category: "Mahalla" },
];

// ===== DOCUMENTS =====
export interface DocumentItem {
  title: string;
  type: string;
  size: string;
  date: string;
  iconBg: string;
  iconColor: string;
  icon: string;
}

export const documents: DocumentItem[] = [
  { title: "Yoshlar Ittifoqi Nizomi", type: "PDF", size: "2.4 MB", date: "15 Yanvar 2025", iconBg: "#FEE2E2", iconColor: "#EF4444", icon: "fa-file-pdf" },
  { title: "2024 yil yillik hisobot", type: "PDF", size: "5.1 MB", date: "10 Yanvar 2025", iconBg: "var(--blue-pale)", iconColor: "var(--blue)", icon: "fa-file-circle-check" },
  { title: "Tashkilot tuzilmasi va lavozimlar yo'riqnomasi", type: "PDF", size: "1.8 MB", date: "5 Yanvar 2025", iconBg: "var(--green-pale)", iconColor: "var(--green)", icon: "fa-scroll" },
  { title: "Grant loyihalari uchun ariza shakli", type: "DOCX", size: "340 KB", date: "1 Yanvar 2025", iconBg: "#F3E8FF", iconColor: "#7C3AED", icon: "fa-file-lines" },
  { title: "Buyruqlar to'plami (2024)", type: "PDF", size: "8.3 MB", date: "28 Dekabr 2024", iconBg: "#FEF3C7", iconColor: "#D97706", icon: "fa-clock-rotate-left" },
];

// ===== GALLERY =====
export const galleryImages = [
  { src: "https://picsum.photos/seed/gallery-youth-1/600/600", full: "https://picsum.photos/seed/gallery-youth-1/1200/1200", alt: "Yoshlar tadbiri", aspect: "square" as const },
  { src: "https://picsum.photos/seed/gallery-youth-2/600/800", full: "https://picsum.photos/seed/gallery-youth-2/800/1200", alt: "Yoshlar loyihasi", aspect: "tall" as const },
  { src: "https://picsum.photos/seed/gallery-youth-3/600/600", full: "https://picsum.photos/seed/gallery-youth-3/1200/1200", alt: "Volontyorlik", aspect: "square" as const },
  { src: "/images/projects/project_sports_modest.png", full: "/images/projects/project_sports_modest.png", alt: "Sport musobaqasi", aspect: "square" as const },
  { src: "https://picsum.photos/seed/gallery-youth-5/600/600", full: "https://picsum.photos/seed/gallery-youth-5/1200/1200", alt: "Konferentsiya", aspect: "square" as const },
  { src: "https://picsum.photos/seed/gallery-youth-6/600/600", full: "https://picsum.photos/seed/gallery-youth-6/1200/1200", alt: "Madaniy tadbir", aspect: "square" as const },
  { src: "https://picsum.photos/seed/gallery-youth-7/600/600", full: "https://picsum.photos/seed/gallery-youth-7/1200/1200", alt: "Rasmiy uchrashuv", aspect: "square" as const },
] as const;

// ===== APPEAL TYPES =====
export const appealTypes = [
  "Taklif",
  "Murojaat",
  "Shikoyat",
  "Tashabbus",
  "Savol",
] as const;

// ===== APPEAL GUARANTEES =====
export const appealGuarantees = [
  { icon: "fa-shield-halved", iconBg: "var(--blue-pale)", iconColor: "var(--blue)", title: "Maxfiylik kafolati", desc: "Barcha murojaatlar maxfiy holda ko'rib chiqiladi." },
  { icon: "fa-clock", iconBg: "var(--green-pale)", iconColor: "var(--green)", title: "Tezkor javob", desc: "Murojaatlarga 3 ish kuni ichida javob beriladi." },
  { icon: "fa-circle-check", iconBg: "#FEF3C7", iconColor: "#D97706", title: "Natijaga yo'naltirilgan", desc: "Har bir murojaat amaliy natijaga erishishga qaratiladi." },
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
  { href: "/tashkilot#tashkilot", label: "Tashkilot haqida" },
  { href: "/faoliyat#yonalishlar", label: "Yo'nalishlar" },
  { href: "/faoliyat#loyihalar", label: "Loyihalar" },
  { href: "/axborot-markazi#yangiliklar", label: "Yangiliklar" },
  { href: "/axborot-markazi#galeriya", label: "Galeriya" },
] as const;

export const footerResources = [
  { href: "/tashkilot#hujjatlar", label: "Hujjatlar" },
  { href: "/murojaat#murojaat", label: "Murojaat" },
  { href: "/hududlar#tumanlar", label: "Tumanlar" },
  { href: "/tashkilot#rahbariyat", label: "Rahbariyat" },
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

// ===== LOGO URL =====
import logoImg from "@/public/logo.png";
import heroImg from "@/public/login-bg-1920.jpeg";
import nilufarImg from "@/public/nilufar.jpg";

export const LOGO_URL = logoImg.src;
export const HERO_IMAGE_URL = heroImg.src;
