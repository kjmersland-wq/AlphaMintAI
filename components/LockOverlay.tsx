"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { format } from "@/lib/i18n";
import { EARLY_ACCESS_TIER, formatUsd, getTier, tiers } from "@/lib/tiers";
import { useDictionary } from "./I18nProvider";

type Status = "idle" | "loading" | "success" | "error";

export function LockOverlay({ onUnlockDemo }: { onUnlockDemo: () => void }) {
  const { dict, locale } = useDictionary();
  const t = dict.lock;

  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const earlyTier = getTier(EARLY_ACCESS_TIER);
  const earlyPrice = formatUsd(earlyTier.priceUsd, locale);

  async function joinWaitlist(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setStatus(res.ok ? "success" : "error");
      setMessage(res.ok ? t.success : t.errorGeneric);
    } catch {
      setStatus("error");
      setMessage(t.errorNetwork);
    }
  }

  return (
    <div className="absolute inset-0 z-10 flex items-start justify-center rounded-2xl bg-background/30 p-4 backdrop-blur-md">
      <div className="sticky top-24 mt-8 w-full max-w-md rounded-2xl border border-gold/40 bg-white/[0.04] p-8 text-center shadow-2xl backdrop-blur-md">
        <p className="text-[11px] uppercase tracking-[0.3em] text-gold-soft">{t.eyebrow}</p>
        <h2 className="font-heading mt-2 text-3xl font-semibold">{t.heading}</h2>
        <p className="mt-3 text-sm leading-relaxed text-foreground/75">
          {format(t.invitation, { price: earlyPrice })}
        </p>

        <div className="mt-6 text-left">
          <p className="text-center text-[11px] uppercase tracking-[0.25em] text-muted">
            {t.tiersHeading}
          </p>
          <ul className="mt-3 space-y-2">
            {tiers.map((tier) => {
              const plan = dict.plans[tier.id];
              const isEarly = tier.id === EARLY_ACCESS_TIER;
              return (
                <li
                  key={tier.id}
                  className={`flex items-center justify-between gap-3 rounded-lg border px-4 py-2.5 ${
                    isEarly ? "border-gold/60 bg-gold/10" : "border-white/10"
                  }`}
                >
                  <div className="min-w-0">
                    <p className="font-heading text-lg leading-tight text-foreground">
                      {plan.name}
                    </p>
                    <p className="truncate text-xs text-muted">
                      {tier.limitedCapacity ? t.limited : plan.tagline}
                    </p>
                  </div>
                  <p className="shrink-0 text-right">
                    <span className="font-heading text-2xl text-gold">
                      {formatUsd(tier.priceUsd, locale)}
                    </span>
                    <span className="text-xs text-muted">{t.perMonth}</span>
                  </p>
                </li>
              );
            })}
          </ul>
          <p className="mt-3 text-center text-xs leading-relaxed text-gold-soft">
            {format(t.earlyAccessNote, {
              tier: dict.plans[EARLY_ACCESS_TIER].name,
              price: earlyPrice,
            })}{" "}
            <span className="text-muted">({t.comingSoon})</span>
          </p>
        </div>

        {status === "success" ? (
          <p role="status" className="mt-6 text-sm text-emerald-300">
            {message}
          </p>
        ) : (
          <form onSubmit={joinWaitlist} className="mt-6 flex flex-col gap-3" noValidate>
            <label htmlFor="waitlist-email" className="sr-only">
              {t.emailLabel}
            </label>
            <input
              id="waitlist-email"
              type="email"
              required
              autoComplete="email"
              placeholder={t.emailPlaceholder}
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
                {t.consentBefore}
                <Link
                  href="/privacy"
                  target="_blank"
                  className="text-gold underline-offset-4 hover:underline"
                >
                  {t.consentLink}
                </Link>
                {t.consentAfter}
              </span>
            </label>
            <button
              type="submit"
              disabled={status === "loading" || !agreed}
              className="w-full rounded-lg bg-gradient-to-b from-gold to-gold-soft px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-background transition hover:brightness-110 disabled:opacity-60"
            >
              {status === "loading" ? t.submitting : t.submit}
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
          {t.demoLink}
        </button>
      </div>
    </div>
  );
}
