"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Accordion — restyled for the FAQ section.
 * - Uses a + / × icon (rotates 45deg) instead of shadcn's default chevron.
 * - Items separated by hairlines, not boxes — fits the editorial paper-and-ink feel.
 */
const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("border-b border-divider", className)}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "group flex flex-1 items-center justify-between gap-6 py-5 text-left",
        "text-h4 font-medium text-ink",
        "transition-colors duration-fast ease-out-soft",
        "hover:text-accent-700",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-paper",
        "[&[data-state=open]>svg]:rotate-45",
        className
      )}
      {...props}
    >
      {children}
      <Plus
        className="size-5 shrink-0 text-ink-faint transition-transform duration-base ease-out-soft group-hover:text-accent-500"
        aria-hidden="true"
      />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = "AccordionTrigger";

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-body text-ink-muted data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn("pb-6 pr-12 leading-relaxed", className)}>{children}</div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = "AccordionContent";

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
