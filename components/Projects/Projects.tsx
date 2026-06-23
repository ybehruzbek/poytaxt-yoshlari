"use client";

import Image from "next/image";
import styles from "./Projects.module.css";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ProgressBar from "@/components/ui/ProgressBar";
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
            <a href="#" className="btn-secondary" style={{ padding: "9px 20px", fontSize: 13 }}>
              Barcha loyihalar
              <i className="fas fa-arrow-right" style={{ fontSize: 11 }} />
            </a>
          </div>
        </ScrollReveal>

        <div className={styles.grid}>
          {projects.map((project, i) => (
            <ScrollReveal key={project.id} delay={Math.min(i + 1, 6)}>
              <div className={styles.card}>
                <div className={styles.img}>
                  <Image src={project.image} alt={project.title} width={600} height={400} sizes="(max-width: 768px) 100vw, 33vw" />
                  <span className={styles.status}>{project.status}</span>
                </div>
                <div className={styles.body}>
                  <h3>{project.title}</h3>
                  <p>{project.desc}</p>
                  <div className={styles.progressWrap}>
                    <div className={styles.progressTop}>
                      <span className={styles.pLabel}>Jadval</span>
                      <span className={styles.pValue}>{project.progress}%</span>
                    </div>
                    <ProgressBar value={project.progress} />
                  </div>
                  <button className={styles.btnJoin}>
                    Qatnashish <i className="fas fa-arrow-right" style={{ fontSize: 11 }} />
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
