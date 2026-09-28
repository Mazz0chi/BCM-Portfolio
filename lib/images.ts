import "server-only";
import fs from "node:fs";
import path from "node:path";

const EXTENSIONS = ["webp", "jpg", "jpeg", "png", "avif"];

/**
 * Returns "/projects/<name>.<ext>" if that file exists in public/projects, else null.
 * Runs at build time, so dropping a file in and rebuilding is all it takes.
 */
export function imageFor(name: string): string | null {
  for (const ext of EXTENSIONS) {
    const file = path.join(process.cwd(), "public", "projects", `${name}.${ext}`);
    if (fs.existsSync(file)) return `/projects/${name}.${ext}`;
  }
  return null;
}
