import React from "react";
import styles from "./MissiyaValues.module.css";
import ScrollReveal from "@/components/ui/ScrollReveal";
import {
  HandHeart,
  Rocket,
  Heartbeat,
  Star,
  Scales,
  Flag,
} from "@phosphor-icons/react/ssr";

const values = [
  {
    icon: HandHeart,
    title: "Insonga E'tibor",
    desc: "Biz uchun har bir yoshning hayoti muhim. Biz ularni shunchaki raqamlar orqali emas, balki aniq inson taqdiri sifatida qabul qilamiz.",
    iconColor: "var(--blue)"
  },
  {
    icon: Rocket,
    title: "Innovatsiya",
    desc: "Doimiy ravishda IT loyihalar va raqamlashtirishni amaliyotga tatbiq etish. Zamonaviy yondashuvlarni izlash.",
    iconColor: "var(--green-check)"
  },
  {
    icon: Heartbeat,
    title: "Sog'lom Millat",
    desc: "Jismoniy va psixologik salomatlikni asrash. Sport va sog'lom turmush tarzini yoshlar orasida keng ommalashtirish.",
    iconColor: "var(--amber)"
  },
  {
    icon: Star,
    title: "Iqtidor",
    desc: "Olis hududlarda ham har bir yoshning noyob iste'dodini qidirib topish va ro'yobga chiqarishga yordam berish.",
    iconColor: "var(--teal)"
  },
  {
    icon: Scales,
    title: "Adolat",
    desc: "Barcha masalalarni faqat qonuniy va adolatli yo'l bilan yechish. Korrupsiya va nohaqlikka qarshi kurashish.",
    iconColor: "var(--accent-orange)"
  },
  {
    icon: Flag,
    title: "Vatanga Sadoqat",
    desc: "Yoshlar qalbida milliy g'urur va Vatan taraqqiyoti uchun xizmat qilish tuyg'usini yoshlikdanoq shakllantirish.",
    iconColor: "var(--blue-deep)"
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
          {values.map((val, i) => {
            const Icon = val.icon;
            return (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div
                  className={styles.bentoCard}
                  style={{ '--card-color': val.iconColor } as React.CSSProperties}
                >
                  {/* Girih to'r — faqat birinchi (urg'uli) kartada, ikonka
                      yonidagi yuqori burchakda, matnga tegmaydi. */}
                  {i === 0 && (
                    <div className={`${styles.cardPattern} naqsh naqsh-yulduz`} aria-hidden="true"></div>
                  )}
                  <div className={styles.bIcon}>
                    <Icon weight="duotone" />
                  </div>
                  <h3 className={styles.bTitle}>{val.title}</h3>
                  <p className={styles.bDesc}>{val.desc}</p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
