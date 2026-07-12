import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import BackLink from "@/components/ui/BackLink/BackLink";
import RichText from "@/components/ui/RichText";
import { getYouthLeaderById, getYouthLeaders } from "@/lib/queries";
import { accentFor } from "../accent";
import styles from "./YetakchiProfile.module.css";
import { MapPin, TelegramLogo, InstagramLogo, ArrowRight } from "@phosphor-icons/react/ssr";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await getYouthLeaderById(id);
  if (!item) return { title: "Topilmadi" };
  return {
    title: `${item.name} | O'zbekiston Yoshlar Ittifoqi`,
    description: `${item.category} yetakchisi — ${item.place}`,
  };
}

export async function generateStaticParams() {
  const items = await getYouthLeaders();
  return items.map((item) => ({ id: item.id }));
}

export default async function SingleYouthLeaderPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await getYouthLeaderById(id);

  if (!item) {
    notFound();
  }

  // Bio RichText bilan bir xil qoida bo'yicha xatboshilarga bo'linadi:
  // birinchisi hero ichida serif lede bo'lib chiqadi, qolgani "Faoliyati"da.
  const paragraphs = (item.bio ?? "")
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
  const [lede, ...rest] = paragraphs;

  const accent = accentFor(item.category, 0);

  return (
    <div className={`container page-body ${styles.page}`}>
      <BackLink href="/yetakchilar" label="Yetakchilarga qaytish" />

      <section className={styles.heroCard}>
        <div className={`${styles.naqshAccent} naqsh naqsh-rozetka`} aria-hidden="true" />

        <div className={styles.heroGrid}>
          <div className={styles.imageWrap}>
            <Image
              src={item.image}
              alt={item.name}
              fill
              style={{ objectFit: "cover", objectPosition: "center top" }}
              priority
              sizes="(max-width: 768px) 100vw, 340px"
            />
          </div>

          <div className={styles.heroBody}>
            <span
              className={styles.badge}
              style={{ background: accent.dark, color: accent.darkText }}
            >
              {item.category} yetakchisi
            </span>

            <h1 className={styles.name}>{item.name}</h1>

            <p className={styles.place}>
              <MapPin weight="duotone" /> {item.place}
            </p>

            <div className={`divider-romb ${styles.divider}`} aria-hidden="true">
              <span /><span /><span />
            </div>

            {(item.telegram || item.instagram) && (
              <div className={styles.socials}>
                {item.telegram && (
                  <a
                    href={item.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${item.name} — Telegram`}
                    className={`${styles.socialBtn} ${styles.telegram}`}
                  >
                    <TelegramLogo weight="duotone" />
                  </a>
                )}
                {item.instagram && (
                  <a
                    href={item.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${item.name} — Instagram`}
                    className={`${styles.socialBtn} ${styles.instagram}`}
                  >
                    <InstagramLogo weight="duotone" />
                  </a>
                )}
              </div>
            )}

            {lede && <p className={styles.lede}>{lede}</p>}
          </div>
        </div>
      </section>

      {rest.length > 0 && (
        <section className={styles.bioSection}>
          <h2 className={styles.sectionHeading}>Faoliyati</h2>
          <div className={styles.bioBlock}>
            <RichText text={rest.join("\n\n")} style={{ marginBottom: "16px" }} />
          </div>
        </section>
      )}

      <div className={styles.ctaRow}>
        <Link href="/yetakchilar" className="btn-primary">
          Boshqa yetakchilar bilan tanishing <ArrowRight weight="duotone" />
        </Link>
      </div>
    </div>
  );
}
