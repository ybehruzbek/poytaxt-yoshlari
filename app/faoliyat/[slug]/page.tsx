import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getDirectionBySlug, getDirections } from "@/lib/queries";
import styles from "./DirectionDetail.module.css";
import ScrollReveal from "@/components/ui/ScrollReveal";
import {
  ArrowRight,
  CheckCircle,
  GraduationCap,
  Crown,
  Handshake,
  Rocket,
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

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export const revalidate = 60;

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const direction = await getDirectionBySlug(slug);
  if (!direction) return { title: "Topilmadi - O'zbekiston Yoshlar Ittifoqi" };
  
  return {
    title: `${direction.title} - O'zbekiston Yoshlar Ittifoqi`,
    description: direction.desc,
  };
}

export async function generateStaticParams() {
  const directions = await getDirections();
  return directions.map((direction) => ({
    slug: direction.slug,
  }));
}

export default async function DirectionDetailPage({ params }: Props) {
  const { slug } = await params;
  const direction = await getDirectionBySlug(slug);

  if (!direction) {
    notFound();
  }

  const DirIcon = DIRECTION_ICONS[direction.icon] ?? Lightbulb;

  return (
    <div className={styles.pageWrapper}>
      {/* ===== HERO ===== */}
      <section className={styles.heroSection}>
        <div className={styles.heroBg}>
          <Image src={direction.image} alt={direction.title} fill sizes="100vw" priority />
          <div className={styles.overlay}></div>
        </div>
        <div className="container">
          <div className={styles.heroContent}>
            <ScrollReveal>
              <nav aria-label="breadcrumb" className={styles.heroBreadcrumbs}>
                <ol>
                  <li><Link href="/">Bosh sahifa</Link><span className={styles.separator}>/</span></li>
                  <li><Link href="/faoliyat">Barcha Yo'nalishlar</Link><span className={styles.separator}>/</span></li>
                  <li className={styles.activeCrumb}><span>{direction.title}</span></li>
                </ol>
              </nav>
              <div 
                className={styles.iconWrap} 
                style={{ background: direction.iconBg, color: direction.iconColor }}
              >
                <DirIcon weight="duotone" />
              </div>
              <h1 className={styles.title}>{direction.title}</h1>
              <p className={styles.desc}>{direction.desc}</p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ===== MAIN CONTENT ===== */}
      <section className={styles.contentSection}>
        <div className="container">
          <div className={styles.contentGrid}>
            <div className={styles.mainColumn}>
              <ScrollReveal>
                <div className={styles.infoBox}>
                  <h2>Yo'nalish haqida batafsil</h2>
                  <p>{direction.fullDesc}</p>
                </div>
                
                <div className={styles.goalsBox}>
                  <h2>Asosiy maqsadlar</h2>
                  <ul>
                    {direction.goals.map((goal) => (
                      <li key={goal.id}>
                        <CheckCircle weight="duotone" style={{ color: direction.iconColor }} />
                        <span>{goal.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            </div>
            
            <div className={styles.sidebarColumn}>
              <ScrollReveal delay={1}>
                <div className={styles.statsCard}>
                  <h3>Natijalar</h3>
                  <div className={styles.statsList}>
                    {direction.stats.map((stat) => (
                      <div key={stat.id} className={styles.statItem}>
                        <div className={styles.statValue} style={{ color: direction.iconColor }}>
                          {stat.value}
                        </div>
                        <div className={styles.statLabel}>{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className={styles.ctaCard}>
                  <h3>Loyihaga qo'shiling</h3>
                  <p>Biz bilan birga maqsadlarimiz sari harakat qiling!</p>
                  <Link href="/murojaat" className={styles.ctaBtn} style={{ background: direction.iconColor }}>
                    Ariza topshirish <ArrowRight weight="duotone" />
                  </Link>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
