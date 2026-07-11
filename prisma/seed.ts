import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { slugify } from "../lib/slug";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL .env da bo'lishi shart.");
}
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

/**
 * Seed idempotent: bo'sh bo'lmagan jadvalga tegmaydi. Aks holda admin panel
 * orqali qo'shilgan kontent har `npm run db:seed` da yo'q bo'lib ketardi.
 * Butunlay tozalash uchun: `npm run db:reset`.
 */
async function seedTable<T>(
  name: string,
  count: () => Promise<number>,
  insert: () => Promise<T>
) {
  const existing = await count();
  if (existing > 0) {
    console.log(`  ⏭️  ${name}: ${existing} ta yozuv bor, o'tkazib yuborildi`);
    return;
  }
  await insert();
}

async function main() {
  console.log("🌱 Seeding boshlandi...\n");

  // ===== 1. LOYIHALAR =====
  await seedTable("Loyihalar", () => prisma.project.count(), async () => {
    const data = [
      { title: "Yoshlar Texnoparki", desc: "Yosh innovatorlar uchun zamonaviy texnoparklar tarmog'ini yaratish va IT sohasiga yo'naltirish dasturi.", image: "/images/projects/project_technopark_1782905388110.png", progress: 75, status: "Faol", category: "IT va Innovatsiya" },
      { title: "Digital Yoshlar", desc: "Raqamli savodxonlikni oshirish, dasturlash va sun'iy intellekt sohalarida bepul ta'lim berish.", image: "/images/projects/project_digital_1782905396676.png", progress: 85, status: "Faol", category: "IT va Innovatsiya" },
      { title: "Kelajak O'qituvchilari", desc: "Ta'lim sohasida kadrlar tayyorlash, malaka oshirish va pedagogik kasbga jalb qilish dasturi.", image: "/images/projects/project_teachers_1782905407793.png", progress: 60, status: "Faol", category: "Ta'lim" },
      { title: "Sport Salohiyati", desc: "Ommaviy sport va sog'lom turmush tarzini targ'ib qilish, yosh sportchilarni qo'llab-quvvatlash.", image: "/images/projects/project_sports_modest.png", progress: 70, status: "Faol", category: "Sport" },
      { title: "Yashil Makon", desc: "Ekologik holatni yaxshilash, daraxt ekish va atrof-muhitni muhofaza qilish yoshlar harakati.", image: "/images/projects/project_eco_1782905423561.png", progress: 90, status: "Yakunlangan", category: "Ekologiya" },
      { title: "Ishga Joylashtirish", desc: "Yoshlarni mehnat bozorida qo'llab-quvvatlash, kasbiy yo'nalish bo'yicha maslahat berish dasturi.", image: "/images/projects/project_employment_1782905711723.png", progress: 55, status: "Yangi", category: "Bandlik" },
    ];
    for (const p of data) {
      await prisma.project.create({
        data: {
          ...p,
          slug: slugify(p.title),
          content:
            "Ushbu loyiha yoshlarimizning salohiyatini ro'yobga chiqarish, ularning bandligini ta'minlash va yangi bilimlarni egallashlari uchun qulay sharoit yaratish maqsadida amalga oshirilmoqda.\n\nLoyiha doirasida turli yo'nalishlar bo'yicha bepul kurslar, master-klasslar va amaliy mashg'ulotlar tashkil etiladi. Ishtirok etish uchun ariza topshirish yetarli.",
        },
      });
    }
    console.log(`  ✅ ${data.length} ta loyiha yaratildi`);
    return data;
  });

  // ===== 2. YANGILIKLAR =====
  await seedTable("Yangiliklar", () => prisma.news.count(), async () => {
    const data = [
      { title: "Yoshlar Ittifoqi 2025-yil uchun yangi strategiya dasturini tasdiqladi", excerpt: "Markaziy Kengashning navbatdagi yig'ilishida 2025-yilga mo'ljallangan keng qamrovli strategiya dasturi muhokama qilindi va tasdiqlandi.", date: "15 Noyabr 2024", tag: "Strategiya", tagClass: "tag-blue", image: "/images/news/news_strategy_1782905584191.png", featured: true },
      { title: "«Kelajak bunyodkori» tanlovining final bosqichi bo'lib o'tdi", excerpt: "Poytaxtimizdagi Yoshlar ijod saroyida o'tkazilgan tanlovning yakuniy bosqichida 100 dan ortiq iqtidorli yigit-qizlar o'zlarining innovatsion g'oyalari bilan bellashdilar.", date: "12 Noyabr 2024", tag: "Ta'lim", tagClass: "tag-green", image: "/images/news/news_education_1782905592898.png", featured: false },
      { title: "Yosh sportchilarimiz xalqaro musobaqada 15 medal qo'lga kiritdi", excerpt: "Qozog'iston poytaxti Ostona shahrida bo'lib o'tgan yengil atletika bo'yicha xalqaro turnirda vakillarimiz munosib ishtirok etib, umumjamoa hisobida birinchi o'rinni egallashdi.", date: "8 Noyabr 2024", tag: "Sport", tagClass: "tag-orange", image: "/images/news/news_sports_modest.png", featured: false },
      { title: "Toshkentda 'Raqamli Avlod' yosh dasturchilar xakatoni boshlandi", excerpt: "Uch kun davom etadigan xakatonda 200 dan ortiq yosh dasturchi ijtimoiy muammolarga raqamli yechim izlaydi.", date: "5 Noyabr 2024", tag: "Texnologiya", tagClass: "tag-blue", image: "/images/news/news_hackathon_1782905609599.png", featured: false },
      { title: "Yashil Makon: Poytaxt yoshlari 10 mingta daraxt ekishdi", excerpt: "Umumshahar ko'kalamzorlashtirish aksiyasida barcha 12 tuman yoshlari ishtirok etdi.", date: "1 Noyabr 2024", tag: "Ekologiya", tagClass: "tag-green", image: "/images/news/news_eco_1782905632260.png", featured: false },
      { title: "Xalqaro ta'lim ko'rgazmasida yoshlarimizning faol ishtiroki", excerpt: "Ko'rgazmada 30 dan ortiq xorijiy oliygoh o'z dasturlarini taqdim etdi.", date: "28 Oktyabr 2024", tag: "Ta'lim", tagClass: "tag-blue", image: "/images/news/news_exhibition_1782905641384.png", featured: false },
    ];
    for (const n of data) {
      await prisma.news.create({
        data: {
          ...n,
          slug: slugify(n.title),
          content: `${n.excerpt}\n\nYoshlar Ittifoqi doimo shunday tadbirlarni qo'llab-quvvatlab kelmoqda. Bu orqali minglab yoshlar o'z iqtidorlarini namoyon qilish imkoniyatiga ega bo'lmoqdalar. Maqsadimiz — kelajak avlod uchun barcha sharoitlarni yaratib berishdir.\n\nTadbir so'ngida faol ishtirokchilarga faxriy yorliqlar va qimmatbaho sovg'alar topshirildi. Kelgusi yilda bunday loyihalar ko'lamini yanada kengaytirish rejalashtirilmoqda.`,
        },
      });
    }
    console.log(`  ✅ ${data.length} ta yangilik yaratildi`);
    return data;
  });

  // ===== 3. YO'NALISHLAR =====
  await seedTable("Yo'nalishlar", () => prisma.direction.count(), async () => {
    const data = [
      {
        slug: "talim", icon: "fa-graduation-cap", iconBg: "var(--blue-pale)", iconColor: "var(--blue)",
        title: "Ta'lim", desc: "Yoshlar bilim va ko'nikmalarini oshirish, xorijiy tillarni o'rganish va kasbiy rivojlanish dasturlari.",
        fullDesc: "Biz yoshlarning zamonaviy ta'lim olishlari uchun qulay shart-sharoitlar yaratamiz. Bepul xorijiy tillar kurslari, IT dasturlash darslari hamda zamonaviy kasblarga o'qitish orqali yoshlarning kelajakdagi muvaffaqiyatiga poydevor quramiz.",
        image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1600",
        stats: [{ label: "O'quv kurslar", value: "150+" }, { label: "O'qitilgan yoshlar", value: "25k+" }, { label: "O'qituvchilar", value: "300+" }],
        goals: ["Zamonaviy IT va til kurslarini har bir hududga yetkazish", "Ta'lim sifatini xalqaro standartlarga moslashtirish", "Iqtidorli o'quvchilarga maxsus grantlar ajratish"]
      },
      {
        slug: "rahbarlik", icon: "fa-crown", iconBg: "var(--green-pale)", iconColor: "var(--green)",
        title: "Rahbarlik", desc: "Yosh yetakchilarni aniqlash, ularni tayyorlash va qo'llab-quvvatlash bo'yicha maxsus dasturlar.",
        fullDesc: "Kelajak rahbarlarini yetishtirish bizning asosiy vazifalarimizdan biridir. Yoshlar parlamentlari, mahalliy kengashlardagi yosh deputatlar va maxsus 'Rahbarlar maktabi' dasturlari doirasida biz yetakchilik qobiliyatlarini shakllantiramiz.",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1600",
        stats: [{ label: "Tayyorlangan rahbarlar", value: "1,200+" }, { label: "Treninglar soni", value: "450+" }, { label: "Viloyatlar bo'ylab qamrov", value: "100%" }],
        goals: ["Yosh yetakchilar uchun maxsus 'Rahbarlar Maktabi' tarmog'ini yaratish", "Menejment va strategik rejalashtirish bo'yicha xalqaro tajriba almashish", "Davlat boshqaruviga iqtidorli yoshlarni jalb etish"]
      },
      {
        slug: "volontyorlik", icon: "fa-handshake-angle", iconBg: "#FEE2E2", iconColor: "#EF4444",
        title: "Volontyorlik", desc: "Jamiyatga foyda keltiradigan volontyorlik loyihalari va aksiyalarni tashkil etish.",
        fullDesc: "Biz mehr-oqibat va o'zaro yordamni qadrlaymiz. O'zbekiston bo'ylab o'n minglab ko'ngilli yoshlarimiz ekologik aksiyalarda, qariyalarga yordam berishda va yirik xalqaro tadbirlarda faol qatnashib kelmoqdalar.",
        image: "https://images.unsplash.com/photo-1593113563332-ce147cb37783?auto=format&fit=crop&q=80&w=1600",
        stats: [{ label: "Faol volontyorlar", value: "50k+" }, { label: "Ekologik aksiyalar", value: "800+" }, { label: "Yordam ko'rsatilgan oilalar", value: "10k+" }],
        goals: ["Ko'ngillilar harakatini milliy miqyosda kuchaytirish", "Har bir mahallada volontyorlar guruhlarini shakllantirish", "Yirik xalqaro musobaqa va anjumanlarda volontyorlar faoliyatini tashkil etish"]
      },
      {
        slug: "tadbirkorlik", icon: "fa-rocket", iconBg: "#FEF3C7", iconColor: "#D97706",
        title: "Tadbirkorlik", desc: "Yosh tadbirkorlarni qo'llab-quvvatlash, startup loyihalar va biznes treninglar.",
        fullDesc: "Biz yoshlarni nafaqat o'qiymiz, balki ularni ishbilarmonlikka yo'naltiramiz. Startap loyihalariga investitsiyalar jalb qilish, biznesni boshlash uchun imtiyozli kreditlar va bepul kovorking markazlari aynan bizning yosh tadbirkorlar uchun yaratilgan.",
        image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1600",
        stats: [{ label: "Startap loyihalar", value: "300+" }, { label: "Ajratilgan grantlar", value: "12 mlrd" }, { label: "Yaratilgan ish o'rinlari", value: "4,500+" }],
        goals: ["Yoshlar texnoparklarida yangi startaplarni inkubatsiyadan o'tkazish", "Biznes-reja tuzish va marketing bo'yicha bepul master-klasslar", "Yosh tadbirkorlar uchun maxsus yarmarkalar tashkil etish"]
      },
      {
        slug: "talaba-yoshlari", icon: "fa-school", iconBg: "#F3E8FF", iconColor: "#7C3AED",
        title: "Talaba yoshlari", desc: "Oliy o'quv yurtlari talabalarining faolligini oshirish va qo'llab-quvvatlash.",
        fullDesc: "Oliy ta'lim muassasalarida tahsil olayotgan talabalar uchun maxsus loyihalar, stipendiyalar va xalqaro almashinuv dasturlarini amalga oshiramiz.",
        image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1600",
        stats: [{ label: "Qamrab olingan OTMlar", value: "120+" }, { label: "Stipendiya sohiblari", value: "1,500+" }, { label: "Xalqaro dasturlar", value: "45+" }],
        goals: ["Talabalar uchun yotoqxonalarda qulayliklarni oshirish bo'yicha nazorat", "Iqtidorli talabalar uchun ilmiy konferensiyalar o'tkazish", "OTMlar aro sport va intellektual bellashuvlar tashkil etish"]
      },
      {
        slug: "madaniyat", icon: "fa-palette", iconBg: "#FCE7F3", iconColor: "#EC4899",
        title: "Madaniyat", desc: "Milliy madaniyat, san'at va ijodiy loyihalar orqali yoshlarni rivojlantirish.",
        fullDesc: "Yoshlar orasida milliy merosimizni saqlash, teatr va san'at to'garaklari orqali yoshlarning ijodkorligini yuzaga chiqarish uchun turli festivallar o'tkazamiz.",
        image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=1600",
        stats: [{ label: "Madaniy tadbirlar", value: "1,200+" }, { label: "Kitobxonlar", value: "300k+" }, { label: "Teatr truppalari", value: "50+" }],
        goals: ["Chekka hududlarda ko'chma kutubxonalar va teatrlar tashkil etish", "Yosh ijodkorlar uchun maxsus ko'rgazmalar o'tkazish", "Milliy maqom va baxshichilik san'atini yoshlar orasida targ'ib qilish"]
      },
      {
        slug: "sport", icon: "fa-dumbbell", iconBg: "#FFEDD5", iconColor: "#EA580C",
        title: "Sport", desc: "Sog'lom turmush tarzini targ'ib qilish va sport musobaqalarini tashkil etish.",
        fullDesc: "Sport – yoshlar sog'lig'i va kelajagi garovidir. Biz yoshlar o'rtasida 'Besh tashabbus' olimpiadasi doirasida minifutbol, voleybol, stritbol va shaxmat bo'yicha millionlab yoshlarni qamrab oluvchi yirik sport tadbirlarini tashkil etamiz.",
        image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=1600",
        stats: [{ label: "Olimpiada ishtirokchilari", value: "5 mln+" }, { label: "Sport maydonchalari qurildi", value: "2,500+" }, { label: "Xalqaro chempionlar", value: "120+" }],
        goals: ["Ommaviy sportni mahallalar darajasiga tushirish", "Imkoniyati cheklangan yoshlar uchun parasportni rivojlantirish", "Yosh sportchilarni xalqaro arenalarga tayyorlash"]
      },
      {
        slug: "ijtimoiy-loyihalar", icon: "fa-hand-holding-heart", iconBg: "#CCFBF1", iconColor: "#0D9488",
        title: "Ijtimoiy loyihalar", desc: "Ijtimoiy ahamiyatga molik grant loyihalar va jamoat tashabbuslari.",
        fullDesc: "Jamiyatimizning ijtimoiy ehtiyojmand qatlamlarini himoya qilish maqsadida biz alohida e'tibor talab etadigan yoshlarga psixologik, huquqiy va tibbiy yordam ko'rsatish bo'yicha kompleks chora-tadbirlarni amalga oshiramiz.",
        image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&q=80&w=1600",
        stats: [{ label: "Huquqiy maslahatlar", value: "15k+" }, { label: "Tibbiy yordam aksiyalari", value: "400+" }, { label: "Qamrab olingan mahkumlar", value: "2,000+" }],
        goals: ["Yoshlar daftari orqali ijtimoiy yordamni manzilli yetkazish", "Psixologik ko'mak markazlari faoliyatini kuchaytirish", "Huquqbuzarlikka moyil yoshlarni sog'lom hayotga qaytarish"]
      },
    ];
    for (const d of data) {
      const { stats, goals, ...dirData } = d;
      await prisma.direction.create({
        data: {
          ...dirData,
          stats: { create: stats },
          goals: { create: goals.map((text) => ({ text })) },
        },
      });
    }
    console.log(`  ✅ ${data.length} ta yo'nalish yaratildi (stats + goals bilan)`);
    return data;
  });

  // ===== 4. RAHBARIYAT =====
  await seedTable("Rahbariyat", () => prisma.leader.count(), async () => {
    const bio =
      "Toshkent shahar Kengashida uzoq yillik tajribaga ega bo'lib, yoshlar siyosati, ijtimoiy dasturlar va grant loyihalarini boshqarishda faol ishtirok etib kelmoqda.\n\nO'zbekiston Milliy Universitetini tamomlagan. Xalqaro anjumanlar va konferensiyalarda O'zbekiston yoshlari nomidan ko'plab marotaba nutq so'zlagan.";
    const receptionDays = "Seshanba|10:00 - 13:00\nPayshanba|14:00 - 17:00";
    const data = [
      { name: "Karimov Jasur", position: "Toshkent shahar Kengashi raisi", image: "/images/leaders/leader_jasur_1782906199502.png", order: 1 },
      { name: "Toshmatova Nilufar", position: "Birinchi o'rinbosar", image: "/images/leaders/leader_nilufar_1782906209134.png", order: 2 },
      { name: "Saidov Bobur", position: "O'rinbosar — tashkilot ishi", image: "/images/leaders/leader_bobur_1782906218310.png", order: 3 },
      { name: "Xasanova Madina", position: "Loyihalar bo'yicha koordinator", image: "/images/leaders/leader_madina_1782906226072.png", order: 4 },
    ];
    for (const l of data) {
      await prisma.leader.create({ data: { ...l, bio, receptionDays } });
    }
    console.log(`  ✅ ${data.length} ta rahbar yaratildi`);
    return data;
  });

  // ===== 5. YOSH YETAKCHILAR =====
  await seedTable("Yosh yetakchilar", () => prisma.youthLeader.count(), async () => {
    const bio =
      "Ushbu yetakchi o'z hududida yoshlar bilan yaqindan ishlab, ularning muammolarini o'rganish, qiziqishlarini qo'llab-quvvatlash va bo'sh vaqtlarini mazmunli tashkil etish bo'yicha ko'plab loyihalarni amalga oshirib kelmoqda.\n\nShuningdek, iqtidorli yoshlarni kashf etish va ularni rag'batlantirish bo'yicha maxsus tanlovlar va to'garaklar tashkil etishda faol ishtirok etadi.";
    const data = [
      { name: "Raxmadjonova Nilufar", place: "INHA Universiteti", image: "/nilufar.jpg", category: "Oliygoh" },
      { name: "Rustamova Shahnoza", place: "Yunusobod tumani, 'Minor' mahallasi", image: "https://picsum.photos/seed/youth-leader-2/400/500.jpg", category: "Mahalla" },
      { name: "Ismoilov Doston", place: "O'zbekiston Milliy Universiteti", image: "https://picsum.photos/seed/youth-leader-3/400/500.jpg", category: "Oliygoh" },
      { name: "Aliyeva Malika", place: "Chilonzor tumani, 'Bog'zor' mahallasi", image: "https://picsum.photos/seed/youth-leader-4/400/500.jpg", category: "Mahalla" },
    ];
    for (const yl of data) {
      await prisma.youthLeader.create({ data: { ...yl, bio } });
    }
    console.log(`  ✅ ${data.length} ta yosh yetakchi yaratildi`);
    return data;
  });

  // ===== 6. TUMANLAR =====
  await seedTable("Tumanlar", () => prisma.district.count(), async () => {
    const data = [
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
    await prisma.district.createMany({ data });
    console.log(`  ✅ ${data.length} ta tuman yaratildi`);
    return data;
  });

  // ===== 7. HUJJATLAR =====
  await seedTable("Hujjatlar", () => prisma.document.count(), async () => {
    const data = [
      { title: "Yoshlar Ittifoqi Nizomi", type: "PDF", size: "2.4 MB", date: "15 Yanvar 2025", iconBg: "#FEE2E2", iconColor: "#EF4444", icon: "fa-file-pdf" },
      { title: "2024 yil yillik hisobot", type: "PDF", size: "5.1 MB", date: "10 Yanvar 2025", iconBg: "var(--blue-pale)", iconColor: "var(--blue)", icon: "fa-file-circle-check" },
      { title: "Tashkilot tuzilmasi va lavozimlar yo'riqnomasi", type: "PDF", size: "1.8 MB", date: "5 Yanvar 2025", iconBg: "var(--green-pale)", iconColor: "var(--green)", icon: "fa-scroll" },
      { title: "Grant loyihalari uchun ariza shakli", type: "DOCX", size: "340 KB", date: "1 Yanvar 2025", iconBg: "#F3E8FF", iconColor: "#7C3AED", icon: "fa-file-lines" },
      { title: "Buyruqlar to'plami (2024)", type: "PDF", size: "8.3 MB", date: "28 Dekabr 2024", iconBg: "#FEF3C7", iconColor: "#D97706", icon: "fa-clock-rotate-left" },
    ];
    await prisma.document.createMany({ data });
    console.log(`  ✅ ${data.length} ta hujjat yaratildi`);
    return data;
  });

  // ===== 8. GALEREYA =====
  await seedTable("Galereya", () => prisma.galleryImage.count(), async () => {
    const data = [
      { src: "https://picsum.photos/seed/gallery-youth-1/600/600", full: "https://picsum.photos/seed/gallery-youth-1/1200/1200", alt: "Yoshlar tadbiri", aspect: "square", order: 1 },
      { src: "https://picsum.photos/seed/gallery-youth-2/600/800", full: "https://picsum.photos/seed/gallery-youth-2/800/1200", alt: "Yoshlar loyihasi", aspect: "tall", order: 2 },
      { src: "https://picsum.photos/seed/gallery-youth-3/600/600", full: "https://picsum.photos/seed/gallery-youth-3/1200/1200", alt: "Volontyorlik", aspect: "square", order: 3 },
      { src: "/images/projects/project_sports_modest.png", full: "/images/projects/project_sports_modest.png", alt: "Sport musobaqasi", aspect: "square", order: 4 },
      { src: "https://picsum.photos/seed/gallery-youth-5/600/600", full: "https://picsum.photos/seed/gallery-youth-5/1200/1200", alt: "Konferentsiya", aspect: "square", order: 5 },
      { src: "https://picsum.photos/seed/gallery-youth-6/600/600", full: "https://picsum.photos/seed/gallery-youth-6/1200/1200", alt: "Madaniy tadbir", aspect: "square", order: 6 },
      { src: "https://picsum.photos/seed/gallery-youth-7/600/600", full: "https://picsum.photos/seed/gallery-youth-7/1200/1200", alt: "Rasmiy uchrashuv", aspect: "square", order: 7 },
    ];
    await prisma.galleryImage.createMany({ data });
    console.log(`  ✅ ${data.length} ta rasm yaratildi`);
    return data;
  });

  // ===== 9. TARIX =====
  await seedTable("Tarix", () => prisma.timelineEvent.count(), async () => {
    const data = [
      { year: "1991", text: "Mustaqillik yilida tashkilotga asos solingan", order: 1 },
      { year: "1995", text: "Birinchi qurultoy o'tkazilib, Nizom tasdiqlangan", order: 2 },
      { year: "2017", text: "«Kelajak bunyodkori» loyihasi ishga tushirilgan", order: 3 },
      { year: "2021", text: "Tashkilot tizimi isloh qilingan, yangi struktura joriy etilgan", order: 4 },
      { year: "2024", text: "«Yoshlar — kelajak kafolati» davlat dasturi doirasida keng ko'lamli ishlar boshlangan", order: 5 },
    ];
    await prisma.timelineEvent.createMany({ data });
    console.log(`  ✅ ${data.length} ta tarix yozuvi yaratildi`);
    return data;
  });

  // ===== 10. STATISTIKA =====
  await seedTable("Statistika", () => prisma.stat.count(), async () => {
    const data = [
      // Stats komponenti (rasm bilan katta blok)
      { target: 500000, suffix: "+", label: "A'zolar soni", order: 1, group: "full" },
      { target: 14, suffix: "", label: "Viloyat filiallari", order: 2, group: "full" },
      { target: 33, suffix: "+", label: "Yillik faoliyat", order: 3, group: "full" },
      { target: 1200, suffix: "+", label: "Loyihalar amalga oshirildi", order: 4, group: "full" },
      // MiniStats komponenti (hero ostidagi qator)
      { target: 500000, suffix: "+", label: "A'zolar soni", order: 1, group: "mini" },
      { target: 14, suffix: "", label: "Viloyat filiallari", order: 2, group: "mini" },
      { target: 1200, suffix: "+", label: "Amalga oshirilgan loyihalar", order: 3, group: "mini" },
      { target: 33, suffix: "+", label: "Faoliyat yillari", order: 4, group: "mini" },
    ];
    await prisma.stat.createMany({ data });
    console.log(`  ✅ ${data.length} ta statistika yozuvi yaratildi`);
    return data;
  });

  // ===== 11. XARITA HUDUDLARI =====
  await seedTable("Xarita hududlari", () => prisma.mapRegion.count(), async () => {
    const data = [
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
    await prisma.mapRegion.createMany({ data });
    console.log(`  ✅ ${data.length} ta hudud yaratildi`);
    return data;
  });

  console.log("\n🎉 Seeding yakunlandi.");
}

main()
  .catch((e) => {
    console.error("❌ Xatolik:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
