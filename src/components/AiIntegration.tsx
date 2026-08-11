import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import {
  ArrowDown,
  BarChart3,
  Check,
  ClipboardCheck,
  Database,
  FileCheck2,
  Inbox,
  MessageCircleMore,
  MessageSquareText,
  ShieldCheck,
  Sparkles,
  UserRoundCheck,
  type LucideIcon,
} from "lucide-react";
import type { SiteData } from "../types";
import { useDesktopMotion } from "./motion/useDesktopMotion";

const inputIcons: LucideIcon[] = [MessageSquareText, Inbox, ClipboardCheck];
const outputIcons: LucideIcon[] = [MessageCircleMore, Database, BarChart3];
const benefitIcons: LucideIcon[] = [
  ShieldCheck,
  UserRoundCheck,
  BarChart3,
  FileCheck2,
];

const integrationSpring = {
  stiffness: 112,
  damping: 32,
  mass: 0.56,
};

export default function AiIntegration({ data }: { data: SiteData }) {
  const { aiIntegrations } = data;
  const { motionEnabled } = useDesktopMotion();
  const sceneRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start 86%", "end 18%"],
  });
  const progress = useSpring(scrollYProgress, integrationSpring);

  const panelY = useTransform(progress, [0, 0.55, 1], [12, 0, -5]);
  const inputY = useTransform(progress, [0, 0.18], [16, 0]);
  const inputOpacity = useTransform(progress, [0, 0.14], [0.72, 1]);
  const inputScale = useTransform(progress, [0, 0.2], [0.985, 1]);
  const coreY = useTransform(progress, [0.1, 0.3], [14, 0]);
  const coreOpacity = useTransform(progress, [0.08, 0.25], [0.72, 1]);
  const coreScale = useTransform(progress, [0.08, 0.3], [0.985, 1]);
  const outputY = useTransform(progress, [0.34, 0.5], [16, 0]);
  const outputOpacity = useTransform(progress, [0.32, 0.48], [0.72, 1]);
  const outputCardScale = useTransform(progress, [0.32, 0.5], [0.985, 1]);
  const doneScale = useTransform(progress, [0.44, 0.57], [0.86, 1]);
  const doneRotate = useTransform(progress, [0.44, 0.57], [-5, 0]);
  const doneOpacity = useTransform(progress, [0.42, 0.55], [0.45, 1]);
  const benefitsY = useTransform(progress, [0.46, 0.62], [16, 0]);
  const benefitsOpacity = useTransform(progress, [0.44, 0.6], [0.7, 1]);
  const glowX = useTransform(progress, [0.06, 0.62], ["-20%", "22%"]);

  return (
    <section
      id="ai-integration"
      aria-labelledby="ai-integration-title"
      className="relative overflow-clip bg-[var(--color-bg-base)] py-20 transition-colors duration-300 md:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-28 h-[30rem] w-[58rem] -translate-x-1/2 rounded-full bg-[var(--color-glow)] opacity-25 blur-[130px]"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-3xl text-center md:mb-14">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
            {aiIntegrations.eyebrow}
          </p>
          <h2
            id="ai-integration-title"
            className="font-display text-3xl font-semibold leading-[1.08] tracking-[-0.04em] text-[var(--color-text-main)] sm:text-4xl md:text-5xl"
          >
            {aiIntegrations.title}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[var(--color-text-muted)] md:text-lg md:leading-8">
            {aiIntegrations.subtitle}
          </p>
        </div>

        <div ref={sceneRef} className="ai-motion-scene relative">
          <motion.div
            style={motionEnabled ? { y: panelY } : undefined}
            className="ai-motion-panel relative overflow-hidden rounded-[2.25rem] border border-[var(--color-card-border)] bg-[var(--color-bg-elevated)] p-3 shadow-[0_34px_110px_-58px_var(--color-shadow)] sm:p-5 lg:p-6"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-50"
              style={{
                backgroundImage:
                  "linear-gradient(to right, var(--color-divider) 1px, transparent 1px), linear-gradient(to bottom, var(--color-divider) 1px, transparent 1px)",
                backgroundSize: "58px 58px",
                maskImage:
                  "linear-gradient(to bottom, rgba(0,0,0,0.36), transparent 76%)",
              }}
            />
            <motion.div
              aria-hidden="true"
              style={motionEnabled ? { x: glowX } : undefined}
              className="pointer-events-none absolute -top-32 left-1/3 h-96 w-96 rounded-full bg-[var(--color-glow)] opacity-55 blur-[105px]"
            />

            <div className="relative">
              <div className="pb-5 text-center">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-accent)]">
                  {aiIntegrations.sceneLabel}
                </p>
                <p className="mt-1.5 text-sm text-[var(--color-text-muted)]">
                  {aiIntegrations.exampleNote}
                </p>
              </div>

              <div className="grid gap-4 lg:grid-cols-[minmax(9.25rem,0.72fr)_minmax(26rem,2.25fr)_minmax(9.25rem,0.72fr)_4.5rem] lg:items-center lg:gap-3">
                <motion.div
                  style={
                    motionEnabled
                      ? { y: inputY, opacity: inputOpacity, scale: inputScale }
                      : undefined
                  }
                  className="rounded-[1.65rem] border border-[var(--color-card-border)] bg-[var(--color-bg-soft)] p-3.5 shadow-[0_20px_55px_-42px_var(--color-shadow)]"
                >
                  <p className="mb-3 text-center text-[0.66rem] font-bold uppercase tracking-[0.14em] text-[var(--color-accent)]">
                    {aiIntegrations.inputLabel}
                  </p>
                  <ul className="grid gap-2.5">
                    {aiIntegrations.sources.map((source, index) => {
                      const Icon = inputIcons[index] ?? Sparkles;
                      return (
                        <li
                          key={source.label}
                          className="flex min-h-[4.4rem] items-center gap-3 rounded-2xl border border-[var(--color-card-border)] bg-[var(--color-bg-card)] p-3 shadow-[0_14px_34px_-28px_var(--color-shadow)]"
                        >
                          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[var(--color-accent-soft)] text-[var(--color-accent)] shadow-[0_10px_24px_-18px_var(--color-shadow)]">
                            <Icon className="size-5" aria-hidden="true" />
                          </span>
                          <span className="min-w-0">
                            <span className="block text-xs font-semibold leading-5 text-[var(--color-text-main)]">
                              {source.label}
                            </span>
                            <span className="mt-0.5 block text-[0.68rem] leading-4 text-[var(--color-text-subtle)]">
                              {source.detail}
                            </span>
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </motion.div>

                <motion.div
                  style={
                    motionEnabled
                      ? { y: coreY, opacity: coreOpacity, scale: coreScale }
                      : undefined
                  }
                  className="relative overflow-hidden rounded-[2rem] border border-[var(--color-card-border)] bg-[var(--color-bg-soft)] shadow-[0_28px_70px_-42px_var(--color-shadow)]"
                >
                  <div className="relative aspect-[1.7/1] overflow-hidden">
                    <img
                      src="/ai-workflow-machine-v2.png"
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="ai-machine-art ai-machine-art--light absolute inset-0 h-full w-full object-cover object-center"
                    />
                    <img
                      src="/ai-workflow-machine-dark-v2.png"
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="ai-machine-art ai-machine-art--dark absolute inset-0 h-full w-full object-cover object-center"
                    />
                    <img
                      src="/ai-workflow-machine-clay-v2.png"
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="ai-machine-art ai-machine-art--clay absolute inset-0 h-full w-full object-cover object-center"
                    />
                    <p className="absolute inset-x-0 top-[4.5%] z-10 text-center text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[var(--color-accent)]">
                      {aiIntegrations.workflowLabel}
                    </p>
                    <ol className="absolute inset-0 z-10 hidden sm:block">
                      {aiIntegrations.workflowSteps.map((step, index) => (
                        <li
                          key={step.label}
                          className="absolute top-[68%] w-[21%] -translate-x-1/2 text-center"
                          style={{ left: `${29 + index * 21}%` }}
                        >
                          <span className="mx-auto block max-w-[7rem] text-[0.7rem] font-semibold leading-[1.15] text-[var(--color-text-main)] lg:text-xs">
                            {step.label}
                          </span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  <ol className="grid gap-2 border-t border-[var(--color-card-border)] bg-[var(--color-bg-card)] p-3 sm:hidden">
                    {aiIntegrations.workflowSteps.map((step, index) => (
                      <li
                        key={step.label}
                        className="flex gap-3 rounded-xl bg-[var(--color-bg-soft)] p-3"
                      >
                        <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-[var(--color-accent-soft)] text-xs font-bold text-[var(--color-accent)]">
                          0{index + 1}
                        </span>
                        <span>
                          <span className="block text-sm font-semibold text-[var(--color-text-main)]">
                            {step.label}
                          </span>
                          <span className="mt-1 block text-xs leading-5 text-[var(--color-text-muted)]">
                            {step.detail}
                          </span>
                        </span>
                      </li>
                    ))}
                  </ol>
                </motion.div>

                <div aria-hidden="true" className="flex justify-center lg:hidden">
                  <ArrowDown className="size-5 text-[var(--color-accent)]" />
                </div>

                <motion.div
                  style={
                    motionEnabled
                      ? {
                          y: outputY,
                          opacity: outputOpacity,
                          scale: outputCardScale,
                        }
                      : undefined
                  }
                  className="rounded-[1.65rem] border border-[var(--color-card-border)] bg-[var(--color-bg-soft)] p-3.5 shadow-[0_20px_55px_-42px_var(--color-shadow)]"
                >
                  <p className="mb-3 text-center text-[0.66rem] font-bold uppercase tracking-[0.14em] text-[var(--color-accent-secondary)]">
                    {aiIntegrations.outputLabel}
                  </p>
                  <ul className="grid gap-2.5">
                    {aiIntegrations.outputs.map((output, index) => {
                      const Icon = outputIcons[index] ?? Check;
                      return (
                        <li
                          key={output.label}
                          className="flex min-h-[4.4rem] items-center gap-3 rounded-2xl border border-[var(--color-card-border)] bg-[var(--color-bg-card)] p-3 shadow-[0_14px_34px_-28px_var(--color-shadow)]"
                        >
                          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[var(--color-accent-soft)] text-[var(--color-accent-secondary)] shadow-[0_10px_24px_-18px_var(--color-shadow)]">
                            <Icon className="size-5" aria-hidden="true" />
                          </span>
                          <span className="min-w-0">
                            <span className="block text-xs font-semibold leading-5 text-[var(--color-text-main)]">
                              {output.label}
                            </span>
                            <span className="mt-0.5 block text-[0.68rem] leading-4 text-[var(--color-text-subtle)]">
                              {output.detail}
                            </span>
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </motion.div>

                <motion.div
                  style={
                    motionEnabled
                      ? {
                          scale: doneScale,
                          rotate: doneRotate,
                          opacity: doneOpacity,
                        }
                      : undefined
                  }
                  className="mx-auto flex size-[4.5rem] flex-col items-center justify-center rounded-full border border-[var(--color-card-border)] bg-[var(--color-bg-card)] text-center shadow-[0_22px_50px_-32px_var(--color-shadow)]"
                >
                  <Check
                    className="size-7 text-[var(--color-accent-secondary)]"
                    strokeWidth={2.5}
                    aria-hidden="true"
                  />
                  <span className="mt-0.5 text-[0.64rem] font-bold text-[var(--color-text-main)]">
                    {aiIntegrations.statusLabel}
                  </span>
                </motion.div>
              </div>

              <motion.ul
                style={
                  motionEnabled
                    ? { y: benefitsY, opacity: benefitsOpacity }
                    : undefined
                }
                className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4"
              >
                {aiIntegrations.benefits.map((benefit, index) => {
                  const Icon = benefitIcons[index] ?? ShieldCheck;
                  return (
                    <li
                      key={benefit.title}
                      className="rounded-2xl border border-[var(--color-card-border)] bg-[var(--color-bg-card)] p-4 shadow-[0_18px_45px_-36px_var(--color-shadow)]"
                    >
                      <div className="flex items-start gap-3">
                        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[var(--color-accent-soft)] text-[var(--color-accent)]">
                          <Icon className="size-5" strokeWidth={1.9} aria-hidden="true" />
                        </span>
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
                  );
                })}
              </motion.ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
