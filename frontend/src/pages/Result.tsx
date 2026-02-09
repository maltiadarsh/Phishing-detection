import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ShieldCheck, ShieldAlert, ArrowLeft, ExternalLink, Search } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";
import { checkUrl, type CheckUrlResponse } from "@/lib/api";
import { toast } from "sonner";

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as CheckUrlResponse | null;

  const [url, setUrl] = useState("");
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<CheckUrlResponse | null>(state ?? null);

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;
    setScanning(true);
    setResult(null);
    try {
      const apiResult = await checkUrl(url.trim());
      setResult(apiResult);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to scan URL. Please try again.");
    } finally {
      setScanning(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="flex min-h-screen flex-col items-center justify-center px-4 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-xl text-center"
        >
          <h1 className="font-heading text-3xl font-bold text-foreground md:text-4xl">
            Scan Result
          </h1>
          <p className="mt-2 text-muted-foreground">
            Enter a URL below to check if it's safe or malicious.
          </p>

          <form onSubmit={handleScan} className="mt-8 flex flex-col items-center gap-4 sm:flex-row">
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
            <button type="submit" disabled={scanning} className="scan-btn shrink-0">
              {scanning ? "Scanning..." : "Scan URL"}
            </button>
          </form>

          {result && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-10"
            >
              <div
                className={`flex items-center gap-4 rounded-xl border-2 p-6 text-left ${result.is_safe
                    ? "border-accent/30 bg-accent/10"
                    : "border-destructive/30 bg-destructive/10"
                  }`}
              >
                {result.is_safe ? (
                  <ShieldCheck className="h-12 w-12 shrink-0 text-accent" />
                ) : (
                  <ShieldAlert className="h-12 w-12 shrink-0 text-destructive" />
                )}
                <div className="flex-1">
                  <p className="font-heading text-xl font-bold text-foreground">
                    Website is {result.is_safe ? "Safe" : "Unsafe"} to use
                  </p>
                  <p className="mt-1 break-all text-sm text-muted-foreground">{result.url}</p>
                  {result.reason && (
                    <p className="mt-2 text-sm text-destructive font-medium">Reason: {result.reason}</p>
                  )}
                  <div className="mt-2 flex flex-wrap gap-2 text-xs text-muted-foreground">
                    <span className="rounded-md bg-muted px-2 py-1">Confidence: {result.confidence.toFixed(1)}%</span>
                    <span className={`rounded-md px-2 py-1 ${result.threat_level === "HIGH" ? "bg-destructive/20 text-destructive" :
                        result.threat_level === "MEDIUM" ? "bg-yellow-500/20 text-yellow-700" :
                          "bg-accent/20 text-accent"
                      }`}>Threat: {result.threat_level}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap justify-center gap-3">
                {result.is_safe ? (
                  <a
                    href={result.url.startsWith("http") ? result.url : `https://${result.url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cta-btn"
                  >
                    <ExternalLink className="h-4 w-4" /> Visit Website
                  </a>
                ) : (
                  <a
                    href={result.url.startsWith("http") ? result.url : `https://${result.url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-md bg-destructive/10 px-5 py-2.5 text-sm font-semibold text-destructive transition-all hover:bg-destructive hover:text-destructive-foreground"
                  >
                    <ShieldAlert className="h-4 w-4" /> Proceed Anyway (Unsafe)
                  </a>
                )}
                <button onClick={() => navigate("/")} className="cta-btn">
                  <ArrowLeft className="h-4 w-4" /> Back to Home
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </section>
      <Footer />
    </div>
  );
};

export default Result;
