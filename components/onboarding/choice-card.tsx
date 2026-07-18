"use client";

import { Check, type LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

export type Choice<T extends string = string> = {
  value: T;
  title: string;
  description: string;
  /** Optional left-side icon component (any Lucide icon). */
  icon?: LucideIcon;
};

/**
 * ChoiceCard / ChoiceGroup — single-select card list.
 *
 * Built as a real radio-group via hidden native inputs + label cards, so
 * keyboard navigation (arrow keys, space to select) works for free.
 * Selected state: amber-tinted bg, accent border, small check pill.
 */
export function ChoiceGroup<T extends string>({
  name,
  value,
  onChange,
  choices,
  className,
}: {
  name: string;
  value: T | null;
  onChange: (v: T) => void;
  choices: Choice<T>[];
  className?: string;
}) {
  return (
    <div role="radiogroup" aria-label={name} className={cn("grid gap-3", className)}>
      {choices.map((c) => {
        const selected = value === c.value;
        const id = `${name}-${c.value}`;
        const Icon = c.icon;
        return (
          <label
            key={c.value}
            htmlFor={id}
            className={cn(
              "group relative flex cursor-pointer items-start gap-4 rounded-xl bg-canvas p-5",
              "transition-[box-shadow,background-color,transform] duration-fast ease-out-soft",
              "shadow-[inset_0_0_0_1px_hsl(var(--divider)),0_1px_2px_hsl(var(--ink)/0.04)]",
              "hover:shadow-[inset_0_0_0_1px_hsl(var(--ink)/0.3),0_2px_6px_-2px_hsl(var(--ink)/0.08)]",
              "has-[:focus-visible]:shadow-[inset_0_0_0_1.5px_hsl(var(--accent-500)),0_0_0_3px_hsl(var(--accent-500)/0.18)]",
              selected &&
                "bg-accent-50 shadow-[inset_0_0_0_1.5px_hsl(var(--accent-500)),0_2px_6px_-2px_hsl(var(--accent-500)/0.12)] hover:shadow-[inset_0_0_0_1.5px_hsl(var(--accent-500)),0_2px_6px_-2px_hsl(var(--accent-500)/0.12)]"
            )}
          >
            <input
              type="radio"
              id={id}
              name={name}
              value={c.value}
              checked={selected}
              onChange={() => onChange(c.value)}
              className="sr-only"
            />

            {Icon ? (
              <span
                className={cn(
                  "mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg",
                  selected ? "bg-accent-100" : "bg-sunken"
                )}
              >
                <Icon
                  className={cn(
                    "size-[18px] transition-colors",
                    selected ? "text-accent-700" : "text-ink-muted"
                  )}
                  aria-hidden
                />
              </span>
            ) : null}

            <div className="min-w-0 flex-1">
              <p className="text-body font-medium tracking-tight text-ink">
                {c.title}
              </p>
              <p className="mt-1 text-body-sm leading-relaxed text-ink-muted">
                {c.description}
              </p>
            </div>

            <span
              className={cn(
                "mt-1 flex size-5 shrink-0 items-center justify-center rounded-full transition-all",
                selected
                  ? "bg-accent-500 text-white"
                  : "border border-divider bg-canvas"
              )}
              aria-hidden
            >
              {selected ? <Check className="size-3" strokeWidth={3} /> : null}
            </span>
          </label>
        );
      })}
    </div>
  );
}
