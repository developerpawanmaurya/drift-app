import Link from "next/link";
import { Camera, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { WeekTimeline } from "@/components/roster/week-timeline";

/**
 * /roster — happy path. Maya's actual week, day-by-day, with shifts and
 * planned sleep on a single time axis.
 *
 * Toolbar carries two paths to add work to the roster: photo import (the
 * delightful detail on /roster/import) and a plain "Add shift" button.
 */
export default function RosterPage() {
  return (
    <div className="container py-8 md:py-12">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-caption tabular-nums tracking-wide text-ink-faint">
            Week of Mon 12 May · 2026
          </p>
          <h1
            className="mt-2 font-medium tracking-tighter text-ink"
            style={{
              fontSize: "clamp(1.875rem, 3.6vw + 0.5rem, 2.5rem)",
              lineHeight: 1.06,
              letterSpacing: "-0.024em",
            }}
          >
            Your roster.
          </h1>
          <p className="mt-2 max-w-prose text-body-lg text-ink-muted">
            Tap any day to see the shift and re-plan the sleep around it.
            Changes ripple forward into your debt forecast.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button asChild variant="outline" size="sm">
            <Link href="/roster/import">
              <Camera className="size-4" aria-hidden />
              Import from photo
            </Link>
          </Button>
          <Button asChild size="sm">
            <Link href="#">
              <Plus className="size-4" aria-hidden />
              Add shift
            </Link>
          </Button>
        </div>
      </header>

      <div className="mt-10">
        <WeekTimeline />
      </div>

      {/* Quiet "what we're doing for you" line — earns trust */}
      <p className="mx-auto mt-10 max-w-prose text-caption text-ink-faint">
        Drift never shares your roster with your employer or anyone else. You
        can wipe this data at any time from{" "}
        <a
          href="#"
          className="text-ink-muted underline-offset-4 hover:text-ink hover:underline"
        >
          Settings · Data &amp; privacy
        </a>
        .
      </p>

      <div className="h-16 md:h-20" />
    </div>
  );
}
