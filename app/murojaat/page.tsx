import Appeals from "@/components/Appeals/Appeals";
import Contact from "@/components/Contact/Contact";
import SectionTheme from "@/components/ui/SectionTheme";
import { getDistricts } from "@/lib/queries";

export const metadata = {
  title: "Murojaat - O'zbekiston Yoshlar Ittifoqi",
  description: "Yoshlar Ittifoqiga murojaat yo'llash, aloqa va kontakt ma'lumotlari.",
};

export const revalidate = 60;

export default async function MurojaatPage() {
  const districts = await getDistricts();

  return (
    <div style={{ paddingTop: "70px" }}>
      <SectionTheme theme="appeals">
        <Appeals districtNames={districts.map((d) => d.name)} />
      </SectionTheme>

      <SectionTheme theme="contact">
        <Contact />
      </SectionTheme>
    </div>
  );
}
