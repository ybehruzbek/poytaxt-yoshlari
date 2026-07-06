import Link from "next/link";
import Image from "next/image";
import styles from "./Faoliyat.module.css";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { directions, projects } from "@/lib/data";

export const metadata = {
  title: "Faoliyat - O'zbekiston Yoshlar Ittifoqi",
  description: "Tashkilotning asosiy yo'nalishlari, loyihalari va grant imkoniyatlari.",
};

const grantSteps = [
  {
    num: "1",
    title: "G'oyani taqdim etish",
    desc: "O'zbekiston yoshlari uchun manfaati tegadigan yangi loyiha yoki g'oyangizni elektron shaklda yuboring."
  },
  {
    num: "2",
    title: "Ekspertlar baholashi",
    desc: "Maxsus ekspertlar Kengashi sizning loyihangizni ijtimoiy ahamiyati va moliyaviy barqarorligini ko'rib chiqadi."
  },
  {
    num: "3",
    title: "Amaliyot va Qo'llab-quvvatlash",
    desc: "Loyihangiz ma'qullangach, biz uning uchun barcha resurs, ofis, grant va texnik yordamni ajratamiz."
  }
];

export default function FaoliyatPage() {
  return (
    <div className={styles.pageWrapper}>
      {/* ===== 1. HERO SECTION ===== */}
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
                  <li className={styles.activeCrumb}>
                    <span>Barcha Yo'nalishlar</span>
                  </li>
                </ol>
              </nav>

              <h1 className={styles.heroTitle}>Biz Nimalar Qilamiz?</h1>
              <p className={styles.heroDesc}>
                Yoshlarni ta'lim, tadbirkorlik, innovatsiyalar, sport va san'at atrofida birlashtirib, 
                ularning o'z ustida ishlashi uchun barcha imkoniyatlarni yaratib beramiz.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ===== 2. BENTO DIRECTIONS ===== */}
      <section className={styles.bentoSection}>
        <div className="container">
          <div className={styles.bentoGrid}>
            {directions.map((dir, i) => (
              <ScrollReveal key={i} delay={i + 1}>
                <Link 
                  href={`/faoliyat/${dir.slug}`}
                  className={styles.bentoCard} 
                  style={{ '--glow-color': dir.iconBg } as React.CSSProperties}
                >
                  <div 
                    className={styles.bIcon}
                    style={{ background: dir.iconBg, color: dir.iconColor }}
                  >
                    <i className={`fas ${dir.icon}`} />
                  </div>
                  <h3 className={styles.bTitle}>{dir.title}</h3>
                  <p className={styles.bDesc}>{dir.desc}</p>
                  <div className={styles.bAction}>Batafsil <i className="fas fa-arrow-right"></i></div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 3. GRANT / STARTUP TIMELINE ===== */}
      <section className={styles.grantSection}>
        <div className="container">
          <ScrollReveal>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionLabel}>Qo'llab-quvvatlash</span>
              <h2 className={styles.sectionTitle}>G'oyangizni Biz Bilan Amalga Oshiring</h2>
            </div>
          </ScrollReveal>

          <div className={styles.timelineGrid}>
            {grantSteps.map((step, idx) => (
              <ScrollReveal key={idx} delay={idx + 1}>
                <div className={styles.timeCard}>
                  <div className={styles.timeNum}>{step.num}</div>
                  <h3 className={styles.timeTitle}>{step.title}</h3>
                  <p className={styles.timeDesc}>{step.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 4. PROJECTS LIST ===== */}
      <section className={styles.projectsSection}>
        <div className="container">
          <ScrollReveal>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionLabel}>Amaliy natijalar</span>
              <h2 className={styles.sectionTitle}>Eng Katta Loyihalar</h2>
            </div>
          </ScrollReveal>

          <div className={styles.projectsGrid}>
            {projects.map((proj, i) => (
              <ScrollReveal key={proj.id} delay={i + 1}>
                <div className={styles.projectCard}>
                  <div className={styles.pImageWrap}>
                    <Image
                      src={proj.image}
                      alt={proj.title}
                      fill
                      sizes="140px"
                    />
                  </div>
                  <div className={styles.pInfo}>
                    <h3 className={styles.pTitle}>{proj.title}</h3>
                    <p className={styles.pDesc}>{proj.desc}</p>
                    <div className={styles.pProgressWrap}>
                      <div className={styles.pProgressLabel}>
                        <span>Bajarilish holati</span>
                        <span>{proj.progress}%</span>
                      </div>
                      <div className={styles.pProgressBar}>
                        <div 
                          className={styles.pProgressFill} 
                          style={{ width: `${proj.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 5. CTA SECTION ===== */}
      <section className={styles.ctaSection}>
        <div className="container">
          <ScrollReveal>
            <div className={styles.ctaBox}>
              <h2 className={styles.ctaTitle}>Tashabbus ko'rsating va qo'shiling!</h2>
              <p className={styles.ctaDesc}>
                O'zbekiston Yoshlar Ittifoqi safida ko'ngilli (volontyor) bo'lishni xohlaysizmi? 
                Yoki jamoamizdagi yirik loyihalarning bir qismi bo'lmoqchimisiz? Biz sizni kutmoqdamiz.
              </p>
              <Link href="/murojaat" className={styles.ctaBtn}>
                <span>Loyiha taklif etish</span>
                <i className="fas fa-rocket"></i>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
