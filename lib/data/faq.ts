export type Question = {
  id: string;
  q: string;
  a: string;
};

export const faqs: Question[] = [
  {
    id: "irregular",
    q: "My shifts are completely irregular. Does this actually adapt?",
    a: "Yes. Drift doesn't assume a pattern — it builds your plan from what's on your roster this week. If you get pulled into an on-call at 02:00, you can re-plan in under a minute and Drift recalculates your debt across the next four days.",
  },
  {
    id: "wearable",
    q: "Do I need a wearable?",
    a: "No. Drift works from your roster plus a one-tap log when you wake up. If you have an Oura, Whoop, or Apple Watch, we pull sleep data automatically — but it's never required.",
  },
  {
    id: "vs-others",
    q: "How is this different from Sleep Cycle or Calm?",
    a: "Those apps assume you sleep at night. They're excellent if you do. Drift is built for the 30+ million people who don't — nurses, drivers, paramedics, gig workers, parents of newborns. Different audience, different advice.",
  },
  {
    id: "privacy",
    q: "Is my roster private?",
    a: "Yes. We never sell roster data, never share it with your employer, and you can wipe it any time. Encrypted in transit and at rest. We're not in the data business.",
  },
  {
    id: "non-shift",
    q: "I don't work shifts — I just have insomnia. Will Drift help me?",
    a: "Honestly, probably not as much as a CBT-I app or a sleep clinic would. Drift is opinionated about its audience. If your sleep problem is shift work, jet lag, or a chaotic schedule, you're in the right place. If it's classic insomnia, we'd rather point you somewhere better.",
  },
];
