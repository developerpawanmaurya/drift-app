import { ArrowDown } from "lucide-react";

import { debtSeries } from "@/lib/data/dashboard";

/**
 * Debt card — 14-day sleep-debt trend with a single editorial line.
 *
 * The chart is hand-drawn SVG, not Recharts — at this size the library
 * overhead would dwarf the value, and the data is static. We keep the
 * accent-gradient fill from the landing feature screen so the design system
 * reads consistently.
 */
export function DebtCard() {
  const w = 320;
  const h = 110;
  const maxAbs = 6;
  const data = debtSeries.map((d) => d.hours);
  const step = w / (data.length - 1);

  const points = data.map((v, i) => {
    const x = i * step;
    const y = (Math.abs(v) / maxAbs) * h;
    return [x, y] as const;
  });
  const linePath =
    "M" + points.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" L");
  const fillPath = `${linePath} L${w},${h} L0,${h} Z`;
  const last = data[data.length - 1];

  return (
    <section
      aria-labelledby="debt-heading"
      className="flex flex-col rounded-2xl bg-canvas p-6 shadow-[inset_0_0_0_1px_hsl(var(--divider)),0_1px_2px_hsl(var(--ink)/0.04)] md:p-7"
    >
      <div className="flex items-start justify-between">
        <div>
          <h2
            id="debt-heading"
            className="text-caption font-medium uppercase tracking-wider text-ink-faint"
          >
            Sleep debt · 14 days
          </h2>
          <p className="mt-2 font-mono text-[28px] font-medium tabular-nums leading-none tracking-tight text-ink md:text-[32px]">
            {formatDebt(last)}
          </p>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-accent-100 px-2.5 py-1 text-caption font-medium text-accent-700">
          <ArrowDown className="size-3" strokeWidth={2.5} aria-hidden />
          clearing
        </span>
      </div>

      <svg
        viewBox={`0 0 ${w} ${h + 4}`}
        className="mt-4 w-full"
        role="img"
        aria-label="14-day sleep debt trend, clearing from -5.2h to -2.4h"
      >
        <defs>
          <linearGradient id="dashDebtFill" x1="0" x2="0" y1="0" y2="1">
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
          strokeDasharray="2 3"
        />
        <path d={fillPath} fill="url(#dashDebtFill)" />
        <path
          d={linePath}
          fill="none"
          stroke="hsl(var(--accent-500))"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle
          cx={points[points.length - 1][0]}
          cy={points[points.length - 1][1]}
          r="4"
          fill="hsl(var(--accent-500))"
          stroke="hsl(var(--canvas))"
          strokeWidth="2"
        />
      </svg>

      <p className="mt-4 text-body-sm leading-relaxed text-ink-muted">
        You'll be clear by{" "}
        <span className="font-medium text-ink">Saturday</span> if you keep the
        anchor-and-nap pattern. Skipping tomorrow's nap pushes that to Tuesday.
      </p>

      <dl className="mt-5 grid grid-cols-3 gap-3 border-t border-divider pt-4">
        <Stat label="Today" value={formatDebt(last)} />
        <Stat label="7-day Δ" value="+2h 12m" tone="up" />
        <Stat label="Cleared by" value="Sat" />
      </dl>
    </section>
  );
}

function Stat({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone?: "up";
}) {
  return (
    <div>
      <dt className="text-caption text-ink-faint">{label}</dt>
      <dd
        className={[
          "font-mono text-[15px] font-medium tabular-nums tracking-tight",
          tone === "up" ? "text-success" : "text-ink",
        ].join(" ")}
      >
        {value}
      </dd>
    </div>
  );
}

function formatDebt(hours: number) {
  const sign = hours < 0 ? "−" : "+";
  const abs = Math.abs(hours);
  const h = Math.floor(abs);
  const m = Math.round((abs - h) * 60);
  return `${sign}${h}h ${String(m).padStart(2, "0")}m`;
}
