/**
 * Three pain points for the landing-page "Problem" section.
 * Written in the user's voice, not Drift's. Italic line is the felt experience;
 * the body line is the structural critique.
 */
export type Problem = {
  id: string;
  title: string;
  felt: string;
  body: string;
};

export const problems: Problem[] = [
  {
    id: "wind-down",
    title: "The 9pm wind-down.",
    felt: "Apps tell you to dim the lights at 9pm. You clock in at 9pm.",
    body: "Standard sleep advice doesn't survive contact with a real roster. It assumes the world goes quiet when it doesn't.",
  },
  {
    id: "tracked-not-coached",
    title: "Tracked, not coached.",
    felt: "Last night's score was 64. Now what?",
    body: "The sleep-tracking industry sells you the data and skips the part where someone actually tells you what to do tomorrow.",
  },
  {
    id: "shame-loop",
    title: "The shame loop.",
    felt: "Every chirpy “you missed your goal” notification arrives at the worst possible moment.",
    body: "Wellness apps assume you chose this schedule. You didn't — your roster did. Drift is built around that fact.",
  },
];
