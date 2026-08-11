import { useRef, type ElementType } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { BrainCircuit, Check, PanelsTopLeft } from "lucide-react";
import type { SiteData } from "../types";
import { sceneSpring, useDesktopMotion } from "./motion/useDesktopMotion";

const iconMap: Record<string, ElementType> = {
  PanelsTopLeft,
  BrainCircuit,
};

function CompactServiceCard({
  service,
  index,
  includesLabel,
}: {
  service: SiteData["services"]["items"][number];
  key?: string;
  index: number;
  includesLabel: string;
}) {
  const cardRef = useRef<HTMLElement>(null);
  const { motionEnabled } = useDesktopMotion();
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });
  const y = useSpring(
    useTransform(
      scrollYProgress,
      [0, 0.5, 1],
      index === 0 ? [44, 0, -30] : [58, 0, -42],
    ),
    sceneSpring,
  );
  const scale = useSpring(
    useTransform(scrollYProgress, [0, 0.5, 1], [0.965, 1, 0.982]),
    sceneSpring,
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2, 0.78, 1], [0.72, 1, 1, 0.86]),
    sceneSpring,
  );
  const Icon = iconMap[service.icon] ?? BrainCircuit;
  const headingId = "service-" + service.id + "-heading";

  return (
    <motion.article
      ref={cardRef}
      id={"service-" + service.id}
      aria-labelledby={headingId}
      style={motionEnabled ? { y, scale, opacity } : undefined}
      className="group relative flex min-h-[28rem] flex-col overflow-hidden rounded-[2rem] border border-[var(--color-card-border)] bg-[var(--color-bg-card)] p-6 shadow-[0_28px_80px_-48px_var(--color-shadow)] sm:p-8 lg:p-10"
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[var(--color-accent)] via-[var(--color-accent-secondary)] to-[var(--color-accent-tertiary)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-7 -top-14 font-display text-[10rem] font-semibold leading-none tracking-[-0.09em] text-[var(--color-accent)] opacity-[0.045]"
      >
        0{index + 1}
      </div>

      <div className="relative flex items-start justify-between gap-4">
        <span className="flex size-12 items-center justify-center rounded-2xl border border-[var(--color-card-border)] bg-[var(--color-bg-soft)] text-[var(--color-accent)] shadow-[0_10px_30px_var(--color-shadow)] transition-transform duration-300 group-hover:-translate-y-1 group-hover:rotate-2">
          <Icon className="size-6" strokeWidth={1.8} aria-hidden="true" />
        </span>
        <span className="font-mono text-xs font-semibold text-[var(--color-text-subtle)]">
          0{index + 1}
        </span>
      </div>

      <h3
        id={headingId}
        className="relative mt-12 max-w-lg font-display text-3xl font-semibold leading-[1.06] tracking-[-0.05em] text-[var(--color-text-main)] sm:text-4xl"
      >
        {service.title}
      </h3>

      <div className="relative mt-auto pt-12">
        <div className="h-px bg-[var(--color-divider)]" aria-hidden="true" />
        <p className="mt-6 flex items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.13em] text-[var(--color-text-subtle)]">
          <span className="size-1.5 shrink-0 rounded-full bg-[var(--color-accent-secondary)]" />
          <span>{includesLabel}</span>
        </p>
        <ul className="mt-4 grid gap-3">
          {service.deliverables.map((deliverable) => (
            <li
              key={deliverable}
              className="flex items-center gap-3 rounded-2xl border border-[var(--color-card-border)] bg-[var(--color-bg-soft)] px-4 py-3 text-sm font-semibold text-[var(--color-text-main)]"
            >
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[var(--color-bg-card)] text-[var(--color-accent)]">
                <Check className="size-3.5" strokeWidth={2.6} aria-hidden="true" />
              </span>
              {deliverable}
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
}

export default function CompactServices({ data }: { data: SiteData }) {
  const sectionRef = useRef<HTMLElement>(null);
  const { motionEnabled } = useDesktopMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const headingY = useSpring(
    useTransform(scrollYProgress, [0, 0.45, 1], [28, 0, -34]),
    sceneSpring,
  );
  const cardsY = useSpring(
    useTransform(scrollYProgress, [0, 0.48, 1], [38, 0, -28]),
    sceneSpring,
  );
  const services = data.services.items.filter(
    (service) => service.id !== "websites",
  );

  return (
    <section
      ref={sectionRef}
      id="services"
      aria-labelledby="services-heading"
      className="relative overflow-clip bg-[var(--color-bg-base)] py-20 sm:py-24 lg:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-1/4 h-[34rem] w-[34rem] rounded-full bg-[var(--color-accent)] opacity-[0.055] blur-[140px]"
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          style={motionEnabled ? { y: headingY } : undefined}
          initial={{ y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-70px" }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]">
            {data.services.eyebrow}
          </p>
          <h2
            id="services-heading"
            className="mt-4 font-display text-3xl font-semibold leading-[1.08] tracking-[-0.045em] text-[var(--color-text-main)] sm:text-4xl lg:text-5xl"
          >
            {data.services.title}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[var(--color-text-muted)] sm:text-lg sm:leading-8">
            {data.services.subtitle}
          </p>
        </motion.div>

        <motion.div
          style={motionEnabled ? { y: cardsY } : undefined}
          className="mt-12 grid gap-5 lg:mt-16 lg:grid-cols-2 lg:gap-6"
        >
          {services.map((service, index) => (
            <CompactServiceCard
              key={service.id}
              service={service}
              index={index}
              includesLabel={data.services.includesLabel}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
