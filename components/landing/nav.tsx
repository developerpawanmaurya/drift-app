"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Wordmark } from "@/components/landing/wordmark";
import { cn } from "@/lib/utils";

const links = [
  { href: "#how", label: "How it works" },
  { href: "#features", label: "Features" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];

/**
 * Top nav. Edge-aligned, no oversized "logo on the left" treatment.
 * Background fades from transparent to a soft paper veil after 24px of scroll
 * so the editorial paper feel reads as an unbroken page on first load.
 */
export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50",
        "transition-[background-color,backdrop-filter,box-shadow] duration-base ease-out-soft",
        scrolled
          ? "bg-paper/80 backdrop-blur supports-[backdrop-filter]:bg-paper/70 shadow-[0_1px_0_0_hsl(var(--divider))]"
          : "bg-transparent"
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <Link
          href="/"
          className="rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500/60 focus-visible:ring-offset-4 focus-visible:ring-offset-paper"
        >
          <Wordmark />
        </Link>

        {/* Desktop nav links — hidden on mobile, where the nav distills to CTA only */}
        <nav className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-body-sm text-ink-muted transition-colors duration-fast hover:text-ink"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild size="sm" variant="ghost" className="hidden sm:inline-flex">
            <a href="#pricing">Sign in</a>
          </Button>
          <Button asChild size="sm">
            <Link href="/onboarding">Free Trial</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
