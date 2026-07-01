import Image from "next/image";
import styles from "./Footer.module.css";
import { LOGO_URL, footerNav, footerResources, footerContact, socialLinks } from "@/lib/data";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.top}>
          <div className={styles.brand}>
            <Image src={LOGO_URL} alt="YI logotip" width={120} height={34} />
            <p>
              O&apos;zbekiston Yoshlar Ittifoqi — yoshlarning huquq va manfaatlarini himoya qiluvchi, ularning salohiyatini ro&apos;yobga chiqarishga ko&apos;maklashuvchi eng yirik jamoat tashkiloti.
            </p>
            <div className={styles.social}>
              {socialLinks.map((link) => {
                const colorClass =
                  link.label === "Telegram" ? styles.telegram :
                  link.label === "Instagram" ? styles.instagram :
                  link.label === "Facebook" ? styles.facebook :
                  styles.youtube;
                return (
                  <a 
                    key={link.label} 
                    href={link.href} 
                    aria-label={link.label}
                    className={colorClass}
                  >
                    <i className={`fab ${link.icon}`} />
                  </a>
                );
              })}
            </div>
          </div>

          <div className={styles.col}>
            <h4>Navigatsiya</h4>
            <ul>
              {footerNav.map((item) => (
                <li key={item.href}><a href={item.href}>{item.label}</a></li>
              ))}
            </ul>
          </div>

          <div className={styles.col}>
            <h4>Resurslar</h4>
            <ul>
              {footerResources.map((item) => (
                <li key={item.label}><a href={item.href}>{item.label}</a></li>
              ))}
            </ul>
          </div>

          <div className={styles.col}>
            <h4>Aloqa</h4>
            <ul className={styles.contact}>
              {footerContact.map((item, i) => (
                <li key={i}>
                  <i className={`fas ${item.icon}`} />
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>&copy; {new Date().getFullYear()} O&apos;zbekiston Yoshlar Ittifoqi</p>
          <p>
            <a href="#">Maxfiylik siyosati</a> &middot; <a href="#">Foydalanish shartlari</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
