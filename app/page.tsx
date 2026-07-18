import { Nav } from "@/components/landing/nav";
import { Hero } from "@/components/landing/hero";
import { Problem } from "@/components/landing/problem";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Features } from "@/components/landing/features";
import { Testimonials } from "@/components/landing/testimonials";
import { Pricing } from "@/components/landing/pricing";
import { FAQ } from "@/components/landing/faq";
import { Footer } from "@/components/landing/footer";

/**
 * Landing page.
 *
 * Composition order is deliberate — the page tells a single arc:
 *   Hero (promise) → Problem (why now) → How (mechanism) →
 *   Features (proof of depth) → Testimonials (proof of fit) →
 *   Pricing (commitment) → FAQ (objections) → Footer.
 *
 * We don't repeat the CTA across every section — only Hero and Pricing
 * carry a primary button. Restraint earns trust.
 */
export default function LandingPage() {
  return (
    <main className="relative min-h-screen bg-paper text-ink">
      <Nav />
      <Hero />
      <Problem />
      <HowItWorks />
      <Features />
      <Testimonials />
      <Pricing />
      <FAQ />
      <Footer />
    </main>
  );
}
