"use client";

import { useCallback, useEffect, useState } from "react";
import type { Plan, PublicInsight } from "@/lib/insights";
import { InsightCard } from "./InsightCard";
import { LockOverlay } from "./LockOverlay";

const navItems = [
  { label: "Opportunities", active: true },
  { label: "Watchlist", active: false },
  { label: "Market Pulse", active: false },
  { label: "Research Archive", active: false },
  { label: "Account", active: false },
];

interface InsightsResponse {
  plan: Plan;
  insights: PublicInsight[];
}

export function Dashboard() {
  const [data, setData] = useState<InsightsResponse | null>(null);
  const [failed, setFailed] = useState(false);

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/insights", { cache: "no-store" });
      if (!res.ok) throw new Error(String(res.status));
      setData((await res.json()) as InsightsResponse);
      setFailed(false);
    } catch {
      setFailed(true);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial data fetch
    void load();
  }, [load]);

  // Demo only: the mock session is a cookie the API reads. The server decides
  // what data to return; this just changes which session the API sees.
  async function setDemoPlan(plan: Plan) {
    document.cookie = `alphamint_plan=${plan}; path=/; SameSite=Lax`;
    await load();
  }

  const isPremium = data?.plan === "premium";
  const showLock = data !== null && !isPremium;
  const [teaser, ...gated] = data?.insights ?? [];

  return (
    <div className="flex min-h-screen">
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-gold/15 bg-panel px-6 py-8 md:flex">
        <div>
          <p className="font-heading whitespace-nowrap text-xl font-semibold text-gold">
            ALPHAMINT AI
          </p>
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
            {data ? (isPremium ? "Premium" : "Free") : "…"}
          </p>
          {data && (
            <button
              type="button"
              onClick={() => setDemoPlan(isPremium ? "free" : "premium")}
              className="mt-3 text-xs text-muted underline-offset-4 hover:text-gold hover:underline"
            >
              Switch to {isPremium ? "Free" : "Premium"} (demo)
            </button>
          )}
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
          {failed && (
            <p role="alert" className="text-sm text-rose-300">
              Unable to load insights. Please refresh.
            </p>
          )}
          {!data && !failed && (
            <p role="status" className="text-sm text-muted">
              Loading insights…
            </p>
          )}
          {teaser && <InsightCard insight={teaser} />}
          <div className="relative flex flex-col gap-6">
            {gated.map((insight) => (
              <InsightCard key={insight.id} insight={insight} />
            ))}
            {showLock && <LockOverlay onUnlockDemo={() => setDemoPlan("premium")} />}
          </div>
        </div>
      </main>
    </div>
  );
}
