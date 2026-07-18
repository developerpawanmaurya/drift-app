import { Wordmark } from "@/components/landing/wordmark";

const cols = [
  {
    title: "Product",
    links: [
      { label: "How it works", href: "#how" },
      { label: "Features", href: "#features" },
      { label: "Pricing", href: "#pricing" },
      { label: "Changelog", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Careers — we're hiring two roles", href: "#" },
      { label: "Press kit", href: "#" },
      { label: "Contact", href: "mailto:hello@drift.health" },
    ],
  },
  {
    title: "For shift workers",
    links: [
      { label: "Sleep guide", href: "#" },
      { label: "Roster scanner", href: "#" },
      { label: "FAQ", href: "#faq" },
      { label: "Privacy", href: "#" },
    ],
  },
];

/**
 * Footer. Editorial: minimal, no social icons row, single tagline at the
 * bottom. Three columns become a single stack on mobile.
 */
export function Footer() {
  return (
    <footer className="border-t border-divider bg-paper">
      <div className="container py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_2fr] md:gap-16">
          <div>
            <Wordmark />
            <p className="mt-4 max-w-sm text-body-sm leading-relaxed text-ink-muted">
              Drift is a small team building sleep tools for the people the
              wellness industry forgot. We sleep when we can.
            </p>
          </div>

          <nav
            className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3"
            aria-label="Footer"
          >
            {cols.map((c) => (
              <div key={c.title}>
                <p className="eyebrow">{c.title}</p>
                <ul className="mt-4 space-y-3">
                  {c.links.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        className="text-body-sm text-ink-muted transition-colors hover:text-ink"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-divider pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-caption text-ink-faint">
            © 2026 Drift Health, Inc. Made for people who don't sleep when
            everyone else does.
          </p>
          <p className="font-mono text-caption tabular-nums text-ink-faint">
            v0.1 · last roster sync 06:14
          </p>
        </div>
      </div>
    </footer>
  );
}
