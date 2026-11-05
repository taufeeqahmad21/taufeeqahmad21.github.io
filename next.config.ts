import type { NextConfig } from "next";

/**
 * GitHub Pages serves project sites from a sub-path (https://<user>.github.io/<repo>/).
 * The deploy workflow passes that sub-path in PAGES_BASE_PATH (from actions/configure-pages).
 * Locally, and for a user site (<user>.github.io) or a custom domain, it is empty.
 */
const basePath = process.env.PAGES_BASE_PATH?.replace(/\/$/, "") ?? "";

const nextConfig: NextConfig = {
  // Fully static HTML/CSS/JS in ./out — no server required.
  output: "export",
  basePath: basePath || undefined,
  // Emit /path/index.html so static hosts resolve URLs without rewrites.
  trailingSlash: true,
  // The default image optimizer needs a server; static export ships images as-is.
  images: { unoptimized: true },
  // Exposed so plain <a href> links to files in /public can be prefixed (see withBasePath).
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
