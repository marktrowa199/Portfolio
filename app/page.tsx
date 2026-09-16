import Navbar from "@/components/navbar/Navbar";
import Hero from "@/components/hero/Hero";
import About from "@/components/about/About";
import SkillsBento from "@/components/skills/SkillsBento";
import Projects from "@/components/projects/Projects";
import Timeline from "@/components/timeline/Timeline";
import Contact from "@/components/contact/Contact";
import Footer from "@/components/footer/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0A192F] dark:bg-[#0A192F] light:bg-[#F6F7F9] transition-colors duration-300">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <About />
        <SkillsBento />
        <Projects />
        <Timeline />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
