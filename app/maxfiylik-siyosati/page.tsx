import PageHeader from "@/components/ui/PageHeader";

export const metadata = {
  title: "Maxfiylik siyosati | O'zbekiston Yoshlar Ittifoqi",
  description:
    "Platformada shaxsiy ma'lumotlar bilan ishlash tartibi (TZ §19.1).",
};

export default function MaxfiylikSiyosatiPage() {
  return (
    <div style={{ background: "var(--bg-light, #f8fafc)", paddingBottom: "80px" }}>
      <PageHeader
        label="Huquqiy"
        title="Maxfiylik siyosati"
        breadcrumbs={[{ label: "Bosh sahifa", href: "/" }, { label: "Maxfiylik siyosati" }]}
      />
      <div className="container" style={{ maxWidth: 720 }}>
        <p style={{ fontSize: 15.5, lineHeight: 1.8, color: "var(--text-secondary)" }}>
          Ushbu sahifa tayyorlanmoqda. Ro&apos;yxatdan o&apos;tish, murojaat
          yuborish va tadbirga yozilish jarayonida siz kiritgan shaxsiy
          ma&apos;lumotlar faqat platforma xizmatlarini ko&apos;rsatish
          maqsadida ishlatiladi va uchinchi shaxslarga berilmaydi. To&apos;liq
          matn tez orada joylashtiriladi.
        </p>
      </div>
    </div>
  );
}
