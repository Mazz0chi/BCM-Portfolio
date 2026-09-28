/**
 * All editable copy and project data lives here.
 * Draft copy: confirm every claim before publishing.
 */

export const studio = {
  name: "Benitez Cruz and Mazzochi",
  short: "BCM",
  // TODO: replace with the real contact address.
  contactHref: "mailto:hello@your-domain.com",
  year: 2026,
};

export const cta = "Start a project";

export const navLinks = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
];

export type Project = {
  /** Also the image filename: public/projects/<slug>.jpg (or .png / .webp). */
  slug: string;
  title: string;
  /** Client sector, shown under the image. */
  sector: string;
  url: string;
};

/**
 * Order = order in the grid. The grid is a 9-cell bento (components/work-grid.tsx):
 * keep exactly 9 projects, or change `cells` there to match the new count.
 */
export const projects: Project[] = [
  { slug: "go-smartex", title: "Go Smartex", sector: "Growth agency", url: "https://gosmartex.com/" },
  { slug: "gobta", title: "GoBTA", sector: "Cybersecurity", url: "https://www.gobta.com/" },
  { slug: "marketing-mob", title: "Marketing Mob", sector: "Marketing agency", url: "https://marketing-mob.com/" },
  { slug: "heritage-health-network", title: "Heritage Health Network", sector: "Healthcare", url: "https://heritagehealthnetwork.com/" },
  { slug: "prana-wealth", title: "Prana Wealth Management", sector: "Wealth management", url: "https://www.pranawealth.com" },
  { slug: "onesource-peo", title: "OneSource PEO", sector: "HR services", url: "https://onesourcepeo.com" },
  { slug: "tribu-mkt", title: "Tribu MKT", sector: "Marketing community", url: "https://tribu-mkt.com/" },
  { slug: "hrlogics", title: "HRlogics", sector: "HR compliance", url: "https://hrlogics.com/" },
  { slug: "gem", title: "GEM", sector: "Medical", url: "https://electroquimioterapia.com.ar/" },
];

export const capabilities = [
  {
    title: "Brand identity",
    body: "Logos, type, color, and the rules that keep them consistent across every screen.",
    deliverables: ["Logo and wordmark", "Type and color", "Brand guidelines"],
  },
  {
    title: "Web design",
    body: "Layouts and interactions designed for the screens they will actually live on.",
    deliverables: ["Page layouts", "Interaction and motion", "Responsive states"],
  },
  {
    title: "Frontend development",
    body: "Fast, accessible sites built in Next.js and React from our own designs.",
    deliverables: ["Next.js and React", "Accessibility", "Performance"],
  },
  {
    title: "Design systems",
    body: "Component libraries and tokens that let your team ship without starting over.",
    deliverables: ["Design tokens", "Component libraries", "Documentation"],
  },
];

export const process = [
  {
    title: "Listen",
    body: "We start with your goals, your audience, and what already exists, before anything gets drawn.",
  },
  {
    title: "Design",
    body: "Layouts, type, and motion are tested in the browser early, so nothing surprises you later.",
  },
  {
    title: "Build",
    body: "Development happens in Next.js and React, with performance and accessibility checked as we go.",
  },
  {
    title: "Hand over",
    body: "You receive the code, the design files, and a short guide so your team can keep going.",
  },
];
