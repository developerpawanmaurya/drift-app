import { cn } from "@/lib/utils";

/**
 * Onboarding progress indicator.
 *
 * Four thin segments at the top of the page. Completed and current segments
 * are filled (current at 100% length, completed at full ink-faint). Mono
 * "Step N · Title" sits above. Editorial — never a percentage, never a
 * spinning ring.
 */
export function Progress({
  step,
  total = 4,
  title,
}: {
  step: number; // 1-indexed
  total?: number;
  title: string;
}) {
  return (
    <div className="flex w-full flex-col gap-3">
      <p className="font-mono text-caption tabular-nums tracking-wide text-ink-faint">
        <span className="text-ink">Step {String(step).padStart(2, "0")}</span>
        <span className="mx-2 text-ink-faint">/</span>
        <span>{String(total).padStart(2, "0")}</span>
        <span className="mx-3 inline-block h-px w-3 align-middle bg-divider" aria-hidden />
        <span className="text-ink-muted">{title}</span>
      </p>
      <div
        className="flex items-center gap-1.5"
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={total}
        aria-valuenow={step}
        aria-label={`Step ${step} of ${total}: ${title}`}
      >
        {Array.from({ length: total }).map((_, i) => {
          const idx = i + 1;
          const completed = idx < step;
          const current = idx === step;
          return (
            <span
              key={i}
              className={cn(
                "h-[3px] flex-1 rounded-full transition-colors duration-base",
                completed && "bg-ink/70",
                current && "bg-accent-500",
                !completed && !current && "bg-divider"
              )}
            />
          );
        })}
      </div>
    </div>
  );
}
