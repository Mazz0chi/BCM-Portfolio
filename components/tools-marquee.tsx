import {
  SiFigma,
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
  SiFramer,
} from "@icons-pack/react-simple-icons";

const tools = [
  { name: "Figma", Icon: SiFigma },
  { name: "Next.js", Icon: SiNextdotjs },
  { name: "React", Icon: SiReact },
  { name: "TypeScript", Icon: SiTypescript },
  { name: "Tailwind CSS", Icon: SiTailwindcss },
  { name: "Vercel", Icon: SiVercel },
  { name: "Framer", Icon: SiFramer },
];

/**
 * The single marquee on the page. Motivated: a breadth-of-tools row that does
 * not need individual attention. Logos only, no labels.
 */
export function ToolsMarquee() {
  return (
    <section aria-label="Tools we work with" className="py-16 md:py-24">
      <div className="marquee-mask overflow-hidden">
        <div className="marquee-track flex w-max">
          {[0, 1].map((copy) => (
            <ul
              key={copy}
              aria-hidden={copy === 1}
              className="flex shrink-0 items-center gap-16 pr-16 text-mute md:gap-24 md:pr-24"
            >
              {tools.map(({ name, Icon }) => (
                <li key={name}>
                  <Icon title={name} size={30} color="currentColor" />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
