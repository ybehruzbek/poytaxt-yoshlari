import React from 'react';
import LoyihalarHero from '@/components/LoyihalarHero/LoyihalarHero';
import LoyihalarGrid from '@/components/LoyihalarGrid/LoyihalarGrid';
import NavigationCards from '@/components/NavigationCards/NavigationCards';

export const metadata = {
  title: "Loyihalar | O'zbekiston Yoshlar Ittifoqi",
  description: "Yoshlar Ittifoqining barcha amaliy, ta'lim, va ijtimoiy loyihalari ro'yxati.",
};

export default function LoyihalarPage() {
  return (
    <div style={{ backgroundColor: 'var(--bg-light, #f8fafc)' }}>
      {/* ===== 1. HERO SECTION ===== */}
      <LoyihalarHero />

      {/* ===== 2. PROJECTS GRID ===== */}
      <LoyihalarGrid />

      {/* ===== 3. NAVIGATION CARDS ===== */}
      <NavigationCards />
    </div>
  );
}
