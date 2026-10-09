/**
 * Project data. Visible copy lives in lib/i18n.ts.
 */
import type { Locale } from "@/lib/i18n";

export const studio = {
  name: "Benitez Cruz Mazzochi",
  short: "BCM",
  // Every "start a project" button opens a mail to this address.
  contactHref: "mailto:benitezcruzmazzochi@gmail.com",
  year: 2026,
};

export type Project = {
  /** Also the image filename: public/projects/<slug>.webp (or .jpg / .png). */
  slug: string;
  title: string;
  /** Client sector, shown under the image. */
  sector: Record<Locale, string>;
  year: number;
  /** What it was built with, shown next to the sector. */
  stack: string;
  url: string;
};

/**
 * Order = order in the grid: newest year first. The grid is a 11-cell bento (components/work-grid.tsx):
 * keep exactly 11 projects, or change `cells` there to match the new count.
 */
export const projects: Project[] = [
  { slug: "jj-capinvest", title: "JJ Capinvest", sector: { en: "Investment firm", es: "Firma de inversión" }, year: 2026, stack: "Claude", url: "https://jjcapinvest.com/" },
  { slug: "888ci", title: "888 Capinvest", sector: { en: "Venture capital", es: "Capital de riesgo" }, year: 2026, stack: "Claude", url: "/proposals/888ci/index.html" },
  { slug: "go-smartex", title: "Go Smartex", sector: { en: "Growth agency", es: "Agencia de crecimiento" }, year: 2026, stack: "Claude", url: "https://gosmartex.com/" },
  { slug: "gobta", title: "GoBTA", sector: { en: "Cybersecurity", es: "Ciberseguridad" }, year: 2026, stack: "Claude", url: "https://www.gobta.com/" },
  { slug: "marketing-mob", title: "Marketing Mob", sector: { en: "Marketing agency", es: "Agencia de marketing" }, year: 2026, stack: "Claude", url: "https://marketing-mob.com/" },
  { slug: "prana-wealth", title: "Prana Wealth Management", sector: { en: "Wealth management", es: "Gestión patrimonial" }, year: 2026, stack: "WordPress + Claude", url: "https://www.pranawealth.com" },
  { slug: "heritage-health-network", title: "Heritage Health Network", sector: { en: "Healthcare", es: "Salud" }, year: 2025, stack: "WordPress", url: "https://heritagehealthnetwork.com/" },
  { slug: "onesource-peo", title: "OneSource PEO", sector: { en: "HR services", es: "Servicios de RR. HH." }, year: 2025, stack: "WordPress", url: "https://onesourcepeo.com" },
  { slug: "hrlogics", title: "HRlogics", sector: { en: "HR compliance", es: "Cumplimiento laboral" }, year: 2025, stack: "HubSpot", url: "https://hrlogics.com/" },
  { slug: "gem", title: "GEM", sector: { en: "Medical", es: "Medicina" }, year: 2025, stack: "WordPress", url: "https://electroquimioterapia.com.ar/" },
  { slug: "tribu-mkt", title: "Tribu MKT", sector: { en: "Marketing community", es: "Comunidad de marketing" }, year: 2024, stack: "WordPress", url: "https://tribu-mkt.com/" },
];
