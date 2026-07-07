import Link from "next/link";
import styles from "./Hujjatlar.module.css";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { documents } from "@/lib/data";
import HujjatlarHero from "@/components/HujjatlarHero/HujjatlarHero";
import HujjatlarCategories from "@/components/HujjatlarCategories/HujjatlarCategories";
import HujjatlarList from "@/components/HujjatlarList/HujjatlarList";
import HujjatlarGuarantees from "@/components/HujjatlarGuarantees/HujjatlarGuarantees";
import NavigationCards from "@/components/NavigationCards/NavigationCards";

export const metadata = {
  title: "Hujjatlar Arvixi | O'zbekiston Yoshlar Ittifoqi",
  description: "Yoshlar Ittifoqining barcha huquqiy va normativ hujjatlari bazasi.",
};





export default function DocumentsPage() {
  return (
    <div className={styles.pageWrapper}>
      {/* ===== 1. HERO SECTION ===== */}
      <HujjatlarHero />

      {/* ===== 2. CATEGORIES ===== */}
      <HujjatlarCategories />

      {/* ===== 3. MAIN DOCUMENTS LIST ===== */}
      <HujjatlarList />

      {/* ===== 4. GUARANTEE SECTION ===== */}
      <HujjatlarGuarantees />

      {/* ===== 5. NAVIGATION CARDS ===== */}
      <NavigationCards />

    </div>
  );
}
