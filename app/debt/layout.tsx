import { TopBar } from "@/components/dashboard/top-bar";

export default function DebtLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <TopBar />
      <main>{children}</main>
    </div>
  );
}
