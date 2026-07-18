import { cn } from "@/lib/utils";

/**
 * Field — labeled wrapper around an input. Editorial label treatment:
 * eyebrow-style above the input, hint text below in ink-faint.
 */
export function Field({
  label,
  hint,
  children,
  className,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label className="eyebrow">{label}</label>
      {children}
      {hint ? <p className="text-caption text-ink-faint">{hint}</p> : null}
    </div>
  );
}

const inputBase =
  "h-12 w-full rounded-lg bg-canvas px-4 text-body text-ink placeholder:text-ink-faint " +
  "shadow-[inset_0_0_0_1px_hsl(var(--divider))] " +
  "transition-shadow duration-fast ease-out-soft " +
  "focus:outline-none focus:shadow-[inset_0_0_0_1.5px_hsl(var(--accent-500)),0_0_0_3px_hsl(var(--accent-500)/0.18)] " +
  "disabled:opacity-50";

export function TextInput({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(inputBase, className)} {...props} />;
}

/**
 * TimeInput / DateInput use native pickers under the hood so iOS/Android
 * get their device-native wheels. We override appearance for the closed state.
 */
export function TimeInput({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      type="time"
      className={cn(
        inputBase,
        "font-mono tabular-nums text-[17px] tracking-tight",
        className
      )}
      {...props}
    />
  );
}

export function DateInput({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      type="date"
      className={cn(inputBase, "font-mono tabular-nums text-[15px]", className)}
      {...props}
    />
  );
}
