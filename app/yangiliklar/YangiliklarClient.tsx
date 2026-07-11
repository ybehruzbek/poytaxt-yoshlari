'use client';

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { News } from "@prisma/client";
import PageHeader from "@/components/ui/PageHeader";
import FilterTabs from "@/components/ui/FilterTabs";
import styles from "./Yangiliklar.module.css";

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
    <>
      <PageHeader
        label="Yangiliklar"
        title="Barcha yangiliklar va voqealar"
        description="Poytaxt yoshlari hayotidagi eng so'nggi va muhim yangiliklardan xabardor bo'ling. Sport, ta'lim, fan va madaniyat yo'nalishlaridagi yutuqlar."
        breadcrumbs={[
          { label: "Bosh sahifa", href: "/" },
          { label: "Yangiliklar" }
        ]}
      />

      <div className="container page-body">
        <FilterTabs
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {filteredNews.length > 0 ? (
          <div className={styles.grid}>
            {filteredNews.map(item => (
              <Link href={`/yangiliklar/${item.slug}`} key={item.id} className={styles.card}>
                <div className={styles.imageWrap}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className={styles.image}
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <span className={styles.tag}>{item.tag}</span>
                </div>
                <div className={styles.body}>
                  <span className={styles.date}>
                    <i className="far fa-calendar" /> {item.date}
                  </span>
                  <h3 className={styles.title}>{item.title}</h3>
                  {item.excerpt && <p className={styles.excerpt}>{item.excerpt}</p>}
                  <span className={styles.more}>
                    Batafsil o&apos;qish <i className="fas fa-arrow-right" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className={styles.empty}>
            Ushbu bo&apos;limda hozircha yangiliklar yo&apos;q
          </div>
        )}
      </div>
    </>
  );
}
