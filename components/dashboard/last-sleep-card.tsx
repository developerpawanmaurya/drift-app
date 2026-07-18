import { ArrowRight } from "lucide-react";

import { lastSleep } from "@/lib/data/dashboard";

/**
 * Last sleep card.
 *
 * The closing module — "here's what just happened." A small quality score in
 * mono on the right; the duration and delta on the left; a one-line note
 * below in Maya's voice (not Drift's).
 *
 * Quality scores are deliberately understated — no big circular gauge, no
 * "GOOD!" badge. Just the number, and the question of what it means is left
 * for the note to answer.
 */
export function LastSleepCard() {
  return (
    <section
      aria-labelledby="last-sleep-heading"
      className="rounded-2xl bg-canvas p-6 shadow-[inset_0_0_0_1px_hsl(var(--divider)),0_1px_2px_hsl(var(--ink)/0.04)] md:p-7"
    >
      <div className="flex items-baseline justify-between">
        <h2
          id="last-sleep-heading"
          className="text-caption font-medium uppercase tracking-wider text-ink-faint"
        >
          Last sleep · {lastSleep.prettyDate}
        </h2>
        <span className="font-mono text-caption tabular-nums text-ink-faint">
          {lastSleep.start} {"→"} {lastSleep.end}
        </span>
      </div>

      <div className="mt-4 flex items-baseline justify-between gap-4">
        <div>
          <p className="font-mono text-[28px] font-medium tabular-nums leading-none tracking-tight text-ink md:text-[32px]">
            {lastSleep.durationLabel}
          </p>
          <p className="mt-2 text-caption text-ink-muted">
            Planned{" "}
            <span className="font-mono tabular-nums text-ink">
              {lastSleep.planned}
            </span>
            <span className="mx-1.5 text-ink-faint" aria-hidden>·</span>
            <span className="font-mono tabular-nums text-warning">
              {lastSleep.delta}
            </span>
          </p>
        </div>

        <QualityRing score={lastSleep.qualityScore} />
      </div>

      {/* Planned vs actual bar */}
      <div className="mt-5">
        <p className="mb-1.5 text-caption text-ink-faint">Actual vs planned</p>
        <div className="relative h-2 w-full overflow-hidden rounded-full bg-sunken">
          <div
            className="absolute inset-y-0 left-0 bg-ink/85"
            style={{ width: `${(394 / 420) * 100}%` }}
            aria-hidden
          />
          <div
            className="absolute inset-y-0 w-px bg-accent-500"
            style={{ left: "100%", transform: "translateX(-1px)" }}
            aria-label="Planned"
          />
        </div>
      </div>

      <p className="mt-5 text-body-sm leading-relaxed text-ink-muted">
        {lastSleep.note}
      </p>

      <a
        href="#"
        className="mt-5 inline-flex items-center gap-1.5 text-body-sm font-medium text-ink-muted transition-colors hover:text-ink"
      >
        See last 14 sleeps
        <ArrowRight className="size-3.5" aria-hidden />
      </a>
    </section>
  );
}

/**
 * QualityRing — small circular score. SVG donut, accent stroke arc.
 * Calibrated for restraint: thin stroke, mono number inside, no celebratory
 * color shift.
 */
function QualityRing({ score }: { score: number }) {
  const r = 26;
  const c = 2 * Math.PI * r;
  const offset = c - (score / 100) * c;
  return (
    <div className="relative">
      <svg width="64" height="64" viewBox="0 0 64 64" aria-hidden>
        <circle
          cx="32"
          cy="32"
          r={r}
          fill="none"
          stroke="hsl(var(--sunken))"
          strokeWidth="4"
        />
        <circle
          cx="32"
          cy="32"
          r={r}
          fill="none"
          stroke="hsl(var(--accent-500))"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          transform="rotate(-90 32 32)"
        />
      </svg>
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-mono text-[15px] font-medium tabular-nums leading-none text-ink">
          {score}
        </span>
        <span className="mt-0.5 text-[9px] uppercase tracking-wider text-ink-faint">
          quality
        </span>
      </div>
      <span className="sr-only">Sleep quality {score} out of 100</span>
    </div>
  );
}
