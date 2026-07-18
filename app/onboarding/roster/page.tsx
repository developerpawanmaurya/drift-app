"use client";

import { useState } from "react";
import { Building2, Camera, MessageSquareText, Pencil } from "lucide-react";

import { StepShell } from "@/components/onboarding/step-shell";
import { ChoiceGroup, type Choice } from "@/components/onboarding/choice-card";

type RosterSource = "company-app" | "photo" | "paste" | "type";

const choices: Choice<RosterSource>[] = [
  {
    value: "company-app",
    title: "From a hospital or company app",
    description:
      "Trinity, NHS e-Rostering, Kronos, Deputy, Humanity. We'll guide you through connecting it.",
    icon: Building2,
  },
  {
    value: "photo",
    title: "A photo of a printed schedule",
    description:
      "Snap it once a week. Drift reads the dates and times directly off the page.",
    icon: Camera,
  },
  {
    value: "paste",
    title: "Paste from a message or doc",
    description:
      "Forward your WhatsApp roster, paste from an email, or drop a doc — Drift parses it.",
    icon: MessageSquareText,
  },
  {
    value: "type",
    title: "Just type it in",
    description:
      "Honestly, some weeks that's the fastest. Two taps per shift, no setup.",
    icon: Pencil,
  },
];

export default function RosterStep() {
  // No pre-selection here — the user makes a real choice. The skip option is
  // first-class (rendered as a Button in the footer, not a hidden link).
  const [value, setValue] = useState<RosterSource | null>(null);

  return (
    <StepShell
      step={3}
      title="Roster source"
      heading="How does your roster usually arrive?"
      lede="Tell us how you receive it now — we'll show you how to pull it into Drift. This step is optional."
      back="/onboarding/next-shift"
      next="/onboarding/preferences"
      nextDisabled={value === null}
      skip={{ href: "/onboarding/preferences", label: "I'll set this up later" }}
    >
      <ChoiceGroup
        name="roster-source"
        value={value}
        onChange={setValue}
        choices={choices}
      />
    </StepShell>
  );
}
