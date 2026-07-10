'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './LoyihalarGrid.module.css';
import ScrollReveal from '@/components/ui/ScrollReveal';
import CustomSelect from '@/components/ui/CustomSelect';
import { Project } from '@prisma/client';

interface LoyihalarGridProps {
  initialProjects: Project[];
}

export default function LoyihalarGrid({ initialProjects }: LoyihalarGridProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Barchasi");
  const [activeStatus, setActiveStatus] = useState("Barchasi");

  const categories = ["Barchasi", "IT va Innovatsiya", "Ta'lim", "Sport", "Ekologiya", "Bandlik"];
  const statuses = ["Barchasi", "Yangi", "Jarayonda", "Yakunlangan"];

  const filteredProjects = initialProjects.filter(item => {
    // 1. Search
    const matchesSearch = 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.desc.toLowerCase().includes(searchQuery.toLowerCase());
    
    // 2. Category
    const matchesCategory = activeCategory === "Barchasi" || item.category === activeCategory;

    // 3. Status
    let matchesStatus = true;
    if (activeStatus === "Yangi") matchesStatus = item.status.includes("Yangi");
    if (activeStatus === "Jarayonda") matchesStatus = item.status.includes("Jarayon") || item.status.includes("Faol") || item.status.includes("Ochiq");
    if (activeStatus === "Yakunlangan") matchesStatus = item.status.includes("Yakunlan");

    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <section className={styles.section}>
      <div className="container">
        <ScrollReveal className={styles.filterReveal}>
          <div className={styles.filterBar}>
            {/* Top row: Search & Select */}
            <div className={styles.filterTopRow}>
              <div className={styles.searchWrap}>
                <i className={`fas fa-search ${styles.searchIcon}`}></i>
                <input 
                  type="text" 
                  placeholder="Loyiha nomi yoki tavsifi bo'yicha qidirish..." 
                  className={styles.searchInput}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <CustomSelect 
                options={categories.map(cat => ({ label: cat, value: cat }))}
                value={activeCategory}
                onChange={(val) => setActiveCategory(val)}
              />
            </div>

            {/* Bottom row: Status Pills */}
            <div className={styles.filterBottomRow}>
              {statuses.map((status) => (
                <button 
                  key={status}
                  className={`${styles.statusBtn} ${activeStatus === status ? styles.active : ''}`}
                  onClick={() => setActiveStatus(status)}
                >
                  Holati: {status}
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <div className={styles.grid}>
          {filteredProjects.length > 0 ? (
            filteredProjects.map((item, idx) => (
              <ScrollReveal key={item.id} delay={idx + 1}>
                <Link href={`/loyihalar/${item.slug}`} className={styles.card}>
                  <div className={styles.imgWrap}>
                    <Image 
                      src={item.image} 
                      alt={item.title} 
                      fill 
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className={styles.image}
                    />
                    <div className={`${styles.statusBadge} ${
                      item.status.includes('Yangi') ? styles.statusNew :
                      item.status.includes('Yakunlan') ? styles.statusFinished :
                      styles.statusActive
                    }`}>
                      {item.status.toUpperCase()}
                    </div>
                  </div>

                  <div className={styles.cardBody}>
                    <div className={`${styles.categoryBadge} ${
                      item.category === 'IT va Innovatsiya' ? styles.catIT :
                      item.category === "Ta'lim" ? styles.catEdu :
                      item.category === 'Sport' ? styles.catSport :
                      item.category === 'Ekologiya' ? styles.catEco :
                      item.category === 'Bandlik' ? styles.catJobs :
                      styles.catDefault
                    }`}>
                      {item.category}
                    </div>
                    <h3 className={styles.cardTitle}>{item.title}</h3>
                    <p className={styles.cardDesc}>{item.desc}</p>
                    
                    {/* Progress Bar */}
                    <div className={styles.progressWrap}>
                      <div className={styles.progressHeader}>
                        <span>Amalga oshirish holati</span>
                        <span>{item.progress}%</span>
                      </div>
                      <div className={styles.progressBar}>
                        <div 
                          className={styles.progressFill} 
                          style={{ width: `${item.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className={styles.cardFooter}>
                      <div className={styles.viewMoreBtn}>
                        Batafsil ma'lumot <i className="fas fa-arrow-right"></i>
                      </div>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))
          ) : (
            <div className={styles.emptyState}>
              <i className="fas fa-folder-open"></i>
              <p>Ushbu bo'limda hozircha loyihalar yo'q.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
