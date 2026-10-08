import { notFound } from "next/navigation";
import { FloatingNav } from "@/components/floating-nav";
import { Hero } from "@/components/hero";
import { TrustedBrands } from "@/components/trusted-brands";
import { WorkGrid } from "@/components/work-grid";
import { Statement } from "@/components/statement";
import { Capabilities } from "@/components/capabilities";
import { Redesign } from "@/components/redesign";
import { Studio } from "@/components/studio";
import { Process } from "@/components/process";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { LangDetect } from "@/components/lang-detect";
import { getDict, isLocale } from "@/lib/i18n";

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const d = getDict(lang);

  return (
    <>
      {lang === "en" ? <LangDetect /> : null}
      <FloatingNav lang={lang} d={{ nav: d.nav, cta: d.cta, a11y: d.a11y }} />
      <main id="top">
        <Hero d={d} />
        <TrustedBrands heading={d.clients.heading} />
        <WorkGrid lang={lang} d={d} />
        <Redesign d={d} />
        <Statement text={d.statement} />
        <Capabilities heading={d.services.heading} items={d.services.items} />
        <Studio d={d} />
        <Process d={d} />
        <Contact d={d} />
      </main>
      <Footer d={d} />
    </>
  );
}
