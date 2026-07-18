/**
 * Dashboard mock data.
 *
 * One user (Maya Trezona — same name as the lead testimonial, kept on purpose
 * so the demo carries continuity from landing to product). It's 06:14 on
 * Wednesday May 14, 2026; she just finished the third of four night shifts.
 *
 * Times are stored as plain HH:MM strings — no Date objects — because the
 * dashboard doesn't need timezone math and string times are easier to render
 * with mono tabular numerics.
 */

export type User = {
  firstName: string;
  fullName: string;
  initials: string;
  role: string;
  city: string;
};

export const user: User = {
  firstName: "Maya",
  fullName: "Maya Trezona",
  initials: "MT",
  role: "ICU charge nurse",
  city: "Adelaide",
};

export type TonightPlan = {
  date: string; // ISO yyyy-mm-dd
  prettyDate: string; // "Wed · 14 May"
  shiftLabel: string; // "Day 3 of 4 nights"
  shiftAt: string; // "22:00"
  windDownAt: string;
  anchorStart: string;
  anchorEnd: string;
  napStart: string;
  napEnd: string;
  totalLabel: string; // "7h 30m total"
  patternLabel: string; // "anchor + nap"
  reasoning: string;
};

export const tonight: TonightPlan = {
  date: "2026-05-14",
  prettyDate: "Wed · 14 May",
  shiftLabel: "Day 3 of 4 nights",
  shiftAt: "22:00",
  windDownAt: "09:00",
  anchorStart: "09:30",
  anchorEnd: "16:30",
  napStart: "19:30",
  napEnd: "21:00",
  totalLabel: "7h 30m total",
  patternLabel: "anchor + nap",
  reasoning:
    "You've responded better to the anchor-and-nap pattern than a single 8h block on back-to-back nights. Last cycle's debt cleared two days faster.",
};

export type DebtPoint = { day: number; hours: number };
export const debtSeries: DebtPoint[] = [
  { day: 1, hours: -1.2 },
  { day: 2, hours: -2.4 },
  { day: 3, hours: -3.5 },
  { day: 4, hours: -3.1 },
  { day: 5, hours: -4.6 },
  { day: 6, hours: -5.2 },
  { day: 7, hours: -4.1 },
  { day: 8, hours: -3.6 },
  { day: 9, hours: -3.9 },
  { day: 10, hours: -3.2 },
  { day: 11, hours: -2.4 },
  { day: 12, hours: -2.6 },
  { day: 13, hours: -2.7 },
  { day: 14, hours: -2.4 },
];

export type WeekDay = {
  label: string;
  date: string;
  state: "off" | "night" | "post" | "day";
  note: string;
  active?: boolean;
};

export const week: WeekDay[] = [
  { label: "Mon", date: "12", state: "off", note: "Recovery" },
  { label: "Tue", date: "13", state: "night", note: "Night 1" },
  { label: "Wed", date: "14", state: "night", note: "Night 2", active: true },
  { label: "Thu", date: "15", state: "night", note: "Night 3" },
  { label: "Fri", date: "16", state: "post", note: "Post-shift" },
  { label: "Sat", date: "17", state: "off", note: "Off" },
  { label: "Sun", date: "18", state: "off", note: "Off" },
];

export type SleepLog = {
  date: string;
  prettyDate: string;
  start: string; // when she got into bed
  end: string;
  durationLabel: string;
  planned: string;
  delta: string; // "-26m" or "+12m"
  qualityScore: number; // 0-100
  note: string;
};

export const lastSleep: SleepLog = {
  date: "2026-05-13",
  prettyDate: "Tue · 13 May",
  start: "06:14",
  end: "12:48",
  durationLabel: "6h 34m",
  planned: "7h 00m",
  delta: "−26m",
  qualityScore: 78,
  note:
    "Twenty-six minutes short. Caught most of it back with the afternoon nap before clock-in.",
};
