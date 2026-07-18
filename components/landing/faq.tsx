import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionHeading } from "@/components/landing/section-heading";
import { faqs } from "@/lib/data/faq";

/**
 * FAQ — five questions a real user would actually ask.
 * Note the last one: we'd rather lose a sale than mis-sell. That stance
 * lives in the copy here.
 */
export function FAQ() {
  return (
    <section id="faq" className="bg-canvas-soft py-24 md:py-32">
      <div className="container">
        <div className="grid gap-12 md:grid-cols-[1fr_1.4fr] md:gap-16">
          <SectionHeading
            eyebrow="Questions, asked honestly"
            title="Things people ask us before signing up."
            lede="If your question isn't here, write to us — a real person will read it."
            className="md:sticky md:top-28 md:self-start"
          />

          <Accordion type="single" collapsible className="md:pt-2">
            {faqs.map((f) => (
              <AccordionItem key={f.id} value={f.id}>
                <AccordionTrigger>{f.q}</AccordionTrigger>
                <AccordionContent>{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
