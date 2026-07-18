import { cn } from "@/lib/utils";

/**
 * SectionHeading — the standard section opener.
 * Eyebrow + heading + optional lede. Used across Problem, How it works,
 * Features, Pricing, FAQ. Kept narrow (max-w-2xl) for editorial measure.
 */
export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = "start",
  className,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
  align?: "start" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      <p className="eyebrow">{eyebrow}</p>
      <h2
        className="mt-3 font-medium tracking-tighter text-ink"
        style={{
          fontSize: "clamp(1.625rem, 3vw + 0.5rem, 2.25rem)",
          lineHeight: 1.12,
          letterSpacing: "-0.02em",
        }}
      >
        {title}
      </h2>
      {lede ? (
        <p className="mt-4 text-body-lg text-ink-muted">{lede}</p>
      ) : null}
    </div>
  );
}
