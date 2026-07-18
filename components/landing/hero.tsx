"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PhoneMock } from "@/components/landing/phone-mock";

const rise = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
};
const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Hero — the page's opening move.
 *
 * Editorial composition: ample top padding, headline carries the weight,
 * single primary CTA, secondary anchor is a quiet "see how it works" link
 * (not a button — never two competing buttons in a hero).
 *
 * The device sits on the right at md+ and below the copy on mobile. The lamp
 * glow is inside PhoneMock so it follows the device, not the page.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden pt-24 md:pt-28">
      {/* Page-level paper grain — extremely subtle */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-grain opacity-50" aria-hidden />

      <div className="container">
        <div className="grid items-center gap-12 md:gap-16 md:grid-cols-[1.05fr_1fr] lg:grid-cols-[1.15fr_1fr]">
          {/* Left: words */}
          <div className="pt-8 md:pt-12">
            <motion.p
              {...rise}
              transition={{ duration: 0.55, ease }}
              className="eyebrow"
            >
              Built for the 4am clock-out
            </motion.p>

            <motion.h1
              {...rise}
              transition={{ duration: 0.65, ease, delay: 0.05 }}
              className="mt-4 font-medium tracking-tightest text-ink"
              style={{
                fontSize: "clamp(2.25rem, 5.4vw + 0.4rem, 3.5rem)",
                lineHeight: 1.04,
                letterSpacing: "-0.028em",
              }}
            >
              Your shift doesn't follow the sun. Your sleep coach shouldn't either.
            </motion.h1>

            <motion.p
              {...rise}
              transition={{ duration: 0.65, ease, delay: 0.12 }}
              className="mt-6 max-w-prose text-body-lg text-ink-muted"
            >
              Drift builds sleep plans around your actual roster — not a textbook
              9-to-5. For night nurses, long-haul drivers, paramedics, and anyone
              whose week doesn't end on Friday.
            </motion.p>

            <motion.div
              {...rise}
              transition={{ duration: 0.65, ease, delay: 0.2 }}
              className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6"
            >
              <Button asChild size="lg">
                <Link href="/onboarding">
                  Build my first plan
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
              </Button>
              <a
                href="#how"
                className="group inline-flex items-center gap-1.5 text-body-sm font-medium text-ink-muted transition-colors hover:text-ink"
              >
                See how it works
                <span
                  className="font-mono text-[13px] transition-transform duration-fast group-hover:translate-x-0.5"
                  aria-hidden
                >
                  →
                </span>
              </a>
            </motion.div>

            {/* Quiet credibility row — small, never the main act */}
            <motion.div
              {...rise}
              transition={{ duration: 0.7, ease, delay: 0.32 }}
              className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-caption text-ink-faint"
            >
              <span>Designed with shift workers in five countries</span>
              <span aria-hidden className="hidden h-1 w-1 rounded-full bg-divider sm:block" />
              <span>No wearable required</span>
              <span aria-hidden className="hidden h-1 w-1 rounded-full bg-divider sm:block" />
              <span>Cancel any time</span>
            </motion.div>
          </div>

          {/* Right: device */}
          <div className="relative">
            <PhoneMock />
          </div>
        </div>
      </div>

      {/* Section bottom rhythm */}
      <div className="h-20 md:h-28" />
    </section>
  );
}
