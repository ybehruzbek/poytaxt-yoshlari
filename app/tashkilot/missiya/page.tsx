import React from "react";
import MissiyaHero from "@/components/MissiyaHero/MissiyaHero";
import MissiyaDirections from "@/components/MissiyaDirections/MissiyaDirections";
import MissiyaValues from "@/components/MissiyaValues/MissiyaValues";
import MissiyaPrinciples from "@/components/MissiyaPrinciples/MissiyaPrinciples";

export const metadata = {
  title: "Missiya va Qadriyatlar | O'zbekiston Yoshlar Ittifoqi",
  description: "O'zbekiston Yoshlar Ittifoqining davlat siyosatidagi o'rni, yoshlar bilan ishlash missiyasi, kelajak qarashlari va faoliyat tamoyillari haqida batafsil ma'lumot.",
};

export default function MissiyaPage() {
  return (
    <main style={{ backgroundColor: "var(--bg-light, #ffffff)" }}>
      {/* 1. HERO (MANIFESTO) */}
      <MissiyaHero />

      {/* 2. DIRECTIONS (STICKY CARDS) */}
      <MissiyaDirections />

      {/* 3. VALUES (BENTO GRID) */}
      <MissiyaValues />

      {/* 4. PRINCIPLES (PREMIUM ACCORDION) */}
      <MissiyaPrinciples />
    </main>
  );
}
