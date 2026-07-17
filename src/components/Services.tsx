import type { ElementType } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, BrainCircuit, Check, MonitorUp, PanelsTopLeft } from "lucide-react";
import { SiteData } from "../types";

const iconMap: Record<string, ElementType> = {
  MonitorUp,
  PanelsTopLeft,
  BrainCircuit,
};

export default function Services({ data }: { data: SiteData }) {
  return (
    <section id="services" className="bg-[var(--color-bg-base)] py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-end lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]">
              {data.services.eyebrow}
            </p>
            <h2 className="mt-4 max-w-2xl font-display text-3xl font-semibold leading-[1.08] tracking-[-0.045em] text-[var(--color-text-main)] sm:text-4xl lg:text-5xl">
              {data.services.title}
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: 0.08 }}
            className="max-w-2xl text-base leading-7 text-[var(--color-text-muted)] sm:text-lg sm:leading-8 lg:ml-auto"
          >
            {data.services.subtitle}
          </motion.p>
        </div>

        <div className="mt-12 grid gap-5 lg:mt-16 lg:grid-cols-3">
          {data.services.items.map((service, index) => {
            const Icon = iconMap[service.icon] ?? BrainCircuit;

            return (
              <motion.article
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.45, delay: index * 0.07 }}
                className="group flex h-full flex-col rounded-3xl border border-[var(--color-card-border)] bg-[var(--color-bg-card)] p-5 shadow-[0_12px_40px_var(--color-shadow)] transition duration-300 hover:-translate-y-1 hover:border-[var(--color-divider)] hover:shadow-[0_22px_55px_var(--color-shadow)] sm:p-7"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-[var(--color-bg-soft)] text-[var(--color-accent)]">
                    <Icon className="size-6" strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  <span className="font-mono text-xs font-semibold text-[var(--color-text-subtle)]">
                    0{index + 1}
                  </span>
                </div>

                <h3 className="mt-8 text-xl font-semibold leading-7 tracking-[-0.03em] text-[var(--color-text-main)]">
                  {service.title}
                </h3>
                <p className="mt-4 text-sm leading-6 text-[var(--color-text-muted)]">
                  {service.description}
                </p>

                <div className="mt-6 rounded-2xl border border-[var(--color-card-border)] bg-[var(--color-bg-soft)] p-4">
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-[var(--color-text-subtle)]">
                    {data.services.outcomeLabel}
                  </p>
                  <p className="mt-2 text-sm font-semibold leading-6 text-[var(--color-text-main)]">
                    {service.outcome}
                  </p>
                </div>

                <div className="mt-6">
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-[var(--color-text-subtle)]">
                    {data.services.includesLabel}
                  </p>
                  <ul className="mt-3 space-y-2.5">
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

                <a
                  href={data.actions.startProject.href}
                  className="mt-7 inline-flex min-h-11 items-center gap-2 self-start rounded-full text-sm font-semibold text-[var(--color-accent)] outline-none transition hover:text-[var(--color-accent-strong)] focus-visible:ring-4 focus-visible:ring-[var(--color-glow)]"
                >
                  {service.cta}
                  <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                </a>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
