"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import styles from "./Navbar.module.css";
import { navLinks, LOGO_URL } from "@/lib/data";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight - 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    // Trigger once on mount to set initial state
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
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
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        window.scrollTo({
          top: target.getBoundingClientRect().top + window.scrollY - 72,
          behavior: "smooth",
        });
        closeMenu();
      }
    },
    [closeMenu]
  );

  return (
    <>
      <nav
        className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}
        id="navbar"
        role="navigation"
        aria-label="Asosiy navigatsiya"
      >
        <div className={styles.inner}>
          {/* LOGO AREA */}
          <a
            href="#bosh-sahifa"
            className={styles.logoWrap}
            aria-label="Bosh sahifa"
            onClick={(e) => handleNavClick(e, "#bosh-sahifa")}
          >
            <Image src={LOGO_URL} alt="YI Logo" width={54} height={54} className={styles.logoIconImage} priority />

          </a>

          {/* NAV LINKS */}
          <ul className={styles.navLinks}>
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={styles.navLink}
                  onClick={(e) => handleNavClick(e, link.href)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* RIGHT ACTION AREA */}
          <div className={styles.rightActions}>
            <div className={styles.langSwitch}>
              <span>UZ</span>
              <i className="fas fa-chevron-down" style={{ fontSize: 10, marginLeft: 4 }} />
            </div>
            <a
              href="#murojaat"
              className={styles.navCta}
              onClick={(e) => handleNavClick(e, "#murojaat")}
            >
              Murojaat
            </a>
            
            <button
              className={`${styles.hamburger} ${menuOpen ? styles.hamburgerActive : ""}`}
              onClick={toggleMenu}
              aria-label="Menyu"
              aria-expanded={menuOpen}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ""}`}
        role="dialog"
        aria-label="Mobil menyu"
      >
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={styles.mobLink}
            onClick={(e) => handleNavClick(e, link.href)}
          >
            {link.label}
          </a>
        ))}
        <a
          href="#murojaat"
          className={`${styles.navCta} ${styles.mobLink}`}
          onClick={(e) => handleNavClick(e, "#murojaat")}
          style={{ marginTop: "24px" }}
        >
          Murojaat
        </a>
      </div>
    </>
  );
}
