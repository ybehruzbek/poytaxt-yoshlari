import Image from "next/image";
import Link from "next/link";
import styles from "./Tashkilot.module.css";
import ScrollReveal from "@/components/ui/ScrollReveal";
import TashkilotHeroSlider from "@/components/TashkilotHeroSlider/TashkilotHeroSlider";
import TashkilotTimelinePreview from "@/components/TashkilotTimelinePreview/TashkilotTimelinePreview";
import TashkilotDirections from "@/components/TashkilotDirections/TashkilotDirections";
import TashkilotValues from "@/components/TashkilotValues/TashkilotValues";

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
            <ScrollReveal delay={1} className={styles.statItem}>
              <div className={styles.statNumber}>12 ta</div>
              <div className={styles.statLabel}>Tuman Kengashlari</div>
            </ScrollReveal>
            <ScrollReveal delay={2} className={styles.statItem}>
              <div className={styles.statNumber}>300+</div>
              <div className={styles.statLabel}>Yillik Loyihalar</div>
            </ScrollReveal>
            <ScrollReveal delay={3} className={styles.statItem}>
              <div className={styles.statNumber}>50,000+</div>
              <div className={styles.statLabel}>Faol A'zolar</div>
            </ScrollReveal>
            <ScrollReveal delay={4} className={styles.statItem}>
              <div className={styles.statNumber}>80+</div>
              <div className={styles.statLabel}>Hamkor Tashkilotlar</div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 2.5. ORGANIZATION STRUCTURE (NEW) */}
      <section className={styles.structureSection}>
        <div className="container">
          <div className={styles.structureHeader}>
            <ScrollReveal>
              <h2 className={styles.structureTitle}>Tashkilot Tuzilmasi</h2>
              <p className={styles.structureDesc}>
                Yoshlar Ittifoqi — yoshlar o'zini o'zi boshqaradigan va yoshlar manfaati uchun xizmat qiladigan tizim.
              </p>
            </ScrollReveal>
          </div>

          <div className={styles.structureGrid}>
            <ScrollReveal delay={1} className={styles.structureCard}>
              <div className={styles.structureIcon}><i className="fas fa-school" /></div>
              <h3>Boshlang'ich Tashkilotlar</h3>
              <p>Maktab, kollej, litsey va OTMlardagi Kengashlar.</p>
            </ScrollReveal>
            <ScrollReveal delay={2} className={styles.structureCard}>
              <div className={styles.structureIcon}><i className="fas fa-building" /></div>
              <h3>Tuman Kengashlari</h3>
              <p>Tuman miqyosidagi yoshlar bilan ishlash bo'yicha koordinatsion markaz.</p>
            </ScrollReveal>
            <ScrollReveal delay={3} className={styles.structureCard}>
              <div className={styles.structureIcon}><i className="fas fa-city" /></div>
              <h3>Toshkent Shahar Kengashi</h3>
              <p>Poytaxt miqyosida loyihalar, forumlar va yoshlar siyosatini yurituvchi asosiy organ.</p>
            </ScrollReveal>
            <ScrollReveal delay={4} className={styles.structureCard}>
              <div className={styles.structureIcon}><i className="fas fa-sitemap" /></div>
              <h3>Markaziy Kengash</h3>
              <p>Butun Respublika yoshlari harakatini birlashtiruvchi markaziy apparat.</p>
            </ScrollReveal>
          </div>
        </div>
      </section>

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
          
          <div className={styles.navGrid}>
            <ScrollReveal delay={1}>
              <Link href="/tashkilot/missiya" className={styles.navCard}>
                <div className={styles.navIcon}><i className="fas fa-bullseye" /></div>
                <h3>Missiya va Qadriyatlar</h3>
                <p>Biz qanday tamoyillar asosida ishlaymiz va bizning asosiy maqsadlarimiz nimalardan iborat?</p>
              </Link>
            </ScrollReveal>

            <ScrollReveal delay={2}>
              <Link href="/tashkilot/tarix" className={styles.navCard}>
                <div className={styles.navIcon}><i className="fas fa-history" /></div>
                <h3>Tariximiz</h3>
                <p>O'zbekiston Yoshlar Ittifoqi qachon tashkil etilgan va shu kungacha qanday yo'lni bosib o'tdi?</p>
              </Link>
            </ScrollReveal>

            <ScrollReveal delay={3}>
              <Link href="/hujjatlar" className={styles.navCard}>
                <div className={styles.navIcon}><i className="fas fa-file-contract" /></div>
                <h3>Rasmiy Hujjatlar</h3>
                <p>Tashkilot faoliyatiga oid barcha qarorlar, nizomlar va huquqiy hujjatlar bilan tanishing.</p>
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
