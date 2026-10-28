import type { Locale } from "@/lib/i18n";

/** USD is the single, official billing currency for every tier. */
export const CURRENCY = "USD";

export type TierId = "insider" | "alphaPro" | "prestige";

export interface Tier {
  id: TierId;
  /** Monthly price in whole US dollars. */
  priceUsd: number;
  interval: "month";
  /** Capacity-capped tier: surface "limited" messaging in the UI. */
  limitedCapacity: boolean;
  /**
   * Name of the env var that will hold this tier's Stripe Price ID once billing
   * is enabled. Keeping Stripe IDs out of code lets the Poland entity create the
   * prices in its own Stripe account without a code change.
   */
  stripePriceEnv: string;
}

// Display copy (names, taglines, features) lives in the i18n dictionaries under
// `plans.<id>`; only structural and pricing data belongs here.
export const tiers: readonly Tier[] = [
  { id: "insider", priceUsd: 99, interval: "month", limitedCapacity: false, stripePriceEnv: "STRIPE_PRICE_ID_INSIDER" },
  { id: "alphaPro", priceUsd: 149, interval: "month", limitedCapacity: false, stripePriceEnv: "STRIPE_PRICE_ID_ALPHA_PRO" },
  { id: "prestige", priceUsd: 249, interval: "month", limitedCapacity: true, stripePriceEnv: "STRIPE_PRICE_ID_PRESTIGE" },
];

/** The tier early-access members lock in permanently at launch pricing. */
export const EARLY_ACCESS_TIER: TierId = "insider";

export function getTier(id: TierId): Tier {
  const tier = tiers.find((t) => t.id === id);
  if (!tier) throw new Error(`Unknown tier: ${id}`);
  return tier;
}

/** Formats a whole-dollar amount, e.g. 99 -> "$99" (en-US) in the given locale. */
export function formatUsd(amount: number, locale: Locale): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: CURRENCY,
    maximumFractionDigits: 0,
  }).format(amount);
}
