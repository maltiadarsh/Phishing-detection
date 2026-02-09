import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Download, Shield } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <Shield className="h-7 w-7 text-accent" />
          <span className="font-heading text-xl font-bold text-foreground tracking-wide">
            PhishDetector
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-8 lg:flex">
          <Link to="/" className={`nav-link ${isActive("/") ? "nav-link-active" : ""}`}>
            Home
          </Link>
          <a href="/#about" className="nav-link">About</a>
          <Link to="/usecases" className={`nav-link ${isActive("/usecases") ? "nav-link-active" : ""}`}>
            Use Cases
          </Link>
          <div className="group relative">
            <button className="nav-link">Help ▾</button>
            <div className="invisible absolute left-0 top-full pt-2 opacity-0 transition-all group-hover:visible group-hover:opacity-100">
              <div className="w-56 rounded-lg border border-border bg-card p-2 shadow-xl">
                <p className="px-3 py-1.5 text-xs font-semibold text-muted-foreground">Report Phishing</p>
                <a href="https://safebrowsing.google.com/safebrowsing/report_phish/?hl=en" target="_blank" rel="noopener noreferrer" className="block rounded-md px-3 py-2 text-sm text-foreground hover:bg-muted">Google Safe Browsing</a>
                <a href="https://support.google.com/websearch/answer/106318" target="_blank" rel="noopener noreferrer" className="block rounded-md px-3 py-2 text-sm text-foreground hover:bg-muted">Google Support</a>
                <hr className="my-1 border-border" />
                <p className="px-3 py-1.5 text-xs font-semibold text-muted-foreground">Take a Quiz</p>
                <a href="https://www.phishingbox.com/phishing-iq-test" target="_blank" rel="noopener noreferrer" className="block rounded-md px-3 py-2 text-sm text-foreground hover:bg-muted">Phishingbox</a>
                <a href="https://www.intradyn.com/phishing-quiz/" target="_blank" rel="noopener noreferrer" className="block rounded-md px-3 py-2 text-sm text-foreground hover:bg-muted">Intradyn</a>
              </div>
            </div>
          </div>
        </nav>

        <div className="hidden lg:block">
          <a href="#" className="cta-btn">
            <Download className="h-4 w-4" /> Download Guide
          </a>
        </div>

        {/* Mobile toggle */}
        <button className="lg:hidden text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-border bg-card lg:hidden"
          >
            <nav className="flex flex-col gap-1 p-4">
              <Link to="/" onClick={() => setMobileOpen(false)} className="nav-link py-2">Home</Link>
              <a href="/#about" onClick={() => setMobileOpen(false)} className="nav-link py-2">About</a>
              <Link to="/usecases" onClick={() => setMobileOpen(false)} className="nav-link py-2">Use Cases</Link>
              <a href="https://safebrowsing.google.com/safebrowsing/report_phish/?hl=en" target="_blank" rel="noopener noreferrer" className="nav-link py-2">Report Phishing</a>
              <a href="https://phishingquiz.withgoogle.com/" target="_blank" rel="noopener noreferrer" className="nav-link py-2">Take Phishing Quiz</a>
              <a href="#" className="cta-btn mt-2 w-fit">
                <Download className="h-4 w-4" /> Download Guide
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
