import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The repo root also has a (legacy) lockfile; pin Turbopack's root to this app.
  turbopack: {
    root: __dirname,
  },
  images: {
    // Allow the locally-hosted project logo (SVG) to pass through next/image.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
