import { useRef, type ElementType } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { ArrowUpRight, BrainCircuit, Check, MonitorUp, PanelsTopLeft } from "lucide-react";
import { SiteData } from "../types";
import { sceneSpring, useDesktopMotion } from "./motion/useDesktopMotion";

const iconMap: Record<string, ElementType> = {
  MonitorUp,
  PanelsTopLeft,
  BrainCircuit,
};

function ServiceChapter({
  service,
  index,
  data,
  motionEnabled,
}: {
  key?: string;
  service: SiteData["services"]["items"][number];
  index: number;
  data: SiteData;
  motionEnabled: boolean;
}) {
  const chapterRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: chapterRef,
    offset: ["start end", "end start"],
  });
  const y = useSpring(useTransform(scrollYProgress, [0, 0.48, 1], [54, 0, -36]), sceneSpring);
  const scale = useSpring(useTransform(scrollYProgress, [0, 0.48, 1], [0.955, 1, 0.975]), sceneSpring);
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.34, 0.72, 1], [0.42, 1, 1, 0.68]), sceneSpring);
  const Icon = iconMap[service.icon] ?? BrainCircuit;
  const headingId = `service-${service.id}-heading`;

  return (
    <div
      ref={chapterRef}
      className="service-motion-chapter relative"
    >
      <motion.article
        id={`service-${service.id}`}
        aria-labelledby={headingId}
        style={{
          y: motionEnabled ? y : 0,
          scale: motionEnabled ? scale : 1,
          opacity: motionEnabled ? opacity : 1,
        }}
        className="service-motion-card group relative flex h-full w-full flex-col overflow-hidden rounded-[2rem] border border-[var(--color-card-border)] bg-[var(--color-bg-card)] p-6 shadow-[0_24px_70px_var(--color-shadow)] sm:p-8 lg:p-10"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-[0.08em] -top-[0.3em] font-display text-[clamp(8rem,17vw,13rem)] font-semibold leading-none tracking-[-0.08em] text-[var(--color-accent)] opacity-[0.045]"
        >
          0{index + 1}
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[var(--color-accent)] via-[var(--color-accent-secondary)] to-[var(--color-accent-tertiary)]"
        />

        <div className="relative flex items-start justify-between gap-4">
          <span className="flex size-12 items-center justify-center rounded-2xl border border-[var(--color-card-border)] bg-[var(--color-bg-soft)] text-[var(--color-accent)] shadow-[0_10px_30px_var(--color-shadow)]">
            <Icon className="size-6" strokeWidth={1.8} aria-hidden="true" />
          </span>
          <span className="font-mono text-xs font-semibold text-[var(--color-text-subtle)]">
            0{index + 1}
          </span>
        </div>

        <h3
          id={headingId}
          className="relative mt-10 max-w-xl font-display text-2xl font-semibold leading-[1.08] tracking-[-0.045em] text-[var(--color-text-main)] sm:text-3xl lg:text-[2.5rem]"
        >
          {service.title}
        </h3>

        <div className="relative mt-7 grid flex-1 gap-7 sm:grid-cols-[1.1fr_0.9fr] sm:gap-8">
          <div>
            <p className="text-sm leading-6 text-[var(--color-text-muted)] sm:text-base sm:leading-7">
              {service.description}
            </p>

            <div className="mt-7 rounded-2xl border border-[var(--color-card-border)] bg-[var(--color-bg-soft)] p-5">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-[var(--color-text-subtle)]">
                {data.services.outcomeLabel}
              </p>
              <p className="mt-2 text-sm font-semibold leading-6 text-[var(--color-text-main)] sm:text-base">
                {service.outcome}
              </p>
            </div>
          </div>

          <div className="border-t border-[var(--color-card-border)] pt-6 sm:border-l sm:border-t-0 sm:pl-8 sm:pt-0">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-[var(--color-text-subtle)]">
              {data.services.includesLabel}
            </p>
            <ul className="mt-4 space-y-3">
              {service.deliverables.map((deliverable) => (
                <li key={deliverable} className="flex items-center gap-2.5 text-sm text-[var(--color-text-muted)]">
                  <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[var(--color-bg-soft)] text-[var(--color-accent)]">
                    <Check className="size-3" strokeWidth={2.5} aria-hidden="true" />
                  </span>
                  {deliverable}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <a
          href={data.actions.startProject.href}
          className="relative mt-8 inline-flex min-h-11 items-center gap-2 self-start rounded-full text-sm font-semibold text-[var(--color-accent)] outline-none transition hover:text-[var(--color-accent-strong)] focus-visible:ring-4 focus-visible:ring-[var(--color-glow)]"
        >
          {service.cta}
          <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
        </a>
      </motion.article>
    </div>
  );
}

export default function Services({ data }: { data: SiteData }) {
  const sectionRef = useRef<HTMLElement>(null);
  const { motionEnabled } = useDesktopMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const progressScale = useSpring(scrollYProgress, sceneSpring);

  return (
    <section
      ref={sectionRef}
      id="services"
      aria-labelledby="services-heading"
      className="relative overflow-clip bg-[var(--color-bg-base)] py-20 sm:py-24 lg:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-[24%] h-[34rem] w-[34rem] rounded-full bg-[var(--color-accent)] opacity-[0.055] blur-[140px]"
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="services-motion-layout">
          <motion.div
            initial={false}
            className="services-motion-copy h-fit"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]">
              {data.services.eyebrow}
            </p>
            <h2
              id="services-heading"
              className="mt-4 max-w-2xl font-display text-3xl font-semibold leading-[1.08] tracking-[-0.045em] text-[var(--color-text-main)] sm:text-4xl lg:text-5xl"
            >
              {data.services.title}
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-7 text-[var(--color-text-muted)] sm:text-lg sm:leading-8">
              {data.services.subtitle}
            </p>

            <div
              className="services-motion-progress mt-10 hidden items-center gap-4"
              aria-hidden="true"
            >
                <span className="h-24 w-px overflow-hidden bg-[var(--color-divider)]">
                  <motion.span
                    style={{
                      scaleY: motionEnabled ? progressScale : 1,
                      transformOrigin: "50% 0%",
                    }}
                    className="block h-full w-full bg-[var(--color-accent)]"
                  />
                </span>
                <span className="font-mono text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-[var(--color-text-subtle)] [writing-mode:vertical-rl]">
                  01 — 03
                </span>
            </div>
          </motion.div>

          <div className="services-motion-list mt-12 grid gap-5 lg:mt-16 lg:grid-cols-3">
            {data.services.items.map((service, index) => (
              <ServiceChapter
                key={service.id}
                service={service}
                index={index}
                data={data}
                motionEnabled={motionEnabled}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
