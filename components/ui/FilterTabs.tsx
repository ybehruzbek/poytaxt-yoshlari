'use client';

import { useState } from 'react';
import styles from './FilterTabs.module.css';

interface FilterTabsProps {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function FilterTabs({ tabs, activeTab, onTabChange }: FilterTabsProps) {
  return (
    <div className={styles.filterWrapper}>
      <div className={styles.tabsContainer}>
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`${styles.tab} ${activeTab === tab ? styles.active : ''}`}
            onClick={() => onTabChange(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      
      <div className={styles.searchContainer}>
        <i className={`fas fa-search ${styles.searchIcon}`}></i>
        <input 
          type="text" 
          placeholder="Qidirish..." 
          className={styles.searchInput}
        />
      </div>
    </div>
  );
}
