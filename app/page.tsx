import Hero from "@/components/Hero/Hero";
import MiniStats from "@/components/MiniStats/MiniStats";
import About from "@/components/About/About";
import Directions from "@/components/Directions/Directions";
import Projects from "@/components/Projects/Projects";
import News from "@/components/News/News";
import Stats from "@/components/Stats/Stats";
import Districts from "@/components/Districts/Districts";
import Leadership from "@/components/Leadership/Leadership";
import YouthLeaders from "@/components/YouthLeaders/YouthLeaders";
import Documents from "@/components/Documents/Documents";
import Gallery from "@/components/Gallery/Gallery";
import Appeals from "@/components/Appeals/Appeals";
import Contact from "@/components/Contact/Contact";
import SectionTheme from "@/components/ui/SectionTheme";

export default function Home() {
  return (
    <>
      <SectionTheme theme="hero">
        <Hero />
        <MiniStats />
      </SectionTheme>
      
      <SectionTheme theme="about">
        <About />
      </SectionTheme>
      
      <SectionTheme theme="directions">
        <Directions />
      </SectionTheme>
      
      <SectionTheme theme="projects">
        <Projects />
      </SectionTheme>

      <SectionTheme theme="default">
        <News />
        <Stats />
        <Districts />
        <Leadership />
        <YouthLeaders />
        <Documents />
        <Gallery />
        <Appeals />
        <Contact />
      </SectionTheme>
    </>
  );
}
