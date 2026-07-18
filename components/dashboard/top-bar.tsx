"use client";

import Link from "next/link";
import { Bell, Plus, Settings2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Wordmark } from "@/components/landing/wordmark";
import { user } from "@/lib/data/dashboard";

/**
 * Dashboard top bar.
 *
 * Sticky at the top so the primary action ("Log sleep") is always one tap away
 * — Maya often opens the app right after waking, and reducing distance to that
 * one action is the most concrete thing this layout can do.
 *
 * Editorial restraint applies to the desktop layout: no sidebar, no tab bar,
 * no breadcrumb crumbs. The page tells you where you are; the chrome stays out
 * of the way.
 */
export function TopBar() {
  return (
    <header className="sticky top-0 z-40 border-b border-divider bg-paper/85 backdrop-blur supports-[backdrop-filter]:bg-paper/70">
      <div className="container flex h-14 items-center justify-between md:h-16">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500/60 focus-visible:ring-offset-4 focus-visible:ring-offset-paper"
          >
            <Wordmark size="sm" />
          </Link>
          <span aria-hidden className="hidden h-4 w-px bg-divider sm:block" />
          <span className="hidden text-caption text-ink-faint sm:inline">Today</span>
        </div>

        <div className="flex items-center gap-1.5">
          <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
            <Link href="#">
              <Bell className="size-4" aria-hidden />
              <span className="sr-only md:not-sr-only md:ml-1">Nudges</span>
            </Link>
          </Button>
          <Button asChild variant="outline" size="sm">
            <Link href="#">
              <Plus className="size-4" aria-hidden />
              Log sleep
            </Link>
          </Button>
          <Link
            href="#"
            className="ml-1 flex size-9 items-center justify-center rounded-full bg-sunken font-mono text-caption font-medium text-ink transition-colors hover:bg-divider focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
            aria-label={`${user.fullName} — account`}
          >
            {user.initials}
          </Link>
          <Button asChild variant="ghost" size="sm" className="ml-1 hidden md:inline-flex">
            <Link href="#" aria-label="Settings">
              <Settings2 className="size-4" aria-hidden />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
