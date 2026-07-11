import { notFound } from "next/navigation";
import Link from "next/link";
import RichText from "@/components/ui/RichText";
import ArticleDetail from "@/components/ui/ArticleDetail/ArticleDetail";
import styles from "@/components/ui/ArticleDetail/ArticleDetail.module.css";
import { getProjectBySlug, getProjectSlugs } from "@/lib/queries";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = await getProjectBySlug(slug);
  if (!item) return { title: "Topilmadi" };
  return {
    title: `${item.title} | O'zbekiston Yoshlar Ittifoqi`,
    description: item.desc,
    openGraph: { images: [item.image] },
  };
}

export async function generateStaticParams() {
  const items = await getProjectSlugs();
  return items.map(({ slug }) => ({ slug }));
}

export default async function SingleProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = await getProjectBySlug(slug);

  if (!item) {
    notFound();
  }

  return (
    <ArticleDetail
      backHref="/loyihalar"
      backLabel="Loyihalarga qaytish"
      badge={item.status}
      badgeVariant="green"
      title={item.title}
      description={item.desc}
      image={item.image}
      imageAlt={item.title}
    >
      <h3 className={styles.sectionHeading}>Loyiha maqsadi</h3>
      <RichText text={item.content} style={{ marginBottom: "24px" }} />

      <div className={styles.ctaCard}>
        <h4>Loyihada qatnashish</h4>
        <p>
          Agar ushbu loyihaga qo&apos;shilishni istasangiz, quyidagi tugma orqali anketa
          to&apos;ldiring. Biz siz bilan tez orada bog&apos;lanamiz.
        </p>
        <Link href="/murojaat" className="btn-primary">
          Ariza topshirish
        </Link>
      </div>
    </ArticleDetail>
  );
}
