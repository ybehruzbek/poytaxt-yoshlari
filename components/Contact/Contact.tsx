import styles from "./Contact.module.css";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { contactInfoItems, socialLinks } from "@/lib/data";
import {
  MapPin,
  Phone,
  Envelope,
  NavigationArrow,
  TelegramLogo,
  InstagramLogo,
  YoutubeLogo,
  FacebookLogo,
} from "@phosphor-icons/react/ssr";
import type { Icon as PhosphorIcon } from "@phosphor-icons/react";

// contactInfoItems / socialLinks lib/data.ts dagi umumiy massivdan keladi
// (u fayl boshqa guruh tomonidan boshqariladi va FontAwesome satr
// identifikatorlarini saqlaydi) — shu sababli bu yerda mahalliy xarita
// orqali Phosphor komponentiga moslashtiramiz.
const contactIconMap: Record<string, PhosphorIcon> = {
  "fa-map-marker-alt": MapPin,
  "fa-phone": Phone,
  "fa-envelope": Envelope,
};

const socialIconMap: Record<string, PhosphorIcon> = {
  "fa-telegram-plane": TelegramLogo,
  "fa-instagram": InstagramLogo,
  "fa-youtube": YoutubeLogo,
  "fa-facebook-f": FacebookLogo,
};

export default function Contact() {
  return (
    <section className={styles.section} id="aloqa">
      <div className="container">
        <ScrollReveal>
          <div className={styles.headerCenter}>
            <div className="section-label">Aloqa</div>
            <h2 className="section-title">
              Biz bilan bog'laning
            </h2>
            <p className={styles.headerDesc}>
              Savollaringiz bo'lsa yoki hamkorlik qilmoqchi bo'lsangiz, quyidagi raqamlar orqali bizga chiqing.
            </p>
          </div>
        </ScrollReveal>

        <div className={styles.layout}>
          {/* Left: Info */}
          <div className={styles.infoCards}>
            {contactInfoItems.map((item, i) => {
              const InfoIcon = contactIconMap[item.icon] ?? MapPin;
              return (
                <ScrollReveal delay={i} key={i}>
                  <div className={styles.infoCard}>
                    <div
                      className={styles.infoIcon}
                      style={{
                        background: `linear-gradient(135deg, ${item.iconBg}, #ffffff)`,
                        color: item.iconColor
                      }}
                    >
                      <InfoIcon weight="duotone" />
                    </div>
                    <div>
                      <div className={styles.infoLabel}>{item.label}</div>
                      {"values" in item ? (
                        <div className={styles.infoValueGroup}>
                          {item.values.map((v, j) => (
                            <div className={styles.infoValue} key={j}>{v}</div>
                          ))}
                        </div>
                      ) : (
                        <div className={styles.infoValue}>{item.value}</div>
                      )}
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}

            {/* Social */}
            <ScrollReveal delay={3}>
              <div className={styles.socialCard}>
                <div className={styles.socialTitle}>Ijtimoiy tarmoqlar:</div>
                <div className={styles.socialGrid}>
                  {socialLinks.map((link) => {
                    const colorClass =
                      link.label === "Telegram" ? styles.telegram :
                      link.label === "Instagram" ? styles.instagram :
                      link.label === "Facebook" ? styles.facebook :
                      styles.youtube;
                    const SocialIcon = socialIconMap[link.icon] ?? TelegramLogo;
                    return (
                      <a
                        key={link.label}
                        href={link.href}
                        className={`${styles.socialBtn} ${colorClass}`}
                        aria-label={link.label}
                      >
                        <SocialIcon weight="duotone" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right: Map */}
          <ScrollReveal delay={4}>
            <div className={styles.mapWrap}>
              <iframe 
                src="https://maps.google.com/maps?q=O'zMU%20Madaniyat%20saroy,%20Universitet%20Ko'chasi,%20Toshkent,%20O%CA%BBzbekiston&t=&z=16&ie=UTF8&iwloc=&output=embed" 
                className={styles.mapIframe}
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className={styles.mapFloatingAction}>
                <a
                  href="https://maps.google.com/?q=O'zMU+Madaniyat+saroy,Universitet+Ko'chasi,Toshkent,Oʻzbekiston"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.mapBtn}
                >
                  <NavigationArrow weight="duotone" />
                  Xaritada ochish
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
