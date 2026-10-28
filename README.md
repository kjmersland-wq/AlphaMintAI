# Project Aureum

An exclusive, dark-mode AI investment intelligence dashboard. Free members see a
teaser; Premium members ($99/mo) unlock full AI analysis. Revenue comes from
subscriptions and broker affiliate referrals.

> **Educational use only.** All AI insights are for educational purposes and general
> market information. They are not financial advice.

## Architecture

| Layer | Choice |
| --- | --- |
| Framework | Next.js (App Router), TypeScript |
| Styling | Tailwind CSS v4, custom luxury tokens in `app/globals.css` |
| Typography | Inter (body), Cormorant Garamond, tracked-out (headings) |
| Hosting | Cloudflare Pages via `@cloudflare/next-on-pages` |

Theme tokens: background `#0B0B0C`, panels `#1A1A1E`, gold accent `#D4AF37`.

```
app/
  layout.tsx          fonts, metadata, dark root
  page.tsx            renders <Dashboard />
  api/checkout/       edge route: Stripe Checkout session hook (stub)
components/
  Dashboard.tsx       sticky sidebar, feed, Free/Premium plan state
  InsightCard.tsx     AI Market Insight Card + affiliate CTA
  LockOverlay.tsx     glassmorphism paywall ($99/mo) + checkout call
  Disclaimer.tsx      legal disclaimer shown under every CTA
lib/insights.ts       typed sample data (replace with live pipeline)
```

## Premium vs Free

`Dashboard` holds a `plan` state (`free` | `premium`). For Free users the first
insight is fully visible as a teaser; the AI confidence score, Bull/Bear case and
broker CTA on all other cards are blurred, and a `backdrop-blur-md` lock screen
presents the single membership tier.

**Before launch:** the blur is presentational. Locked content is still in the page
HTML, so production must fetch premium analysis from an authenticated API only
after verifying an active subscription, never ship it to Free clients.

## AI tech stack

Insights are currently static sample data typed in `lib/insights.ts`. The intended
pipeline: market data ingestion, an LLM (for example through the Vercel AI Gateway
or the Anthropic API) producing structured output matching the `Insight` type
(sentiment, 0-100 confidence, bull/bear points), cached and served to members.

## Monetization

1. **Subscription**: one $99/month tier through Stripe Checkout.
   `POST /api/checkout` is a stub; set `STRIPE_SECRET_KEY` and `STRIPE_PRICE_ID`
   and implement session creation, then add a webhook to sync subscription status.
2. **Affiliate**: the "Invest via Partner Broker" button uses
   `NEXT_PUBLIC_BROKER_AFFILIATE_URL` with `rel="sponsored"`. Disclose affiliate
   relationships per your jurisdiction's rules.
3. **Compliance**: every CTA is followed by a disclaimer. Have counsel review the
   wording and regulatory posture (e.g. SEC/FCA rules on investment content) before launch.

## Development

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint
npm run build
```

## Deploy to Cloudflare Pages

```bash
npm run pages:build   # runs @cloudflare/next-on-pages
```

Set the build command to `npx @cloudflare/next-on-pages` and the output directory to
`.vercel/output/static`, with the `nodejs_compat` compatibility flag enabled. Routes
that run dynamically must export `runtime = "edge"` (see `app/api/checkout`).
Next.js reports the Edge runtime as deprecated; it is kept deliberately for this target.

## Environment variables

| Name | Purpose |
| --- | --- |
| `NEXT_PUBLIC_BROKER_AFFILIATE_URL` | Partner broker tracked link |
| `STRIPE_SECRET_KEY` | Stripe API key (server only) |
| `STRIPE_PRICE_ID` | Price ID of the $99/mo plan |
