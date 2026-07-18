export type Feature = {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  /** What the mocked product screenshot inside the feature card should show. */
  screen: "plan" | "debt" | "ritual";
};

export const features: Feature[] = [
  {
    id: "plans",
    eyebrow: "Plans",
    title: "Roster-aware sleep plans.",
    body: "Not “go to bed earlier.” Real plans for back-to-back nights, post-shift recovery, and the strange in-between days. Each one comes with the why.",
    screen: "plan",
  },
  {
    id: "debt",
    eyebrow: "Debt",
    title: "Sleep-debt math you can read.",
    body: "The number, what it's costing you — reaction time, mood, immunity — and a clear week-long plan to claw it back without wrecking your next shift.",
    screen: "debt",
  },
  {
    id: "rituals",
    eyebrow: "Rituals",
    title: "Wind-downs for daytime sleep.",
    body: "It's 09:00 and the world is loud. Eye-mask cues, room set-ups, and three-minute pre-sleep rituals built for the bright window outside.",
    screen: "ritual",
  },
];
