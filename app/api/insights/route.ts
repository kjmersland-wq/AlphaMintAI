import { cookies } from "next/headers";
import { getInsightsForPlan, type Plan } from "@/lib/insights";

// Always evaluate per request: the response depends on the session cookie.
export const dynamic = "force-dynamic";

// Replace with your partner broker's tracked affiliate URL.
const AFFILIATE_URL =
  process.env.NEXT_PUBLIC_BROKER_AFFILIATE_URL ?? "https://example.com/partner-broker";

// MOCK session check. A plain cookie is trivially forgeable; swap this for a real
// session lookup (signed cookie / auth provider) before launch.
async function getPlan(): Promise<Plan> {
  const jar = await cookies();
  return jar.get("alphamint_plan")?.value === "premium" ? "premium" : "free";
}

export async function GET() {
  const plan = await getPlan();
  return Response.json(
    { plan, insights: getInsightsForPlan(plan, AFFILIATE_URL) },
    { headers: { "Cache-Control": "private, no-store" } },
  );
}
