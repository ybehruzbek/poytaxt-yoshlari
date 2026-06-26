import Image from "next/image";
import styles from "./Contact.module.css";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { contactInfoItems, socialLinks } from "@/lib/data";

export default function Contact() {
  return (
    <section className={styles.section} id="aloqa">
      <div className="container">
        <ScrollReveal>
          <div className={styles.headerCenter}>
            <div className="section-label">Aloqa</div>
            <h2 className="section-title">
              Bog&apos;lanish uchun
            </h2>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className={styles.layout}>
            {/* Left: Info */}
            <div className={styles.infoCards}>
              {contactInfoItems.map((item, i) => (
                <div className={styles.infoCard} key={i}>
                  <div
                    className={styles.infoIcon}
                    style={{ background: item.iconBg, color: item.iconColor }}
                  >
                    <i className={`fas ${item.icon}`} />
                  </div>
                  <div>
                    <div className={styles.infoLabel}>{item.label}</div>
                    {"values" in item ? (
                      item.values.map((v, j) => (
                        <div className={styles.infoValue} key={j}>{v}</div>
                      ))
                    ) : (
                      <div className={styles.infoValue}>{item.value}</div>
                    )}
                  </div>
                </div>
              ))}

              {/* Social */}
              <div className={styles.socialCard}>
                <div className={styles.socialTitle}>Ijtimoiy tarmoqlar</div>
                <div className={styles.socialGrid}>
                  {socialLinks.map((link) => {
                    const colorClass =
                      link.label === "Telegram" ? styles.telegram :
                      link.label === "Instagram" ? styles.instagram :
                      link.label === "Facebook" ? styles.facebook :
                      styles.youtube;
                    return (
                      <a
                        key={link.label}
                        href={link.href}
                        className={`${styles.socialBtn} ${colorClass}`}
                        aria-label={link.label}
                      >
                        <i className={`fab ${link.icon}`} />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right: Map */}
            <div className={styles.mapWrap}>
              <div className={styles.mapPlaceholder}>
                <Image
                  src="https://picsum.photos/seed/tashkent-map-view/1200/800"
                  alt="Toshkent xaritasi"
                  fill
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  style={{ objectFit: "cover", opacity: 0.5 }}
                />
                <div className={styles.mapCard}>
                  <div className={styles.mapIcon}>
                    <i className="fas fa-map-marker-alt" />
                  </div>
                  <div className={styles.mapTitle}>Toshkent shahar</div>
                  <div className={styles.mapAddr}>Amir Temur ko&apos;chasi, 107A</div>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.mapBtn}
                  >
                    <i className="fas fa-location-arrow" />
                    Xaritada ochish
                  </a>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
