import Link from "next/link";
import Image from "next/image";
import styles from "./Faoliyat.module.css";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { getDirections, getProjects } from "@/lib/queries";
import {
  CaretRight,
  ArrowRight,
  Rocket,
  GraduationCap,
  Crown,
  Handshake,
  ChalkboardTeacher,
  Palette,
  Barbell,
  HandHeart,
  Lightbulb,
} from "@phosphor-icons/react/ssr";
import type { Icon } from "@phosphor-icons/react/lib";

// Bazadagi `Direction.icon` maydoni hali ham FontAwesome nomini ("fa-xxx") saqlaydi
// (prisma/seed.ts). Shu nomni tegishli Phosphor komponentiga moslaymiz.
const DIRECTION_ICONS: Record<string, Icon> = {
  "fa-graduation-cap": GraduationCap,
  "fa-crown": Crown,
  "fa-handshake-angle": Handshake,
  "fa-rocket": Rocket,
  "fa-school": ChalkboardTeacher,
  "fa-palette": Palette,
  "fa-dumbbell": Barbell,
  "fa-hand-holding-heart": HandHeart,
};

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

export const revalidate = 60;

export default async function FaoliyatPage() {
  const [directions, projects] = await Promise.all([getDirections(), getProjects()]);

  return (
    <div className={styles.pageWrapper}>
      {/* ===== 1. HERO SECTION ===== */}
      <section className={styles.heroContainer}>
        <div className={styles.heroBox}>
          <div className="container">
            <div className={styles.heroContent}>
              <ScrollReveal>
                <h1 className={styles.heroTitle}>
                  BIZ NIMALAR QILAMIZ?
                </h1>
                <p className={styles.heroDesc}>
                  Yoshlarni ta'lim, tadbirkorlik, innovatsiyalar, sport va san'at atrofida birlashtirib, 
                  ularning o'z ustida ishlashi uchun barcha imkoniyatlarni yaratib beramiz.
                </p>
                
                <Link href="/murojaat" className={styles.heroBtn}>
                  Ro'yxatdan O'tish <CaretRight weight="duotone" />
                </Link>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 2. BENTO DIRECTIONS ===== */}
      <section className={styles.bentoSection} id="yonalishlar">
        <div className="container">
          <div className={styles.bentoGrid}>
            {directions.map((dir, i) => {
              const DirIcon = DIRECTION_ICONS[dir.icon] ?? Lightbulb;
              return (
                <ScrollReveal key={dir.id} delay={i * 0.1}>
                  <Link
                    href={`/faoliyat/${dir.slug}`}
                    className={styles.bentoCard}
                    style={{ '--card-color': dir.iconColor } as React.CSSProperties}
                  >
                    <div className={styles.bIcon}>
                      <DirIcon weight="duotone" />
                    </div>
                    <h3 className={styles.bTitle}>{dir.title}</h3>
                    <p className={styles.bDesc}>{dir.desc}</p>
                    <div className={styles.bAction}>Batafsil <ArrowRight weight="duotone" /></div>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== 3. GRANT / STARTUP TIMELINE ===== */}
      <section className={styles.grantSection}>
        <div className="container">
          <ScrollReveal>
            <div className={styles.sectionHeader}>
              <span className="section-label">Qo'llab-quvvatlash</span>
              <h2 className="section-title">G'oyangizni Biz Bilan Amalga Oshiring</h2>
            </div>
          </ScrollReveal>

          <div className={styles.timelineWrapper}>
            <div className={styles.timelineGrid}>
              {grantSteps.map((step, idx) => {
                const bgColors = ["var(--blue)", "var(--blue-deep)", "var(--green)"];
                const bgColor = bgColors[idx % bgColors.length];

                return (
                  <ScrollReveal key={idx} delay={idx + 1}>
                    <div className={styles.timeCard} style={{ background: bgColor }}>
                      {idx < 2 && (
                        <div className={styles.arcSvgWrap}>
                          <svg viewBox="0 0 400 40" preserveAspectRatio="none" width="100%" height="100%">
                            <path
                              className={styles.arcPath}
                              d="M 0 40 Q 200 0 400 40"
                              fill="none"
                              stroke="rgba(255, 255, 255, 0.5)"
                              strokeWidth="4"
                              vectorEffect="non-scaling-stroke"
                            />
                          </svg>
                        </div>
                      )}
                      <div className={styles.timeNum} style={{ color: bgColor }}>{step.num}</div>
                      <h3 className={styles.timeTitle}>{step.title}</h3>
                      <p className={styles.timeDesc}>{step.desc}</p>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ===== 4. PROJECTS LIST ===== */}
      <section className={styles.projectsSection} id="loyihalar">
        <div className="container">
          <ScrollReveal>
            <div className={styles.sectionHeader}>
              <span className="section-label">Amaliy natijalar</span>
              <h2 className="section-title">Eng Katta Loyihalar</h2>
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
                    <Link href={`/loyihalar/${proj.slug}`} className={styles.pBatafsil}>
                      Batafsil <ArrowRight weight="duotone" />
                    </Link>
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
                <Rocket weight="duotone" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
