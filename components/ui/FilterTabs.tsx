'use client';

import { useState } from 'react';
import styles from './FilterTabs.module.css';
import { MagnifyingGlass } from '@phosphor-icons/react/ssr';

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
        <MagnifyingGlass weight="duotone" className={styles.searchIcon} />
        <input 
          type="text" 
          placeholder="Qidirish..." 
          className={styles.searchInput}
        />
      </div>
    </div>
  );
}
