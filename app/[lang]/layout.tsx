import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import localFont from "next/font/local";
import { getDict, isLocale, localeHref, locales } from "@/lib/i18n";
import "../globals.css";

// Fontshare (Indian Type Foundry), free for commercial use; self-hosted from app/fonts.
// Headings: Cabinet Grotesk. Everything else: Satoshi.
const display = localFont({
  src: [
    { path: "../fonts/cabinet-grotesk-500.woff2", weight: "500" },
    { path: "../fonts/cabinet-grotesk-700.woff2", weight: "700" },
    { path: "../fonts/cabinet-grotesk-800.woff2", weight: "800" },
  ],
  variable: "--font-cabinet",
  display: "swap",
});

const text = localFont({
  src: [
    { path: "../fonts/satoshi-400.woff2", weight: "400" },
    { path: "../fonts/satoshi-500.woff2", weight: "500" },
    { path: "../fonts/satoshi-700.woff2", weight: "700" },
  ],
  variable: "--font-satoshi",
  display: "swap",
});

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const d = getDict(lang);
  return {
    metadataBase: new URL(siteUrl),
    title: d.meta.title,
    description: d.meta.description,
    alternates: {
      canonical: localeHref(lang),
      languages: { en: "/", "es-AR": "/es", "x-default": "/" },
    },
    openGraph: {
      title: d.meta.title,
      description: d.meta.description,
      locale: lang === "es" ? "es_AR" : "en_US",
      type: "website",
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#f2f4ef",
  colorScheme: "light",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const d = getDict(lang);

  return (
    <html lang={lang === "es" ? "es-AR" : lang} className={`${display.variable} ${text.variable}`}>
      <body className="min-h-dvh bg-canvas font-sans text-ink antialiased">
        <a
          href="#top"
          className="sr-only rounded-full bg-accent px-4 py-2 text-canvas focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          {d.a11y.skip}
        </a>
        {children}
      </body>
    </html>
  );
}
