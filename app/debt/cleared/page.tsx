"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * /debt/cleared — success state.
 *
 * The long-arc celebration. Quieter than onboarding's "done" because Maya has
 * been working at this for weeks, not seconds. A line drawing of a chart
 * reaching zero, a calm headline, and a single CTA to set a new baseline.
 *
 * No confetti. The line reaching zero is the celebration.
 */
export default function DebtClearedPage() {
  return (
    <div className="container py-8 md:py-12">
      <Button asChild variant="ghost" size="sm" className="-ml-3">
        <Link href="/debt">
          <ArrowLeft className="size-4" aria-hidden />
          Back to debt
        </Link>
      </Button>

      <div className="mx-auto mt-10 flex max-w-2xl flex-col items-center gap-10 text-center md:mt-16">
        <ClearingChart />

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.7 }}
          className="flex flex-col gap-3"
        >
          <p className="eyebrow text-accent-700">Debt cleared · Sat 17 May</p>
          <h1
            className="font-medium tracking-tighter text-ink"
            style={{
              fontSize: "clamp(2rem, 4vw + 0.5rem, 2.75rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.026em",
            }}
          >
            You're back to{" "}
            <span className="font-mono tabular-nums">0h 00m</span>.
          </h1>
          <p className="mx-auto max-w-prose text-body-lg text-ink-muted">
            Six days ahead of the default plan. The anchor-and-nap pattern is
            doing what it's supposed to — Drift will keep it as your baseline
            unless your roster says otherwise.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.9 }}
          className="flex flex-col items-center gap-3"
        >
          <Button asChild size="lg">
            <Link href="/dashboard">
              Back to today
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </Button>
          <Link
            href="#"
            className="text-body-sm font-medium text-ink-muted transition-colors hover:text-ink"
          >
            Save this plan as my new baseline
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="mt-4 grid w-full gap-px overflow-hidden rounded-2xl bg-divider sm:grid-cols-3"
        >
          <Stat label="Time recovered" value="+5h 12m" />
          <Stat label="Days to clear" value="9" />
          <Stat label="Quality avg" value="78" />
        </motion.div>
      </div>

      <div className="h-16 md:h-20" />
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-paper p-5 text-left md:p-6">
      <p className="text-caption font-medium uppercase tracking-wider text-ink-faint">
        {label}
      </p>
      <p className="mt-1 font-mono text-[22px] font-medium tabular-nums tracking-tight text-ink">
        {value}
      </p>
    </div>
  );
}

/**
 * ClearingChart — a 2-second SVG animation of the debt line reaching zero.
 * Uses Framer Motion's path drawing via `pathLength` so the curve draws on
 * mount, then a terminal dot pulses softly once it lands.
 */
function ClearingChart() {
  const w = 480;
  const h = 140;
  // Smooth curve from -5h to 0 over ~9 days. Y values in pixels (top=0).
  const points = [
    [0, 110],
    [40, 102],
    [90, 96],
    [140, 84],
    [200, 64],
    [260, 44],
    [320, 24],
    [380, 8],
    [440, 0],
    [480, 0],
  ] as const;
  const d =
    "M" + points.map(([x, y]) => `${x},${y}`).join(" L");

  return (
    <div className="relative w-full">
      <svg viewBox={`0 0 ${w} ${h + 16}`} className="w-full" aria-hidden>
        <defs>
          <linearGradient id="clearFill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="hsl(var(--accent-500))" stopOpacity="0.18" />
            <stop offset="100%" stopColor="hsl(var(--accent-500))" stopOpacity="0" />
          </linearGradient>
        </defs>

        <line
          x1="0"
          y1="0.5"
          x2={w}
          y2="0.5"
          stroke="hsl(var(--divider))"
          strokeWidth="1"
          strokeDasharray="2 4"
        />

        <motion.path
          d={d + ` L${w},${h} L0,${h} Z`}
          fill="url(#clearFill)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.6 }}
        />

        <motion.path
          d={d}
          fill="none"
          stroke="hsl(var(--accent-500))"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.8, ease: [0.65, 0, 0.35, 1], delay: 0.3 }}
        />

        {/* Terminal pulse */}
        <motion.circle
          cx={points[points.length - 1][0]}
          cy={points[points.length - 1][1]}
          r="6"
          fill="hsl(var(--accent-500))"
          stroke="hsl(var(--paper))"
          strokeWidth="3"
          initial={{ opacity: 0, scale: 0.4 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease, delay: 2 }}
        />
        <motion.circle
          cx={points[points.length - 1][0]}
          cy={points[points.length - 1][1]}
          r="14"
          fill="none"
          stroke="hsl(var(--accent-500))"
          strokeWidth="1.5"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: [0, 0.7, 0], scale: [0.6, 1.6, 2] }}
          transition={{ duration: 1.8, ease: "easeOut", delay: 2 }}
        />

        {/* "0h" label near terminal */}
        <motion.text
          x={points[points.length - 1][0] - 6}
          y={points[points.length - 1][1] - 14}
          textAnchor="end"
          fontSize="11"
          fontFamily="ui-monospace"
          fill="hsl(var(--accent-700))"
          fontWeight={600}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 2.3 }}
        >
          0h 00m
        </motion.text>
      </svg>
    </div>
  );
}
