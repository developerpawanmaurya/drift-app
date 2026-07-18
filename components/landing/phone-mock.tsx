"use client";

import { motion } from "framer-motion";
import { Moon, Bed, ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * PhoneMock — the hero device.
 *
 * Real (small) version of the dashboard we'll build in Phase 4. Built as a real
 * stack of components rather than a static image, so the design system is doing
 * its own work and a hover/load reveal is possible.
 *
 * Sizing: fixed 296px wide on mobile, 336px on md+. We don't make it scale
 * fluidly because devices don't — and the editorial framing reads better with
 * a fixed object that the page composes around.
 */
export function PhoneMock({ className }: { className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      className={cn(
        "relative mx-auto w-[296px] md:w-[336px]",
        className
      )}
      aria-hidden="true"
    >
      {/* Outer device — warm dark frame, subtle highlight on top edge */}
      <div className="relative rounded-[44px] bg-[#241D17] p-[6px] shadow-[0_30px_60px_-20px_hsl(var(--ink)/0.25),0_12px_28px_-12px_hsl(var(--ink)/0.18)]">
        {/* inner bevel highlight */}
        <div className="pointer-events-none absolute inset-[6px] rounded-[40px] ring-1 ring-inset ring-white/5" />

        {/* Screen */}
        <div className="relative overflow-hidden rounded-[38px] bg-paper">
          {/* Status bar */}
          <div className="flex items-center justify-between px-7 pt-3 text-[11px] font-medium tracking-tight text-ink">
            <span className="font-mono tabular-nums">06:14</span>
            <div className="flex items-center gap-1">
              <SignalBars />
              <WifiGlyph />
              <BatteryGlyph />
            </div>
          </div>

          {/* Notch / dynamic island stand-in */}
          <div className="mx-auto mt-1 h-[18px] w-[88px] rounded-full bg-[#241D17]" />

          {/* App content */}
          <div className="px-5 pb-6 pt-5">
            <Header />
            <DateRow />
            <TonightCard />
            <DebtRow />
            <RitualRow />
          </div>
        </div>
      </div>

      {/* Soft amber lamp glow behind the device. This is the brand. */}
      <div className="absolute inset-0 -z-10 translate-y-8 scale-110 rounded-full bg-lamp" />
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/* Sub-components                                                              */
/* -------------------------------------------------------------------------- */

function Header() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-1.5 text-ink">
        <Moon className="size-3.5 text-accent-500" aria-hidden />
        <span className="text-[12px] font-semibold tracking-tight">drift</span>
      </div>
      <div className="flex size-7 items-center justify-center rounded-full bg-sunken">
        <span className="font-mono text-[10px] font-medium tracking-tight text-ink-muted">
          MT
        </span>
      </div>
    </div>
  );
}

function DateRow() {
  return (
    <div className="mt-5 flex items-baseline justify-between">
      <div>
        <p className="text-[11px] font-medium uppercase tracking-wider text-ink-faint">
          Wed · 14 May
        </p>
        <p className="mt-1 text-[15px] font-medium tracking-tight text-ink">
          Day 3 of 4 nights
        </p>
      </div>
      <div className="rounded-full border border-divider px-2 py-0.5 font-mono text-[10px] tabular-nums text-ink-muted">
        on shift 22:00
      </div>
    </div>
  );
}

function TonightCard() {
  return (
    <div className="mt-4 rounded-[18px] bg-canvas p-4 shadow-[inset_0_0_0_1px_hsl(var(--divider)),0_1px_2px_hsl(var(--ink)/0.04)]">
      <div className="flex items-center gap-1.5">
        <span className="text-[10px] font-medium uppercase tracking-[0.08em] text-ink-faint">
          Tonight's plan
        </span>
        <span className="size-1 rounded-full bg-accent-500" aria-hidden />
      </div>

      <div className="mt-2 flex items-baseline gap-2 font-mono tabular-nums">
        <span className="text-[26px] font-medium tracking-tight text-ink">
          09:30
        </span>
        <ArrowRight className="size-3.5 text-ink-faint" aria-hidden />
        <span className="text-[26px] font-medium tracking-tight text-ink">
          16:30
        </span>
      </div>

      <p className="mt-1.5 text-[12.5px] leading-relaxed text-ink-muted">
        Anchor sleep, then a 90-min nap at 19:30 before your 22:00 shift.
      </p>

      {/* 24h strip — black-out blocks for sleep, accent for shift, neutral for awake */}
      <div className="mt-3.5">
        <Timeline />
        <div className="mt-1.5 flex justify-between font-mono text-[9px] tabular-nums text-ink-faint">
          <span>06</span>
          <span>12</span>
          <span>18</span>
          <span>00</span>
          <span>06</span>
        </div>
      </div>
    </div>
  );
}

function Timeline() {
  // Segments are percentages of 24h starting from 06:00 (left edge).
  // 06:00–09:30 awake (3.5h), 09:30–16:30 sleep (7h), 16:30–19:30 awake (3h),
  // 19:30–21:00 nap (1.5h), 21:00–22:00 awake (1h), 22:00–06:00 shift (8h)
  return (
    <div className="flex h-6 w-full overflow-hidden rounded-full bg-sunken">
      <span className="h-full" style={{ width: `${(3.5 / 24) * 100}%` }} />
      <span
        className="h-full bg-ink/85"
        style={{ width: `${(7 / 24) * 100}%` }}
        title="Anchor sleep"
      />
      <span className="h-full" style={{ width: `${(3 / 24) * 100}%` }} />
      <span
        className="h-full bg-ink/85"
        style={{ width: `${(1.5 / 24) * 100}%` }}
        title="Nap"
      />
      <span className="h-full" style={{ width: `${(1 / 24) * 100}%` }} />
      <span
        className="h-full bg-accent-500"
        style={{ width: `${(8 / 24) * 100}%` }}
        title="Shift"
      />
    </div>
  );
}

function DebtRow() {
  return (
    <div className="mt-3 flex items-center justify-between rounded-[14px] bg-canvas-soft px-4 py-3 shadow-[inset_0_0_0_1px_hsl(var(--divider))]">
      <div>
        <p className="text-[10px] font-medium uppercase tracking-[0.08em] text-ink-faint">
          Sleep debt
        </p>
        <p className="mt-0.5 font-mono text-[15px] font-medium tabular-nums text-ink">
          −2h 40m
        </p>
      </div>
      <span className="rounded-full bg-accent-100 px-2 py-0.5 text-[10px] font-medium text-accent-700">
        clearing
      </span>
    </div>
  );
}

function RitualRow() {
  return (
    <div className="mt-3 flex items-center gap-3 rounded-[14px] bg-canvas-soft px-4 py-3 shadow-[inset_0_0_0_1px_hsl(var(--divider))]">
      <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-accent-100">
        <Bed className="size-4 text-accent-700" aria-hidden />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[12px] font-medium text-ink">
          Wind-down at 09:00
        </p>
        <p className="text-[11px] text-ink-faint">
          Eye mask · 6.4° room · no caffeine after 04:30
        </p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Tiny status-bar glyphs                                                     */
/* -------------------------------------------------------------------------- */
function SignalBars() {
  return (
    <svg width="14" height="10" viewBox="0 0 14 10" fill="currentColor" aria-hidden>
      <rect x="0" y="7" width="2" height="3" rx="0.5" />
      <rect x="4" y="5" width="2" height="5" rx="0.5" />
      <rect x="8" y="3" width="2" height="7" rx="0.5" />
      <rect x="12" y="0" width="2" height="10" rx="0.5" opacity="0.4" />
    </svg>
  );
}

function WifiGlyph() {
  return (
    <svg width="13" height="10" viewBox="0 0 13 10" fill="none" aria-hidden>
      <path
        d="M1 3.5C2.6 2 4.5 1 6.5 1s3.9 1 5.5 2.5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M3 5.7c1-1 2.3-1.6 3.5-1.6s2.5.6 3.5 1.6"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <circle cx="6.5" cy="8" r="1" fill="currentColor" />
    </svg>
  );
}

function BatteryGlyph() {
  return (
    <svg width="22" height="10" viewBox="0 0 22 10" fill="none" aria-hidden>
      <rect x="0.5" y="0.5" width="19" height="9" rx="2" stroke="currentColor" />
      <rect x="2" y="2" width="14" height="6" rx="1" fill="currentColor" />
      <rect x="20.5" y="3" width="1" height="4" rx="0.5" fill="currentColor" />
    </svg>
  );
}
