import { SectionHeading } from "@/components/landing/section-heading";
import { FeatureScreen } from "@/components/landing/feature-screen";
import { features } from "@/lib/data/features";
import { cn } from "@/lib/utils";

/**
 * Features section.
 *
 * Three feature blocks, alternating left/right on desktop, stacked on mobile.
 * Each block: small eyebrow, h3 heading, body, and a real-feeling product
 * preview built from the design system.
 */
export function Features() {
  return (
    <section id="features" className="py-24 md:py-32">
      <div className="container">
        <SectionHeading
          eyebrow="Inside the app"
          title="Three things Drift does better than anyone."
          lede="Not feature bloat — three deliberate jobs the rest of the category gets wrong."
        />

        <div className="mt-16 space-y-20 md:mt-20 md:space-y-28">
          {features.map((f, i) => {
            const reverse = i % 2 === 1;
            return (
              <div
                key={f.id}
                className={cn(
                  "grid items-center gap-10 md:grid-cols-2 md:gap-16",
                  reverse && "md:[&>div:first-child]:order-2"
                )}
              >
                <div>
                  <p className="eyebrow">{f.eyebrow}</p>
                  <h3
                    className="mt-3 font-medium tracking-tighter text-ink"
                    style={{
                      fontSize: "clamp(1.5rem, 2.2vw + 0.6rem, 1.875rem)",
                      lineHeight: 1.18,
                      letterSpacing: "-0.018em",
                    }}
                  >
                    {f.title}
                  </h3>
                  <p className="mt-4 max-w-prose text-body-lg text-ink-muted">
                    {f.body}
                  </p>
                </div>

                <div>
                  <FeatureScreen kind={f.screen} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
