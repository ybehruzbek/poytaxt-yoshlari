import Image from "next/image";
import styles from "./About.module.css";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { aboutCards } from "@/lib/data";

export default function About() {
  return (
    <section className={styles.about} id="tashkilot">
      <div className="container">
        <div className={styles.splitLayout}>
          
          <div className={styles.leftCol}>
            <ScrollReveal>
              <h2 className={styles.introText}>
                <span className={styles.highlight}>O'zbekiston Yoshlar Ittifoqi</span> — yoshlarning huquq va manfaatlarini himoya qiluvchi, o'z g'oya va tashabbuslarini ro'yobga chiqarishga yordam beruvchi eng yirik jamoat tashkilotidir.
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={1} className={styles.imageWrapper}>
              <Image 
                src="/images/about/about_editorial.png"
                alt="Yoshlar yetakchisi"
                fill
                className={styles.image}
              />
            </ScrollReveal>
          </div>

          <div className={styles.rightCol}>
            <div className={styles.list}>
              {aboutCards.map((card, i) => (
                <ScrollReveal key={i} delay={i + 1}>
                  <div className={styles.listItem}>
                    <div className={styles.itemHeader}>
                      <span className={styles.itemNumber}>0{i + 1}</span>
                      <h3 className={styles.itemTitle}>{card.title}</h3>
                    </div>
                    <p className={styles.itemDesc}>{card.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
