import Directions from "@/components/Directions/Directions";
import Projects from "@/components/Projects/Projects";
import YouthLeaders from "@/components/YouthLeaders/YouthLeaders";
import SectionTheme from "@/components/ui/SectionTheme";

export const metadata = {
  title: "Faoliyat - O'zbekiston Yoshlar Ittifoqi",
  description: "Tashkilotning asosiy yo'nalishlari, loyihalari va yosh yetakchilari.",
};

export default function FaoliyatPage() {
  return (
    <div style={{ paddingTop: "70px" }}>
      <SectionTheme theme="directions">
        <Directions />
      </SectionTheme>
      
      <SectionTheme theme="projects">
        <Projects />
      </SectionTheme>
      
      <SectionTheme theme="youthleaders">
        <YouthLeaders />
      </SectionTheme>
    </div>
  );
}
