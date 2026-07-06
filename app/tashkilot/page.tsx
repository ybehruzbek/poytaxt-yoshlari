import Image from "next/image";
import Link from "next/link";
import styles from "./Tashkilot.module.css";
import ScrollReveal from "@/components/ui/ScrollReveal";
import TashkilotHeroSlider from "@/components/TashkilotHeroSlider/TashkilotHeroSlider";
import TashkilotTimelinePreview from "@/components/TashkilotTimelinePreview/TashkilotTimelinePreview";
import TashkilotDirections from "@/components/TashkilotDirections/TashkilotDirections";
import TashkilotValues from "@/components/TashkilotValues/TashkilotValues";
import TashkilotStructure from "@/components/TashkilotStructure/TashkilotStructure";

export const metadata = {
  title: "Tashkilot haqida | O'zbekiston Yoshlar Ittifoqi",
};

export default function TashkilotPage() {
  return (
    <div className={styles.pageWrapper}>
      {/* 1. HERO SLIDER SECTION */}
      <TashkilotHeroSlider />

      {/* 2. STATS SECTION */}
      <section className={styles.statsSection}>
        <div className="container">
          <div className={styles.statsGrid}>
            <ScrollReveal delay={1} className={styles.statCard}>
              <div className={styles.statNumber}>12 ta</div>
              <div className={styles.statLabel}>Tuman Kengashlari</div>
            </ScrollReveal>
            <ScrollReveal delay={2} className={styles.statCard}>
              <div className={styles.statNumber}>300+</div>
              <div className={styles.statLabel}>Yillik Loyihalar</div>
            </ScrollReveal>
            <ScrollReveal delay={3} className={styles.statCard}>
              <div className={styles.statNumber}>50,000+</div>
              <div className={styles.statLabel}>Faol A'zolar</div>
            </ScrollReveal>
            <ScrollReveal delay={4} className={styles.statCard}>
              <div className={styles.statNumber}>80+</div>
              <div className={styles.statLabel}>Hamkor Tashkilotlar</div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 2.5. ORGANIZATION STRUCTURE (SIMPLE GRID) */}
      <TashkilotStructure />

      {/* 2.6. SARDORLAR KENGASHI (EDITORIAL TEXT) */}
      <section className={styles.editorialSection}>
        <div className={styles.editorialContainer}>
          <ScrollReveal>
            <span className={styles.editorialSubtitle}>Bizning tayanchimiz</span>
            <h2 className={styles.editorialTitle}>Sardorlar Kengashi — O'zbekiston kelajagi poydevori</h2>
            <p className={styles.editorialText}>
              Sardorlar Kengashi — bu shunchaki yoshlar guruhi emas, balki mamlakatimizdagi yuz minglab maktab o'quvchilarini o'ziga qamrab olgan <strong>eng yirik Liderlik Maktabi</strong> hisoblanadi. Bu tuzilma yoshlarni faqatgina boshqarishni emas, balki mas'uliyatni o'z bo'yniga olishni, jamoa bilan ishlashni va vatanparvarlikni o'rgatadi.
            </p>
            <p className={styles.editorialText}>
              Har bir maktab, tuman, shahar va respublika bosqichida saylanadigan Sardorlar o'z tengdoshlarining muammolarini o'rganadi, ularning ovozi bo'ladi. Ular nafaqat o'z hududlaridagi o'zgarishlarga, balki butun mamlakat yoshlar siyosatiga bevosita ta'sir ko'rsata oladigan haqiqiy ko'ngillilar armiyasidir.
            </p>
            <blockquote className={styles.editorialQuote}>
              "Sardorlar kengashi – bu bolalarning ijodiy va ijtimoiy qobiliyatlarini ro'yobga chiqaruvchi, tengdoshlar o'rtasida sog'lom raqobat va do'stlik muhitini yaratuvchi noyob ekotizimdir."
            </blockquote>
            <p className={styles.editorialText}>
              Aynan shuning uchun Yoshlar Ittifoqi o'zining asosiy e'tiborini Sardorlar Kengashini qo'llab-quvvatlash va rivojlantirishga qaratadi. Biz ishonamizki, bugungi maktab sardori — ertangi kunning buyuk davlat arbobi, kuchli tadbirkori yoki yetuk olimi bo'lishi muqarrar.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* 2.7. DIRECTIONS (STICKY SCROLL) */}
      <TashkilotDirections />

      {/* 2.8. VALUES (BENTO GRID) */}
      <TashkilotValues />

      {/* 3. CHAIRMAN MESSAGE */}
      <section className={styles.messageSection}>
        <div className="container">
          <ScrollReveal>
            <div className={styles.messageContainer}>
              <div className={styles.messageImage}>
                <Image 
                  src="/images/tashkilot/tashkilot_chairman_1782907129930.png" 
                  alt="Kengash Raisi" 
                  fill 
                  sizes="(max-width: 768px) 100vw, 400px"
                />
              </div>
              <div className={styles.messageContent}>
                <div className={styles.quoteIcon}>
                  "
                </div>
                <p className={styles.messageText}>
                  "Toshkent yoshlari — poytaxtimizning yuzi, kuchi va kelajagidir. 
                  Biz har bir yoshning o'z o'rnini topishi, o'z iqtidorini ro'yobga chiqarishi 
                  uchun barcha sharoitlarni yaratishga tayyormiz. Bizning maqsadimiz — 
                  nafaqat tadbirlar o'tkazish, balki yoshlarning chinakam suyanchig'iga aylanish."
                </p>
                <div className={styles.authorName}>Karimov Jasur</div>
                <div className={styles.authorRole}>Toshkent shahar Kengashi raisi</div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 4. WHY IT MATTERS (IMPACT) */}
      <section className={styles.impactSection}>
        <div className="container">
          <div className={styles.impactContainer}>
            <ScrollReveal delay={1} className={styles.impactImage}>
              <Image 
                src="/images/tashkilot/tashkilot_impact_1782907138342.png" 
                alt="Yoshlar ta'limi" 
                fill 
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </ScrollReveal>
            
            <div className={styles.impactContent}>
              <ScrollReveal delay={2}>
                <h2 className={styles.impactTitle}>Nega bizning faoliyatimiz muhim?</h2>
                <p className={styles.impactDesc}>
                  Zamonaviy dunyoda yoshlarning raqobatbardosh bo'lishi, to'g'ri kasb tanlashi va o'z 
                  biznesini yo'lga qo'yishi juda muhim. Biz yoshlarga bepul ta'lim, psixologik ko'mak 
                  va moliyaviy grantlar orqali yordam beramiz.
                </p>
                
                <div className={styles.featureList}>
                  <div className={styles.featureItem}>
                    <div className={styles.checkIcon}><i className="fas fa-check" /></div>
                    Ijtimoiy himoyaga muhtoj yoshlarga ko'maklashish
                  </div>
                  <div className={styles.featureItem}>
                    <div className={styles.checkIcon}><i className="fas fa-check" /></div>
                    Ta'lim va IT yo'nalishlarida bepul kurslar tashkil etish
                  </div>
                  <div className={styles.featureItem}>
                    <div className={styles.checkIcon}><i className="fas fa-check" /></div>
                    Yosh tadbirkorlarni qo'llab-quvvatlash
                  </div>
                  <div className={styles.featureItem}>
                    <div className={styles.checkIcon}><i className="fas fa-check" /></div>
                    Sog'lom turmush tarzi va sportni ommalashtirish
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* 4.5. TIMELINE PREVIEW (NEW) */}
      <TashkilotTimelinePreview />

      {/* 5. NAVIGATION CARDS */}
      <section className={styles.navSection}>
        <div className="container">
          <div className={styles.navHeader}>
            <ScrollReveal>
              <h2 className={styles.navTitle}>Batafsil tanishing</h2>
            </ScrollReveal>
          </div>
          
          <div className={styles.navStack}>
            <ScrollReveal delay={0.1}>
              <Link href="/tashkilot/missiya" className={styles.navRow}>
                <div className={styles.navRowLeft}>
                  <span className={styles.navRowNum}>01</span>
                  <h3 className={styles.navRowTitle}>Missiya va Qadriyatlar</h3>
                </div>
                <div className={styles.navRowRight}>
                  <p className={styles.navRowDesc}>Biz qanday tamoyillar asosida ishlaymiz va bizning asosiy maqsadlarimiz nimalardan iborat?</p>
                  <div className={styles.navRowArrow}>
                    <i className="fas fa-arrow-right" />
                  </div>
                </div>
              </Link>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <Link href="/tashkilot/tarix" className={styles.navRow}>
                <div className={styles.navRowLeft}>
                  <span className={styles.navRowNum}>02</span>
                  <h3 className={styles.navRowTitle}>Tariximiz</h3>
                </div>
                <div className={styles.navRowRight}>
                  <p className={styles.navRowDesc}>O'zbekiston Yoshlar Ittifoqi qachon tashkil etilgan va shu kungacha qanday yo'lni bosib o'tdi?</p>
                  <div className={styles.navRowArrow}>
                    <i className="fas fa-arrow-right" />
                  </div>
                </div>
              </Link>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <Link href="/hujjatlar" className={styles.navRow}>
                <div className={styles.navRowLeft}>
                  <span className={styles.navRowNum}>03</span>
                  <h3 className={styles.navRowTitle}>Rasmiy Hujjatlar</h3>
                </div>
                <div className={styles.navRowRight}>
                  <p className={styles.navRowDesc}>Tashkilot faoliyatiga oid barcha qarorlar, nizomlar va huquqiy hujjatlar bilan tanishing.</p>
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
