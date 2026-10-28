"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { format } from "@/lib/i18n";
import type { Plan, PublicInsight } from "@/lib/insights";
import { useDictionary } from "./I18nProvider";
import { InsightCard } from "./InsightCard";
import { LockOverlay } from "./LockOverlay";

const navItems = [
  { key: "opportunities", active: true },
  { key: "watchlist", active: false },
  { key: "marketPulse", active: false },
  { key: "researchArchive", active: false },
  { key: "account", active: false },
] as const;

interface InsightsResponse {
  plan: Plan;
  insights: PublicInsight[];
}

export function Dashboard() {
  const { dict } = useDictionary();
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
            {dict.brand.name.toUpperCase()}
          </p>
          <p className="mt-1 text-[10px] uppercase tracking-[0.3em] text-muted">
            {dict.brand.tagline}
          </p>
        </div>
        <nav className="mt-10 flex flex-col gap-1" aria-label={dict.nav.ariaLabel}>
          {navItems.map((item) => (
            <a
              key={item.key}
              href="#"
              aria-current={item.active ? "page" : undefined}
              className={`rounded-lg px-3 py-2 text-sm transition ${
                item.active
                  ? "bg-gold/10 text-gold"
                  : "text-foreground/70 hover:bg-white/5 hover:text-foreground"
              }`}
            >
              {dict.nav[item.key]}
            </a>
          ))}
        </nav>
        <div className="mt-auto rounded-xl border border-gold/20 p-4">
          <p className="text-[10px] uppercase tracking-[0.25em] text-muted">{dict.membership.label}</p>
          <p className="font-heading mt-1 text-xl text-gold">
            {data ? (isPremium ? dict.membership.premium : dict.membership.free) : "…"}
          </p>
          {data && (
            <button
              type="button"
              onClick={() => setDemoPlan(isPremium ? "free" : "premium")}
              className="mt-3 text-xs text-muted underline-offset-4 hover:text-gold hover:underline"
            >
              {format(dict.membership.switchTo, {
                plan: isPremium ? dict.membership.free : dict.membership.premium,
              })}
            </button>
          )}
        </div>
      </aside>

      <main className="min-w-0 flex-1 px-5 py-8 sm:px-10">
        <header className="mb-8">
          <h1 className="font-heading text-4xl font-semibold">{dict.dashboard.title}</h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-foreground/80">
            {dict.dashboard.hook}
          </p>
          <p className="mt-2 text-xs text-muted">{dict.dashboard.educational}</p>
        </header>

        <div className="mx-auto flex max-w-3xl flex-col gap-6">
          {failed && (
            <p role="alert" className="text-sm text-rose-300">
              {dict.dashboard.loadError}
            </p>
          )}
          {!data && !failed && (
            <p role="status" className="text-sm text-muted">
              {dict.dashboard.loading}
            </p>
          )}
          {teaser && <InsightCard insight={teaser} />}
          <div className="relative flex flex-col gap-6">
            {gated.map((insight) => (
              <InsightCard key={insight.id} insight={insight} />
            ))}
            {showLock && <LockOverlay onUnlockDemo={() => setDemoPlan("premium")} />}
          </div>
          <footer className="border-t border-gold/15 pt-6 text-center text-xs text-muted">
            {format(dict.dashboard.copyright, { year: new Date().getFullYear() })} ·{" "}
            <Link href="/privacy" className="hover:text-gold">
              {dict.dashboard.privacyLink}
            </Link>
          </footer>
        </div>
      </main>
    </div>
  );
}
