import Hero from "@/components/Hero/Hero";
import About from "@/components/About/About";
import Projects from "@/components/Projects/Projects";
import News from "@/components/News/News";
import Stats from "@/components/Stats/Stats";
import SectionTheme from "@/components/ui/SectionTheme";

export default function Home() {
  return (
    <>
      <SectionTheme theme="hero">
        <Hero />
      </SectionTheme>
      
      <SectionTheme theme="about">
        <About />
      </SectionTheme>
      
      <SectionTheme theme="projects">
        <Projects />
      </SectionTheme>

      <SectionTheme theme="default">
        <Stats />
      </SectionTheme>

      <SectionTheme theme="news">
        <News />
      </SectionTheme>
    </>
  );
}
