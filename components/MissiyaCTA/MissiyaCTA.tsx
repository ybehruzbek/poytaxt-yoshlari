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
            {/* Girih rozetka — burchakda, oq, bilinar-bilinmas; bitta uzluksiz
                radial gradient bilan so'nadi (qattiq halqa bo'lmasligi uchun). */}
            <div className={`${styles.ctaNaqsh} naqsh naqsh-rozetka`} aria-hidden="true"></div>
            <h2 className={styles.ctaTitle}>Kelajakni Biz Bilan Qur!</h2>
            <p className={styles.ctaDesc}>
              O'zbekiston Yoshlar Ittifoqi safida ko'ngilli (volontyor) bo'lishni xohlaysizmi? Yoki jamoamizdagi yirik loyihalarning bir qismi bo'lmoqchimisiz? Biz sizni kutmoqdamiz.
            </p>
            <Link href="/murojaat" className={`btn-hero-secondary ${styles.ctaBtn}`}>
              <span>Qo'shilish</span>
              <Rocket weight="duotone" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
