/* eslint-disable @typescript-eslint/no-explicit-any */
import { homeHowItWorksData } from "../../assets/assets";

export default function HowItWorks() {
  return (
    <section className="relative py-24 md:py-32 bg-muted/30">
      {/* Dividers */}
      <div
        className="absolute inset-x-0 top-0 h-px bg-border"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 bottom-0 h-px bg-border"
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-xs font-medium uppercase tracking-widest text-primary mb-3">
            How it works
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold text-foreground mb-4">
            From URL to insights in{" "}
            <span className="gradient-text">three steps</span>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto leading-relaxed">
            Ranklytics simulates a real browser visit, then applies AI to
            surface what matters most for your rankings.
          </p>
        </div>

        {/* Steps */}
        <ol className="relative grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {/* Connector line — desktop only */}
          <div
            aria-hidden="true"
            className="hidden md:block absolute top-8 left-[calc(16.67%+1rem)] right-[calc(16.67%+1rem)] h-px border-t border-dashed border-border"
          />

          {homeHowItWorksData.map((step: any, i: number) => (
            <li
              key={step.num}
              className="flex flex-col items-center md:items-start text-center md:text-left"
            >
              {/* Step bubble */}
              <div className="relative z-10 mb-6">
                <div className="size-16 rounded-2xl bg-card border border-border flex items-center justify-center text-primary shadow-sm">
                  {step.icon}
                </div>
                {/* Step number badge */}
                <div
                  className="absolute -top-2 -right-2 size-5 rounded-full bg-primary flex items-center justify-center text-[10px] font-bold"
                  style={{ color: "var(--background)" }}
                  aria-label={`Step ${i + 1}`}
                >
                  {i + 1}
                </div>
              </div>

              <h3 className="text-base font-semibold text-foreground mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs md:max-w-none">
                {step.desc}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
