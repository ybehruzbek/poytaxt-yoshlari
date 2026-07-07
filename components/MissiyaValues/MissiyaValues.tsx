import React from "react";
import styles from "./MissiyaValues.module.css";
import ScrollReveal from "@/components/ui/ScrollReveal";

const values = [
  {
    icon: "fa-hand-holding-heart",
    title: "Insonga E'tibor",
    desc: "Biz uchun har bir yoshning hayoti muhim. Biz ularni shunchaki raqamlar orqali emas, balki aniq inson taqdiri sifatida qabul qilamiz.",
    iconColor: "#0ea5e9"
  },
  {
    icon: "fa-rocket",
    title: "Innovatsiya",
    desc: "Doimiy ravishda IT loyihalar va raqamlashtirishni amaliyotga tatbiq etish. Zamonaviy yondashuvlarni izlash.",
    iconColor: "#10b981"
  },
  {
    icon: "fa-heart-pulse",
    title: "Sog'lom Millat",
    desc: "Jismoniy va psixologik salomatlikni asrash. Sport va sog'lom turmush tarzini yoshlar orasida keng ommalashtirish.",
    iconColor: "#f59e0b"
  },
  {
    icon: "fa-star",
    title: "Iqtidor",
    desc: "Olis hududlarda ham har bir yoshning noyob iste'dodini qidirib topish va ro'yobga chiqarishga yordam berish.",
    iconColor: "#8b5cf6"
  },
  {
    icon: "fa-scale-balanced",
    title: "Adolat",
    desc: "Barcha masalalarni faqat qonuniy va adolatli yo'l bilan yechish. Korrupsiya va nohaqlikka qarshi kurashish.",
    iconColor: "#ef4444"
  },
  {
    icon: "fa-flag",
    title: "Vatanga Sadoqat",
    desc: "Yoshlar qalbida milliy g'urur va Vatan taraqqiyoti uchun xizmat qilish tuyg'usini yoshlikdanoq shakllantirish.",
    iconColor: "#0f172a"
  },
];

export default function MissiyaValues() {
  return (
    <section className={styles.bentoSection}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <ScrollReveal>
            <span className={styles.sectionLabel}>Qadriyatlar</span>
            <h2 className={styles.sectionTitle}>Oltita Oltin Qadriyat</h2>
          </ScrollReveal>
        </div>

        <div className={styles.bentoGrid}>
          {values.map((val, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div 
                className={styles.bentoCard} 
                style={{ '--card-color': val.iconColor } as React.CSSProperties}
              >
                <div className={styles.bIcon}>
                  <i className={`fas ${val.icon}`} />
                </div>
                <h3 className={styles.bTitle}>{val.title}</h3>
                <p className={styles.bDesc}>{val.desc}</p>
                <div className={styles.bAction}>Batafsil <i className="fas fa-arrow-right"></i></div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
