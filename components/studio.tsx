import { Media } from "@/components/media";
import { Reveal } from "@/components/reveal";
import type { Dict } from "@/lib/i18n";
import { imageFor } from "@/lib/images";

export function Studio({ d }: { d: Dict }) {
  return (
    <section className="px-4 py-20 md:px-8 md:py-28">
      <div className="mx-auto grid max-w-[1400px] items-center gap-12 md:grid-cols-[6fr_5fr] md:gap-20">
        <Reveal>
          <Media
            src={imageFor("studio")}
            alt={d.studio.alt}
            slot="public/projects/studio.jpg"
            tone="one"
            sizes="(min-width: 768px) 55vw, 100vw"
            className="aspect-[3/2] w-full"
          />
        </Reveal>
        <Reveal delay={0.1} className="flex max-w-xl flex-col gap-6">
          <h2 className="text-3xl font-semibold tracking-tighter md:text-5xl">{d.studio.heading}</h2>
          <p className="max-w-[45ch] text-base leading-relaxed text-mute md:text-lg">{d.studio.body}</p>
        </Reveal>
      </div>
    </section>
  );
}
