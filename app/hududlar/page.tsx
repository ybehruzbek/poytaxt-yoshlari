import Districts from "@/components/Districts/Districts";
import YouthLeaders from "@/components/YouthLeaders/YouthLeaders";
import SectionTheme from "@/components/ui/SectionTheme";

export const metadata = {
  title: "Hududlar - O'zbekiston Yoshlar Ittifoqi",
  description: "Toshkent shahridagi tumanlar miqyosidagi loyihalar va mahalliy yetakchilar.",
};

export default function HududlarPage() {
  return (
    <div style={{ paddingTop: "70px" }}>
      <SectionTheme theme="default">
        <Districts />
      </SectionTheme>
      
      <SectionTheme theme="youthleaders">
        <YouthLeaders />
      </SectionTheme>
    </div>
  );
}
