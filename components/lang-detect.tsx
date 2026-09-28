"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * First visit only: if the browser prefers Spanish and the visitor has never
 * picked a language, send them to /es. An explicit choice always wins.
 */
export function LangDetect() {
  const router = useRouter();
  useEffect(() => {
    try {
      if (window.location.pathname !== "/") return;
      if (localStorage.getItem("lang")) return;
      const preferred = (navigator.languages?.[0] ?? navigator.language ?? "").toLowerCase();
      if (preferred.startsWith("es")) router.replace("/es");
    } catch {}
  }, [router]);
  return null;
}
