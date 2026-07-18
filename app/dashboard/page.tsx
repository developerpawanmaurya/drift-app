import { Greeting } from "@/components/dashboard/greeting";
import { TonightCard } from "@/components/dashboard/tonight-card";
import { DebtCard } from "@/components/dashboard/debt-card";
import { WeekCard } from "@/components/dashboard/week-card";
import { LastSleepCard } from "@/components/dashboard/last-sleep-card";

/**
 * /dashboard — populated state.
 *
 * Layout:
 *   - Greeting band, full width, generous top spacing.
 *   - TonightCard, full width — the screen's center of gravity.
 *   - 3-up grid below for Debt / Week / Last Sleep on lg+; stacks on smaller.
 *
 * No CTAs are repeated — each module owns its own one (or none). The page
 * doesn't re-pitch anything. Maya already paid for the product; she's here
 * to use it.
 */
export default function DashboardPage() {
  return (
    <div className="container py-8 md:py-12">
      <Greeting />

      <div className="mt-8 md:mt-10">
        <TonightCard />
      </div>

      <div className="mt-6 grid gap-6 md:mt-8 lg:grid-cols-3">
        <DebtCard />
        <WeekCard />
        <LastSleepCard />
      </div>

      {/* Trailing whitespace — gives the page a breath at the bottom */}
      <div className="h-16 md:h-20" />
    </div>
  );
}
