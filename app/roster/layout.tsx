import { TopBar } from "@/components/dashboard/top-bar";

/**
 * Roster layout — shares the dashboard top bar so the chrome is consistent
 * across logged-in surfaces.
 */
export default function RosterLayout({
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
