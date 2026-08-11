import { motion } from "motion/react";
import {
  Gauge,
  Layers3,
  ShieldCheck,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import type { SiteData } from "../types";

const iconMap: Record<string, LucideIcon> = {
  Gauge,
  Layers3,
  ShieldCheck,
  Sparkles,
};

export default function ModernTechnology({ data }: { data: SiteData }) {
  const { techStack } = data;

  return (
    <section
      aria-labelledby="technology-title"
      className="bg-[var(--color-bg-soft)] py-16 transition-colors duration-300 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[2rem] border border-[var(--color-card-border)] bg-[var(--color-bg-card)] shadow-[0_24px_70px_-50px_var(--color-shadow)]">
          <div className="grid lg:grid-cols-[0.86fr_1.14fr]">
            <motion.div
              initial={{ y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45 }}
              className="relative overflow-hidden border-b border-[var(--color-card-border)] p-6 sm:p-8 lg:border-b-0 lg:border-r lg:p-10"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-28 -left-24 size-72 rounded-full bg-[var(--color-glow)] opacity-70 blur-3xl"
              />
              <p className="relative text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]">
                {techStack.eyebrow}
              </p>
              <h2
                id="technology-title"
                className="relative mt-4 font-display text-3xl font-semibold leading-[1.08] tracking-[-0.045em] text-[var(--color-text-main)] sm:text-4xl"
              >
                {techStack.title}
              </h2>
              <p className="relative mt-5 max-w-xl text-sm leading-7 text-[var(--color-text-muted)] sm:text-base">
                {techStack.subtitle}
              </p>
            </motion.div>

            <div className="grid gap-px bg-[var(--color-card-border)] sm:grid-cols-2">
              {techStack.principles.map((principle, index) => {
                const Icon = iconMap[principle.icon] ?? Sparkles;

                return (
                  <motion.article
                    key={principle.title}
                    initial={{ y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="group bg-[var(--color-bg-card)] p-6 transition-colors duration-300 hover:bg-[var(--color-bg-hover)] sm:p-7"
                  >
                    <span className="flex size-10 items-center justify-center rounded-xl bg-[var(--color-bg-soft)] text-[var(--color-accent)] transition-transform duration-300 group-hover:-translate-y-0.5">
                      <Icon className="size-5" strokeWidth={1.8} aria-hidden="true" />
                    </span>
                    <h3 className="mt-5 text-base font-semibold tracking-[-0.025em] text-[var(--color-text-main)]">
                      {principle.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-[var(--color-text-muted)]">
                      {principle.description}
                    </p>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
