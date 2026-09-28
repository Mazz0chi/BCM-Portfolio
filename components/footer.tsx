import { navLinks, studio } from "@/lib/content";

export function Footer() {
  return (
    <footer className="px-4 pb-10 md:px-8">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-8 text-sm text-mute md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col gap-2">
          <p className="text-base font-medium text-ink">{studio.name}</p>
          <p>&copy; {studio.year} {studio.name}. All rights reserved.</p>
        </div>
        <ul className="flex flex-wrap gap-x-8 gap-y-2">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="transition-colors duration-300 hover:text-ink focus-visible:outline-2 focus-visible:outline-accent">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
