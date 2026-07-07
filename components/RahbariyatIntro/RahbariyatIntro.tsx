import React from "react";
import Image from "next/image";
import styles from "./RahbariyatIntro.module.css";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function RahbariyatIntro() {
  return (
    <section className={styles.section}>
      <div className="container">
        <ScrollReveal>
          <div className={styles.wrapper}>
            
            <div className={styles.content}>
              <div className={styles.quoteMark}>&ldquo;</div>
              
              <h2 className={styles.text}>
                Rahbarlik bu — shunchaki kursida o&apos;tirish emas. Bu yuz minglab yoshlarning taqdiri oldida javobgarlik va tinimsiz xizmat qilish deganidir.
              </h2>
            </div>
            
            <div className={styles.authorBadge}>
              <div className={styles.avatarWrap}>
                <Image 
                  src="/images/tashkilot/tashkilot_chairman_1782907129930.png" 
                  alt="Jasur Karimov" 
                  fill 
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className={styles.authorInfo}>
                <span className={styles.name}>Jasur Karimov</span>
                <span className={styles.position}>Toshkent shahar Kengashi Raisi</span>
              </div>
            </div>

          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
