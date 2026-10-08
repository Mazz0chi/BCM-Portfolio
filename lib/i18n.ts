/**
 * All visible copy, in both languages. `es` is typed against `en`,
 * so a missing or extra key fails the build.
 * Spanish is Rioplatense (Argentina): "vos" forms throughout.
 */

export const locales = ["en", "es"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** English lives at "/", Spanish at "/es". */
export function localeHref(lang: Locale) {
  return lang === "en" ? "/" : `/${lang}`;
}

const en = {
  meta: {
    title: "Benitez Cruz Mazzochi | Franco & Agustina, design and development",
    description:
      "We're Franco and Agustina. We design and build brands and websites, from scratch or as a rebrand and redesign, for clients all over the world.",
  },
  a11y: {
    skip: "Skip to content",
    backToTop: "back to top",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    language: "Language",
    newTab: "(opens in a new tab)",
    primaryNav: "Primary",
  },
  cta: "Let's talk",
  nav: [
    { label: "Work", href: "#work" },
    { label: "Redesign", href: "#redesign" },
    { label: "Services", href: "#services" },
    { label: "Process", href: "#process" },
  ],
  hero: {
    line1: "Two people design it.",
    line2: "The same two build it.",
    sub: "We're Franco and Agustina. We create brands and websites, new or redesigned, for companies in finance, health, marketing, and more.",
    alt: "A project by Franco and Agustina",
  },
  clients: {
    heading: "Brands we've worked with",
  },
  work: {
    heading: "Work we're proud of",
    visit: "View site",
    alt: (title: string) => `${title} website`,
  },
  statement:
    "We care about the details nobody sees: that it loads fast, works on every screen, and is easy to change as you grow.",
  redesign: {
    eyebrow: "Rebranding and redesign",
    heading: "Most of our projects start with a brand that already exists.",
    body: "A logo the company has outgrown, a site that no longer says who you are. We keep what works, fix what doesn't, and relaunch brand and site together.",
    cta: "Let's redesign yours",
    compare: {
      label: "Compare the site before and after the redesign",
      before: "Before",
      after: "After",
      hint: "Hover or drag to see the after",
    },
    steps: [
      {
        title: "Audit",
        body: "We go through your brand and site with you and decide together what stays, what changes, and what goes.",
      },
      {
        title: "Rebrand",
        body: "A new logo, palette, and type that still feel like you, so your clients keep recognizing you.",
      },
      {
        title: "Redesign",
        body: "A new site built on the new brand, with your content moved over and nothing lost along the way.",
      },
    ],
  },
  services: {
    heading: "What we can do for you",
    items: [
      {
        title: "Brand identity",
        body: "Logos, type, color, and the rules that keep them consistent everywhere. For a brand that's just starting, or one that needs a refresh.",
        deliverables: ["Logo and wordmark", "Rebranding", "Type and color", "Brand guidelines"],
        example: { label: "See logo proposals for JJ Capinvest", href: "/proposals/jj-capinvest-logos.html" },
      },
      {
        title: "Web design",
        body: "New sites and redesigns, designed for the screens your clients actually use.",
        deliverables: ["Site redesign", "Page layouts", "Interaction and motion", "Responsive states"],
      },
      {
        title: "Frontend development",
        body: "We build what we design, in Next.js and React: fast, accessible, and easy to update. No handoff, nothing lost in translation.",
        deliverables: ["Next.js and React", "Accessibility", "Performance"],
      },
      {
        title: "Design systems",
        body: "Components and rules so your team can keep building without starting from scratch.",
        deliverables: ["Design tokens", "Component libraries", "Documentation"],
      },
    ],
  },
  studio: {
    heading: "Hi, we're Franco and Agustina.",
    body: "Two experienced designers, a couple, and very keen to take on new projects. We work with people all over the world, and language is never a barrier. You talk to us directly from start to finish, and you keep every source file when we're done.",
    alt: "Franco and Agustina in Paris",
  },
  process: {
    heading: "How we work together",
    steps: [
      {
        title: "Listen",
        body: "We start by getting to know you: your goals, your clients, and what you already have. Before we draw a thing.",
      },
      {
        title: "Design",
        body: "You see real progress early, right in the browser, so there are no surprises at the end.",
      },
      {
        title: "Build",
        body: "We build it ourselves in Next.js and React, checking speed and accessibility as we go.",
      },
      {
        title: "Hand over",
        body: "You get the code, the design files, and a short guide. And if you need us later, you know where to find us.",
      },
    ],
  },
  contact: {
    heading: "Tell us about your project",
    body: "Write to us about what you're building and where you need a hand. You'll hear back from us directly, no middlemen.",
  },
  footer: {
    rights: "All rights reserved.",
    modelCredit: "3D laptop model by",
  },
};

export type Dict = typeof en;

const es: Dict = {
  meta: {
    title: "Benitez Cruz Mazzochi | Franco y Agustina, diseño y desarrollo",
    description:
      "Somos Franco y Agustina. Diseñamos y desarrollamos marcas y sitios web, desde cero o como rebranding y rediseño, para clientes de todo el mundo.",
  },
  a11y: {
    skip: "Saltar al contenido",
    backToTop: "volver arriba",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    language: "Idioma",
    newTab: "(se abre en una pestaña nueva)",
    primaryNav: "Principal",
  },
  cta: "Hablemos",
  nav: [
    { label: "Trabajos", href: "#work" },
    { label: "Rediseño", href: "#redesign" },
    { label: "Servicios", href: "#services" },
    { label: "Proceso", href: "#process" },
  ],
  hero: {
    line1: "Dos personas lo diseñan.",
    line2: "Las mismas dos lo construyen.",
    sub: "Somos Franco y Agustina. Creamos marcas y sitios web, nuevos o rediseñados, para empresas de finanzas, salud, marketing y más.",
    alt: "Un proyecto de Franco y Agustina",
  },
  clients: {
    heading: "Marcas con las que trabajamos",
  },
  work: {
    heading: "Trabajos que nos enorgullecen",
    visit: "Ver sitio",
    alt: (title: string) => `Sitio web de ${title}`,
  },
  statement:
    "Nos importan los detalles que nadie ve: que cargue rápido, que funcione en cualquier pantalla y que sea fácil de cambiar a medida que crecés.",
  redesign: {
    eyebrow: "Rebranding y rediseño",
    heading: "La mayoría de nuestros proyectos empiezan con una marca que ya existe.",
    body: "Un logo que le quedó chico a la empresa, un sitio que ya no cuenta quién sos. Conservamos lo que funciona, corregimos lo que no y relanzamos marca y sitio juntos.",
    cta: "Rediseñemos la tuya",
    compare: {
      label: "Comparar el sitio antes y después del rediseño",
      before: "Antes",
      after: "Después",
      hint: "Pasá el cursor o deslizá para ver el después",
    },
    steps: [
      {
        title: "Auditoría",
        body: "Recorremos tu marca y tu sitio con vos y decidimos juntos qué se queda, qué cambia y qué se va.",
      },
      {
        title: "Rebranding",
        body: "Un logo, una paleta y una tipografía nuevos que se sigan sintiendo tuyos, para que tus clientes te sigan reconociendo.",
      },
      {
        title: "Rediseño",
        body: "Un sitio nuevo construido sobre la nueva marca, con tu contenido migrado y sin perder nada en el camino.",
      },
    ],
  },
  services: {
    heading: "En qué te podemos ayudar",
    items: [
      {
        title: "Identidad de marca",
        body: "Logos, tipografía, color y las reglas que los mantienen coherentes en todos lados. Para una marca que recién arranca o una que necesita renovarse.",
        deliverables: ["Logo y logotipo", "Rebranding", "Tipografía y color", "Manual de marca"],
        example: { label: "Ver propuestas de logo para JJ Capinvest", href: "/proposals/jj-capinvest-logos.html" },
      },
      {
        title: "Diseño web",
        body: "Sitios nuevos y rediseños, pensados para las pantallas que tus clientes usan de verdad.",
        deliverables: ["Rediseño de sitios", "Diseño de páginas", "Interacción y animación", "Versiones responsive"],
      },
      {
        title: "Desarrollo frontend",
        body: "Construimos lo que diseñamos, en Next.js y React: rápido, accesible y fácil de actualizar. Sin pasamanos, sin nada que se pierda en el medio.",
        deliverables: ["Next.js y React", "Accesibilidad", "Rendimiento"],
      },
      {
        title: "Sistemas de diseño",
        body: "Componentes y reglas para que tu equipo siga construyendo sin arrancar de cero.",
        deliverables: ["Design tokens", "Librerías de componentes", "Documentación"],
      },
    ],
  },
  studio: {
    heading: "Hola, somos Franco y Agustina.",
    body: "Dos diseñadores con experiencia, en pareja y con muchas ganas de encarar proyectos nuevos. Trabajamos con gente de todas partes del mundo: el idioma nunca es una barrera. Hablás directo con nosotros de principio a fin y, al terminar, te quedás con todos los archivos.",
    alt: "Franco y Agustina en París",
  },
  process: {
    heading: "Cómo trabajamos juntos",
    steps: [
      {
        title: "Escuchar",
        body: "Empezamos por conocerte: tus objetivos, tus clientes y lo que ya tenés. Antes de dibujar nada.",
      },
      {
        title: "Diseñar",
        body: "Ves avances reales desde temprano, directo en el navegador, así no hay sorpresas al final.",
      },
      {
        title: "Construir",
        body: "Lo construimos nosotros mismos en Next.js y React, revisando velocidad y accesibilidad sobre la marcha.",
      },
      {
        title: "Entregar",
        body: "Te llevás el código, los archivos de diseño y una guía breve. Y si después nos necesitás, ya sabés dónde encontrarnos.",
      },
    ],
  },
  contact: {
    heading: "Contanos tu proyecto",
    body: "Escribinos qué estás armando y en qué te podemos dar una mano. Te respondemos nosotros, sin intermediarios.",
  },
  footer: {
    rights: "Todos los derechos reservados.",
    modelCredit: "Modelo 3D de la laptop por",
  },
};

const dicts: Record<Locale, Dict> = { en, es };

export function getDict(lang: Locale): Dict {
  return dicts[lang];
}
