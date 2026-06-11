import { Link } from "react-router-dom";
import { CheckIcon } from "lucide-react";

export default function Pricing() {
  return (
    <section className="relative py-24 md:py-32">
      <div
        className="absolute inset-x-0 top-0 h-px bg-border"
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div className="text-center mb-14">
          <p className="text-xs font-medium uppercase tracking-widest text-primary mb-3">
            Pricing
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold text-foreground mb-4">
            Simple, transparent <span className="gradient-text">pricing</span>
          </h2>
          <p className="text-muted-foreground">
            Start free. Upgrade when your team needs more.
          </p>
        </div>

        {/* Plans grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-2xl mx-auto">
          {/* Free plan */}
          <article className="bg-card border border-border rounded-2xl p-8 flex flex-col">
            <div className="mb-6">
              <h3 className="text-base font-semibold text-foreground mb-1">
                Free
              </h3>
              <p className="text-xs text-muted-foreground mb-5">
                For individuals exploring SEO.
              </p>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-foreground tracking-tight">
                  $0
                </span>
                <span className="text-sm text-muted-foreground">/month</span>
              </div>
            </div>

            <ul
              className="space-y-3 mb-8 flex-1"
              aria-label="Free plan features"
            >
              {[
                "5 analyses per day",
                "Full SEO report",
                "Keyword analysis",
                "Issue detection",
                "Export results",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-sm text-muted-foreground"
                >
                  <CheckIcon
                    size={14}
                    className="text-primary shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>

            <Link
              to="/register"
              className="block w-full py-2.5 rounded-lg border border-border bg-muted/50 text-foreground text-sm font-medium text-center hover:bg-muted transition-colors focus-visible:ring-2 focus-visible:ring-primary/40 outline-none"
            >
              Get started free
            </Link>
          </article>

          {/* Pro plan */}
          <article
            className="relative bg-card border-2 border-primary/50 rounded-2xl p-8 flex flex-col"
            aria-label="Pro plan — most popular"
          >
            {/* Popular badge */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span
                className="inline-flex items-center px-3 py-1 rounded-full bg-primary text-[11px] font-semibold tracking-wide"
                style={{ color: "var(--background)" }}
              >
                Most popular
              </span>
            </div>

            <div className="mb-6 mt-1">
              <h3 className="text-base font-semibold text-foreground mb-1">
                Pro
              </h3>
              <p className="text-xs text-muted-foreground mb-5">
                For professionals who need it all.
              </p>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-primary tracking-tight">
                  $19
                </span>
                <span className="text-sm text-muted-foreground">/month</span>
              </div>
            </div>

            <ul
              className="space-y-3 mb-8 flex-1"
              aria-label="Pro plan features"
            >
              {[
                "Unlimited analyses",
                "Priority processing",
                "Competitor analysis",
                "Historical tracking",
                "API access",
                "Email reports",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-sm text-muted-foreground"
                >
                  <CheckIcon
                    size={14}
                    className="text-primary shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>

            <button
              className="w-full py-2.5 rounded-lg bg-primary text-sm font-medium hover:opacity-90 active:scale-[0.99] transition-all focus-visible:ring-2 focus-visible:ring-primary/40 outline-none"
              style={{ color: "var(--background)" }}
            >
              Upgrade to Pro
            </button>

            {/* Coming soon note — preserving original "not working future feature" intent */}
            <p className="mt-3 text-center text-[11px] text-muted-foreground/60">
              Payments coming soon
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
