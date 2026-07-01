"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import styles from "./Navbar.module.css";
import { megaMenuCategories, LOGO_URL } from "@/lib/data";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [lang, setLang] = useState("UZ");
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const isHomePage = pathname === "/";
  const isScrolled = !isHomePage || scrolled || menuOpen;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight - 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    // Trigger once on mount to set initial state
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = useCallback(() => {
    setMenuOpen((prev) => {
      document.body.style.overflow = !prev ? "hidden" : "";
      return !prev;
    });
  }, []);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    document.body.style.overflow = "";
  }, []);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      if (href === "#") return;
      
      if (!isHomePage && href.startsWith("#")) {
        e.preventDefault();
        router.push(`/${href}`);
        closeMenu();
        return;
      }

      if (href.startsWith("#")) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          window.scrollTo({
            top: target.getBoundingClientRect().top + window.scrollY - 72,
            behavior: "smooth",
          });
          closeMenu();
        } else {
          closeMenu();
        }
      }
    },
    [closeMenu, isHomePage, router]
  );

  return (
    <nav
      className={`${styles.navbar} ${isScrolled ? styles.scrolled : ""}`}
      id="navbar"
      role="navigation"
      aria-label="Asosiy navigatsiya"
    >
      <div className={styles.inner}>
        {/* LOGO AREA */}
        <Link
          href="/"
          className={styles.logoWrap}
          aria-label="Bosh sahifa"
          onClick={closeMenu}
        >
          <Image src={LOGO_URL} alt="YI Logo" width={120} height={120} className={styles.logoIconImage} priority />
        </Link>

        {/* RIGHT ACTION AREA */}
        <div className={styles.rightActions}>
          <div className={styles.langSwitchWrapper} ref={langRef}>
            <div 
              className={`${styles.langSwitch} ${langOpen ? styles.langOpen : ""}`}
              onClick={() => setLangOpen(!langOpen)}
            >
              <span>{lang}</span>
              <i className={`fas fa-chevron-down ${styles.langIcon} ${langOpen ? styles.langIconOpen : ""}`} />
            </div>
            
            {langOpen && (
              <div className={styles.langDropdown}>
                {["UZ", "RU", "EN"].map((l) => (
                  <button 
                    key={l}
                    className={`${styles.langOption} ${lang === l ? styles.langActive : ""}`}
                    onClick={() => { setLang(l); setLangOpen(false); }}
                  >
                    {l}
                  </button>
                ))}
              </div>
            )}
          </div>

          <Link href="/login" className="nav-cta">
            <i className="fas fa-user-circle" />
            <span>Tizimga kirish</span>
          </Link>
          
          <button
            className={styles.menuToggleBtn}
            onClick={toggleMenu}
            aria-label="Menyu"
            aria-expanded={menuOpen}
          >
            <span style={{ display: menuOpen ? "flex" : "none", alignItems: "center", justifyContent: "center" }}>
              <i className="fas fa-times" style={{fontSize: "24px"}} />
            </span>
            <span style={{ display: menuOpen ? "none" : "flex", alignItems: "center", justifyContent: "center" }}>
              <span className={styles.menuToggleIcon}>
                <span /><span /><span />
              </span>
            </span>
          </button>
        </div>
      </div>

      {/* MEGA MENU DROPDOWN */}
      <div
        className={`${styles.megaMenuDropdown} ${menuOpen ? styles.megaMenuOpen : ""}`}
        role="dialog"
        aria-label="Kengaytirilgan menyu"
      >
        <div className={styles.megaMenuContainer}>
          <div className={styles.megaMenuBody}>
            {/* Left: Columns Grid */}
            <div className={styles.megaMenuGrid}>
              {megaMenuCategories.map((category) => (
                <div key={category.title} className={styles.menuCol}>
                  <h3 className={styles.colTitle}>{category.title}</h3>
                  <ul className={styles.colLinks}>
                    {category.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          onClick={closeMenu}
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Right: Contact Block */}
            <div className={styles.megaMenuContact}>
              <div className={styles.contactBox}>
                <h3 className={styles.contactTitle}>Qo'llab-quvvatlash markazi</h3>
                <p className={styles.contactDesc}>Toshkent shahri va viloyati bo'yicha qo'ng'iroqlar uchun</p>
                <a href="tel:+998712335577" className={styles.contactPhone}>+998 71 233 55 77</a>
                
                <p className={styles.contactDesc}>Respublika bo'yicha</p>
                <a href="tel:1093" className={styles.contactPhone}>1093</a>

                <p className={styles.contactDesc}>Elektron pochta</p>
                <a href="mailto:info@yoshlartoshkent.uz" className={styles.contactEmail}>info@yoshlartoshkent.uz</a>

                <div className={styles.socialIcons}>
                  <a href="#" aria-label="Telegram" className={styles.socialLink}><i className="fab fa-telegram-plane" /></a>
                  <a href="#" aria-label="Instagram" className={styles.socialLink}><i className="fab fa-instagram" /></a>
                  <a href="#" aria-label="Facebook" className={styles.socialLink}><i className="fab fa-facebook-f" /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
