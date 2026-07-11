import Link from 'next/link';
import TextReveal from '@/components/ui/TextReveal';
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
    <div className={styles.headerWrapper}>
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

      <div className="section-label">{label}</div>
      <TextReveal as="h1" text={title} className={styles.title} />
      {description && <p className={styles.description}>{description}</p>}
    </div>
  );
}
