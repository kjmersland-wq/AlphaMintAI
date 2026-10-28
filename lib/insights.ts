export type Sentiment = "Bullish" | "Neutral" | "Bearish";

export interface Insight {
  id: string;
  asset: string;
  ticker: string;
  sentiment: Sentiment;
  /** AI buy/sell confidence, 0 (strong sell) to 100 (strong buy). */
  confidence: number;
  bull: string[];
  bear: string[];
}

// Illustrative sample data only. Replace with a live model/data pipeline.
export const insights: Insight[] = [
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
