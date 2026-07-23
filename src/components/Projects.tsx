import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import {
  ArrowUpRight,
  Check,
  ScanSearch,
  ShieldCheck,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { SiteData } from "../types";
import { sceneSpring, useDesktopMotion } from "./motion/useDesktopMotion";
import ProjectConceptVisual from "./ProjectConceptVisual";

type Project = SiteData["projects"]["items"][number];
type ExperienceItem = SiteData["projects"]["experienceItems"][number];

const experienceIcons: Record<string, LucideIcon> = {
  Workflow,
  ShieldCheck,
  ScanSearch,
};

function ExperienceCard({
  item,
  index,
  labels,
}: {
  item: ExperienceItem;
  index: number;
  labels: SiteData["projects"]["experienceLabels"];
  key?: string;
}) {
  const Icon = experienceIcons[item.icon] ?? Workflow;

  return (
    <article className="group relative border-t border-[var(--color-card-border)] p-6 first:border-t-0 sm:p-7 lg:border-l lg:border-t-0 lg:first:border-l-0">
      <div className="flex items-start justify-between gap-4">
        <span className="flex size-11 items-center justify-center rounded-2xl bg-[var(--color-accent-soft)] text-[var(--color-accent)] transition-transform duration-300 group-hover:-translate-y-1">
          <Icon className="size-5" aria-hidden="true" />
        </span>
        <span className="font-display text-sm font-bold text-[var(--color-text-subtle)]">0{index + 1}</span>
      </div>
      <p className="mt-6 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-[var(--color-accent)]">
        {item.context}
      </p>
      <h3 className="mt-3 text-xl font-semibold leading-7 tracking-[-0.025em] text-[var(--color-text-main)]">
        {item.title}
      </h3>
      <p className="mt-3 text-sm leading-6 text-[var(--color-text-muted)]">
        {item.description}
      </p>
      <dl className="mt-6 space-y-5 border-t border-[var(--color-divider)] pt-5">
        <div>
          <dt className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-[var(--color-text-subtle)]">
            {labels.contribution}
          </dt>
          <dd className="mt-2 text-sm leading-6 text-[var(--color-text-main)]">
            {item.contribution}
          </dd>
        </div>
        <div>
          <dt className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-[var(--color-text-subtle)]">
            {labels.evidence}
          </dt>
          <dd className="mt-3">
            <ul className="space-y-2.5">
              {item.evidence.map((evidence) => (
                <li key={evidence} className="flex items-start gap-2.5 text-sm leading-5 text-[var(--color-text-main)]">
                  <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent-soft)] text-[var(--color-accent)]">
                    <Check className="size-2.5" strokeWidth={2.8} aria-hidden="true" />
                  </span>
                  {evidence}
                </li>
              ))}
            </ul>
          </dd>
        </div>
        <div className="rounded-2xl bg-[var(--color-bg-soft)] p-4">
          <dt className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-[var(--color-accent)]">
            {labels.change}
          </dt>
          <dd className="mt-2 text-sm font-medium leading-6 text-[var(--color-text-main)]">
            {item.change}
          </dd>
        </div>
      </dl>
      <div className="mt-6 flex flex-wrap gap-x-3 gap-y-2">
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
  const { motionEnabled: enableParallax, prefersReducedMotion } = useDesktopMotion();
  const { scrollYProgress } = useScroll({
    target: articleRef,
    offset: ["start end", "end start"],
  });
  const sceneProgress = useSpring(scrollYProgress, sceneSpring);
  const visualY = useTransform(
    sceneProgress,
    [0, 1],
    enableParallax ? [20, -20] : [0, 0],
  );
  const glowY = useTransform(
    sceneProgress,
    [0, 1],
    enableParallax ? [-24, 24] : [0, 0],
  );
  const visualScale = useTransform(
    sceneProgress,
    [0, 0.5, 1],
    enableParallax ? [0.985, 1, 0.99] : [1, 1, 1],
  );
  const copyY = useTransform(
    sceneProgress,
    [0, 0.5, 1],
    enableParallax ? [10, 0, -8] : [0, 0, 0],
  );
  const progressScale = useTransform(
    sceneProgress,
    [0.15, 0.8],
    prefersReducedMotion ? [1, 1] : [0, 1],
  );
  const headingId = `project-${project.id}-title`;
  const visualFirst = index % 2 === 0;

  return (
    <li className="project-motion-story list-none">
      <article
        ref={articleRef}
        aria-labelledby={headingId}
        className="relative"
      >
        <div className="grid gap-5 lg:grid-cols-2 lg:items-start lg:gap-8">
          <div
            className={`project-motion-visual-column lg:h-full ${
              visualFirst ? "lg:order-1" : "lg:order-2"
            }`}
          >
            <div
              className="project-motion-visual-card relative overflow-hidden rounded-[1.75rem] border border-[var(--color-card-border)] bg-[linear-gradient(145deg,var(--color-bg-base),var(--color-bg-soft))] shadow-[0_32px_90px_-58px_var(--color-shadow)] sm:rounded-[2.5rem] lg:h-full"
            >
              <span
                aria-hidden="true"
                className="absolute -right-3 -top-10 z-10 font-display text-[9rem] font-semibold leading-none tracking-[-0.09em] text-[var(--color-text-main)] opacity-[0.035] sm:text-[13rem]"
              >
                0{index + 1}
              </span>
              <motion.div
                aria-hidden="true"
                style={{ y: glowY }}
                className="absolute left-1/2 top-1/2 size-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-glow)] blur-3xl"
              />
              <motion.div
                aria-hidden="true"
                style={{ y: visualY, scale: visualScale }}
                className={`relative h-full ${enableParallax ? "will-change-transform" : ""}`}
              >
                <ProjectConceptVisual
                  project={project}
                  progress={sceneProgress}
                  motionEnabled={enableParallax}
                  disclosureLabel={data.projects.visualDisclosureLabel}
                />
              </motion.div>
            </div>
          </div>

          <motion.div
            initial={false}
            style={{ y: copyY }}
            className={`project-motion-copy relative flex min-h-full flex-col justify-center rounded-[1.75rem] border border-[var(--color-card-border)] bg-[var(--color-bg-card)] p-6 shadow-[0_28px_80px_-58px_var(--color-shadow)] sm:rounded-[2.5rem] sm:p-9 lg:h-full lg:p-12 ${visualFirst ? "lg:order-2" : "lg:order-1"}`}
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

            <div className="mt-5 flex items-start gap-3 rounded-2xl border border-[var(--color-card-border)] bg-[var(--color-bg-base)] p-4">
              <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg bg-[var(--color-accent-soft)] text-[var(--color-accent)]">
                <Check className="size-3.5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-[var(--color-text-subtle)]">
                  {data.projects.acceptanceLabel}
                </p>
                <p className="mt-1.5 text-sm leading-6 text-[var(--color-text-main)]">
                  {project.acceptanceCriterion}
                </p>
              </div>
            </div>

            <div className="mt-4 rounded-2xl border border-[var(--color-card-border)] bg-[var(--color-bg-soft)] p-5">
              <p className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[var(--color-accent)]">
                {data.projects.outcomeLabel}
              </p>
              <p className="mt-2 text-base font-semibold leading-7 text-[var(--color-text-main)]">
                {project.designedOutcome}
              </p>
            </div>

            <div className="mt-6">
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
              className="mt-7 inline-flex w-fit items-center gap-2 rounded-full bg-[var(--color-text-main)] px-5 py-3 text-sm font-bold text-[var(--color-bg-base)] transition-transform duration-200 hover:-translate-y-0.5"
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
  const sectionRef = useRef<HTMLElement>(null);
  const { motionEnabled, prefersReducedMotion } = useDesktopMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const sectionProgress = useSpring(scrollYProgress, sceneSpring);
  const kineticX = useTransform(
    sectionProgress,
    [0, 1],
    motionEnabled ? ["7%", "-36%"] : ["0%", "0%"],
  );

  return (
    <section
      ref={sectionRef}
      id="work"
      aria-labelledby="work-title"
      className="relative overflow-clip border-y border-[var(--color-card-border)] bg-[var(--color-contrast-bg)] py-20 sm:py-24 lg:py-32"
    >
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-[40rem] bg-[radial-gradient(circle_at_50%_0%,var(--color-glow),transparent_70%)] opacity-80" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-16 overflow-hidden">
        <motion.p
          style={{ x: kineticX }}
          className="whitespace-nowrap font-display text-[clamp(8rem,23vw,22rem)] font-semibold leading-none tracking-[-0.09em] text-[var(--color-on-contrast)] opacity-[0.045]"
        >
          WORK / WORK / WORK
        </motion.p>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={prefersReducedMotion ? false : { y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          className="grid gap-7 lg:grid-cols-[0.95fr_1.05fr] lg:items-end"
        >
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-on-contrast)] opacity-65">
              {data.projects.eyebrow}
            </p>
            <h2 id="work-title" className="mt-4 max-w-4xl font-display text-4xl font-semibold leading-[0.94] tracking-[-0.065em] text-[var(--color-on-contrast)] sm:text-6xl lg:text-[5.5rem]">
              {data.projects.title}
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-7 text-[var(--color-on-contrast)] opacity-70 sm:text-lg sm:leading-8 lg:justify-self-end">
            {data.projects.subtitle}
          </p>
        </motion.div>

        <div className="mt-16 overflow-hidden rounded-[2rem] border border-[var(--color-card-border)] bg-[var(--color-bg-card)] shadow-[0_34px_90px_-58px_rgba(0,0,0,0.65)] lg:mt-24">
          <div className="grid bg-[var(--color-contrast-bg)] text-[var(--color-on-contrast)] lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div className="p-7 sm:p-9 lg:p-10">
              <div>
                <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em] opacity-70">
                  {data.projects.experienceEyebrow}
                </p>
                <h3 className="mt-5 text-3xl font-semibold leading-[1.04] tracking-[-0.04em] sm:text-4xl">
                  {data.projects.experienceTitle}
                </h3>
              </div>
            </div>
            <div className="border-t border-white/15 p-7 sm:p-9 lg:border-l lg:border-t-0 lg:p-10">
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-0.5 size-5 shrink-0 opacity-80" aria-hidden="true" />
                <p className="text-xs leading-5 opacity-75 sm:text-sm sm:leading-6">
                  {data.projects.experienceNote}
                </p>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3">
            {data.projects.experienceItems.map((item, index) => (
              <ExperienceCard
                key={item.id}
                item={item}
                index={index}
                labels={data.projects.experienceLabels}
              />
            ))}
          </div>
        </div>

        <div
          id="concept-studies"
          className="mt-24 grid scroll-mt-28 gap-6 lg:mt-36 lg:grid-cols-[0.72fr_1.28fr] lg:items-end"
        >
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-on-contrast)] opacity-65">
            {data.projects.conceptsEyebrow}
          </p>
          <h3 className="max-w-4xl font-display text-3xl font-semibold leading-[0.98] tracking-[-0.055em] text-[var(--color-on-contrast)] sm:text-5xl lg:text-6xl">
            {data.projects.conceptsTitle}
          </h3>
        </div>

        <ol className="mt-14 space-y-14 lg:mt-20 lg:space-y-20">
          {data.projects.items.map((project, index) => (
            <ProjectStory key={project.id} project={project} index={index} data={data} />
          ))}
        </ol>
      </div>
    </section>
  );
}
