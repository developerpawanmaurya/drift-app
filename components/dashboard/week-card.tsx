import { week } from "@/lib/data/dashboard";
import { cn } from "@/lib/utils";

/**
 * Week card — seven-day strip with state per day.
 *
 * State colors (matched to dashboard semantics, not landing):
 *   night → ink dot, dark border
 *   post  → accent-400 dot, soft border
 *   off   → divider dot, no border
 *   active day gets an amber accent border + amber-50 fill
 */
export function WeekCard() {
  return (
    <section
      aria-labelledby="week-heading"
      className="rounded-2xl bg-canvas p-6 shadow-[inset_0_0_0_1px_hsl(var(--divider)),0_1px_2px_hsl(var(--ink)/0.04)] md:p-7"
    >
      <div className="flex items-baseline justify-between">
        <h2
          id="week-heading"
          className="text-caption font-medium uppercase tracking-wider text-ink-faint"
        >
          This week
        </h2>
        <span className="text-caption text-ink-faint">Mon 12 — Sun 18</span>
      </div>

      <ul className="mt-5 grid grid-cols-7 gap-1.5">
        {week.map((d) => (
          <li
            key={d.date}
            className={cn(
              "group relative flex flex-col items-center gap-2 rounded-xl p-2 text-center transition-shadow",
              d.active
                ? "bg-accent-50 shadow-[inset_0_0_0_1.5px_hsl(var(--accent-500))]"
                : "bg-canvas-soft shadow-[inset_0_0_0_1px_hsl(var(--divider))]"
            )}
          >
            <p
              className={cn(
                "text-[10px] font-medium uppercase tracking-wider",
                d.active ? "text-accent-700" : "text-ink-faint"
              )}
            >
              {d.label}
            </p>
            <p className="font-mono text-[15px] font-medium tabular-nums text-ink">
              {d.date}
            </p>
            <span
              className={cn(
                "size-1.5 rounded-full",
                d.state === "night" && "bg-ink",
                d.state === "post" && "bg-accent-400",
                d.state === "off" && "bg-divider",
                d.state === "day" && "bg-cool-500"
              )}
              aria-hidden
            />
            <p
              className={cn(
                "text-[10px] leading-tight",
                d.active ? "text-ink" : "text-ink-faint"
              )}
            >
              {d.note}
            </p>
          </li>
        ))}
      </ul>

      <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1.5 border-t border-divider pt-4 text-caption text-ink-muted">
        <Legend dotClass="bg-ink" label="Night" />
        <Legend dotClass="bg-accent-400" label="Post-shift" />
        <Legend dotClass="bg-divider" label="Off" />
      </div>
    </section>
  );
}

function Legend({ dotClass, label }: { dotClass: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={`block size-1.5 rounded-full ${dotClass}`} aria-hidden />
      <span>{label}</span>
    </span>
  );
}
