"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "rounded-[10px] font-semibold tracking-tight",
    "transition-[background-color,color,box-shadow,transform] duration-fast ease-out-soft",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-paper",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:size-4 [&_svg]:shrink-0",
  ].join(" "),
  {
    variants: {
      variant: {
        primary:
          "bg-accent-600 text-white shadow-[inset_0_-1px_0_hsl(var(--accent-700)/0.6),0_1px_2px_hsl(var(--ink)/0.08)] hover:bg-accent-700 active:bg-accent-700 active:translate-y-[0.5px]",
        ghost: "bg-transparent text-ink hover:bg-sunken active:bg-divider",
        outline:
          "bg-canvas text-ink shadow-hairline hover:bg-canvas-soft hover:shadow-sm active:bg-sunken",
      },
      size: {
        sm: "h-9 px-3.5 text-body-sm",
        md: "h-11 px-5 text-[15px]",
        lg: "h-12 px-6 text-body",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
