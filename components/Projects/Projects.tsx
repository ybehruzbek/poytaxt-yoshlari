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
              <Link href={`/loyihalar/${project.id}`} className={styles.card} style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
                <div className={styles.img}>
                  <Image src={project.image} alt={project.title} width={600} height={400} sizes="(max-width: 768px) 100vw, 33vw" />
                  <span className={styles.status}>{project.status}</span>
                </div>
                <div className={styles.body}>
                  <h3>{project.title}</h3>
                  <p>{project.desc}</p>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
