"use client";

import { useState, useCallback, FormEvent, useEffect, useRef } from "react";
import styles from "./Appeals.module.css";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { appealTypes, appealGuarantees } from "@/lib/data";
import {
  CaretDown,
  Check,
  PaperPlaneTilt,
  Lock,
  X,
  Shield,
  Clock,
  CheckCircle,
} from "@phosphor-icons/react/ssr";
import type { Icon as PhosphorIcon } from "@phosphor-icons/react";

// appealGuarantees kelib chiqishi lib/data.ts dagi umumiy ma'lumotlar
// massividan — u fayl boshqa guruh tomonidan boshqariladi va hali
// FontAwesome satr identifikatorlarini saqlaydi. Shu sababli bu yerda
// mahalliy xarita orqali Phosphor komponentiga moslashtiramiz.
const guaranteeIconMap: Record<string, PhosphorIcon> = {
  "fa-shield-halved": Shield,
  "fa-clock": Clock,
  "fa-circle-check": CheckCircle,
};

const CustomSelect = ({ 
  options, 
  value, 
  onChange, 
  label 
}: { 
  options: string[], 
  value: string, 
  onChange: (val: string) => void, 
  label: string 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={styles.inputWrapper} ref={dropdownRef} style={{ marginBottom: label === "Murojaat turi" ? "20px" : "" }}>
      <div 
        className={`${styles.formInput} ${styles.customSelectHeader} ${isOpen ? styles.selectOpen : ""} ${value ? styles.hasValue : ""}`} 
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={value ? styles.valText : styles.placeholderText}>
          {value || " "}
        </span>
        <CaretDown weight="duotone" className={`${styles.selectIcon} ${isOpen ? styles.iconOpen : ""}`} />
      </div>
      <label className={value || isOpen ? styles.formLabelActive : styles.formLabel}>{label} *</label>

      {isOpen && (
        <ul className={styles.customOptions}>
          {options.map(opt => (
            <li 
              key={opt} 
              className={`${styles.customOption} ${value === opt ? styles.selectedOption : ""}`}
              onClick={() => {
                onChange(opt);
                setIsOpen(false);
              }}
            >
              {opt}
              {value === opt && <Check weight="duotone" style={{ marginLeft: "auto", color: "var(--blue)" }} />}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default function Appeals({ districtNames }: { districtNames: string[] }) {
  const [showToast, setShowToast] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [tuman, setTuman] = useState("");
  const [turi, setTuri] = useState("");

  const handleSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const ism = (form.elements.namedItem("ism") as HTMLInputElement).value;
    const familiya = (form.elements.namedItem("familiya") as HTMLInputElement).value;
    const tel = (form.elements.namedItem("tel") as HTMLInputElement).value;
    const xabar = (form.elements.namedItem("xabar") as HTMLTextAreaElement).value;

    if (!ism || !familiya || !tel || !tuman || !turi || !xabar) {
      alert("Iltimos, barcha maydonlarni to'ldiring!");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const res = await fetch("/api/appeals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ism, familiya, tel, tuman, turi, xabar })
      });
      
      if (res.ok) {
        setShowToast(true);
        form.reset();
        setTuman("");
        setTuri("");
        
        setTimeout(() => setShowToast(false), 4000);
      } else {
        const data = await res.json();
        alert(data.error || "Xatolik yuz berdi");
      }
    } catch {
      alert("Tizimda xatolik yuz berdi. Iltimos keyinroq urunib ko'ring.");
    } finally {
      setIsSubmitting(false);
    }
  }, [tuman, turi]);

  return (
    <section className={styles.section} id="murojaat">
      <div className={styles.bgBlob1} />
      <div className={styles.bgBlob2} />

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <div className={styles.layout}>
          {/* Left: Info */}
          <ScrollReveal>
            <div className={styles.leftContent}>
              <div className="section-label">Ariza yuborish</div>
              <h2 className={styles.title}>
                Ovozingizni <br /> eshitamiz
              </h2>
              <p className={styles.desc}>
                Takliflar, murojaatlar yoki tashabbuslaringizni yuboring. Har bir xat rahbariyat tomonidan shaxsan o'qiladi va ko'rib chiqiladi.
              </p>

              <div className={styles.guarantees}>
                {appealGuarantees.map((g, i) => {
                  const GuaranteeIcon = guaranteeIconMap[g.icon] ?? Shield;
                  return (
                    <div className={styles.guaranteeItem} key={i}>
                      <div
                        className={styles.gIcon}
                        style={{
                          background: `linear-gradient(135deg, ${g.iconBg}, #ffffff)`,
                          color: g.iconColor
                        }}
                      >
                        <GuaranteeIcon weight="duotone" />
                      </div>
                      <div>
                        <div className={styles.gTitle}>{g.title}</div>
                        <div className={styles.gDesc}>{g.desc}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </ScrollReveal>

          {/* Right: Form */}
          <ScrollReveal delay={2}>
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.formHeader}>
                <h3>Arizani to'ldirish</h3>
                <p>Ma'lumotlaringiz xavfsizligi to'liq kafolatlanadi.</p>
              </div>

              <div className={styles.formRow}>
                <div className={styles.inputWrapper}>
                  <input type="text" name="ism" required placeholder=" " className={styles.formInput} id="ism" />
                  <label htmlFor="ism" className={styles.formLabel}>Ismingiz *</label>
                </div>
                <div className={styles.inputWrapper}>
                  <input type="text" name="familiya" required placeholder=" " className={styles.formInput} id="familiya" />
                  <label htmlFor="familiya" className={styles.formLabel}>Familiyangiz *</label>
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.inputWrapper}>
                  <input type="tel" name="tel" required placeholder=" " className={styles.formInput} id="tel" />
                  <label htmlFor="tel" className={styles.formLabel}>Telefon *</label>
                </div>
                
                <CustomSelect 
                  options={districtNames}
                  value={tuman}
                  onChange={setTuman}
                  label="Tumaningiz"
                />
              </div>

              <CustomSelect 
                options={appealTypes as unknown as string[]}
                value={turi}
                onChange={setTuri}
                label="Murojaat turi"
              />

              <div className={styles.inputWrapper}>
                <textarea
                  name="xabar"
                  required
                  rows={4}
                  placeholder=" "
                  className={styles.formTextarea}
                  id="xabar"
                />
                <label htmlFor="xabar" className={styles.formLabel}>Xabaringiz *</label>
              </div>

              <button 
                type="submit" 
                className={`${styles.submitBtn} ${isSubmitting ? styles.submitting : ""}`}
                disabled={isSubmitting}
              >
                <span className={styles.btnText}>
                  {isSubmitting ? "Yuborilmoqda..." : "Murojaatni yuborish"}
                </span>
                <PaperPlaneTilt weight="duotone" className={styles.btnIcon} />
              </button>

              <p className={styles.formNote}>
                <Lock weight="duotone" style={{ marginRight: '6px', opacity: 0.6 }} />
                Yuborish orqali shaxsiy ma'lumotlarni qayta ishlash siyosatiga rozilik bildirasiz.
              </p>
            </form>
          </ScrollReveal>
        </div>
      </div>

      {/* Toast */}
      <div className={`${styles.toast} ${showToast ? styles.toastShow : ""}`}>
        <div className={styles.toastIcon}>
          <Check weight="duotone" />
        </div>
        <div className={styles.toastContent}>
          <h4>Muvaffaqiyatli!</h4>
          <p>Murojaatingiz yuborildi. Tez orada siz bilan bog'lanamiz.</p>
        </div>
        <button type="button" className={styles.toastClose} onClick={() => setShowToast(false)}>
          <X weight="duotone" />
        </button>
      </div>
    </section>
  );
}
