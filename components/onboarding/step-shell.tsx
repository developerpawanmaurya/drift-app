"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/onboarding/progress";
import { cn } from "@/lib/utils";

/**
 * StepShell — the consistent frame around each onboarding step.
 *
 * Props:
 *  - step / total — for the Progress indicator
 *  - title       — also passed to Progress as the eyebrow
 *  - heading     — large display heading for the step
 *  - lede        — quiet sub-paragraph
 *  - children    — the step's actual content (form, options, etc.)
 *  - back        — href of previous step (renders nothing if omitted)
 *  - next        — href of next step
 *  - nextLabel   — defaults to "Continue"
 *  - nextDisabled — disable forward button (use sparingly; prefer smart defaults)
 *  - skip        — optional { href, label } for a third action (Skip).
 *
 * The shell handles its own entrance animation; child content can rely on
 * being mounted on a stable layout.
 */
export function StepShell({
  step,
  total = 4,
  title,
  heading,
  lede,
  children,
  back,
  next,
  nextLabel = "Continue",
  nextDisabled,
  skip,
}: {
  step: number;
  total?: number;
  title: string;
  heading: string;
  lede?: string;
  children: React.ReactNode;
  back?: string;
  next: string;
  nextLabel?: string;
  nextDisabled?: boolean;
  skip?: { href: string; label: string };
}) {
  return (
    <div className="mx-auto flex w-full max-w-[560px] flex-col gap-10 px-5 pb-24 pt-8 md:pb-32 md:pt-12">
      <Progress step={step} total={total} title={title} />

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col gap-3"
      >
        <h1
          className="font-medium tracking-tighter text-ink"
          style={{
            fontSize: "clamp(1.75rem, 3.5vw + 0.5rem, 2.25rem)",
            lineHeight: 1.1,
            letterSpacing: "-0.022em",
          }}
        >
          {heading}
        </h1>
        {lede ? <p className="text-body-lg text-ink-muted">{lede}</p> : null}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
      >
        {children}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.18 }}
        className={cn(
          "mt-4 flex items-center gap-3",
          back ? "justify-between" : "justify-end"
        )}
      >
        {back ? (
          <Button asChild variant="ghost" size="md" className="-ml-3">
            <Link href={back}>
              <ArrowLeft className="size-4" aria-hidden />
              Back
            </Link>
          </Button>
        ) : null}

        <div className="flex items-center gap-3">
          {skip ? (
            <Button asChild variant="ghost" size="md">
              <Link href={skip.href}>{skip.label}</Link>
            </Button>
          ) : null}
          <Button
            asChild
            size="md"
            className="min-w-[148px]"
            aria-disabled={nextDisabled}
          >
            <Link
              href={nextDisabled ? "#" : next}
              tabIndex={nextDisabled ? -1 : 0}
              aria-disabled={nextDisabled}
              className={nextDisabled ? "pointer-events-none opacity-50" : undefined}
            >
              {nextLabel}
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
