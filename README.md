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
| Hosting | Cloudflare Pages, standard `next build` |

Theme tokens: background `#0B0B0C`, panels `#1A1A1E`, gold accent `#D4AF37`.

```
app/
  layout.tsx           fonts, metadata, dark root
  page.tsx             renders <Dashboard />
  api/insights/        session-aware insights; strips premium fields for Free
  api/waitlist/        validates and logs (masked) waitlist emails
components/
  Dashboard.tsx        sticky sidebar, feed; fetches /api/insights
  InsightCard.tsx      AI Market Insight Card + affiliate CTA
  LockOverlay.tsx      glassmorphism lock screen with waitlist form
  Disclaimer.tsx       legal disclaimer shown under every CTA
lib/insights.ts        data + getInsightsForPlan() server-side filter
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

`POST /api/waitlist` validates the email and logs a masked form
(`j***@example.com`). Nothing is persisted yet. Connect it to your audience store
(Cloudflare D1/KV or an email provider) before collecting real signups, and add a
privacy notice and rate limiting.

## Monetization (planned)

1. **Subscription:** one $99/month tier. Payments are deferred; a checkout flow will
   be added after the business setup is complete.
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

## Deploy to Cloudflare Pages

`npm run pages:build` is a standard `next build`. Because the app uses API routes,
deploy with Cloudflare's Next.js support (the OpenNext Cloudflare adapter or the
Pages Next.js preset) rather than static export. Confirm the preset in your
Cloudflare dashboard before the first deploy.

## Environment variables

| Name | Purpose |
| --- | --- |
| `NEXT_PUBLIC_BROKER_AFFILIATE_URL` | Partner broker tracked link |
