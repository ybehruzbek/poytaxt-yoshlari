import { notFound } from "next/navigation";
import RichText from "@/components/ui/RichText";
import ArticleDetail from "@/components/ui/ArticleDetail/ArticleDetail";
import styles from "@/components/ui/ArticleDetail/ArticleDetail.module.css";
import { getNewsBySlug, getNewsSlugs } from "@/lib/queries";
import { Calendar } from "@phosphor-icons/react/ssr";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = await getNewsBySlug(slug);
  if (!item) return { title: "Topilmadi" };
  return {
    title: `${item.title} | O'zbekiston Yoshlar Ittifoqi`,
    description: item.excerpt ?? undefined,
    openGraph: { images: [item.image] },
  };
}

export async function generateStaticParams() {
  const items = await getNewsSlugs();
  return items.map(({ slug }) => ({ slug }));
}

export default async function SingleNewsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = await getNewsBySlug(slug);

  if (!item) {
    notFound();
  }

  return (
    <ArticleDetail
      backHref="/yangiliklar"
      backLabel="Ortga qaytish"
      badge={item.tag}
      badgeVariant="blue"
      meta={
        <span className={styles.meta}>
          <Calendar weight="duotone" /> {item.date}
        </span>
      }
      title={item.title}
      image={item.image}
      imageAlt={item.title}
    >
      <RichText text={item.content ?? item.excerpt} style={{ marginBottom: "24px" }} />
    </ArticleDetail>
  );
}
