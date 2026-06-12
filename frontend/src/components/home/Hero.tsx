import { SearchIcon, ArrowRightIcon } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HomeWave } from "../../assets/assets";

export default function Hero() {
  const [url, setUrl] = useState("");
  const navigate = useNavigate();

  const handleQuickAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/analyze?url=${encodeURIComponent(url)}`);
  };

  return (
    <section className="relative flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-24 text-center overflow-hidden">
      {/* Subtle background grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          opacity: 0.04,
        }}
      />

      {/* Radial fade in center */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 40%, hsl(var(--primary) / 0.06) 0%, transparent 70%)",
        }}
      />

      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="seo-scanner scanner-1" />
        <div className="seo-scanner scanner-2" />
        <div className="seo-scanner scanner-3" />
      </div>

      {/* Live badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-card text-xs text-muted-foreground mb-8 select-none">
        <span className="relative flex size-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60" />
          <span className="relative inline-flex size-2 rounded-full bg-primary" />
        </span>
        Powered by BrowserBase &amp; Gemini AI
      </div>

      <div className="hidden lg:block">
        <div className="absolute left-[12%] top-[28%] bg-card border border-border rounded-xl px-4 py-3 shadow-sm animate-float">
          <p className="text-xs text-muted-foreground">SEO Score</p>
          <p className="text-xl font-semibold text-green-500">92</p>
        </div>

        <div className="absolute right-[15%] top-[35%] bg-card border border-border rounded-xl px-4 py-3 shadow-sm animate-float-delayed">
          <p className="text-xs text-muted-foreground">Keyword Growth</p>
          <p className="text-xl font-semibold text-primary">+28%</p>
        </div>

        <div className="absolute right-[10%] top-[55%] bg-card border border-border rounded-xl px-4 py-3 shadow-sm animate-float-slow">
          <p className="text-xs text-muted-foreground">Rank Change</p>
          <p className="text-xl font-semibold text-green-500">#12 ↑</p>
        </div>
      </div>

      {/* Headline */}

      <div
        className="absolute left-1/2 top-[35%] -translate-x-1/2 w-[700px] h-[700px] rounded-full blur-[120px] -z-10"
        style={{
          background:
            "radial-gradient(circle, hsl(var(--primary) / 0.12), transparent 70%)",
        }}
      />

      <h1 className="text-[2.5rem] sm:text-[3.25rem] md:text-[3.75rem] font-semibold tracking-tight leading-[1.12] text-foreground mb-5 max-w-2xl">
        Know exactly where <br className="hidden sm:block" />
        <span className="gradient-text dm-serif">your pages rank</span>
      </h1>

      {/* Sub-headline */}
      <p className="text-base text-muted-foreground max-w-md mx-auto mb-10 leading-relaxed">
        AI-powered SEO audits. Paste a URL and get a full breakdown of issues,
        keywords, and opportunities in seconds.
      </p>

      {/* Search bar */}
      <form
        onSubmit={handleQuickAnalyze}
        className="w-full max-w-xl mx-auto"
        aria-label="Analyze a website URL"
      >
        <div className="flex items-center bg-card border border-border rounded-full px-3 py-1.5 gap-2 focus-within:ring-2 focus-within:ring-primary/30 focus-within:border-primary/40 transition-all">
          <SearchIcon
            size={15}
            className="text-muted-foreground shrink-0 ml-1"
            aria-hidden="true"
          />
          <input
            type="text"
            id="hero-url-input"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="example.com"
            autoComplete="url"
            className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground/60 outline-none text-sm py-2 min-w-0"
            aria-label="Website URL to analyze"
          />
          <button
            type="submit"
            id="hero-analyze-btn"
            className="shrink-0 flex items-center gap-1.5 bg-primary text-primary-foreground text-sm font-medium px-4 py-2 rounded-full hover:opacity-90 active:scale-[0.98] transition-all"
            style={{ color: "var(--background)" }}
          >
            Analyze
            <ArrowRightIcon size={13} aria-hidden="true" />
          </button>
        </div>
      </form>

      {/* Trust line */}
      <p className="mt-5 text-xs text-muted-foreground/70 tracking-wide">
        Free &mdash; no credit card &nbsp;&middot;&nbsp; 5 analyses per day
      </p>

      {/* Social proof strip */}
      <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground/60">
        {[
          { value: "2.4M+", label: "pages analyzed" },
          { value: "98%", label: "issue detection rate" },
        ].map(({ value, label }) => (
          <div key={label} className="flex items-center gap-1.5">
            <span className="font-semibold text-foreground/80 text-sm">
              {value}
            </span>
            <span>{label}</span>
          </div>
        ))}
      </div>

      {/* Wave */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none -z-10">
        <HomeWave />
      </div>
    </section>
  );
}
