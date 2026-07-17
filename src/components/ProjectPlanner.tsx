import { useState, type ElementType } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowUpRight,
  Bot,
  ChartNoAxesCombined,
  Check,
  Clock3,
  Globe2,
  WalletCards,
  Workflow,
} from "lucide-react";
import { SiteData } from "../types";

const iconMap: Record<string, ElementType> = {
  Globe2,
  Bot,
  ChartNoAxesCombined,
  Workflow,
};

export default function ProjectPlanner({ data }: { data: SiteData }) {
  const { projectPlanner } = data;
  const [selectedGoalId, setSelectedGoalId] = useState(
    () => projectPlanner.goals[0]?.id,
  );
  const selectedGoal =
    projectPlanner.goals.find((goal) => goal.id === selectedGoalId) ??
    projectPlanner.goals[0];

  return (
    <section
      id="fit-check"
      aria-labelledby="project-pathfinder-title"
      className="relative overflow-hidden bg-[var(--color-bg-base)] py-20 transition-colors duration-300 md:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-[var(--color-accent)] opacity-[0.07] blur-[100px]"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.45 }}
          className="mx-auto mb-10 max-w-3xl text-center md:mb-14"
        >
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]">
            {projectPlanner.eyebrow}
          </p>
          <h2
            id="project-pathfinder-title"
            className="font-display text-3xl font-semibold tracking-[-0.04em] text-[var(--color-text-main)] sm:text-4xl md:text-5xl"
          >
            {projectPlanner.title}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[var(--color-text-muted)] md:text-lg">
            {projectPlanner.subtitle}
          </p>
        </motion.div>

        <div className="grid items-stretch gap-5 lg:grid-cols-[0.88fr_1.12fr] lg:gap-6">
          <motion.div
            initial={{ x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="rounded-3xl border border-[var(--color-card-border)] bg-[var(--color-bg-soft)] p-4 shadow-[0_16px_50px_var(--color-shadow)] sm:p-6"
          >
            <h3 className="mb-5 text-lg font-semibold tracking-[-0.02em] text-[var(--color-text-main)] sm:text-xl">
              {projectPlanner.questionTitle}
            </h3>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {projectPlanner.goals.map((goal) => {
                const Icon = iconMap[goal.icon] ?? Globe2;
                const isSelected = selectedGoal?.id === goal.id;

                return (
                  <button
                    key={goal.id}
                    type="button"
                    aria-pressed={isSelected}
                    aria-controls="pathfinder-recommendation"
                    onClick={() => setSelectedGoalId(goal.id)}
                    className={`group flex min-h-16 w-full cursor-pointer items-center gap-4 rounded-2xl border p-4 text-left outline-none transition-[background-color,border-color,box-shadow,transform] duration-200 focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-soft)] active:scale-[0.99] ${
                      isSelected
                        ? "border-[var(--color-accent)] bg-[var(--color-bg-elevated)] shadow-[0_12px_35px_var(--color-shadow)]"
                        : "border-[var(--color-card-border)] bg-[var(--color-bg-card)] hover:-translate-y-0.5 hover:border-[var(--color-accent)]"
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors ${
                        isSelected
                          ? "bg-[var(--color-accent)] text-[var(--color-on-accent)]"
                          : "bg-[var(--color-bg-soft)] text-[var(--color-accent)] group-hover:bg-[var(--color-bg-elevated)]"
                      }`}
                    >
                      <Icon className="h-5 w-5" strokeWidth={1.8} />
                    </span>
                    <span className="text-sm font-semibold leading-5 text-[var(--color-text-main)] sm:text-base">
                      {goal.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="relative min-h-[30rem] overflow-hidden rounded-3xl border border-[var(--color-card-border)] bg-[var(--color-bg-elevated)] shadow-[0_24px_70px_var(--color-shadow)]"
          >
            <div
              aria-hidden="true"
              className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[var(--color-accent)] opacity-[0.09] blur-3xl"
            />

            <AnimatePresence mode="wait" initial={false}>
              {selectedGoal && (
                <motion.div
                  id="pathfinder-recommendation"
                  key={selectedGoal.id}
                  role="region"
                  aria-live="polite"
                  aria-labelledby={`pathfinder-${selectedGoal.id}-title`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.22 }}
                  className="relative flex h-full flex-col p-6 sm:p-8 md:p-10"
                >
                  <div className="mb-7">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-accent)]">
                      {projectPlanner.labels.recommendation}
                    </p>
                    <h3
                      id={`pathfinder-${selectedGoal.id}-title`}
                      className="max-w-xl font-display text-2xl font-semibold tracking-[-0.035em] text-[var(--color-text-main)] sm:text-3xl"
                    >
                      {selectedGoal.recommendation}
                    </h3>
                    <p className="mt-4 max-w-2xl text-sm leading-6 text-[var(--color-text-muted)] sm:text-base sm:leading-7">
                      {selectedGoal.description}
                    </p>
                  </div>

                  <dl className="mb-7 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl border border-[var(--color-card-border)] bg-[var(--color-bg-card)] p-4">
                      <dt className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.12em] text-[var(--color-text-muted)]">
                        <Clock3
                          aria-hidden="true"
                          className="h-4 w-4 text-[var(--color-accent)]"
                        />
                        {projectPlanner.labels.timeline}
                      </dt>
                      <dd className="mt-2 text-sm font-semibold text-[var(--color-text-main)] sm:text-base">
                        {selectedGoal.timeline}
                      </dd>
                    </div>
                    <div className="rounded-2xl border border-[var(--color-card-border)] bg-[var(--color-bg-card)] p-4">
                      <dt className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.12em] text-[var(--color-text-muted)]">
                        <WalletCards
                          aria-hidden="true"
                          className="h-4 w-4 text-[var(--color-accent)]"
                        />
                        {projectPlanner.labels.budget}
                      </dt>
                      <dd className="mt-2 text-sm font-semibold text-[var(--color-text-main)] sm:text-base">
                        {selectedGoal.budget}
                      </dd>
                    </div>
                  </dl>

                  <div className="mb-8">
                    <p className="mb-3 text-xs font-medium uppercase tracking-[0.12em] text-[var(--color-text-muted)]">
                      {projectPlanner.labels.includes}
                    </p>
                    <ul className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
                      {selectedGoal.deliverables.map((deliverable) => (
                        <li
                          key={deliverable}
                          className="flex items-start gap-2.5 text-sm leading-5 text-[var(--color-text-main)]"
                        >
                          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--color-bg-soft)] text-[var(--color-accent)]">
                            <Check
                              aria-hidden="true"
                              className="h-3.5 w-3.5"
                              strokeWidth={2.4}
                            />
                          </span>
                          {deliverable}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-auto">
                    <a
                      href={projectPlanner.cta.href}
                      className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--color-accent)] px-6 py-3 text-sm font-semibold text-[var(--color-on-accent)] outline-none transition-[filter,transform,box-shadow] hover:-translate-y-0.5 hover:brightness-105 focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-elevated)] active:translate-y-0"
                    >
                      {projectPlanner.cta.label}
                      <ArrowUpRight
                        aria-hidden="true"
                        className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </a>
                    <p className="mt-4 max-w-xl text-xs leading-5 text-[var(--color-text-muted)]">
                      {projectPlanner.disclaimer}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
