'use client';

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { News } from "@prisma/client";
import PageHeader from "@/components/ui/PageHeader";
import FilterTabs from "@/components/ui/FilterTabs";
import styles from "@/components/News/News.module.css";

interface YangiliklarClientProps {
  initialNews: News[];
}

export default function YangiliklarClient({ initialNews }: YangiliklarClientProps) {
  const [activeTab, setActiveTab] = useState("Barchasi");
  
  const tabs = ["Barchasi", "Sport", "Ta'lim", "Tadbirlar", "Texnologiya", "Ekologiya"];
  
  const filteredNews = activeTab === "Barchasi" 
    ? initialNews 
    : initialNews.filter(item => item.tag === activeTab);

  return (
    <div className="container" style={{ paddingTop: '160px', paddingBottom: '100px', minHeight: '100vh' }}>
      <PageHeader 
        label="Yangiliklar"
        title="Barcha yangiliklar va voqealar"
        description="Poytaxt yoshlari hayotidagi eng so'nggi va muhim yangiliklardan xabardor bo'ling. Sport, ta'lim, fan va madaniyat yo'nalishlaridagi yutuqlar."
        breadcrumbs={[
          { label: "Bosh sahifa", href: "/" },
          { label: "Yangiliklar" }
        ]}
      />
      
      <FilterTabs 
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      
      <div className={styles.bottomRow} style={{ marginTop: '40px' }}>
        {filteredNews.length > 0 ? filteredNews.map(item => (
          <div className={styles.flexItem} key={item.id}>
            <Link href={`/yangiliklar/${item.slug}`} className={styles.small} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className={styles.smallImg}>
                <Image src={item.image} alt={item.title} fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 33vw" />
              </div>
              <div className={styles.smallBody}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span className={styles.tag} style={{ margin: 0, background: 'var(--blue-pale)', color: 'var(--blue)' }}>{item.tag}</span>
                  <div className={styles.date}>
                    <i className="far fa-calendar" style={{ marginRight: '6px' }}/> {item.date}
                  </div>
                </div>
                
                <h3 className={styles.smallTitle} style={{ fontSize: '18px', fontWeight: 700, color: 'var(--primary-dark)', lineHeight: 1.4, marginBottom: '12px' }}>
                  {item.title}
                </h3>
                
                {item.excerpt && (
                  <p style={{ 
                    fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.6,
                    display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden',
                    marginBottom: '20px'
                  }}>
                    {item.excerpt}
                  </p>
                )}
                
                <div style={{ marginTop: 'auto', fontWeight: 600, color: 'var(--blue)', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  Batafsil o'qish <i className="fas fa-arrow-right" style={{ fontSize: '12px' }}/>
                </div>
              </div>
            </Link>
          </div>
        )) : (
          <div style={{ padding: '60px 0', textAlign: 'center', width: '100%', color: 'var(--text-muted)' }}>
            Ushbu bo'limda hozircha yangiliklar yo'q
          </div>
        )}
      </div>
    </div>
  );
}
