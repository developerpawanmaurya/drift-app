export type Testimonial = {
  id: string;
  name: string;
  role: string;
  city: string;
  initials: string;
  quote: string;
};

/**
 * Fictional but written to sound like real reviews — specific jobs, cities,
 * and small concrete details. Internationally diverse on purpose.
 */
export const testimonials: Testimonial[] = [
  {
    id: "maya",
    name: "Maya Trezona",
    role: "ICU charge nurse",
    city: "Adelaide",
    initials: "MT",
    quote:
      "I've been on 4-on / 3-off for nine years. Calm and Headspace told me to meditate at 8pm. Drift just asks what time my shift ends and works backward. First app that talked to me like someone who actually works nights.",
  },
  {
    id: "tomek",
    name: "Tomek Bartosik",
    role: "Rideshare driver",
    city: "Manchester",
    initials: "TB",
    quote:
      "Thursday through Sunday nights. Drift figured out that my real Monday is Tuesday afternoon. Debt dropped four hours in three weeks. I don't feel like I'm catching up anymore.",
  },
  {
    id: "aanya",
    name: "Aanya Iyer",
    role: "Radiology tech",
    city: "Bangalore",
    initials: "AI",
    quote:
      "My roster comes in WhatsApp from my manager. Drift lets me forward it and reads the dates out itself. Small thing — but it saved me retyping them every Sunday.",
  },
  {
    id: "daniel",
    name: "Daniel Okafor",
    role: "Warehouse picker",
    city: "Toronto",
    initials: "DO",
    quote:
      "I've quit every sleep app within a week because the advice was useless. Drift hasn't told me to wind down with lavender tea once. Three months in.",
  },
];
