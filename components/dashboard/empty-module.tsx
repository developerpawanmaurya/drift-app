import Link from "next/link";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * EmptyModule — the shared shell every empty card uses.
 *
 * Same outer card chrome as the populated modules so the page layout reads
 * identical (this is the whole point of separate-route empty states — same
 * grid, different content). Inside: an illustration slot, a heading, a
 * lede, and one action.
 */
export function EmptyModule({
  label,
  heading,
  body,
  action,
  illustration,
  children,
  size = "sm",
  className,
}: {
  label?: string;
  heading: string;
  body: string;
  action?: { href: string; label: string };
  illustration?: React.ReactNode;
  children?: React.ReactNode;
  size?: "sm" | "lg";
  className?: string;
}) {
  return (
    <section
      className={cn(
        "rounded-2xl bg-canvas p-6 shadow-[inset_0_0_0_1px_hsl(var(--divider)),0_1px_2px_hsl(var(--ink)/0.04)] md:p-7",
        size === "lg" && "md:p-10",
        className
      )}
    >
      {label ? (
        <h2 className="text-caption font-medium uppercase tracking-wider text-ink-faint">
          {label}
        </h2>
      ) : null}

      <div className={cn("flex flex-col gap-5", label ? "mt-4" : "mt-0")}>
        {illustration}
        <div className="flex flex-col gap-2">
          <h3
            className={cn(
              "font-medium tracking-tight text-ink",
              size === "lg" ? "text-h2" : "text-h3"
            )}
          >
            {heading}
          </h3>
          <p className="max-w-prose text-body-sm leading-relaxed text-ink-muted">
            {body}
          </p>
        </div>
        {children}
        {action ? (
          <div>
            <Button asChild size={size === "lg" ? "lg" : "sm"}>
              <Link href={action.href}>{action.label}</Link>
            </Button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
