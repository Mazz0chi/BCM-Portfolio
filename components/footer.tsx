import { studio } from "@/lib/content";
import type { Dict } from "@/lib/i18n";

export function Footer({ d }: { d: Dict }) {
  return (
    <footer className="px-4 pb-10 md:px-8">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-8 text-sm text-mute md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col gap-2">
          <p className="text-base font-medium text-ink">{studio.name}</p>
          <p>
            &copy; {studio.year} {studio.name}. {d.footer.rights}
          </p>
          {/* Required by the model's CC BY 4.0 licence (see components/laptop-3d.tsx). */}
          <p className="text-xs">
            {d.footer.modelCredit}{" "}
            <a
              href="https://sketchfab.com/3d-models/2021-macbook-pro-14-m1-pro-m1-max-f6b0b940fb6a4286b18a674ef32af2d3"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 transition-colors hover:text-ink"
            >
              akshatmittal
            </a>{" "}
            (
            <a
              href="https://creativecommons.org/licenses/by/4.0/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 transition-colors hover:text-ink"
            >
              CC BY 4.0
            </a>
            ).
          </p>
        </div>
        <ul className="flex flex-wrap gap-x-8 gap-y-2">
          {d.nav.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="transition-colors duration-300 hover:text-ink focus-visible:outline-2 focus-visible:outline-accent"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
