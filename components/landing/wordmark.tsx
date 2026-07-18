import { cn } from "@/lib/utils";

/**
 * Wordmark — small crescent + "drift" lowercase.
 * Lowercase deliberately: the brand is quiet. The crescent reads at 16px;
 * we don't try to make it tell a story below that.
 */
export function Wordmark({
  className,
  size = "md",
}: {
  className?: string;
  size?: "sm" | "md";
}) {
  const dim = size === "sm" ? 16 : 20;
  const text = size === "sm" ? "text-[15px]" : "text-[18px]";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-ink",
        className
      )}
      aria-label="Drift"
    >
      <svg
        width={dim}
        height={dim}
        viewBox="0 0 20 20"
        fill="none"
        aria-hidden="true"
        className="text-accent-500"
      >
        {/* Filled crescent. Warm not cold — this is a lamp, not a clinical moon. */}
        <path
          d="M16.5 10.4A6.6 6.6 0 1 1 9 3.6a5.4 5.4 0 0 0 7.5 6.8z"
          fill="currentColor"
        />
      </svg>
      <span className={cn("font-semibold tracking-tight", text)}>drift</span>
    </span>
  );
}
