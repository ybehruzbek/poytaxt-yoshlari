import React from 'react';
import LoyihalarHero from '@/components/LoyihalarHero/LoyihalarHero';
import LoyihalarGrid from '@/components/LoyihalarGrid/LoyihalarGrid';
import NavigationCards from '@/components/NavigationCards/NavigationCards';
import { getProjects } from '@/lib/queries';

export const metadata = {
  title: "Loyihalar | O'zbekiston Yoshlar Ittifoqi",
  description: "Yoshlar Ittifoqining barcha amaliy, ta'lim, va ijtimoiy loyihalari ro'yxati.",
};

// Bazadan o'qiydi — aks holda build paytida bir marta render bo'lib qotib qoladi.
export const revalidate = 60;

export default async function LoyihalarPage() {
  const projects = await getProjects();

  return (
    <div style={{ backgroundColor: 'var(--bg-light, #f8fafc)' }}>
      {/* ===== 1. HERO SECTION ===== */}
      <LoyihalarHero />

      {/* ===== 2. PROJECTS GRID ===== */}
      <LoyihalarGrid initialProjects={projects} />

      {/* ===== 3. NAVIGATION CARDS ===== */}
      <NavigationCards />
    </div>
  );
}
