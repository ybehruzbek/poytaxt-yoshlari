import Image from "next/image";
import styles from "./Hero.module.css";
import { HERO_IMAGE_URL } from "@/lib/data";

export default function Hero() {
  return (
    <section className={styles.hero} id="bosh-sahifa">
      {/* 1. Mobile Only Background Elements */}
      <div className={styles.mobileBg}>
        <Image
          src={HERO_IMAGE_URL}
          alt="Yoshlar Ittifoqi fon"
          fill
          priority
          sizes="100vw"
        />
      </div>
      <div className={styles.mobileOverlay} />

      {/* 2. Desktop Full Screen Cinematic Background */}
      <div className={styles.desktopBg}>
        <Image
          src={HERO_IMAGE_URL}
          alt="Yoshlar Ittifoqi fon"
          fill
          priority
          sizes="100vw"
        />
        <div className={styles.desktopOverlay} />
      </div>

      {/* 3. Content */}
      <div className={styles.containerWrap}>
        <div className={styles.content}>
          <div className={styles.label}>
            <i className="fas fa-star" />
            Toshkent shahar Yoshlar Ittifoqi
          </div>
          
          <h1 className={styles.title}>
            <span>Kelajakni</span>
            <span className={styles.accent}>yoshlar</span>
            <span>quradi</span>
          </h1>
          
          <p className={styles.desc}>
            Toshkent shahridagi yoshlar harakatining rasmiy markazi — rahbarlik, ta&apos;lim, volontyorlik va ijtimoiy faollik uchun platforma.
          </p>
          
          <div className={styles.actions}>
            <a href="#yonalishlar" className={styles.btnPrimary}>
              Yo&apos;nalishlar
              <i className="fas fa-arrow-right" style={{ fontSize: 13 }} />
            </a>
            <a href="#murojaat" className={styles.btnSecondary}>
              <i className="fas fa-envelope" style={{ fontSize: 14 }} />
              Murojaat yuborish
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
