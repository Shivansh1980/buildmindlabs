import { useState, type FormEvent } from "react";
import { ArrowUpRight, Clock3, Mail, MapPin, Send } from "lucide-react";
import { motion } from "motion/react";
import { SiteData } from "../types";

const fieldClassName =
  "w-full rounded-xl border border-[var(--color-card-border)] bg-[var(--color-bg-soft)] px-4 py-3.5 text-sm text-[var(--color-text-main)] outline-none transition placeholder:text-[var(--color-text-subtle)] hover:border-[var(--color-divider)] focus:border-[var(--color-accent)] focus:ring-4 focus:ring-[var(--color-glow)]";

export default function Cta({ data }: { data: SiteData }) {
  const [statusMessage, setStatusMessage] = useState("");
  const { fields } = data.cta.form;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const valueFor = (name: string) => String(formData.get(name) ?? "").trim();
    const name = valueFor("name");
    const email = valueFor("email");
    const company = valueFor("company");
    const projectTypeValue = valueFor("projectType");
    const budgetValue = valueFor("budget");
    const message = valueFor("message");
    const projectType =
      data.cta.form.projectTypes.find((option) => option.value === projectTypeValue)?.label ??
      projectTypeValue;
    const budget =
      data.cta.form.budgetRanges.find((option) => option.value === budgetValue)?.label ??
      budgetValue;

    const subject = [data.cta.form.subjectPrefix, company || name]
      .filter(Boolean)
      .join(" — ");
    const details = [
      `${fields.name.label}: ${name}`,
      `${fields.email.label}: ${email}`,
      ...(company ? [`${fields.company.label}: ${company}`] : []),
      `${fields.projectType.label}: ${projectType}`,
      `${fields.budget.label}: ${budget}`,
    ];
    const body = [...details, "", `${fields.message.label}:`, message].join("\n");
    const mailtoHref = `mailto:${data.brand.email.trim()}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    setStatusMessage(data.cta.form.statusText);
    window.location.href = mailtoHref;
  };

  const configuredEmailHref = data.actions.email.href.trim();
  const hasDirectEmailLink = configuredEmailHref.length > 0 && configuredEmailHref !== "#";

  return (
    <section
      id="contact"
      className="relative isolate overflow-hidden border-t border-[var(--color-card-border)] bg-[var(--color-bg-soft)] py-20 sm:py-24 lg:py-28"
    >
      <div
        className="pointer-events-none absolute -left-24 top-8 -z-10 h-80 w-80 rounded-full bg-[var(--color-accent)] opacity-[0.08] blur-[110px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-32 bottom-0 -z-10 h-96 w-96 rounded-full bg-[var(--color-accent)] opacity-[0.06] blur-[130px]"
        aria-hidden="true"
      />

      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16 lg:px-8 xl:gap-24">
        <motion.div
          initial={{ y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
          className="self-center"
        >
          <p className="mb-5 inline-flex rounded-full border border-[var(--color-card-border)] bg-[var(--color-bg-card)] px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-accent)] shadow-[0_8px_30px_var(--color-shadow)]">
            {data.cta.eyebrow}
          </p>
          <h2
            id="contact-heading"
            className="max-w-xl font-display text-4xl font-semibold leading-[1.06] tracking-[-0.04em] text-[var(--color-text-main)] sm:text-5xl lg:text-[3.5rem]"
          >
            {data.cta.title}
          </h2>
          <p className="mt-6 max-w-xl text-base leading-7 text-[var(--color-text-muted)] sm:text-lg">
            {data.cta.subtitle}
          </p>

          {hasDirectEmailLink && (
            <a
              href={configuredEmailHref}
              className="group mt-9 flex max-w-lg items-center gap-4 rounded-2xl border border-[var(--color-card-border)] bg-[var(--color-bg-card)] p-4 shadow-[0_8px_30px_var(--color-shadow)] transition duration-300 hover:-translate-y-0.5 hover:border-[var(--color-divider)] hover:shadow-[0_16px_44px_var(--color-shadow)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--color-glow)]"
            >
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[var(--color-bg-elevated)] text-[var(--color-accent)]">
                <Mail className="size-5" aria-hidden="true" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-text-subtle)]">
                  {data.cta.directContactLabel}
                </span>
                <span className="mt-1 block truncate text-sm font-semibold text-[var(--color-text-main)] sm:text-base">
                  {data.brand.email}
                </span>
              </span>
              <ArrowUpRight
                className="size-5 shrink-0 text-[var(--color-text-subtle)] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--color-accent)]"
                aria-hidden="true"
              />
            </a>
          )}

          {(data.brand.responseTime || data.brand.location) && (
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm text-[var(--color-text-muted)]">
              {data.brand.responseTime && (
                <span className="inline-flex items-center gap-2">
                  <Clock3 className="size-4 text-[var(--color-accent)]" aria-hidden="true" />
                  {data.brand.responseTime}
                </span>
              )}
              {data.brand.location && (
                <span className="inline-flex items-center gap-2">
                  <MapPin className="size-4 text-[var(--color-accent)]" aria-hidden="true" />
                  {data.brand.location}
                </span>
              )}
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="rounded-3xl border border-[var(--color-card-border)] bg-[var(--color-bg-card)] p-5 shadow-[0_20px_70px_var(--color-shadow)] sm:p-7 lg:p-8"
        >
          <form onSubmit={handleSubmit} aria-labelledby="contact-heading" className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="contact-name" className="block text-sm font-semibold text-[var(--color-text-main)]">
                  {fields.name.label}
                </label>
                <input
                  required
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  className={fieldClassName}
                  placeholder={fields.name.placeholder}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="contact-email" className="block text-sm font-semibold text-[var(--color-text-main)]">
                  {fields.email.label}
                </label>
                <input
                  required
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className={fieldClassName}
                  placeholder={fields.email.placeholder}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="contact-company" className="block text-sm font-semibold text-[var(--color-text-main)]">
                {fields.company.label}
              </label>
              <input
                id="contact-company"
                name="company"
                type="text"
                autoComplete="organization"
                className={fieldClassName}
                placeholder={fields.company.placeholder}
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="contact-project-type" className="block text-sm font-semibold text-[var(--color-text-main)]">
                  {fields.projectType.label}
                </label>
                <select
                  id="contact-project-type"
                  name="projectType"
                  className={`${fieldClassName} appearance-none`}
                >
                  {data.cta.form.projectTypes.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label htmlFor="contact-budget" className="block text-sm font-semibold text-[var(--color-text-main)]">
                  {fields.budget.label}
                </label>
                <select
                  id="contact-budget"
                  name="budget"
                  className={`${fieldClassName} appearance-none`}
                >
                  {data.cta.form.budgetRanges.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="contact-message" className="block text-sm font-semibold text-[var(--color-text-main)]">
                {fields.message.label}
              </label>
              <textarea
                required
                id="contact-message"
                name="message"
                rows={5}
                className={`${fieldClassName} resize-y`}
                placeholder={fields.message.placeholder}
              />
            </div>

            <div className="pt-1">
              <button
                type="submit"
                className="group inline-flex w-full items-center justify-center gap-2.5 rounded-xl bg-[var(--color-accent)] px-5 py-4 text-sm font-semibold text-[var(--color-on-accent)] shadow-[0_12px_30px_var(--color-glow)] transition duration-300 hover:-translate-y-0.5 hover:bg-[var(--color-accent-strong)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--color-glow)] active:translate-y-0"
              >
                {data.cta.form.submitLabel}
                <Send className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </button>
              <p
                role="status"
                aria-live="polite"
                className="mt-3 min-h-5 text-center text-sm font-medium text-[var(--color-accent)]"
              >
                {statusMessage}
              </p>
              <p className="mt-1 text-center text-xs leading-5 text-[var(--color-text-subtle)]">
                {data.cta.form.privacyNote}
              </p>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
