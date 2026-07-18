import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { EmptyModule } from "@/components/dashboard/empty-module";
import { user } from "@/lib/data/dashboard";

/**
 * /dashboard/empty — first-open state for a new user.
 *
 * Same grid as /dashboard. Each module replaced with a deliberate empty
 * variant that points at the single next action to take, never "no data yet."
 *
 * Tone: warm, not apologetic. "Once your roster is in, this is where X
 * lives" — orienting, never blaming.
 */
export default function EmptyDashboard() {
  return (
    <div className="container py-8 md:py-12">
      {/* Greeting — empty variant */}
      <div className="flex flex-col gap-2">
        <p className="font-mono text-caption tabular-nums tracking-wide text-ink-faint">
          06:14 · First open · Setup in progress
        </p>
        <h1
          className="font-medium tracking-tighter text-ink"
          style={{
            fontSize: "clamp(1.875rem, 3.6vw + 0.5rem, 2.5rem)",
            lineHeight: 1.06,
            letterSpacing: "-0.024em",
          }}
        >
          Welcome to Drift, {user.firstName}.
        </h1>
        <p className="max-w-prose text-body-lg text-ink-muted">
          One shift on the calendar is all we need to build your first plan.
          Once you've done that, this screen knows where you are in the rotation.
        </p>
      </div>

      {/* Hero empty — the one big setup CTA */}
      <div className="mt-8 md:mt-10">
        <EmptyModule
          size="lg"
          label="Tonight's plan"
          heading="Tell us about your next shift."
          body="We need one start time and end time. Drift builds the rest — bedtime, wind-down, ritual cues, sleep-debt math — backward from that. Twenty seconds, give or take."
          illustration={<HeroEmptyIllustration />}
          action={{ href: "/onboarding/next-shift", label: "Add my next shift" }}
        >
          {/* Two quiet alt-paths */}
          <div className="flex flex-wrap gap-2 pt-1">
            <Button asChild variant="ghost" size="sm">
              <a href="/onboarding/roster">
                Or connect a roster
                <ArrowRight className="size-3.5" aria-hidden />
              </a>
            </Button>
            <Button asChild variant="ghost" size="sm">
              <a href="#">
                Import from a photo
                <ArrowRight className="size-3.5" aria-hidden />
              </a>
            </Button>
          </div>
        </EmptyModule>
      </div>

      {/* The 3-up empty grid */}
      <div className="mt-6 grid gap-6 md:mt-8 lg:grid-cols-3">
        <EmptyModule
          label="Sleep debt"
          heading="Track for a few days."
          body="Drift learns your debt math from how you actually sleep, not from a population average. Log three or four nights and the line draws itself."
          illustration={<DebtEmptyIllustration />}
        />

        <EmptyModule
          label="This week"
          heading="Your roster will live here."
          body="Add a source once and Drift keeps it up to date — through schedule swaps, on-call pulls, and the strange in-between days."
          illustration={<WeekEmptyIllustration />}
          action={{ href: "/onboarding/roster", label: "Add a roster source" }}
        />

        <EmptyModule
          label="Last sleep"
          heading="Log your first sleep."
          body="One tap when you wake up. Drift figures out the duration, your debt math, and tomorrow's plan from there."
          illustration={<SleepEmptyIllustration />}
          action={{ href: "#", label: "Log a sleep" }}
        />
      </div>

      <div className="h-16 md:h-20" />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Empty illustrations — single-stroke, accent-500, sized to their container. */
/* -------------------------------------------------------------------------- */

function HeroEmptyIllustration() {
  return (
    <div className="relative flex h-32 items-center justify-center overflow-hidden rounded-xl bg-canvas-soft md:h-40">
      <svg
        viewBox="0 0 480 100"
        className="absolute inset-0 h-full w-full"
        aria-hidden
      >
        {/* Dashed empty timeline, ghosting the populated state */}
        <line
          x1="20"
          y1="50"
          x2="460"
          y2="50"
          stroke="hsl(var(--divider))"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray="2 8"
        />
        {/* A small accent marker waiting for the first shift */}
        <circle
          cx="20"
          cy="50"
          r="6"
          fill="hsl(var(--accent-500))"
        />
        <text
          x="20"
          y="78"
          fontSize="10"
          fontFamily="ui-monospace"
          fill="hsl(var(--ink-faint))"
        >
          now
        </text>
        <text
          x="460"
          y="78"
          fontSize="10"
          textAnchor="end"
          fontFamily="ui-monospace"
          fill="hsl(var(--ink-faint))"
        >
          +24h
        </text>
      </svg>
    </div>
  );
}

function DebtEmptyIllustration() {
  return (
    <div className="relative flex h-20 items-center justify-center overflow-hidden rounded-xl bg-canvas-soft">
      <svg viewBox="0 0 320 64" className="absolute inset-0 h-full w-full" aria-hidden>
        <line
          x1="0"
          y1="32"
          x2="320"
          y2="32"
          stroke="hsl(var(--divider))"
          strokeWidth="1"
          strokeDasharray="2 4"
        />
        {/* Five small dots suggesting "we'll plot once data arrives" */}
        {[40, 100, 160, 220, 280].map((x) => (
          <circle
            key={x}
            cx={x}
            cy="32"
            r="3"
            fill="hsl(var(--divider))"
          />
        ))}
      </svg>
    </div>
  );
}

function WeekEmptyIllustration() {
  return (
    <ul className="grid grid-cols-7 gap-1.5">
      {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
        <li
          key={i}
          className="flex aspect-square flex-col items-center justify-center rounded-lg bg-canvas-soft shadow-hairline"
        >
          <span className="text-[10px] font-medium uppercase tracking-wider text-ink-faint">
            {d}
          </span>
          <span
            className="mt-1 size-1 rounded-full bg-divider"
            aria-hidden
          />
        </li>
      ))}
    </ul>
  );
}

function SleepEmptyIllustration() {
  return (
    <div className="rounded-xl bg-canvas-soft p-4 shadow-hairline">
      <p className="font-mono text-[28px] font-medium tabular-nums leading-none tracking-tight text-ink-disabled">
        —h —m
      </p>
      <p className="mt-2 font-mono text-caption tabular-nums text-ink-faint">
        —:— → —:—
      </p>
    </div>
  );
}
