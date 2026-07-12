import Image from "next/image";
import Link from "next/link";
import type { Leader } from "@prisma/client";
import styles from "./Leadership.module.css";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { InstagramLogo, TelegramLogo } from "@phosphor-icons/react/ssr";

export default function Leadership({ items }: { items: Leader[] }) {
  return (
    <section className={styles.section} id="rahbariyat">
      <div className="container">
        <ScrollReveal>
          <div className={styles.header}>
            <h2 className={styles.title}>Rahbariyat</h2>
            <p className={styles.desc}>
              Toshkent shahar Yoshlar Ittifoqi Kengashining mas'ul xodimlari va koordinatorlari bilan tanishing. Biz doimo yoshlar bilan muloqotga tayyormiz.
            </p>
          </div>
        </ScrollReveal>

        <div className={styles.grid}>
          {items.map((leader, i) => (
            <ScrollReveal key={leader.id} delay={i + 1}>
              <Link href={`/rahbariyat/${leader.id}`} className={styles.card}>
                <div className={styles.imgWrap}>
                  <Image
                    src={leader.image}
                    alt={leader.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 360px"
                  />
                  <div className={styles.socials}>
                    <div className={styles.socialBtn}><InstagramLogo weight="duotone" /></div>
                    <div className={styles.socialBtn}><TelegramLogo weight="duotone" /></div>
                  </div>
                </div>
                <div className={styles.body}>
                  <h3>{leader.name}</h3>
                  <p>{leader.position}</p>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
