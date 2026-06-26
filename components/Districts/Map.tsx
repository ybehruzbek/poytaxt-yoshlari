"use client";

import { useState } from "react";
import styles from "./Districts.module.css";
import { districts } from "@/lib/data";
import TashkentMapSVG from "./TashkentMapSVG";

export default function Map() {
  const [activeDistrict, setActiveDistrict] = useState<string | null>("Yunusobod");

  const activeData = activeDistrict 
    ? districts.find(d => {
        const svgId = activeDistrict.toLowerCase().replace(/[^a-z]/g, '');
        const dataId = d.name.toLowerCase().replace(/[^a-z]/g, '');
        return svgId === dataId || (svgId === 'chilonzor' && dataId === 'chilanzar') || (svgId === 'sirgali' && dataId === 'sergeli') || (svgId === 'ulugbek' && dataId === 'mirzoulugbek');
      }) 
    : null;

  return (
    <div className={styles.mapSectionContainer}>
      <div 
        className={styles.mapSidebar}
        style={{
          backgroundImage: activeData ? `url(${activeData.image})` : 'none',
        }}
      >
        <div className={styles.sidebarOverlay}></div>
        <div className={styles.sidebarContent}>
          {activeData ? (
            <div className={styles.activeInfo}>
              <div className={styles.infoLabel}>Tuman</div>
              <h3 className={styles.infoTitle}>{activeData.name}</h3>
              <div className={styles.infoStat}>
                <span className={styles.statNumber}>{activeData.youth}</span>
                <span className={styles.statText}>faol yoshlar</span>
              </div>
              <p className={styles.infoDesc}>
                {activeData.name} tumanida yoshlar siyosati doirasida turli loyihalar amalga oshirilmoqda.
              </p>
            </div>
          ) : (
            <div className={styles.emptyInfo}>
              <div className={styles.infoIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 14a8 8 0 0 1-8 8"></path>
                  <path d="M18 11v-1a2 2 0 0 0-2-2v0a2 2 0 0 0-2-2h-1"></path>
                  <path d="M14 6V5a2 2 0 0 0-2-2v0a2 2 0 0 0-2-2h-1a2 2 0 0 0-2 2v0a2 2 0 0 0-2 2v1"></path>
                  <path d="M10 9V8a2 2 0 0 0-2-2v0a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a8 8 0 0 0 8 8h1"></path>
                </svg>
              </div>
              <h3 className={styles.emptyTitle}>Toshkent xaritasi</h3>
              <p className={styles.emptyDesc}>
                Ma'lumot olish uchun xaritadagi tumanlardan birini bosing.
              </p>
            </div>
          )}
        </div>
      </div>

      <div className={styles.mapSvgArea}>
        <TashkentMapSVG 
          activeDistrict={activeDistrict} 
          onDistrictHover={() => {}} // Disabled hover
          onDistrictClick={setActiveDistrict} 
        />
      </div>
    </div>
  );
}
