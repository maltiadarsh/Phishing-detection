import { motion } from "framer-motion";
import { Shield } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="about" className="section-dark py-20">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-heading text-3xl font-bold">About PhishDetector</h2>
          <div className="mx-auto mt-4 h-1 w-12 rounded-full bg-primary-foreground/20" />
          <p className="mx-auto mt-6 max-w-2xl text-primary-foreground/80 leading-relaxed">
            Phishing is an internet scam where attackers send fake messages that appear to come from a trusted source.
            PhishDetector aims to help reduce phishing attacks by helping internet users authenticate URL links,
            testing whether they are phishing or legitimate. The validation process uses several machine learning models
            to provide accurate results.
          </p>

          <div className="mt-10 flex flex-col items-center gap-2">
            <Shield className="h-10 w-10 text-primary-foreground/60" />
            <h3 className="font-heading text-xl font-bold">About the Creator</h3>
            <p className="text-primary-foreground/70">
              Research and development by <span className="font-semibold text-primary-foreground">Adarsh Srivastava</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
