const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Conceptual storage: logs a masked address only. Replace the log with a write to
// your audience store (e.g. D1, KV, or an email provider list) before launch.
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

  const [local, domain] = email.split("@");
  console.log(`[waitlist] new signup: ${local[0]}***@${domain}`);

  return Response.json({ message: "You're on the list. We'll be in touch." });
}
