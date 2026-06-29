'use client';

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/lib/data";
import PageHeader from "@/components/ui/PageHeader";
import FilterTabs from "@/components/ui/FilterTabs";
import styles from "@/components/Projects/Projects.module.css";

export default function AllProjectsPage() {
  const [activeTab, setActiveTab] = useState("Barchasi");
  
  const tabs = ["Barchasi", "Yangi", "Jarayonda", "Yakunlangan"];
  
  // A simple client-side filter
  const filteredProjects = activeTab === "Barchasi" 
    ? projects 
    : projects.filter(item => {
      // Map UI tabs to actual status values in data
      if (activeTab === "Yangi" && item.status.includes("Yangi")) return true;
      if (activeTab === "Jarayonda" && (item.status.includes("Jarayon") || item.status.includes("Ochiq"))) return true;
      if (activeTab === "Yakunlangan" && item.status.includes("Yakunlan")) return true;
      return false;
    });

  return (
    <div className="container" style={{ paddingTop: '160px', paddingBottom: '100px', minHeight: '100vh' }}>
      <PageHeader 
        label="Loyihalar"
        title="Yoshlar qamrovi kengaytirilmoqda"
        description="Bizning maqsadimiz yoshlar o'z ustida ishlashi, bilimlari va amaliy ko'nikmalarini oshirishi uchun eng zamonaviy loyiha va tanlovlarni taqdim etishdir."
        breadcrumbs={[
          { label: "Bosh sahifa", href: "/" },
          { label: "Loyihalar" }
        ]}
      />
      
      <FilterTabs 
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      
      <div className={styles.grid} style={{ marginTop: '40px' }}>
        {filteredProjects.length > 0 ? filteredProjects.map((project, i) => (
          <div className={styles.cardWrapper} key={project.id}>
            <Link href={`/loyihalar/${project.id}`} className={styles.card} style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
              <div className={styles.img}>
                <Image src={project.image} alt={project.title} width={600} height={400} sizes="(max-width: 768px) 100vw, 33vw" />
                <span className={styles.status}>{project.status}</span>
              </div>
              <div className={styles.body}>
                <h3>{project.title}</h3>
                <p>{project.desc}</p>
                <div className={styles.btnJoin}>
                  Loyihani ko'rish
                  <i className="fas fa-arrow-right" />
                </div>
              </div>
            </Link>
          </div>
        )) : (
          <div style={{ padding: '60px 0', textAlign: 'center', width: '100%', gridColumn: '1 / -1', color: 'var(--text-muted)' }}>
            Ushbu bo'limda hozircha loyihalar yo'q
          </div>
        )}
      </div>
    </div>
  );
}
