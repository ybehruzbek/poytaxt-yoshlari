"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Footer.module.css";
import { LOGO_URL, footerNav, footerResources, footerContact, socialLinks } from "@/lib/data";
import {
  MapPin,
  Phone,
  Envelope,
  Clock,
  TelegramLogo,
  InstagramLogo,
  YoutubeLogo,
  FacebookLogo,
} from "@phosphor-icons/react/ssr";
import type { Icon as PhosphorIcon } from "@phosphor-icons/react";

// lib/data.ts FontAwesome satr identifikatorlarini saqlaydi — bu yerda
// mahalliy xarita orqali Phosphor komponentiga moslashtiramiz (Contact.tsx
// bilan bir xil yondashuv).
const contactIconMap: Record<string, PhosphorIcon> = {
  "fa-map-marker-alt": MapPin,
  "fa-phone": Phone,
  "fa-envelope": Envelope,
  "fa-clock": Clock,
};

const socialIconMap: Record<string, PhosphorIcon> = {
  "fa-telegram-plane": TelegramLogo,
  "fa-instagram": InstagramLogo,
  "fa-youtube": YoutubeLogo,
  "fa-facebook-f": FacebookLogo,
};

export default function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;

  return (
    <footer className={styles.footer}>
      <div className={styles.glow} aria-hidden />

      <div className="container">
        <div className={styles.mainContent}>
          <div className={styles.brandCol}>
            <div className={styles.logoWrap}>
              <Image
                src={LOGO_URL}
                alt="YI logotip"
                width={130}
                height={130}
                className={styles.logo}
              />
            </div>
            <p className={styles.brandDesc}>
              O&apos;zbekiston Yoshlar Ittifoqi — yoshlarning huquq va manfaatlarini himoya qiluvchi, ularning salohiyatini ro&apos;yobga chiqarishga ko&apos;maklashuvchi eng yirik jamoat tashkiloti.
            </p>
            <div className={styles.socials}>
              {socialLinks.map((link) => {
                const SocialIcon = socialIconMap[link.icon] ?? TelegramLogo;
                return (
                  <a key={link.label} href={link.href} aria-label={link.label} className={styles.socialLink}>
                    <SocialIcon weight="duotone" />
                  </a>
                );
              })}
            </div>
          </div>

          <div className={styles.linksGrid}>
            <div className={styles.linkGroup}>
              <h4>Navigatsiya</h4>
              <ul>
                {footerNav.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.linkGroup}>
              <h4>Resurslar</h4>
              <ul>
                {footerResources.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.linkGroup}>
              <h4>Aloqa</h4>
              <ul className={styles.contactList}>
                {footerContact.map((item, i) => {
                  const ContactIcon = contactIconMap[item.icon] ?? MapPin;
                  return (
                    <li key={i}>
                      <ContactIcon weight="duotone" />
                      <span>{item.text}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>

        <div className={styles.ornament} aria-hidden />

        <div className={styles.bottomBar}>
          <p className={styles.copyright}>&copy; {new Date().getFullYear()} O&apos;zbekiston Yoshlar Ittifoqi. Barcha huquqlar himoyalangan.</p>
          <div className={styles.legalLinks}>
            <Link href="/maxfiylik-siyosati">Maxfiylik siyosati</Link>
            <span className={styles.dot}></span>
            <Link href="/foydalanish-shartlari">Foydalanish shartlari</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
