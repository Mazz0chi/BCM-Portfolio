import { FloatingNav } from "@/components/floating-nav";
import { Hero } from "@/components/hero";
import { ToolsMarquee } from "@/components/tools-marquee";
import { WorkGrid } from "@/components/work-grid";
import { Statement } from "@/components/statement";
import { Capabilities } from "@/components/capabilities";
import { Studio } from "@/components/studio";
import { Process } from "@/components/process";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";

export default function Page() {
  return (
    <>
      <FloatingNav />
      <main id="top">
        <Hero />
        <ToolsMarquee />
        <WorkGrid />
        <Statement />
        <Capabilities />
        <Studio />
        <Process />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
