/** @type {import('next').NextConfig} */
const nextConfig = {
  // Cloudflare Pages has no Next.js image optimizer; serve images as-is.
  images: { unoptimized: true },
  poweredByHeader: false,
  reactStrictMode: true,
  // Tailwind v4 wiring from the Next.js scaffold.
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

// Cloudflare Pages: `npm run pages:build` runs a standard `next build`. Routes use
// the default runtime; no `runtime = "edge"` exports are needed or used.
module.exports = nextConfig;
