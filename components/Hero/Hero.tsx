import Image from "next/image";
import styles from "./Hero.module.css";
import { HERO_IMAGE_URL } from "@/lib/data";

export default function Hero() {
  return (
    <section className={styles.hero} id="bosh-sahifa">
      {/* Mobile-only background */}
      <div className={styles.mobileBg}>
        <Image
          src={HERO_IMAGE_URL}
          alt="Yoshlar Ittifoqi fon"
          fill
          priority
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        />
        <div className={styles.overlay} />
      </div>

      {/* Desktop Layout Container */}
      <div className={styles.desktopWrapper}>
        <div className={styles.imageWrapper}>
          <Image
            src={HERO_IMAGE_URL}
            alt="Yoshlar Ittifoqi"
            fill
            priority
            sizes="(max-width: 768px) 0vw, 70vw"
            style={{ objectFit: 'cover' }}
          />
        </div>
        
        <div className="container" style={{ position: "relative", height: "100%", width: "100%" }}>
          <div className={styles.contentCard}>
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
                Murojaat
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
