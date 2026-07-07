import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./RahbariyatHero.module.css";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function RahbariyatHero() {
  return (
    <section className={styles.heroContainer}>
      <div className={styles.heroBox}>
        <div className={styles.bgImageWrap}>
          <Image
            src="/rahbariyat_hero_bg.png"
            alt="Rahbariyat"
            fill
            priority
            className={styles.bgImage}
          />
        </div>

        <div className="container" style={{ position: "relative", zIndex: 2, width: "100%" }}>
          <div className={styles.heroContent}>
            <ScrollReveal>
              <nav aria-label="breadcrumb" className={styles.breadcrumbs}>
                <ol>
                  <li>
                    <Link href="/">Bosh sahifa</Link>
                    <span className={styles.separator}>/</span>
                  </li>
                  <li>
                    <Link href="/tashkilot">Tashkilot haqida</Link>
                    <span className={styles.separator}>/</span>
                  </li>
                  <li className={styles.activeCrumb}>Rahbariyat</li>
                </ol>
              </nav>

              <h1 className={styles.heroTitle}>
                KENGASH<br />RAHBARIYATI
              </h1>
              <p className={styles.heroDesc}>
                Yoshlar manfaati yo&apos;lida kun-u tun xizmat qilish, har bir murojaat ortidagi
                inson taqdiriga daxldorlik hissi bilan yashash — bizning bosh maqsadimizdir.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
