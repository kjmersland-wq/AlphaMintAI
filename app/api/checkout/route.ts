// Edge runtime keeps this route compatible with Cloudflare Pages (next-on-pages).
export const runtime = "edge";

// Conceptual Stripe Checkout hook. To go live, create a Checkout Session
// (mode: "subscription") with the $99/mo price via the Stripe API using
// STRIPE_SECRET_KEY and STRIPE_PRICE_ID, then return { url: session.url }.
export async function POST() {
  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_PRICE_ID) {
    return Response.json(
      { message: "Stripe Checkout is not configured yet." },
      { status: 501 },
    );
  }

  return Response.json(
    { message: "Checkout session creation not implemented yet." },
    { status: 501 },
  );
}
