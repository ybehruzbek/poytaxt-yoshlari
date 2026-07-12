import React from "react";
import MissiyaHero from "@/components/MissiyaHero/MissiyaHero";
import MissiyaDirections from "@/components/MissiyaDirections/MissiyaDirections";
import MissiyaValues from "@/components/MissiyaValues/MissiyaValues";
import MissiyaPrinciples from "@/components/MissiyaPrinciples/MissiyaPrinciples";
import MissiyaCTA from "@/components/MissiyaCTA/MissiyaCTA";
import NavigationCards from "@/components/NavigationCards/NavigationCards";

export const metadata = {
  title: "Missiya va Qadriyatlar | O'zbekiston Yoshlar Ittifoqi",
  description: "O'zbekiston Yoshlar Ittifoqining davlat siyosatidagi o'rni, yoshlar bilan ishlash missiyasi, kelajak qarashlari va faoliyat tamoyillari haqida batafsil ma'lumot.",
};

export default function MissiyaPage() {
  return (
    <main>
      {/* 1. HERO (STANDARD IMAGE HERO) */}
      <MissiyaHero />

      {/* 2. DIRECTIONS (3 CARDS STRUCTURE) */}
      <MissiyaDirections />

      {/* 3. VALUES (BENTO GRID) */}
      <MissiyaValues />

      {/* 4. PRINCIPLES (PROJECTS GRID STYLE) */}
      <MissiyaPrinciples />

      {/* 5. CTA SECTION (WOW BOX) */}
      <MissiyaCTA />

      {/* 6. NEXT PAGES (NAVIGATION CARDS) */}
      <NavigationCards 
        items={[
          {
            id: "01",
            title: "Tashkilot Haqida",
            desc: "O'zbekiston Yoshlar Ittifoqi umumiy tuzilmasi, maqsadlari va asosiy arxitekturasi bilan tanishing.",
            href: "/tashkilot",
            image: "/images/tashkilot/tashkilot_hero_1782907121959.png"
          },
          {
            id: "02",
            title: "Tariximiz",
            desc: "O'zbekiston Yoshlar Ittifoqi qachon tashkil etilgan va shu kungacha qanday yo'lni bosib o'tdi?",
            href: "/tashkilot/tarix",
            image: "/images/tashkilot/uzbek_patriotic_youths.png"
          },
          {
            id: "03",
            title: "Rasmiy Hujjatlar",
            desc: "Tashkilot faoliyatiga oid barcha qarorlar, nizomlar va huquqiy hujjatlar bilan tanishing.",
            href: "/hujjatlar",
            image: "/images/tashkilot/tashkilot_impact_1782907138342.png"
          }
        ]}
      />
    </main>
  );
}
