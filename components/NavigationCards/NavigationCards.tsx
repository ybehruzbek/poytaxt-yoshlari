"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
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
        <div className={styles.header}>
          <span className={styles.badge}>Davom etish</span>
          <h2 className={`${styles.title} ${hoveredIndex !== null ? styles.textWhite : ""}`}>Batafsil tanishing</h2>
        </div>
        
        <div className={styles.list}>
          {displayItems.map((item, idx) => {
            const isHovered = hoveredIndex === idx;
            const isAnyHovered = hoveredIndex !== null;

            return (
              <Link 
                href={item.href} 
                key={item.id}
                className={`${styles.row} ${isHovered ? styles.rowActive : ""} ${isAnyHovered && !isHovered ? styles.rowDimmed : ""}`}
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
                    <i className={`fas fa-arrow-right ${styles.arrowIcon}`}></i>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
