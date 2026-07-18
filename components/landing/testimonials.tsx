import { SectionHeading } from "@/components/landing/section-heading";
import { testimonials } from "@/lib/data/testimonials";

/**
 * Testimonials section.
 *
 * Editorial choice: don't use a marquee or carousel. Just lay them out as a
 * two-column quote grid on desktop, single-column on mobile. Each quote
 * gets its full weight; nothing about this product wants to feel like
 * trade-show wallpaper.
 *
 * Avatar treatment: monogrammed sunken circles. No stock-photo headshots —
 * they always read fake and would undercut the believable copy.
 */
export function Testimonials() {
  return (
    <section className="bg-canvas-soft py-24 md:py-32">
      <div className="container">
        <SectionHeading
          eyebrow="From the people we built this for"
          title="Real voices. Real rosters. Less time owed."
          lede="Names changed where requested. Jobs and cities are as given."
        />

        <ul className="mt-14 grid gap-px overflow-hidden rounded-2xl bg-divider md:mt-16 md:grid-cols-2">
          {testimonials.map((t) => (
            <li key={t.id} className="bg-paper p-7 md:p-9">
              <p className="text-body-lg leading-relaxed text-ink">
                <span aria-hidden className="select-none text-accent-500">
                  “
                </span>
                {t.quote}
                <span aria-hidden className="select-none text-accent-500">
                  ”
                </span>
              </p>

              <div className="mt-6 flex items-center gap-3">
                <span
                  className="flex size-9 items-center justify-center rounded-full bg-sunken font-mono text-caption font-medium text-ink"
                  aria-hidden
                >
                  {t.initials}
                </span>
                <div>
                  <p className="text-body-sm font-medium text-ink">{t.name}</p>
                  <p className="text-caption text-ink-faint">
                    {t.role} · {t.city}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
