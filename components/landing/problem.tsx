import { SectionHeading } from "@/components/landing/section-heading";
import { problems } from "@/lib/data/problems";

/**
 * Problem section.
 *
 * Three pain points as a horizontal grid on desktop, stacked on mobile. The
 * "felt" line is set in italics — it's the user's voice, distinct from Drift's.
 * Visual move: numbered eyebrow (01, 02, 03) in mono, so the numbers read as
 * data, not decoration.
 */
export function Problem() {
  return (
    <section id="problem" className="relative">
      <div className="container">
        <SectionHeading
          eyebrow="What's broken today"
          title="Generic sleep advice is built for someone else's day."
          lede="Most sleep tools assume you've finished work by 8pm and the lights go out at 10. That's a fantasy if you're an ICU nurse, a long-haul driver, or running an Uber till 03:00. Drift starts somewhere different."
        />

        <ul className="mt-14 grid gap-px overflow-hidden rounded-2xl bg-divider md:grid-cols-3 md:mt-16">
          {problems.map((p, i) => (
            <li
              key={p.id}
              className="bg-paper p-7 md:p-8"
            >
              <span className="font-mono text-caption tabular-nums text-ink-faint">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 text-h3 font-medium tracking-tight text-ink">
                {p.title}
              </h3>
              <p className="mt-3 text-body italic leading-relaxed text-ink-muted">
                “{p.felt}”
              </p>
              <p className="mt-4 text-body-sm leading-relaxed text-ink-muted">
                {p.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
      <div className="h-24 md:h-32" />
    </section>
  );
}
