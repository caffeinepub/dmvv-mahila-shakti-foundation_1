import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { useApp } from "@/context/AppContext";

export default function FAQ() {
  const { faqs } = useApp();
  const sorted = [...faqs].sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <main className="min-h-screen">
      <section className="relative h-52 flex items-center bg-ngo-green">
        <div className="max-w-7xl mx-auto px-4">
          <Badge className="bg-ngo-orange text-white mb-2">Help Center</Badge>
          <h1 className="text-4xl font-extrabold text-white">
            Frequently Asked Questions
          </h1>
          <p className="text-green-200 mt-2">
            Answers to common questions about DMVV Foundation
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-14">
        {sorted.length === 0 ? (
          <div
            className="text-center text-gray-400 py-20"
            data-ocid="faq.empty_state"
          >
            No FAQs available.
          </div>
        ) : (
          <Accordion type="single" collapsible className="space-y-3">
            {sorted.map((faq, idx) => (
              <AccordionItem
                key={faq.id}
                value={faq.id}
                className="border border-gray-200 rounded-xl px-4 shadow-sm"
                data-ocid={`faq.item.${idx + 1}`}
              >
                <AccordionTrigger className="text-left font-semibold text-gray-900 py-4 hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pb-4 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </section>
    </main>
  );
}
