import Link from "next/link";
import { X } from "lucide-react";

import { Wordmark } from "@/components/landing/wordmark";

/**
 * Onboarding layout — focused thinking space.
 *
 * Deliberately separate from the marketing site: no nav links, no footer.
 * Just the wordmark, a quiet exit affordance, and the step shell.
 *
 * Page background is paper, with the lamp gradient applied very softly
 * to the top of the viewport so the flow feels lit, not sterile.
 */
export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen bg-paper text-ink">
      {/* Soft lamp glow at the top of the page — sets the tone */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -z-0 h-[420px]"
        style={{
          background:
            "radial-gradient(80% 60% at 50% 0%, hsl(var(--accent-200) / 0.35), transparent 70%)",
        }}
        aria-hidden
      />

      <header className="relative z-10">
        <div className="mx-auto flex h-16 max-w-[920px] items-center justify-between px-5">
          <Link
            href="/"
            className="rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500/60 focus-visible:ring-offset-4 focus-visible:ring-offset-paper"
          >
            <Wordmark size="sm" />
          </Link>
          <Link
            href="/"
            className="group inline-flex items-center gap-1.5 text-caption text-ink-faint transition-colors hover:text-ink"
            aria-label="Exit setup"
          >
            <span className="hidden sm:inline">Save and exit</span>
            <X className="size-4" aria-hidden />
          </Link>
        </div>
      </header>

      <main className="relative z-10">{children}</main>
    </div>
  );
}
