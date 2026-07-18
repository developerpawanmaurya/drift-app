import { redirect } from "next/navigation";

/**
 * /onboarding entry — sends the user to the first step.
 * Kept as a server redirect so direct links don't show a blank landing.
 */
export default function OnboardingIndex() {
  redirect("/onboarding/work");
}
