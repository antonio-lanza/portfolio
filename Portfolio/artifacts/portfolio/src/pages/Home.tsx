import { Navbar } from "@/components/Navbar";
import { ScrollProgress } from "@/components/effects/ScrollProgress";
import { ParticleBackground } from "@/components/effects/ParticleBackground";
import { SeoHead } from "@/components/SeoHead";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { EntranceProvider } from "@/hooks/use-entrance";
import { MotionConfig } from "framer-motion";

export default function Home() {
  return (
    <MotionConfig reducedMotion="user">
      <EntranceProvider>
        <SeoHead />
        <ParticleBackground />
        <main className="relative z-[1] min-h-screen overflow-x-hidden text-foreground">
          <ScrollProgress />
          <Navbar />
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Contact />
          <Footer />
        </main>
      </EntranceProvider>
    </MotionConfig>
  );
}
