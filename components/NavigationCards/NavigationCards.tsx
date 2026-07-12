"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight } from "@phosphor-icons/react/ssr";
import ScrollReveal from "@/components/ui/ScrollReveal";
import styles from "./NavigationCards.module.css";

const defaultNavItems = [
  {
    id: "01",
    title: "Missiya va Qadriyatlar",
    desc: "Biz qanday tamoyillar asosida ishlaymiz va bizning asosiy maqsadlarimiz nimalardan iborat?",
    href: "/tashkilot/missiya",
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
];

interface NavItem {
  id: string;
  title: string;
  desc: string;
  href: string;
  image: string;
}

interface NavigationCardsProps {
  items?: NavItem[];
}

// Har bir qatorga o'z brend rangi — raqam, faol strelka va urg'u chizig'i
// shu rangda. "rest" — och sahifa foni ustida (to'q rang o'qiladi), "active"
// — hover'dagi qorong'i overlay ustida (to'q ko'k shu yerda deyarli ko'rinmas
// edi, shuning uchun och ko'k). "icon" — strelka to'ldirilgan doira ustida —
// och to'ldirishda (sky) to'q, o'rtacha to'ldirishda (yashil/amber) oq o'qiladi.
const accentColors = [
  { rest: "var(--blue)", active: "#A9D8EB", icon: "var(--blue-deep)" },
  { rest: "var(--green-check)", active: "var(--green-check)", icon: "white" },
  { rest: "var(--amber)", active: "var(--amber)", icon: "var(--blue-deep)" },
];

export default function NavigationCards({ items = defaultNavItems }: NavigationCardsProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const displayItems = items;

  return (
    <section className={`${styles.section} ${hoveredIndex !== null ? styles.hasActiveBg : ""}`}>
      
      {/* Background Images Crossfade */}
      <div className={styles.bgWrapper}>
        <AnimatePresence>
          {hoveredIndex !== null && (
            <motion.div
              key={hoveredIndex}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className={styles.bgImageDiv}
            >
              <Image 
                src={displayItems[hoveredIndex].image} 
                alt="Background" 
                fill 
                className={styles.image}
              />
              <div className={styles.bgOverlay}></div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className={styles.container}>
        <ScrollReveal className={styles.header}>
          <span className={styles.badge}>Davom etish</span>
          <h2 className={`${styles.title} ${hoveredIndex !== null ? styles.textWhite : ""}`}>Batafsil tanishing</h2>
        </ScrollReveal>

        <div className={styles.list}>
          {displayItems.map((item, idx) => {
            const isHovered = hoveredIndex === idx;
            const isAnyHovered = hoveredIndex !== null;

            return (
              <ScrollReveal key={item.id} delay={idx + 1}>
                <Link
                  href={item.href}
                  className={`${styles.row} ${isHovered ? styles.rowActive : ""} ${isAnyHovered && !isHovered ? styles.rowDimmed : ""}`}
                  style={{
                    "--accent-rest": accentColors[idx % accentColors.length].rest,
                    "--accent-active": accentColors[idx % accentColors.length].active,
                    "--accent-icon": accentColors[idx % accentColors.length].icon,
                  } as React.CSSProperties}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div className={styles.rowLeft}>
                    <span className={styles.rowNum}>{item.id}</span>
                    <h3 className={styles.rowTitle}>{item.title}</h3>
                  </div>

                  <div className={styles.rowRight}>
                    <p className={styles.rowDesc}>{item.desc}</p>
                    <div className={styles.arrowWrap}>
                      <ArrowRight weight="duotone" className={styles.arrowIcon} />
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
