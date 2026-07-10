import Link from "next/link";
import styles from "./Hujjatlar.module.css";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { getDocuments } from "@/lib/queries";
import HujjatlarHero from "@/components/HujjatlarHero/HujjatlarHero";
import HujjatlarCategories from "@/components/HujjatlarCategories/HujjatlarCategories";
import HujjatlarList from "@/components/HujjatlarList/HujjatlarList";
import HujjatlarGuarantees from "@/components/HujjatlarGuarantees/HujjatlarGuarantees";
import NavigationCards from "@/components/NavigationCards/NavigationCards";

export const metadata = {
  title: "Hujjatlar Arvixi | O'zbekiston Yoshlar Ittifoqi",
  description: "Yoshlar Ittifoqining barcha huquqiy va normativ hujjatlari bazasi.",
};





export const revalidate = 60;

export default async function DocumentsPage() {
  const documents = await getDocuments();

  return (
    <div className={styles.pageWrapper}>
      {/* ===== 1. HERO SECTION ===== */}
      <HujjatlarHero />

      {/* ===== 2. CATEGORIES ===== */}
      <HujjatlarCategories />

      {/* ===== 3. MAIN DOCUMENTS LIST ===== */}
      <HujjatlarList items={documents} />

      {/* ===== 4. GUARANTEE SECTION ===== */}
      <HujjatlarGuarantees />

      {/* ===== 5. NAVIGATION CARDS ===== */}
      <NavigationCards />

    </div>
  );
}
