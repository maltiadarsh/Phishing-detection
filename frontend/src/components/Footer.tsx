import { Github, ExternalLink, Shield } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-muted/50 py-8">
      <div className="container mx-auto flex flex-col items-center gap-4 px-4 text-center">
        <a
          href="https://phishingquiz.withgoogle.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="cta-btn"
        >
          <ExternalLink className="h-4 w-4" />
          Take a Phishing Test by Google
        </a>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com/maltiadarsh/Phishing-detection"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-accent"
          >
            <Github className="h-4 w-4" />
            Source Code
          </a>
          <span className="text-muted-foreground/30">|</span>
          <a
            href="https://adarsh.advia.in"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-accent"
          >
            <ExternalLink className="h-4 w-4" />
            Portfolio
          </a>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Shield className="h-3.5 w-3.5" />
          <span>© 2025 PhishDetector. All Rights Reserved.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
