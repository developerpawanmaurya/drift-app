export type Step = {
  number: string;
  title: string;
  body: string;
};

export const steps: Step[] = [
  {
    number: "01",
    title: "Sync your roster.",
    body: "Paste from your hospital app, photograph the printed sheet, or type it in. Drift figures out the pattern.",
  },
  {
    number: "02",
    title: "Get tonight's plan.",
    body: "A bedtime, a wake time, and a wind-down ritual sized to the shift in front of you. With the reasoning. In under 60 seconds.",
  },
  {
    number: "03",
    title: "Adjust as it shifts.",
    body: "Swap on call, pull a double, hand it off at 03:00 — Drift updates the plan, tracks your sleep debt, and tells you when to claw it back.",
  },
];
