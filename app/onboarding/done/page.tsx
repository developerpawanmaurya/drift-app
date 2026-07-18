"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Moon } from "lucide-react";

import { Button } from "@/components/ui/button";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Step 5 — Done.
 *
 * Celebration without confetti. The "celebration" is editorial: a slow lamp
 * glow expands behind a crescent, the heading rises in, and a real preview
 * of tonight's plan appears. That preview is the celebration — the user gets
 * the value of the product in the same screen.
 *
 * No progress indicator here. The flow is over.
 */
export default function DoneStep() {
  return (
    <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-[560px] flex-col items-center justify-center gap-10 px-5 py-12 text-center">
      {/* Lamp glow — bigger, longer, slower than anywhere else */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease }}
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(50% 40% at 50% 38%, hsl(var(--accent-200) / 0.55), transparent 70%)",
        }}
        aria-hidden
      />

      {/* Crescent — gentle scale-and-fade entrance with a slow "breath" loop */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease, delay: 0.15 }}
        className="flex size-16 items-center justify-center rounded-full bg-accent-100/80 shadow-[0_8px_24px_-8px_hsl(var(--accent-500)/0.25)]"
      >
        <motion.span
          animate={{ scale: [1, 1.04, 1], opacity: [1, 0.94, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="flex items-center justify-center"
        >
          <Moon className="size-7 text-accent-700" aria-hidden />
        </motion.span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease, delay: 0.25 }}
        className="flex flex-col gap-3"
      >
        <h1
          className="font-medium tracking-tighter text-ink"
          style={{
            fontSize: "clamp(2rem, 4vw + 0.5rem, 2.75rem)",
            lineHeight: 1.05,
            letterSpacing: "-0.026em",
          }}
        >
          Plan's ready.
        </h1>
        <p className="mx-auto max-w-md text-body-lg text-ink-muted">
          Built in <span className="font-mono tabular-nums text-ink">47</span>{" "}
          seconds. Here's tonight, in front of your 22:00 shift.
        </p>
      </motion.div>

      {/* Preview card — small dashboard module */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease, delay: 0.4 }}
        className="w-full rounded-2xl bg-canvas p-6 text-left shadow-[inset_0_0_0_1px_hsl(var(--divider)),0_8px_24px_-12px_hsl(var(--ink)/0.10)]"
      >
        <div className="flex items-center gap-1.5">
          <span className="size-1.5 rounded-full bg-accent-500" aria-hidden />
          <span className="text-caption font-medium uppercase tracking-wider text-ink-faint">
            Tonight's plan
          </span>
        </div>

        <div className="mt-3 flex items-baseline gap-3 font-mono tabular-nums">
          <span className="text-[34px] font-medium tracking-tight text-ink">
            09:30
          </span>
          <ArrowRight className="size-4 text-ink-faint" aria-hidden />
          <span className="text-[34px] font-medium tracking-tight text-ink">
            16:30
          </span>
        </div>
        <p className="mt-2 text-body-sm leading-relaxed text-ink-muted">
          Anchor sleep, then a 90-minute nap at 19:30 before you clock in at 22:00.
          We chose the anchor-and-nap pattern because it tends to leave shift
          workers in better shape across back-to-back nights.
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          <span className="rounded-full bg-accent-50 px-2.5 py-1 text-caption font-medium text-accent-700">
            anchor + nap
          </span>
          <span className="rounded-full bg-sunken px-2.5 py-1 text-caption text-ink-muted">
            7h 30m total
          </span>
          <span className="rounded-full bg-sunken px-2.5 py-1 text-caption text-ink-muted">
            wind-down at 09:00
          </span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="flex w-full flex-col items-center gap-4"
      >
        <Button asChild size="lg" className="w-full max-w-sm">
          <Link href="/dashboard">
            Open my dashboard
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </Button>
        <Link
          href="/style-guide"
          className="group inline-flex items-center gap-1.5 text-body-sm font-medium text-ink-muted transition-colors hover:text-ink"
        >
          Tour the rest of the app first
          <ArrowUpRight
            className="size-3.5 transition-transform duration-fast group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden
          />
        </Link>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.75 }}
        className="mt-4 max-w-md text-caption leading-relaxed text-ink-faint"
      >
        Drift will send one nudge 15 minutes before your wind-down. That's the
        only notification you'll get unless you ask for more.
      </motion.p>
    </div>
  );
}
