import Navbar from "@/components/navbar/Navbar";
import Hero from "@/components/hero/Hero";
import About from "@/components/about/About";
import SkillsBento from "@/components/skills/SkillsBento";
import WorkProcess from "@/components/process/WorkProcess";
import Projects from "@/components/projects/Projects";
import Timeline from "@/components/timeline/Timeline";
import Contact from "@/components/contact/Contact";
import Footer from "@/components/footer/Footer";

export default function Home() {
  return (
    <div
      className="
        min-h-screen
        flex
        flex-col
        bg-[var(--bg-main)]
        text-[var(--text-main)]
        transition-colors
        duration-300
      "
    >
      <Navbar />

      <main className="flex-grow">
        <Hero />
        <About />
        <SkillsBento />
        <WorkProcess />
        <Projects />
        <Timeline />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}