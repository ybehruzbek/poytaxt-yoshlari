import React from "react";
import Image from "next/image";
import styles from "./MissiyaPrinciples.module.css";
import ScrollReveal from "@/components/ui/ScrollReveal";

const principles = [
  {
    id: 1,
    title: "Ochiqlik va Shaffoflik",
    desc: "Bizda xalqdan, yoshlardan yashiriladigan yopiq qarorlar yo'q. Hamma narsa shaffof va bevosita muloqotga asoslanadi.",
    image: "/images/tashkilot/uzbek_patriotic_youths.png",
  },
  {
    id: 2,
    title: "Teng Imkoniyat",
    desc: "Katta shahardagi talaba bo'ladimi yoki olis tumandagi uy bekasi, yoshlarning kelib chiqishidan qat'i nazar barchasi teng huquqli a'zodir.",
    image: "/images/projects/project_sports_1782905415673.png",
  },
  {
    id: 3,
    title: "Amaliy Natija",
    desc: "Biz qog'ozbozlik va rasmiyatchilikni emas, yoshlar hayotidagi aniq o'zgarishlarni o'zimizning asosiy ish mezonimiz deb bilamiz.",
    image: "/images/projects/project_eco_1782905423561.png",
  },
  {
    id: 4,
    title: "Birdamlik",
    desc: "Yoshlar Ittifoqi davlat organlari va boshqa nodavlat tashkilotlar bilan uzviy hamkorlikda ishlaydi.",
    image: "/images/tashkilot/tashkilot_hero_1782907121959.png",
  },
  {
    id: 5,
    title: "Tashabbuskorlik",
    desc: "Biz yoshlarni shunchaki kuzatuvchi emas, balki jamiyatdagi o'zgarishlarning faol ishtirokchisi va harakatlantiruvchi kuchi bo'lishga undaymiz.",
    image: "/images/projects/project_sports_1782905415673.png",
  },
  {
    id: 6,
    title: "Doimiy Rivojlanish",
    desc: "Har bir muammoga innovatsion va zamonaviy yechimlar izlash, yoshlarni zamon talablariga mos mutaxassis bo'lib yetishishlariga yordam berish.",
    image: "/images/projects/project_eco_1782905423561.png",
  }
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
          {principles.map((p, i) => (
            <ScrollReveal key={p.id} delay={i * 0.1}>
              <div className={styles.projectCard}>
                <div className={styles.pImageWrap}>
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className={styles.pInfo}>
                  <h3 className={styles.pTitle}>{p.title}</h3>
                  <p className={styles.pDesc}>{p.desc}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
