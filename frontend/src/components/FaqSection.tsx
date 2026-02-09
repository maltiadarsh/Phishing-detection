import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion } from "framer-motion";

const faqData = [
  {
    id: "what-is-phishing",
    question: "What is phishing?",
    answer: "Phishing is a cybercrime in which targets are contacted by email, telephone, or text message by someone posing as a legitimate institution to lure individuals into providing sensitive data such as personally identifiable information, banking and credit card details, and passwords.",
  },
  {
    id: "why-care",
    question: "Why should I bother knowing what Phishing is?",
    answer: "Successful phishing attacks can cause financial loss for victims, put personal information at risk, and compromise data and systems. The purpose of phishing is to collect sensitive information to gain access to otherwise protected data and networks.",
  },
  {
    id: "types",
    question: "Types of Phishing Attacks",
    answer: "Major types include: Deceptive Phishing (impersonating legitimate companies), Spear Phishing (targeting specific individuals), Angler Phishing (via social media), Clone Phishing (duplicating emails), Domain Spoofing, Email Phishing, Search Engine Phishing, Smishing (SMS), Whaling (targeting executives), Vishing (VoIP calls), and Malvertising.",
  },
  {
    id: "prevent-user",
    question: "How to protect yourself as an end-user?",
    answer: "Choose strong passwords, be wary of posting personal details on social media, verify suspicious emails with IT, only open attachments from trusted sources, never give personal info in unsolicited calls or emails, inspect emails for typos and grammar issues, and beware of urgent or time-sensitive warnings.",
  },
  {
    id: "prevent-company",
    question: "How to protect against phishing as a company?",
    answer: "Train your employees to identify phishing emails, keep antivirus software updated, and stay up-to-date on common phishing scams. Employee security awareness training is by far the most crucial action to prevent phishing attacks.",
  },
];

const FaqSection = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="font-heading text-3xl font-bold text-foreground">
            Frequently Asked Questions
          </h2>
          <div className="mx-auto mt-4 h-1 w-12 rounded-full bg-accent" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mx-auto max-w-3xl"
        >
          <Accordion type="single" collapsible defaultValue="what-is-phishing">
            {faqData.map((item) => (
              <AccordionItem key={item.id} value={item.id} className="border-border">
                <AccordionTrigger className="font-heading text-left text-base font-semibold text-foreground hover:text-accent">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FaqSection;
