import { user, tonight } from "@/lib/data/dashboard";

/**
 * Greeting block.
 *
 * Time-of-day aware in spirit — Maya opens the app at 06:14 after a night
 * shift, so "Good morning" would be wrong. "Welcome home" is the on-brand
 * choice for a night worker arriving at dawn.
 *
 * The second line tells her where she is in the rotation. The third line is
 * a one-sentence read of the next 24 hours — the kind of orientation a real
 * colleague would offer.
 */
export function Greeting({ time = "06:14" }: { time?: string }) {
  return (
    <div className="flex flex-col gap-2">
      <p className="font-mono text-caption tabular-nums tracking-wide text-ink-faint">
        {time} · {tonight.prettyDate} · {tonight.shiftLabel}
      </p>
      <h1
        className="font-medium tracking-tighter text-ink"
        style={{
          fontSize: "clamp(1.875rem, 3.6vw + 0.5rem, 2.5rem)",
          lineHeight: 1.06,
          letterSpacing: "-0.024em",
        }}
      >
        Welcome home, {user.firstName}.
      </h1>
      <p className="max-w-prose text-body-lg text-ink-muted">
        You're {tonight.shiftLabel.toLowerCase()}. Anchor sleep starts at{" "}
        <span className="font-mono tabular-nums text-ink">{tonight.anchorStart}</span>,
        nap before clock-in at{" "}
        <span className="font-mono tabular-nums text-ink">{tonight.shiftAt}</span>.
      </p>
    </div>
  );
}
