import { useRef, type ElementType } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import {
  ArrowRight,
  CheckCircle2,
  Crosshair,
  MessagesSquare,
  Sparkles,
  Workflow,
} from "lucide-react";
import { SiteData } from "../types";
import { sceneSpring, useDesktopMotion } from "./motion/useDesktopMotion";

const flowIcons: Record<string, ElementType> = {
  Crosshair,
  MessagesSquare,
  Workflow,
};

export default function Hero({ data }: { data: SiteData }) {
  const sectionRef = useRef<HTMLElement>(null);
  const { motionEnabled } = useDesktopMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const contentY = useSpring(useTransform(scrollYProgress, [0, 1], [18, -108]), sceneSpring);
  const contentOpacity = useSpring(
    useTransform(scrollYProgress, [0, 0.76, 1], [1, 1, 0.46]),
    sceneSpring,
  );
  const cardY = useSpring(useTransform(scrollYProgress, [0, 1], [-12, 108]), sceneSpring);
  const cardScale = useSpring(useTransform(scrollYProgress, [0, 0.55, 1], [0.985, 1, 0.82]), sceneSpring);
  const cardOpacity = useSpring(
    useTransform(scrollYProgress, [0, 0.78, 1], [1, 1, 0.54]),
    sceneSpring,
  );
  const brandX = useSpring(useTransform(scrollYProgress, [0, 1], [0, -180]), sceneSpring);
  const accentX = useSpring(useTransform(scrollYProgress, [0, 1], [-90, 120]), sceneSpring);

  return (
    <section
      ref={sectionRef}
      id="home"
      aria-labelledby="hero-heading"
      className="hero-motion-scene relative isolate overflow-clip bg-[var(--color-bg-base)] pb-16 pt-28 sm:pb-20 sm:pt-32 lg:pb-24 lg:pt-40"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[-12rem] top-[-12rem] -z-10 h-[34rem] w-[34rem] rounded-full bg-[var(--color-accent)] opacity-[0.09] blur-[130px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-12rem] top-24 -z-10 h-[30rem] w-[30rem] rounded-full bg-[var(--color-accent-strong)] opacity-[0.08] blur-[140px]"
      />

      <div className="pointer-events-none absolute inset-0 hidden overflow-hidden lg:block" aria-hidden="true">
        <motion.span
          style={{ x: motionEnabled ? brandX : 0 }}
          className="absolute left-[-0.045em] top-[15%] whitespace-nowrap font-display text-[clamp(9rem,22vw,22rem)] font-semibold leading-none tracking-[-0.09em] text-[var(--color-text-main)] opacity-[0.035]"
        >
          {data.brand.shortName}
        </motion.span>
        <motion.span
          style={{ x: motionEnabled ? accentX : 0 }}
          className="absolute bottom-[4%] right-[-12%] whitespace-nowrap font-display text-[clamp(6rem,13vw,13rem)] font-semibold leading-none tracking-[-0.075em] text-[var(--color-accent)] opacity-[0.055]"
        >
          {data.hero.headlineAccent}
        </motion.span>
      </div>

      <div
        className="hero-motion-stage relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        <div className="grid w-full items-center gap-12 lg:grid-cols-[1.04fr_0.96fr] lg:gap-14 xl:gap-20">
          <motion.div
            style={{
              y: motionEnabled ? contentY : 0,
              opacity: motionEnabled ? contentOpacity : 1,
            }}
          >
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--color-card-border)] bg-[var(--color-bg-card)] px-3.5 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.15em] text-[var(--color-accent)] shadow-[0_10px_35px_var(--color-shadow)]">
            <Sparkles className="size-3.5" aria-hidden="true" />
            {data.hero.eyebrow}
          </p>

          <h1
            id="hero-heading"
            className="max-w-3xl font-display text-[clamp(2.35rem,5.6vw,4.75rem)] font-semibold leading-[1.01] tracking-[-0.055em] text-[var(--color-text-main)]"
          >
            {data.hero.headline}{" "}
            <span className="bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-strong)] bg-clip-text text-transparent">
              {data.hero.headlineAccent}
            </span>
          </h1>

          <p className="mt-7 max-w-2xl text-base leading-7 text-[var(--color-text-muted)] sm:text-lg sm:leading-8">
            {data.hero.subheadline}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={data.actions.startProject.href}
              className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--color-accent)] px-6 py-3 text-sm font-semibold text-[var(--color-on-accent)] shadow-[0_12px_35px_var(--color-glow)] transition duration-300 hover:-translate-y-0.5 hover:bg-[var(--color-accent-strong)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--color-glow)]"
            >
              {data.actions.startProject.label}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </a>
            <a
              href={data.actions.viewWork.href}
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-[var(--color-card-border)] bg-[var(--color-bg-card)] px-6 py-3 text-sm font-semibold text-[var(--color-text-main)] shadow-[0_8px_30px_var(--color-shadow)] transition duration-300 hover:-translate-y-0.5 hover:border-[var(--color-divider)] hover:bg-[var(--color-bg-hover)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--color-glow)]"
            >
              {data.actions.viewWork.label}
            </a>
          </div>

          <div className="mt-7 flex flex-col gap-2.5 text-sm text-[var(--color-text-muted)] sm:flex-row sm:items-center sm:gap-5">
            <span className="inline-flex items-center gap-2">
              <span className="relative flex size-2.5" aria-hidden="true">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-[var(--color-accent)] opacity-50" />
                <span className="relative inline-flex size-2.5 rounded-full bg-[var(--color-accent)]" />
              </span>
              {data.hero.availability}
            </span>
            <span className="hidden h-4 w-px bg-[var(--color-divider)] sm:block" aria-hidden="true" />
            <span>{data.hero.responseNote}</span>
          </div>
          </motion.div>

          <motion.div
            style={{
              y: motionEnabled ? cardY : 0,
              scale: motionEnabled ? cardScale : 1,
              opacity: motionEnabled ? cardOpacity : 1,
            }}
            className={`relative mx-auto w-full max-w-xl ${motionEnabled ? "will-change-transform" : ""}`}
          >
          <div
            aria-hidden="true"
            className="absolute -inset-5 -z-10 rounded-[2.5rem] bg-[var(--color-accent)] opacity-[0.06] blur-2xl"
          />
          <div className="overflow-hidden rounded-[1.75rem] border border-[var(--color-card-border)] bg-[var(--color-bg-elevated)] shadow-[0_28px_90px_var(--color-shadow)]">
            <div className="flex items-center justify-between border-b border-[var(--color-card-border)] px-5 py-4 sm:px-6">
              <div>
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-[var(--color-accent)]">
                  {data.hero.signalFlow.eyebrow}
                </p>
                <h2 className="mt-1.5 text-base font-semibold tracking-[-0.02em] text-[var(--color-text-main)] sm:text-lg">
                  {data.hero.signalFlow.title}
                </h2>
              </div>
              <span className="flex size-10 items-center justify-center rounded-xl bg-[var(--color-bg-soft)] text-[var(--color-accent)]">
                <Sparkles className="size-5" aria-hidden="true" />
              </span>
            </div>

            <div className="p-5 sm:p-6">
              <ol className="relative space-y-3">
                <span
                  aria-hidden="true"
                  className="absolute bottom-8 left-[1.38rem] top-8 w-px bg-[var(--color-divider)]"
                />
                {data.hero.signalFlow.steps.map((step, index) => {
                  const Icon = flowIcons[step.icon] ?? Workflow;

                  return (
                    <li
                      key={step.label}
                      className="relative flex items-center gap-4 rounded-2xl border border-[var(--color-card-border)] bg-[var(--color-bg-card)] p-3.5 shadow-[0_8px_30px_var(--color-shadow)]"
                    >
                      <span className="relative z-10 flex size-11 shrink-0 items-center justify-center rounded-xl bg-[var(--color-bg-soft)] text-[var(--color-accent)]">
                        <Icon className="size-5" aria-hidden="true" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-semibold text-[var(--color-text-main)]">
                          {step.label}
                        </span>
                        <span className="mt-0.5 block text-xs leading-5 text-[var(--color-text-muted)]">
                          {step.detail}
                        </span>
                      </span>
                      <span className="text-xs font-semibold tabular-nums text-[var(--color-text-subtle)]">
                        0{index + 1}
                      </span>
                    </li>
                  );
                })}
              </ol>

              <div className="mt-4 flex items-start gap-3 rounded-2xl bg-[var(--color-accent)] p-4 text-[var(--color-on-accent)] shadow-[0_14px_35px_var(--color-glow)]">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
                <div>
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] opacity-75">
                    {data.hero.signalFlow.resultLabel}
                  </p>
                  <p className="mt-1 text-sm font-semibold leading-5">{data.hero.signalFlow.result}</p>
                </div>
              </div>
            </div>
          </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
