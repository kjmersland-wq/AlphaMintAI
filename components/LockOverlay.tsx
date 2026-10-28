"use client";

import { useState } from "react";

export const MONTHLY_PRICE = 99;

export function LockOverlay({ onUnlockDemo }: { onUnlockDemo: () => void }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function startCheckout() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", { method: "POST" });
      const data: { url?: string; message?: string } = await res.json();
      if (res.ok && data.url) {
        window.location.assign(data.url);
        return;
      }
      setError(data.message ?? "Checkout is not configured yet.");
    } catch {
      setError("Unable to reach checkout. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="absolute inset-0 z-10 flex items-start justify-center rounded-2xl bg-background/30 p-4 backdrop-blur-md">
      <div className="sticky top-24 mt-8 w-full max-w-md rounded-2xl border border-gold/40 bg-white/[0.04] p-8 text-center shadow-2xl backdrop-blur-md">
        <p className="text-[11px] uppercase tracking-[0.3em] text-gold-soft">
          Members Only
        </p>
        <h2 className="font-heading mt-2 text-3xl font-semibold">Aureum Private</h2>
        <p className="mt-3 text-sm text-foreground/75">
          Unlock full AI confidence scores, bull &amp; bear analysis, and every new
          opportunity as it is published.
        </p>

        <p className="mt-6">
          <span className="font-heading text-5xl text-gold">${MONTHLY_PRICE}</span>
          <span className="text-sm text-muted"> / month</span>
        </p>
        <p className="mt-1 text-xs text-muted">Single membership tier. Cancel anytime.</p>

        <button
          type="button"
          onClick={startCheckout}
          disabled={loading}
          className="mt-6 w-full rounded-lg bg-gradient-to-b from-gold to-gold-soft px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-background transition hover:brightness-110 disabled:opacity-60"
        >
          {loading ? "Redirecting…" : "Become a Member"}
        </button>
        {error && (
          <p role="alert" className="mt-3 text-xs text-rose-300">
            {error}
          </p>
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
