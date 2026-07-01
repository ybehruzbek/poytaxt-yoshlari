"use client";

import Image from "next/image";
import Link from "next/link";
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
            <Link href="/loyihalar" className="btn-view-all">
              Barcha loyihalar
              <i className="fas fa-arrow-right" />
            </Link>
          </div>
        </ScrollReveal>

        <div className={styles.grid}>
          {projects.map((project, i) => (
            <ScrollReveal key={project.id} delay={Math.min(i + 1, 6)} className={styles.cardWrapper}>
              <Link href={`/loyihalar/${project.id}`} className={styles.card}>
                <Image src={project.image} alt={project.title} fill sizes="(max-width: 768px) 100vw, 33vw" className={styles.bgImage} />
                <div className={styles.overlay}>
                  <span className={styles.status}>{project.status}</span>
                  <div className={styles.body}>
                    <h3>{project.title}</h3>
                    <p>{project.desc}</p>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
