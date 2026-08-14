import { AnimatePresence, motion } from "motion/react";
import {
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
  MapPin,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";
import type { SiteData } from "../types";

export default function FounderCompact({ data }: { data: SiteData }) {
  const { founder } = data;
  const [activePersonId, setActivePersonId] = useState<string | null>(null);
  const shouldReduceMotion = false;
  const activePerson =
    founder.people.find((person) => person.id === activePersonId) ?? null;

  if (founder.people.length === 0) return null;

  return (
    <section
      id="about"
      aria-labelledby="founder-heading"
      className="relative overflow-hidden border-y border-[var(--color-card-border)] bg-[var(--color-bg-base)] py-16 sm:py-20 lg:py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-44 size-[30rem] rounded-full bg-[var(--color-glow)] opacity-60 blur-3xl"
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={shouldReduceMotion ? false : { y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45 }}
          className="grid gap-5 lg:grid-cols-[0.72fr_1.28fr] lg:items-end lg:gap-14"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]">
              {founder.eyebrow}
            </p>
            <h2
              id="founder-heading"
              className="mt-3 font-display text-3xl font-semibold leading-[1.08] tracking-[-0.045em] text-[var(--color-text-main)] sm:text-4xl"
            >
              {founder.title}
            </h2>
          </div>
          <p className="max-w-2xl text-sm leading-6 text-[var(--color-text-muted)] sm:text-base sm:leading-7">
            {founder.subtitle}
          </p>
        </motion.div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {founder.people.map((person, index) => {
            const isOpen = person.id === activePersonId;
            const detailId = "person-detail-" + person.id;

            return (
              <motion.article
                key={person.id}
                initial={shouldReduceMotion ? false : { y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                className={
                  "group rounded-[1.5rem] border bg-[var(--color-bg-card)] p-5 shadow-[0_16px_48px_-38px_var(--color-shadow)] transition duration-300 " +
                  (isOpen
                    ? "border-[var(--color-accent)] shadow-[0_20px_52px_-34px_var(--color-glow)]"
                    : "border-[var(--color-card-border)] hover:-translate-y-1 hover:border-[var(--color-divider)]")
                }
              >
                <div className="flex items-center gap-4">
                  <div className="flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-[var(--color-card-border)] bg-[linear-gradient(145deg,var(--color-accent-soft),var(--color-bg-soft))] font-display text-lg font-semibold text-[var(--color-accent)]">
                    {person.portrait?.src ? (
                      <img
                        src={person.portrait.src}
                        alt={person.portrait.alt}
                        width="56"
                        height="56"
                        loading="lazy"
                        className="size-full object-cover"
                      />
                    ) : (
                      <span aria-hidden="true">{person.initials}</span>
                    )}
                  </div>
                  <div className="min-w-0">
                    <h3 className="truncate font-display text-lg font-semibold tracking-[-0.03em] text-[var(--color-text-main)]">
                      {person.name}
                    </h3>
                    <p className="mt-1 truncate text-xs font-semibold text-[var(--color-accent)]">
                      {person.role}
                    </p>
                  </div>
                </div>

                <p className="mt-5 flex items-center gap-2 text-xs text-[var(--color-text-muted)]">
                  <MapPin className="size-3.5" aria-hidden="true" />
                  {person.location}
                </p>

                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={detailId}
                  onClick={() =>
                    setActivePersonId((current) =>
                      current === person.id ? null : person.id,
                    )
                  }
                  className="mt-5 flex min-h-11 w-full items-center justify-between rounded-xl border border-[var(--color-card-border)] bg-[var(--color-bg-soft)] px-4 text-sm font-semibold text-[var(--color-text-main)] transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--color-glow)]"
                >
                  <span>{isOpen ? "Close details" : "Know more"}</span>
                  <ChevronDown
                    className={
                      "size-4 transition-transform duration-300 " +
                      (isOpen ? "rotate-180" : "")
                    }
                    aria-hidden="true"
                  />
                </button>
              </motion.article>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          {activePerson && (
            <motion.article
              key={activePerson.id}
              id={"person-detail-" + activePerson.id}
              initial={
                shouldReduceMotion
                  ? false
                  : { opacity: 0, y: 18, height: 0 }
              }
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={
                shouldReduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: -10, height: 0 }
              }
              transition={{ duration: shouldReduceMotion ? 0 : 0.38 }}
              className="mt-5 overflow-hidden rounded-[2rem] border border-[var(--color-accent)] bg-[var(--color-bg-card)] shadow-[0_26px_80px_-50px_var(--color-glow)]"
            >
              <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[0.84fr_1.16fr] lg:p-10">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-accent)]">
                    Person responsible
                  </p>
                  <h3 className="mt-3 font-display text-3xl font-semibold tracking-[-0.045em] text-[var(--color-text-main)]">
                    {activePerson.name}
                  </h3>
                  <p className="mt-1 text-sm font-semibold text-[var(--color-accent)]">
                    {activePerson.role}
                  </p>
                  <p className="mt-5 text-sm leading-7 text-[var(--color-text-muted)] sm:text-base">
                    {activePerson.bio}
                  </p>
                  <a
                    href={data.actions.startProject.href}
                    className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-[var(--color-accent)] px-5 text-sm font-semibold text-[var(--color-on-accent)] shadow-[0_12px_32px_var(--color-glow)] transition hover:-translate-y-0.5 hover:bg-[var(--color-accent-strong)]"
                  >
                    {activePerson.ctaLabel}
                    <ArrowUpRight className="size-4" aria-hidden="true" />
                  </a>
                </div>

                <div>
                  <dl className="grid grid-cols-2 overflow-hidden rounded-2xl border border-[var(--color-card-border)] bg-[var(--color-bg-soft)]">
                    {activePerson.proofPoints.map((point, pointIndex) => (
                      <div
                        key={activePerson.id + "-" + point.label}
                        className={
                          "p-4 sm:p-5 " +
                          (pointIndex % 2 === 1
                            ? "border-l border-[var(--color-card-border)] "
                            : "") +
                          (pointIndex > 1
                            ? "border-t border-[var(--color-card-border)]"
                            : "")
                        }
                      >
                        <dt className="font-display text-lg font-semibold tracking-[-0.025em] text-[var(--color-text-main)]">
                          {point.value}
                        </dt>
                        <dd className="mt-1 text-xs leading-5 text-[var(--color-text-muted)]">
                          {point.label}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  <div className="mt-4 flex items-start gap-3 rounded-2xl border border-[var(--color-card-border)] bg-[var(--color-bg-soft)] p-4">
                    <CheckCircle2
                      className="mt-0.5 size-5 shrink-0 text-[var(--color-accent)]"
                      aria-hidden="true"
                    />
                    <p className="text-xs font-medium leading-5 text-[var(--color-text-main)]">
                      {founder.trustStatement}
                    </p>
                  </div>

                  <div className="mt-3 flex items-start gap-3 px-1">
                    <ShieldCheck
                      className="mt-0.5 size-4 shrink-0 text-[var(--color-text-subtle)]"
                      aria-hidden="true"
                    />
                    <p className="text-xs leading-5 text-[var(--color-text-muted)]">
                      {activePerson.disclaimer}
                    </p>
                  </div>
                </div>
              </div>
            </motion.article>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
