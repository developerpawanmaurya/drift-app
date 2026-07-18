import { SectionHeading } from "@/components/landing/section-heading";
import { steps } from "@/lib/data/how-it-works";

/**
 * "How it works" section. Three numbered steps with hand-drawn micro-illustrations.
 *
 * The illustrations are deliberately minimal — single-stroke SVGs that
 * suggest the action without being literal. Same warm ink line on every step
 * so they read as a set.
 */
export function HowItWorks() {
  return (
    <section id="how" className="relative bg-canvas-soft py-24 md:py-32">
      <div className="container">
        <SectionHeading
          eyebrow="How it works"
          title="Three steps. One you only do once."
          lede="The product earns its keep on day one. No 30-day onboarding ramp, no calibration period."
        />

        <ol className="mt-14 grid gap-10 md:mt-16 md:grid-cols-3 md:gap-8">
          {steps.map((s, i) => (
            <li key={s.number} className="relative">
              <Illustration index={i} />
              <p className="mt-6 font-mono text-caption tabular-nums text-accent-700">
                Step {s.number}
              </p>
              <h3 className="mt-2 text-h3 font-medium tracking-tight text-ink">
                {s.title}
              </h3>
              <p className="mt-3 max-w-prose text-body-sm leading-relaxed text-ink-muted">
                {s.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/**
 * Tiny editorial illustrations. Stroke-only, accent-500. Sized 56×56.
 *  0 — roster: a stack of three lines with a folded corner
 *  1 — plan: a clock dial with one sleep arc carved out
 *  2 — adjust: two arrows curling around a midpoint
 */
function Illustration({ index }: { index: number }) {
  const props = {
    width: 56,
    height: 56,
    viewBox: "0 0 56 56",
    fill: "none",
    "aria-hidden": true as const,
    className: "text-accent-500",
  };
  if (index === 0) {
    return (
      <svg {...props}>
        <path
          d="M12 14h26M12 22h22M12 30h28M12 38h18"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M34 38l8 8M34 46l8-8"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          opacity="0.4"
        />
      </svg>
    );
  }
  if (index === 1) {
    return (
      <svg {...props}>
        <circle
          cx="28"
          cy="28"
          r="18"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path
          d="M28 28L28 10"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M28 28L40 36"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M10 28a18 18 0 0 1 36 0"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.18"
        />
      </svg>
    );
  }
  return (
    <svg {...props}>
      <path
        d="M16 22a12 12 0 0 1 22-2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M40 34a12 12 0 0 1-22 2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M38 14l3 6-6 2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18 42l-3-6 6-2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
