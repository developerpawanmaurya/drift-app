"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Camera,
  Check,
  CircleAlert,
  RefreshCcw,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { detectedShifts } from "@/lib/data/roster";
import { cn } from "@/lib/utils";

/**
 * /roster/import — the photo-import experience.
 *
 * This is the page's *delightful detail*: shifts are "detected" off a
 * photographed schedule one by one, in real time. The animation is fully
 * scripted — no actual OCR — but it tells the user what Drift would do with
 * a real photo, and it shows the design system handling motion well.
 *
 * Pacing: 1.2s "warming up", then a 200ms cadence per detected row. We add
 * a longer beat between high-confidence rows and the low-confidence row to
 * draw attention to the one Maya should double-check.
 */
export default function RosterImportPage() {
  const [phase, setPhase] = useState<"scanning" | "done">("scanning");
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    // Initial pause so the "scanning" state is visible before items pop in
    timers.push(setTimeout(() => setVisibleCount(1), 1200));
    [2, 3, 4, 5].forEach((n, i) => {
      // Longer pause before the low-confidence detection (index 3 → 4th shift)
      const extra = n === 4 ? 220 : 0;
      timers.push(
        setTimeout(() => setVisibleCount(n), 1200 + (i + 1) * 700 + extra)
      );
    });
    timers.push(setTimeout(() => setPhase("done"), 1200 + 5 * 700 + 600));
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="container py-8 md:py-12">
      <Button asChild variant="ghost" size="sm" className="-ml-3">
        <Link href="/roster">
          <ArrowLeft className="size-4" aria-hidden />
          Back to roster
        </Link>
      </Button>

      <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-12">
        {/* Left — photo + scan overlay */}
        <div>
          <p className="font-mono text-caption tabular-nums tracking-wide text-ink-faint">
            Import · photo
          </p>
          <h1
            className="mt-2 font-medium tracking-tighter text-ink"
            style={{
              fontSize: "clamp(1.625rem, 3vw + 0.5rem, 2rem)",
              lineHeight: 1.08,
              letterSpacing: "-0.022em",
            }}
          >
            {phase === "scanning"
              ? "Reading your schedule…"
              : "Five shifts found."}
          </h1>
          <p className="mt-3 max-w-prose text-body-lg text-ink-muted">
            {phase === "scanning"
              ? "Drift is finding shift rows, dates, and times. We'll flag anything we're unsure about so you can double-check."
              : "Look these over. The one with the orange dot wants a second pair of eyes — the photo was a little fuzzy across that row."}
          </p>

          <div className="mt-8">
            <SchedulePhoto phase={phase} count={visibleCount} />
          </div>
        </div>

        {/* Right — detected shift list */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <p className="text-caption font-medium uppercase tracking-wider text-ink-faint">
              {phase === "scanning" ? "Detecting" : "Detected"}
            </p>
            <span
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-caption font-medium",
                phase === "scanning"
                  ? "bg-sunken text-ink-muted"
                  : "bg-accent-100 text-accent-700"
              )}
            >
              {phase === "scanning" ? (
                <>
                  <motion.span
                    animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
                    transition={{ duration: 1.4, repeat: Infinity }}
                    className="size-1.5 rounded-full bg-accent-500"
                    aria-hidden
                  />
                  scanning
                </>
              ) : (
                <>
                  <Sparkles className="size-3" aria-hidden />
                  ready
                </>
              )}
            </span>
          </div>

          <ul className="flex flex-col gap-2">
            <AnimatePresence initial={false}>
              {detectedShifts.slice(0, visibleCount).map((s, i) => (
                <motion.li
                  key={s.id}
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    duration: 0.45,
                    ease: [0.16, 1, 0.3, 1],
                    delay: i === visibleCount - 1 ? 0 : 0,
                  }}
                  className={cn(
                    "flex items-center gap-4 rounded-xl bg-canvas p-4 shadow-[inset_0_0_0_1px_hsl(var(--divider)),0_1px_2px_hsl(var(--ink)/0.04)]",
                    s.confidence < 0.85 &&
                      "shadow-[inset_0_0_0_1.5px_hsl(var(--warning)/0.45),0_1px_2px_hsl(var(--ink)/0.04)]"
                  )}
                >
                  <div className="flex flex-col">
                    <span className="text-caption font-medium uppercase tracking-wider text-ink-faint">
                      {s.prettyDate.split(" ")[0]}
                    </span>
                    <span className="font-mono text-[20px] font-medium tabular-nums leading-tight tracking-tight text-ink">
                      {s.prettyDate.split(" ").slice(1).join(" ")}
                    </span>
                  </div>

                  <span aria-hidden className="h-8 w-px bg-divider" />

                  <div className="min-w-0 flex-1">
                    <p className="font-mono text-[15px] font-medium tabular-nums tracking-tight text-ink">
                      {s.start} → {s.end}
                    </p>
                    <p className="text-caption text-ink-faint">
                      {s.durationLabel} shift
                    </p>
                  </div>

                  <ConfidenceTag confidence={s.confidence} />
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>

          {phase === "done" ? (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="mt-2 flex flex-wrap items-center gap-2"
            >
              <Button asChild size="md">
                <Link href="/roster">
                  Add 5 shifts to roster
                </Link>
              </Button>
              <Button variant="ghost" size="md">
                <RefreshCcw className="size-4" aria-hidden />
                Re-scan
              </Button>
            </motion.div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
function ConfidenceTag({ confidence }: { confidence: number }) {
  const high = confidence >= 0.85;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-caption font-medium",
        high ? "bg-accent-50 text-accent-700" : "bg-sunken text-warning"
      )}
      title={`${Math.round(confidence * 100)}% confidence`}
    >
      {high ? (
        <Check className="size-3" strokeWidth={3} aria-hidden />
      ) : (
        <CircleAlert className="size-3" aria-hidden />
      )}
      <span className="font-mono tabular-nums">
        {Math.round(confidence * 100)}%
      </span>
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/**
 * A stylized photo of a printed nurse roster, drawn in SVG so it's editorial
 * and on-brand rather than a stock image. Highlight boxes appear over rows
 * as they're "detected."
 */
function SchedulePhoto({
  phase,
  count,
}: {
  phase: "scanning" | "done";
  count: number;
}) {
  const rows = [
    { date: "Mon 19", times: "22:00 – 06:00" },
    { date: "Tue 20", times: "22:00 – 06:00" },
    { date: "Wed 21", times: "—" },
    { date: "Thu 22", times: "14:00 – 22:00" },
    { date: "Fri 23", times: "14:00 – 22:00" },
    { date: "Sat 24", times: "—" },
    { date: "Sun 25", times: "06:00 – 14:00" },
  ];
  // Map "detected" rows back onto the schedule rows for the highlight overlay
  const detectedRowIndexes = [0, 1, 3, 4, 6];

  return (
    <div
      className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-canvas-soft shadow-[inset_0_0_0_1px_hsl(var(--divider)),0_18px_44px_-20px_hsl(var(--ink)/0.18)]"
      role="img"
      aria-label="Photo of a printed roster, being scanned"
    >
      {/* paper grain */}
      <div className="absolute inset-0 bg-grain opacity-60" aria-hidden />

      {/* schedule sheet */}
      <div className="absolute inset-6 rounded-md bg-canvas p-5 shadow-[inset_0_0_0_1px_hsl(var(--divider))]">
        <p className="text-caption font-medium uppercase tracking-wider text-ink-faint">
          ICU · Week 21
        </p>
        <p className="mt-0.5 text-h4 font-medium tracking-tight text-ink">
          M. Trezona — Charge
        </p>
        <ul className="mt-4 divide-y divide-divider">
          {rows.map((r, i) => (
            <li
              key={r.date}
              className="flex items-center justify-between py-1.5 text-body-sm"
            >
              <span className="font-mono tabular-nums text-ink-muted">
                {r.date}
              </span>
              <span className="font-mono tabular-nums text-ink">
                {r.times}
              </span>
            </li>
          ))}
        </ul>

        {/* Detection highlight overlays — boxes appear over the detected rows */}
        <div className="pointer-events-none absolute inset-0 p-5">
          <div className="mt-[68px] divide-y divide-transparent">
            {rows.map((_, i) => {
              const dIdx = detectedRowIndexes.indexOf(i);
              const isVisible = dIdx !== -1 && dIdx < count;
              return (
                <div
                  key={i}
                  className="relative h-[26px]"
                  aria-hidden
                >
                  <AnimatePresence>
                    {isVisible ? (
                      <motion.div
                        initial={{ opacity: 0, scaleX: 0.6 }}
                        animate={{ opacity: 1, scaleX: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute inset-x-[-6px] inset-y-[2px] origin-left rounded-md bg-accent-500/12 ring-1 ring-accent-500/40"
                      />
                    ) : null}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Camera shutter affordance, top-right — reinforces "this was a photo" */}
      <div className="absolute right-3 top-3 flex size-9 items-center justify-center rounded-full bg-ink/8 text-ink-faint">
        <Camera className="size-4" aria-hidden />
      </div>

      {/* Scan line — only while scanning */}
      {phase === "scanning" ? (
        <motion.div
          initial={{ y: "-10%", opacity: 0.6 }}
          animate={{ y: "110%", opacity: [0.6, 0.8, 0.6] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute inset-x-0 h-[2px] bg-accent-500/50 shadow-[0_0_14px_2px_hsl(var(--accent-500)/0.35)]"
          aria-hidden
        />
      ) : null}
    </div>
  );
}
