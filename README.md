# AlphaMint AI

An exclusive, dark-mode AI investment intelligence dashboard. Free visitors see a
teaser and can join a private waitlist; Premium members will unlock full AI
analysis at launch pricing of $99/mo (coming soon). Planned revenue: subscriptions
and broker affiliate referrals.

> **Educational use only.** All AI insights are for educational purposes and general
> market information. They are not financial advice.

## Architecture

| Layer | Choice |
| --- | --- |
| Framework | Next.js (App Router), TypeScript |
| Styling | Tailwind CSS v4, custom luxury tokens in `app/globals.css` |
| Typography | Inter (body), Cormorant Garamond, tracked-out (headings) |
| Hosting | Cloudflare Workers via OpenNext adapter |

Theme tokens: background `#0B0B0C`, panels `#1A1A1E`, gold accent `#D4AF37`.

```
app/
  layout.tsx           fonts, metadata, dark root
  page.tsx             renders <Dashboard />
  api/insights/        session-aware insights; strips premium fields for Free
  api/waitlist/        validates and stores waitlist emails (Supabase)
  privacy/             Privacy Policy page
supabase/schema.sql    waitlist table definition
components/
  Dashboard.tsx        sticky sidebar, feed; fetches /api/insights
  InsightCard.tsx      AI Market Insight Card + affiliate CTA
  LockOverlay.tsx      glassmorphism lock screen with waitlist form
  Disclaimer.tsx       legal disclaimer shown under every CTA
lib/insights.ts        data + getInsightsForPlan() server-side filter
lib/tiers.ts           three USD tiers, Stripe price env names, formatUsd()
lib/i18n/              dictionaries and locale helpers
```

## Secure data layer

`GET /api/insights` reads the session and returns one of two shapes:

- **Premium:** full records, including `confidence`, `bull`, `bear` and `affiliateUrl`.
- **Free:** locked records contain only `id`, `asset`, `ticker`, `sentiment` and
  `locked: true`. The premium fields are absent from the JSON, so they never reach
  the browser or the HTML. The blurred UI is a decorative placeholder.

The first insight is a free teaser and is returned in full.

**Mock session:** the plan comes from an unsigned `alphamint_plan` cookie so the demo
toggle works. This is forgeable. Replace `getPlan()` in `app/api/insights/route.ts`
with a real session/subscription lookup before launch.

## Waitlist

`POST /api/waitlist` validates the email and inserts it into the `waitlist` table
(`id`, `email`, `created_at`; see `supabase/schema.sql`) through Supabase's REST API.

1. Create a Supabase project and run `supabase/schema.sql` in the SQL editor.
2. Set `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` as server-side environment
   variables (never `NEXT_PUBLIC_`). RLS is enabled with no policies, so only the
   service role can read or write.
3. Without these variables the route logs a masked address and does not persist it.

Duplicate emails are accepted silently (unique constraint), so the endpoint does not
reveal who is already on the list. Add rate limiting before a public launch.

## Privacy and GDPR

`/privacy` holds the Privacy Policy (Personvernerklæring). The waitlist form requires
consent via a checkbox linking to it. Set `NEXT_PUBLIC_PRIVACY_EMAIL` to the address
that handles access and deletion requests. Have counsel review the policy text and
name the legal controller entity once it is established.

## Pricing tiers (USD)

All billing is in US dollars. Tiers are defined in `lib/tiers.ts`:

| Tier | Price | Notes |
| --- | --- | --- |
| Insider | $99/mo | Standard AI insights. Early-access members lock this price in permanently. |
| Alpha Pro | $149/mo | Adds real-time alerts and community signals. |
| Prestige | $249/mo | Limited capacity; direct portfolio sync. |

Each tier carries a `stripePriceEnv` naming the env var that will hold its Stripe
Price ID, so the Poland entity can create the prices in its own Stripe account with
no code change. Payments are not enabled yet; a checkout flow comes after the
business setup is complete. Tier features described as "real-time", "community" or
"portfolio sync" are planned, not yet built.

## Internationalization

English (US) is the default and only locale today. All dashboard and waitlist
strings live in `lib/i18n/en-US.ts`; components read them through `useDictionary()`
(`components/I18nProvider.tsx`). To add a language, create `lib/i18n/<locale>.ts`
exporting a `Dictionary` (a missing key fails the build), then register it in
`lib/i18n/index.ts`. Not yet localized: the `/privacy` page body, page metadata and
OG image text.

## Monetization (planned)

1. **Subscriptions:** the three USD tiers above, via Stripe once enabled.
2. **Affiliate:** the "Invest via Partner Broker" button uses
   `NEXT_PUBLIC_BROKER_AFFILIATE_URL` with `rel="sponsored"`. Disclose affiliate
   relationships as your jurisdiction requires.
3. **Compliance:** every CTA is followed by a disclaimer. Have counsel review the
   wording and regulatory posture before launch.

## Development

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint
npm run pages:build
```

## Deploy to Cloudflare (OpenNext)

The app deploys to **Cloudflare Workers** through the OpenNext adapter
(`@opennextjs/cloudflare`); configuration is committed, so nothing needs to be
generated on the build server.

| File | Purpose |
| --- | --- |
| `wrangler.jsonc` | Worker name, assets directory, `nodejs_compat` |
| `open-next.config.ts` | Adapter config (default cache; no R2 bucket needed) |
| `public/_headers` | Long-lived caching for `/_next/static/*` |

Live worker: https://alphamintai.kjmersland.workers.dev (worker name `alphamintai`).

Scripts: `npm run preview` (local Workers preview), `npm run deploy`,
`npm run upload`. `npm run build` / `pages:build` remain a plain `next build`; the
adapter calls `npm run build` itself, so do not point `build` at the adapter.

In Cloudflare's Git integration set the build command to
`npx opennextjs-cloudflare build` and the deploy command to
`npx opennextjs-cloudflare deploy` (or `npx wrangler deploy`). The adapter is only
partly supported on native Windows: `opennextjs-cloudflare deploy` fails there at
its cache-population step (workerd SQLite). Build with `npx opennextjs-cloudflare build`,
then upload with `npx wrangler deploy --no-autoconfig` (safe because no R2/ISR cache
is used), or use WSL / Cloudflare's build server.

## Environment variables

| Name | Purpose |
| --- | --- |
| `NEXT_PUBLIC_BROKER_AFFILIATE_URL` | Partner broker tracked link |
| `SUPABASE_URL` | Supabase project URL (server only) |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (server only) |
| `NEXT_PUBLIC_PRIVACY_EMAIL` | Contact for privacy requests |
| `STRIPE_PRICE_ID_INSIDER` / `_ALPHA_PRO` / `_PRESTIGE` | Stripe Price IDs (future) |
