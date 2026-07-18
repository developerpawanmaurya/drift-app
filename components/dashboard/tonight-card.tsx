"use client";

import { motion } from "framer-motion";
import { ArrowRight, MoreHorizontal, Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";
import { tonight } from "@/lib/data/dashboard";

/**
 * Tonight card — the dashboard hero.
 *
 * Two-column on md+, stacks on mobile. Left column: the big time block + the
 * reasoning. Right column: the 24h timeline strip with labelled segments and
 * hour markers. The "breath" loop animation on the accent dot is the only
 * decorative motion on the screen — restraint earns it.
 */
export function TonightCard() {
  return (
    <section
      aria-labelledby="tonight-heading"
      className="relative overflow-hidden rounded-2xl bg-canvas p-6 shadow-[inset_0_0_0_1px_hsl(var(--divider)),0_8px_24px_-16px_hsl(var(--ink)/0.08)] md:p-8"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-2">
          <motion.span
            animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
            transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
            className="size-2 rounded-full bg-accent-500"
            aria-hidden
          />
          <h2
            id="tonight-heading"
            className="text-caption font-medium uppercase tracking-wider text-ink-faint"
          >
            Tonight's plan · {tonight.patternLabel}
          </h2>
        </div>
        <Button variant="ghost" size="sm" aria-label="Tonight options">
          <MoreHorizontal className="size-4" aria-hidden />
        </Button>
      </div>

      <div className="mt-6 grid gap-8 md:grid-cols-[1.05fr_1.2fr] md:gap-12">
        {/* Left — the numbers + the why */}
        <div>
          <div className="flex items-baseline gap-3 font-mono tabular-nums">
            <span className="text-[44px] font-medium tracking-tight text-ink md:text-[56px]">
              {tonight.anchorStart}
            </span>
            <ArrowRight
              className="size-5 text-ink-faint md:size-6"
              aria-hidden
            />
            <span className="text-[44px] font-medium tracking-tight text-ink md:text-[56px]">
              {tonight.anchorEnd}
            </span>
          </div>

          <p className="mt-2 text-body-sm text-ink-faint">
            Anchor sleep · then nap{" "}
            <span className="font-mono tabular-nums text-ink">
              {tonight.napStart}–{tonight.napEnd}
            </span>{" "}
            before clock-in at{" "}
            <span className="font-mono tabular-nums text-ink">
              {tonight.shiftAt}
            </span>
            .
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            <span className="rounded-full bg-accent-50 px-2.5 py-1 text-caption font-medium text-accent-700">
              {tonight.totalLabel}
            </span>
            <span className="rounded-full bg-sunken px-2.5 py-1 text-caption text-ink-muted">
              wind-down {tonight.windDownAt}
            </span>
            <span className="rounded-full bg-sunken px-2.5 py-1 text-caption text-ink-muted">
              room 18.5°C
            </span>
          </div>

          <p className="mt-6 max-w-prose text-body-sm leading-relaxed text-ink-muted">
            {tonight.reasoning}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            <Button variant="outline" size="sm">
              <Pencil className="size-3.5" aria-hidden />
              Edit this plan
            </Button>
            <Button variant="ghost" size="sm">Swap to single block</Button>
          </div>
        </div>

        {/* Right — the 24h timeline */}
        <Timeline24 />
      </div>
    </section>
  );
}

/**
 * Timeline24 — labelled 24-hour strip starting at 06:00.
 *
 * Segments are absolutely positioned on a flex track to keep the math
 * readable inline. Hour labels live below in mono caption.
 */
function Timeline24() {
  // Segments expressed in hour positions from 06:00 start.
  // 06:00–09:30 awake, 09:30–16:30 anchor (7h), 16:30–19:30 awake,
  // 19:30–21:00 nap (1.5h), 21:00–22:00 wind-up, 22:00–06:00 shift (8h)
  const segments = [
    { from: 0, to: 3.5, kind: "awake", label: "Awake" },
    { from: 3.5, to: 10.5, kind: "anchor", label: "Anchor sleep" },
    { from: 10.5, to: 13.5, kind: "awake", label: "Awake" },
    { from: 13.5, to: 15, kind: "nap", label: "Nap" },
    { from: 15, to: 16, kind: "windup", label: "Wind-up" },
    { from: 16, to: 24, kind: "shift", label: "On shift" },
  ] as const;

  const fill = (k: typeof segments[number]["kind"]) =>
    ({
      awake: "bg-sunken",
      anchor: "bg-ink/85",
      nap: "bg-ink/85",
      windup: "bg-accent-200",
      shift: "bg-accent-500",
    }[k]);

  return (
    <div className="flex flex-col gap-3">
      <p className="text-caption text-ink-faint">Next 24 hours</p>

      {/* The strip */}
      <div className="relative h-10 w-full overflow-hidden rounded-full bg-sunken">
        {segments.map((s, i) => (
          <div
            key={i}
            className={`absolute top-0 h-full ${fill(s.kind)}`}
            style={{
              left: `${(s.from / 24) * 100}%`,
              width: `${((s.to - s.from) / 24) * 100}%`,
            }}
            title={s.label}
          />
        ))}
        {/* "Now" marker — a slim warm line at the leftmost edge */}
        <div
          className="absolute top-0 h-full w-px bg-accent-500"
          style={{ left: "0.5%" }}
          aria-hidden
        />
      </div>

      {/* Hour ticks */}
      <div className="flex justify-between font-mono text-[10px] tabular-nums text-ink-faint">
        {["06", "10", "14", "18", "22", "02", "06"].map((h) => (
          <span key={h}>{h}</span>
        ))}
      </div>

      {/* Legend */}
      <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1.5 text-caption text-ink-muted">
        <LegendDot className="bg-ink/85" label="Sleep" />
        <LegendDot className="bg-accent-200" label="Wind-down" />
        <LegendDot className="bg-accent-500" label="On shift" />
        <LegendDot className="bg-sunken border border-divider" label="Awake" />
      </ul>
    </div>
  );
}

function LegendDot({ className, label }: { className: string; label: string }) {
  return (
    <li className="inline-flex items-center gap-1.5">
      <span className={`block size-2 rounded-full ${className}`} aria-hidden />
      <span>{label}</span>
    </li>
  );
}
