import { TopBar } from "@/components/dashboard/top-bar";

/**
 * Dashboard layout — shared chrome for /dashboard and /dashboard/empty.
 * Sticky top bar; content area handles its own padding.
 */
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <TopBar />
      <main>{children}</main>
    </div>
  );
}
