import type { Insight, Sentiment } from "@/lib/insights";
import { Disclaimer } from "./Disclaimer";

// Replace with your partner broker's tracked affiliate URL.
const AFFILIATE_URL =
  process.env.NEXT_PUBLIC_BROKER_AFFILIATE_URL ?? "https://example.com/partner-broker";

const sentimentStyle: Record<Sentiment, string> = {
  Bullish: "text-emerald-400 border-emerald-400/30 bg-emerald-400/10",
  Neutral: "text-amber-300 border-amber-300/30 bg-amber-300/10",
  Bearish: "text-rose-400 border-rose-400/30 bg-rose-400/10",
};

function ConfidenceMeter({ value }: { value: number }) {
  const label = value >= 60 ? "Buy" : value <= 40 ? "Sell" : "Hold";
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <span className="text-[11px] uppercase tracking-[0.2em] text-muted">
          AI Confidence · {label}
        </span>
        <span className="font-heading text-3xl text-gold">{value}</span>
      </div>
      <div
        className="mt-2 h-1 w-full overflow-hidden rounded-full bg-white/10"
        role="meter"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="AI buy/sell confidence score"
      >
        <div
          className="h-full rounded-full bg-gradient-to-r from-bronze to-gold"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

export function InsightCard({
  insight,
  locked = false,
}: {
  insight: Insight;
  locked?: boolean;
}) {
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
          {insight.sentiment}
        </span>
      </header>

      {/* High-value analytics: blurred and inert for Free members. */}
      <div
        className={locked ? "pointer-events-none select-none blur-md" : undefined}
        aria-hidden={locked}
      >
        <div className="mt-6">
          <ConfidenceMeter value={insight.confidence} />
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <section>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">
              Bull Case
            </h4>
            <ul className="mt-2 space-y-1.5 text-sm text-foreground/85">
              {insight.bull.map((point) => (
                <li key={point} className="flex gap-2">
                  <span className="text-emerald-400">▲</span>
                  {point}
                </li>
              ))}
            </ul>
          </section>
          <section>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-400">
              Bear Case
            </h4>
            <ul className="mt-2 space-y-1.5 text-sm text-foreground/85">
              {insight.bear.map((point) => (
                <li key={point} className="flex gap-2">
                  <span className="text-rose-400">▼</span>
                  {point}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <footer className="mt-6">
          <a
            href={AFFILIATE_URL}
            target="_blank"
            rel="sponsored noopener noreferrer"
            tabIndex={locked ? -1 : undefined}
            className="block w-full rounded-lg bg-gradient-to-b from-gold to-gold-soft px-5 py-3 text-center text-sm font-semibold uppercase tracking-[0.18em] text-background transition hover:brightness-110"
          >
            Invest via Partner Broker
          </a>
          <Disclaimer />
        </footer>
      </div>
    </article>
  );
}
