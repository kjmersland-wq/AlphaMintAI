"use client";

import type { PublicInsight, Sentiment } from "@/lib/insights";
import { format } from "@/lib/i18n";
import { Disclaimer } from "./Disclaimer";
import { useDictionary } from "./I18nProvider";

const sentimentStyle: Record<Sentiment, string> = {
  Bullish: "text-emerald-400 border-emerald-400/30 bg-emerald-400/10",
  Neutral: "text-amber-300 border-amber-300/30 bg-amber-300/10",
  Bearish: "text-rose-400 border-rose-400/30 bg-rose-400/10",
};

function ConfidenceMeter({ value }: { value: number }) {
  const { dict } = useDictionary();
  const signal =
    value >= 60 ? dict.insight.signal.buy : value <= 40 ? dict.insight.signal.sell : dict.insight.signal.hold;
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <span className="text-[11px] uppercase tracking-[0.2em] text-muted">
          {format(dict.insight.confidence, { signal })}
        </span>
        <span className="font-heading text-3xl text-gold">{value}</span>
      </div>
      <div
        className="mt-2 h-1 w-full overflow-hidden rounded-full bg-white/10"
        role="meter"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={dict.insight.confidenceAria}
      >
        <div
          className="h-full rounded-full bg-gradient-to-r from-bronze to-gold"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

function Points({ title, points, tone }: { title: string; points: string[]; tone: "bull" | "bear" }) {
  const color = tone === "bull" ? "text-emerald-400" : "text-rose-400";
  return (
    <section>
      <h4 className={`text-xs font-semibold uppercase tracking-[0.2em] ${color}`}>{title}</h4>
      <ul className="mt-2 space-y-1.5 text-sm text-foreground/85">
        {points.map((point) => (
          <li key={point} className="flex gap-2">
            <span className={color}>{tone === "bull" ? "▲" : "▼"}</span>
            {point}
          </li>
        ))}
      </ul>
    </section>
  );
}

/**
 * Stand-in for withheld analysis. Pure decoration: none of these shapes are
 * derived from real data, so blurring them reveals nothing.
 */
function LockedPlaceholder() {
  return (
    <div className="mt-6 select-none blur-md" aria-hidden="true">
      <div className="h-8 w-full rounded bg-white/10" />
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {[0, 1].map((col) => (
          <div key={col} className="space-y-2">
            <div className="h-3 w-1/3 rounded bg-white/10" />
            <div className="h-3 w-full rounded bg-white/10" />
            <div className="h-3 w-5/6 rounded bg-white/10" />
            <div className="h-3 w-2/3 rounded bg-white/10" />
          </div>
        ))}
      </div>
      <div className="mt-6 h-11 w-full rounded-lg bg-white/10" />
    </div>
  );
}

export function InsightCard({ insight }: { insight: PublicInsight }) {
  const { dict } = useDictionary();
  const { confidence, bull, bear, affiliateUrl } = insight;

  return (
    <article className="rounded-2xl border border-gold/20 bg-panel p-6 shadow-[0_0_0_1px_rgba(0,0,0,0.4)]">
      <header className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.25em] text-gold-soft">
            {insight.ticker}
          </p>
          <h3 className="font-heading mt-1 text-2xl font-semibold">{insight.asset}</h3>
        </div>
        <span
          className={`rounded-full border px-3 py-1 text-xs font-medium ${sentimentStyle[insight.sentiment]}`}
        >
          {dict.insight.sentiment[insight.sentiment]}
        </span>
      </header>

      {insight.locked ? (
        <LockedPlaceholder />
      ) : (
        <>
          {confidence !== undefined && (
            <div className="mt-6">
              <ConfidenceMeter value={confidence} />
            </div>
          )}

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {bull && <Points title={dict.insight.bullCase} points={bull} tone="bull" />}
            {bear && <Points title={dict.insight.bearCase} points={bear} tone="bear" />}
          </div>

          <footer className="mt-6">
            {affiliateUrl && (
              <a
                href={affiliateUrl}
                target="_blank"
                rel="sponsored noopener noreferrer"
                className="block w-full rounded-lg bg-gradient-to-b from-gold to-gold-soft px-5 py-3 text-center text-sm font-semibold uppercase tracking-[0.18em] text-background transition hover:brightness-110"
              >
                {dict.insight.brokerCta}
              </a>
            )}
            <Disclaimer />
          </footer>
        </>
      )}
    </article>
  );
}
