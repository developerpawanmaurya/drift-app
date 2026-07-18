# Drift — Design System

A sleep coach for night-shift nurses, drivers, and gig workers.
Mobile-first. Editorial restraint. Warm, never preachy.

---

## 1. Brand voice

Three adjectives: **calm, grounded, quietly confident.**

Drift talks like a colleague at the end of a long shift — someone who has been awake at 4am themselves and is past needing to perform. It does not coach, scold, or chirp. It names what the user is feeling, gives them one useful thing, and gets out of the way. When it celebrates, it does so softly. When it warns, it does so directly.

Two sentences in voice:

> "Your roster shifted again. Here's a sleep plan that fits the next four nights — not the textbook one."
> "Two short sleeps today, in this order, will leave you in better shape for tomorrow's drive than one long one. Here's why."

What this rules out: exclamation marks, emoji as punctuation, hype words ("amazing", "rockstar", "let's crush it"), guilt phrasing ("don't be lazy"), and the chirpy second-person of generic wellness apps.

---

## 2. Color — "Low-lamp"

The mood is a reading lamp at a bedside table during the day, not a clinical white. Warm off-white paper, near-black warm ink, one disciplined amber-terracotta accent. A cool slate counterpoint exists only for data viz where the amber would feel like an alert.

### Surfaces

| Token | Hex | Use |
|---|---|---|
| `paper` | `#FBF8F4` | Page background. The "lit room." |
| `canvas` | `#FFFFFF` | Cards, modals — the surface that catches the light. |
| `canvas-soft` | `#FDFCF9` | Secondary cards (nested). |
| `sunken` | `#F4EFE7` | Inputs, muted sections, hover fills. |
| `divider` | `#E8E1D5` | Hairline borders. Used liberally; shadows used sparingly. |

### Ink (type)

| Token | Hex | Use |
|---|---|---|
| `ink` | `#1B1714` | Body, headings. Warm near-black, never `#000`. |
| `ink-muted` | `#5A5249` | Secondary copy, labels. |
| `ink-faint` | `#746D63` | Captions, timestamps, eyebrows. (Darkened from `#8B8377` so 13px captions clear AA — see Contrast note.) |
| `ink-disabled` | `#C2BBAF` | Disabled state. |

### Brand — amber

A single accent. Used confidently for primary actions, the sleep-debt ring, and the "tonight's plan" pulse. Never gradients-for-decoration; gradients only when they encode meaning (a glow indicating "in progress").

| Token | Hex | Use |
|---|---|---|
| `accent-50` | `#FAF1E6` | Pale wash, selected backgrounds. |
| `accent-100` | `#F4E4D4` | Chips, badge fills. |
| `accent-200` | `#E9C9A8` | Lamp glow gradient. |
| `accent-300` | `#DDA978` | Illustration. |
| `accent-400` | `#D08A4F` | Illustration shadow. |
| `accent-500` | `#C76A2F` | **Primary CTA.** |
| `accent-600` | `#A55624` | Hover. |
| `accent-700` | `#7E4119` | Pressed; text on amber-100. |

### Cool counterpoint — slate

| Token | Hex | Use |
|---|---|---|
| `cool-100` | `#E1E6EF` | Chart grid, "asleep" bands. |
| `cool-500` | `#5A6B85` | Secondary data series, neutral icons. |
| `cool-700` | `#3C4A60` | Strong cool emphasis. |

### Status — muted, never neon

| Token | Hex | Use |
|---|---|---|
| `success` | `#4F7A4A` | "Plan complete." Moss, not lime. |
| `warning` | `#93671A` | Real but non-urgent caution. (Darkened from `#B07A1F` to clear AA as small delta text.) |
| `error` | `#A8453A` | Destructive actions, true errors. Terracotta. |
| `info` | `#4A6B85` | Tips and informational toasts. |

**Contrast (measured, WCAG 2.1).** All values below were computed and verified, not estimated:

- `ink` on `paper` — **16.82:1** (AA + AAA).
- `ink-muted` on `paper` — **7.24:1** (AA + AAA).
- `ink-faint` (`#746D63`) on `paper` — **4.83:1** (AA normal text). This is why the token was darkened from the original `#8B8377` (which was only 3.54:1 and failed for 13px captions).
- Primary button: white on `accent-600` — **5.31:1** (AA). The button uses `accent-600`, not `accent-500`, precisely because white on `accent-500` is only 3.80:1.
- `warning` (`#93671A`) as small text on `canvas` — **5.01:1** (AA). Darkened from `#B07A1F` (3.72:1).
- Destructive button: white on `error` — **5.87:1** (AA).
- Chips: `accent-700` on `accent-100` — **6.36:1** (AA + AAA).

`accent-500` is retained for non-text uses (chart lines, the sleep-debt ring, the timeline shift block, the "tonight" pulse), where the 3:1 non-text threshold applies and is met.

---

## 3. Typography

Two Google Fonts. Plus Jakarta Sans (variable) carries display and body. JetBrains Mono carries numerics — sleep durations, dates, debt counts. Numbers are the product; giving them a distinct voice is intentional, not decorative.

```
Display + Body  →  Plus Jakarta Sans 400 / 500 / 600 / 700
Numerics        →  JetBrains Mono 400 / 500
```

**Why this pair, not all-Geist:** Jakarta has just enough humanist warmth to feel personal without becoming friendly-to-a-fault. Pairing it with a strict mono for numerics makes the data feel measured (not "fun"), which earns trust in a health context. Twin-Geist would have looked like every other YC SaaS deck this year.

### Scale (rem on 16px base)

| Token | Size / line | Tracking | Use |
|---|---|---|---|
| `display-2xl` | 56 / 60 | -0.028em | Desktop hero. |
| `display-xl` | 44 / 50 | -0.024em | Mobile hero. |
| `display-lg` | 36 / 42 | -0.022em | Section heads on desktop. |
| `h1` | 32 / 38 | -0.020em | Mobile section heads, dashboard hero metric label. |
| `h2` | 26 / 32 | -0.015em | Card titles. |
| `h3` | 20 / 28 | -0.010em | Module titles. |
| `h4` | 18 / 26 | -0.005em | Field group headings. |
| `body-lg` | 17 / 28 | 0 | Marketing body, onboarding prose. |
| `body` | 16 / 26 | 0 | App body, controls. |
| `body-sm` | 14 / 22 | 0 | Secondary, helper text. |
| `caption` | 13 / 18 | +0.01em | Timestamps, axis labels. |
| `micro` | 11 / 14 | +0.04em uppercase | Eyebrows, status pills. |

The hero `display` uses `clamp(2.25rem, 6vw + 0.5rem, 3.5rem)` so it grows fluidly between mobile and desktop without a jarring breakpoint.

### Numeric treatment

- All durations render in mono with tabular figures: `7h 12m`, `–2h 40m`.
- Times use mono small caps: `04:18`, never `4:18 AM` — 24-hour by default (it's a shift-worker product; their phones are already in 24-hour mode).
- Dates: `Tue · 14 May` in body sans, day-of-week in `ink-faint`, date in `ink`.

---

## 4. Spacing, radius, shadow

**Spacing** — Tailwind's 4px scale, used as a real rhythm:
- 4 / 8 / 12 / 16 / 20 / 24 — within components
- 32 / 48 — between sections on mobile
- 64 / 96 — between sections on desktop

Editorial rule of thumb: a card has 24px (`p-6`) internal padding on mobile, 32px (`p-8`) on desktop. Always.

**Radius** — Mid radii. Cards `12px` (`rounded-lg`). Inputs `8px` (`rounded-md`). Buttons `10px` (custom, via `rounded-[10px]`). Pills `9999px`. Nothing larger than `20px` except the lamp-glow gradient.

**Shadow** — Near-invisible. The hairline border carries the weight; shadow only suggests elevation.
- `shadow-xs` — default for surfaces.
- `shadow-sm` — hover state on cards.
- `shadow-md` — popovers, dropdowns.
- `shadow-lg` — modals only.

**Hairline border discipline.** Every card has a `1px` inset border in `divider`. Two cards next to each other should share their seam (no doubled borders).

---

## 5. Motion

Three easings, three durations. That's it.

| Use | Easing | Duration |
|---|---|---|
| Hover/press feedback | `out-soft` | `fast` (160ms) |
| Card and content entrance | `out-expo` | `slow` (360ms) |
| Page transitions, route reveals | `out-expo` | `slower` (560ms) |

The sleep-debt ring uses a 4.8s `breath` cycle, scale 1 → 1.015 → 1. Subtle enough that you only notice it after looking at the dashboard for ten seconds.

**Reduced motion.** Globally honored in `globals.css`. All non-essential animation collapses to 0.001ms.

---

## 6. Do / don't

**Do**
- Lead with the user's reality: their shift, their fatigue, their next sleep window. Generic stats come second, if at all.
- Use mono for every number. It's the system's signature.
- Let whitespace do work. If a screen feels crowded, the answer is almost always "fewer elements," not "smaller fonts."
- Respect 24-hour time. Default to it; offer 12-hour only as a preference.
- Treat the amber accent as scarce. One per screen, ideally.

**Don't**
- No purple-to-pink gradients, ever. No neon. No "wellness pastel."
- No emoji in product copy. Lucide icons only.
- No hype words. No "amazing," "let's go," "you crushed it."
- No clinical white (`#FFFFFF`) as the page background — it always sits on warm paper.
- No mixing the amber accent with the cool slate accent in the same chart. They're for different jobs.
- No drop shadows doing the work that a border should do.

---

## 7. File map (Phase 1 deliverables)

```
/DESIGN_SYSTEM.md   ← this file (will move to /docs/ once scaffolded)
/tailwind.config.ts ← target: project root
/globals.css        ← target: app/globals.css
```

After Phase 1 approval, Phase 2 sets up the Next.js project and these files land in their proper homes.
