import styles from "./Tashkilot.module.css";
import TashkilotHeroSlider from "@/components/TashkilotHeroSlider/TashkilotHeroSlider";
import TashkilotTimelinePreview from "@/components/TashkilotTimelinePreview/TashkilotTimelinePreview";
import TashkilotDirections from "@/components/TashkilotDirections/TashkilotDirections";
import TashkilotValues from "@/components/TashkilotValues/TashkilotValues";
import TashkilotStructure from "@/components/TashkilotStructure/TashkilotStructure";
import SardorlarEditorial from "@/components/SardorlarEditorial/SardorlarEditorial";
import ChairmanMessage from "@/components/ChairmanMessage/ChairmanMessage";
import ImpactStats from "@/components/ImpactStats/ImpactStats";
import NavigationCards from "@/components/NavigationCards/NavigationCards";
import MiniStats from "@/components/MiniStats/MiniStats";
import { getStats } from "@/lib/queries";

export const metadata = {
  title: "Tashkilot haqida | O'zbekiston Yoshlar Ittifoqi",
};

export const revalidate = 60;

export default async function TashkilotPage() {
  const stats = await getStats("mini");

  return (
    <div className={styles.pageWrapper}>
      {/* 1. HERO SLIDER SECTION */}
      <TashkilotHeroSlider />

      {/* 2. STATS SECTION — bazadan, admin "Statistika" bo'limida boshqariladi */}
      <MiniStats items={stats} />

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
