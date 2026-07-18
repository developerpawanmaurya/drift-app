import Link from "next/link";
import { ArrowDown, Bookmark } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DebtExplorer } from "@/components/debt/debt-explorer";

/**
 * /debt — main debt explorer.
 *
 * The page does three things in order:
 *   1. Names the current debt, in real-money terms (mono number, big).
 *   2. Shows the long arc — last 30 days, next 14 projected.
 *   3. Lets Maya play with "what if I added X more hours" via the slider.
 *
 * The "delightful detail" is the slider: moving it redraws the projection
 * and updates the cleared-by date in real time.
 */
export default function DebtPage() {
  return (
    <div className="container py-8 md:py-12">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-caption tabular-nums tracking-wide text-ink-faint">
            Sleep debt · Wed 14 May
          </p>
          <h1
            className="mt-2 font-medium tracking-tighter text-ink"
            style={{
              fontSize: "clamp(1.875rem, 3.6vw + 0.5rem, 2.5rem)",
              lineHeight: 1.06,
              letterSpacing: "-0.024em",
            }}
          >
            You're owed{" "}
            <span className="font-mono tabular-nums text-accent-700">
              2h 24m
            </span>
            .
          </h1>
          <p className="mt-2 max-w-prose text-body-lg text-ink-muted">
            The current trend has you clear by Saturday. Below: see what
            changes if you add more sleep this week.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-100 px-3 py-1.5 text-caption font-medium text-accent-700">
            <ArrowDown className="size-3" strokeWidth={2.5} aria-hidden />
            clearing
          </span>
          <Button asChild variant="outline" size="sm">
            <Link href="/debt/cleared">
              <Bookmark className="size-4" aria-hidden />
              Preview cleared state
            </Link>
          </Button>
        </div>
      </header>

      <div className="mt-10">
        <DebtExplorer />
      </div>

      {/* Insights row — three small editorial findings */}
      <section
        aria-label="Patterns we noticed"
        className="mt-12 grid gap-px overflow-hidden rounded-2xl bg-divider md:grid-cols-3"
      >
        <Insight
          label="Highest debt"
          value="After 4-night blocks"
          body="Your debt peaks two days after a 4-night block — usually 4 to 6 hours."
        />
        <Insight
          label="Fastest recovery"
          value="Anchor + nap"
          body="Splitting your sleep clears debt 1.6 days faster than a single 8h block on this roster."
        />
        <Insight
          label="Weakest link"
          value="Skipped naps"
          body="On days you skip the pre-shift nap, the next night's anchor sleep loses 38m on average."
        />
      </section>

      <div className="h-16 md:h-20" />
    </div>
  );
}

function Insight({
  label,
  value,
  body,
}: {
  label: string;
  value: string;
  body: string;
}) {
  return (
    <div className="bg-paper p-6 md:p-7">
      <p className="text-caption font-medium uppercase tracking-wider text-ink-faint">
        {label}
      </p>
      <p className="mt-2 text-h3 font-medium tracking-tight text-ink">
        {value}
      </p>
      <p className="mt-2 text-body-sm leading-relaxed text-ink-muted">
        {body}
      </p>
    </div>
  );
}
