import Link from 'next/link';
import TextReveal from '@/components/ui/TextReveal';
import ScrollReveal from '@/components/ui/ScrollReveal';
import styles from './PageHeader.module.css';

interface Breadcrumb {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  label: string;
  title: string;
  description?: string;
  breadcrumbs: Breadcrumb[];
}

export default function PageHeader({ label, title, description, breadcrumbs }: PageHeaderProps) {
  return (
    <header className={styles.headerWrapper}>
      <div className="container">
      <ScrollReveal>
        <nav aria-label="breadcrumb" className={styles.breadcrumbs}>
          <ol>
            {breadcrumbs.map((crumb, index) => {
              const isLast = index === breadcrumbs.length - 1;
              return (
                <li key={index} className={isLast ? styles.active : ''}>
                  {crumb.href && !isLast ? (
                    <>
                      <Link href={crumb.href}>{crumb.label}</Link>
                      <span className={styles.separator}>/</span>
                    </>
                  ) : (
                    <span>{crumb.label}</span>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
      </ScrollReveal>

      <ScrollReveal delay={1}>
        <div className="section-label">{label}</div>
      </ScrollReveal>

      {/* Sarlavha o'z so'z-niqob animatsiyasiga ega (TextReveal) — label'dan
          keyin boshlanishi uchun kichik kechikish beriladi. */}
      <TextReveal as="h1" text={title} className={styles.title} delay={0.25} />

      <ScrollReveal delay={2}>
        {description && <p className={styles.description}>{description}</p>}
        <div className="divider-romb" aria-hidden="true">
          <span /><span /><span />
        </div>
      </ScrollReveal>
      </div>
    </header>
  );
}
