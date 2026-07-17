import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  MapPin,
  ShieldCheck,
} from "lucide-react";
import type { SiteData } from "../types";
import { sceneSpring, useDesktopMotion } from "./motion/useDesktopMotion";

const wrapIndex = (index: number, length: number) =>
  ((index % length) + length) % length;

export default function FounderTrust({ data }: { data: SiteData }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState<1 | -1>(1);
  const { motionEnabled, prefersReducedMotion } = useDesktopMotion();
  const founder = data.founder;
  const people = founder.people;
  const activePerson = people[activeIndex] ?? people[0];
  const hasMultiplePeople = people.length > 1;
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const sectionProgress = useSpring(scrollYProgress, sceneSpring);
  const cardY = useTransform(
    sectionProgress,
    [0, 1],
    motionEnabled ? [16, -16] : [0, 0],
  );

  useEffect(() => {
    setActiveIndex((current) =>
      people.length > 0 ? Math.min(current, people.length - 1) : 0,
    );
  }, [people.length]);

  if (!activePerson) {
    return null;
  }

  const showPerson = (nextIndex: number, nextDirection: 1 | -1) => {
    if (!hasMultiplePeople) return;
    setPreviousIndex(activeIndex);
    setDirection(nextDirection);
    setActiveIndex(wrapIndex(nextIndex, people.length));
  };

  const slideTransition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.38, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <section
      ref={sectionRef}
      id="about"
      aria-labelledby="founder-heading"
      className="relative overflow-hidden border-b border-[var(--color-card-border)] bg-[var(--color-bg-soft)] py-20 sm:py-24 lg:py-32"
    >
      <div
        aria-hidden="true"
        className="absolute -right-36 -top-40 size-[34rem] rounded-full bg-[var(--color-glow)] opacity-70 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--color-divider) 1px, transparent 1px), linear-gradient(to bottom, var(--color-divider) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "linear-gradient(to right, transparent, black 62%, transparent)",
        }}
      />

      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16 lg:px-8">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-accent)]">
            {founder.eyebrow}
          </p>
          <h2
            id="founder-heading"
            className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-[0.98] tracking-[-0.055em] text-[var(--color-text-main)] sm:text-5xl lg:text-6xl"
          >
            {founder.title}
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-7 text-[var(--color-text-muted)] sm:text-lg sm:leading-8">
            {founder.subtitle}
          </p>

          <div className="mt-9 rounded-2xl border border-[var(--color-card-border)] bg-[var(--color-bg-card)] p-5 shadow-[0_18px_50px_-38px_var(--color-shadow)]">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--color-text-subtle)]">
              {founder.workingStyleTitle}
            </p>
            <ul className="mt-4 space-y-3">
              {founder.workingStyle.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-6 text-[var(--color-text-main)]">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent-soft)] text-[var(--color-accent)]">
                    <Check className="size-3" strokeWidth={2.6} aria-hidden="true" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <a
            href={data.actions.startProject.href}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] px-5 py-3 text-sm font-bold text-[var(--color-on-accent)] shadow-[0_16px_36px_-22px_var(--color-accent)] transition-transform duration-200 hover:-translate-y-0.5"
          >
            {activePerson.ctaLabel}
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>
        </motion.div>

        <motion.aside
          role="region"
          aria-roledescription="carousel"
          aria-label={founder.carouselLabel}
          style={{ y: cardY }}
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className={`relative overflow-hidden rounded-[2rem] border border-[var(--color-card-border)] bg-[var(--color-bg-card)] p-6 shadow-[0_30px_90px_-54px_var(--color-shadow)] sm:p-8 ${motionEnabled ? "will-change-transform" : ""}`}
        >
          {hasMultiplePeople && (
            <div className="relative z-20 mb-6 flex flex-col items-start gap-3 border-b border-[var(--color-divider)] pb-5 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
              <p className="text-[0.68rem] font-bold uppercase tracking-[0.15em] text-[var(--color-text-subtle)]">
                {founder.carouselLabel}
              </p>
              <div className="flex w-full items-center justify-between gap-2 sm:w-auto sm:justify-start">
                <span
                  aria-hidden="true"
                  className="mr-1 min-w-12 text-center font-display text-xs font-semibold tabular-nums text-[var(--color-text-subtle)]"
                >
                  {String(activeIndex + 1).padStart(2, "0")} / {String(people.length).padStart(2, "0")}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => showPerson(activeIndex - 1, -1)}
                    aria-label={founder.previousPersonLabel}
                    className="inline-flex size-11 items-center justify-center rounded-full border border-[var(--color-card-border)] bg-[var(--color-bg-soft)] text-[var(--color-text-main)] transition duration-200 hover:-translate-y-0.5 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                  >
                    <ArrowLeft className="size-4" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => showPerson(activeIndex + 1, 1)}
                    aria-label={founder.nextPersonLabel}
                    className="inline-flex size-11 items-center justify-center rounded-full border border-[var(--color-card-border)] bg-[var(--color-bg-soft)] text-[var(--color-text-main)] transition duration-200 hover:-translate-y-0.5 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                  >
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          )}
          <p className="sr-only" aria-live="polite" aria-atomic="true">
            {activePerson.name}, {activeIndex + 1} of {people.length}
          </p>

          <div className="grid">
            {people.map((person, index) => {
              const isActive = index === activeIndex;

              return (
                <motion.article
                  key={person.id}
                  role="group"
                  aria-roledescription={founder.slideLabel}
                  aria-label={`${index + 1} of ${people.length}: ${person.name}`}
                  aria-hidden={!isActive}
                  inert={!isActive}
                  initial={false}
                  animate={{
                    opacity: isActive ? 1 : 0,
                    x: prefersReducedMotion
                      ? 0
                      : isActive
                        ? 0
                        : index === previousIndex
                          ? direction * -28
                          : direction * 28,
                    scale: prefersReducedMotion || isActive ? 1 : 0.985,
                  }}
                  transition={slideTransition}
                  drag={isActive && hasMultiplePeople && !prefersReducedMotion ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.08}
                  dragMomentum={false}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -55) showPerson(activeIndex + 1, 1);
                    if (info.offset.x > 55) showPerson(activeIndex - 1, -1);
                  }}
                  className={`relative col-start-1 row-start-1 min-w-0 touch-pan-y ${isActive ? "z-10" : "pointer-events-none z-0 select-none"}`}
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-5 -top-10 font-display text-[10rem] font-semibold leading-none tracking-[-0.08em] text-[var(--color-text-main)] opacity-[0.035] sm:text-[14rem]"
                  >
                    {person.initials}
                  </span>

                  <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center">
                    <div className="flex size-24 shrink-0 items-center justify-center overflow-hidden rounded-[1.75rem] border border-[var(--color-card-border)] bg-[linear-gradient(145deg,var(--color-accent-soft),var(--color-bg-soft))] font-display text-3xl font-semibold tracking-[-0.04em] text-[var(--color-accent)] shadow-inner">
                      {person.portrait?.src ? (
                        <img
                          src={person.portrait.src}
                          alt={person.portrait.alt}
                          width="96"
                          height="96"
                          loading="lazy"
                          className="size-full object-cover"
                        />
                      ) : (
                        <span aria-hidden="true">{person.initials}</span>
                      )}
                    </div>
                    <div>
                      <h3 className="font-display text-2xl font-semibold tracking-[-0.035em] text-[var(--color-text-main)] sm:text-3xl">
                        {person.name}
                      </h3>
                      <p className="mt-1 text-sm font-semibold text-[var(--color-accent)]">
                        {person.role}
                      </p>
                      <p className="mt-3 flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
                        <MapPin className="size-4" aria-hidden="true" />
                        {person.location}
                      </p>
                    </div>
                  </div>

                  <p className="relative mt-7 border-t border-[var(--color-divider)] pt-6 text-sm leading-7 text-[var(--color-text-muted)] sm:text-base">
                    {person.bio}
                  </p>

                  <dl className="relative mt-7 grid grid-cols-2 overflow-hidden rounded-2xl border border-[var(--color-card-border)] bg-[var(--color-bg-soft)]">
                    {person.proofPoints.map((point, pointIndex) => (
                      <div
                        key={`${person.id}-${point.label}`}
                        className={`p-4 sm:p-5 ${pointIndex % 2 === 1 ? "border-l border-[var(--color-card-border)]" : ""} ${pointIndex > 1 ? "border-t border-[var(--color-card-border)]" : ""}`}
                      >
                        <dt className="font-display text-lg font-semibold tracking-[-0.025em] text-[var(--color-text-main)] sm:text-xl">
                          {point.value}
                        </dt>
                        <dd className="mt-1 text-xs leading-5 text-[var(--color-text-muted)]">
                          {point.label}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  <div className="relative mt-6 flex items-start gap-3 rounded-2xl border border-[var(--color-card-border)] bg-[var(--color-bg-soft)] p-4">
                    <ShieldCheck className="mt-0.5 size-5 shrink-0 text-[var(--color-accent)]" aria-hidden="true" />
                    <p className="text-xs leading-5 text-[var(--color-text-muted)]">
                      {person.disclaimer}
                    </p>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </motion.aside>
      </div>
    </section>
  );
}
