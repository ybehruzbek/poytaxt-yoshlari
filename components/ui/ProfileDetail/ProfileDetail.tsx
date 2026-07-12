import { ReactNode } from "react";
import Image from "next/image";
import BackLink from "@/components/ui/BackLink/BackLink";
import styles from "./ProfileDetail.module.css";
import { TelegramLogo, InstagramLogo, Envelope, User } from "@phosphor-icons/react/ssr";
import type { Icon as PhosphorIcon } from "@phosphor-icons/react";

export interface ProfileSocial {
  href: string;
  /** Legacy ikon-klass identifikatori (ikki so'zli FontAwesome klassi, masalan brand-prefiks + telegram-plane) — quyidagi resolveSocialIcon() orqali Phosphor komponentiga o'giriladi */
  icon: string;
  label: string;
  variant: "blue" | "pink" | "green";
}

// `icon` maydoni chaqiruvchi sahifalardan (masalan app/rahbariyat/[id]/page.tsx,
// app/yetakchilar/[id]/page.tsx — ular bu guruh tomonidan boshqarilmaydi) to'liq
// FontAwesome klassi sifatida keladi. Shu sababli bu yerda mahalliy xarita orqali
// Phosphor komponentiga moslashtiramiz.
const socialIconMap: Record<string, PhosphorIcon> = {
  "fa-telegram-plane": TelegramLogo,
  "fa-instagram": InstagramLogo,
  "fa-envelope": Envelope,
};

function resolveSocialIcon(faClass: string): PhosphorIcon {
  const token = faClass.split(/\s+/).find((c) => c.startsWith("fa-"));
  return (token && socialIconMap[token]) || User;
}

interface ProfileDetailProps {
  backHref: string;
  backLabel: string;
  image: string;
  imageAlt: string;
  imagePosition?: string;
  badge: string;
  name: string;
  subtitle: ReactNode;
  socials?: ProfileSocial[];
  children?: ReactNode;
}

export default function ProfileDetail({
  backHref,
  backLabel,
  image,
  imageAlt,
  imagePosition,
  badge,
  name,
  subtitle,
  socials,
  children,
}: ProfileDetailProps) {
  return (
    <div className={`container page-body ${styles.page}`}>
      <BackLink href={backHref} label={backLabel} />

      <div className={styles.layout}>
        <div className={styles.imageWrap}>
          <Image
            src={image}
            alt={imageAlt}
            fill
            style={{ objectFit: "cover", objectPosition: imagePosition ?? "center" }}
            priority
          />
        </div>

        <div>
          <span className={styles.badge}>{badge}</span>
          <h1 className={styles.title}>{name}</h1>
          <p className={styles.subtitle}>{subtitle}</p>

          {socials && socials.length > 0 && (
            <div className={styles.socials}>
              {socials.map((s) => {
                const SocialIcon = resolveSocialIcon(s.icon);
                return (
                  <a
                    key={s.href}
                    href={s.href}
                    className={`${styles.socialBtn} ${styles[s.variant]}`}
                    aria-label={s.label}
                  >
                    <SocialIcon weight="duotone" />
                  </a>
                );
              })}
            </div>
          )}

          <div className={styles.body}>{children}</div>
        </div>
      </div>
    </div>
  );
}
