import Appeals from "@/components/Appeals/Appeals";
import Contact from "@/components/Contact/Contact";
import SectionTheme from "@/components/ui/SectionTheme";

export const metadata = {
  title: "Murojaat - O'zbekiston Yoshlar Ittifoqi",
  description: "Yoshlar Ittifoqiga murojaat yo'llash, aloqa va kontakt ma'lumotlari.",
};

export default function MurojaatPage() {
  return (
    <div style={{ paddingTop: "70px" }}>
      <SectionTheme theme="appeals">
        <Appeals />
      </SectionTheme>
      
      <SectionTheme theme="contact">
        <Contact />
      </SectionTheme>
    </div>
  );
}
