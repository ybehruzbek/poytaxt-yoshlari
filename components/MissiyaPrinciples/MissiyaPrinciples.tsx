"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import styles from "./MissiyaPrinciples.module.css";

const principles = [
  {
    num: "01",
    title: "Ochiqlik, Shaffoflik va Muloqot",
    desc: "Bizda xalqdan, yoshlardan yashiriladigan yopiq qarorlar yo'q. Hamma narsa shaffof va bevosita muloqotga asoslanadi.",
    actions: [
      "Barcha dastur va tadbirlar oldindan e'lon qilinadi",
      "Ajratilgan mablag'lar qat'iy jamoatchilik nazoratida bo'ladi",
      "Rahbariyat bilan ochiq elektron va to'g'ridan-to'g'ri muloqot qilish imkoniyati"
    ]
  },
  {
    num: "02",
    title: "Hamma Uchun Teng Imkoniyat",
    desc: "Katta shahardagi talaba bo'ladimi yoki olis tumandagi uy bekasi, yoshlarning kelib chiqishidan qat'i nazar barchasi teng huquqli a'zodir.",
    actions: [
      "Grantlar va tanlovlar maxsus komissiya tomonidan shaffof tarzda taqsimlanadi",
      "Maxsus inkluziv dasturlar amaliyotga joriy qilingan",
      "Hududlar kesimida ta'lim klasterlariga teng kvotalar kafolatlangan"
    ]
  },
  {
    num: "03",
    title: "So'z Emas, Amaliy Natija",
    desc: "Biz qog'ozbozlik va rasmiyatchilikni emas, yoshlar hayotidagi aniq o'zgarishlarni o'zimizning asosiy ish mezonimiz deb bilamiz.",
    actions: [
      "Loyihalar \"qancha odam keldi\" emas, \"necha nafar yosh ishli bo'ldi\" deb baholanadi",
      "Byurokratik to'siqlarsiz tezkor ko'mak ko'rsatish",
      "An'anaviy yig'ilishlardan voz kechilib, amaliy maydonchalarga o'tildi"
    ]
  },
  {
    num: "04",
    title: "Hamkorlik va Birdamlik",
    desc: "Yoshlar Ittifoqi davlat organlari va boshqa nodavlat tashkilotlar bilan uzviy hamkorlikda ishlaydi.",
    actions: [
      "Xalqaro yoshlar tashkilotlari bilan tajriba almashish",
      "Yosh tadbirkorlar biznes inkubatorlari bilan qo'shma loyihalar",
      "Ota-onalar va mahalla faollari bilan birgalikdagi forumlar"
    ]
  }
];

export default function MissiyaPrinciples() {
  const [openIndex, setOpenIndex] = useState<number>(0); // First one open by default

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.badge}>Tamoyillarimiz</span>
          <h2 className={styles.title}>Biz Qanday Ishlaymiz?</h2>
        </div>

        <div className={styles.accordionList}>
          {principles.map((p, index) => {
            const isOpen = openIndex === index;
            
            return (
              <div 
                key={p.num} 
                className={`${styles.accordionItem} ${isOpen ? styles.isOpen : ""}`}
              >
                <button 
                  className={styles.accordionHeader}
                  onClick={() => toggleAccordion(index)}
                  aria-expanded={isOpen}
                >
                  <div className={styles.headerLeft}>
                    <span className={styles.num}>{p.num}</span>
                    <h3 className={styles.accordionTitle}>{p.title}</h3>
                  </div>
                  <div className={styles.iconWrap}>
                    <i className={`fas fa-plus ${styles.plusIcon}`}></i>
                  </div>
                </button>
                
                <AnimatePresence>
                  {isOpen && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                      className={styles.accordionContentWrap}
                    >
                      <div className={styles.accordionContent}>
                        <p className={styles.desc}>{p.desc}</p>
                        <ul className={styles.actionsList}>
                          {p.actions.map((action, i) => (
                            <li key={i}>
                              <i className="fas fa-check-circle"></i>
                              {action}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
