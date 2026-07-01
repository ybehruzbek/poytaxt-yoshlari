import About from "@/components/About/About";
import Leadership from "@/components/Leadership/Leadership";
import Documents from "@/components/Documents/Documents";
import SectionTheme from "@/components/ui/SectionTheme";

export const metadata = {
  title: "Tashkilot haqida - O'zbekiston Yoshlar Ittifoqi",
  description: "O'zbekiston Yoshlar Ittifoqi tashkiloti haqida ma'lumotlar, rahbarlar va hujjatlar.",
};

export default function TashkilotPage() {
  return (
    <div style={{ paddingTop: "70px" }}>
      <SectionTheme theme="about">
        <About />
      </SectionTheme>
      
      <SectionTheme theme="leadership">
        <Leadership />
      </SectionTheme>
      
      <SectionTheme theme="documents">
        <Documents />
      </SectionTheme>
    </div>
  );
}
