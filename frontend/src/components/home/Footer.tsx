/* eslint-disable @typescript-eslint/no-explicit-any */
import { SiGithub, SiX } from "@icons-pack/react-simple-icons";
import { ChartNoAxesColumnIcon } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between gap-10">
          {/* Brand */}
          <div className="max-w-sm">
            <div className="flex items-center gap-2 mb-4">
              <div className="size-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                <ChartNoAxesColumnIcon size={18} className="text-primary" />
              </div>

              <span className="text-lg font-semibold text-foreground">
                Ranklytics
              </span>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">
              AI-powered SEO audits, website analysis, and keyword tracking
              designed to help websites improve search visibility.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-xs uppercase tracking-widest text-muted-foreground mb-4">
              Navigation
            </h3>

            <div className="flex flex-wrap gap-5">
              <a
                href="/dashboard"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Dashboard
              </a>

              <a
                href="/analyze"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Analyze
              </a>

              <a
                href="/rank-tracker"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Rank Tracker
              </a>

              <a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 border-t border-border" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-5">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Ranklytics. Built by Rohan.
          </p>

          {/* Socials */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/rohankoriya"
              className="size-9 rounded-xl border border-border bg-background
          flex items-center justify-center
          text-muted-foreground hover:text-foreground
          hover:border-primary/30 transition-all"
            >
              <SiGithub size={15} />
            </a>

            <a
              href="#"
              className="size-9 rounded-xl border border-border bg-background
          flex items-center justify-center
          text-muted-foreground hover:text-foreground
          hover:border-primary/30 transition-all"
            >
              <SiX size={15} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
