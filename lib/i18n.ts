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
    title: "Benitez Cruz and Mazzochi | Design and development studio",
    description:
      "Benitez Cruz and Mazzochi designs and builds brands, websites, and digital products.",
  },
  a11y: {
    skip: "Skip to content",
    backToTop: "back to top",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    language: "Language",
    newTab: "(opens in a new tab)",
    tools: "Tools we work with",
    primaryNav: "Primary",
  },
  cta: "Start a project",
  nav: [
    { label: "Work", href: "#work" },
    { label: "Services", href: "#services" },
    { label: "Process", href: "#process" },
  ],
  hero: {
    line1: "One team designs it.",
    line2: "The same team builds it.",
    sub: "Benitez Cruz and Mazzochi is a design and development studio for brands, websites, and digital products.",
    alt: "Featured project by Benitez Cruz and Mazzochi",
  },
  work: {
    heading: "Selected work",
    alt: (title: string) => `${title} website`,
  },
  statement:
    "Good design is half the job. It also has to load fast, work on every screen, and stay easy to change.",
  services: {
    heading: "What we design and build",
    items: [
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
    ],
  },
  studio: {
    heading: "A small studio, on purpose.",
    body: "You talk directly to the people doing the work, and you keep every source file when the project ends.",
    alt: "The studio at work",
  },
  process: {
    heading: "How a project runs",
    steps: [
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
    ],
  },
  contact: {
    heading: "Have a project in mind?",
    body: "Tell us what you are building and where you need help.",
  },
  footer: {
    rights: "All rights reserved.",
    modelCredit: "3D laptop model by",
  },
};

export type Dict = typeof en;

const es: Dict = {
  meta: {
    title: "Benitez Cruz and Mazzochi | Estudio de diseño y desarrollo",
    description:
      "Benitez Cruz and Mazzochi diseña y desarrolla marcas, sitios web y productos digitales.",
  },
  a11y: {
    skip: "Saltar al contenido",
    backToTop: "volver arriba",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    language: "Idioma",
    newTab: "(se abre en una pestaña nueva)",
    tools: "Herramientas con las que trabajamos",
    primaryNav: "Principal",
  },
  cta: "Empezar un proyecto",
  nav: [
    { label: "Trabajos", href: "#work" },
    { label: "Servicios", href: "#services" },
    { label: "Proceso", href: "#process" },
  ],
  hero: {
    line1: "Un equipo lo diseña.",
    line2: "El mismo equipo lo construye.",
    sub: "Benitez Cruz and Mazzochi es un estudio de diseño y desarrollo de marcas, sitios web y productos digitales.",
    alt: "Proyecto destacado de Benitez Cruz and Mazzochi",
  },
  work: {
    heading: "Trabajos seleccionados",
    alt: (title: string) => `Sitio web de ${title}`,
  },
  statement:
    "El buen diseño es la mitad del trabajo. También tiene que cargar rápido, funcionar en cualquier pantalla y ser fácil de cambiar.",
  services: {
    heading: "Qué diseñamos y construimos",
    items: [
      {
        title: "Identidad de marca",
        body: "Logos, tipografía, color y las reglas que los mantienen coherentes en cada pantalla.",
        deliverables: ["Logo y logotipo", "Tipografía y color", "Manual de marca"],
      },
      {
        title: "Diseño web",
        body: "Layouts e interacciones pensados para las pantallas donde realmente se van a usar.",
        deliverables: ["Diseño de páginas", "Interacción y animación", "Versiones responsive"],
      },
      {
        title: "Desarrollo frontend",
        body: "Sitios rápidos y accesibles, construidos en Next.js y React a partir de nuestros propios diseños.",
        deliverables: ["Next.js y React", "Accesibilidad", "Rendimiento"],
      },
      {
        title: "Sistemas de diseño",
        body: "Librerías de componentes y tokens para que tu equipo avance sin empezar de cero.",
        deliverables: ["Design tokens", "Librerías de componentes", "Documentación"],
      },
    ],
  },
  studio: {
    heading: "Un estudio chico, a propósito.",
    body: "Hablás directamente con quienes hacen el trabajo y, al terminar, te quedás con todos los archivos fuente.",
    alt: "El estudio trabajando",
  },
  process: {
    heading: "Cómo funciona un proyecto",
    steps: [
      {
        title: "Escuchar",
        body: "Empezamos por tus objetivos, tu audiencia y lo que ya existe, antes de dibujar nada.",
      },
      {
        title: "Diseñar",
        body: "Layouts, tipografía y animación se prueban temprano en el navegador, para que nada te sorprenda después.",
      },
      {
        title: "Construir",
        body: "Desarrollamos en Next.js y React, revisando rendimiento y accesibilidad sobre la marcha.",
      },
      {
        title: "Entregar",
        body: "Recibís el código, los archivos de diseño y una guía breve para que tu equipo pueda seguir.",
      },
    ],
  },
  contact: {
    heading: "¿Tenés un proyecto en mente?",
    body: "Contanos qué estás construyendo y en qué necesitás ayuda.",
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
