import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The repo root also has a (legacy) lockfile; pin Turbopack's root to this app.
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
