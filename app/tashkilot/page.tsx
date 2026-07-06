import Image from "next/image";
import Link from "next/link";
import styles from "./Tashkilot.module.css";
import ScrollReveal from "@/components/ui/ScrollReveal";
import TashkilotHeroSlider from "@/components/TashkilotHeroSlider/TashkilotHeroSlider";
import TashkilotTimelinePreview from "@/components/TashkilotTimelinePreview/TashkilotTimelinePreview";
import TashkilotDirections from "@/components/TashkilotDirections/TashkilotDirections";
import TashkilotValues from "@/components/TashkilotValues/TashkilotValues";
import TashkilotStructure from "@/components/TashkilotStructure/TashkilotStructure";
import SardorlarEditorial from "@/components/SardorlarEditorial/SardorlarEditorial";
import ChairmanMessage from "@/components/ChairmanMessage/ChairmanMessage";
import ImpactStats from "@/components/ImpactStats/ImpactStats";
import NavigationCards from "@/components/NavigationCards/NavigationCards";

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
      <SardorlarEditorial />

      {/* 2.7. DIRECTIONS (STICKY SCROLL) */}
      <TashkilotDirections />

      {/* 2.8. VALUES (BENTO GRID) */}
      <TashkilotValues />

      {/* 3. CHAIRMAN MESSAGE */}
      <ChairmanMessage />

      {/* 4. WHY IT MATTERS (IMPACT) */}
      <ImpactStats />

      {/* 4.5. TIMELINE PREVIEW (NEW) */}
      <TashkilotTimelinePreview />
      {/* 5. NAVIGATION CARDS */}
      <NavigationCards />
    </div>
  );
}
