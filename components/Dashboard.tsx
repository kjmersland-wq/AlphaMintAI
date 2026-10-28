"use client";

import { useState } from "react";
import { insights } from "@/lib/insights";
import { InsightCard } from "./InsightCard";
import { LockOverlay } from "./LockOverlay";

type Plan = "free" | "premium";

const navItems = [
  { label: "Opportunities", active: true },
  { label: "Watchlist", active: false },
  { label: "Market Pulse", active: false },
  { label: "Research Archive", active: false },
  { label: "Account", active: false },
];

export function Dashboard() {
  // In production, derive this from the authenticated user's Stripe subscription.
  const [plan, setPlan] = useState<Plan>("free");
  const isPremium = plan === "premium";

  const [teaser, ...gated] = insights;

  return (
    <div className="flex min-h-screen">
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-gold/15 bg-panel px-6 py-8 md:flex">
        <div>
          <p className="font-heading text-3xl font-semibold text-gold">AUREUM</p>
          <p className="mt-1 text-[10px] uppercase tracking-[0.3em] text-muted">
            AI Investment Intelligence
          </p>
        </div>
        <nav className="mt-10 flex flex-col gap-1" aria-label="Primary">
          {navItems.map((item) => (
            <a
              key={item.label}
              href="#"
              aria-current={item.active ? "page" : undefined}
              className={`rounded-lg px-3 py-2 text-sm transition ${
                item.active
                  ? "bg-gold/10 text-gold"
                  : "text-foreground/70 hover:bg-white/5 hover:text-foreground"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="mt-auto rounded-xl border border-gold/20 p-4">
          <p className="text-[10px] uppercase tracking-[0.25em] text-muted">Membership</p>
          <p className="font-heading mt-1 text-xl text-gold">
            {isPremium ? "Premium" : "Free"}
          </p>
          <button
            type="button"
            onClick={() => setPlan(isPremium ? "free" : "premium")}
            className="mt-3 text-xs text-muted underline-offset-4 hover:text-gold hover:underline"
          >
            Switch to {isPremium ? "Free" : "Premium"} (demo)
          </button>
        </div>
      </aside>

      <main className="min-w-0 flex-1 px-5 py-8 sm:px-10">
        <header className="mb-8">
          <h1 className="font-heading text-4xl font-semibold">AI Investment Opportunities</h1>
          <p className="mt-2 text-sm text-muted">
            Curated by our models. Updated daily. Educational use only.
          </p>
        </header>

        <div className="mx-auto flex max-w-3xl flex-col gap-6">
          <InsightCard insight={teaser} />

          <div className="relative flex flex-col gap-6">
            {gated.map((insight) => (
              <InsightCard key={insight.id} insight={insight} locked={!isPremium} />
            ))}
            {!isPremium && <LockOverlay onUnlockDemo={() => setPlan("premium")} />}
          </div>
        </div>
      </main>
    </div>
  );
}
