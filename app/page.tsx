import Hero from "@/components/Hero/Hero";
import Events from "@/components/Events/Events";
import About from "@/components/About/About";
import Projects from "@/components/Projects/Projects";
import News from "@/components/News/News";
import Stats from "@/components/Stats/Stats";
import SectionTheme from "@/components/ui/SectionTheme";
import { getNews, getProjects, getStats } from "@/lib/queries";

export const revalidate = 60;

export default async function Home() {
  const [news, projects, stats] = await Promise.all([
    getNews(),
    getProjects(),
    getStats("full"),
  ]);

  return (
    <>
      <SectionTheme theme="hero">
        <Hero news={news} />
      </SectionTheme>

      <SectionTheme theme="events">
        <Events />
      </SectionTheme>

      <SectionTheme theme="about">
        <About />
      </SectionTheme>

      <SectionTheme theme="projects">
        <Projects items={projects} />
      </SectionTheme>

      <SectionTheme theme="stats">
        <Stats items={stats} />
      </SectionTheme>

      <SectionTheme theme="news">
        <News items={news} />
      </SectionTheme>
    </>
  );
}
