"use client";

import { useState } from "react";

import { StepShell } from "@/components/onboarding/step-shell";
import { Field, DateInput, TimeInput } from "@/components/onboarding/field";
import { cn } from "@/lib/utils";

/**
 * Step 2 — Next shift.
 *
 * Only step that's strictly required. We pre-fill with sensible night-shift
 * defaults (tonight, 22:00 → 06:00) so Continue is enabled on first paint.
 *
 * Toggle: "I'm not working tonight" — flips the form into a recovery framing.
 * The shift inputs stay (since we still need to know the last shift), but the
 * heading copy in the form area changes.
 */
export default function NextShiftStep() {
  // Today's date in YYYY-MM-DD for the native picker default.
  const today = new Date().toISOString().slice(0, 10);

  const [working, setWorking] = useState(true);
  const [date, setDate] = useState(today);
  const [start, setStart] = useState("22:00");
  const [end, setEnd] = useState("06:00");

  return (
    <StepShell
      step={2}
      title="Tonight's shift"
      heading={
        working
          ? "When does your next shift start?"
          : "When was your last shift?"
      }
      lede={
        working
          ? "This is the one thing we really need. Tonight's plan works backward from here."
          : "We'll build a recovery plan and start fresh once your next shift is on the calendar."
      }
      back="/onboarding/work"
      next="/onboarding/roster"
    >
      <div className="flex flex-col gap-6">
        <Field label="Date" hint="Local time — we'll sort out time zones if you travel.">
          <DateInput
            value={date}
            onChange={(e) => setDate(e.target.value)}
            aria-label="Shift date"
          />
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label={working ? "Clock in" : "Started at"}>
            <TimeInput
              value={start}
              onChange={(e) => setStart(e.target.value)}
              aria-label="Shift start time"
            />
          </Field>
          <Field label={working ? "Clock out" : "Finished at"}>
            <TimeInput
              value={end}
              onChange={(e) => setEnd(e.target.value)}
              aria-label="Shift end time"
            />
          </Field>
        </div>

        {/* Working / not working toggle */}
        <div
          role="group"
          aria-label="Are you working tonight?"
          className="mt-2 inline-flex w-fit items-center gap-1 rounded-full bg-sunken p-1 shadow-hairline"
        >
          <ToggleButton
            active={working}
            onClick={() => setWorking(true)}
          >
            Working tonight
          </ToggleButton>
          <ToggleButton
            active={!working}
            onClick={() => setWorking(false)}
          >
            I'm off tonight
          </ToggleButton>
        </div>

        {/* A small, calculated preview — gives the user feedback that the
         *  input is being read. Real apps too often have silent forms. */}
        <ShiftDurationPreview
          start={start}
          end={end}
          working={working}
        />
      </div>
    </StepShell>
  );
}

function ToggleButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-full px-3.5 py-1.5 text-caption font-medium transition-all duration-fast",
        active
          ? "bg-canvas text-ink shadow-[inset_0_0_0_1px_hsl(var(--divider)),0_1px_2px_hsl(var(--ink)/0.06)]"
          : "text-ink-muted hover:text-ink"
      )}
    >
      {children}
    </button>
  );
}

function ShiftDurationPreview({
  start,
  end,
  working,
}: {
  start: string;
  end: string;
  working: boolean;
}) {
  const duration = diffHours(start, end);
  const hours = Math.floor(duration);
  const minutes = Math.round((duration - hours) * 60);

  return (
    <div className="mt-2 rounded-xl bg-canvas-soft p-4 shadow-hairline">
      <p className="text-caption text-ink-faint">
        {working ? "Drift will plan around" : "We'll factor in"} a{" "}
        <span className="font-mono tabular-nums font-medium text-ink">
          {hours}h {String(minutes).padStart(2, "0")}m
        </span>{" "}
        shift from{" "}
        <span className="font-mono tabular-nums text-ink">{start}</span> to{" "}
        <span className="font-mono tabular-nums text-ink">{end}</span>.
      </p>
    </div>
  );
}

/** Computes hours between two HH:MM strings, accounting for overnight wrap. */
function diffHours(a: string, b: string) {
  const [ah, am] = a.split(":").map(Number);
  const [bh, bm] = b.split(":").map(Number);
  let diff = bh + bm / 60 - (ah + am / 60);
  if (diff <= 0) diff += 24;
  return diff;
}
