export type Sentiment = "Bullish" | "Neutral" | "Bearish";
export type Plan = "free" | "premium";

interface PremiumFields {
  /** AI buy/sell confidence, 0 (strong sell) to 100 (strong buy). */
  confidence: number;
  bull: string[];
  bear: string[];
}

/** Full record. Server-only: never send this shape to a Free session. */
export interface Insight extends PremiumFields {
  id: string;
  asset: string;
  ticker: string;
  sentiment: Sentiment;
}

/** What the API returns. Premium fields are absent (not null) when locked. */
export interface PublicInsight extends Partial<PremiumFields> {
  id: string;
  asset: string;
  ticker: string;
  sentiment: Sentiment;
  locked: boolean;
  affiliateUrl?: string;
}

// Illustrative sample data only. Replace with a live model/data pipeline.
const insights: Insight[] = [
  {
    id: "nvda",
    asset: "NVIDIA Corporation",
    ticker: "NVDA",
    sentiment: "Bullish",
    confidence: 78,
    bull: [
      "Sustained data-center demand for accelerated compute",
      "Software ecosystem creates high switching costs",
      "Expanding sovereign and enterprise AI budgets",
    ],
    bear: [
      "Valuation already prices in aggressive growth",
      "Customer concentration among hyperscalers",
      "Rising custom-silicon competition",
    ],
  },
  {
    id: "btc",
    asset: "Bitcoin",
    ticker: "BTC",
    sentiment: "Neutral",
    confidence: 54,
    bull: [
      "Growing institutional access via regulated vehicles",
      "Supply schedule remains structurally fixed",
    ],
    bear: [
      "High sensitivity to liquidity and rate expectations",
      "Regulatory outcomes remain uncertain",
    ],
  },
  {
    id: "gld",
    asset: "Gold Spot",
    ticker: "XAU",
    sentiment: "Bullish",
    confidence: 71,
    bull: [
      "Central-bank accumulation continues",
      "Hedge demand amid geopolitical risk",
    ],
    bear: [
      "Stronger real yields reduce appeal",
      "Positioning appears crowded near highs",
    ],
  },
  {
    id: "tsla",
    asset: "Tesla, Inc.",
    ticker: "TSLA",
    sentiment: "Bearish",
    confidence: 32,
    bull: [
      "Energy storage segment scaling rapidly",
      "Optionality in autonomy and robotics",
    ],
    bear: [
      "Automotive margin compression",
      "Intensifying global EV price competition",
    ],
  },
];

/** The first insight is a free teaser; the rest are premium-only. */
const FREE_TEASER_COUNT = 1;

/**
 * Shapes insights for a plan. For Free sessions the premium fields
 * (confidence, bull/bear, affiliate link) are removed from the object entirely,
 * so they never reach the client.
 */
export function getInsightsForPlan(plan: Plan, affiliateUrl: string): PublicInsight[] {
  return insights.map((insight, index) => {
    const { id, asset, ticker, sentiment, ...premium } = insight;
    const unlocked = plan === "premium" || index < FREE_TEASER_COUNT;
    return unlocked
      ? { id, asset, ticker, sentiment, locked: false, affiliateUrl, ...premium }
      : { id, asset, ticker, sentiment, locked: true };
  });
}
