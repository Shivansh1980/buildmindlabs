import { motion } from "motion/react";
import { ArrowDown } from "lucide-react";
import { SiteData } from "../types";

export default function Process({ data }: { data: SiteData }) {
  return (
    <section id="process" className="bg-[var(--color-bg-base)] py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]">
              {data.process.eyebrow}
            </p>
            <h2 className="mt-4 max-w-3xl font-display text-3xl font-semibold leading-[1.08] tracking-[-0.045em] text-[var(--color-text-main)] sm:text-4xl lg:text-5xl">
              {data.process.title}
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: 0.08 }}
            className="max-w-2xl text-base leading-7 text-[var(--color-text-muted)] sm:text-lg sm:leading-8 lg:ml-auto"
          >
            {data.process.subtitle}
          </motion.p>
        </div>

        <ol className="mt-12 grid gap-4 lg:mt-16 lg:grid-cols-4">
          {data.process.steps.map((step, index) => (
            <motion.li
              key={step.step}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.07 }}
              className="relative flex min-h-72 flex-col rounded-3xl border border-[var(--color-card-border)] bg-[var(--color-bg-card)] p-6 shadow-[0_12px_38px_var(--color-shadow)] sm:p-7"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm font-semibold text-[var(--color-accent)]">
                  {step.step}
                </span>
                {index < data.process.steps.length - 1 && (
                  <span className="flex size-8 items-center justify-center rounded-full bg-[var(--color-bg-soft)] text-[var(--color-text-subtle)] lg:absolute lg:-right-[1.05rem] lg:top-7 lg:z-10 lg:rotate-[-90deg] lg:border lg:border-[var(--color-card-border)] lg:bg-[var(--color-bg-base)]">
                    <ArrowDown className="size-4" aria-hidden="true" />
                  </span>
                )}
              </div>
              <h3 className="mt-10 text-xl font-semibold leading-7 tracking-[-0.03em] text-[var(--color-text-main)]">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-[var(--color-text-muted)]">
                {step.description}
              </p>
              <p className="mt-auto border-t border-[var(--color-card-border)] pt-5 text-xs font-semibold leading-5 text-[var(--color-text-subtle)]">
                {step.meta}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
