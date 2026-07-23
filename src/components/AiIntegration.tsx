import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import {
  ArrowDown,
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ClipboardCheck,
  FileCheck2,
  Globe2,
  MessageSquareText,
  ShieldCheck,
  Sparkles,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { SiteData } from "../types";
import { useDesktopMotion } from "./motion/useDesktopMotion";

const inputIcons: LucideIcon[] = [Globe2, MessageSquareText, ClipboardCheck];
const outputIcons: LucideIcon[] = [FileCheck2, ShieldCheck, BarChart3];

const integrationSpring = {
  stiffness: 105,
  damping: 34,
  mass: 0.58,
};

export default function AiIntegration({ data }: { data: SiteData }) {
  const { aiIntegrations } = data;
  const { motionEnabled } = useDesktopMotion();
  const sceneRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start 76%", "end 32%"],
  });
  const progress = useSpring(scrollYProgress, integrationSpring);
  const inputX = useTransform(progress, [0.02, 0.14], [-14, 0]);
  const inputOpacity = useTransform(progress, [0.02, 0.12], [0.76, 1]);
  const firstPath = useTransform(progress, [0.08, 0.28], [0, 1]);
  const workflowY = useTransform(progress, [0.12, 0.32], [10, 0]);
  const workflowOpacity = useTransform(progress, [0.1, 0.28], [0.8, 1]);
  const secondPath = useTransform(progress, [0.24, 0.45], [0, 1]);
  const outputX = useTransform(progress, [0.32, 0.52], [14, 0]);
  const outputOpacity = useTransform(progress, [0.3, 0.5], [0.74, 1]);
  const safeguardsY = useTransform(progress, [0.44, 0.62], [9, 0]);
  const safeguardsOpacity = useTransform(progress, [0.42, 0.6], [0.84, 1]);
  const glowX = useTransform(progress, [0.08, 0.82], ["-28%", "28%"]);

  return (
    <section
      id="ai-integration"
      aria-labelledby="ai-integration-title"
      className="bg-[var(--color-bg-base)] py-20 transition-colors duration-300 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-3xl text-center md:mb-14">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]">
            {aiIntegrations.eyebrow}
          </p>
          <h2
            id="ai-integration-title"
            className="font-display text-3xl font-semibold leading-[1.08] tracking-[-0.04em] text-[var(--color-text-main)] sm:text-4xl md:text-5xl"
          >
            {aiIntegrations.title}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[var(--color-text-muted)] md:text-lg">
            {aiIntegrations.subtitle}
          </p>
        </div>

        <div ref={sceneRef} className="ai-motion-scene relative">
          <div className="ai-motion-panel relative overflow-hidden rounded-[2rem] border border-[var(--color-card-border)] bg-[var(--color-bg-soft)] p-4 shadow-[0_28px_80px_-54px_var(--color-shadow)] sm:p-6 lg:p-7">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-45"
              style={{
                backgroundImage:
                  "linear-gradient(to right, var(--color-divider) 1px, transparent 1px), linear-gradient(to bottom, var(--color-divider) 1px, transparent 1px)",
                backgroundSize: "52px 52px",
                maskImage:
                  "linear-gradient(to bottom, rgba(0,0,0,0.52), transparent 72%)",
              }}
            />
            <motion.div
              aria-hidden="true"
              style={motionEnabled ? { x: glowX } : undefined}
              className="pointer-events-none absolute -top-24 left-1/3 h-72 w-72 rounded-full bg-[var(--color-glow)] opacity-60 blur-[90px]"
            />

            <div className="relative">
              <div className="flex flex-col gap-4 border-b border-[var(--color-divider)] pb-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-[var(--color-accent)] text-[var(--color-on-accent)] shadow-[0_14px_32px_-22px_var(--color-shadow)]">
                    <Workflow className="size-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-[0.68rem] font-bold uppercase tracking-[0.15em] text-[var(--color-accent)]">
                      {aiIntegrations.sceneLabel}
                    </p>
                    <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                      {aiIntegrations.exampleNote}
                    </p>
                  </div>
                </div>
                <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[var(--color-card-border)] bg-[var(--color-bg-card)] px-3 py-2 text-[0.66rem] font-bold uppercase tracking-[0.12em] text-[var(--color-text-main)]">
                  <span className="size-2 rounded-full bg-[var(--color-accent-secondary)] shadow-[0_0_0_4px_var(--color-accent-soft)]" />
                  {aiIntegrations.statusLabel}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2 border-b border-[var(--color-divider)] py-4">
                <span className="mr-1 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-[var(--color-text-subtle)]">
                  {aiIntegrations.connectedLabel}
                </span>
                {aiIntegrations.connectedSystems.map((system) => (
                  <span
                    key={system}
                    className="rounded-full border border-[var(--color-card-border)] bg-[var(--color-bg-card)] px-2.5 py-1.5 text-[0.68rem] font-semibold text-[var(--color-text-muted)]"
                  >
                    {system}
                  </span>
                ))}
              </div>

              <div className="grid gap-4 py-5 lg:grid-cols-[minmax(0,0.82fr)_2.75rem_minmax(18rem,1.18fr)_2.75rem_minmax(0,0.82fr)] lg:items-center lg:gap-3">
                <motion.div
                  style={
                    motionEnabled
                      ? { x: inputX, opacity: inputOpacity }
                      : undefined
                  }
                >
                  <p className="mb-3 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-[var(--color-text-subtle)]">
                    {aiIntegrations.inputLabel}
                  </p>
                  <ul className="grid gap-2.5">
                    {aiIntegrations.sources.map((source, index) => {
                      const Icon = inputIcons[index] ?? Sparkles;
                      return (
                        <li
                          key={source.label}
                          className="flex items-center gap-3 rounded-2xl border border-[var(--color-card-border)] bg-[var(--color-bg-card)] p-3 shadow-[0_14px_36px_-32px_var(--color-shadow)]"
                        >
                          <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[var(--color-accent-soft)] text-[var(--color-accent)]">
                            <Icon className="size-4" aria-hidden="true" />
                          </span>
                          <span className="min-w-0">
                            <span className="block text-sm font-semibold text-[var(--color-text-main)]">
                              {source.label}
                            </span>
                            <span className="mt-0.5 block text-xs leading-5 text-[var(--color-text-subtle)]">
                              {source.detail}
                            </span>
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </motion.div>

                <div
                  aria-hidden="true"
                  className="flex items-center justify-center lg:h-full"
                >
                  <div className="relative hidden h-px w-full bg-[var(--color-card-border)] lg:block">
                    <motion.span
                      style={
                        motionEnabled
                          ? { scaleX: firstPath, transformOrigin: "left center" }
                          : undefined
                      }
                      className="absolute inset-0 bg-[var(--color-accent)]"
                    />
                    <ArrowRight className="absolute -right-1.5 top-1/2 size-4 -translate-y-1/2 text-[var(--color-accent)]" />
                  </div>
                  <ArrowDown className="size-4 text-[var(--color-accent)] lg:hidden" />
                </div>

                <motion.div
                  style={
                    motionEnabled
                      ? { y: workflowY, opacity: workflowOpacity }
                      : undefined
                  }
                  className="rounded-[1.7rem] border border-[var(--color-accent)] bg-[var(--color-bg-elevated)] p-4 shadow-[0_24px_60px_-42px_var(--color-shadow)]"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-[var(--color-accent)]">
                      {aiIntegrations.workflowLabel}
                    </p>
                    <ShieldCheck
                      className="size-4 text-[var(--color-accent)]"
                      aria-hidden="true"
                    />
                  </div>
                  <ol className="mt-3 grid gap-2">
                    {aiIntegrations.workflowSteps.map((step, index) => (
                      <li
                        key={step.label}
                        className="relative overflow-hidden rounded-xl border border-[var(--color-card-border)] bg-[var(--color-bg-card)] p-3"
                      >
                        <div className="flex gap-3">
                          <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-[var(--color-accent-soft)] font-display text-xs font-bold text-[var(--color-accent)]">
                            0{index + 1}
                          </span>
                          <span>
                            <span className="block text-sm font-semibold text-[var(--color-text-main)]">
                              {step.label}
                            </span>
                            <span className="mt-0.5 block text-xs leading-5 text-[var(--color-text-subtle)]">
                              {step.detail}
                            </span>
                          </span>
                        </div>
                        <motion.span
                          aria-hidden="true"
                          style={
                            motionEnabled
                              ? {
                                  scaleX: firstPath,
                                  transformOrigin: "left center",
                                }
                              : undefined
                          }
                          className="absolute inset-x-0 bottom-0 h-px bg-[var(--color-accent)]"
                        />
                      </li>
                    ))}
                  </ol>
                </motion.div>

                <div
                  aria-hidden="true"
                  className="flex items-center justify-center lg:h-full"
                >
                  <div className="relative hidden h-px w-full bg-[var(--color-card-border)] lg:block">
                    <motion.span
                      style={
                        motionEnabled
                          ? { scaleX: secondPath, transformOrigin: "left center" }
                          : undefined
                      }
                      className="absolute inset-0 bg-[var(--color-accent)]"
                    />
                    <ArrowRight className="absolute -right-1.5 top-1/2 size-4 -translate-y-1/2 text-[var(--color-accent)]" />
                  </div>
                  <ArrowDown className="size-4 text-[var(--color-accent)] lg:hidden" />
                </div>

                <motion.div
                  style={
                    motionEnabled
                      ? { x: outputX, opacity: outputOpacity }
                      : undefined
                  }
                >
                  <p className="mb-3 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-[var(--color-text-subtle)]">
                    {aiIntegrations.outputLabel}
                  </p>
                  <ul className="grid gap-2.5">
                    {aiIntegrations.outputs.map((output, index) => {
                      const Icon = outputIcons[index] ?? CheckCircle2;
                      return (
                        <li
                          key={output.label}
                          className="flex items-center gap-3 rounded-2xl border border-[var(--color-card-border)] bg-[var(--color-bg-card)] p-3 shadow-[0_14px_36px_-32px_var(--color-shadow)]"
                        >
                          <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[var(--color-accent-soft)] text-[var(--color-accent)]">
                            <Icon className="size-4" aria-hidden="true" />
                          </span>
                          <span className="min-w-0">
                            <span className="block text-sm font-semibold text-[var(--color-text-main)]">
                              {output.label}
                            </span>
                            <span className="mt-0.5 block text-xs leading-5 text-[var(--color-text-subtle)]">
                              {output.detail}
                            </span>
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </motion.div>
              </div>

              <motion.ul
                style={
                  motionEnabled
                    ? { y: safeguardsY, opacity: safeguardsOpacity }
                    : undefined
                }
                className="grid gap-px overflow-hidden rounded-2xl border border-[var(--color-card-border)] bg-[var(--color-divider)] sm:grid-cols-2 xl:grid-cols-4"
              >
                {aiIntegrations.benefits.map((benefit) => (
                  <li
                    key={benefit.title}
                    className="bg-[var(--color-bg-card)] p-4"
                  >
                    <div className="flex items-start gap-3">
                      <CheckCircle2
                        aria-hidden="true"
                        className="mt-0.5 size-4 shrink-0 text-[var(--color-accent)]"
                        strokeWidth={2}
                      />
                      <div>
                        <h3 className="text-sm font-semibold tracking-[-0.015em] text-[var(--color-text-main)]">
                          {benefit.title}
                        </h3>
                        <p className="mt-1 text-xs leading-5 text-[var(--color-text-muted)]">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </motion.ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
