export type Plan = {
  id: string;
  name: string;
  priceLabel: string;
  cadence: string;
  tagline: string;
  features: string[];
  cta: string;
  featured?: boolean;
};

export const plans: Plan[] = [
  {
    id: "free",
    name: "Open",
    priceLabel: "Free",
    cadence: "forever",
    tagline: "Enough to feel the difference on a hard week.",
    features: [
      "One roster",
      "Tonight's plan, every night",
      "Basic sleep-debt tracker",
      "Three core wind-down rituals",
    ],
    cta: "Start free",
  },
  {
    id: "steady",
    name: "Steady",
    priceLabel: "$6.99",
    cadence: "per month",
    tagline: "For people whose roster never stops moving.",
    features: [
      "Unlimited rosters and roster sources",
      "Debt forecasting across the week",
      "Full ritual library, including daytime sets",
      "Weekly check-in with a written plan",
      "Partner & family sharing",
      "Wearable sync (Oura, Whoop, Apple Watch)",
    ],
    cta: "Try Steady free for 14 days",
    featured: true,
  },
];
