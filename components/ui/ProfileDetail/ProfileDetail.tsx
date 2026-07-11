import { ReactNode } from "react";
import Image from "next/image";
import BackLink from "@/components/ui/BackLink/BackLink";
import styles from "./ProfileDetail.module.css";

export interface ProfileSocial {
  href: string;
  /** To'liq FontAwesome klassi, masalan "fab fa-telegram-plane" yoki "fas fa-envelope" */
  icon: string;
  label: string;
  variant: "blue" | "pink" | "green";
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
              {socials.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  className={`${styles.socialBtn} ${styles[s.variant]}`}
                  aria-label={s.label}
                >
                  <i className={s.icon} />
                </a>
              ))}
            </div>
          )}

          <div className={styles.body}>{children}</div>
        </div>
      </div>
    </div>
  );
}
