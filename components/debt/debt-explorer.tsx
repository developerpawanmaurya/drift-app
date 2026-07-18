"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

/**
 * DebtExplorer — the page's centerpiece.
 *
 * Combines an extended history chart (last 30 days) with a forward projection
 * (next 14 days) that responds in real time to the "extra recovery hours"
 * slider. Sliding the input redraws the projection and updates the
 * "cleared by" date — that's the delightful detail for this feature.
 *
 * Math note: this is intentionally hand-tuned for the demo. A real product
 * would project from a per-user model; the shape here is just plausible.
 */
const HISTORY: number[] = [
  -0.5, -0.8, -1.0, -1.3, -1.6, -1.8, -2.1, -2.4, -2.7, -2.9,
  -3.2, -3.0, -2.8, -3.1, -3.4, -3.6, -3.5, -3.9, -4.1, -4.4,
  -4.6, -5.2, -4.1, -3.6, -3.9, -3.2, -2.4, -2.6, -2.7, -2.4,
];

const HISTORY_DAY_LABELS = [
  "30d ago",
  "21d",
  "14d",
  "7d",
  "Today",
];

export function DebtExplorer() {
  const [extra, setExtra] = useState(0); // hours added across this week

  // Projection — 14 days forward. Base recovery rate is ~0.22h/day at the
  // current pattern. Extra hours accelerate it linearly across the first 7
  // days, then taper.
  const projection = useMemo(() => {
    const today = HISTORY[HISTORY.length - 1];
    const baseRecovery = 0.22;
    const perDayBoost = extra / 7;
    const out: number[] = [];
    let v = today;
    for (let i = 1; i <= 14; i++) {
      const boost = i <= 7 ? perDayBoost : 0;
      v = v + baseRecovery + boost;
      if (v > 0) v = 0; // can't go positive — debt floors at zero
      out.push(v);
    }
    return out;
  }, [extra]);

  const clearedAtIndex = projection.findIndex((v) => v >= -0.05);
  const clearedDate = clearedAtIndex >= 0
    ? formatForwardDate(clearedAtIndex + 1)
    : "13+ days";

  return (
    <div className="flex flex-col gap-8">
      <Chart history={HISTORY} projection={projection} />

      <div className="rounded-2xl bg-canvas p-6 shadow-[inset_0_0_0_1px_hsl(var(--divider)),0_1px_2px_hsl(var(--ink)/0.04)] md:p-8">
        <p className="text-caption font-medium uppercase tracking-wider text-ink-faint">
          What if I added recovery this week
        </p>

        <div className="mt-5 grid items-end gap-8 md:grid-cols-[1.4fr_1fr]">
          {/* Slider */}
          <div className="flex flex-col gap-4">
            <div className="flex items-baseline justify-between">
              <div className="flex items-baseline gap-1">
                <span className="font-mono text-[32px] font-medium tabular-nums leading-none tracking-tight text-ink">
                  +{Math.floor(extra)}
                </span>
                <span className="font-mono text-body text-ink-faint">h</span>
                <span className="ml-1 font-mono text-[32px] font-medium tabular-nums leading-none tracking-tight text-ink">
                  {String(Math.round((extra % 1) * 60)).padStart(2, "0")}
                </span>
                <span className="font-mono text-body text-ink-faint">m</span>
              </div>
              <p className="text-caption text-ink-faint">across this week</p>
            </div>

            <input
              type="range"
              min="0"
              max="6"
              step="0.25"
              value={extra}
              onChange={(e) => setExtra(parseFloat(e.target.value))}
              aria-label="Extra recovery hours this week"
              style={{
                background: `linear-gradient(to right, hsl(var(--accent-500)) 0%, hsl(var(--accent-500)) ${(extra / 6) * 100}%, hsl(var(--sunken)) ${(extra / 6) * 100}%, hsl(var(--sunken)) 100%)`,
              }}
              className={[
                "h-2 w-full cursor-pointer appearance-none rounded-full",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500/60 focus-visible:ring-offset-4 focus-visible:ring-offset-paper",
                "[&::-webkit-slider-thumb]:appearance-none",
                "[&::-webkit-slider-thumb]:size-5 [&::-webkit-slider-thumb]:rounded-full",
                "[&::-webkit-slider-thumb]:bg-canvas [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-accent-500",
                "[&::-webkit-slider-thumb]:shadow-[0_2px_6px_-2px_hsl(var(--ink)/0.18)]",
                "[&::-moz-range-thumb]:size-5 [&::-moz-range-thumb]:rounded-full",
                "[&::-moz-range-thumb]:bg-canvas [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-accent-500",
                "[&::-moz-range-track]:h-2 [&::-moz-range-track]:rounded-full [&::-moz-range-track]:bg-transparent",
              ].join(" ")}
            />

            <div className="flex justify-between font-mono text-caption tabular-nums text-ink-faint">
              <span>0h</span>
              <span>3h</span>
              <span>6h</span>
            </div>
          </div>

          {/* Live readout */}
          <div className="rounded-xl bg-canvas-soft p-5 shadow-hairline">
            <p className="text-caption font-medium uppercase tracking-wider text-ink-faint">
              You'd be clear by
            </p>
            <motion.p
              key={clearedDate}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-1 font-mono text-[22px] font-medium tabular-nums tracking-tight text-ink"
            >
              {clearedDate}
            </motion.p>
            <p className="mt-3 text-caption leading-relaxed text-ink-muted">
              {extra === 0
                ? "Drift will keep your current pattern. The trend is already clearing."
                : `That's ${shiftDays(clearedAtIndex)} days sooner than your default plan. Drift will spread the extra time across your most recoverable days.`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
function Chart({
  history,
  projection,
}: {
  history: number[];
  projection: number[];
}) {
  const w = 720;
  const h = 200;
  const padding = 16;
  const all = [...history, ...projection];
  const totalLen = all.length - 1;
  const maxAbs = 6;

  const xAt = (i: number) => padding + (i / totalLen) * (w - padding * 2);
  const yAt = (v: number) =>
    padding + (Math.abs(v) / maxAbs) * (h - padding * 2);

  const historyPath =
    "M" +
    history
      .map((v, i) => `${xAt(i).toFixed(1)},${yAt(v).toFixed(1)}`)
      .join(" L");
  const projectionPath =
    "M" +
    [history[history.length - 1], ...projection]
      .map((v, i) =>
        `${xAt(history.length - 1 + i).toFixed(1)},${yAt(v).toFixed(1)}`
      )
      .join(" L");

  const historyFill = `${historyPath} L${xAt(history.length - 1).toFixed(1)},${h - padding} L${padding},${h - padding} Z`;

  const todayX = xAt(history.length - 1);

  return (
    <div className="rounded-2xl bg-canvas p-6 shadow-[inset_0_0_0_1px_hsl(var(--divider)),0_1px_2px_hsl(var(--ink)/0.04)] md:p-8">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-caption font-medium uppercase tracking-wider text-ink-faint">
            Last 30 days · next 14
          </p>
          <p className="mt-2 font-mono text-[14px] tabular-nums text-ink-muted">
            <span className="text-ink">solid</span> = logged ·{" "}
            <span className="text-accent-700">dashed</span> = projected
          </p>
        </div>
      </div>

      <svg
        viewBox={`0 0 ${w} ${h}`}
        className="mt-5 w-full"
        role="img"
        aria-label="Sleep debt over the last 30 days, with projected next 14"
      >
        <defs>
          <linearGradient id="debtFillExt" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="hsl(var(--accent-500))" stopOpacity="0.18" />
            <stop offset="100%" stopColor="hsl(var(--accent-500))" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* baseline */}
        <line
          x1={padding}
          y1={padding}
          x2={w - padding}
          y2={padding}
          stroke="hsl(var(--divider))"
          strokeDasharray="2 4"
          strokeWidth="1"
        />
        <text
          x={padding}
          y={padding - 5}
          fontSize="10"
          fontFamily="ui-monospace"
          fill="hsl(var(--ink-faint))"
        >
          0
        </text>

        {/* History fill + line */}
        <path d={historyFill} fill="url(#debtFillExt)" />
        <path
          d={historyPath}
          fill="none"
          stroke="hsl(var(--accent-500))"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Today divider */}
        <line
          x1={todayX}
          y1={padding}
          x2={todayX}
          y2={h - padding}
          stroke="hsl(var(--ink) / 0.2)"
          strokeWidth="1"
          strokeDasharray="3 3"
        />
        <text
          x={todayX + 4}
          y={h - padding + 12}
          fontSize="10"
          fontFamily="ui-monospace"
          fill="hsl(var(--ink-faint))"
        >
          today
        </text>

        {/* Projection line — dashed */}
        <path
          d={projectionPath}
          fill="none"
          stroke="hsl(var(--accent-500))"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="4 5"
          opacity="0.7"
        />

        {/* terminal dot at today */}
        <circle
          cx={todayX}
          cy={yAt(history[history.length - 1])}
          r="4"
          fill="hsl(var(--accent-500))"
          stroke="hsl(var(--canvas))"
          strokeWidth="2"
        />

        {/* projection terminal dot */}
        <circle
          cx={xAt(history.length - 1 + projection.length)}
          cy={yAt(projection[projection.length - 1])}
          r="3.5"
          fill="hsl(var(--canvas))"
          stroke="hsl(var(--accent-500))"
          strokeWidth="2"
        />
      </svg>

      <div className="mt-2 flex justify-between font-mono text-caption tabular-nums text-ink-faint">
        {HISTORY_DAY_LABELS.map((l) => (
          <span key={l}>{l}</span>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
function formatForwardDate(daysFromNow: number) {
  const today = new Date("2026-05-14T06:14:00Z");
  const d = new Date(today.getTime());
  d.setUTCDate(d.getUTCDate() + daysFromNow);
  const day = d.toLocaleDateString("en-GB", {
    weekday: "short",
    timeZone: "UTC",
  });
  const dn = d.getUTCDate();
  const mon = d.toLocaleDateString("en-GB", {
    month: "short",
    timeZone: "UTC",
  });
  return `${day} ${dn} ${mon}`;
}

function shiftDays(clearedIndex: number) {
  // Default plan clears around day 10. Earlier than that = positive delta.
  const defaultClear = 10;
  if (clearedIndex < 0) return 0;
  const diff = defaultClear - (clearedIndex + 1);
  return diff > 0 ? diff : 0;
}
