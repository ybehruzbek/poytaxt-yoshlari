import React from "react";
import styles from "./MissiyaDirections.module.css";

const overlapCards = [
  {
    id: 1,
    icon: "fa-shield-halved",
    title: "Huquqiy va Ijtimoiy Himoya",
    desc: "Yoshlarning ijtimoiy-iqtisodiy, siyosiy hamda ma'naviy huquqlarini har qanday vaziyatda munosib himoya qilish. Biz qonunchilik tashabbuslari bilan chiqib, yoshlarning munosib mehnat, ta'lim va yashash sharoitlariga ega bo'lishini ta'minlash yo'lida davlat tuzilmalari bilan hamkorlik qilamiz.",
    color: "#0ea5e9", // Blue
  },
  {
    id: 2,
    icon: "fa-graduation-cap",
    title: "Ta'lim va Bandlik Klasteri",
    desc: "Yoshlarning sifatli ta'lim olishi va o'z mutaxassisligi bo'yicha barqaror daromad manbaiga ega bo'lishini qo'llab-quvvatlash. Bepul o'quv kurslari, xorijiy tillarga tayyorlash, kasb-hunarga o'qitish va biznes startaplar uchun yoshlarga doimiy amaliy yordam va grantlar taqdim etish.",
    color: "#10b981", // Green
  },
  {
    id: 3,
    icon: "fa-globe",
    title: "Ijtimoiy Faollik va Ekologiya",
    desc: "Yoshlarni jamiyat boshqaruvida va turli tashabbuslarda ishtirok etishga jalb qilish. Respublika miqyosida volontyorlik (ko'ngillilar) harakatini kengaytirish, ekologik barqarorlikni ta'minlashga qaratilgan amaliy tadbirlar orqali vatanparvarlik va fuqarolik mas'uliyatini shakllantirish.",
    color: "#8b5cf6", // Purple
  },
];

export default function MissiyaDirections() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        
        <div className={styles.header}>
          <h2 className={styles.sectionTitle}>Uchta Ustuvor Yo'nalish</h2>
          <p className={styles.sectionDesc}>
            Bizning faoliyatimiz butun mamlakat yoshlarining hayotini qamrab oluvchi uchta asosiy ustunga tayanadi.
          </p>
        </div>

        <div className={styles.cardsStack}>
          {overlapCards.map((card, index) => (
            <div 
              key={card.id} 
              className={styles.cardWrapper}
              style={{ top: `calc(120px + ${index * 40}px)` }}
            >
              <div className={styles.cardInner} style={{ borderTop: `6px solid ${card.color}` }}>
                <div className={styles.cardHeader}>
                  <div className={styles.iconWrap} style={{ color: card.color, backgroundColor: `${card.color}15` }}>
                    <i className={`fas ${card.icon}`}></i>
                  </div>
                  <div className={styles.cardNumber}>0{card.id}</div>
                </div>
                <h3 className={styles.cardTitle}>{card.title}</h3>
                <p className={styles.cardDesc}>{card.desc}</p>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
