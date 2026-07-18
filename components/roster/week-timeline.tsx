"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Pencil, MoreHorizontal } from "lucide-react";

import { roster, type RosterDay, type Block } from "@/lib/data/roster";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * WeekTimeline — seven days, each with a 24-hour strip on a single axis.
 *
 * Layout note: the timeline starts at 06:00, not 00:00, so anchor sleep
 * (a long block in Maya's 09:30 → 16:30 day) reads as a continuous bar
 * instead of being split across the midnight wrap.
 *
 * Click a day → opens an inline editor that shows the shift and lets you
 * tweak start / end. This is the page's micro-interaction.
 */
export function WeekTimeline() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="rounded-2xl bg-canvas shadow-[inset_0_0_0_1px_hsl(var(--divider)),0_1px_2px_hsl(var(--ink)/0.04)]">
      {/* Hour ruler */}
      <div className="hidden md:block">
        <div className="grid grid-cols-[112px_1fr] gap-4 border-b border-divider px-5 py-3">
          <span className="text-caption text-ink-faint">Day</span>
          <HourRuler />
        </div>
      </div>

      <ul className="divide-y divide-divider">
        {roster.map((day) => (
          <DayRow
            key={day.date}
            day={day}
            open={openId === day.date}
            onToggle={() =>
              setOpenId((prev) => (prev === day.date ? null : day.date))
            }
          />
        ))}
      </ul>
    </div>
  );
}

function HourRuler() {
  return (
    <div className="grid grid-cols-8 text-[10px] font-mono tabular-nums text-ink-faint">
      {["06", "09", "12", "15", "18", "21", "00", "03"].map((h) => (
        <span key={h}>{h}</span>
      ))}
    </div>
  );
}

function DayRow({
  day,
  open,
  onToggle,
}: {
  day: RosterDay;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <li
      className={cn(
        "transition-colors",
        day.active && "bg-accent-50/50",
        open && "bg-canvas-soft"
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-label={`Edit ${day.label} ${day.dayNumber}`}
        className="grid w-full grid-cols-[1fr] gap-3 px-5 py-4 text-left transition-colors hover:bg-canvas-soft md:grid-cols-[112px_1fr] md:gap-4 md:py-3"
      >
        {/* Day label */}
        <div className="flex items-center gap-3 md:gap-2">
          <div className="flex w-12 flex-col items-start">
            <span
              className={cn(
                "text-[10px] font-medium uppercase tracking-wider",
                day.active ? "text-accent-700" : "text-ink-faint"
              )}
            >
              {day.label}
            </span>
            <span className="font-mono text-[20px] font-medium tabular-nums leading-tight tracking-tight text-ink">
              {day.dayNumber}
            </span>
          </div>
          {day.shiftLabel ? (
            <span className="rounded-full bg-sunken px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-ink-muted">
              {day.shiftLabel}
            </span>
          ) : (
            <span className="text-caption text-ink-faint">Off</span>
          )}
        </div>

        {/* Timeline strip */}
        <Strip blocks={day.blocks} />
      </button>

      <AnimatePresence initial={false}>
        {open ? <EditorPanel day={day} /> : null}
      </AnimatePresence>
    </li>
  );
}

/**
 * Strip — the 24h bar for a single day. Time axis starts at 06:00 (so an
 * anchor sleep window doesn't wrap across midnight).
 */
function Strip({ blocks }: { blocks: Block[] }) {
  return (
    <div className="relative h-7 w-full overflow-hidden rounded-md bg-sunken">
      {blocks.map((b, i) => {
        const { left, width } = stripGeometry(b);
        return (
          <div
            key={i}
            className={cn(
              "absolute top-0 h-full",
              blockFill(b.kind),
              b.kind === "anchor" || b.kind === "nap" ? "border-y border-paper/0" : ""
            )}
            style={{ left: `${left}%`, width: `${width}%` }}
            title={b.label}
          />
        );
      })}
    </div>
  );
}

function blockFill(kind: Block["kind"]) {
  return {
    shift: "bg-accent-500",
    anchor: "bg-ink/85",
    nap: "bg-ink/65",
    free: "bg-transparent",
  }[kind];
}

/**
 * Translate a block's HH:MM start/end into left/width % on a 24h strip that
 * starts at 06:00. Anything before 06:00 wraps to the end of the strip.
 */
function stripGeometry(b: Block) {
  const startHr = hours(b.start);
  const endHr = hours(b.end) + (b.endsNextDay ? 24 : 0);
  // Re-center start so 06:00 = 0
  const start = (startHr - 6 + 24) % 24;
  const end = start + (endHr - startHr);
  return {
    left: (start / 24) * 100,
    width: ((end - start) / 24) * 100,
  };
}
function hours(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  return h + m / 60;
}

/**
 * EditorPanel — the inline edit drawer that animates open below a row.
 * Doesn't actually persist edits (no backend) — but it shows the editing
 * affordances we'd give Maya, and a "Re-plan tonight" CTA that's the
 * implied micro-interaction.
 */
function EditorPanel({ day }: { day: RosterDay }) {
  const shift = day.blocks.find((b) => b.kind === "shift");
  if (!shift) {
    return (
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        className="overflow-hidden"
      >
        <div className="grid grid-cols-[1fr] gap-3 px-5 pb-5 md:grid-cols-[112px_1fr] md:gap-4">
          <span />
          <p className="text-body-sm text-ink-muted">
            No shift on this day. Sleep is planned around your preferred wake time.
          </p>
        </div>
      </motion.div>
    );
  }
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
      className="overflow-hidden"
    >
      <div className="grid grid-cols-[1fr] gap-3 px-5 pb-5 md:grid-cols-[112px_1fr] md:gap-4">
        <span />
        <div className="flex flex-col gap-4 rounded-xl bg-canvas p-5 shadow-hairline">
          <div className="flex items-center justify-between">
            <p className="text-caption font-medium uppercase tracking-wider text-ink-faint">
              {day.label} {day.dayNumber} · shift
            </p>
            <Button variant="ghost" size="sm" aria-label="More options">
              <MoreHorizontal className="size-4" aria-hidden />
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <ReadoutField label="Clock in" value={shift.start} />
            <ReadoutField label="Clock out" value={shift.end} />
          </div>

          <p className="text-body-sm text-ink-muted">
            Drift will re-plan tonight's sleep window if you change either time.
            The change ripples forward into your debt forecast.
          </p>

          <div className="flex flex-wrap items-center gap-2">
            <Button size="sm">
              <Pencil className="size-3.5" aria-hidden />
              Edit shift
            </Button>
            <Button variant="ghost" size="sm">Mark as swapped</Button>
            <Button variant="ghost" size="sm">Cancel shift</Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ReadoutField({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-canvas-soft p-3 shadow-hairline">
      <p className="text-[10px] font-medium uppercase tracking-wider text-ink-faint">
        {label}
      </p>
      <p className="mt-1 font-mono text-[18px] font-medium tabular-nums tracking-tight text-ink">
        {value}
      </p>
    </div>
  );
}
