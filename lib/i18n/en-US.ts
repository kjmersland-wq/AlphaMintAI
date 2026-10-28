// Source-of-truth dictionary. Every other locale must satisfy the same shape
// (see `Dictionary` in ./index.ts), so a missing key is a compile error.
// Placeholders use {name} and are filled by `format()`.
export const enUS = {
  brand: {
    name: "AlphaMint AI",
    tagline: "AI Investment Intelligence",
  },
  nav: {
    ariaLabel: "Primary",
    opportunities: "Opportunities",
    watchlist: "Watchlist",
    marketPulse: "Market Pulse",
    researchArchive: "Research Archive",
    account: "Account",
  },
  membership: {
    label: "Membership",
    free: "Free",
    premium: "Premium",
    switchTo: "Switch to {plan} (demo)",
  },
  dashboard: {
    title: "AI Investment Opportunities",
    hook: "Most investors react to the news. The top 1% track the underlying data trends before they surface. AlphaMint AI maps asset sentiment in real-time—so you don't have to guess.",
    educational: "Educational use only. Explore at your own pace.",
    loading: "Preparing your view…",
    loadError: "We couldn't load your insights just now. A quick refresh usually does it.",
    privacyLink: "Privacy Policy",
    copyright: "© {year} AlphaMint AI",
  },
  insight: {
    bullCase: "Bull Case",
    bearCase: "Bear Case",
    confidence: "AI Confidence · {signal}",
    confidenceAria: "AI buy/sell confidence score",
    signal: { buy: "Buy", hold: "Hold", sell: "Sell" },
    sentiment: { Bullish: "Bullish", Neutral: "Neutral", Bearish: "Bearish" },
    brokerCta: "Invest via Partner Broker",
  },
  disclaimer: {
    label: "Important Notice.",
    body: "All AI-generated insights are provided for educational purposes and general market information only. They do not constitute financial, investment, tax, or legal advice, nor a recommendation or solicitation to buy or sell any security or asset. Past performance is not indicative of future results. Investing involves risk, including the possible loss of principal. Consult a licensed financial adviser before making investment decisions.",
  },
  lock: {
    eyebrow: "By Invitation",
    heading: "A Place Held for You",
    invitation:
      "We are currently restricting access to a small group of active traders while finalizing our infrastructure relocation. Launch pricing will lock in at {price}/mo for early members. Would it be helpful for you to secure a spot on the private waitlist before we open the doors completely?",
    tiersHeading: "Membership tiers (USD)",
    perMonth: "/mo",
    comingSoon: "Coming Soon",
    limited: "Limited capacity",
    earlyAccessNote:
      "Early access members permanently lock in the {tier} tier at launch pricing ({price}/mo) before tiering goes fully live.",
    emailLabel: "Email address",
    emailPlaceholder: "Where should we reach you?",
    consentBefore:
      "I understand AlphaMint AI provides objective data analysis, not personalized financial advice, and I agree to the ",
    consentLink: "Privacy Policy",
    consentAfter: ".",
    submit: "Secure My Spot on the Private Waitlist",
    submitting: "Securing your spot…",
    success:
      "Your spot on the private waitlist is secured. We will notify you at this address as soon as a slot opens up. No pressure, no obligations.",
    errorGeneric: "Something went wrong on our side. Please try once more.",
    errorNetwork:
      "We couldn't reach our servers just now. Whenever you're ready, please try once more.",
    demoLink: "Just curious? Take a look inside (demo)",
  },
  plans: {
    insider: {
      name: "Insider",
      tagline: "Standard AI insights",
      features: [
        "AI confidence scores and bull/bear analysis",
        "Fresh opportunities as they are published",
      ],
    },
    alphaPro: {
      name: "Alpha Pro",
      tagline: "Real-time alerts and community signals",
      features: ["Everything in Insider", "Real-time alerts", "Community signals"],
    },
    prestige: {
      name: "Prestige",
      tagline: "Direct portfolio sync, limited capacity",
      features: ["Everything in Alpha Pro", "Direct portfolio sync", "Limited capacity"],
    },
  },
};
