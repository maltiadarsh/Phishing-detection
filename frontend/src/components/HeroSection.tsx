import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ShieldCheck, ShieldAlert } from "lucide-react";
import { motion } from "framer-motion";
import heroImg from "@/assets/hero-phishing.png";
import { checkUrl } from "@/lib/api";
import { toast } from "sonner";

const HeroSection = () => {
  const [url, setUrl] = useState("");
  const [scanning, setScanning] = useState(false);
  const navigate = useNavigate();

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;
    setScanning(true);
    try {
      const result = await checkUrl(url.trim());
      navigate("/result", { state: result });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to scan URL. Please try again.");
    } finally {
      setScanning(false);
    }
  };

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-20">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img src={heroImg} alt="" className="h-full w-full object-cover opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      </div>

      <div className="container relative z-10 mx-auto px-4 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="mx-auto max-w-3xl font-heading text-4xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl">
            Fake Website Detection
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
            Protect yourself from phishing attacks. Enter any URL to instantly check if it's safe or malicious.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleScan}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-10 flex max-w-xl flex-col items-center gap-4 sm:flex-row"
        >
          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter a URL (with or without http/https)"
              className="h-12 w-full rounded-lg border-2 border-input bg-card pl-12 pr-4 text-sm text-foreground outline-none transition-all focus:border-accent focus:ring-2 focus:ring-ring/20"
              required
            />
          </div>
          <button type="submit" disabled={scanning} className="scan-btn shrink-0 animate-pulse-glow">
            {scanning ? "Scanning..." : "Scan URL"}
          </button>
        </motion.form>
      </div>
    </section>
  );
};

export default HeroSection;
