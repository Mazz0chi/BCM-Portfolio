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
  url: string;
};

/**
 * Order = order in the grid. The grid is a 11-cell bento (components/work-grid.tsx):
 * keep exactly 11 projects, or change `cells` there to match the new count.
 */
export const projects: Project[] = [
  { slug: "go-smartex", title: "Go Smartex", sector: { en: "Growth agency", es: "Agencia de crecimiento" }, url: "https://gosmartex.com/" },
  { slug: "gobta", title: "GoBTA", sector: { en: "Cybersecurity", es: "Ciberseguridad" }, url: "https://www.gobta.com/" },
  { slug: "marketing-mob", title: "Marketing Mob", sector: { en: "Marketing agency", es: "Agencia de marketing" }, url: "https://marketing-mob.com/" },
  { slug: "heritage-health-network", title: "Heritage Health Network", sector: { en: "Healthcare", es: "Salud" }, url: "https://heritagehealthnetwork.com/" },
  { slug: "prana-wealth", title: "Prana Wealth Management", sector: { en: "Wealth management", es: "Gestión patrimonial" }, url: "https://www.pranawealth.com" },
  { slug: "onesource-peo", title: "OneSource PEO", sector: { en: "HR services", es: "Servicios de RR. HH." }, url: "https://onesourcepeo.com" },
  { slug: "tribu-mkt", title: "Tribu MKT", sector: { en: "Marketing community", es: "Comunidad de marketing" }, url: "https://tribu-mkt.com/" },
  { slug: "hrlogics", title: "HRlogics", sector: { en: "HR compliance", es: "Cumplimiento laboral" }, url: "https://hrlogics.com/" },
  { slug: "gem", title: "GEM", sector: { en: "Medical", es: "Medicina" }, url: "https://electroquimioterapia.com.ar/" },
  { slug: "jj-capinvest", title: "JJ Capinvest", sector: { en: "Investment firm", es: "Firma de inversión" }, url: "https://jjcapinvest.com/" },
  { slug: "888ci", title: "888 Capinvest", sector: { en: "Venture capital", es: "Capital de riesgo" }, url: "/proposals/888ci/index.html" },
];
