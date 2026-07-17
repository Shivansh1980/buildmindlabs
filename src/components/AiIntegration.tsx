import { motion } from "motion/react";
import { CheckCircle2, Workflow } from "lucide-react";
import { SiteData } from "../types";

export default function AiIntegration({ data }: { data: SiteData }) {
  const { aiIntegrations } = data;
  const splitAt = Math.ceil(aiIntegrations.platforms.length / 2);
  const leftPlatforms = aiIntegrations.platforms.slice(0, splitAt);
  const rightPlatforms = aiIntegrations.platforms.slice(splitAt);

  const platformGroup = (platforms: string[]) => (
    <ul className="grid gap-3 sm:grid-cols-3 md:grid-cols-1 md:gap-4">
      {platforms.map((platform) => (
        <li
          key={platform}
          className="flex min-h-12 items-center justify-center gap-2 rounded-xl border border-[var(--color-card-border)] bg-[var(--color-bg-card)] px-3 py-2.5 text-center text-sm font-semibold text-[var(--color-text-main)] shadow-[0_12px_30px_-24px_var(--color-shadow)]"
        >
          <span
            aria-hidden="true"
            className="h-2 w-2 shrink-0 rounded-full bg-[var(--color-accent)] shadow-[0_0_0_4px_var(--color-bg-soft)]"
          />
          {platform}
        </li>
      ))}
    </ul>
  );

  return (
    <section
      aria-labelledby="ai-integration-title"
      className="overflow-hidden bg-[var(--color-bg-base)] py-20 transition-colors duration-300 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.45 }}
          className="mx-auto mb-10 max-w-3xl text-center md:mb-14"
        >
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
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="relative overflow-hidden rounded-[2rem] border border-[var(--color-card-border)] bg-[var(--color-bg-soft)] px-4 py-8 shadow-[0_24px_70px_-48px_var(--color-shadow)] sm:px-6 md:px-8 md:py-10"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-glow)] opacity-50 blur-[80px]"
          />

          <div className="relative grid gap-0 md:grid-cols-[minmax(0,1fr)_4.5rem_auto_4.5rem_minmax(0,1fr)] md:items-center">
            {platformGroup(leftPlatforms)}

            <div aria-hidden="true" className="relative mx-auto h-8 w-8 md:h-48 md:w-full">
              <span className="absolute left-1/2 top-0 h-full w-px bg-[var(--color-divider)] md:hidden" />
              <span className="absolute left-0 top-[13%] hidden h-[74%] w-px bg-[var(--color-divider)] md:block" />
              <span className="absolute left-0 top-1/2 hidden h-px w-full bg-[var(--color-divider)] md:block" />
              <span className="absolute right-0 top-1/2 hidden h-2 w-2 -translate-y-1/2 translate-x-1/2 rounded-full bg-[var(--color-accent)] md:block" />
              <span className="absolute -left-1 top-[13%] hidden h-2 w-2 -translate-y-1/2 rounded-full border border-[var(--color-accent)] bg-[var(--color-bg-soft)] md:block" />
              <span className="absolute -left-1 top-1/2 hidden h-2 w-2 -translate-y-1/2 rounded-full border border-[var(--color-accent)] bg-[var(--color-bg-soft)] md:block" />
              <span className="absolute -left-1 top-[87%] hidden h-2 w-2 -translate-y-1/2 rounded-full border border-[var(--color-accent)] bg-[var(--color-bg-soft)] md:block" />
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.4, delay: 0.18 }}
              className="relative mx-auto flex h-36 w-36 items-center justify-center rounded-full border border-[var(--color-card-border)] bg-[var(--color-bg-elevated)] p-4 shadow-[0_22px_50px_-32px_var(--color-shadow)] sm:h-40 sm:w-40"
            >
              <span
                aria-hidden="true"
                className="absolute inset-3 rounded-full border border-[var(--color-divider)]"
              />
              <span className="relative flex flex-col items-center gap-2.5 text-center">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--color-accent)] text-[var(--color-on-accent)] shadow-[0_12px_28px_-16px_var(--color-shadow)]">
                  <Workflow aria-hidden="true" className="h-5 w-5" strokeWidth={1.9} />
                </span>
                <span className="max-w-24 text-sm font-semibold leading-5 text-[var(--color-text-main)]">
                  {aiIntegrations.hubLabel}
                </span>
              </span>
            </motion.div>

            <div aria-hidden="true" className="relative mx-auto h-8 w-8 md:h-48 md:w-full">
              <span className="absolute left-1/2 top-0 h-full w-px bg-[var(--color-divider)] md:hidden" />
              <span className="absolute right-0 top-[13%] hidden h-[74%] w-px bg-[var(--color-divider)] md:block" />
              <span className="absolute left-0 top-1/2 hidden h-px w-full bg-[var(--color-divider)] md:block" />
              <span className="absolute left-0 top-1/2 hidden h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-accent)] md:block" />
              <span className="absolute -right-1 top-[13%] hidden h-2 w-2 -translate-y-1/2 rounded-full border border-[var(--color-accent)] bg-[var(--color-bg-soft)] md:block" />
              <span className="absolute -right-1 top-1/2 hidden h-2 w-2 -translate-y-1/2 rounded-full border border-[var(--color-accent)] bg-[var(--color-bg-soft)] md:block" />
              <span className="absolute -right-1 top-[87%] hidden h-2 w-2 -translate-y-1/2 rounded-full border border-[var(--color-accent)] bg-[var(--color-bg-soft)] md:block" />
            </div>

            {platformGroup(rightPlatforms)}
          </div>
        </motion.div>

        <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {aiIntegrations.benefits.map((benefit, index) => (
            <motion.li
              key={benefit.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="rounded-2xl border border-[var(--color-card-border)] bg-[var(--color-bg-card)] p-5 shadow-[0_16px_40px_-34px_var(--color-shadow)]"
            >
              <CheckCircle2
                aria-hidden="true"
                className="mb-4 h-5 w-5 text-[var(--color-accent)]"
                strokeWidth={2}
              />
              <h3 className="text-base font-semibold tracking-[-0.02em] text-[var(--color-text-main)]">
                {benefit.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-[var(--color-text-muted)]">
                {benefit.description}
              </p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
