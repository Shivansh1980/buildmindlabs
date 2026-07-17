import { motion } from "motion/react";
import { CircleDot } from "lucide-react";
import { SiteData } from "../types";

export default function Industries({ data }: { data: SiteData }) {
  const { industries } = data;

  return (
    <section
      aria-labelledby="industries-title"
      className="bg-[var(--color-bg-base)] py-16 text-[var(--color-text-main)] transition-colors duration-300 md:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.4 }}
          className="mx-auto mb-9 max-w-3xl text-center md:mb-11"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]">
            {industries.eyebrow}
          </p>
          <h2
            id="industries-title"
            className="font-display text-3xl font-semibold leading-[1.1] tracking-[-0.04em] text-[var(--color-text-main)] sm:text-4xl md:text-5xl"
          >
            {industries.title}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[var(--color-text-muted)]">
            {industries.subtitle}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.42, delay: 0.04 }}
          className="rounded-[1.75rem] border border-[var(--color-card-border)] bg-[var(--color-bg-card)] p-3 shadow-[0_20px_60px_-44px_var(--color-shadow)] sm:p-4"
        >
          <ul className="grid min-w-0 grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
            {industries.items.map((industry) => (
              <li
                key={industry}
                className="flex min-w-0 items-center justify-center gap-2 rounded-xl border border-[var(--color-card-border)] bg-[var(--color-bg-soft)] px-3 py-3 text-center text-sm font-semibold leading-5 text-[var(--color-text-main)]"
              >
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent)]"
                />
                <span className="min-w-0 break-words">{industry}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {industries.useCases.map((useCase, index) => (
            <motion.article
              key={useCase.industry}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="group rounded-2xl border border-[var(--color-card-border)] bg-[var(--color-bg-elevated)] p-5 shadow-[0_16px_44px_-36px_var(--color-shadow)] transition-[border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-[var(--color-accent)] sm:p-6"
            >
              <CircleDot
                aria-hidden="true"
                className="mb-5 h-5 w-5 text-[var(--color-accent)]"
                strokeWidth={1.8}
              />
              <h3 className="text-base font-semibold tracking-[-0.02em] text-[var(--color-text-main)] sm:text-lg">
                {useCase.industry}
              </h3>
              <p className="mt-3 text-sm leading-6 text-[var(--color-text-muted)]">
                {useCase.case}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
