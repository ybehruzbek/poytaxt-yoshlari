import Link from "next/link";
import styles from "./Missiya.module.css";
import ScrollReveal from "@/components/ui/ScrollReveal";

export const metadata = {
  title: "Missiya va Qadriyatlar | O'zbekiston Yoshlar Ittifoqi",
  description:
    "O'zbekiston Yoshlar Ittifoqining davlat siyosatidagi o'rni, yoshlar bilan ishlash missiyasi, kelajak qarashlari va faoliyat tamoyillari haqida batafsil ma'lumot.",
};

const overlapCards = [
  {
    icon: "fa-shield-halved",
    title: "Huquqiy va Ijtimoiy Himoya",
    desc: "Yoshlarning ijtimoiy-iqtisodiy, siyosiy hamda ma'naviy huquqlarini har qanday vaziyatda munosib himoya qilish. Biz qonunchilik tashabbuslari bilan chiqib, yoshlarning munosib mehnat, ta'lim va yashash sharoitlariga ega bo'lishini ta'minlash yo'lida davlat tuzilmalari bilan hamkorlik qilamiz.",
  },
  {
    icon: "fa-graduation-cap",
    title: "Ta'lim va Bandlik Klasteri",
    desc: "Yoshlarning sifatli ta'lim olishi va o'z mutaxassisligi bo'yicha barqaror daromad manbaiga ega bo'lishini qo'llab-quvvatlash. Bepul o'quv kurslari, xorijiy tillarga tayyorlash, kasb-hunarga o'qitish va biznes startaplar uchun yoshlarga doimiy amaliy yordam va grantlar taqdim etish.",
  },
  {
    icon: "fa-globe",
    title: "Ijtimoiy Faollik va Ekologiya",
    desc: "Yoshlarni jamiyat boshqaruvida va turli tashabbuslarda ishtirok etishga jalb qilish. Respublika miqyosida volontyorlik (ko'ngillilar) harakatini kengaytirish, ekologik barqarorlikni ta'minlashga qaratilgan amaliy tadbirlar orqali vatanparvarlik va fuqarolik mas'uliyatini shakllantirish.",
  },
];

const values = [
  {
    icon: "fa-hand-holding-heart",
    colorClass: "iconGreen",
    title: "Insonga E'tibor",
    desc: "Biz uchun har bir yoshning hayoti, muammosi va kelajagi muhim. Biz yoshlarni shunchaki raqamlar orqali emas, balki aniq inson taqdiri sifatida qabul qilamiz.",
  },
  {
    icon: "fa-rocket",
    colorClass: "iconBlue",
    title: "Innovatsiyalarga Intilish",
    desc: "An'anaviy yondashuvlar bilan cheklanib qolmasdan, doimiy ravishda IT loyihalar, raqamlashtirish va yangi texnologik ish uslublarini amaliyotga tatbiq etish.",
  },
  {
    icon: "fa-heart-pulse",
    colorClass: "iconGreen",
    title: "Sog'lom Millat",
    desc: "Yoshlar orasida sportni ommalashtirish, sog'lom turmush tarzini keng targ'ib qilish hamda ularning ham jismoniy, ham psixologik salomatligini asrash.",
  },
  {
    icon: "fa-star",
    colorClass: "iconBlue",
    title: "Iqtidorlarni Kashf Etish",
    desc: "Olis hududlarda ham, poytaxt markazida ham har bir yoshning yashirin iqtidorini va noyob iste'dodini qidirib topish va uni mamlakat miqyosida ko'rsatish.",
  },
  {
    icon: "fa-scale-balanced",
    colorClass: "iconGreen",
    title: "Adolat va Haqiqat",
    desc: "Har bir murojaat ortida shaxs taqdiri yotadi. O'zbekiston Yoshlar Ittifoqi barcha masalalarni faqat qonuniy va adolatli yo'l bilan, oshkora yechish tarafdoridir.",
  },
  {
    icon: "fa-flag",
    colorClass: "iconBlue",
    title: "Vatanga Sadoqat",
    desc: "Yoshlar qalbida milliy g'urur, boy madaniy merosimizga hurmat tuyg'usini uyg'otish va Vatan taraqqiyoti uchun xizmat qilishdek oliy tuyg'uni shakllantirish.",
  },
];

const principles = [
  {
    num: "01",
    title: "Ochiqlik, Shaffoflik va Muloqot",
    desc: "Bizda xalqdan, yoshlardan yashiriladigan yopiq qarorlar yo'q. Hamma narsa shaffof va bevosita muloqotga asoslanadi.",
    actions: [
      "Barcha dastur va tadbirlar oldindan ommaviy axborot vositalari orqali e'lon qilinadi",
      "Ajratilgan mablag'lar va yoshlar dasturlari byudjeti qat'iy jamoatchilik nazoratida bo'ladi",
      "Rahbariyat bilan har doim ochiq elektron va to'g'ridan-to'g'ri muloqot qilish imkoniyati mavjud"
    ]
  },
  {
    num: "02",
    title: "Hamma Uchun Teng Imkoniyat",
    desc: "Katta shahardagi talaba bo'ladimi yoki olis tumandagi uy bekasi, biz uchun yoshlarning kelib chiqishidan qat'i nazar barchasi teng huquqli a'zodir.",
    actions: [
      "Grantlar va tanlovlar maxsus komissiya tomonidan shaffof tarzda taqsimlanadi",
      "Imkoniyati cheklangan va ijtimoiy himoyaga muhtoj yoshlar bilan ishlash bo'yicha maxsus inkluziv dasturlar amaliyotga joriy qilingan",
      "Hududlar kesimida ta'lim klasterlariga teng kvotalar kafolatlangan"
    ]
  },
  {
    num: "03",
    title: "So'z Emas, Amaliy Natija",
    desc: "Biz qog'ozbozlik va rasmiyatchilikni emas, yoshlar hayotidagi daxldor va aniq o'zgarishlarni o'zimizning asosiy ish mezonimiz deb bilamiz.",
    actions: [
      "Loyihalarimiz hisoboti \"qancha odam keldi\" emas, \"necha nafar yosh ishli bo'ldi\" kabi tayanch ko'rsatkichlar bilan baholanadi",
      "Byurokratik to'siqlarsiz tezkor ko'mak ko'rsatish va muammolarga manzilli (joyiga chiqqan holda) yechim topish amaliyoti",
      "Samarasiz yoki davri o'tgan an'anaviy yig'ilishlardan voz kechilib, amaliy maydonchalarga o'tildi"
    ]
  },
  {
    num: "04",
    title: "Global va Maxsus Hamkorlik",
    desc: "Maqsadlarimizga erishishda biz yakkahokim emasmiz. O'zbekiston yoshlari ertangi kunining kafolati aynan birgalikdagi sinergiyaga bog'liq.",
    actions: [
      "Xalqaro yoshlar tashkilotlari (BMT, UNICEF, xorijiy ko'ngillilar) bilan yirik loyihalarni realizatsiya qilish",
      "Xususiy sektor (biznes, korporatsiyalar) ishtirokida yoshlarni to'g'ridan-to'g'ri kasbga yo'naltirish shartnomalari",
      "Boshqa barcha davlat muassasalari va idoralar bilan uzluksiz hamkorlik memorandumlari"
    ]
  },
];

export default function MissionPage() {
  return (
    <div className={styles.pageWrapper}>
      {/* ===== 1. CENTERED HERO & OVERLAP CARDS ===== */}
      <section className={styles.heroContainer}>
        <div className="container">
          <div className={styles.heroContent}>
            <ScrollReveal>
              <nav aria-label="breadcrumb" className={styles.heroBreadcrumbs}>
                <ol>
                  <li>
                    <Link href="/">Bosh sahifa</Link>
                    <span className={styles.separator}>/</span>
                  </li>
                  <li>
                    <Link href="/tashkilot">Tashkilot haqida</Link>
                    <span className={styles.separator}>/</span>
                  </li>
                  <li className={styles.activeCrumb}>
                    <span>Missiyamiz va Qadriyatlarimiz</span>
                  </li>
                </ol>
              </nav>

              <h1 className={styles.heroTitle}>
                Missiya, Qadriyatlar & <span>Maqsad</span>
              </h1>
              <p className={styles.heroDesc}>
                Yoshlar Ittifoqi bu oddiy byurokratik idora emas. Biz yoshlar uchun,
                yoshlar tomonidan boshqariladigan va yurt kelajagini shaxsan o'z qanoti 
                ostiga oluvchi eng ulkan ijtimoiy platformamiz. Bizning vazifamiz — har 
                bir insonning ovozi va taqdiri inobatga olinishini kafolatlash.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* OVERLAP CARDS */}
      <section className={styles.overlapSection}>
        <div className="container">
          <div className={styles.overlapGrid}>
            {overlapCards.map((card, index) => (
              <ScrollReveal key={index} delay={index + 1}>
                <div className={styles.overlapCard}>
                  <div className={styles.overlapIcon}>
                    <i className={`fas ${card.icon}`} />
                  </div>
                  <h3 className={styles.overlapTitle}>{card.title}</h3>
                  <p className={styles.overlapDesc}>{card.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 2. MISSION & VISION SPLIT ===== */}
      <section className={styles.missionVisionSection}>
        <div className="container">
          <div className={styles.mvGrid}>
            <ScrollReveal delay={1}>
              <div className={`${styles.mvCard} ${styles.mvCardBlue}`}>
                <span className={styles.mvLabel}>Nigoh (Vizion)</span>
                <h2 className={styles.mvTitle}>
                  Kelajak va Imkoniyatlar Kengligi (Uzoq muddatli maqsadlar)
                </h2>
                <p className={styles.mvDesc}>
                  Toshkent shahrining uzoq tumanlaridan tortib, markaziy hududlarigacha — barcha yoshlarimiz kelajakka to'liq ishonch bilan qaray oladigan barqaror jamiyat qurish bizning bosh g'oyamizdir. Vizionimiz faqatgina ichki hududlar bilan cheklanmaydi. Biz yoshlarimizning nafaqat mintaqada, balki butun dunyo bozorida yuqori talabga ega bo'lishini, ularning O'zbekiston imijini xalqaro darajada ko'tarishini o'z oldimizga eng katta maqsad qilib qo'yganmiz.
                </p>
                <p className={styles.mvDesc}>
                  Bizning orzumizdagi jamiyatda birorta ham ishsiz, imkoniyatsiz yoki qo'llab-quvvatlanmagan yosh qolmasligi shart. Ta'lim tizimi inqilobi va IT sohasi rivoji kelajagimiz ustuni etib belgilanadi.
                </p>
                <div className={styles.mvIconBg}>
                  <i className="fas fa-eye" />
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={2}>
              <div className={`${styles.mvCard} ${styles.mvCardWhite}`}>
                <span className={styles.mvLabel}>Asosiy Missiyamiz</span>
                <h2 className={styles.mvTitle}>
                  Harakat, Ishonch va Haqiqiy Qo'llab-quvvatlash
                </h2>
                <p className={styles.mvDesc}>
                  O'zbekiston Yoshlar Ittifoqi yoshlarni birlashtiruvchi markazdir. Missiyamiz — yoshlarning nafaqat ovozini eshitish, balki ularning orzularini mustahkam qonuniy tayanch va moliyaviy resurslar bilan qo'llab-quvvatlab, reallikka aylantirishdir. Yoshlar hayotidagi daxldor muammolarni aniqlash va ularga davlat idoralari bilan birgalikda yechim topish asosiy qadamimiz hisoblanadi.
                </p>
                <p className={styles.mvDesc}>
                  Shuningdek, biz davlatning "Besh muhim tashabbus"i hamda Yoshlar siyosati strategiyasini bevosita aholi qatlamlarigacha olib borib, "mahallabay" tizimi orqali hech kimni e'tibordan chetda qoldirmaslikni kafolatlaymiz.
                </p>
                <div className={styles.mvIconBg}>
                  <i className="fas fa-bullseye" />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ===== 3. EXPANDED VALUES GRID ===== */}
      <section className={styles.valuesSection}>
        <div className="container">
          <ScrollReveal>
            <div className={styles.sectionHeaderCenter}>
              <span className={styles.sectionLabel}>Bizning Qadriyatlarimiz</span>
              <h2 className={styles.sectionTitle}>Tashkilot faoliyatining o'zagi</h2>
              <p className={styles.sectionDesc}>
                Yuz minglab yoshlarni boshqarish va ularga yo'nalish berish oson emas. 
                Shuning uchun Yoshlar Ittifoqining har bir a'zosi, ko'ngillisi va xodimi 
                quyidagi 6 ta qat'iy qadriyat ostida birlashib, qasamyod kabi xizmat qiladi.
              </p>
            </div>
          </ScrollReveal>

          <div className={styles.valuesGrid}>
            {values.map((val, i) => (
              <ScrollReveal key={i} delay={i + 1}>
                <div className={styles.valueCard}>
                  <div className={styles.valueFloatingIcon}>
                    <i className={`fas ${val.icon} ${styles[val.colorClass]}`} />
                  </div>
                  <h3 className={styles.valueTitle}>{val.title}</h3>
                  <p className={styles.valueDesc}>{val.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 4. DETAILED TIMELINE PRINCIPLES ===== */}
      <section className={styles.timelineSection}>
        <div className="container">
          <ScrollReveal>
            <div className={styles.sectionHeaderCenter}>
              <span className={styles.sectionLabel}>Tamoyillar va Mexanizmlar</span>
              <h2 className={styles.sectionTitle}>Ishlash Tamoyillari qanday ishlaydi?</h2>
              <p className={styles.sectionDesc}>
                Harakatlarimiz poydevori. Ushbu qoidalar bizning jamiyat va yoshlar 
                bilan qanday ishlashimizni belgilab beradi va amaliyotda doimo o'z isbotini topadi.
              </p>
            </div>
          </ScrollReveal>

          <div className={styles.timelineWrap}>
            {principles.map((principle, index) => (
              <ScrollReveal key={index} delay={index % 2 === 0 ? 1 : 2}>
                {/* ScrollReveal animatsiyasining salbiy ta'sirini oldini olish uchun class shartli berildi */}
                <div className={`${styles.timelineItem} ${index % 2 !== 0 ? styles.timelineItemEven : ""}`}>
                  <div className={styles.timelineDot} />
                  <div className={styles.timelineContent}>
                    <div className={styles.timelineNum}>{principle.num}</div>
                    <div className={styles.timelineText}>
                      <h3 className={styles.timelineTitle}>{principle.title}</h3>
                      <p className={styles.timelineDesc}>{principle.desc}</p>
                      
                      <ul className={styles.timelineActionList}>
                        {principle.actions.map((action, actionIndex) => (
                          <li key={actionIndex}>
                            {action}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 5. CTA NAV ===== */}
      <section className={styles.navSection}>
        <div className="container">
          <ScrollReveal>
            <div className={styles.navHeader}>
              <h2 className={styles.navTitle}>Tashkilot bo'limlariga o'tish</h2>
            </div>
          </ScrollReveal>

          <div className={styles.navStack}>
            <ScrollReveal delay={1}>
              <Link href="/tashkilot/tarix" className={styles.navRow}>
                <div className={styles.navRowLeft}>
                  <div className={styles.navRowIcon}>
                    <i className="fas fa-clock-rotate-left" />
                  </div>
                  <h3 className={styles.navRowTitle}>Boy Tariximiz</h3>
                </div>
                <div className={styles.navRowRight}>
                  <p className={styles.navRowDesc}>
                    O'zbekiston Yoshlar Ittifoqi qachon tashkil etilgan va u shu kungacha bosib o'tgan buyuk yo'li bilan tanishing.
                  </p>
                  <div className={styles.navRowArrow}>
                    <i className="fas fa-arrow-right" />
                  </div>
                </div>
              </Link>
            </ScrollReveal>

            <ScrollReveal delay={2}>
              <Link href="/rahbariyat" className={styles.navRow}>
                <div className={styles.navRowLeft}>
                  <div className={styles.navRowIcon}>
                    <i className="fas fa-users" />
                  </div>
                  <h3 className={styles.navRowTitle}>Rahbariyat va Kengash</h3>
                </div>
                <div className={styles.navRowRight}>
                  <p className={styles.navRowDesc}>
                    Kengash rahbariyati, tuman yetakchilari va hududlardagi sardorlar tuzilmasi haqida batafsil ma'lumot.
                  </p>
                  <div className={styles.navRowArrow}>
                    <i className="fas fa-arrow-right" />
                  </div>
                </div>
              </Link>
            </ScrollReveal>

            <ScrollReveal delay={3}>
              <Link href="/hujjatlar" className={styles.navRow}>
                <div className={styles.navRowLeft}>
                  <div className={styles.navRowIcon}>
                    <i className="fas fa-file-lines" />
                  </div>
                  <h3 className={styles.navRowTitle}>Ochiq Hujjatlar</h3>
                </div>
                <div className={styles.navRowRight}>
                  <p className={styles.navRowDesc}>
                    Tashkilot faoliyatini tartibga soluvchi ochiq qarorlar, nizomlar va barcha huquqiy me'yoriy hujjatlar ba'zasi.
                  </p>
                  <div className={styles.navRowArrow}>
                    <i className="fas fa-arrow-right" />
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
