"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";

type Status = "idle" | "loading" | "success" | "error";

export function LockOverlay({ onUnlockDemo }: { onUnlockDemo: () => void }) {
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function joinWaitlist(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data: { message?: string } = await res.json();
      setStatus(res.ok ? "success" : "error");
      setMessage(data.message ?? (res.ok ? "You're on the list." : "Something went wrong."));
    } catch {
      setStatus("error");
      setMessage("Unable to reach the server. Please try again.");
    }
  }

  return (
    <div className="absolute inset-0 z-10 flex items-start justify-center rounded-2xl bg-background/30 p-4 backdrop-blur-md">
      <div className="sticky top-24 mt-8 w-full max-w-md rounded-2xl border border-gold/40 bg-white/[0.04] p-8 text-center shadow-2xl backdrop-blur-md">
        <p className="text-[11px] uppercase tracking-[0.3em] text-gold-soft">
          Members Only
        </p>
        <h2 className="font-heading mt-2 text-3xl font-semibold">AlphaMint AI Private</h2>
        <p className="mt-3 text-sm text-foreground/75">
          Full AI confidence scores, bull &amp; bear analysis, and every new
          opportunity as it is published.
        </p>

        <p className="mt-6">
          <span className="text-[11px] uppercase tracking-[0.25em] text-muted">
            Launch Pricing
          </span>
          <span className="mt-1 block">
            <span className="font-heading text-5xl text-gold">$99</span>
            <span className="text-sm text-muted">/mo</span>
          </span>
          <span className="mt-1 block text-xs text-gold-soft">(Coming Soon)</span>
        </p>

        {status === "success" ? (
          <p role="status" className="mt-6 text-sm text-emerald-300">
            {message}
          </p>
        ) : (
          <form onSubmit={joinWaitlist} className="mt-6 flex flex-col gap-3" noValidate>
            <label htmlFor="waitlist-email" className="sr-only">
              Email address
            </label>
            <input
              id="waitlist-email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-gold/30 bg-background/60 px-4 py-3 text-sm text-foreground placeholder:text-muted focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
            />
            <label className="flex items-start gap-2 text-left text-xs text-muted">
              <input
                type="checkbox"
                required
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 accent-[#d4af37]"
              />
              <span>
                By joining, you agree to our{" "}
                <Link
                  href="/privacy"
                  target="_blank"
                  className="text-gold underline-offset-4 hover:underline"
                >
                  Privacy Policy
                </Link>
                .
              </span>
            </label>
            <button
              type="submit"
              disabled={status === "loading" || !agreed}
              className="w-full rounded-lg bg-gradient-to-b from-gold to-gold-soft px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-background transition hover:brightness-110 disabled:opacity-60"
            >
              {status === "loading" ? "Joining…" : "Join Private Waitlist"}
            </button>
            {status === "error" && (
              <p role="alert" className="text-xs text-rose-300">
                {message}
              </p>
            )}
          </form>
        )}

        <button
          type="button"
          onClick={onUnlockDemo}
          className="mt-4 text-xs text-muted underline-offset-4 hover:text-gold hover:underline"
        >
          Preview Premium view (demo)
        </button>
      </div>
    </div>
  );
}
