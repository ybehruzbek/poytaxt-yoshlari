import React from 'react';
import styles from './HujjatlarGuarantees.module.css';
import ScrollReveal from '@/components/ui/ScrollReveal';

const guarantees = [
  {
    icon: "fa-clock-rotate-left",
    iconBg: "rgba(14, 165, 233, 0.08)",
    iconColor: "var(--blue, #0ea5e9)",
    title: "Doimiy Yangilanish",
    desc: "Barcha qarorlar va buyruqlar qabul qilingan zahoti arxivga joylanadi va yoshlar e'tiboriga havola etiladi."
  },
  {
    icon: "fa-shield-halved",
    iconBg: "rgba(16, 185, 129, 0.08)",
    iconColor: "var(--green, #10b981)",
    title: "To'liq Qonuniylik",
    desc: "Tashkilotimizning har bir xarajat va harakati huquqiy baza asosida amalga oshiriladi va ochiqdir."
  },
  {
    icon: "fa-eye",
    iconBg: "rgba(245, 158, 11, 0.08)",
    iconColor: "#f59e0b",
    title: "Jamoatchilik Nazorati",
    desc: "Bizning arxiv barcha yoshlar va OAV uchun mutlaqo ochiq bo'lib, ular istalgan vaqtda foydalanishi mumkin."
  }
];

export default function HujjatlarGuarantees() {
  return (
    <section className={styles.section}>
      <div className="container">
        <ScrollReveal>
          <div className={styles.guaranteeBox}>
            
            <div className={styles.header}>
              <span className={styles.badge}>Shaffoflik Kafolati</span>
              <h2 className={styles.title}>Biz nega doim ochiqmiz?</h2>
              <p className={styles.desc}>
                Toshkent shahar Kengashi yoshlar bilan doimiy ishonchli muloqot o'rnatish tarafdori. 
                Shu sababli barcha huquqiy hujjatlarni va hisobotlarni jamoatchilik uchun ochiq holda e'lon qilib boramiz.
              </p>
            </div>

            <div className={styles.grid}>
              {guarantees.map((item, idx) => (
                <div key={idx} className={styles.card}>
                  <div className={styles.bgNumber}>0{idx + 1}</div>
                  
                  <div className={styles.cardContent}>
                    <div 
                      className={styles.iconBox}
                      style={{ background: item.iconBg, color: item.iconColor }}
                    >
                      <i className={`fas ${item.icon}`}></i>
                    </div>
                    
                    <h3 className={styles.cardTitle}>{item.title}</h3>
                    <p className={styles.cardDesc}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
