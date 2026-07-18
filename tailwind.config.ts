/**
 * Drift — Tailwind config
 * ----------------------------------------------------------------------------
 * Design system: "Low-lamp" palette + humanist sans with mono numerics.
 *
 * Tokens are declared as HSL channels in `app/globals.css` and consumed here
 * via `hsl(var(--token) / <alpha-value>)`. This keeps Tailwind's alpha
 * modifier syntax working (e.g. `bg-paper/60`, `text-ink/80`) while letting
 * us swap a single set of CSS vars for theming later.
 *
 * Naming convention (deliberate):
 *   Surfaces  paper / canvas / canvas-soft / sunken / divider
 *   Type      ink / ink-muted / ink-faint / ink-disabled
 *   Brand     accent-50..700 (warm amber-terracotta)  + cool-50..700 (slate)
 *   Status    success / warning / error / info
 *
 * shadcn's expected aliases (background, foreground, primary, …) are mapped
 * onto the same tokens so its components inherit our palette without forks.
 */

import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem", // 20px — tighter than shadcn default; mobile-first
        sm: "1.5rem",
        lg: "2rem",
        xl: "3rem",
      },
      screens: {
        "2xl": "1280px", // we cap content earlier than Tailwind default — editorial
      },
    },
    extend: {
      /* ---------- COLOR ---------- */
      colors: {
        // Surface stack
        paper: "hsl(var(--paper) / <alpha-value>)",
        canvas: "hsl(var(--canvas) / <alpha-value>)",
        "canvas-soft": "hsl(var(--canvas-soft) / <alpha-value>)",
        sunken: "hsl(var(--sunken) / <alpha-value>)",
        divider: "hsl(var(--divider) / <alpha-value>)",

        // Type
        ink: {
          DEFAULT: "hsl(var(--ink) / <alpha-value>)",
          muted: "hsl(var(--ink-muted) / <alpha-value>)",
          faint: "hsl(var(--ink-faint) / <alpha-value>)",
          disabled: "hsl(var(--ink-disabled) / <alpha-value>)",
        },

        // Brand — warm "low-lamp" amber/terracotta
        accent: {
          50: "hsl(var(--accent-50) / <alpha-value>)",
          100: "hsl(var(--accent-100) / <alpha-value>)",
          200: "hsl(var(--accent-200) / <alpha-value>)",
          300: "hsl(var(--accent-300) / <alpha-value>)",
          400: "hsl(var(--accent-400) / <alpha-value>)",
          500: "hsl(var(--accent-500) / <alpha-value>)", // primary CTA
          600: "hsl(var(--accent-600) / <alpha-value>)", // hover
          700: "hsl(var(--accent-700) / <alpha-value>)", // pressed / text on light
          DEFAULT: "hsl(var(--accent-500) / <alpha-value>)",
        },

        // Cool counterpoint — used for sleep-data viz where amber would alarm
        cool: {
          50: "hsl(var(--cool-50) / <alpha-value>)",
          100: "hsl(var(--cool-100) / <alpha-value>)",
          300: "hsl(var(--cool-300) / <alpha-value>)",
          500: "hsl(var(--cool-500) / <alpha-value>)",
          700: "hsl(var(--cool-700) / <alpha-value>)",
          DEFAULT: "hsl(var(--cool-500) / <alpha-value>)",
        },

        // Status — muted, never neon. Health context.
        success: "hsl(var(--success) / <alpha-value>)",
        warning: "hsl(var(--warning) / <alpha-value>)",
        error: "hsl(var(--error) / <alpha-value>)",
        info: "hsl(var(--info) / <alpha-value>)",

        // --- shadcn aliases (so shadcn components inherit our palette) ---
        background: "hsl(var(--paper) / <alpha-value>)",
        foreground: "hsl(var(--ink) / <alpha-value>)",
        card: {
          DEFAULT: "hsl(var(--canvas) / <alpha-value>)",
          foreground: "hsl(var(--ink) / <alpha-value>)",
        },
        popover: {
          DEFAULT: "hsl(var(--canvas) / <alpha-value>)",
          foreground: "hsl(var(--ink) / <alpha-value>)",
        },
        primary: {
          DEFAULT: "hsl(var(--accent-500) / <alpha-value>)",
          foreground: "hsl(var(--paper) / <alpha-value>)",
        },
        secondary: {
          DEFAULT: "hsl(var(--sunken) / <alpha-value>)",
          foreground: "hsl(var(--ink) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--sunken) / <alpha-value>)",
          foreground: "hsl(var(--ink-faint) / <alpha-value>)",
        },
        destructive: {
          DEFAULT: "hsl(var(--error) / <alpha-value>)",
          foreground: "hsl(var(--paper) / <alpha-value>)",
        },
        border: "hsl(var(--divider) / <alpha-value>)",
        input: "hsl(var(--divider) / <alpha-value>)",
        ring: "hsl(var(--accent-500) / <alpha-value>)",
      },

      /* ---------- TYPOGRAPHY ---------- */
      fontFamily: {
        // Plus Jakarta Sans — humanist warmth, disciplined enough for UI
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        // JetBrains Mono — used for durations, dates, counts. Tabular by default.
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      // Editorial scale. Mobile-first numbers; display sizes scale via clamp() in CSS.
      fontSize: {
        micro: ["0.6875rem", { lineHeight: "0.875rem", letterSpacing: "0.04em" }], // 11/14
        caption: ["0.8125rem", { lineHeight: "1.125rem", letterSpacing: "0.01em" }], // 13/18
        "body-sm": ["0.875rem", { lineHeight: "1.375rem" }], // 14/22
        body: ["1rem", { lineHeight: "1.625rem" }], // 16/26
        "body-lg": ["1.0625rem", { lineHeight: "1.75rem" }], // 17/28
        h4: ["1.125rem", { lineHeight: "1.625rem", letterSpacing: "-0.005em" }], // 18/26
        h3: ["1.25rem", { lineHeight: "1.75rem", letterSpacing: "-0.01em" }], // 20/28
        h2: ["1.625rem", { lineHeight: "2rem", letterSpacing: "-0.015em" }], // 26/32
        h1: ["2rem", { lineHeight: "2.375rem", letterSpacing: "-0.02em" }], // 32/38
        "display-lg": ["2.25rem", { lineHeight: "2.625rem", letterSpacing: "-0.022em" }], // 36/42
        "display-xl": ["2.75rem", { lineHeight: "3.125rem", letterSpacing: "-0.024em" }], // 44/50
        "display-2xl": ["3.5rem", { lineHeight: "3.75rem", letterSpacing: "-0.028em" }], // 56/60
      },
      fontWeight: {
        // Plus Jakarta Sans variable axis. We use a tight range — no extra-bolds.
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
      },
      letterSpacing: {
        // Editorial display tracking — slightly negative on big type
        tightest: "-0.028em",
        tighter: "-0.02em",
        tight: "-0.012em",
        normal: "0em",
        wide: "0.04em",    // for caps eyebrows
        wider: "0.08em",   // for tiny eyebrows
      },

      /* ---------- SPACING / RADIUS / SHADOW ---------- */
      borderRadius: {
        // Editorial restraint — mid radii, never pillowy.
        none: "0",
        xs: "2px",
        sm: "4px",
        md: "8px",
        lg: "12px", // default for cards
        xl: "16px",
        "2xl": "20px",
        "3xl": "28px",
        full: "9999px",
      },
      boxShadow: {
        // Linear-style: soft, near-invisible. The card does most of the work.
        xs: "0 1px 2px 0 hsl(var(--ink) / 0.04)",
        sm: "0 2px 6px -2px hsl(var(--ink) / 0.06), 0 1px 2px hsl(var(--ink) / 0.04)",
        md: "0 8px 24px -8px hsl(var(--ink) / 0.10), 0 2px 4px hsl(var(--ink) / 0.04)",
        lg: "0 16px 48px -16px hsl(var(--ink) / 0.14), 0 4px 8px hsl(var(--ink) / 0.04)",
        // Quiet ring used on focused inputs and primary buttons
        ring: "0 0 0 3px hsl(var(--accent-500) / 0.18)",
        "ring-cool": "0 0 0 3px hsl(var(--cool-500) / 0.18)",
        // Inset hairline — for the editorial "card on paper" look
        hairline: "inset 0 0 0 1px hsl(var(--divider) / 1)",
      },

      /* ---------- MOTION ---------- */
      transitionTimingFunction: {
        // Custom easings. Linear's bread and butter.
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        "out-soft": "cubic-bezier(0.22, 1, 0.36, 1)",
        "in-out-soft": "cubic-bezier(0.65, 0, 0.35, 1)",
      },
      transitionDuration: {
        instant: "80ms",
        fast: "160ms",
        base: "220ms",
        slow: "360ms",
        slower: "560ms",
      },
      keyframes: {
        // Quiet entrance — used on cards/hero on first load
        "rise-in": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        // Soft breath — used on the sleep-debt ring while idle
        breath: {
          "0%, 100%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.015)", opacity: "0.92" },
        },
        // Marquee for the testimonial strip
        "scroll-x": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        // shadcn accordion compatibility
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "rise-in": "rise-in 560ms cubic-bezier(0.16, 1, 0.3, 1) both",
        breath: "breath 4.8s ease-in-out infinite",
        "scroll-x": "scroll-x 40s linear infinite",
        "accordion-down": "accordion-down 220ms cubic-bezier(0.22, 1, 0.36, 1)",
        "accordion-up": "accordion-up 220ms cubic-bezier(0.22, 1, 0.36, 1)",
      },

      /* ---------- MISC ---------- */
      maxWidth: {
        // Editorial measure — body text caps around 64ch for readability
        prose: "64ch",
        // Marketing content max — narrower than Tailwind default
        content: "1180px",
      },
      backgroundImage: {
        // Paper grain — applied at very low opacity on hero surfaces
        grain:
          "radial-gradient(hsl(var(--ink) / 0.04) 1px, transparent 1px)",
        // Lamp-glow used behind the hero device mock
        lamp:
          "radial-gradient(60% 50% at 50% 40%, hsl(var(--accent-200) / 0.55), transparent 70%)",
      },
      backgroundSize: {
        grain: "3px 3px",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
};

export default config;
