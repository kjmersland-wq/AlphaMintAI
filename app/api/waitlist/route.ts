const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type StoreResult = "stored" | "duplicate" | "unconfigured" | "failed";

// Inserts into the `waitlist` table (see supabase/schema.sql) through Supabase's
// REST API when SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set. Plain fetch
// keeps this free of extra dependencies and portable across hosts.
async function storeEmail(email: string): Promise<StoreResult> {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return "unconfigured";

  try {
    const res = await fetch(`${url.replace(/\/$/, "")}/rest/v1/waitlist`, {
      method: "POST",
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({ email }),
    });
    if (res.ok) return "stored";
    if (res.status === 409) return "duplicate"; // unique(email) violation
    console.error(`[waitlist] insert failed: HTTP ${res.status}`);
    return "failed";
  } catch {
    console.error("[waitlist] insert failed: network error");
    return "failed";
  }
}

export async function POST(request: Request) {
  let email = "";
  try {
    const body: unknown = await request.json();
    if (body && typeof body === "object" && "email" in body) {
      email = String((body as { email: unknown }).email).trim().toLowerCase();
    }
  } catch {
    // fall through to validation error
  }

  if (email.length > 254 || !EMAIL_RE.test(email)) {
    return Response.json({ message: "Please enter a valid email address." }, { status: 400 });
  }

  const result = await storeEmail(email);

  if (result === "failed") {
    return Response.json(
      { message: "We couldn't save your email right now. Please try again shortly." },
      { status: 503 },
    );
  }

  if (result === "unconfigured") {
    const [local, domain] = email.split("@");
    console.log(`[waitlist] database not configured; signup not persisted: ${local[0]}***@${domain}`);
  }

  // A duplicate is reported as success so the endpoint can't be used to probe
  // which addresses are already on the list.
  return Response.json({ message: "Your spot on the private waitlist is secured." });
}
