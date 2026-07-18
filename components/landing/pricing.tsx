import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/landing/section-heading";
import { plans } from "@/lib/data/pricing";
import { cn } from "@/lib/utils";

/**
 * Pricing section. Two tiers, simple and confident.
 *
 * The featured tier ("Steady") gets a hairline ring in the accent color and
 * a small "Most chosen" tag. We don't shout — no glow, no scale-up, no
 * "limited time" pressure. The tag is descriptive, not pressuring.
 */
export function Pricing() {
  return (
    <section id="pricing" className="py-24 md:py-32">
      <div className="container">
        <SectionHeading
          eyebrow="Pricing"
          title="Two plans. No upsells, no surprise tiers."
          lede="We don't reach for your wallet on day three. Try Drift on what's free; upgrade when the math has done its work."
        />

        <div className="mx-auto mt-14 grid max-w-3xl gap-5 md:mt-16 md:grid-cols-2">
          {plans.map((p) => (
            <div
              key={p.id}
              className={cn(
                "relative flex flex-col rounded-2xl bg-canvas p-7 md:p-8",
                "shadow-[inset_0_0_0_1px_hsl(var(--divider)),0_1px_2px_hsl(var(--ink)/0.04)]",
                p.featured &&
                  "shadow-[inset_0_0_0_1.5px_hsl(var(--accent-500)),0_8px_24px_-8px_hsl(var(--ink)/0.08)]"
              )}
            >
              {p.featured ? (
                <span className="absolute -top-2.5 left-7 rounded-full bg-accent-600 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">
                  Most chosen
                </span>
              ) : null}

              <div>
                <h3 className="text-h3 font-medium tracking-tight text-ink">
                  {p.name}
                </h3>
                <p className="mt-1 text-body-sm text-ink-muted">{p.tagline}</p>
              </div>

              <div className="mt-6 flex items-baseline gap-2">
                <span className="font-mono text-[40px] font-medium tabular-nums leading-none tracking-tight text-ink">
                  {p.priceLabel}
                </span>
                <span className="text-caption text-ink-faint">{p.cadence}</span>
              </div>

              <ul className="mt-6 space-y-3">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <Check
                      className="mt-0.5 size-4 shrink-0 text-accent-500"
                      aria-hidden
                    />
                    <span className="text-body-sm text-ink-muted">{f}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-7 pt-6 md:mt-auto">
                <Button
                  asChild
                  size="lg"
                  variant={p.featured ? "primary" : "outline"}
                  className="w-full"
                >
                  <a href="#">{p.cta}</a>
                </Button>
                {p.featured ? (
                  <p className="mt-3 text-center text-caption text-ink-faint">
                    No card required for the trial.
                  </p>
                ) : null}
              </div>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-prose text-center text-body-sm text-ink-faint">
          Drift is free for anyone who can't afford it — write to us at{" "}
          <a
            href="mailto:hello@drift.health"
            className="text-ink underline-offset-4 hover:underline"
          >
            hello@drift.health
          </a>
          . We mean this.
        </p>
      </div>
    </section>
  );
}
