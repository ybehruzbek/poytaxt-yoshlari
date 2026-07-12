import React from "react";
import Link from "next/link";
import styles from "./MissiyaCTA.module.css";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { Rocket } from "@phosphor-icons/react/ssr";

export default function MissiyaCTA() {
  return (
    <section className={styles.ctaSection}>
      <div className="container">
        <ScrollReveal>
          <div className={styles.ctaBox}>
            <h2 className={styles.ctaTitle}>Kelajakni Biz Bilan Qur!</h2>
            <p className={styles.ctaDesc}>
              O'zbekiston Yoshlar Ittifoqi safida ko'ngilli (volontyor) bo'lishni xohlaysizmi? Yoki jamoamizdagi yirik loyihalarning bir qismi bo'lmoqchimisiz? Biz sizni kutmoqdamiz.
            </p>
            <Link href="/murojaat" className={styles.ctaBtn}>
              <span>Qo'shilish</span>
              <Rocket weight="duotone" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
