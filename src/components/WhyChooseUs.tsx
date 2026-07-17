import type { ElementType } from "react";
import { motion } from "motion/react";
import { Check, GitPullRequestArrow, Presentation, ScanSearch, ShieldCheck } from "lucide-react";
import { SiteData } from "../types";

const iconMap: Record<string, ElementType> = {
  ScanSearch,
  Presentation,
  GitPullRequestArrow,
  ShieldCheck,
};

export default function WhyChooseUs({ data }: { data: SiteData }) {
  return (
    <section id="delivery-trust" className="border-y border-[var(--color-card-border)] bg-[var(--color-bg-soft)] py-20 sm:py-24 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16 lg:px-8">
        <motion.div
          initial={{ y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          className="lg:sticky lg:top-28 lg:self-start"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]">
            {data.whyChooseUs.eyebrow}
          </p>
          <h2 className="mt-4 font-display text-3xl font-semibold leading-[1.08] tracking-[-0.045em] text-[var(--color-text-main)] sm:text-4xl lg:text-5xl">
            {data.whyChooseUs.title}
          </h2>
          <p className="mt-5 text-base leading-7 text-[var(--color-text-muted)] sm:text-lg sm:leading-8">
            {data.whyChooseUs.subtitle}
          </p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2">
          {data.whyChooseUs.reasons.map((reason, index) => {
            const Icon = iconMap[reason.icon] ?? ShieldCheck;

            return (
              <motion.article
                key={reason.title}
                initial={{ y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                className="flex min-h-80 flex-col rounded-3xl border border-[var(--color-card-border)] bg-[var(--color-bg-card)] p-6 shadow-[0_12px_38px_var(--color-shadow)] sm:p-7"
              >
                <span className="flex size-12 items-center justify-center rounded-2xl bg-[var(--color-bg-soft)] text-[var(--color-accent)]">
                  <Icon className="size-6" strokeWidth={1.8} aria-hidden="true" />
                </span>
                <h3 className="mt-7 text-xl font-semibold tracking-[-0.03em] text-[var(--color-text-main)]">
                  {reason.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[var(--color-text-muted)]">
                  {reason.description}
                </p>
                <div className="mt-auto flex items-start gap-2.5 rounded-2xl border border-[var(--color-card-border)] bg-[var(--color-bg-soft)] p-3.5 text-xs font-medium leading-5 text-[var(--color-text-main)]">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-[var(--color-bg-card)] text-[var(--color-accent)]">
                    <Check className="size-3" strokeWidth={2.5} aria-hidden="true" />
                  </span>
                  {reason.proof}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
