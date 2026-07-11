import PageHeader from "@/components/ui/PageHeader";

export const metadata = {
  title: "Foydalanish shartlari | O'zbekiston Yoshlar Ittifoqi",
  description: "Platformadan foydalanish qoidalari.",
};

export default function FoydalanishShartlariPage() {
  return (
    <div className="page-body">
      <PageHeader
        label="Huquqiy"
        title="Foydalanish shartlari"
        breadcrumbs={[{ label: "Bosh sahifa", href: "/" }, { label: "Foydalanish shartlari" }]}
      />
      <div className="container" style={{ maxWidth: 720 }}>
        <p style={{ fontSize: 15.5, lineHeight: 1.8, color: "var(--text-secondary)" }}>
          Ushbu sahifa tayyorlanmoqda. Platformadan foydalanish orqali siz
          O&apos;zbekiston Yoshlar Ittifoqi Toshkent shahar hududiy Kengashi
          tomonidan belgilangan qoidalarga rioya qilishga rozilik
          bildirasiz. To&apos;liq matn tez orada joylashtiriladi.
        </p>
      </div>
    </div>
  );
}
