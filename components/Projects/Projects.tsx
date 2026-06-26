"use client";

import Image from "next/image";
import styles from "./Projects.module.css";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { projects } from "@/lib/data";

export default function Projects() {
  return (
    <section className={styles.projects} id="loyihalar">
      <div className="container">
        <ScrollReveal>
          <div className={styles.header}>
            <div>
              <div className="section-label">Faol loyihalar</div>
              <h2 className="section-title">Hozirda amalga oshirilayotgan dasturlar</h2>
            </div>
            <a href="#" className={styles.viewAllBtn}>
              Barcha loyihalar
              <i className="fas fa-arrow-right" />
            </a>
          </div>
        </ScrollReveal>

        <div className={styles.grid}>
          {projects.map((project, i) => (
            <ScrollReveal key={project.id} delay={Math.min(i + 1, 6)} className={styles.cardWrapper}>
              <div className={styles.card}>
                <div className={styles.img}>
                  <Image src={project.image} alt={project.title} width={600} height={400} sizes="(max-width: 768px) 100vw, 33vw" />
                  <span className={styles.status}>{project.status}</span>
                </div>
                <div className={styles.body}>
                  <h3>{project.title}</h3>
                  <p>{project.desc}</p>
                  <button className={styles.btnJoin}>
                    Qatnashish <i className="fas fa-arrow-right" />
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
