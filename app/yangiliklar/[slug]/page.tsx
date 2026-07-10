import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import RichText from "@/components/ui/RichText";
import { getNewsBySlug, getNewsSlugs } from "@/lib/queries";

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
    <div className="container" style={{ paddingTop: '160px', paddingBottom: '100px', minHeight: '100vh', maxWidth: '900px' }}>

      <Link href="/yangiliklar" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', textDecoration: 'none', marginBottom: '32px', fontWeight: 600, fontSize: '14px' }}>
        <i className="fas fa-arrow-left" /> Ortga qaytish
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
        <span style={{
          background: 'var(--blue-pale)', color: 'var(--blue)', padding: '6px 14px',
          borderRadius: '100px', fontSize: '13px', fontWeight: 700
        }}>
          {item.tag}
        </span>
        <div style={{ fontSize: '14px', color: 'var(--text-muted)', fontWeight: 500 }}>
          <i className="far fa-calendar" style={{ marginRight: '6px' }}/> {item.date}
        </div>
      </div>

      <h1 style={{ fontSize: '36px', fontWeight: 800, marginBottom: '32px', color: 'var(--primary-dark)', lineHeight: 1.3 }}>
        {item.title}
      </h1>

      <div style={{ position: 'relative', width: '100%', height: '450px', borderRadius: '24px', overflow: 'hidden', marginBottom: '40px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
        <Image src={item.image} alt={item.title} fill style={{ objectFit: 'cover' }} priority />
      </div>

      <div style={{ fontSize: '18px', color: 'var(--text)', lineHeight: 1.8 }}>
        <RichText text={item.content ?? item.excerpt} style={{ marginBottom: '24px' }} />
      </div>

    </div>
  );
}
