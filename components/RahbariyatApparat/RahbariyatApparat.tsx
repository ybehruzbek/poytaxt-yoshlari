import React from "react";
import styles from "./RahbariyatApparat.module.css";
import ScrollReveal from "@/components/ui/ScrollReveal";

const apparatSections = [
  {
    icon: "fa-graduation-cap",
    title: "Ta'lim va Rivojlanish Bo'limi",
    desc: "Oliy va o'rta maxsus ta'lim muassasalaridagi yoshlar bilan ishlash, to'garaklar va intellektual tanlovlarni muvofiqlashtirish.",
    color: "#0ea5e9"
  },
  {
    icon: "fa-code",
    title: "IT va Innovatsiyalar",
    desc: "Yosh dasturchilarni qo'llab-quvvatlash, startap ekotizimi va zamonaviy raqamli loyihalarni amaliyotga joriy etish.",
    color: "#8b5cf6"
  },
  {
    icon: "fa-hands-holding-circle",
    title: "Ijtimoiy Himoya",
    desc: "Ehtiyojmand oilalar farzandlari, «Yoshlar daftari» ga kiritilgan yoshlar bilan manzilli ishlash tizimi.",
    color: "#10b981"
  },
  {
    icon: "fa-medal",
    title: "Sport va Salomatlik",
    desc: "Ommaviy sport tadbirlari, marafonlar va sog'lom turmush tarzini targ'ib qilish dasturlarini boshqarish.",
    color: "#f59e0b"
  },
  {
    icon: "fa-briefcase",
    title: "Tadbirkorlik va Bandlik",
    desc: "Yoshlarni kasb-hunarga yo'naltirish, bandligini ta'minlash va biznes loyihalarini moliyalashtirishda ko'maklashish.",
    color: "#ef4444"
  },
  {
    icon: "fa-bullhorn",
    title: "Axborot Xizmati",
    desc: "Tashkilot faoliyatini OAV va ijtimoiy tarmoqlarda yoritish, jamoatchilik bilan aloqalar o'rnatish.",
    color: "#64748b"
  }
];

export default function RahbariyatApparat() {
  return (
    <section className={styles.section}>
      <div className="container">
        <ScrollReveal>
          <div className={styles.header}>
            <span className={styles.eyebrow}>Tuzilma</span>
            <h2 className={styles.title}>Markaziy Apparat Bo&apos;limlari</h2>
            <p className={styles.subtitle}>
              Har bir bo&apos;lim yoshlarning ma&apos;lum bir yo&apos;nalishidagi manfaatlari va loyihalari ustida tizimli ish olib boradi.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className={styles.megaCard}>
            <div className={styles.grid}>
              {apparatSections.map((item, index) => (
                <div 
                  key={index} 
                  className={styles.cell}
                  style={{ "--accent": item.color } as React.CSSProperties}
                >
                  <div className={styles.iconWrap}>
                    <i className={`fas ${item.icon}`}></i>
                  </div>
                  <h3 className={styles.cellTitle}>{item.title}</h3>
                  <p className={styles.cellDesc}>{item.desc}</p>
                  <div className={styles.cellAction}>
                    Batafsil <i className="fas fa-arrow-right"></i>
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
