"use client";

import { useState } from "react";
import { Moon, Repeat, Zap, Sunrise } from "lucide-react";

import { StepShell } from "@/components/onboarding/step-shell";
import { ChoiceGroup, type Choice } from "@/components/onboarding/choice-card";

type Pattern = "nights" | "rotating" | "variable" | "early";

const choices: Choice<Pattern>[] = [
  {
    value: "nights",
    title: "Mostly nights",
    description:
      "Block-of-nights or 4-on / 3-off. ICU, ED, long-haul driving, factory floors.",
    icon: Moon,
  },
  {
    value: "rotating",
    title: "Rotating shifts",
    description:
      "Days, evenings, and nights mixed together. Police, paramedics, transit, hotels.",
    icon: Repeat,
  },
  {
    value: "variable",
    title: "Variable or gig",
    description:
      "You set the hours, but they shift week to week. Rideshare, delivery, freelance.",
    icon: Zap,
  },
  {
    value: "early",
    title: "Early starts",
    description:
      "Pre-dawn shifts where falling asleep is the problem, not waking. Bakery, transit, airport.",
    icon: Sunrise,
  },
];

export default function WorkPatternStep() {
  // Smart default: most Drift users land here from the night-shift hero. We
  // pre-select "Mostly nights" so the Continue button is never disabled and a
  // user who just wants to see the product can keep moving.
  const [value, setValue] = useState<Pattern>("nights");

  return (
    <StepShell
      step={1}
      title="Your week"
      heading="Which kind of week do you work?"
      lede="We don't need this exactly right. You can change it any time — Drift adapts as your shifts shift."
      next="/onboarding/next-shift"
    >
      <ChoiceGroup
        name="work-pattern"
        value={value}
        onChange={setValue}
        choices={choices}
      />
    </StepShell>
  );
}
