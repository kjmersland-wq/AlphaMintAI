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

// Cloudflare: `npm run deploy` wraps `next build` with the OpenNext adapter (Workers
// runtime). Routes use the default runtime; no `runtime = "edge"` exports are used.
module.exports = nextConfig;

// Expose Cloudflare bindings to `next dev` only. Starting the local workerd runtime
// during `next build` fails and is unnecessary there.
if (process.env.NODE_ENV === "development") {
  import("@opennextjs/cloudflare").then((m) => m.initOpenNextCloudflareForDev());
}
