import React from "react";
import styles from "./MissiyaValues.module.css";

const values = [
  {
    icon: "fa-hand-holding-heart",
    title: "Insonga E'tibor",
    desc: "Biz uchun har bir yoshning hayoti muhim. Biz ularni shunchaki raqamlar orqali emas, balki aniq inson taqdiri sifatida qabul qilamiz.",
    colSpan: 2, // Large card
    theme: "blue"
  },
  {
    icon: "fa-rocket",
    title: "Innovatsiyalarga Intilish",
    desc: "Doimiy ravishda IT loyihalar va raqamlashtirishni amaliyotga tatbiq etish.",
    colSpan: 1, // Normal card
    theme: "light"
  },
  {
    icon: "fa-heart-pulse",
    title: "Sog'lom Millat",
    desc: "Jismoniy va psixologik salomatlikni asrash.",
    colSpan: 1,
    theme: "light"
  },
  {
    icon: "fa-star",
    title: "Iqtidorlarni Kashf Etish",
    desc: "Olis hududlarda ham har bir yoshning noyob iste'dodini qidirib topish.",
    colSpan: 1,
    theme: "light"
  },
  {
    icon: "fa-scale-balanced",
    title: "Adolat va Haqiqat",
    desc: "Barcha masalalarni faqat qonuniy va adolatli yo'l bilan yechish.",
    colSpan: 1,
    theme: "light"
  },
  {
    icon: "fa-flag",
    title: "Vatanga Sadoqat",
    desc: "Yoshlar qalbida milliy g'urur va Vatan taraqqiyoti uchun xizmat qilish tuyg'usini shakllantirish.",
    colSpan: 2, // Large card
    theme: "dark"
  },
];

export default function MissiyaValues() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.badge}>Falsafamiz</span>
          <h2 className={styles.title}>Oltita Oltin Qadriyat</h2>
        </div>

        <div className={styles.bentoGrid}>
          {values.map((val, idx) => (
            <div 
              key={idx} 
              className={`${styles.bentoCard} ${styles[`span${val.colSpan}`]} ${styles[`theme${val.theme}`]}`}
            >
              <div className={styles.iconWrap}>
                <i className={`fas ${val.icon}`}></i>
              </div>
              <h3 className={styles.cardTitle}>{val.title}</h3>
              <p className={styles.cardDesc}>{val.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
