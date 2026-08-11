import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { ArrowDown } from "lucide-react";
import { SiteData } from "../types";
import {
  sceneSpring,
  useDesktopMotion,
} from "./motion/useDesktopMotion";

type ProcessStepData = SiteData["process"]["steps"][number];

function ProcessStep({
  step,
  isLast,
  motionEnabled,
}: {
  key?: string;
  step: ProcessStepData;
  isLast: boolean;
  motionEnabled: boolean;
}) {
  const stepRef = useRef<HTMLLIElement>(null);
  const { scrollYProgress } = useScroll({
    target: stepRef,
    offset: ["start 88%", "end 18%"],
  });
  const stepProgress = useSpring(scrollYProgress, sceneSpring);
  const opacity = useTransform(
    stepProgress,
    [0, 0.18, 0.78, 1],
    [0.42, 1, 1, 0.68],
  );
  const y = useTransform(stepProgress, [0, 0.22, 0.78, 1], [46, 0, 0, -24]);
  const scale = useTransform(
    stepProgress,
    [0, 0.2, 0.78, 1],
    [0.965, 1, 1, 0.985],
  );

  return (
    <motion.li
      ref={stepRef}
      style={motionEnabled ? { opacity, y, scale } : undefined}
      className="process-motion-step relative"
    >
      <div className="process-card relative flex min-h-72 w-full flex-col overflow-hidden rounded-3xl border p-6 sm:p-8 lg:min-h-[26rem] lg:p-10">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-3 -top-10 select-none font-display text-[9rem] font-semibold leading-none tracking-[-0.08em] text-[var(--color-accent-soft)] opacity-70 sm:text-[11rem]"
        >
          {step.step}
        </span>

        <div className="flex items-center justify-between">
          <span className="process-step-badge relative inline-flex min-w-10 items-center justify-center rounded-full px-3 py-1.5 font-mono text-xs font-semibold text-[var(--color-accent)]">
            {step.step}
          </span>
          {!isLast && (
            <span className="process-card-arrow flex size-8 items-center justify-center rounded-full text-[var(--color-text-subtle)] lg:absolute lg:bottom-10 lg:right-10 lg:z-10">
              <ArrowDown className="size-4" aria-hidden="true" />
            </span>
          )}
        </div>

        <div className="relative mt-20 max-w-xl sm:mt-24">
          <h3 className="text-2xl font-semibold leading-8 tracking-[-0.035em] text-[var(--color-text-main)] sm:text-3xl sm:leading-9">
            {step.title}
          </h3>
          <p className="mt-4 text-sm leading-6 text-[var(--color-text-muted)] sm:text-base sm:leading-7">
            {step.description}
          </p>
        </div>

        <p className="process-card-proof relative mt-auto rounded-2xl border px-4 py-4 pr-12 text-xs font-semibold leading-5 text-[var(--color-text-subtle)]">
          {step.proof}
        </p>
      </div>
    </motion.li>
  );
}

export default function Process({ data }: { data: SiteData }) {
  const sectionRef = useRef<HTMLElement>(null);
  const { motionEnabled } = useDesktopMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 18%", "end 82%"],
  });
  const sectionProgress = useSpring(scrollYProgress, sceneSpring);

  return (
    <section
      ref={sectionRef}
      id="process"
      className="process-section py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="process-motion-layout grid gap-10">
          <div className="process-motion-copy">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]">
              {data.process.eyebrow}
            </p>
            <h2 className="mt-4 max-w-3xl font-display text-3xl font-semibold leading-[1.08] tracking-[-0.045em] text-[var(--color-text-main)] sm:text-4xl lg:text-5xl">
              {data.process.title}
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-7 text-[var(--color-text-muted)] sm:text-lg sm:leading-8">
              {data.process.subtitle}
            </p>

            <div
              aria-hidden="true"
              className="process-motion-progress absolute bottom-10 left-0 top-[19rem] hidden w-px overflow-hidden bg-[var(--color-divider)]"
            >
                <motion.span
                  style={{
                    scaleY: motionEnabled ? sectionProgress : 1,
                    transformOrigin: "top center",
                  }}
                  className="absolute inset-0 bg-[var(--color-accent)]"
                />
            </div>
          </div>

          <ol className="process-motion-list grid gap-5">
            {data.process.steps.map((step, index) => (
              <ProcessStep
                key={step.step}
                step={step}
                isLast={index === data.process.steps.length - 1}
                motionEnabled={motionEnabled}
              />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
