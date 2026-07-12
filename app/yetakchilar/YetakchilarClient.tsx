"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { YouthLeader } from "@prisma/client";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { accentFor } from "./accent";
import styles from "./Yetakchilar.module.css";
import {
  TelegramLogo,
  InstagramLogo,
  MapPin,
  ArrowRight,
  MagnifyingGlass,
  UsersThree,
} from "@phosphor-icons/react/ssr";

// O'zbekcha lotin matnida `o'`/`g'` apostrofi bir nechta belgi bilan
// yozilishi mumkin (to'g'ri: ʻ U+02BB; klaviaturada esa ' yoki ' yoki `
// teriladi). Qidiruv barchasini bitta belgiga keltirib solishtiradi.
function normalize(text: string) {
  return text.toLowerCase().replace(/['‘’ʻʼ`]/g, "'");
}

export default function YetakchilarClient({ initialLeaders }: { initialLeaders: YouthLeader[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Barchasi");

  const categories = ["Barchasi", ...new Set(initialLeaders.map((l) => l.category))];

  const query = normalize(searchQuery.trim());
  const filtered = initialLeaders.filter((item) => {
    const matchesSearch =
      !query ||
      normalize(item.name).includes(query) ||
      normalize(item.place).includes(query) ||
      normalize(item.category).includes(query);
    const matchesCategory = activeCategory === "Barchasi" || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const hasActiveFilters = query !== "" || activeCategory !== "Barchasi";

  return (
    <>
      <ScrollReveal className={styles.filterReveal}>
        <div className={styles.filterBar}>
          <div className={styles.searchWrap}>
            <MagnifyingGlass weight="duotone" className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Ism, tuman yoki yo'nalish bo'yicha qidirish..."
              aria-label="Yetakchilarni qidirish"
              className={styles.searchInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className={styles.filterBottomRow}>
            <div className={styles.categoryPills}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`${styles.categoryBtn} ${activeCategory === cat ? styles.active : ""}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
            <span className={styles.count} aria-live="polite">
              {filtered.length} ta yetakchi
            </span>
          </div>
        </div>
      </ScrollReveal>

      <div className={styles.grid}>
        {filtered.length > 0 ? (
          filtered.map((item, idx) => (
            <ScrollReveal key={item.id} delay={idx % 6}>
              <div
                className={styles.card}
                style={{ "--accent": accentFor(item.category, idx).light } as React.CSSProperties}
              >
                {/* Butun kartani bosish — detal sahifa. Ijtimoiy havolalar
                    ichma-ich <a> bo'lmasligi uchun stretched-link patterni:
                    asosiy havola absolut qatlam, socials undan yuqorida. */}
                <Link
                  href={`/yetakchilar/${item.id}`}
                  className={styles.stretchedLink}
                  aria-label={item.name}
                />

                <div className={styles.imgWrap}>
                  <span className={styles.districtBadge}>{item.category} yetakchisi</span>
                  <Image src={item.image} alt={item.name} fill sizes="(max-width: 768px) 100vw, 33vw" />

                  {(item.telegram || item.instagram) && (
                    <div className={styles.socialsHover}>
                      {item.telegram && (
                        <a
                          href={item.telegram}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${item.name} — Telegram`}
                          className={`${styles.socialBtn} ${styles.telegram}`}
                        >
                          <TelegramLogo weight="duotone" />
                        </a>
                      )}
                      {item.instagram && (
                        <a
                          href={item.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${item.name} — Instagram`}
                          className={`${styles.socialBtn} ${styles.instagram}`}
                        >
                          <InstagramLogo weight="duotone" />
                        </a>
                      )}
                    </div>
                  )}
                </div>

                <div className={styles.body}>
                  <h3>{item.name}</h3>
                  <p className={styles.location}>
                    <MapPin weight="duotone" /> {item.place}
                  </p>

                  <div className={styles.actionBtn}>
                    Bog'lanish <ArrowRight weight="duotone" />
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))
        ) : (
          <div className={styles.emptyState}>
            <UsersThree weight="duotone" />
            <p>Qidiruv bo'yicha yetakchi topilmadi.</p>
            {hasActiveFilters && (
              <button
                className={styles.resetBtn}
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("Barchasi");
                }}
              >
                Filtrlarni tozalash
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
}
