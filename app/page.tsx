import Hero from "@/components/Hero/Hero";
import MiniStats from "@/components/MiniStats/MiniStats";
import About from "@/components/About/About";
import News from "@/components/News/News";
import Projects from "@/components/Projects/Projects";
import Stats from "@/components/Stats/Stats";
import MapSection from "@/components/MapSection/MapSection";
import CTA from "@/components/CTA/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <MiniStats />
      <About />
      <News />
      <Projects />
      <Stats />
      <MapSection />
      <CTA />
    </>
  );
}
