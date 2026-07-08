import React from 'react';
import LoyihalarHero from '@/components/LoyihalarHero/LoyihalarHero';
import LoyihalarGrid from '@/components/LoyihalarGrid/LoyihalarGrid';
import NavigationCards from '@/components/NavigationCards/NavigationCards';
import { prisma } from '@/lib/prisma';

export const metadata = {
  title: "Loyihalar | O'zbekiston Yoshlar Ittifoqi",
  description: "Yoshlar Ittifoqining barcha amaliy, ta'lim, va ijtimoiy loyihalari ro'yxati.",
};

export default async function LoyihalarPage() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: 'desc' }
  });

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
