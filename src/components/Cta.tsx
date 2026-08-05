import { useState, type FormEvent } from "react";
import {
  ArrowUpRight,
  Clock3,
  LoaderCircle,
  Mail,
  MapPin,
  Send,
} from "lucide-react";
import { motion } from "motion/react";
import { SiteData } from "../types";
import {
  CONTACT_FIELD_LIMITS,
  ContactApiError,
  getClientRateLimit,
  recordClientSubmission,
  submitContact,
  type ContactRateLimitConfig,
} from "../lib/contactApi";

const fieldClassName =
  "w-full rounded-xl border border-[var(--color-card-border)] bg-[var(--color-bg-soft)] px-4 py-3.5 text-sm text-[var(--color-text-main)] outline-none transition placeholder:text-[var(--color-text-subtle)] hover:border-[var(--color-divider)] focus:border-[var(--color-accent)] focus:ring-4 focus:ring-[var(--color-glow)]";

type FormStatus = {
  kind: "idle" | "submitting" | "success" | "error";
  message: string;
};

export default function Cta({ data }: { data: SiteData }) {
  const [formStatus, setFormStatus] = useState<FormStatus>({
    kind: "idle",
    message: "",
  });
  const { fields } = data.cta.form;
  const isSubmitting = formStatus.kind === "submitting";
  const endpoint =
    import.meta.env.VITE_CONTACT_API_URL?.trim() || data.cta.form.endpoint;
  const rateLimitConfig: ContactRateLimitConfig = {
    cooldownSeconds: data.cta.form.clientRateLimit.cooldownSeconds,
    windowSeconds: data.cta.form.clientRateLimit.windowSeconds,
    maxSubmissions: data.cta.form.clientRateLimit.maxSubmissions,
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) {
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);
    const valueFor = (name: string) => String(formData.get(name) ?? "").trim();
    const name = valueFor("name");
    const email = valueFor("email");
    const company = valueFor("company");
    const projectTypeValue = valueFor("projectType");
    const budgetValue = valueFor("budget");
    const message = valueFor("message");
    const website = valueFor("website");
    const projectType = data.cta.form.projectTypes.find(
      (option) => option.value === projectTypeValue,
    )?.label;
    const budget = data.cta.form.budgetRanges.find(
      (option) => option.value === budgetValue,
    )?.label;

    if (website) {
      form.reset();
      setFormStatus({
        kind: "success",
        message: data.cta.form.successText,
      });
      return;
    }

    if (!projectType || !budget) {
      setFormStatus({
        kind: "error",
        message: data.cta.form.validationErrorText,
      });
      return;
    }

    const clientLimit = getClientRateLimit(rateLimitConfig);
    if (clientLimit.limited) {
      setFormStatus({
        kind: "error",
        message: data.cta.form.rateLimitText.replace(
          "{seconds}",
          String(clientLimit.retryAfterSeconds),
        ),
      });
      return;
    }

    setFormStatus({
      kind: "submitting",
      message: data.cta.form.submittingText,
    });

    try {
      await submitContact(
        endpoint,
        {
          name,
          email,
          company,
          projectType,
          budget,
          message,
          website,
        },
        data.cta.form.requestTimeoutMs,
      );
      recordClientSubmission(rateLimitConfig);
      form.reset();
      setFormStatus({
        kind: "success",
        message: data.cta.form.successText,
      });
    } catch (error) {
      const isRateLimited =
        error instanceof ContactApiError && error.code === "rate-limited";
      const retryAfterSeconds =
        error instanceof ContactApiError ? error.retryAfterSeconds : undefined;

      setFormStatus({
        kind: "error",
        message: isRateLimited
          ? data.cta.form.rateLimitText.replace(
              "{seconds}",
              String(retryAfterSeconds ?? 60),
            )
          : error instanceof ContactApiError && error.code === "validation"
            ? data.cta.form.validationErrorText
            : data.cta.form.errorText,
      });
    }
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
          <form
            onSubmit={handleSubmit}
            aria-labelledby="contact-heading"
            aria-busy={isSubmitting}
            className="relative space-y-5"
          >
            <div
              className="pointer-events-none absolute -left-[10000px] top-auto size-px overflow-hidden opacity-0"
              aria-hidden="true"
            >
              <label htmlFor="contact-website">Leave this field empty</label>
              <input
                id="contact-website"
                name="website"
                type="text"
                autoComplete="off"
                maxLength={CONTACT_FIELD_LIMITS.website.max}
                tabIndex={-1}
              />
            </div>

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
                  minLength={CONTACT_FIELD_LIMITS.name.min}
                  maxLength={CONTACT_FIELD_LIMITS.name.max}
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
                  maxLength={CONTACT_FIELD_LIMITS.email.max}
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
                maxLength={CONTACT_FIELD_LIMITS.company.max}
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
                  required
                  defaultValue=""
                  className={`${fieldClassName} appearance-none`}
                >
                  <option value="" disabled>
                    {fields.projectType.placeholder}
                  </option>
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
                  required
                  defaultValue=""
                  className={`${fieldClassName} appearance-none`}
                >
                  <option value="" disabled>
                    {fields.budget.placeholder}
                  </option>
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
                minLength={CONTACT_FIELD_LIMITS.message.min}
                maxLength={CONTACT_FIELD_LIMITS.message.max}
                className={`${fieldClassName} resize-y`}
                placeholder={fields.message.placeholder}
              />
            </div>

            <div className="pt-1">
              <button
                type="submit"
                disabled={isSubmitting}
                className="group inline-flex w-full items-center justify-center gap-2.5 rounded-xl bg-[var(--color-accent)] px-5 py-4 text-sm font-semibold text-[var(--color-on-accent)] shadow-[0_12px_30px_var(--color-glow)] transition duration-300 hover:-translate-y-0.5 hover:bg-[var(--color-accent-strong)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--color-glow)] active:translate-y-0 disabled:cursor-wait disabled:opacity-70 disabled:hover:translate-y-0"
              >
                {isSubmitting
                  ? data.cta.form.submittingLabel
                  : data.cta.form.submitLabel}
                {isSubmitting ? (
                  <LoaderCircle
                    className="size-4 animate-spin"
                    aria-hidden="true"
                  />
                ) : (
                  <Send
                    className="size-4 transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                )}
              </button>
              <p
                role={formStatus.kind === "error" ? "alert" : "status"}
                aria-live={formStatus.kind === "error" ? "assertive" : "polite"}
                className={`mt-3 min-h-5 text-center text-sm font-medium ${
                  formStatus.kind === "error"
                    ? "text-[var(--color-danger,var(--color-text-main))]"
                    : "text-[var(--color-accent)]"
                }`}
              >
                {formStatus.message}
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
