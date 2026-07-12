import React from "react";
import Image from "next/image";
import type { YouthLeader } from "@prisma/client";
import styles from "./RahbariyatHeroes.module.css";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { MapPin, ArrowRight } from "@phosphor-icons/react/ssr";

export default function RahbariyatHeroes({ items: youthLeaders }: { items: YouthLeader[] }) {
  return (
    <section className={styles.section}>
      <div className="container">
        <ScrollReveal>
          <div className={styles.header}>
            <span className={styles.eyebrow}>Qahramonlar</span>
            <h2 className={styles.title}>Joylardagi Yetakchilarimiz</h2>
            <p className={styles.subtitle}>
              Yoshlar Ittifoqi faqatgina markaziy binoda emas, balki har bir mahalla, har bir oliygoh va maktabda eng ilg&apos;or yoshlarimiz orqali faoliyat olib boradi.
            </p>
          </div>
        </ScrollReveal>

        <div className={styles.grid}>
          {youthLeaders.map((youth, index) => (
            <ScrollReveal key={youth.id} delay={index * 0.15}>
              <div className={styles.card}>
                <div className={styles.avatarWrap}>
                  <Image 
                    src={youth.image} 
                    alt={youth.name} 
                    fill 
                    className={styles.avatarImg}
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                  <div className={styles.categoryBadge}>{youth.category}</div>
                </div>
                
                <div className={styles.info}>
                  <h3 className={styles.name}>{youth.name}</h3>
                  <div className={styles.place}>
                    <MapPin weight="duotone" />
                    {youth.place}
                  </div>
                </div>

                <div className={styles.cardFooter}>
                  <button className={styles.profileBtn}>
                    Batafsil <ArrowRight weight="duotone" />
                  </button>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
