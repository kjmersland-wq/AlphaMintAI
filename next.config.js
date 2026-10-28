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

// Cloudflare Pages: build with `npm run pages:build` (@cloudflare/next-on-pages).
// Dynamic routes opt in with `export const runtime = "edge"`.
module.exports = nextConfig;
