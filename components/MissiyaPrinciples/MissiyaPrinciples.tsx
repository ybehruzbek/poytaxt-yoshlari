import React from "react";
import styles from "./MissiyaPrinciples.module.css";
import ScrollReveal from "@/components/ui/ScrollReveal";
import {
  Eye,
  Equals,
  Target,
  HandsClapping,
  Lightning,
  TrendUp,
} from "@phosphor-icons/react/ssr";

const principles = [
  {
    id: 1,
    num: "01",
    icon: Eye,
    title: "Ochiqlik va Shaffoflik",
    desc: "Bizda xalqdan, yoshlardan yashiriladigan yopiq qarorlar yo'q. Hamma narsa shaffof va bevosita muloqotga asoslanadi.",
    color: "var(--blue)",
  },
  {
    id: 2,
    num: "02",
    icon: Equals,
    title: "Teng Imkoniyat",
    desc: "Katta shahardagi talaba bo'ladimi yoki olis tumandagi uy bekasi, yoshlarning kelib chiqishidan qat'i nazar barchasi teng huquqli a'zodir.",
    color: "var(--green)",
  },
  {
    id: 3,
    num: "03",
    icon: Target,
    title: "Amaliy Natija",
    desc: "Biz qog'ozbozlik va rasmiyatchilikni emas, yoshlar hayotidagi aniq o'zgarishlarni o'zimizning asosiy ish mezonimiz deb bilamiz.",
    color: "var(--amber)",
  },
  {
    id: 4,
    num: "04",
    icon: HandsClapping,
    title: "Birdamlik",
    desc: "Yoshlar Ittifoqi davlat organlari va boshqa nodavlat tashkilotlar bilan uzviy hamkorlikda ishlaydi.",
    color: "var(--teal)",
  },
  {
    id: 5,
    num: "05",
    icon: Lightning,
    title: "Tashabbuskorlik",
    desc: "Biz yoshlarni shunchaki kuzatuvchi emas, balki jamiyatdagi o'zgarishlarning faol ishtirokchisi va harakatlantiruvchi kuchi bo'lishga undaymiz.",
    color: "var(--accent-orange)",
  },
  {
    id: 6,
    num: "06",
    icon: TrendUp,
    title: "Doimiy Rivojlanish",
    desc: "Har bir muammoga innovatsion va zamonaviy yechimlar izlash, yoshlarni zamon talablariga mos mutaxassis bo'lib yetishishlariga yordam berish.",
    color: "var(--blue-deep)",
  },
];

export default function MissiyaPrinciples() {
  return (
    <section className={styles.projectsSection}>
      <div className="container">
        <ScrollReveal>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionLabel}>Tamoyillar</span>
            <h2 className={styles.sectionTitle}>Biz Qanday Ishlaymiz?</h2>
          </div>
        </ScrollReveal>

        <div className={styles.projectsGrid}>
          {principles.map((p, i) => {
            const Icon = p.icon;
            return (
              <ScrollReveal key={p.id} delay={i + 1}>
                <div
                  className={styles.projectCard}
                  style={{ "--card-color": p.color } as React.CSSProperties}
                >
                  <div className={styles.pIcon}>
                    <Icon weight="duotone" />
                  </div>
                  <div className={styles.pBody}>
                    <div className={styles.pHeadRow}>
                      <h3 className={styles.pTitle}>{p.title}</h3>
                      <span className={styles.pNum}>{p.num}</span>
                    </div>
                    <p className={styles.pDesc}>{p.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
