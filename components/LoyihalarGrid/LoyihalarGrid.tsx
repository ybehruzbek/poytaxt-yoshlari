'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './LoyihalarGrid.module.css';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { projects } from '@/lib/data';

export default function LoyihalarGrid() {
  const [activeTab, setActiveTab] = useState("Barchasi");
  const tabs = ["Barchasi", "Yangi", "Jarayonda", "Yakunlangan"];

  const filteredProjects = activeTab === "Barchasi" 
    ? projects 
    : projects.filter(item => {
      if (activeTab === "Yangi" && item.status.includes("Yangi")) return true;
      if (activeTab === "Jarayonda" && (item.status.includes("Jarayon") || item.status.includes("Ochiq") || item.status.includes("Faol"))) return true;
      if (activeTab === "Yakunlangan" && item.status.includes("Yakunlan")) return true;
      return false;
    });

  return (
    <section className={styles.section}>
      <div className="container">
        <ScrollReveal>
          <div className={styles.filterWrapper}>
            {tabs.map((tab) => (
              <button 
                key={tab}
                className={`${styles.filterBtn} ${activeTab === tab ? styles.active : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </ScrollReveal>

        <div className={styles.grid}>
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, idx) => (
              <ScrollReveal key={project.id} delay={idx + 1}>
                <Link href={`/loyihalar/${project.id}`} className={styles.card}>
                  <div className={styles.imgWrap}>
                    <Image 
                      src={project.image} 
                      alt={project.title} 
                      fill 
                      className={styles.image} 
                    />
                    <div className={styles.statusBadge}>
                      {project.status}
                    </div>
                  </div>
                  <div className={styles.cardBody}>
                    <h3 className={styles.cardTitle}>{project.title}</h3>
                    <p className={styles.cardDesc}>{project.desc}</p>
                    
                    {/* Progress Bar */}
                    <div className={styles.progressWrap}>
                      <div className={styles.progressHeader}>
                        <span>Amalga oshirish</span>
                        <span>{project.progress}%</span>
                      </div>
                      <div className={styles.progressBar}>
                        <div 
                          className={styles.progressFill} 
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className={styles.cardFooter}>
                      <span className={styles.viewMore}>Batafsil ko'rish</span>
                      <button className={styles.arrowBtn}>
                        <i className="fas fa-arrow-right"></i>
                      </button>
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
