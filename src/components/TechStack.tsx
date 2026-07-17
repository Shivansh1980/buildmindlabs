import { motion } from "motion/react";
import { SiteData } from "../types";

export default function TechStack({ data }: { data: SiteData }) {
  const { techStack } = data;

  return (
    <section
      aria-labelledby="tech-stack-title"
      className="bg-[var(--color-bg-base)] py-16 transition-colors duration-300 md:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.4 }}
          className="mx-auto mb-9 max-w-3xl text-center"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]">
            {techStack.eyebrow}
          </p>
          <h2
            id="tech-stack-title"
            className="font-display text-2xl font-semibold tracking-[-0.035em] text-[var(--color-text-main)] sm:text-3xl md:text-4xl"
          >
            {techStack.title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-[var(--color-text-muted)] sm:text-base sm:leading-7">
            {techStack.subtitle}
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, delay: 0.05 }}
          className="grid gap-3 rounded-[1.75rem] border border-[var(--color-card-border)] bg-[var(--color-bg-card)] p-3 shadow-[0_20px_60px_-44px_var(--color-shadow)] sm:grid-cols-2 sm:p-4 lg:grid-cols-4"
        >
          {techStack.categories.map((category) => (
            <article
              key={category.name}
              className="rounded-2xl border border-[var(--color-card-border)] bg-[var(--color-bg-soft)] p-5"
            >
              <div className="flex items-center gap-2.5">
                <span
                  aria-hidden="true"
                  className="h-2 w-2 rounded-full bg-[var(--color-accent)] shadow-[0_0_0_4px_var(--color-bg-card)]"
                />
                <h3 className="text-xs font-semibold uppercase tracking-[0.13em] text-[var(--color-text-muted)]">
                  {category.name}
                </h3>
              </div>

              <ul className="mt-4 flex flex-wrap gap-2">
                {category.technologies.map((technology) => (
                  <li
                    key={technology}
                    className="rounded-full border border-[var(--color-card-border)] bg-[var(--color-bg-elevated)] px-3 py-1.5 text-xs font-semibold text-[var(--color-text-main)] shadow-[0_8px_20px_-18px_var(--color-shadow)]"
                  >
                    {technology}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
