"use client";

import { useState, useCallback, FormEvent } from "react";
import styles from "./Appeals.module.css";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { appealTypes, appealGuarantees, districts } from "@/lib/data";

export default function Appeals() {
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();
    setShowToast(true);
    (e.target as HTMLFormElement).reset();
    setTimeout(() => setShowToast(false), 3000);
  }, []);

  return (
    <section className={styles.section} id="murojaat">
      <div className="container">
        <div className={styles.layout}>
          {/* Left: Info */}
          <ScrollReveal>
            <div>
              <div className="section-label">Murojaatlar</div>
              <h2 className="section-title">
                Ovozingizni eshitamiz
              </h2>
              <p className="section-desc">
                Takliflar, murojaatlar yoki tashabbuslaringizni yuboring — har bir murojaat alohida ko&apos;rib chiqiladi va javob beriladi.
              </p>

              <div className={styles.guarantees}>
                {appealGuarantees.map((g, i) => (
                  <div className={styles.guaranteeItem} key={i}>
                    <div
                      className={styles.gIcon}
                      style={{ background: g.iconBg, color: g.iconColor }}
                    >
                      <i className={`fas ${g.icon}`} />
                    </div>
                    <div>
                      <div className={styles.gTitle}>{g.title}</div>
                      <div className={styles.gDesc}>{g.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Right: Form */}
          <ScrollReveal>
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.formRow}>
                <div>
                  <label className={styles.formLabel}>Ism *</label>
                  <input type="text" required placeholder="Ismingiz" className={styles.formInput} />
                </div>
                <div>
                  <label className={styles.formLabel}>Familiya *</label>
                  <input type="text" required placeholder="Familiyangiz" className={styles.formInput} />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Telefon raqam *</label>
                <input type="tel" required placeholder="+998 90 123 45 67" className={styles.formInput} />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Email</label>
                <input type="email" placeholder="email@example.com" className={styles.formInput} />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Murojaat turi *</label>
                <select required className={styles.formSelect} defaultValue="">
                  <option value="" disabled>Tanlang...</option>
                  {appealTypes.map((type) => (
                    <option key={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Tuman</label>
                <select className={styles.formSelect} defaultValue="">
                  <option value="" disabled>Tanlang...</option>
                  {districts.map((d) => (
                    <option key={d.name}>{d.name}</option>
                  ))}
                </select>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Xabaringiz *</label>
                <textarea
                  required
                  rows={5}
                  placeholder="Murojaatingizni batafsil yozing..."
                  className={styles.formTextarea}
                />
              </div>

              <button type="submit" className={styles.submitBtn}>
                <i className="fas fa-paper-plane" />
                Murojaatni yuborish
              </button>
              <p className={styles.formNote}>
                Yuborish orqali maxfiylik siyosatiga rozilik bildirasiz.
              </p>
            </form>
          </ScrollReveal>
        </div>
      </div>

      {/* Toast */}
      <div className={`${styles.toast} ${showToast ? styles.toastShow : ""}`}>
        <i className="fas fa-check-circle" />
        Murojaatingiz muvaffaqiyatli yuborildi!
      </div>
    </section>
  );
}
