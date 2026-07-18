"use client";

import { useState } from "react";

import { StepShell } from "@/components/onboarding/step-shell";
import { Field, TimeInput } from "@/components/onboarding/field";
import { SleepSlider } from "@/components/onboarding/sleep-slider";

/**
 * Step 4 — Sleep preferences.
 *
 * Two questions, one a quiet acknowledgment line.
 *  1. Sleep need (slider). Default 7h30m — the median for adults.
 *  2. Preferred wake time (optional). Default 16:00, set for a 22:00 clock-in.
 *
 * The under-report line is design-as-content. It tells the user we know what
 * they're going to do (over-estimate how little sleep they need) and gives
 * them quiet permission to be honest. That's the product.
 */
export default function PreferencesStep() {
  const [hours, setHours] = useState(7.5);
  const [wakeTime, setWakeTime] = useState("16:00");

  return (
    <StepShell
      step={4}
      title="Sleep preferences"
      heading="How much sleep do you need to feel okay?"
      lede="The honest number, not the wellness-influencer number. Drift sizes your plans around it."
      back="/onboarding/roster"
      next="/onboarding/done"
      nextLabel="Build my first plan"
    >
      <div className="flex flex-col gap-10">
        {/* Slider card — full-width, centered readout, soft sand background */}
        <div className="rounded-2xl bg-canvas p-7 shadow-hairline">
          <SleepSlider value={hours} onChange={setHours} />
          <p className="mx-auto mt-6 max-w-sm text-center text-caption italic text-ink-faint">
            Most shift workers under-report this by 30–60 minutes. If the
            number above feels generous, it's probably right.
          </p>
        </div>

        <Field
          label="Preferred wake time"
          hint="Where Drift starts looking for a wake-up window on a free day. You can override per-day later."
        >
          <TimeInput
            value={wakeTime}
            onChange={(e) => setWakeTime(e.target.value)}
            aria-label="Preferred wake time"
            className="max-w-[180px]"
          />
        </Field>
      </div>
    </StepShell>
  );
}
