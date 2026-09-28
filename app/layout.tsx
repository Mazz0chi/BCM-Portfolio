import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  title: "Benitez Cruz and Mazzochi | Design and development studio",
  description:
    "Benitez Cruz and Mazzochi designs and builds brands, websites, and digital products.",
};

export const viewport: Viewport = {
  themeColor: "#0c0c0e",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="min-h-dvh bg-canvas font-sans text-ink antialiased">
        <a
          href="#top"
          className="sr-only rounded-full bg-accent px-4 py-2 text-canvas focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
