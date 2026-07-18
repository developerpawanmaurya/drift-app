"use client";

import { CalendarDays, Coffee, Wind } from "lucide-react";

/**
 * FeatureScreen — small product-screen mock keyed off the feature `screen` id.
 *
 * Three variants — "plan", "debt", "ritual" — each renders a focused slice of
 * the real product UI. Built from the design system; no images.
 */
export function FeatureScreen({ kind }: { kind: "plan" | "debt" | "ritual" }) {
  return (
    <div className="surface relative overflow-hidden rounded-2xl p-5 md:p-6">
      {kind === "plan" && <PlanScreen />}
      {kind === "debt" && <DebtScreen />}
      {kind === "ritual" && <RitualScreen />}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
function PlanScreen() {
  const days = [
    { label: "Mon", date: "12", state: "off", note: "Recovery" },
    { label: "Tue", date: "13", state: "night", note: "Night 1" },
    { label: "Wed", date: "14", state: "night", note: "Night 2", active: true },
    { label: "Thu", date: "15", state: "night", note: "Night 3" },
    { label: "Fri", date: "16", state: "post", note: "Post-shift" },
  ];
  return (
    <div>
      <div className="flex items-center gap-2">
        <CalendarDays className="size-4 text-accent-500" aria-hidden />
        <p className="text-caption font-medium uppercase tracking-wider text-ink-faint">
          This week
        </p>
      </div>

      <ul className="mt-4 grid grid-cols-5 gap-1.5">
        {days.map((d) => (
          <li
            key={d.date}
            className={[
              "rounded-lg border px-2 py-2.5 text-center",
              d.active
                ? "border-accent-500 bg-accent-50"
                : "border-divider bg-canvas-soft",
            ].join(" ")}
          >
            <p className="text-[10px] font-medium uppercase tracking-wider text-ink-faint">
              {d.label}
            </p>
            <p className="mt-0.5 font-mono text-[15px] font-medium tabular-nums text-ink">
              {d.date}
            </p>
            <span
              className={[
                "mt-1.5 inline-block size-1.5 rounded-full",
                d.state === "night" && "bg-ink",
                d.state === "post" && "bg-accent-400",
                d.state === "off" && "bg-divider",
              ]
                .filter(Boolean)
                .join(" ")}
              aria-hidden
            />
            <p className="mt-1 text-[10px] text-ink-faint">{d.note}</p>
          </li>
        ))}
      </ul>

      <div className="mt-5 rounded-lg bg-canvas-soft p-3 shadow-hairline">
        <p className="text-[11px] font-medium uppercase tracking-wider text-ink-faint">
          Tonight, Wednesday
        </p>
        <div className="mt-1 flex items-baseline gap-2 font-mono tabular-nums">
          <span className="text-h4 font-medium text-ink">09:30 → 16:30</span>
          <span className="text-caption text-ink-faint">+ nap 19:30–21:00</span>
        </div>
        <p className="mt-1 text-body-sm leading-relaxed text-ink-muted">
          Anchor-and-nap split — you've responded better to this pattern than to a
          single 8h block on back-to-back nights.
        </p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
function DebtScreen() {
  // 14-day debt trend, hours. Negative = debt. We'll draw it as a small SVG.
  const data = [
    -1.2, -2.4, -3.5, -3.1, -4.6, -5.2, -4.1, -3.6, -3.9, -3.2, -2.4, -2.6, -2.7, -2.4,
  ];
  const w = 280;
  const h = 96;
  const maxAbs = 6;
  const step = w / (data.length - 1);
  const points = data.map((v, i) => {
    const x = i * step;
    const y = (Math.abs(v) / maxAbs) * h;
    return [x, y] as const;
  });
  const linePath =
    "M" + points.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" L");
  const fillPath = `${linePath} L${w},${h} L0,${h} Z`;

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-caption font-medium uppercase tracking-wider text-ink-faint">
            Sleep debt — 14 days
          </p>
          <p className="mt-1 font-mono text-[22px] font-medium tabular-nums text-ink">
            −2h 24m
          </p>
        </div>
        <span className="rounded-full bg-accent-100 px-2.5 py-0.5 text-caption font-medium text-accent-700">
          ↓ clearing
        </span>
      </div>

      <svg
        viewBox={`0 0 ${w} ${h}`}
        className="mt-3 w-full"
        role="img"
        aria-label="14-day sleep debt trend, clearing from 5h to 2h"
      >
        <defs>
          <linearGradient id="debtFill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="hsl(var(--accent-500))" stopOpacity="0.18" />
            <stop offset="100%" stopColor="hsl(var(--accent-500))" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* dotted baseline at 0 */}
        <line
          x1="0"
          y1="0.5"
          x2={w}
          y2="0.5"
          stroke="hsl(var(--divider))"
          strokeWidth="1"
          strokeDasharray="2 3"
        />
        <path d={fillPath} fill="url(#debtFill)" />
        <path
          d={linePath}
          fill="none"
          stroke="hsl(var(--accent-500))"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* terminal dot */}
        <circle
          cx={points[points.length - 1][0]}
          cy={points[points.length - 1][1]}
          r="3.5"
          fill="hsl(var(--accent-500))"
          stroke="hsl(var(--paper))"
          strokeWidth="2"
        />
      </svg>

      <p className="mt-3 text-body-sm leading-relaxed text-ink-muted">
        You'll be clear of debt by Saturday if you keep the anchor-and-nap pattern.
        Skipping tomorrow's nap pushes it to Tuesday.
      </p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
function RitualScreen() {
  const steps = [
    { time: "08:50", title: "Last coffee was at 04:30 — good.", icon: Coffee },
    { time: "09:00", title: "Cool the room to 18.5°C", icon: Wind },
    { time: "09:10", title: "Eye mask + earplugs + curtains closed" },
    { time: "09:20", title: "Three slow breaths. Phone face down." },
  ];
  return (
    <div>
      <p className="text-caption font-medium uppercase tracking-wider text-ink-faint">
        Daytime wind-down · 30 minutes
      </p>
      <p className="mt-1 text-h4 font-medium tracking-tight text-ink">
        Starting at 08:50
      </p>

      <ol className="mt-4 space-y-2.5">
        {steps.map((s, i) => {
          const Icon = (s as { icon?: typeof Coffee }).icon;
          return (
            <li
              key={s.time}
              className="flex items-center gap-3 rounded-lg bg-canvas-soft px-3 py-2.5 shadow-hairline"
            >
              <span className="font-mono text-caption tabular-nums text-ink-faint">
                {s.time}
              </span>
              <span className="h-4 w-px bg-divider" aria-hidden />
              {Icon ? (
                <Icon className="size-4 shrink-0 text-accent-500" aria-hidden />
              ) : (
                <span
                  className="inline-block size-1.5 shrink-0 rounded-full bg-accent-500"
                  aria-hidden
                />
              )}
              <span className="text-body-sm text-ink">{s.title}</span>
              {i === 0 ? (
                <span className="ml-auto rounded-full bg-accent-100 px-2 py-0.5 text-[10px] font-medium text-accent-700">
                  done
                </span>
              ) : null}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
