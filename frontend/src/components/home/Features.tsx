/* eslint-disable @typescript-eslint/no-explicit-any */
import { homeFeaturesData } from "../../assets/assets";

export default function Features() {
  return (
    <section className="relative py-24 md:py-32">
      {/* Section divider top */}
      <div
        className="absolute inset-x-0 top-0 h-px bg-border"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div className="max-w-xl mb-16">
          <p className="text-xs font-medium uppercase tracking-widest text-primary mb-3">
            Capabilities
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold text-foreground leading-snug mb-4">
            Everything you need to{" "}
            <span className="gradient-text">rank higher</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Real browser rendering meets AI analysis. Get the same view search
            engines see, plus actionable fixes ranked by impact.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {homeFeaturesData.map((f: any, i: number) => (
            <article
              key={f.title}
              className="group relative bg-card border border-border rounded-xl p-6 flex flex-col gap-4 hover:border-primary/30 hover:bg-muted/20 transition-all duration-200"
            >
              {/* Icon */}
              <div
                className="size-10 rounded-lg bg-primary/8 border border-primary/12 flex items-center justify-center text-primary shrink-0"
                aria-hidden="true"
              >
                {f.icon}
              </div>

              {/* Copy */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-1.5">
                  {f.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {f.desc}
                </p>
              </div>

              {/* Subtle number watermark */}
              <span
                className="absolute top-4 right-5 text-[10px] font-mono text-muted-foreground/25 select-none"
                aria-hidden="true"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
