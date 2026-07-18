/**
 * Roster data — Maya's actual week.
 *
 * Shifts run overnight (22:00 → 06:00 next morning). We represent that with
 * an `endsNextDay: true` flag rather than storing a Date object, since the
 * timeline component is rendering hours on a single-day axis and wants
 * everything in HH:MM strings.
 *
 * Sleep windows are computed from the shift + Maya's preference for an
 * anchor-and-nap pattern; for the demo we hand-author them.
 */

export type Block = {
  kind: "shift" | "anchor" | "nap" | "free";
  start: string; // HH:MM
  end: string;
  label?: string;
  endsNextDay?: boolean;
};

export type RosterDay = {
  date: string; // YYYY-MM-DD
  label: string; // "Mon"
  dayNumber: string; // "12"
  state: "off" | "night" | "post";
  shiftLabel?: string; // "Night 2"
  active?: boolean;
  blocks: Block[];
};

export const roster: RosterDay[] = [
  {
    date: "2026-05-12",
    label: "Mon",
    dayNumber: "12",
    state: "off",
    blocks: [
      { kind: "anchor", start: "23:30", end: "07:30", endsNextDay: true, label: "Sleep" },
    ],
  },
  {
    date: "2026-05-13",
    label: "Tue",
    dayNumber: "13",
    state: "night",
    shiftLabel: "Night 1",
    blocks: [
      { kind: "anchor", start: "14:30", end: "21:30", label: "Anchor sleep" },
      { kind: "shift", start: "22:00", end: "06:00", endsNextDay: true, label: "Shift" },
    ],
  },
  {
    date: "2026-05-14",
    label: "Wed",
    dayNumber: "14",
    state: "night",
    shiftLabel: "Night 2",
    active: true,
    blocks: [
      { kind: "anchor", start: "09:30", end: "16:30", label: "Anchor sleep" },
      { kind: "nap", start: "19:30", end: "21:00", label: "Nap" },
      { kind: "shift", start: "22:00", end: "06:00", endsNextDay: true, label: "Shift" },
    ],
  },
  {
    date: "2026-05-15",
    label: "Thu",
    dayNumber: "15",
    state: "night",
    shiftLabel: "Night 3",
    blocks: [
      { kind: "anchor", start: "09:30", end: "16:30", label: "Anchor sleep" },
      { kind: "nap", start: "19:30", end: "21:00", label: "Nap" },
      { kind: "shift", start: "22:00", end: "06:00", endsNextDay: true, label: "Shift" },
    ],
  },
  {
    date: "2026-05-16",
    label: "Fri",
    dayNumber: "16",
    state: "post",
    shiftLabel: "Post-shift",
    blocks: [
      { kind: "anchor", start: "08:00", end: "13:00", label: "Recovery anchor" },
      { kind: "nap", start: "17:00", end: "17:45", label: "Top-up" },
    ],
  },
  {
    date: "2026-05-17",
    label: "Sat",
    dayNumber: "17",
    state: "off",
    blocks: [
      { kind: "anchor", start: "23:30", end: "07:30", endsNextDay: true, label: "Sleep" },
    ],
  },
  {
    date: "2026-05-18",
    label: "Sun",
    dayNumber: "18",
    state: "off",
    blocks: [
      { kind: "anchor", start: "23:00", end: "07:00", endsNextDay: true, label: "Sleep" },
    ],
  },
];

/** Detected shifts for the photo-import demo. */
export type DetectedShift = {
  id: string;
  date: string;
  prettyDate: string;
  start: string;
  end: string;
  durationLabel: string;
  /** Confidence 0–1 — gives the UI a small "low confidence, please check" affordance. */
  confidence: number;
};

export const detectedShifts: DetectedShift[] = [
  {
    id: "det-1",
    date: "2026-05-19",
    prettyDate: "Mon 19 May",
    start: "22:00",
    end: "06:00",
    durationLabel: "8h",
    confidence: 0.98,
  },
  {
    id: "det-2",
    date: "2026-05-20",
    prettyDate: "Tue 20 May",
    start: "22:00",
    end: "06:00",
    durationLabel: "8h",
    confidence: 0.98,
  },
  {
    id: "det-3",
    date: "2026-05-22",
    prettyDate: "Thu 22 May",
    start: "14:00",
    end: "22:00",
    durationLabel: "8h",
    confidence: 0.94,
  },
  {
    id: "det-4",
    date: "2026-05-23",
    prettyDate: "Fri 23 May",
    start: "14:00",
    end: "22:00",
    durationLabel: "8h",
    confidence: 0.72, // low — UI surfaces a "please check" cue
  },
  {
    id: "det-5",
    date: "2026-05-25",
    prettyDate: "Sun 25 May",
    start: "06:00",
    end: "14:00",
    durationLabel: "8h",
    confidence: 0.91,
  },
];
