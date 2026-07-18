"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";

/**
 * SleepSlider — a custom-styled native range input.
 *
 * Why native: free accessibility (keyboard, screen reader, touch). We override
 * only the visuals via the `[&::-webkit-slider-...]` arbitrary variants so the
 * thumb and track read on-brand without losing platform semantics.
 *
 * Value is in hours (decimal). Step 0.25 → 15-minute increments.
 */
export function SleepSlider({
  value,
  onChange,
  min = 6,
  max = 10,
  step = 0.25,
  className,
}: {
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
}) {
  const id = useId();
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {/* Big readout — mono, big, centered. The product's signature treatment. */}
      <div className="flex items-baseline justify-center gap-1">
        <span className="font-mono text-[48px] font-medium tabular-nums leading-none tracking-tight text-ink">
          {Math.floor(value)}
        </span>
        <span className="font-mono text-[20px] text-ink-faint">h</span>
        <span className="ml-2 font-mono text-[48px] font-medium tabular-nums leading-none tracking-tight text-ink">
          {String(Math.round((value - Math.floor(value)) * 60)).padStart(2, "0")}
        </span>
        <span className="font-mono text-[20px] text-ink-faint">m</span>
      </div>

      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        aria-label="Sleep need in hours"
        // Tailwind arbitrary-variant styling on the WebKit / Moz pseudo-elements
        style={{
          // The track fill: gradient that follows the thumb position.
          background: `linear-gradient(to right, hsl(var(--accent-500)) 0%, hsl(var(--accent-500)) ${pct}%, hsl(var(--sunken)) ${pct}%, hsl(var(--sunken)) 100%)`,
        }}
        className={[
          "h-2 w-full cursor-pointer appearance-none rounded-full",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500/60 focus-visible:ring-offset-4 focus-visible:ring-offset-paper",
          // WebKit thumb
          "[&::-webkit-slider-thumb]:appearance-none",
          "[&::-webkit-slider-thumb]:size-6 [&::-webkit-slider-thumb]:rounded-full",
          "[&::-webkit-slider-thumb]:bg-canvas [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-accent-500",
          "[&::-webkit-slider-thumb]:shadow-[0_2px_6px_-2px_hsl(var(--ink)/0.18)]",
          "[&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:duration-fast",
          "active:[&::-webkit-slider-thumb]:scale-110",
          // Moz thumb
          "[&::-moz-range-thumb]:size-6 [&::-moz-range-thumb]:rounded-full",
          "[&::-moz-range-thumb]:bg-canvas [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-accent-500",
          "[&::-moz-range-thumb]:shadow-[0_2px_6px_-2px_hsl(var(--ink)/0.18)]",
          "[&::-moz-range-thumb]:cursor-pointer",
          // Moz track (we paint the fill via inline background gradient above)
          "[&::-moz-range-track]:h-2 [&::-moz-range-track]:rounded-full [&::-moz-range-track]:bg-transparent",
        ].join(" ")}
      />

      <div className="flex justify-between font-mono text-caption tabular-nums text-ink-faint">
        <span>{min}h</span>
        <span>{(min + max) / 2}h</span>
        <span>{max}h</span>
      </div>
    </div>
  );
}
