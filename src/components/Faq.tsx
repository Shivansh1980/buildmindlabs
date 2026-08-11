import { useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, ChevronDown, MessagesSquare } from "lucide-react";
import { SiteData } from "../types";

export default function Faq({ data }: { data: SiteData }) {
  const { faqs } = data;
  const [openQuestion, setOpenQuestion] = useState<string | null>(
    () => faqs.items[0]?.question ?? null,
  );

  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="bg-[var(--color-bg-soft)] py-20 transition-colors duration-300 md:py-28"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.4 }}
          className="mx-auto mb-10 max-w-3xl text-center md:mb-12"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]">
            {faqs.eyebrow}
          </p>
          <h2
            id="faq-title"
            className="font-display text-3xl font-semibold leading-[1.1] tracking-[-0.04em] text-[var(--color-text-main)] sm:text-4xl md:text-5xl"
          >
            {faqs.title}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[var(--color-text-muted)]">
            {faqs.subtitle}
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.42, delay: 0.04 }}
          className="space-y-3"
        >
          {faqs.items.map((faq, index) => {
            const isOpen = openQuestion === faq.question;
            const triggerId = `faq-trigger-${index}`;
            const panelId = `faq-panel-${index}`;

            return (
              <div
                key={faq.question}
                className={`overflow-hidden rounded-2xl border bg-[var(--color-bg-card)] shadow-[0_14px_40px_-36px_var(--color-shadow)] transition-colors duration-200 ${
                  isOpen
                    ? "border-[var(--color-accent)]"
                    : "border-[var(--color-card-border)]"
                }`}
              >
                <h3>
                  <button
                    id={triggerId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() =>
                      setOpenQuestion(isOpen ? null : faq.question)
                    }
                    className="flex w-full items-center justify-between gap-5 rounded-2xl px-5 py-5 text-left text-base font-semibold tracking-[-0.02em] text-[var(--color-text-main)] outline-none transition-colors hover:bg-[var(--color-bg-hover)] focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-inset sm:px-6 sm:text-lg"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      aria-hidden="true"
                      className={`h-5 w-5 shrink-0 text-[var(--color-accent)] transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                      strokeWidth={2}
                    />
                  </button>
                </h3>

                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={triggerId}
                  aria-hidden={!isOpen}
                  initial={false}
                  animate={{
                    height: isOpen ? "auto" : 0,
                    opacity: isOpen ? 1 : 0,
                  }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-6 pr-12 text-sm leading-6 text-[var(--color-text-muted)] sm:px-6 sm:pr-16 sm:text-base sm:leading-7">
                    {faq.answer}
                  </p>
                </motion.div>
              </div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          className="mt-8 flex flex-col gap-5 rounded-3xl border border-[var(--color-card-border)] bg-[var(--color-bg-card)] p-5 shadow-[0_18px_50px_-42px_var(--color-shadow)] sm:flex-row sm:items-center sm:justify-between sm:p-6"
        >
          <div className="flex items-start gap-4">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-[var(--color-accent-soft)] text-[var(--color-accent)]">
              <MessagesSquare className="size-5" aria-hidden="true" />
            </span>
            <div>
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.15em] text-[var(--color-accent)]">
                {data.community.eyebrow}
              </p>
              <p className="mt-1 font-display text-lg font-semibold tracking-[-0.025em] text-[var(--color-text-main)]">
                {data.community.title}
              </p>
              <p className="mt-1 max-w-xl text-sm leading-6 text-[var(--color-text-muted)]">
                {data.community.description}
              </p>
            </div>
          </div>
          <a
            href={data.community.href}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-[var(--color-accent)] px-5 text-sm font-semibold text-[var(--color-on-accent)] shadow-[0_12px_30px_var(--color-glow)] transition hover:-translate-y-0.5 hover:bg-[var(--color-accent-strong)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--color-glow)]"
          >
            {data.community.label}
            <ArrowUpRight
              aria-hidden="true"
              className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
