import { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import {
  ArrowUpRight,
  BarChart3,
  Bot,
  Check,
  Globe2,
  PanelsTopLeft,
  ScanSearch,
  ShieldCheck,
  Sparkles,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { SiteData } from "../types";

type Project = SiteData["projects"]["items"][number];
type ExperienceItem = SiteData["projects"]["experienceItems"][number];

const experienceIcons: Record<string, LucideIcon> = {
  Workflow,
  ShieldCheck,
  PanelsTopLeft,
  ScanSearch,
};

function useDesktopLayout() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(query.matches);

    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return isDesktop;
}

function VisualBackdrop() {
  return (
    <>
      <div
        className="absolute inset-0 opacity-55"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--color-divider) 1px, transparent 1px), linear-gradient(to bottom, var(--color-divider) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage:
            "linear-gradient(to bottom, rgba(0,0,0,0.72), transparent 88%)",
        }}
      />
      <div className="absolute -left-16 top-10 size-52 rounded-full bg-[var(--color-accent-secondary)] opacity-20 blur-3xl" />
      <div className="absolute -right-12 bottom-8 size-48 rounded-full bg-[var(--color-accent-tertiary)] opacity-20 blur-3xl" />
    </>
  );
}

function ProjectVisual({ project }: { project: Project }) {
  if (project.variant === "copilot") {
    return (
      <div className="relative flex h-full min-h-[22rem] items-center justify-center p-5 sm:p-8 lg:min-h-[38rem]">
        <VisualBackdrop />
        <div className="relative w-full max-w-lg">
          <div className="absolute -right-2 -top-9 z-20 flex items-center gap-2 rounded-full border border-[var(--color-card-border)] bg-[var(--color-bg-card)] px-3 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-[var(--color-text-muted)] shadow-[0_16px_45px_-28px_var(--color-shadow)] sm:right-3">
            <span className="size-2 rounded-full bg-[var(--color-accent-secondary)]" />
            Human review ready
          </div>

          <div className="rounded-[1.75rem] border border-[var(--color-card-border)] bg-[var(--color-bg-elevated)] p-4 shadow-[0_34px_80px_-48px_var(--color-shadow)] sm:p-5">
            <div className="flex items-center gap-3 border-b border-[var(--color-card-border)] pb-4">
              <span className="flex size-11 items-center justify-center rounded-2xl bg-[var(--color-accent)] text-[var(--color-on-accent)]">
                <Bot className="size-5" />
              </span>
              <div className="flex-1">
                <div className="h-2.5 w-32 rounded-full bg-[var(--color-divider)]" />
                <div className="mt-2 h-2 w-20 rounded-full bg-[var(--color-card-border)]" />
              </div>
              <span className="rounded-full bg-[var(--color-accent-soft)] px-3 py-1.5 text-[0.62rem] font-bold uppercase tracking-[0.12em] text-[var(--color-accent)]">
                Grounded
              </span>
            </div>

            <div className="mt-5 ml-auto h-11 w-4/5 rounded-2xl rounded-br-md bg-[var(--color-bg-soft)]" />
            <div className="mt-3 rounded-2xl rounded-tl-md border border-[var(--color-card-border)] bg-[var(--color-bg-card)] p-4">
              <div className="space-y-2.5">
                <div className="h-2 w-full rounded-full bg-[var(--color-divider)]" />
                <div className="h-2 w-5/6 rounded-full bg-[var(--color-divider)]" />
                <div className="h-2 w-2/3 rounded-full bg-[var(--color-divider)]" />
              </div>
              <div className="mt-5 grid gap-2 sm:grid-cols-2">
                {["Source context", "Review control"].map((label) => (
                  <span key={label} className="flex items-center gap-2 rounded-xl bg-[var(--color-bg-soft)] px-3 py-2.5 text-xs font-semibold text-[var(--color-text-muted)]">
                    <Check className="size-3.5 text-[var(--color-accent)]" />
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (project.variant === "analytics") {
    return (
      <div className="relative flex h-full min-h-[22rem] items-center justify-center p-5 sm:p-8 lg:min-h-[38rem]">
        <VisualBackdrop />
        <div className="relative w-full max-w-lg">
          <div className="absolute -left-1 -top-8 z-20 rounded-2xl border border-[var(--color-card-border)] bg-[var(--color-bg-card)] px-4 py-3 shadow-[0_18px_50px_-30px_var(--color-shadow)] sm:left-4">
            <p className="text-[0.6rem] font-bold uppercase tracking-[0.14em] text-[var(--color-text-subtle)]">Next decision</p>
            <p className="mt-1 text-sm font-bold text-[var(--color-text-main)]">Review rising risk</p>
          </div>

          <div className="rounded-[1.75rem] border border-[var(--color-card-border)] bg-[var(--color-bg-elevated)] p-4 shadow-[0_34px_80px_-48px_var(--color-shadow)] sm:p-5">
            <div className="flex items-center justify-between">
              <span className="flex size-11 items-center justify-center rounded-2xl bg-[var(--color-accent-soft)] text-[var(--color-accent)]">
                <BarChart3 className="size-5" />
              </span>
              <div className="h-8 w-28 rounded-full border border-[var(--color-card-border)] bg-[var(--color-bg-card)]" />
            </div>

            <div className="mt-5 grid grid-cols-3 gap-2.5">
              {["45%", "68%", "84%"].map((height, index) => (
                <div key={height} className="flex h-36 items-end rounded-2xl bg-[var(--color-bg-soft)] p-2.5">
                  <div
                    className={`w-full rounded-xl ${index === 2 ? "bg-[var(--color-accent)]" : index === 1 ? "bg-[var(--color-accent-secondary)]" : "bg-[var(--color-divider)]"}`}
                    style={{ height }}
                  />
                </div>
              ))}
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2.5">
              <div className="rounded-xl border border-[var(--color-card-border)] bg-[var(--color-bg-card)] p-3">
                <div className="h-2 w-12 rounded-full bg-[var(--color-card-border)]" />
                <div className="mt-2 h-3 w-20 rounded-full bg-[var(--color-divider)]" />
              </div>
              <div className="rounded-xl border border-[var(--color-card-border)] bg-[var(--color-bg-card)] p-3">
                <div className="h-2 w-16 rounded-full bg-[var(--color-card-border)]" />
                <div className="mt-2 h-3 w-14 rounded-full bg-[var(--color-accent-tertiary)] opacity-75" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex h-full min-h-[22rem] items-center justify-center p-5 sm:p-8 lg:min-h-[38rem]">
      <VisualBackdrop />
      <div className="relative w-full max-w-xl">
        <div className="absolute -right-1 -top-9 z-20 rounded-full border border-[var(--color-card-border)] bg-[var(--color-bg-card)] px-4 py-2 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-[var(--color-text-muted)] shadow-[0_16px_45px_-28px_var(--color-shadow)] sm:right-5">
          Social signal → qualified brief
        </div>

        <div className="overflow-hidden rounded-[1.75rem] border border-[var(--color-card-border)] bg-[var(--color-bg-elevated)] shadow-[0_34px_80px_-48px_var(--color-shadow)]">
          <div className="flex items-center gap-2 border-b border-[var(--color-card-border)] px-4 py-3.5">
            {[0, 1, 2].map((item) => (
              <span key={item} className="size-2 rounded-full bg-[var(--color-divider)]" />
            ))}
            <span className="ml-auto flex size-8 items-center justify-center rounded-xl bg-[var(--color-accent-soft)] text-[var(--color-accent)]">
              <Globe2 className="size-4" />
            </span>
          </div>

          <div className="grid gap-5 p-5 sm:grid-cols-[1.1fr_0.9fr] sm:p-7">
            <div className="py-2">
              <div className="h-3 w-24 rounded-full bg-[var(--color-accent-secondary)]" />
              <div className="mt-5 h-5 w-full rounded-full bg-[var(--color-divider)]" />
              <div className="mt-2.5 h-5 w-4/5 rounded-full bg-[var(--color-divider)]" />
              <div className="mt-5 h-2.5 w-5/6 rounded-full bg-[var(--color-card-border)]" />
              <div className="mt-2.5 h-2.5 w-2/3 rounded-full bg-[var(--color-card-border)]" />
              <div className="mt-6 h-10 w-32 rounded-full bg-[var(--color-accent)]" />
            </div>
            <div className="rounded-2xl bg-[var(--color-bg-soft)] p-3">
              <div className="flex h-full min-h-44 flex-col justify-between rounded-xl border border-[var(--color-card-border)] bg-[var(--color-bg-card)] p-4">
                <Sparkles className="size-5 text-[var(--color-accent-tertiary)]" />
                <div className="space-y-2.5">
                  <div className="h-2 w-full rounded-full bg-[var(--color-divider)]" />
                  <div className="h-2 w-3/4 rounded-full bg-[var(--color-divider)]" />
                  <div className="mt-4 flex gap-2">
                    <span className="h-7 flex-1 rounded-lg bg-[var(--color-accent-soft)]" />
                    <span className="h-7 w-8 rounded-lg bg-[var(--color-bg-hover)]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ExperienceCard({ item, index }: { item: ExperienceItem; index: number; key?: string }) {
  const Icon = experienceIcons[item.icon] ?? Workflow;

  return (
    <article className="group relative border-t border-[var(--color-card-border)] p-6 first:border-t-0 sm:p-7 lg:border-l lg:border-t-0 lg:first:border-l-0">
      <div className="flex items-start justify-between gap-4">
        <span className="flex size-11 items-center justify-center rounded-2xl bg-[var(--color-accent-soft)] text-[var(--color-accent)] transition-transform duration-300 group-hover:-translate-y-1">
          <Icon className="size-5" />
        </span>
        <span className="font-display text-sm font-bold text-[var(--color-text-subtle)]">0{index + 1}</span>
      </div>
      <h3 className="mt-7 text-xl font-semibold leading-7 tracking-[-0.025em] text-[var(--color-text-main)]">
        {item.title}
      </h3>
      <p className="mt-3 text-sm leading-6 text-[var(--color-text-muted)]">
        {item.description}
      </p>
      <div className="mt-5 flex flex-wrap gap-x-3 gap-y-2">
        {item.skills.map((skill) => (
          <span key={skill} className="text-[0.68rem] font-bold uppercase tracking-[0.1em] text-[var(--color-text-subtle)]">
            {skill}
          </span>
        ))}
      </div>
    </article>
  );
}

function ProjectStory({
  project,
  index,
  data,
}: {
  project: Project;
  index: number;
  data: SiteData;
  key?: string;
}) {
  const articleRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isDesktop = useDesktopLayout();
  const enableParallax = isDesktop && !prefersReducedMotion;
  const { scrollYProgress } = useScroll({
    target: articleRef,
    offset: ["start end", "end start"],
  });
  const visualY = useTransform(
    scrollYProgress,
    [0, 1],
    enableParallax ? [30, -30] : [0, 0],
  );
  const glowY = useTransform(
    scrollYProgress,
    [0, 1],
    enableParallax ? [-34, 34] : [0, 0],
  );
  const visualScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    enableParallax ? [0.985, 1, 0.985] : [1, 1, 1],
  );
  const progressScale = useTransform(
    scrollYProgress,
    [0.15, 0.8],
    prefersReducedMotion ? [1, 1] : [0, 1],
  );
  const headingId = `project-${project.id}-title`;
  const visualFirst = index % 2 === 0;

  return (
    <li className="list-none">
      <article
        ref={articleRef}
        aria-labelledby={headingId}
        className="relative rounded-[2rem] border border-[var(--color-card-border)] bg-[var(--color-bg-card)] shadow-[0_28px_80px_-54px_var(--color-shadow)] sm:rounded-[2.5rem]"
      >
        <div className="grid lg:grid-cols-2 lg:items-start">
          <div className={`p-3 sm:p-4 lg:sticky lg:top-24 ${visualFirst ? "lg:order-1" : "lg:order-2"}`}>
            <div className="relative overflow-hidden rounded-[1.45rem] border border-[var(--color-card-border)] bg-[linear-gradient(145deg,var(--color-bg-base),var(--color-bg-soft))] sm:rounded-[2rem] lg:min-h-[42rem]">
              <motion.div
                aria-hidden="true"
                style={{ y: glowY }}
                className="absolute left-1/2 top-1/2 size-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-glow)] blur-3xl"
              />
              <motion.div aria-hidden="true" style={{ y: visualY, scale: visualScale }} className="relative h-full">
                <ProjectVisual project={project} />
              </motion.div>
            </div>
          </div>

          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className={`relative flex min-h-full flex-col justify-center p-6 sm:p-9 lg:min-h-[48rem] lg:p-12 ${visualFirst ? "lg:order-2" : "lg:order-1"}`}
          >
            <div className="absolute bottom-12 top-12 hidden w-px bg-[var(--color-divider)] lg:block" style={{ left: visualFirst ? 0 : "auto", right: visualFirst ? "auto" : 0 }}>
              <motion.span
                aria-hidden="true"
                style={{ scaleY: progressScale }}
                className="absolute inset-0 origin-top bg-[var(--color-accent)]"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-[var(--color-accent-soft)] px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-[var(--color-accent)]">
                {project.category}
              </span>
              <span className="rounded-full border border-[var(--color-card-border)] px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-[var(--color-text-subtle)]">
                {data.projects.conceptLabel}
              </span>
              <span className="ml-auto font-display text-sm font-bold text-[var(--color-text-subtle)]">
                0{index + 1} / 0{data.projects.items.length}
              </span>
            </div>

            <h3 id={headingId} className="mt-7 text-3xl font-semibold leading-[1.05] tracking-[-0.045em] text-[var(--color-text-main)] sm:text-4xl">
              {project.title}
            </h3>
            <p className="mt-5 text-base leading-7 text-[var(--color-text-muted)]">
              {project.description}
            </p>

            <dl className="mt-8 divide-y divide-[var(--color-divider)] border-y border-[var(--color-divider)]">
              <div className="grid gap-2 py-5 sm:grid-cols-[8.5rem_1fr] sm:gap-5">
                <dt className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[var(--color-text-subtle)]">
                  {data.projects.challengeLabel}
                </dt>
                <dd className="text-sm leading-6 text-[var(--color-text-main)]">
                  {project.challenge}
                </dd>
              </div>
              <div className="grid gap-2 py-5 sm:grid-cols-[8.5rem_1fr] sm:gap-5">
                <dt className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[var(--color-text-subtle)]">
                  {data.projects.approachLabel}
                </dt>
                <dd className="text-sm leading-6 text-[var(--color-text-main)]">
                  {project.approach}
                </dd>
              </div>
            </dl>

            <div className="mt-7 rounded-2xl border border-[var(--color-card-border)] bg-[var(--color-bg-soft)] p-5">
              <p className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[var(--color-accent)]">
                {data.projects.outcomeLabel}
              </p>
              <p className="mt-2 text-base font-semibold leading-7 text-[var(--color-text-main)]">
                {project.designedOutcome}
              </p>
            </div>

            <div className="mt-7">
              <p className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[var(--color-text-subtle)]">
                {data.projects.includesLabel}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.deliverables.map((deliverable) => (
                  <span key={deliverable} className="rounded-full border border-[var(--color-card-border)] bg-[var(--color-bg-base)] px-3 py-2 text-xs font-semibold text-[var(--color-text-muted)]">
                    {deliverable}
                  </span>
                ))}
              </div>
            </div>

            <a
              href={data.actions.startProject.href}
              aria-label={`${data.projects.ctaLabel}: ${project.title}`}
              className="mt-9 inline-flex w-fit items-center gap-2 rounded-full bg-[var(--color-text-main)] px-5 py-3 text-sm font-bold text-[var(--color-bg-base)] transition-transform duration-200 hover:-translate-y-0.5"
            >
              {data.projects.ctaLabel}
              <ArrowUpRight className="size-4" />
            </a>
          </motion.div>
        </div>
      </article>
    </li>
  );
}

export default function Projects({ data }: { data: SiteData }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="work"
      aria-labelledby="work-title"
      className="relative overflow-clip border-y border-[var(--color-card-border)] bg-[var(--color-bg-soft)] py-20 sm:py-24 lg:py-28"
    >
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_50%_0%,var(--color-glow),transparent_70%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          className="grid gap-7 lg:grid-cols-[0.95fr_1.05fr] lg:items-end"
        >
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-accent)]">
              {data.projects.eyebrow}
            </p>
            <h2 id="work-title" className="mt-4 max-w-3xl text-4xl font-semibold leading-[0.98] tracking-[-0.055em] text-[var(--color-text-main)] sm:text-5xl lg:text-6xl">
              {data.projects.title}
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-7 text-[var(--color-text-muted)] sm:text-lg sm:leading-8 lg:justify-self-end">
            {data.projects.subtitle}
          </p>
        </motion.div>

        <div className="mt-12 overflow-hidden rounded-[2rem] border border-[var(--color-card-border)] bg-[var(--color-bg-card)] shadow-[0_24px_70px_-52px_var(--color-shadow)] lg:mt-16">
          <div className="grid lg:grid-cols-[0.78fr_1.22fr]">
            <div className="flex flex-col justify-between bg-[var(--color-contrast-bg)] p-7 text-[var(--color-on-contrast)] sm:p-9">
              <div>
                <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em] opacity-70">
                  {data.projects.experienceEyebrow}
                </p>
                <h3 className="mt-5 text-3xl font-semibold leading-[1.04] tracking-[-0.04em] sm:text-4xl">
                  {data.projects.experienceTitle}
                </h3>
              </div>
              <p className="mt-12 border-l border-current pl-4 text-xs leading-5 opacity-70">
                {data.projects.experienceNote}
              </p>
            </div>

            <div className="grid sm:grid-cols-2">
              {data.projects.experienceItems.map((item, index) => (
                <ExperienceCard key={item.id} item={item} index={index} />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-24 grid gap-6 lg:mt-32 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-accent)]">
            {data.projects.conceptsEyebrow}
          </p>
          <h3 className="max-w-3xl text-3xl font-semibold leading-[1.03] tracking-[-0.045em] text-[var(--color-text-main)] sm:text-4xl lg:text-5xl">
            {data.projects.conceptsTitle}
          </h3>
        </div>

        <ol className="mt-10 space-y-8 lg:mt-14 lg:space-y-14">
          {data.projects.items.map((project, index) => (
            <ProjectStory key={project.id} project={project} index={index} data={data} />
          ))}
        </ol>
      </div>
    </section>
  );
}
