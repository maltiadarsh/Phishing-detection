import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

const useCases = [
  {
    id: "case-1",
    title: "John Podesta's Email (2016)",
    content: "Chairman of Hillary Clinton's campaign was victimized by Russian hacker group Fancy Bear. Phishers, pretending to be Google, sent an email saying he needed to change his password after an attempted hack. The email linked to a malicious website, giving hackers access to his account. This led to thousands of emails being released via WikiLeaks.",
  },
  {
    id: "case-2",
    title: "BenefitMall Data Breach",
    content: "Between June and October 2018, BenefitMall's website was accessed via employee email credentials exposed during a phishing attack. Exposed data included names, email addresses, birth dates, bank account information, and insurance premium payment information. BenefitMall serves over 200,000 small and medium-sized businesses.",
  },
  {
    id: "case-3",
    title: "Sony Pictures (2014)",
    content: "A North Korean government-backed hacker group launched a devastating attack using phishing and spear-phishing emails containing malware. Attackers gained access to Sony's network, performed months of covert reconnaissance, stole confidential data, and disabled thousands of computers. The attack cost the company upwards of $100 million.",
  },
  {
    id: "case-4",
    title: "Methodist Hospitals – Gary, Indiana (2019)",
    content: "A phishing attack compromised more than 68,000 patients' information. At least two email accounts were compromised, exposing names, addresses, health insurance information, Social Security numbers, passport numbers, bank account numbers, and treatment information.",
  },
  {
    id: "case-5",
    title: "University of Wisconsin-Parkside (2019)",
    content: "A phishing attack prompted an employee to change routing numbers of two UW system vendors, resulting in a $315,000 loss in fraudulent bank transfers before the issue was discovered.",
  },
];

const UseCasesSection = ({ standalone = false }: { standalone?: boolean }) => {
  return (
    <section className={standalone ? "pt-28 pb-20" : "py-20 bg-muted/50"}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="font-heading text-3xl font-bold text-foreground">
            {standalone ? "Use Case Scenarios" : "Real-World Phishing Attacks"}
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
            Data breaches caused by phishing attacks that affected millions
          </p>
          <div className="mx-auto mt-4 h-1 w-12 rounded-full bg-accent" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mx-auto max-w-3xl"
        >
          <Accordion type="single" collapsible defaultValue="case-1">
            {useCases.map((item) => (
              <AccordionItem key={item.id} value={item.id} className="border-border">
                <AccordionTrigger className="font-heading text-left text-base font-semibold text-foreground hover:text-accent">
                  <span className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 shrink-0 text-accent" />
                    {item.title}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                  {item.content}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default UseCasesSection;
