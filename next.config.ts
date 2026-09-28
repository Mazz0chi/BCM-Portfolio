import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // English is served at "/" (rendered by the /en route); Spanish lives at "/es".
  async rewrites() {
    return [{ source: "/", destination: "/en" }];
  },
};

export default nextConfig;
